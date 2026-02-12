# Dakkah - City Experience OS

## Overview
A React-based conversational "City Experience OS" frontend built with Vite, Tailwind CSS v4, and various Radix UI / MUI components. It features a copilot-style interface with discovery engine, multi-vertical support (logistics, commerce, fintech, health, etc.), and connects to multiple backend systems through a Payload CMS API Gateway.

## Tech Stack
- **Frontend**: React 18, TypeScript, Vite 6
- **Styling**: Tailwind CSS v4, Emotion, MUI
- **UI Libraries**: Radix UI, Lucide icons, shadcn-style components
- **Animation**: Motion (framer-motion successor)
- **Auth**: Supabase Auth (external)
- **State**: React hooks, context API

## Ecosystem Architecture

```
[Dakkah React SPA (this project)]
       |
       v
[Payload CMS / Next.js API Gateway]  <-->  [Temporal Cloud (Orchestration)]
       |          |          |          |          |          |
       v          v          v          v          v          v
   [Medusa]  [Fleetbase] [ERPNext]  [Walt.id]  [Stripe]  [SendGrid]
  Commerce   Logistics     ERP      Identity   Payments    Email
```

### Connected Systems
| System | Role | Env Var (URL) |
|---|---|---|
| Payload CMS | Master system, API gateway, content & pages | VITE_PAYLOAD_CMS_URL |
| Medusa | Commerce engine (products, orders, stores) | VITE_MEDUSA_API_URL |
| Fleetbase | Logistics, fleet & delivery management | VITE_FLEETBASE_URL |
| ERPNext | ERP (finance, HR, inventory) | VITE_ERPNEXT_URL |
| Walt.id | Digital identity & verifiable credentials | VITE_WALTID_URL |
| Temporal Cloud | Workflow orchestration & automation | TEMPORAL_ADDRESS, TEMPORAL_NAMESPACE |
| Stripe | Payment processing | VITE_STRIPE_PUBLISHABLE_KEY |
| SendGrid | Email delivery | Server-side only |
| MinIO | Object/file storage | Server-side only |
| OpenAI | AI/LLM capabilities | Server-side only |
| Supabase | Auth & chat thread persistence | Hardcoded in utils/supabase/info.tsx |
| Chat App | Messaging system | VITE_CHAT_APP_URL |

### Security Model
- All sensitive API keys are stored as server-side secrets (never exposed to browser)
- Frontend uses VITE_ prefixed env vars for public URLs and publishable keys only
- API calls go through Payload CMS gateway which adds backend API keys
- Gateway validates requests via x-api-key header or JWT Bearer token

## Project Structure
```
src/
  vite-env.d.ts           - Vite type declarations
  main.tsx                - Entry point
  styles/                 - CSS files (tailwind, fonts, theme)
  app/
    App.tsx               - Root component with drawer/menu state
    components/           - UI components
      artifacts/          - Rich interactive cards (carousels, trackers, forms)
      artifacts/domains/  - Vertical-specific components (logistics, commerce, etc.)
      design-system/      - Component showcase
      ui/                 - Base UI components (shadcn/Radix-based)
    context/              - Auth context (Supabase)
    hooks/                - Custom hooks (useCopilot)
    types/                - TypeScript type definitions
    data/                 - Static data and scenarios (JSON)
    utils/                - Utility functions and CopilotBrain
    services/             - Gateway service client modules
      gateway-client.ts   - Core HTTP client for API gateway
      content.service.ts  - Payload CMS content endpoints
      commerce.service.ts - Medusa commerce endpoints
      logistics.service.ts - Fleetbase logistics endpoints
      erp.service.ts      - ERPNext ERP endpoints
      identity.service.ts - Walt.id identity endpoints
      payments.service.ts - Stripe payment endpoints
      workflows.service.ts - Temporal workflow endpoints
      ai.service.ts       - OpenAI endpoints
      comms.service.ts    - SendGrid email endpoints
      storage.service.ts  - MinIO storage endpoints
      health.service.ts   - System health check
      index.ts            - Barrel export
supabase/
  functions/server/       - Supabase edge function configs
utils/
  supabase/               - Supabase client config and verticals
PAYLOAD_GATEWAY_PROMPT.md - Prompt to set up API gateway in Payload CMS project
```

## Running
- Dev server: `npm run dev` (Vite on port 5000, host 0.0.0.0)
- Build: `npm run build`
- Deploy: Static deployment (dist/ directory)

## Key Files
- `PAYLOAD_GATEWAY_PROMPT.md` - Full instructions for setting up the API gateway in the Payload CMS project
- `src/app/services/` - Frontend service layer connected to all backend systems
- `src/app/services/copilot-gateway.ts` - Smart gateway integration with intent detection and response formatting
- `src/app/utils/copilot-brain.ts` - Local keyword-based response engine (fallback when gateway unavailable)
- `src/app/hooks/useCopilot.ts` - Main copilot hook with gateway-first, local-fallback flow
- `src/app/components/system-health-dashboard.tsx` - System connectivity dashboard (direct + gateway tests)

## Gateway Integration Flow
The copilot now follows a gateway-first approach:
1. User sends a message
2. `CopilotGateway.tryEnrich()` detects intent (commerce, logistics, ERP, identity, content, payments, workflows)
3. If intent matches, it calls the appropriate service through the Payload CMS gateway
4. If gateway returns data, it formats the response into copilot artifacts (carousels, cards, chips)
5. If gateway fails or no intent detected, falls back to local `processUserMessage()` brain
6. System actions (simulations, events) always use the local brain

## Notes
- Supabase connection uses external project (ipluvaoinmgiodkfhzzn)
- Tailwind CSS v4 with `@tailwindcss/vite` plugin
- React and react-dom are peer dependencies installed at 18.3.1
- The CopilotBrain still handles local keyword matching with JSON scenarios as fallback
- Temporal Cloud workflows handle multi-system orchestration (e.g., order -> invoice -> delivery -> notification)
- System Health Dashboard accessible via Activity icon in header; tests both direct URLs and gateway API routes
- Chat App (VITE_CHAT_APP_URL) has direct connectivity but no gateway route (it's a separate messaging system)

## User Preferences
- Systems integration through Payload CMS as central API gateway
- Temporal Cloud for workflow orchestration between systems
- All backend systems run as separate Replit projects
