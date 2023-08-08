import { rest } from 'msw';
import data from './data/orders.json';

export const handlers = [
    rest.post('/trackOrder', async (req, res, ctx) => {
        const { orderNumber, shippingIndex } = await req.json();
        const order = data.find(
            (order) =>
                order.tracking_number === orderNumber &&
                order.zip_code === shippingIndex
        );
        if (order) {
            // Persist user's authentication in the session
            sessionStorage.setItem('is-authenticated', 'true');
            sessionStorage.setItem('tracking-number', orderNumber);
            sessionStorage.setItem('zip-code', shippingIndex);

            return res(
                // Respond with a 200 status code
                ctx.status(200),
                ctx.json(order)
            );
        } else {
            return res(
                ctx.status(403),
                ctx.json({
                    errorMessage: 'Not authorized',
                })
            );
        }
    }),

    rest.get('/user', (req, res, ctx) => {
        // Check if the user is authenticated in this session
        const isAuthenticated = sessionStorage.getItem('is-authenticated');

        if (!isAuthenticated) {
            // If not authenticated, respond with a 403 error
            return res(
                ctx.status(403),
                ctx.json({
                    errorMessage: 'Not authorized',
                })
            );
        }

        // If authenticated, return a mocked user details
        return res(
            ctx.status(200),
            ctx.json({
                username: 'admin',
            })
        );
    }),
];
