import API from './api';
import { getUserInfo } from './authHelper';

/**
 * Initiate a payment request
 * @param {number} amount - Amount in NPR
 * @returns {Promise<Object>} Payment initiation response
 */
export const initiatePayment = async (amount = 1000) => {
    try {
        const user = getUserInfo();
        if (!user || !user._id) {
            throw new Error('User not authenticated');
        }

        const response = await API.post('/payments/initiate', {
            userId: user._id,
            amount,
            paymentGateway: 'Khalti'
        });

        if (response.data.success) {
            return response.data;
        } else {
            throw new Error(response.data.message || 'Payment initiation failed');
        }
    } catch (error) {
        console.error('Error initiating payment:', error);
        throw error;
    }
};

export const verifyPayment = async (pidx, transactionId) => {
    try {
        const response = await API.post('/payments/verify', {
            pidx,
            transaction_id: transactionId
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getPaymentStatus = async (paymentId) => {
    try {
        const response = await API.get(`/payments/status/${paymentId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
