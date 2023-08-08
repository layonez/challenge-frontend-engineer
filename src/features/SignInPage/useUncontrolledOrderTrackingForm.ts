import { useRef, useState, FocusEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { OrderTrackingFormData, fieldNames } from '.';
import { trackOrder, ApiError } from '../../apiService';

const fieldRequiredMessage = 'field is required';
const invalidCredentioalsMessage =
    'tracking number and zip-code combination not found';
const connectivityIssueMessage =
    'please check your internet connection and retry';

export const useUncontrolledOrderTrackingForm = () => {
    const navigate = useNavigate();

    const orderNumberRef = useRef<HTMLInputElement>(null);
    const shippingIndexRef = useRef<HTMLInputElement>(null);
    const [state, setState] = useState({
        orderNumberError: '',
        shippingIndexError: '',
        formError: '',
        isSubmitting: false,
    });

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (state[`${name as keyof OrderTrackingFormData}Error`]) {
            if (value) {
                setState({ ...state, [`${name}Error`]: undefined });
            }
        }
    };

    const handleSubmitForm = async (
        e: React.SyntheticEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setState({ ...state, isSubmitting: true });

        const errorState = {
            orderNumberError: '',
            shippingIndexError: '',
            formError: '',
        };
        const orderNumber = orderNumberRef.current?.value;
        const shippingIndex = shippingIndexRef.current?.value;

        if (!orderNumber) {
            errorState.orderNumberError = `${fieldNames.orderNumber} ${fieldRequiredMessage}`;
        }
        if (!shippingIndex) {
            errorState.shippingIndexError = `${fieldNames.shippingIndex} ${fieldRequiredMessage}`;
        }

        const isValid = orderNumber && shippingIndex;
        if (!isValid) {
            setState({ ...state, ...errorState, isSubmitting: false });
            return;
        }

        const trackOrderResponse = await trackOrder({
            orderNumber,
            shippingIndex,
        });

        if (trackOrderResponse.success) {
            navigate('/order', { state: trackOrderResponse.data });
            return;
        } else if (trackOrderResponse.error instanceof ApiError) {
            setState({
                ...state,
                formError: invalidCredentioalsMessage,
                isSubmitting: false,
            });
        } else {
            setState({
                ...state,
                formError: connectivityIssueMessage,
                isSubmitting: false,
            });
        }
    };

    return {
        state,
        handleBlur,
        handleSubmitForm,
        orderNumberRef,
        shippingIndexRef,
    };
};
