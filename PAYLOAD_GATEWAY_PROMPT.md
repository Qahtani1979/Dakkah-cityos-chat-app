# Payload CMS API Gateway & Temporal Orchestration Prompt

> **Copy and paste this entire prompt into the Replit AI chat in your Payload CMS project.**

---

## Context

We have a **Dakkah City Experience OS** frontend (React/Vite SPA) that needs to connect to multiple backend systems. Your Payload CMS project is the **master system** and needs to serve as the **API Gateway** that proxies and orchestrates all backend calls. We also use **Temporal Cloud** for workflow orchestration.

The frontend will call `PAYLOAD_CMS_URL/api/gateway/*` endpoints, and the gateway will securely proxy requests to each backend system, keeping all API keys server-side.

## Architecture

```
[Dakkah React SPA]
       |
       v
[Payload CMS / Next.js API Gateway]  <-->  [Temporal Cloud (Orchestration)]
       |          |          |          |          |          |
       v          v          v          v          v          v
   [Medusa]  [Fleetbase] [ERPNext]  [Walt.id]  [Stripe]  [SendGrid]
  Commerce   Logistics     ERP      Identity   Payments    Email
```

## Environment Variables Required

These should already be in your Payload project's secrets/env:

```
# Medusa Commerce
MEDUSA_API_URL=https://f76865b8-a3a7-41f9-85b2-b0ade8a4fd85-00-3o74vg6b4mqvs.sisko.replit.dev:9000
MEDUSA_API_KEY=<from account secrets>
MEDUSA_WEBHOOK_SECRET=<from account secrets>

# Fleetbase Logistics
FLEETBASE_URL=https://efdaeea4-1883-4ef0-9888-41da8659025c-00-19fmj1r05ozg4.pike.replit.dev:8000
FLEETBASE_API_KEY=<from account secrets>
FLEETBASE_ORG_ID=29ae887c-0e4c-4f15-834e-31a2f1ea9621
FLEETBASE_WEBHOOK_SECRET=<from account secrets>

# ERPNext
ERPNEXT_URL=https://ff049349-609e-450d-ab42-e289d89960bb-00-ujg6lz7mnzcy.pike.replit.dev:8080
ERPNEXT_API_KEY=<from account secrets>
ERPNEXT_API_SECRET=<from account secrets>
ERPNEXT_WEBHOOK_SECRET=<from account secrets>

# Walt.id Identity
WALTID_URL=https://9e78ac41-ae95-440f-9196-e9263c6eadda-00-130jbk279zua2.janeway.replit.dev:7000
WALTID_API_KEY=<from account secrets>

# Temporal Cloud
TEMPORAL_ADDRESS=ap-northeast-1.aws.api.temporal.io:7233
TEMPORAL_NAMESPACE=quickstart-dakkah-cityos.djvai
TEMPORAL_API_KEY=<from account secrets>

# Stripe
STRIPE_SECRET_KEY=<from account secrets>
STRIPE_WEBHOOK_SECRET=<from account secrets>

# SendGrid
SENDGRID_API_KEY=<from account secrets>
SENDGRID_FROM=<from account secrets>

# MinIO Storage
MINIO_ENDPOINT=<from account secrets>
MINIO_ACCESS_KEY=<from account secrets>
MINIO_SECRET_KEY=<from account secrets>

# OpenAI
OPENAI_API_KEY=<from account secrets>

# Internal
JWT_SECRET=<from account secrets>
PAYLOAD_API_KEY=<from account secrets>
```

## What to Build

### 1. API Gateway Routes (Next.js API Routes or Payload custom endpoints)

Create a unified gateway under `/api/gateway/` with these route groups. Each route should:
- Validate the incoming request (check Authorization header with JWT or Payload API key)
- Add the appropriate backend API key from server-side env vars
- Proxy the request to the correct backend
- Return the response to the frontend
- Handle errors gracefully with standard error format

#### 1.1 Content Routes (Payload CMS - internal)
```
GET  /api/gateway/content/pages          - Get pages (built with page builder blocks)
GET  /api/gateway/content/pages/:slug    - Get single page by slug
GET  /api/gateway/content/collections/:collection  - Generic collection query
POST /api/gateway/content/search         - Search across content
```

#### 1.2 Commerce Routes (proxied to Medusa)
```
GET  /api/gateway/commerce/products           - List products
GET  /api/gateway/commerce/products/:id       - Get product detail
GET  /api/gateway/commerce/categories         - List categories
POST /api/gateway/commerce/cart               - Create cart
POST /api/gateway/commerce/cart/:id/items     - Add to cart
GET  /api/gateway/commerce/cart/:id           - Get cart
POST /api/gateway/commerce/orders             - Create order
GET  /api/gateway/commerce/orders             - List orders
GET  /api/gateway/commerce/orders/:id         - Get order detail
GET  /api/gateway/commerce/stores             - List stores/vendors
```

