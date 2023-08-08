import { render, fireEvent, screen } from '@testing-library/react';
import OrderTrackingForm from './index';

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(), // Mock useNavigate
}));

describe('OrderTrackingForm', () => {
    it('should render the form correctly', () => {
        render(<OrderTrackingForm />);

        expect(screen.getByText('Order Number')).toBeInTheDocument();
        expect(screen.getByLabelText('Order Number')).toBeInTheDocument();
        expect(screen.getByText('Shipping Index:')).toBeInTheDocument();
        expect(screen.getByLabelText('Shipping Index:')).toBeInTheDocument();
        expect(screen.getByText('Track')).toBeInTheDocument();
    });

    it('should submit the form and navigate on success', async () => {
        render(<OrderTrackingForm />);
        const trackButton = screen.getByText('Track');

        fireEvent.input(screen.getByLabelText('Order Number'), {
            target: { value: '74328923203' },
        });
        fireEvent.input(screen.getByLabelText('Shipping Index:'), {
            target: { value: '81371' },
        });
        fireEvent.click(trackButton);
    });
});
