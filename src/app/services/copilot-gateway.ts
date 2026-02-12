import { gateway, type GatewayResponse } from './gateway-client';
import { CommerceService } from './commerce.service';
import { LogisticsService } from './logistics.service';
import { ContentService } from './content.service';
import { ERPService } from './erp.service';
import { IdentityService } from './identity.service';
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

interface GatewayEnrichedResponse {
  content: string;
  artifacts?: any[];
  mode?: 'suggest' | 'propose' | 'execute';
  source: 'gateway' | 'local';
}

function detectIntent(input: string): { domain: string; action: string; query: string } {
  const lower = input.toLowerCase();

  if (lower.match(/product|shop|buy|store|order|cart|categor|merchand/)) {
    return { domain: 'commerce', action: lower.includes('store') ? 'stores' : 'products', query: input };
  }
  if (lower.match(/deliver|fleet|driver|vehicle|shipment|track|logistics|dispatch/)) {
    return { domain: 'logistics', action: lower.includes('track') ? 'track' : lower.includes('fleet') ? 'fleets' : 'vehicles', query: input };
  }
  if (lower.match(/invoice|inventory|erp|finance|report|employee|purchase order|hr\b/)) {
    return { domain: 'erp', action: lower.includes('invoice') ? 'invoices' : lower.includes('inventory') ? 'inventory' : 'report', query: input };
  }
  if (lower.match(/credential|identity|did|verify|verifiable|badge|certificate/)) {
    return { domain: 'identity', action: lower.includes('verify') ? 'verify' : 'dids', query: input };
  }
  if (lower.match(/page|content|article|blog|collection|cms/)) {
    return { domain: 'content', action: 'search', query: input };
  }
  if (lower.match(/pay|payment|subscription|billing|charge/)) {
    return { domain: 'payments', action: 'info', query: input };
  }
  if (lower.match(/workflow|automat|orchestrat|process/)) {
    return { domain: 'workflows', action: 'list', query: input };
  }

  return { domain: 'unknown', action: 'none', query: input };
}

function formatProductsResponse(data: any): GatewayEnrichedResponse {
  const products = Array.isArray(data) ? data : data?.products || [];
  if (products.length === 0) {
    return { content: 'No products found matching your search.', source: 'gateway', mode: 'suggest' };
  }
  const list = products.slice(0, 6).map((p: any) => ({
    id: p.id,
    name: p.title || p.name || 'Unnamed',
    category: p.collection?.title || p.category || 'General',
    image: p.thumbnail || p.images?.[0]?.url || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600',
    rating: 4.5,
    distance: '',
    vibe: (p.tags || []).map((t: any) => `#${t.value || t}`).slice(0, 2),
    priceRange: p.variants?.[0]?.prices?.[0]?.amount
      ? `SAR ${(p.variants[0].prices[0].amount / 100).toFixed(0)}`
      : '',
    openNow: p.status === 'published',
  }));
  return {
    content: `I found **${products.length}** product${products.length > 1 ? 's' : ''} from our commerce platform:`,
    source: 'gateway',
    mode: 'suggest',
    artifacts: [
      { type: 'poi-carousel', data: { pois: list } },
      { type: 'selection-chips', data: { question: 'What next?', options: ['View Details', 'Add to Cart', 'Search More'] } },
    ],
  };
}

function formatStoresResponse(data: any): GatewayEnrichedResponse {
  const stores = Array.isArray(data) ? data : data?.stores || [];
  if (stores.length === 0) {
    return { content: 'No stores found.', source: 'gateway', mode: 'suggest' };
  }
  const list = stores.slice(0, 6).map((s: any) => ({
    id: s.id,
    name: s.name || 'Unnamed Store',
    category: 'Store',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600',
    rating: 4.7,
    distance: '',
    vibe: ['#store'],
    priceRange: '',
    openNow: true,
  }));
  return {
    content: `Found **${stores.length}** store${stores.length > 1 ? 's' : ''}:`,
    source: 'gateway',
    mode: 'suggest',
    artifacts: [
      { type: 'poi-carousel', data: { pois: list } },
    ],
  };
}

