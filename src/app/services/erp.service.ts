import { gateway } from './gateway-client';

export const ERPService = {
  getCustomers(params?: Record<string, string>) {
    return gateway.get('/erp/customers', params);
  },

  getInvoices(params?: Record<string, string>) {
    return gateway.get('/erp/invoices', params);
  },

  getInvoice(id: string) {
    return gateway.get(`/erp/invoices/${id}`);
  },

  getInventory(params?: Record<string, string>) {
    return gateway.get('/erp/inventory', params);
  },

  getReport(type: string, params?: Record<string, string>) {
    return gateway.get(`/erp/reports/${type}`, params);
  },

  getEmployees(params?: Record<string, string>) {
    return gateway.get('/erp/employees', params);
  },

  createPurchaseOrder(data: any) {
    return gateway.post('/erp/purchase-orders', data);
  },
};
