import { 
  Truck, ShoppingBag, Shield, Landmark, Stethoscope, 
  Building2, GraduationCap, Gavel, Leaf, Zap, 
  Plane, Factory, Users, Database, Globe, 
  Siren, Microscope, HandHeart, Radio, HardHat,
  Briefcase, Heart, Home, Lightbulb, Sprout, Settings,
  Anchor, Wifi, Sun, Recycle, Battery, Cpu,
  Droplets, Lock, Gavel as Judge, Coins,
  Coffee, Shirt, Smartphone, Camera, MapPin,
  Utensils, Calendar, Dumbbell, PawPrint, Hammer, Laptop,
  Car, Clapperboard, Trophy, Ticket, Gamepad2, Baby
} from 'lucide-react';

export interface Touchpoint {
  name: string;
  description: string;
  trigger: string;
  dataFlow: string;
}

export interface DomainRelation {
  targetId: string;
  type: 'dependency' | 'interaction' | 'feedback';
  description: string;
  touchpoints: Touchpoint[];
}

export interface DomainNode {
  id: string; // 00-09 code
  label: string;
  icon: any;
  category: string;
  description: string;
  relations: DomainRelation[];
}

export interface MegaProcessStep {
  domainId: string;
  action: string;
  description: string;
  artifact: string;
}

export interface MegaProcess {
  id: string;
  metaLoop: string; // MP-01 to MP-06
  title: string;
  description: string;
  steps: MegaProcessStep[];
}

// --- 10-Vertical Domain Structure (Validated) ---
export const ECOSYSTEM_RELATIONS: DomainNode[] = [
  {
    id: '00',
    label: 'Core Identity',
    icon: Users,
    category: 'Foundation',
    description: 'IAM [Keycloak], Multi-Tenancy, and RBAC.',
    relations: []
  },
  {
    id: '01',
    label: 'Logistics',
    icon: Truck,
    category: 'Physical',
    description: 'Delivery Core [Fleetbase], Routing, and Fulfillment.',
    relations: []
  },
  {
    id: '02',
    label: 'Commerce',
    icon: ShoppingBag,
    category: 'Transactional',
    description: 'Headless Commerce [Medusa], Cart, and Orders.',
    relations: []
  },
  {
    id: '03',
    label: 'Mobility',
    icon: Car,
    category: 'Physical',
    description: 'Taxi Hailing [Fleetbase], Routing [GraphHopper].',
    relations: []
  },
  {
    id: '04',
    label: 'Events',
    icon: Calendar,
    category: 'Experience',
    description: 'Ticketing [pretix] and Event Management.',
    relations: []
  },
  {
    id: '05',
    label: 'Tourism',
    icon: Plane,
    category: 'Experience',
    description: 'Trips, Itineraries, and Visitor Info [PayloadCMS].',
    relations: []
  },
  {
    id: '06',
    label: 'Media',
    icon: Clapperboard,
    category: 'Experience',
    description: 'VOD [PeerTube], Live Streaming [MediaMTX].',
    relations: []
  },
  {
    id: '07',
    label: 'Payments',
    icon: Coins,
    category: 'Financial',
    description: 'Wallet Ledger [Kill Bill], Payouts, and Fees.',
    relations: []
  },
  {
    id: '08',
    label: 'Health',
    icon: Stethoscope,
    category: 'Essential',
    description: 'EHR [OpenEMR], Telehealth [Jitsi], and Wellness.',
    relations: []
  },
  {
    id: '09',
    label: 'Government',
    icon: Gavel,
    category: 'Essential',
    description: 'Civic Services [Open311], Cases [Camunda].',
    relations: []
  },
  {
    id: '10',
    label: 'Energy',
    icon: Zap,
    category: 'Infrastructure',
    description: 'Smart City IoT [FIWARE] and Grid Management.',
    relations: []
  },
  {
    id: '11',
    label: 'Real Estate',
    icon: Building2,
    category: 'Assets',
    description: 'Property Mgmt [ERPNext], Listings, and Leasing.',
    relations: []
  },
  {
    id: '12',
    label: 'Education',
    icon: GraduationCap,
    category: 'Learning',
    description: 'LMS [Moodle], LRS [Learning Locker], Schools [openSIS].',
    relations: []
  },
  {
    id: '13',
    label: 'Auctions',
    icon: Gavel,
    category: 'Marketplace',
    description: 'Bidding Engine [Odoo] and Classifieds.',
    relations: []
  },
  {
    id: '14',
    label: 'Maintenance',
    icon: Hammer,
    category: 'Services',
    description: 'City Assets [OpenMAINT], Home Services [ERPNext].',
    relations: []
  },
  {
    id: '15',
    label: 'Automotive',
    icon: Car,
    category: 'Marketplace',
    description: 'Car Sales/Rentals [ERPNext], Fleet Ops.',
    relations: []
  },
  {
    id: '16',
    label: 'Smart Home',
    icon: Home,
    category: 'IoT',
    description: 'Home Hub [Home Assistant], Automation.',
    relations: []
  },
  {
    id: '17',
    label: 'Safety',
    icon: Shield,
    category: 'Civic',
    description: 'Incident Ops [Sahana Eden], Emergency Alerts.',
    relations: []
  },
  {
    id: '18',
    label: 'Social',
    icon: Smartphone,
    category: 'Community',
    description: 'Federated Social [Mastodon], Messaging [Matrix].',
    relations: []
  },
  {
    id: '19',
    label: 'Hyperlocal',
    icon: MapPin,
    category: 'Local',
    description: 'Zones [PostGIS], Local Signals, Moments.',
    relations: []
  },
  
  // --- Extended Domains (Mapped to 10-Verticals) ---
  { id: 'manufacturing', label: 'Manufacturing', icon: Factory, category: '01 Logistics (Ext)', description: 'Production', relations: [] },
  { id: 'agtech', label: 'AgTech', icon: Leaf, category: '01 Logistics (Source)', description: 'Agriculture', relations: [] },
  { id: 'science', label: 'Science', icon: Microscope, category: '08 Health (R&D)', description: 'Research', relations: [] },
  { id: 'education', label: 'Education', icon: GraduationCap, category: '00 Identity (Skill)', description: 'Learning', relations: [] }
];

