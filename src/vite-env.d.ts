/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYLOAD_CMS_URL: string;
  readonly VITE_MEDUSA_API_URL: string;
  readonly VITE_FLEETBASE_URL: string;
  readonly VITE_ERPNEXT_URL: string;
  readonly VITE_WALTID_URL: string;
  readonly VITE_CHAT_APP_URL: string;
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string;
  readonly VITE_CITYOS_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