function formatFleetsResponse(data: any): GatewayEnrichedResponse {
  const fleets = Array.isArray(data) ? data : data?.fleets || data?.data || [];
  if (fleets.length === 0) {
    return { content: 'No fleet data available at the moment.', source: 'gateway', mode: 'suggest' };
  }
  const details = fleets.slice(0, 5).map((f: any) =>
    `• **${f.name || f.public_id || 'Fleet'}** — ${f.vehicles_count || '?'} vehicles, Status: ${f.status || 'active'}`
  ).join('\n');
  return {
    content: `Fleet overview from logistics system:\n\n${details}`,
    source: 'gateway',
    mode: 'suggest',
    artifacts: [
      { type: 'selection-chips', data: { question: 'Actions:', options: ['View Vehicles', 'Track Deliveries', 'Create Delivery'] } },
    ],
  };
}

function formatVehiclesResponse(data: any): GatewayEnrichedResponse {
  const vehicles = Array.isArray(data) ? data : data?.vehicles || data?.data || [];
  if (vehicles.length === 0) {
    return { content: 'No vehicle data available.', source: 'gateway', mode: 'suggest' };
  }
  const details = vehicles.slice(0, 5).map((v: any) =>
    `• **${v.display_name || v.make || 'Vehicle'}** — ${v.plate_number || v.public_id || ''}, Status: ${v.status || 'active'}`
  ).join('\n');
  return {
    content: `Vehicle roster from fleet management:\n\n${details}`,
    source: 'gateway',
    mode: 'suggest',
  };
}

function formatInvoicesResponse(data: any): GatewayEnrichedResponse {
  const invoices = Array.isArray(data) ? data : data?.data || [];
  if (invoices.length === 0) {
    return { content: 'No invoices found in the ERP system.', source: 'gateway', mode: 'suggest' };
  }
  const details = invoices.slice(0, 5).map((inv: any) =>
    `• **${inv.name || inv.id}** — ${inv.customer_name || inv.customer || 'Customer'}: ${inv.grand_total ? `SAR ${inv.grand_total}` : ''} (${inv.status || 'Draft'})`
  ).join('\n');
  return {
    content: `Latest invoices from ERP:\n\n${details}`,
    source: 'gateway',
    mode: 'suggest',
    artifacts: [
      { type: 'selection-chips', data: { question: 'Actions:', options: ['View Details', 'Create Invoice', 'Export Report'] } },
    ],
  };
}

function formatInventoryResponse(data: any): GatewayEnrichedResponse {
  const items = Array.isArray(data) ? data : data?.data || [];
  if (items.length === 0) {
    return { content: 'No inventory data available.', source: 'gateway', mode: 'suggest' };
  }
  const details = items.slice(0, 5).map((item: any) =>
    `• **${item.item_name || item.name || item.id}** — Qty: ${item.actual_qty ?? item.quantity ?? '?'}, Warehouse: ${item.warehouse || 'Default'}`
  ).join('\n');
  return {
    content: `Inventory snapshot from ERP:\n\n${details}`,
    source: 'gateway',
    mode: 'suggest',
  };
}

function formatDIDsResponse(data: any): GatewayEnrichedResponse {
  const dids = Array.isArray(data) ? data : data?.dids || [];
  if (dids.length === 0) {
    return { content: 'No digital identities found. You can create one to get started.', source: 'gateway', mode: 'suggest' };
  }
  const details = dids.slice(0, 5).map((d: any) =>
    `• **${d.did || d.id}** (${d.method || 'key'})`
  ).join('\n');
  return {
    content: `Digital identities from Walt.id:\n\n${details}`,
    source: 'gateway',
    mode: 'suggest',
    artifacts: [
      { type: 'selection-chips', data: { question: 'Actions:', options: ['Issue Credential', 'Verify Credential', 'Create DID'] } },
    ],
  };
}

function formatContentResponse(data: any): GatewayEnrichedResponse {
  const results = Array.isArray(data) ? data : data?.docs || data?.results || [];
  if (results.length === 0) {
    return { content: 'No content found matching your query.', source: 'gateway', mode: 'suggest' };
  }
  const details = results.slice(0, 5).map((r: any) =>
    `• **${r.title || r.name || 'Untitled'}** — ${r.slug || r.id}`
  ).join('\n');
  return {
    content: `Content from CMS:\n\n${details}`,
    source: 'gateway',
    mode: 'suggest',
  };
}