#### 1.3 Logistics Routes (proxied to Fleetbase)
```
GET  /api/gateway/logistics/fleets            - List fleets
GET  /api/gateway/logistics/vehicles          - List vehicles
GET  /api/gateway/logistics/drivers           - List drivers
POST /api/gateway/logistics/orders            - Create delivery order
GET  /api/gateway/logistics/orders/:id        - Track delivery order
GET  /api/gateway/logistics/orders/:id/track  - Real-time tracking
POST /api/gateway/logistics/quotes            - Get delivery quote
GET  /api/gateway/logistics/zones             - Service zones
```

#### 1.4 ERP Routes (proxied to ERPNext)
```
GET  /api/gateway/erp/customers               - List customers
GET  /api/gateway/erp/invoices                 - List invoices
GET  /api/gateway/erp/invoices/:id             - Get invoice detail
GET  /api/gateway/erp/inventory                - Stock levels
GET  /api/gateway/erp/reports/:type            - Financial reports
GET  /api/gateway/erp/employees                - HR data
POST /api/gateway/erp/purchase-orders          - Create PO
```

#### 1.5 Identity Routes (proxied to Walt.id)
```
POST /api/gateway/identity/credentials/issue   - Issue verifiable credential
POST /api/gateway/identity/credentials/verify  - Verify credential
GET  /api/gateway/identity/credentials/:id     - Get credential
POST /api/gateway/identity/presentations       - Create presentation
GET  /api/gateway/identity/dids                - List DIDs
```

#### 1.6 Payment Routes (Stripe)
```
POST /api/gateway/payments/intents             - Create payment intent
POST /api/gateway/payments/customers           - Create/get customer
GET  /api/gateway/payments/methods/:customerId - List payment methods
POST /api/gateway/payments/subscriptions       - Create subscription
POST /api/gateway/payments/webhooks            - Stripe webhook handler
```

#### 1.7 Communication Routes (SendGrid)
```
POST /api/gateway/comms/email                  - Send email
POST /api/gateway/comms/email/template         - Send templated email
```

#### 1.8 Storage Routes (MinIO)
```
POST /api/gateway/storage/upload               - Upload file
GET  /api/gateway/storage/files/:key           - Get file/signed URL
DELETE /api/gateway/storage/files/:key         - Delete file
```

#### 1.9 AI Routes (OpenAI)
```
POST /api/gateway/ai/chat                      - Chat completion
POST /api/gateway/ai/embeddings                - Generate embeddings
```

#### 1.10 Workflow Routes (Temporal Cloud)
```
POST /api/gateway/workflows/start              - Start a workflow
GET  /api/gateway/workflows/:id                - Get workflow status
POST /api/gateway/workflows/:id/signal         - Signal a workflow
POST /api/gateway/workflows/:id/cancel         - Cancel a workflow
GET  /api/gateway/workflows/list               - List running workflows
```

### 2. Temporal Cloud Integration

Set up a Temporal client connection in a shared utility:

```typescript
// lib/temporal.ts
import { Connection, Client } from '@temporalio/client';

let temporalClient: Client | null = null;

export async function getTemporalClient(): Promise<Client> {
  if (temporalClient) return temporalClient;
  
  const connection = await Connection.connect({
    address: process.env.TEMPORAL_ADDRESS!,  // ap-northeast-1.aws.api.temporal.io:7233
    tls: true,
    apiKey: process.env.TEMPORAL_API_KEY!,
  });
  
  temporalClient = new Client({
    connection,
    namespace: process.env.TEMPORAL_NAMESPACE!,  // quickstart-dakkah-cityos.djvai
  });
  
  return temporalClient;
}
```

### 3. Temporal Workflow Definitions

Create these workflow types that the Dakkah copilot can trigger:

```typescript
// workflows/definitions.ts

// Multi-system orchestration workflows:

// 1. OrderFulfillment - Orchestrates: Medusa (order) -> ERPNext (invoice) -> Fleetbase (delivery) -> SendGrid (notification)
// 2. RideBooking - Orchestrates: Fleetbase (find driver) -> Stripe (payment hold) -> Fleetbase (assign) -> SendGrid (confirm)
// 3. ServiceBooking - Orchestrates: Payload (service config) -> Stripe (payment) -> ERPNext (create job) -> SendGrid (confirm)
// 4. IdentityVerification - Orchestrates: Walt.id (issue credential) -> Payload (store status) -> SendGrid (notify)
// 5. EventRegistration - Orchestrates: Payload (event details) -> Stripe (payment) -> Walt.id (ticket credential) -> SendGrid (e-ticket)
// 6. CopilotAction - General-purpose: receives action type from copilot, routes to correct workflow
```

