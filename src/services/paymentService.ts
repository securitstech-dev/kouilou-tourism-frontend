// import { apiClient } from '../api/apiClient';

export interface PaymentIntent {
  transactionId: string;
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  message: string;
}

export const paymentService = {
  async processPayment(
    bookingId: string,
    amount: number,
    method: 'MOBILE_MONEY' | 'CARD'
  ): Promise<PaymentIntent> {
    console.log(`Processing ${method} payment for booking ${bookingId} of amount ${amount}`);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mock successful payment
    // In real app: return apiClient.post('/payments/process', { bookingId, amount, method });
    return {
      transactionId: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      status: 'SUCCESS',
      message: 'Paiement effectué avec succès',
    };
  },
};
