import { gateway, type GatewayResponse } from './gateway-client';
import { CommerceService } from './commerce.service';
import { LogisticsService } from './logistics.service';
import { ContentService } from './content.service';
import { ERPService } from './erp.service';
import { HealthService } from './health.service';
import { AIService } from './ai.service';
import { WorkflowsService } from './workflows.service';
import { PaymentsService } from './payments.service';

export interface CopilotGatewayResult {
  source: 'gateway' | 'local';
  data?: any;
  error?: string;
}

async function tryGateway<T>(fn: () => Promise<GatewayResponse<T>>): Promise<CopilotGatewayResult> {
  try {
    const result = await fn();
    if (result.success && result.data) {
      return { source: 'gateway', data: result.data };
    }
    return { source: 'local', error: result.error?.message || 'Gateway returned error' };
  } catch {
    return { source: 'local', error: 'Gateway unreachable' };
  }
}

export const CopilotGateway = {
  async searchProducts(query: string) {
    return tryGateway(() =>
      CommerceService.getProducts({ q: query, limit: '10' })
    );
  },

  async getProduct(id: string) {
    return tryGateway(() => CommerceService.getProduct(id));
  },

  async getStores(query?: string) {
    const params: Record<string, string> = {};
    if (query) params.q = query;
    return tryGateway(() => CommerceService.getStores(params));
  },

  async getDeliveryQuote(pickup: { lat: number; lng: number }, dropoff: { lat: number; lng: number }) {
    return tryGateway(() =>
      LogisticsService.getQuote({ pickup, dropoff })
    );
  },

  async createDelivery(data: any) {
    return tryGateway(() => LogisticsService.createDeliveryOrder(data));
  },

  async trackDelivery(id: string) {
    return tryGateway(() => LogisticsService.trackDelivery(id));
  },

  async getFleets() {
    return tryGateway(() => LogisticsService.getFleets());
  },

  async searchContent(query: string) {
    return tryGateway(() => ContentService.search(query));
  },

  async getInvoices() {
    return tryGateway(() => ERPService.getInvoices());
  },

  async getInventory() {
    return tryGateway(() => ERPService.getInventory());
  },

  async getERPReport(type: string) {
    return tryGateway(() => ERPService.getReport(type));
  },

  async checkHealth() {
    return tryGateway(() => HealthService.check());
  },

  async aiChat(userMessage: string, context?: string) {
    const messages = [];
    if (context) {
      messages.push({ role: 'system', content: context });
    }
    messages.push({ role: 'user', content: userMessage });
    return tryGateway(() => AIService.chat(messages));
  },

  async startWorkflow(type: string, action: string, userId: string, data: Record<string, any>) {
    return tryGateway(() =>
      WorkflowsService.startWorkflow({
        type: type as any,
        action,
        userId,
        data,
      })
    );
  },

  async createPaymentIntent(amount: number, currency: string = 'SAR') {
    return tryGateway(() =>
      PaymentsService.createPaymentIntent({ amount, currency })
    );
  },

  isGatewayConfigured(): boolean {
    return !!import.meta.env.VITE_PAYLOAD_CMS_URL && !!import.meta.env.VITE_CITYOS_API_KEY;
  },
};
