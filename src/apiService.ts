import { Order } from './types';

export interface GenericApiResponse<T> {
    success: boolean;
    error?: ApiError | Error;
    data?: T;
}

export class ApiError extends Error {}

export const trackOrder = async ({
    orderNumber,
    shippingIndex,
}: {
    orderNumber: string;
    shippingIndex: string;
}): Promise<GenericApiResponse<Order>> => {
    try {
        const apiResponce = await fetch('/trackOrder', {
            method: 'POST',
            body: JSON.stringify({
                orderNumber,
                shippingIndex,
            }),
        });
        if (apiResponce.ok) {
            const order = (await apiResponce.json()) as Order;
            return {
                success: true,
                data: order,
            };
        } else {
            return {
                success: false,
                error: new ApiError('failed to sign in'),
            };
        }
    } catch (error) {
        if (error instanceof Error) {
            return {
                success: false,
                error,
            };
        } else {
            return {
                success: false,
                error: new Error(`${error}`),
            };
        }
    }
};
