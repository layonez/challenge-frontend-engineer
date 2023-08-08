import { act, renderHook } from '@testing-library/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { trackOrder } from '../../apiService';
import { useUncontrolledOrderTrackingForm } from './useUncontrolledOrderTrackingForm';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
}));

jest.mock('../../apiService', () => ({
    trackOrder: jest.fn(),
    ApiError: jest.fn(),
}));

describe('useUncontrolledOrderTrackingForm', () => {
    let navigateMock: jest.Mock;
    let trackOrderMock: jest.Mock;

    beforeEach(() => {
        navigateMock = jest.fn();
        trackOrderMock = jest.fn();

        (useNavigate as jest.Mock).mockReturnValue(navigateMock);
        (trackOrder as jest.Mock).mockReturnValue(trackOrderMock);
        jest.spyOn(React, 'useRef').mockReturnValue({
            current: { value: 1200 },
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should initialize the hook state correctly', () => {
        const { result } = renderHook(() => useUncontrolledOrderTrackingForm());

        expect(result.current.state).toEqual({
            orderNumberError: '',
            shippingIndexError: '',
            formError: '',
            isSubmitting: false,
        });
    });

    it('should handle form submission with missing order number', async () => {
        jest.spyOn(React, 'useRef').mockReturnValueOnce({
            current: { value: '' }, // Empty order number
        });
        const { result } = renderHook(() => useUncontrolledOrderTrackingForm());

        await act(async () => {
            await result.current.handleSubmitForm({
                preventDefault: jest.fn(),
            } as unknown as React.SyntheticEvent<HTMLFormElement>);
        });
        console.log(result.current);
        expect(result.current.state.orderNumberError).toBe(
            'order number field is required'
        );
    });

    it('should handle form submission correctly for non-ApiError response', async () => {
        const { result } = renderHook(() => useUncontrolledOrderTrackingForm());

        const nonApiError = new Error('Non-api error');
        trackOrderMock.mockRejectedValue(nonApiError);

        await act(async () => {
            await result.current.handleSubmitForm({
                preventDefault: jest.fn(),
            } as unknown as React.SyntheticEvent<HTMLFormElement>);
        });

        expect(result.current.state.formError).toBe(
            'please check your internet connection and retry'
        );
    });

    it('should handle valid form submission correctly', async () => {
        const { result } = renderHook(() => useUncontrolledOrderTrackingForm());
        const trackOrderResponse = {
            success: true,
            data: {},
        };
        (trackOrder as jest.Mock).mockResolvedValue(trackOrderResponse);

        await act(async () => {
            await result.current.handleSubmitForm({
                preventDefault: jest.fn(),
            } as unknown as React.SyntheticEvent<HTMLFormElement>);
        });

        expect(navigateMock).toHaveBeenCalledWith('/order', {
            state: trackOrderResponse.data,
        });
    });
});
