import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import { Checkpoint, Order } from '../../types';
import styles from './index.module.css';

export const fieldNames = {
    orderNumber: 'order number',
    shippingIndex: 'shipping index',
};

export type OrderTrackingFormData = {
    orderNumber: string;
    shippingIndex: string;
};

const OrderTracking = ({ orderDetails }: { orderDetails: Order }) => {
    const { courier, tracking_number, checkpoints } = orderDetails;

    return (
        <div>
            <h1>Order Tracking Details</h1>
            <p>Courier: {courier}</p>
            <p>Tracking Number: {tracking_number}</p>

            <div>
                {checkpoints.map((checkpoint, index) => (
                    <CheckpointView key={index} checkpoint={checkpoint} />
                ))}
            </div>
        </div>
    );
};

const CheckpointView = ({ checkpoint }: { checkpoint: Checkpoint }) => {
    const { status, status_details, event_timestamp, city, country_iso3 } =
        checkpoint;

    return (
        <div className="card">
            <h2>Status: {status}</h2>
            <p>{status_details}</p>
            <p>Event Timestamp: {event_timestamp}</p>
            <p>
                Location: {city}, {country_iso3}
            </p>
        </div>
    );
};

const OrderDetailPage: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    if (!state) {
        navigate('');
        return null;
    }

    console.log(state);
    return (
        <Card className={styles.card}>
            <OrderTracking orderDetails={state} />
        </Card>
    );
};

export default OrderDetailPage;
