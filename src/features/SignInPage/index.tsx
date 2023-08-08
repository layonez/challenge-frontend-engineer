import React from 'react';
import Card from '../../components/Card';
import { Logo } from '../../Logo';
import styles from './index.module.css';
import { useUncontrolledOrderTrackingForm } from './useUncontrolledOrderTrackingForm';

export const fieldNames = {
    orderNumber: 'order number',
    shippingIndex: 'shipping index',
};

export type OrderTrackingFormData = {
    orderNumber: string;
    shippingIndex: string;
};

const OrderTrackingForm: React.FC = () => {
    const {
        state: {
            orderNumberError,
            isSubmitting,
            shippingIndexError,
            formError,
        },
        handleBlur,
        handleSubmitForm,
        orderNumberRef,
        shippingIndexRef,
    } = useUncontrolledOrderTrackingForm();

    return (
        <Card className={styles.card}>
            <div className={styles.legend}>
                <Logo className={styles.logo} />
                <legend className={styles.title}>Track your order</legend>
                <p className={styles.message}>
                    Enter your order number and zip code combination to see the
                    order details and shipping updates.
                </p>
            </div>
            <form className={styles.formContainer} onSubmit={handleSubmitForm}>
                <label className={styles.label}>
                    <span>Order Number</span>
                    <input
                        type="text"
                        name="orderNumber"
                        className={styles.inputField}
                        autoFocus
                        onBlur={handleBlur}
                        ref={orderNumberRef}
                        // for testing purposes
                        defaultValue="74328923203"
                    />
                    <span className={styles.errorMessage}>
                        {orderNumberError}
                    </span>
                </label>
                <label className={styles.label}>
                    Shipping Index:
                    <input
                        type="text"
                        id="shippingIndex"
                        name="shippingIndex"
                        className={styles.inputField}
                        data-form-type="address,zip"
                        onBlur={handleBlur}
                        ref={shippingIndexRef}
                        // for testing purposes
                        defaultValue="81371"
                    />
                    <span className={styles.errorMessage}>
                        {shippingIndexError}
                    </span>
                </label>
                <button
                    type="submit"
                    className={styles.submitButton}
                    disabled={isSubmitting}
                >
                    Track
                </button>
                <span className={styles.errorMessage}>{formError}</span>
            </form>
        </Card>
    );
};

export default OrderTrackingForm;
