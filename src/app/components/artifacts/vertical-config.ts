// Dakkah Super App "Vertical Config" Definition
// This mocks the Payload CMS response structure

export type VerticalID = 
  | 'LOGISTICS' 
  | 'COMMERCE' 
  | 'FINTECH' 
  | 'HEALTH_EDU' 
  | 'SOCIAL' 
  | 'GOVTECH' 
  | 'REAL_ESTATE' 
  | 'AUTOMOTIVE' 
  | 'PROFESSIONAL' 
  | 'UTILITIES' 
  | 'TRAVEL'
  | 'AGTECH'
  | 'ENTERPRISE';

export interface VerticalConfig {
  id: VerticalID;
  label: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily?: string;
  };
  enabledComponents: string[]; // List of registry keys
  collections: string[]; // Backend collections
}

export const VERTICAL_CONFIGS: Record<VerticalID, VerticalConfig> = {
  LOGISTICS: {
    id: 'LOGISTICS',
    label: 'Logistics, Mobility & Supply Chain',
    theme: { primaryColor: '#0044cc', secondaryColor: '#e5f0ff' },
    enabledComponents: ['logistics-map', 'logistics-timeline', 'proof-of-delivery', 'iot-dashboard', 'fleet-maintenance', 'warehouse-picker'],
    collections: ['fleets', 'shipments', 'drivers']
  },
  COMMERCE: {
    id: 'COMMERCE',
    label: 'Multi-Vendor Commerce',
    theme: { primaryColor: '#ff6600', secondaryColor: '#fff0e5' },
    enabledComponents: ['flash-sale', 'comparison-grid', 'product-card', 'vendor-trust', 'smart-filters'],
    collections: ['products', 'vendors', 'orders']
  },
  FINTECH: {
    id: 'FINTECH',
    label: 'Financial Services',
    theme: { primaryColor: '#10b981', secondaryColor: '#ecfdf5' },
    enabledComponents: ['escrow-status', 'invoice-preview', 'credit-gauge'],
    collections: ['wallets', 'transactions', 'loans']
  },
  AGTECH: {
    id: 'AGTECH',
    label: 'AgTech & Environment',
    theme: { primaryColor: '#16a34a', secondaryColor: '#dcfce7' },
    enabledComponents: ['livestock-tracker', 'crop-map', 'carbon-credit'],
    collections: ['crops', 'livestock', 'fields']
  },
  ENTERPRISE: {
    id: 'ENTERPRISE',
    label: 'Enterprise & Specialized B2B',
    theme: { primaryColor: '#4f46e5', secondaryColor: '#eef2ff' },
    enabledComponents: ['hr-onboarding', 'digital-signage', 'asset-tracker'],
    collections: ['employees', 'assets', 'documents']
  },
  // ... others would follow pattern
  HEALTH_EDU: { id: 'HEALTH_EDU', label: 'Health & Edu', theme: { primaryColor: '#06b6d4', secondaryColor: '#cffafe' }, enabledComponents: [], collections: [] },
  SOCIAL: { id: 'SOCIAL', label: 'Social & Media', theme: { primaryColor: '#db2777', secondaryColor: '#fce7f3' }, enabledComponents: [], collections: [] },
  GOVTECH: { id: 'GOVTECH', label: 'GovTech', theme: { primaryColor: '#57534e', secondaryColor: '#f5f5f4' }, enabledComponents: [], collections: [] },
  REAL_ESTATE: { id: 'REAL_ESTATE', label: 'Real Estate', theme: { primaryColor: '#8b5cf6', secondaryColor: '#f3e8ff' }, enabledComponents: [], collections: [] },
  AUTOMOTIVE: { id: 'AUTOMOTIVE', label: 'Automotive', theme: { primaryColor: '#ef4444', secondaryColor: '#fee2e2' }, enabledComponents: [], collections: [] },
  PROFESSIONAL: { id: 'PROFESSIONAL', label: 'Professional', theme: { primaryColor: '#0f172a', secondaryColor: '#f1f5f9' }, enabledComponents: [], collections: [] },
  UTILITIES: { id: 'UTILITIES', label: 'Utilities', theme: { primaryColor: '#eab308', secondaryColor: '#fefce8' }, enabledComponents: [], collections: [] },
  TRAVEL: { id: 'TRAVEL', label: 'Travel', theme: { primaryColor: '#0ea5e9', secondaryColor: '#e0f2fe' }, enabledComponents: [], collections: [] },
};
