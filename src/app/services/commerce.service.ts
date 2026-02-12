import { gateway } from './gateway-client';

export const CommerceService = {
  getProducts(params?: Record<string, string>) {
    return gateway.get('/commerce/products', params);
  },

  getProduct(id: string) {
    return gateway.get(`/commerce/products/${id}`);
  },

  getCategories() {
    return gateway.get('/commerce/categories');
  },

  createCart() {
    return gateway.post('/commerce/cart');
  },

  getCart(cartId: string) {
    return gateway.get(`/commerce/cart/${cartId}`);
  },

  addToCart(cartId: string, variantId: string, quantity: number = 1) {
    return gateway.post(`/commerce/cart/${cartId}/items`, { variant_id: variantId, quantity });
  },

  createOrder(cartId: string, data: any) {
    return gateway.post('/commerce/orders', { cartId, ...data });
  },

  getOrders(params?: Record<string, string>) {
    return gateway.get('/commerce/orders', params);
  },

  getOrder(id: string) {
    return gateway.get(`/commerce/orders/${id}`);
  },

  getStores(params?: Record<string, string>) {
    return gateway.get('/commerce/stores', params);
  },
};
