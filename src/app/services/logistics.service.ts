import { gateway } from './gateway-client';

export const LogisticsService = {
  getFleets(params?: Record<string, string>) {
    return gateway.get('/logistics/fleets', params);
  },

  getVehicles(params?: Record<string, string>) {
    return gateway.get('/logistics/vehicles', params);
  },

  getDrivers(params?: Record<string, string>) {
    return gateway.get('/logistics/drivers', params);
  },

  createDeliveryOrder(data: {
    pickup: { lat: number; lng: number; address: string };
    dropoff: { lat: number; lng: number; address: string };
    type?: string;
    notes?: string;
  }) {
    return gateway.post('/logistics/orders', data);
  },

  getDeliveryOrder(id: string) {
    return gateway.get(`/logistics/orders/${id}`);
  },

  trackDelivery(id: string) {
    return gateway.get(`/logistics/orders/${id}/track`);
  },

  getQuote(data: {
    pickup: { lat: number; lng: number };
    dropoff: { lat: number; lng: number };
    type?: string;
  }) {
    return gateway.post('/logistics/quotes', data);
  },

  getServiceZones() {
    return gateway.get('/logistics/zones');
  },
};
