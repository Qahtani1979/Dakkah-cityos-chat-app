import { gateway } from './gateway-client';

export const PaymentsService = {
  createPaymentIntent(data: {
    amount: number;
    currency: string;
    customerId?: string;
    metadata?: Record<string, string>;
  }) {
    return gateway.post('/payments/intents', data);
  },

  createCustomer(data: { email: string; name?: string }) {
    return gateway.post('/payments/customers', data);
  },

  getPaymentMethods(customerId: string) {
    return gateway.get(`/payments/methods/${customerId}`);
  },

  createSubscription(data: {
    customerId: string;
    priceId: string;
    metadata?: Record<string, string>;
  }) {
    return gateway.post('/payments/subscriptions', data);
  },
};