Each workflow should:
- Accept a standard input shape: `{ action: string, userId: string, data: Record<string, any> }`
- Return a standard output shape: `{ success: boolean, result: any, artifacts: Array<{ type: string, data: any }> }`
- The `artifacts` in the output should match the Dakkah artifact types (poi-carousel, confirmation-card, order-tracker, agent-sync-card, etc.)
- Handle failures with compensating transactions (e.g., if payment fails after order creation, cancel the order)

### 4. Webhook Handlers

Create webhook endpoints for each system that sends events:

```
POST /api/webhooks/stripe          - Stripe payment events
POST /api/webhooks/medusa          - Medusa order events  
POST /api/webhooks/fleetbase       - Fleetbase delivery updates
POST /api/webhooks/erpnext         - ERPNext document events
POST /api/webhooks/temporal        - Temporal workflow completion events
```

Each webhook should:
- Verify the webhook signature using the corresponding WEBHOOK_SECRET
- Process the event and update Payload CMS collections as needed
- Optionally trigger Temporal workflows for cross-system reactions

### 5. Gateway Middleware

Create middleware that:
- Validates API key (check `x-api-key` header against PAYLOAD_API_KEY or CITYOS_CMS_API_KEY)
- Optionally validates JWT tokens for user-authenticated requests
- Adds CORS headers allowing the Dakkah frontend domain
- Rate limits requests
- Logs all gateway calls for debugging

```typescript
// middleware/gateway-auth.ts
export function validateGatewayRequest(req: Request) {
  const apiKey = req.headers.get('x-api-key');
  const authHeader = req.headers.get('authorization');
  
  // Option 1: API Key auth (service-to-service)
  // CITYOS_CMS_API_KEY and PAYLOAD_API_KEY are the same value - use either
  if (apiKey === process.env.PAYLOAD_API_KEY || apiKey === process.env.CITYOS_CMS_API_KEY) return { authenticated: true, type: 'service' };
  
  // Option 2: JWT auth (user requests)
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    // Verify JWT with JWT_SECRET
    // Return user info
  }
  
  return { authenticated: false };
}
```

### 6. CORS Configuration

The gateway MUST allow requests from the Dakkah frontend. Add to your Next.js config or middleware:

```typescript
// Allow Dakkah frontend origins
const allowedOrigins = [
  process.env.STOREFRONT_URL_DEV,   // Dakkah dev URL
  process.env.STOREFRONT_URL_LOCAL,  // localhost:5000
  // Add production domain when deployed
];
```

### 7. Proxy Utility

Create a reusable proxy function:

```typescript
// lib/proxy.ts
export async function proxyRequest(
  targetBaseUrl: string,
  path: string,
  options: {
    method: string;
    headers?: Record<string, string>;
    body?: any;
    apiKey?: string;
    apiKeyHeader?: string;  // Different systems use different header names
  }
) {
  const url = `${targetBaseUrl}${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  
  if (options.apiKey) {
    headers[options.apiKeyHeader || 'x-api-key'] = options.apiKey;
  }
  
  const response = await fetch(url, {
    method: options.method,
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  
  const data = await response.json();
  return { status: response.status, data };
}
```

### 8. Standard Response Format

All gateway responses should follow this format:

```typescript
interface GatewayResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    source: 'payload' | 'medusa' | 'fleetbase' | 'erpnext' | 'waltid' | 'stripe' | 'sendgrid' | 'temporal' | 'openai' | 'minio';
    timestamp: string;
    requestId: string;
  };
}
```

### 9. Health Check Endpoint

```
GET /api/gateway/health
```

Returns the connection status of each backend system:

```json
{
  "status": "operational",
  "systems": {
    "payload": { "status": "up", "latency": 12 },
    "medusa": { "status": "up", "latency": 45 },
    "fleetbase": { "status": "up", "latency": 89 },
    "erpnext": { "status": "up", "latency": 120 },
    "waltid": { "status": "up", "latency": 34 },
    "stripe": { "status": "up", "latency": 67 },
    "temporal": { "status": "up", "latency": 200 },
    "minio": { "status": "up", "latency": 55 }
  }
}
```

## Summary

Build the API gateway in your existing Payload CMS Next.js project with:
1. **Gateway routes** under `/api/gateway/*` that proxy to each backend
2. **Temporal client** for workflow orchestration
3. **Webhook handlers** for event-driven updates
4. **Auth middleware** validating API keys and JWTs
5. **CORS** allowing the Dakkah frontend
6. **Standard response format** across all endpoints
7. **Health check** endpoint

The Dakkah frontend will call these gateway endpoints with either an API key header (`x-api-key`) or a JWT Bearer token, and the gateway handles all the backend routing securely.