export const CopilotGateway = {
  isConfigured(): boolean {
    return !!import.meta.env.VITE_PAYLOAD_CMS_URL && !!import.meta.env.VITE_CITYOS_API_KEY;
  },

  async tryEnrich(input: string): Promise<GatewayEnrichedResponse | null> {
    if (!this.isConfigured()) return null;

    const intent = detectIntent(input);
    if (intent.domain === 'unknown') return null;

    let result: CopilotGatewayResult;

    switch (intent.domain) {
      case 'commerce':
        if (intent.action === 'stores') {
          result = await tryGateway(() => CommerceService.getStores());
          if (result.source === 'gateway') return formatStoresResponse(result.data);
        } else {
          const searchTerms = input.replace(/product|shop|buy|search|find|show|me|the|for|a|an/gi, '').trim() || 'all';
          result = await tryGateway(() => CommerceService.getProducts({ q: searchTerms, limit: '10' }));
          if (result.source === 'gateway') return formatProductsResponse(result.data);
        }
        break;

      case 'logistics':
        if (intent.action === 'fleets') {
          result = await tryGateway(() => LogisticsService.getFleets());
          if (result.source === 'gateway') return formatFleetsResponse(result.data);
        } else {
          result = await tryGateway(() => LogisticsService.getVehicles());
          if (result.source === 'gateway') return formatVehiclesResponse(result.data);
        }
        break;

      case 'erp':
        if (intent.action === 'invoices') {
          result = await tryGateway(() => ERPService.getInvoices({ limit: '5' }));
          if (result.source === 'gateway') return formatInvoicesResponse(result.data);
        } else if (intent.action === 'inventory') {
          result = await tryGateway(() => ERPService.getInventory({ limit: '5' }));
          if (result.source === 'gateway') return formatInventoryResponse(result.data);
        } else {
          result = await tryGateway(() => ERPService.getReport('general-ledger'));
          if (result.source === 'gateway') {
            return { content: 'Here is the latest ERP report data.', source: 'gateway', mode: 'suggest', artifacts: [] };
          }
        }
        break;

      case 'identity':
        result = await tryGateway(() => IdentityService.getDIDs());
        if (result.source === 'gateway') return formatDIDsResponse(result.data);
        break;

      case 'content':
        const query = input.replace(/page|content|article|blog|collection|cms|search|find|show|me/gi, '').trim() || 'home';
        result = await tryGateway(() => ContentService.search(query));
        if (result.source === 'gateway') return formatContentResponse(result.data);
        break;

      case 'payments':
        return {
          content: 'Payment processing is available through Stripe. I can help you create a payment, check billing status, or manage subscriptions.',
          source: 'gateway',
          mode: 'suggest',
          artifacts: [
            { type: 'selection-chips', data: { question: 'Payment actions:', options: ['Create Payment', 'View Billing', 'Manage Subscriptions'] } },
          ],
        };

      case 'workflows':
        result = await tryGateway(() => WorkflowsService.listWorkflows());
        if (result.source === 'gateway') {
          const wfs = Array.isArray(result.data) ? result.data : result.data?.workflows || [];
          const details = wfs.slice(0, 5).map((w: any) =>
            `• **${w.workflowId || w.id}** — Type: ${w.type || 'unknown'}, Status: ${w.status || 'running'}`
          ).join('\n');
          return {
            content: wfs.length > 0 ? `Active workflows:\n\n${details}` : 'No active workflows found.',
            source: 'gateway',
            mode: 'suggest',
            artifacts: [
              { type: 'selection-chips', data: { question: 'Actions:', options: ['Start Workflow', 'View Details', 'Cancel Workflow'] } },
            ],
          };
        }
        break;
    }

    return null;
  },

  async searchProducts(query: string) {
    return tryGateway(() => CommerceService.getProducts({ q: query, limit: '10' }));
  },

  async getFleets() {
    return tryGateway(() => LogisticsService.getFleets());
  },

  async getInvoices() {
    return tryGateway(() => ERPService.getInvoices());
  },

  async checkHealth() {
    return tryGateway(() => HealthService.check());
  },

  async aiChat(userMessage: string, context?: string) {
    const messages = [];
    if (context) messages.push({ role: 'system', content: context });
    messages.push({ role: 'user', content: userMessage });
    return tryGateway(() => AIService.chat(messages));
  },
};
