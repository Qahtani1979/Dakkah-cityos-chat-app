// --- Grouping Configuration ---
export interface StageConfig {
  name: string;
  description: string;
  artifacts: string[];
}

export interface BusinessLineConfig {
  title: string;
  valueProp: string;
  stages: StageConfig[];
}

export interface BusinessModelConfig {
  title: string;
  description: string;
  lines: BusinessLineConfig[];
}

export interface GroupConfig {
  id: string;
  label: string;
  description: string;
  icon: any;
  models: BusinessModelConfig[];
}

export const DOMAIN_GROUPS: GroupConfig[] = [
  {
    id: 'logistics',
    label: 'Logistics',
    description: "Orchestrating the movement of goods, data, and value across the supply chain.",
    icon: Truck,
    models: [
      {
        title: "Fleet Management",
        description: "Complete lifecycle oversight of vehicle assets, operations, and compliance.",
        lines: [
          {
            title: 'Enterprise Assets',
            valueProp: 'Maximize Return on Assets (ROA) and minimize Total Cost of Ownership (TCO).',
            stages: [
              { name: 'Acquire', description: 'Procure new vehicles and assets based on capacity planning.', artifacts: ['procurement-request', 'asset-lifecycle-tco', 'lease-contract-manager'] },
              { name: 'Operate', description: 'Real-time monitoring of active fleet health and status.', artifacts: ['fleet-health-matrix', 'fuel-analytics', 'esg-carbon-tracker', 'eld-compliance-log'] },
              { name: 'Maintain', description: 'Preventative and reactive maintenance to ensure uptime.', artifacts: ['fleet-maintenance', 'parts-inventory', 'technician-job-card', 'vendor-repair-approval'] },
              { name: 'Dispose', description: 'End-of-life analysis and resale value optimization.', artifacts: ['asset-remarketing'] }
            ]
          },
          {
            title: 'Admin & Safety',
            valueProp: 'Protect the fleet from risk, liability, and administrative burden.',
            stages: [
              { name: 'Safety', description: 'Driver behavior modification and coaching.', artifacts: ['driver-safety-score', 'driver-coaching', 'accident-report-fnol'] },
              { name: 'Compliance', description: 'Regulatory adherence and tax reporting.', artifacts: ['eld-compliance-log', 'ifta-fuel-tax-manager', 'citation-manager'] },
              { name: 'Admin', description: 'Human resources and back-office operations.', artifacts: ['driver-settlement-sheet', 'registration-tracker', 'driver-qualification'] }
            ]
          },
          {
            title: 'Logistics Execution',
            valueProp: 'Optimizing the movement of goods from yard to final mile.',
            stages: [
               { name: 'Yard', description: 'Managing facility throughput and dock assignments.', artifacts: ['yard-dock-scheduler'] },
               { name: 'Route', description: 'Planning and optimizing delivery paths.', artifacts: ['eco-route-planner', 'logistics-map', 'cold-chain-monitor'] },
               { name: 'Deliver', description: 'Last-mile execution and proof of delivery.', artifacts: ['digital-pod-manifest'] }
            ]
          },
          {
            title: 'Specialized & Shared',
            valueProp: 'Managing complex fleet types including EVs and Shared Pools.',
            stages: [
              { name: 'Electric', description: 'Charging infrastructure and range management.', artifacts: ['ev-charging-monitor'] },
              { name: 'Grey Fleet', description: 'Reimbursement and compliance for personal vehicles.', artifacts: ['grey-fleet-manager'] },
              { name: 'Shared Pool', description: 'Reservations for shared motor pool assets.', artifacts: ['vehicle-booking'] }
            ]
          },
          {
            title: 'Service & Ops',
            valueProp: 'Ensure operational efficiency and real-time visibility of active fleet assets.',
            stages: [
              { name: 'Plan', description: 'Route optimization and load planning for efficiency.', artifacts: ['eco-route-planner'] },
              { name: 'Dispatch', description: 'Assigning tasks and tracking execution in real-time.', artifacts: ['logistics-map'] },
              { name: 'Monitor', description: 'IoT sensor tracking for cargo condition and safety.', artifacts: ['iot-dashboard'] }
            ]
          },
          {
            title: 'Compliance',
            valueProp: 'Mitigate risk and ensure regulatory adherence for drivers and vehicles.',
            stages: [
              { name: 'Monitor', description: 'Tracking hours of service and driver behavior.', artifacts: ['digital-logbook'] },
              { name: 'Report', description: 'Generating regulatory reports and scorecards.', artifacts: ['telematics-scorecard'] },
              { name: 'Audit', description: 'Managing incidents and audit trails.', artifacts: ['incident-report'] }
            ]
          }
        ]
      },
      {
        title: "Last Mile Delivery",
        description: "Connecting the final leg of the journey to the end consumer.",
        lines: [
          {
            title: 'Driver Hub',
            valueProp: 'Empower drivers with tools to manage their day, tasks, and performance.',
            stages: [
              { name: 'Start Shift', description: 'Check-in, vehicle inspection, and route loading.', artifacts: ['driver-manifest'] },
              { name: 'Task', description: 'Executing pickup and delivery tasks with proof.', artifacts: ['proof-of-delivery'] },
              { name: 'Performance', description: 'Tracking earnings and productivity metrics.', artifacts: ['driver-stats'] }
            ]
          },
          {
            title: 'Recipient CX',
            valueProp: 'Provide a seamless and transparent experience for the end customer.',
            stages: [
              { name: 'Preferences', description: 'Managing delivery time and location preferences.', artifacts: ['delivery-prefs'] },
              { name: 'Track', description: 'Real-time visibility into package status.', artifacts: ['logistics-timeline'] },
              { name: 'Receive', description: 'Secure pickup from lockers or locations.', artifacts: ['smart-locker', 'parcel-locker'] },
              { name: 'Return', description: 'Easy processing of return requests.', artifacts: ['return-manager'] }
            ]
          }
        ]
      },
      {
        title: "Freight & Warehousing",
        description: "Managing the storage and movement of bulk goods.",
        lines: [
          {
            title: 'Shipper Tools',
            valueProp: 'Streamline the first mile and shipping creation process for merchants.',
            stages: [
              { name: 'Quote', description: 'Calculating costs and comparing carrier rates.', artifacts: ['ar-package-sizer', 'freight-quote'] },
              { name: 'Label', description: 'Generating shipping documentation and labels.', artifacts: ['shipment-label'] }
            ]
          },
          {
            title: 'Warehouse Ops',
            valueProp: 'Optimize inventory flow and dock management efficiency.',
            stages: [
              { name: 'Inbound', description: 'Scheduling and receiving inventory.', artifacts: ['dock-scheduler'] },
              { name: 'Pick', description: 'Efficient item selection and packing.', artifacts: ['warehouse-picker'] },
              { name: 'Outbound', description: 'Loading and dispatching shipments.', artifacts: ['load-balancer'] }
            ]
          },
          {
            title: 'Global Trade',
            valueProp: 'Simplify cross-border logistics and compliance.',
            stages: [
              { name: 'Clearance', description: 'Managing customs duties and documentation.', artifacts: ['customs-clearance'] }
            ]
          }
        ]
      },
      {
        title: "Supply Chain Strategy",
        description: "High-level planning and optimization of the supply network.",
        lines: [
          {
            title: 'Planning & Forecasting',
            valueProp: 'Align supply with demand using predictive models.',
            stages: [
              { name: 'Predict', description: 'Forecasting future demand based on trends.', artifacts: ['demand-forecast'] },
              { name: 'Stock', description: 'Optimizing inventory levels across the network.', artifacts: ['inventory-planning'] }
            ]
          },
          {
            title: 'Partner Mgmt',
            valueProp: 'Manage relationships and performance of logistics partners.',
            stages: [
              { name: 'Partner', description: 'Managing carrier and 3PL relationships.', artifacts: ['carrier-network'] }
            ]
          }
        ]
      },
      {
        title: "Facility Extensions",
        description: "Specialized operations beyond standard warehousing.",
        lines: [
          {
            title: 'Yard Management',
            valueProp: 'Optimize the flow of assets outside the warehouse walls.',
            stages: [
              { name: 'Gate', description: 'Managing inbound/outbound traffic flow.', artifacts: ['yard-monitor'] }
            ]
          },
          {
            title: 'Reverse Logistics',
            valueProp: 'Turn returns into recovered value.',
            stages: [
              { name: 'Recover', description: 'Processing returns and RMA disposition.', artifacts: ['reverse-logistics'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    description: "Optimizing production lines, quality assurance, and industrial operations.",
    icon: Factory,
    models: [
      {
        title: "Industrial Ops",
        description: "Managing the factory floor and production lifecycle.",
        lines: [
          {
            title: 'Production',
            valueProp: 'Maximize output and minimize downtime.',
            stages: [
              { name: 'Plan', description: 'Scheduling production runs.', artifacts: ['production-schedule-gantt'] },
              { name: 'Monitor', description: 'Real-time efficiency tracking (OEE).', artifacts: ['oee-dashboard'] }
            ]
          },
          {
            title: 'Quality & Maintenance',
            valueProp: 'Ensure product quality and asset uptime.',
            stages: [
              { name: 'Inspect', description: 'In-line quality assurance checks.', artifacts: ['quality-control-station'] },
              { name: 'Repair', description: 'Scheduling fixes.', artifacts: ['maintenance-req', 'parts-inventory'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'fintech',
    label: 'Fintech',
    description: "Managing financial flows, assets, and obligations.",
    icon: Landmark,
    models: [
      {
        title: "Financial Services",
        description: "Core banking and financial management tools.",
        lines: [
          {
            title: 'Banking Core',
            valueProp: 'Secure and compliant financial infrastructure.',
            stages: [
              { name: 'Onboard', description: 'KYC/AML identity verification.', artifacts: ['kyc-verification-portal'] },
              { name: 'Lend', description: 'Credit underwriting and origination.', artifacts: ['loan-underwriting-desk'] },
              { name: 'Protect', description: 'Real-time fraud monitoring.', artifacts: ['fraud-detection-console'] }
            ]
          },
          {
            title: 'Payments & Treasury',
            valueProp: 'Seamless money movement.',
            stages: [
              { name: 'Transact', description: 'Sending and receiving funds.', artifacts: ['payment-request', 'crypto-wallet'] },
              { name: 'Reconcile', description: 'Tracking cash flow and expenses.', artifacts: ['invoice-preview', 'credit-gauge'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'insurance',
    label: 'Insurance',
    description: "Managing risk, policies, and claims.",
    icon: Shield,
    models: [
      {
        title: "Insurance Ops",
        description: "Core insurance lifecycle management.",
        lines: [
          {
            title: 'Policy Lifecycle',
            valueProp: 'End-to-end policy administration.',
            stages: [
              { name: 'Admin', description: 'Policy issuance and management.', artifacts: ['policy-admin-system'] },
              { name: 'Risk', description: 'Actuarial risk analysis.', artifacts: ['actuarial-risk-heatmap'] }
            ]
          },
          {
            title: 'Claims',
            valueProp: 'Efficient claims processing.',
            stages: [
              { name: 'Process', description: 'Claims adjustment workbench.', artifacts: ['claims-adjuster-workbench'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'health',
    label: 'Health',
    description: "Delivering care, monitoring wellness, and managing clinical workflows.",
    icon: Stethoscope,
    models: [
      {
        title: "Digital Health",
        description: "Remote care and wellness monitoring.",
        lines: [
          {
            title: 'Clinical Ops',
            valueProp: 'Streamline provider workflows and patient data.',
            stages: [
              { name: 'Chart', description: 'Electronic Medical Records (EMR).', artifacts: ['emr-patient-record'] },
              { name: 'Visit', description: 'Telehealth video consultations.', artifacts: ['telehealth-doctor-console'] },
              { name: 'Bill', description: 'Insurance claims and revenue cycle.', artifacts: ['insurance-claims-processor'] }
            ]
          },
          {
            title: 'Patient Journey',
            valueProp: 'Empower patients with self-service tools.',
            stages: [
              { name: 'Triage', description: 'Symptom assessment and routing.', artifacts: ['symptom-triage'] },
              { name: 'Monitor', description: 'Wellness tracking from wearables.', artifacts: ['health-snapshot'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'education',
    label: 'Education',
    description: "Empowering growth through learning, assessment, and knowledge management.",
    icon: GraduationCap,
    models: [
      {
        title: "EdTech Ecosystem",
        description: "Learning management and skill acquisition.",
        lines: [
          {
            title: 'School Admin',
            valueProp: 'Centralize student records and campus operations.',
            stages: [
              { name: 'Records', description: 'Managing grades, transcripts, and attendance.', artifacts: ['student-info-system'] },
              { name: 'Safety', description: 'Monitoring campus security and access.', artifacts: ['campus-safety-monitor'] }
            ]
          },
          {
            title: 'Classroom Tools',
            valueProp: 'Empower teachers and engage students.',
            stages: [
              { name: 'Plan', description: 'Designing curriculum and lessons.', artifacts: ['curriculum-builder'] },
              { name: 'Learn', description: 'Consuming content and assignments.', artifacts: ['lesson-tracker'] },
              { name: 'Assess', description: 'Testing knowledge and feedback.', artifacts: ['voice-note'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'social',
    label: 'Social',
    description: "Building community through engagement, content, and interaction.",
    icon: Users,
    models: [
      {
        title: "Community Platform",
        description: "Social networking and engagement tools.",
        lines: [
          {
            title: 'Engagement',
            valueProp: 'Drive user retention through social mechanics.',
            stages: [
              { name: 'Interact', description: 'Consuming and reacting to content.', artifacts: ['mini-video'] },
              { name: 'Gamify', description: 'Incentivizing participation.', artifacts: ['poll-card', 'game-scoreboard'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'govtech',
    label: 'GovTech',
    description: "Streamlining public services and citizen-government engagement.",
    icon: Building2,
    models: [
      {
        title: "E-Government",
        description: "Digital public service delivery.",
        lines: [
          {
            title: 'Core Registry',
            valueProp: 'The single source of truth for citizen data.',
            stages: [
              { name: 'Identity', description: 'Managing vital records and citizenship.', artifacts: ['civil-registry-record'] },
              { name: 'Justice', description: 'Case management for courts and legal.', artifacts: ['judicial-case-manager'] }
            ]
          },
          {
            title: 'Civic Services',
            valueProp: 'Digitalize citizen-government interactions.',
            stages: [
              { name: 'Apply', description: 'Submitting applications for services.', artifacts: ['issue-reporter', 'permit-app'] },
              { name: 'Plan', description: 'Urban planning and zoning analysis.', artifacts: ['urban-planning-grid'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'real-estate',
    label: 'Real Estate',
    description: "Managing property lifecycles from listing to maintenance.",
    icon: Home,
    models: [
      {
        title: "PropTech",
        description: "Real estate transactions and management.",
        lines: [
          {
            title: 'Asset Mgmt',
            valueProp: 'Maximize the value of commercial portfolios.',
            stages: [
              { name: 'Lease', description: 'Administering rent rolls and contracts.', artifacts: ['lease-admin-ledger'] },
              { name: 'Build', description: 'Tracking construction projects.', artifacts: ['construction-project-tracker'] }
            ]
          },
          {
            title: 'Facilities',
            valueProp: 'Optimize building performance.',
            stages: [
              { name: 'Energy', description: 'Monitoring consumption and systems.', artifacts: ['facility-energy-manager'] },
              { name: 'Maintain', description: 'Handling repairs and upkeep.', artifacts: ['maintenance-req'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'automotive',
    label: 'Automotive',
    description: "Connecting drivers, vehicles, and infrastructure.",
    icon: Car,
    models: [
      {
        title: "Mobility",
        description: "Vehicle connectivity and transport services.",
        lines: [
          {
            title: 'Connected Car',
            valueProp: 'Direct vehicle integration.',
            stages: [
              { name: 'Monitor', description: 'Tracking vehicle status and health.', artifacts: ['fleet-telematics-hub'] },
              { name: 'Charge', description: 'EV battery and charging status.', artifacts: ['ev-status'] }
            ]
          },
          {
            title: 'Infrastructure',
            valueProp: 'Seamless interaction with transport infrastructure.',
            stages: [
              { name: 'Park', description: 'Finding and paying for parking.', artifacts: ['parking-meter'] },
              { name: 'Toll', description: 'Automated toll payments.', artifacts: ['toll-pass'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'professional',
    label: 'Professional',
    description: "Supporting the gig economy and knowledge work.",
    icon: Briefcase,
    models: [
      {
        title: "Workforce",
        description: "Tools for independent workers.",
        lines: [
          {
            title: 'Recruiting',
            valueProp: 'Managing the hiring lifecycle.',
            stages: [
              { name: 'Pipeline', description: 'Tracking candidates through stages.', artifacts: ['recruitment-pipeline'] }
            ]
          },
          {
            title: 'Freelance Tools',
            valueProp: 'Enable gig economy workflows.',
            stages: [
              { name: 'Market', description: 'Showcasing skills and finding work.', artifacts: ['freelancer-card'] },
              { name: 'Bill', description: 'Tracking time and invoicing.', artifacts: ['consultation-timer'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'utilities',
    label: 'Utilities',
    description: "Monitoring and managing essential resource consumption.",
    icon: Lightbulb,
    models: [
      {
        title: "Smart Grid",
        description: "Energy and resource management.",
        lines: [
          {
            title: 'Grid Ops',
            valueProp: 'Balancing load and generation.',
            stages: [
              { name: 'Control', description: 'Substation load management.', artifacts: ['smart-grid-load-balancer'] },
              { name: 'Monitor', description: 'Detecting outages.', artifacts: ['outage-map'] }
            ]
          },
          {
            title: 'Consumer',
            valueProp: 'Smart utility management.',
            stages: [
              { name: 'Consume', description: 'Tracking usage patterns.', artifacts: ['energy-graph'] },
              { name: 'Bill', description: 'Paying utility invoices.', artifacts: ['bill-pay'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'travel',
    label: 'Travel',
    description: "Curating journeys from planning to experience.",
    icon: Plane,
    models: [
      {
        title: "Travel Tech",
        description: "End-to-end trip management.",
        lines: [
          {
            title: 'Agency Ops',
            valueProp: 'Professional booking tools.',
            stages: [
              { name: 'Book', description: 'GDS Terminal for agents.', artifacts: ['gds-booking-terminal'] },
              { name: 'Itinerary', description: 'Managing trip schedules.', artifacts: ['itinerary-timeline'] }
            ]
          },
          {
            title: 'Passenger',
            valueProp: 'Traveler experience tools.',
            stages: [
              { name: 'Board', description: 'Mobile boarding pass.', artifacts: ['boarding-pass'] },
              { name: 'Stay', description: 'Hotel services.', artifacts: ['hotel-concierge'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'agtech',
    label: 'AgTech',
    description: "Optimizing agricultural production and sustainability.",
    icon: Sprout,
    models: [
      {
        title: "Smart Farming",
        description: "Precision agriculture technology.",
        lines: [
          {
            title: 'Field Ops',
            valueProp: 'Precision agriculture tools.',
            stages: [
              { name: 'Monitor', description: 'Soil and crop sensors.', artifacts: ['precision-ag-dashboard'] },
              { name: 'Analyze', description: 'Livestock health.', artifacts: ['livestock-tracker'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    description: "Managing workforce, facilities, and corporate assets.",
    icon: Building,
    models: [
      {
        title: "Corporate Services",
        description: "Internal business operations.",
        lines: [
          {
            title: 'Workplace',
            valueProp: 'Employee and facility management.',
            stages: [
              { name: 'Onboard', description: 'Welcoming new employees.', artifacts: ['hr-onboarding'] },
              { name: 'Engage', description: 'Corporate communications.', artifacts: ['digital-signage'] },
              { name: 'Manage', description: 'Tracking company assets.', artifacts: ['asset-tracker'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'commerce',
    label: 'Commerce',
    description: "Facilitating the exchange of goods and services.",
    icon: ShoppingBag,
    models: [
      {
        title: "Retail & E-Com",
        description: "Online and offline commerce operations.",
        lines: [
          {
            title: 'Storefront',
            valueProp: 'Engaging customer experiences.',
            stages: [
              { name: 'Browse', description: 'Product discovery and comparison.', artifacts: ['product-card', 'smart-filters', 'comparison-grid'] },
              { name: 'Buy', description: 'Conversion and checkout.', artifacts: ['flash-sale', 'vendor-trust'] }
            ]
          },
          {
            title: 'Merchant Ops',
            valueProp: 'Backend retail operations.',
            stages: [
              { name: 'Supply', description: 'Vendor and inventory management.', artifacts: ['vendor-performance-scorecard', 'omni-channel-inventory'] },
              { name: 'Grow', description: 'Customer retention and loyalty.', artifacts: ['customer-lifetime-value-crm'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'misc',
    label: 'Services / Misc',
    description: "Core UI patterns and lifestyle services.",
    icon: Settings,
    models: [
      {
        title: "General",
        description: "Reusable components and services.",
        lines: [
          {
            title: 'Core UI',
            valueProp: 'Reusable UI patterns.',
            stages: [
              { name: 'Interact', description: 'Basic user interaction components.', artifacts: ['confirmation-card', 'selection-chips', 'progress-card', 'calendar-selector', 'form-group', 'map-view', 'analytics-snapshot', 'media-player'] }
            ]
          },
          {
            title: 'Events & Dining',
            valueProp: 'Lifestyle components.',
            stages: [
              { name: 'Discover', description: 'Finding events and places.', artifacts: ['event-carousel', 'poi-carousel'] },
              { name: 'Attend', description: 'Participating in activities.', artifacts: ['ambassador-carousel', 'ticket-pass', 'service-menu', 'order-tracker', 'zone-heatmap'] }
            ]
          }
        ]
      }
    ]
  },
  // --- New Domains ---
  {
    id: 'non-profit',
    label: 'Non-Profit & Philanthropy',
    description: "The Altruistic Spectrum: Driving social impact, volunteerism, and charitable giving.",
    icon: HandHeart,
    models: [
      {
        title: "Impact Operations",
        description: "Managing the lifecycle of charitable missions and donor relations.",
        lines: [
          {
            title: 'Resource Mobilization',
            valueProp: 'Sustainable funding for mission success.',
            stages: [
              { name: 'Engage', description: 'Major donor CRM.', artifacts: ['donor-impact-crm'] },
              { name: 'Give', description: 'Processing donations.', artifacts: ['donation-card'] },
              { name: 'Retain', description: 'Reporting impact.', artifacts: ['impact-report'] }
            ]
          },
          {
            title: 'Mission Delivery',
            valueProp: 'Effective execution of charitable programs.',
            stages: [
              { name: 'Mobilize', description: 'Coordinating volunteers.', artifacts: ['volunteer-roster'] },
              { name: 'Execute', description: 'Delivering aid.', artifacts: ['aid-distribution-map'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'science',
    label: 'Science & R&D',
    description: "The Discovery Spectrum: Creating new knowledge through experimentation and research.",
    icon: Microscope,
    models: [
      {
        title: "Research Laboratory",
        description: "Managing the scientific method from hypothesis to publication.",
        lines: [
          {
            title: 'Lab Ops',
            valueProp: 'Ensuring sample integrity and data accuracy.',
            stages: [
              { name: 'Samples', description: 'LIMS sample tracking.', artifacts: ['lab-sample-manager'] },
              { name: 'Safety', description: 'Biohazard monitoring.', artifacts: ['biohazard-monitor'] }
            ]
          },
          {
            title: 'Discovery',
            valueProp: 'Accelerating the path from question to answer.',
            stages: [
              { name: 'Hypothesize', description: 'Designing experiments.', artifacts: ['experiment-designer'] },
              { name: 'Publish', description: 'Peer review workflows.', artifacts: ['research-paper-draft'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'protection',
    label: 'Security & Legal',
    description: "The Protection Spectrum: Safeguarding rights, assets, and infrastructure.",
    icon: Siren,
    models: [
      {
        title: "Defense & Justice",
        description: "Managing risk, compliance, and legal frameworks.",
        lines: [
          {
            title: 'Cyber Defense',
            valueProp: 'Proactive protection of digital assets.',
            stages: [
              { name: 'Respond', description: 'SOC incident response.', artifacts: ['soc-incident-response'] },
              { name: 'Detect', description: 'Threat monitoring.', artifacts: ['threat-radar'] }
            ]
          },
          {
            title: 'Legal Ops',
            valueProp: 'Streamlining compliance and corporate governance.',
            stages: [
              { name: 'Comply', description: 'Tracking regulatory adherence.', artifacts: ['compliance-checklist'] },
              { name: 'Govern', description: 'Managing contract lifecycles.', artifacts: ['contract-lifecycle'] }
            ]
          }
        ]
      }
    ]
  }
];

// --- Spectrum Data ---
export const SPECTRUMS = [
  {
    id: 'business-engine',
    title: 'The Business Engine',
    description: 'Domains that power operations, infrastructure, and economic flow.',
    color: 'blue',
    icon: Factory,
    domains: ['logistics', 'manufacturing', 'fintech', 'insurance', 'enterprise', 'agtech', 'professional', 'govtech']
  },
  {
    id: 'life-experience',
    title: 'The Life Experience',
    description: 'Domains that touch daily living, wellness, and personal interaction.',
    color: 'rose',
    icon: Heart,
    domains: ['health', 'education', 'social', 'real-estate', 'automotive', 'travel', 'utilities']
  },
  {
    id: 'civil-society',
    title: 'Civil Society',
    description: 'The Altruistic Spectrum: Domains for social impact and community.',
    color: 'amber',
    icon: HandHeart,
    domains: ['non-profit']
  },
  {
    id: 'discovery',
    title: 'Discovery',
    description: 'The Science Spectrum: Domains for research and innovation.',
    color: 'violet',
    icon: FlaskConical,
    domains: ['science']
  },
  {
    id: 'protection',
    title: 'Protection',
    description: 'The Security Spectrum: Domains for safety and justice.',
    color: 'slate',
    icon: Shield,
    domains: ['protection']
  },
  {
    id: 'bridge',
    title: 'The Bridge',
    description: 'Domains that connect businesses to consumers.',
    color: 'emerald',
    icon: Globe,
    domains: ['commerce', 'misc']
  }
];