export const MEGA_PROCESSES: MegaProcess[] = [
  // --- MP-01: THE DEMAND LOOP (Discover -> Decide -> Experience) ---
  {
    id: 'click-to-doorstep',
    metaLoop: 'MP-01 (Demand)',
    title: 'Click to Doorstep',
    description: 'User Journey: Standard E-Commerce Fulfillment.',
    steps: [
      { domainId: '02', action: 'Browse', description: 'User filters for products.', artifact: 'product-card' },
      { domainId: '07', action: 'Checkout', description: 'Secure payment processing.', artifact: 'payment-request' },
      { domainId: '01', action: 'Route', description: 'AI delivery route optimization.', artifact: 'eco-route-planner' },
      { domainId: '01', action: 'Deliver', description: 'Proof of delivery at doorstep.', artifact: 'proof-of-delivery' }
    ]
  },
  {
    id: 'weekend-getaway',
    metaLoop: 'MP-01 (Demand)',
    title: 'Weekend Getaway',
    description: 'User Journey: Spontaneous micro-tourism.',
    steps: [
      { domainId: '06', action: 'Discover', description: 'Finding a viral spot on social.', artifact: 'mini-video' },
      { domainId: '03', action: 'Rent', description: 'Short-term vehicle rental.', artifact: 'vehicle-booking' },
      { domainId: '05', action: 'Stay', description: 'Boutique hotel reservation.', artifact: 'hotel-concierge' },
      { domainId: '02', action: 'Dine', description: 'Local restaurant order.', artifact: 'service-menu' }
    ]
  },
  {
    id: 'symptoms-to-solution',
    metaLoop: 'MP-01 (Demand)',
    title: 'Symptoms to Solution',
    description: 'User Journey: Telehealth and Pharmacy.',
    steps: [
      { domainId: '08', action: 'Check', description: 'AI symptom assessment.', artifact: 'symptom-triage' },
      { domainId: '08', action: 'Consult', description: 'Telehealth video visit.', artifact: 'telehealth-doctor-console' },
      { domainId: '01', action: 'Dispatch', description: 'Pharmacy courier delivery.', artifact: 'driver-manifest' },
      { domainId: '07', action: 'Pay', description: 'Co-pay settlement.', artifact: 'insurance-claims-processor' }
    ]
  },

  // --- MP-02: THE SUPPLY LOOP (Create -> Publish -> Monetize) ---
  {
    id: 'media-mogul',
    metaLoop: 'MP-02 (Supply)',
    title: 'Media Mogul',
    description: 'Creator Journey: Content production to distribution.',
    steps: [
      { domainId: '06', action: 'Plan', description: 'Script and storyboard.', artifact: 'project-gantt' },
      { domainId: '06', action: 'Produce', description: 'Filming and production.', artifact: 'asset-tracker' },
      { domainId: '06', action: 'Stream', description: 'Global release.', artifact: 'media-player' },
      { domainId: '02', action: 'Merch', description: 'Selling fan merchandise.', artifact: 'product-card' }
    ]
  },
  {
    id: 'farm-to-fork',
    metaLoop: 'MP-02 (Supply)',
    title: 'Farm to Fork',
    description: 'Supply Chain: Food safety from soil to table.',
    steps: [
      { domainId: 'agtech', action: 'Grow', description: 'Precision agriculture monitoring.', artifact: 'precision-ag-dashboard' },
      { domainId: 'agtech', action: 'Harvest', description: 'Crop gathering and tagging.', artifact: 'harvest-log' },
      { domainId: '01', action: 'Cool', description: 'Cold chain transport.', artifact: 'cold-chain-monitor' },
      { domainId: '02', action: 'Sell', description: 'Retail shelf stocking.', artifact: 'omni-channel-inventory' }
    ]
  },
  {
    id: 'renovation-rescue',
    metaLoop: 'MP-02 (Supply)',
    title: 'Renovation Rescue',
    description: 'Supply Chain: Construction and materials.',
    steps: [
      { domainId: '11', action: 'Design', description: 'Architect blueprint review.', artifact: 'construction-project-tracker' },
      { domainId: '02', action: 'Buy', description: 'Bulk material purchase.', artifact: 'vendor-trust' },
      { domainId: '01', action: 'Haul', description: 'Heavy material delivery.', artifact: 'driver-manifest' }
    ]
  },

  // --- MP-03: THE TENANT LOOP (Onboard -> Operate -> Scale) ---
  {
    id: 'new-hire-onboarding',
    metaLoop: 'MP-03 (Tenant)',
    title: 'New Hire Onboarding',
    description: 'Tenant Ops: Employee lifecycle.',
    steps: [
      { domainId: '00', action: 'Recruit', description: 'Talent pipeline.', artifact: 'recruitment-pipeline' },
      { domainId: '00', action: 'Offer', description: 'Contract signing.', artifact: 'contract-lifecycle' },
      { domainId: '00', action: 'Onboard', description: 'IT and HR setup.', artifact: 'hr-onboarding' },
      { domainId: '07', action: 'Pay', description: 'Payroll enrollment.', artifact: 'payroll-run' }
    ]
  },
  {
    id: 'seed-to-scale',
    metaLoop: 'MP-03 (Tenant)',
    title: 'Seed to Scale',
    description: 'Tenant Ops: Startup growth.',
    steps: [
      { domainId: '09', action: 'Inc', description: 'Company formation.', artifact: 'civil-registry-record' },
      { domainId: '07', action: 'Raise', description: 'Seed funding.', artifact: 'payment-request' },
      { domainId: '02', action: 'Grow', description: 'Customer acquisition.', artifact: 'customer-lifetime-value-crm' },
      { domainId: '09', action: 'IPO', description: 'Public exit.', artifact: 'control-plane-console' } // System artifact usage
    ]
  },

  // --- MP-04: THE INTELLIGENCE LOOP (Sense -> Analyze -> Optimize) ---
  {
    id: 'traffic-optimization',
    metaLoop: 'MP-04 (Intelligence)',
    title: 'Traffic Optimization',
    description: 'Smart City: Real-time flow control.',
    steps: [
      { domainId: '09', action: 'Sense', description: 'IoT camera feed analysis.', artifact: 'traffic-monitor' },
      { domainId: '09', action: 'Analyze', description: 'AI inference on congestion.', artifact: 'ai-inference-log' },
      { domainId: '09', action: 'Act', description: 'Signal timing adjustment.', artifact: 'smart-grid-load-balancer' }
    ]
  },
  {
    id: 'grid-balancing',
    metaLoop: 'MP-04 (Intelligence)',
    title: 'Grid Balancing',
    description: 'Utilities: Energy load management.',
    steps: [
      { domainId: '10', action: 'Measure', description: 'Smart meter aggregation.', artifact: 'facility-energy-manager' },
      { domainId: '10', action: 'Analyze', description: 'Load prediction.', artifact: 'ai-inference-log' },
      { domainId: '10', action: 'Dispatch', description: 'Peaker plant activation.', artifact: 'smart-grid-load-balancer' }
    ]
  },

  // --- MP-05: THE LAW LOOP (Govern -> Secure -> Comply) ---
  {
    id: 'hack-to-harden',
    metaLoop: 'MP-05 (Law)',
    title: 'Hack to Harden',
    description: 'Security: Threat response lifecycle.',
    steps: [
      { domainId: '09', action: 'Detect', description: 'Intrusion alert.', artifact: 'threat-radar' },
      { domainId: '09', action: 'Audit', description: 'Security log review.', artifact: 'security-audit-log' },
      { domainId: '09', action: 'Block', description: 'SOC response.', artifact: 'soc-incident-response' },
      { domainId: '09', action: 'Patch', description: 'Compliance update.', artifact: 'compliance-checklist' }
    ]
  },
  {
    id: 'justice-journey',
    metaLoop: 'MP-05 (Law)',
    title: 'Justice Journey',
    description: 'Legal: Incident to resolution.',
    steps: [
      { domainId: '09', action: 'Report', description: 'Incident reporting.', artifact: 'issue-reporter' },
      { domainId: '09', action: 'Adjudicate', description: 'Court processing.', artifact: 'judicial-case-manager' },
      { domainId: '09', action: 'Record', description: 'Civil registry update.', artifact: 'civil-registry-record' }
    ]
  },

  // --- MP-06: THE GLOBAL LOOP (Configure -> Localize -> Deploy) ---
  {
    id: 'global-rollout',
    metaLoop: 'MP-06 (Global)',
    title: 'Market Expansion',
    description: 'Ops: Rolling out features to new regions.',
    steps: [
      { domainId: '00', action: 'Config', description: 'Feature flag setup.', artifact: 'config-rollout-tracker' },
      { domainId: '06', action: 'Localize', description: 'Content translation.', artifact: 'project-gantt' },
      { domainId: '00', action: 'Deploy', description: 'System propagation.', artifact: 'control-plane-console' }
    ]
  }
];
