
import { 
  Truck, ShoppingBag, Landmark, Stethoscope, GraduationCap, 
  Users, Building2, Home, Car, Briefcase, Lightbulb, Plane, 
  Sprout, Building, Settings, Factory, Shield, Globe, 
  HandHeart, Microscope, Siren, Heart, FlaskConical, 
  Video, Wifi, Anchor, Hammer, Gavel, Scale, Cpu,
  Coffee, Dumbbell, PawPrint, Bus, Ticket, Music, Gamepad2,
  Clapperboard, Trophy, Zap, Pickaxe, Baby, Megaphone, 
  Radio, HardHat, Tv, Newspaper, Palette, BookOpen
} from 'lucide-react';

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
  category: string;
  models: BusinessModelConfig[];
}

export const DOMAIN_GROUPS: GroupConfig[] = [
  // =========================================================================
  // SPECTRUM 1: PHYSICAL FULFILLMENT (Moving Atoms)
  // =========================================================================
  {
    id: 'logistics',
    label: 'Logistics',
    category: 'Physical Fulfillment',
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
            title: 'Logistics Execution',
            valueProp: 'Optimizing the movement of goods from yard to final mile.',
            stages: [
              { name: 'Yard', description: 'Managing facility throughput and dock assignments.', artifacts: ['yard-dock-scheduler'] },
              { name: 'Route', description: 'Planning and optimizing delivery paths.', artifacts: ['eco-route-planner', 'logistics-map', 'cold-chain-monitor'] },
              { name: 'Deliver', description: 'Last-mile execution and proof of delivery.', artifacts: ['digital-pod-manifest'] }
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
              { name: 'Receive', description: 'Secure pickup from lockers or locations.', artifacts: ['smart-locker', 'parcel-locker'] }
            ]
          }
        ]
      },
      {
        title: "Global Supply Chain",
        description: "Managing international trade and warehousing.",
        lines: [
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
            title: 'Trade & Customs',
            valueProp: 'Simplify cross-border logistics and compliance.',
            stages: [
              { name: 'Clearance', description: 'Managing customs duties and documentation.', artifacts: ['customs-clearance'] },
              { name: 'Freight', description: 'Ocean and air freight booking.', artifacts: ['freight-quote'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    category: 'Physical Fulfillment',
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
      },
      {
        title: "Construction",
        description: "Large-scale infrastructure and building projects.",
        lines: [
          {
            title: 'Project Mgmt',
            valueProp: 'On-time, on-budget delivery of built assets.',
            stages: [
              { name: 'Plan', description: 'Blueprint and timeline management.', artifacts: ['construction-project-tracker'] },
              { name: 'Build', description: 'Daily site logs and progress.', artifacts: ['project-gantt'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'commerce',
    label: 'Commerce',
    category: 'Physical Fulfillment',
    description: "Facilitating the exchange of goods, services, and experiences.",
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
      },
      {
        title: "Hospitality & Dining",
        description: "Service-based experiences.",
        lines: [
          {
            title: 'Dining',
            valueProp: 'Restaurant and food service management.',
            stages: [
              { name: 'Menu', description: 'Digital catalog of offerings.', artifacts: ['service-menu'] },
              { name: 'Order', description: 'Kitchen display and tracking.', artifacts: ['order-tracker'] }
            ]
          },
          {
            title: 'Events',
            valueProp: 'Ticketed experiences and venues.',
            stages: [
              { name: 'Ticket', description: 'Access control and sales.', artifacts: ['ticket-pass'] },
              { name: 'Guide', description: 'Venue navigation.', artifacts: ['zone-heatmap'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'travel',
    label: 'Travel',
    category: 'Physical Fulfillment',
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
      },
      {
        title: "Tourism & Leisure",
        description: "Destinations, tours, and cruises.",
        lines: [
          {
            title: 'Tours',
            valueProp: 'Guided experiences.',
            stages: [
              { name: 'Book', description: 'Activity reservation.', artifacts: ['ticket-pass'] },
              { name: 'Guide', description: 'Interactive tour map.', artifacts: ['poi-carousel'] }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // SPECTRUM 2: FINANCIAL (Moving Value)
  // =========================================================================
  {
    id: 'fintech',
    label: 'Fintech',
    category: 'Financial',
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
      },
      {
        title: "Capital Markets",
        description: "Trading, investing, and asset management.",
        lines: [
          {
            title: 'Trading',
            valueProp: 'Market access and execution.',
            stages: [
              { name: 'Trade', description: 'Order placement.', artifacts: ['crypto-wallet'] },
              { name: 'Analyze', description: 'Market data visualization.', artifacts: ['analytics-snapshot'] }
            ]
          },
          {
            title: 'Wealth',
            valueProp: 'Portfolio management.',
            stages: [
              { name: 'Plan', description: 'Retirement and goal planning.', artifacts: ['progress-card'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'real-estate',
    label: 'Real Estate',
    category: 'Financial',
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
      },
      {
        title: "Home Living",
        description: "Consumer home services and automation.",
        lines: [
          {
            title: 'Smart Home',
            valueProp: 'Connected living experience.',
            stages: [
              { name: 'Control', description: 'IoT device management.', artifacts: ['iot-dashboard'] },
              { name: 'Secure', description: 'Home security monitoring.', artifacts: ['campus-safety-monitor'] }
            ]
          },
          {
            title: 'Services',
            valueProp: 'Maintenance and improvement.',
            stages: [
              { name: 'Repair', description: 'Booking home services.', artifacts: ['maintenance-req'] },
              { name: 'Improve', description: 'Renovation planning.', artifacts: ['urban-planning-grid'] }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // SPECTRUM 3: RISK & SAFETY (Protecting Life & Assets)
  // =========================================================================
  {
    id: 'insurance',
    label: 'Insurance',
    category: 'Risk & Safety',
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
    category: 'Risk & Safety',
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
      },
      {
        title: "Life Sciences",
        description: "Pharmaceuticals and biotech.",
        lines: [
          {
            title: 'Pharma',
            valueProp: 'Drug development and distribution.',
            stages: [
              { name: 'Trials', description: 'Clinical trial management.', artifacts: ['experiment-designer'] },
              { name: 'Supply', description: 'Cold chain drug distribution.', artifacts: ['cold-chain-monitor'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'automotive',
    label: 'Automotive',
    category: 'Risk & Safety',
    description: "Connecting drivers, vehicles, and infrastructure.",
    icon: Car,
    models: [
      {
        title: "Mobility & Services",
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
            title: 'Transport Services',
            valueProp: 'Moving people efficiently.',
            stages: [
              { name: 'Ride', description: 'Ride-hailing and taxi.', artifacts: ['vehicle-booking'] },
              { name: 'Rent', description: 'Short-term vehicle access.', artifacts: ['vehicle-booking'] }
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
    id: 'protection',
    label: 'Security & Legal',
    category: 'Risk & Safety',
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
      },
      {
        title: "Physical Security",
        description: "Safety of people and places.",
        lines: [
          {
            title: 'Access Control',
            valueProp: 'Managing entry and surveillance.',
            stages: [
              { name: 'Monitor', description: 'CCTV and sensor feeds.', artifacts: ['campus-safety-monitor'] },
              { name: 'Alert', description: 'Emergency response coordination.', artifacts: ['issue-reporter'] }
            ]
          }
        ]
      }
    ]
  },

  // =========================================================================
  // SPECTRUM 4: CIVIC & IDENTITY (Organizing Society)
  // =========================================================================
  {
    id: 'govtech',
    label: 'GovTech',
    category: 'Civic & Identity',
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
          },
          {
            title: 'Public Transit',
            valueProp: 'Managing mass transit systems.',
            stages: [
              { name: 'Route', description: 'Bus and metro scheduling.', artifacts: ['logistics-map'] },
              { name: 'Ride', description: 'Passenger ticketing.', artifacts: ['ticket-pass'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'education',
    label: 'Education',
    category: 'Civic & Identity',
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
    id: 'media',
    label: 'Media & Ent.',
    category: 'Civic & Identity',
    description: "Culture, entertainment, gaming, and information.",
    icon: Clapperboard,
    models: [
      {
        title: "Entertainment",
        description: "Movies, Music, and Events.",
        lines: [
          {
            title: 'Production',
            valueProp: 'Creating content.',
            stages: [
              { name: 'Plan', description: 'Script and storyboard.', artifacts: ['project-gantt'] },
              { name: 'Shoot', description: 'Production management.', artifacts: ['asset-tracker'] }
            ]
          },
          {
            title: 'Streaming',
            valueProp: 'Distributing content.',
            stages: [
              { name: 'Watch', description: 'Video playback.', artifacts: ['media-player'] },
              { name: 'Listen', description: 'Audio streaming.', artifacts: ['media-player'] }
            ]
          }
        ]
      },
      {
        title: "Gaming & Sports",
        description: "Interactive and competitive entertainment.",
        lines: [
          {
            title: 'Gaming',
            valueProp: 'Esports and casual gaming.',
            stages: [
              { name: 'Play', description: 'Game session.', artifacts: ['game-scoreboard'] },
              { name: 'Compete', description: 'Tournament bracket.', artifacts: ['game-scoreboard'] }
            ]
          },
          {
            title: 'Sports',
            valueProp: 'Leagues and teams.',
            stages: [
              { name: 'Manage', description: 'Team roster and stats.', artifacts: ['volunteer-roster'] },
              { name: 'Score', description: 'Live match data.', artifacts: ['game-scoreboard'] }
            ]
          }
        ]
      },
      {
        title: "Publishing",
        description: "News and literature.",
        lines: [
          {
            title: 'Newsroom',
            valueProp: 'Journalism and reporting.',
            stages: [
              { name: 'Write', description: 'Content authoring.', artifacts: ['research-paper'] },
              { name: 'Publish', description: 'Distribution.', artifacts: ['poi-carousel'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'lifestyle',
    label: 'Lifestyle & Care',
    category: 'Civic & Identity',
    description: "Enhancing daily life through personal care, wellness, and family.",
    icon: Heart,
    models: [
      {
        title: "Wellness & Fitness",
        description: "Physical health and activity tracking.",
        lines: [
          {
            title: 'Fitness',
            valueProp: 'Empowering active lifestyles.',
            stages: [
              { name: 'Train', description: 'Workout tracking and plans.', artifacts: ['health-snapshot'] },
              { name: 'Book', description: 'Gym and class reservations.', artifacts: ['service-menu'] }
            ]
          },
          {
            title: 'Personal Care',
            valueProp: 'Beauty and spa services.',
            stages: [
              { name: 'Book', description: 'Appointment scheduling.', artifacts: ['service-menu'] }
            ]
          }
        ]
      },
      {
        title: "Family Care",
        description: "Childcare and elder care.",
        lines: [
          {
            title: 'Caregiving',
            valueProp: 'Support for loved ones.',
            stages: [
              { name: 'Schedule', description: 'Care coordination.', artifacts: ['calendar-selector'] },
              { name: 'Monitor', description: 'Safety and wellness check.', artifacts: ['health-snapshot'] }
            ]
          }
        ]
      },
      {
        title: "Pet Care",
        description: "Services for furry companions.",
        lines: [
          {
            title: 'Vet Services',
            valueProp: 'Medical care for animals.',
            stages: [
              { name: 'Health', description: 'Vaccination and checkup records.', artifacts: ['emr-patient-record'] }
            ]
          },
          {
            title: 'Daily Care',
            valueProp: 'Walking, sitting, and grooming.',
            stages: [
              { name: 'Walk', description: 'Tracking dog walks.', artifacts: ['logistics-map'] },
              { name: 'Sit', description: 'Booking sitters.', artifacts: ['freelancer-card'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'social',
    label: 'Social',
    category: 'Civic & Identity',
    description: "Building community through engagement and interaction.",
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
    id: 'professional',
    label: 'Professional',
    category: 'Civic & Identity',
    description: "Supporting the gig economy, corporate services, and knowledge work.",
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
      },
      {
        title: "Corporate Services",
        description: "B2B professional services.",
        lines: [
          {
            title: 'Consulting',
            valueProp: 'Advisory and strategy.',
            stages: [
              { name: 'Project', description: 'Engagement management.', artifacts: ['project-gantt'] },
              { name: 'Bill', description: 'Time and expense.', artifacts: ['consultation-timer'] }
            ]
          },
          {
            title: 'Marketing',
            valueProp: 'Brand and outreach.',
            stages: [
              { name: 'Campaign', description: 'Ad campaign management.', artifacts: ['analytics-snapshot'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    category: 'Civic & Identity',
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

  // =========================================================================
  // SPECTRUM 5: SUSTAINABLE WORLD (Managing Resources)
  // =========================================================================
  {
    id: 'utilities',
    label: 'Energy & Res.',
    category: 'Sustainable World',
    description: "Monitoring and managing essential resource consumption and extraction.",
    icon: Zap,
    models: [
      {
        title: "Energy Grid",
        description: "Power generation and distribution.",
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
            title: 'Renewables',
            valueProp: 'Solar and wind management.',
            stages: [
              { name: 'Generate', description: 'Tracking production output.', artifacts: ['energy-graph'] }
            ]
          }
        ]
      },
      {
        title: "Extraction",
        description: "Mining and raw materials.",
        lines: [
          {
            title: 'Mining',
            valueProp: 'Resource extraction operations.',
            stages: [
              { name: 'Dig', description: 'Site operations.', artifacts: ['harvest-log'] },
              { name: 'Safety', description: 'Worker safety monitoring.', artifacts: ['campus-safety-monitor'] }
            ]
          }
        ]
      },
      {
        title: "Telecoms",
        description: "Connectivity infrastructure.",
        lines: [
          {
            title: 'Network Ops',
            valueProp: 'Maintaining digital connectivity.',
            stages: [
              { name: 'Signal', description: 'Monitoring network strength.', artifacts: ['iot-dashboard'] },
              { name: 'Plan', description: 'Data plan management.', artifacts: ['service-menu'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'agtech',
    label: 'AgTech',
    category: 'Sustainable World',
    description: "Sustainable food production and environmental monitoring.",
    icon: Sprout,
    models: [
      {
        title: "Precision Ag",
        description: "Data-driven farming.",
        lines: [
          {
            title: 'Farm Ops',
            valueProp: 'Maximize yield and minimize waste.',
            stages: [
              { name: 'Monitor', description: 'Soil and crop health analysis.', artifacts: ['precision-ag-dashboard'] },
              { name: 'Harvest', description: 'Tracking yield and collection.', artifacts: ['harvest-log'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'science',
    label: 'Science',
    category: 'Sustainable World',
    description: "Research, discovery, and laboratory management.",
    icon: Microscope,
    models: [
      {
        title: "R&D",
        description: "Scientific discovery process.",
        lines: [
          {
            title: 'Lab Ops',
            valueProp: 'Streamlining research workflows.',
            stages: [
              { name: 'Experiment', description: 'Designing and running tests.', artifacts: ['experiment-designer'] },
              { name: 'Sample', description: 'Tracking biological samples.', artifacts: ['lab-sample-manager'] },
              { name: 'Publish', description: 'Sharing findings.', artifacts: ['research-paper'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'non-profit',
    label: 'Non-Profit',
    category: 'Sustainable World',
    description: "Philanthropy, volunteering, and social impact.",
    icon: HandHeart,
    models: [
      {
        title: "Impact",
        description: "Managing social good initiatives.",
        lines: [
          {
            title: 'Volunteering',
            valueProp: 'Mobilizing human capital for good.',
            stages: [
              { name: 'Recruit', description: 'Finding and onboarding volunteers.', artifacts: ['volunteer-roster'] },
              { name: 'Track', description: 'Monitoring impact hours.', artifacts: ['lesson-tracker'] }
            ]
          },
          {
            title: 'Donations',
            valueProp: 'Fundraising and grant management.',
            stages: [
              { name: 'Fundraise', description: 'Campaign management.', artifacts: ['payment-request'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'misc',
    label: 'Services / Misc',
    category: 'Civic & Identity',
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
          }
        ]
      }
    ]
  }
];

export const SPECTRUMS = [
  {
    id: 'physical',
    title: 'Physical Fulfillment',
    description: 'The backbone of the material world, orchestrating how atoms move, are made, and experienced.',
    color: 'amber',
    icon: Truck,
    domains: ['logistics', 'manufacturing', 'commerce', 'travel']
  },
  {
    id: 'financial',
    title: 'Financial',
    description: 'The circulatory system of value, managing assets, transactions, and ownership.',
    color: 'emerald',
    icon: Landmark,
    domains: ['fintech', 'real-estate']
  },
  {
    id: 'risk-safety',
    title: 'Risk & Safety',
    description: 'The protective layer of society, ensuring health, security, and resilience.',
    color: 'rose',
    icon: Shield,
    domains: ['insurance', 'health', 'automotive', 'protection']
  },
  {
    id: 'civic-identity',
    title: 'Civic & Identity',
    description: 'The organizational structure of human society, governance, and community.',
    color: 'indigo',
    icon: Building2,
    domains: ['govtech', 'education', 'media', 'lifestyle', 'social', 'professional', 'enterprise', 'misc']
  },
  {
    id: 'sustainable',
    title: 'Sustainable World',
    description: 'The foundation of our future, managing resources, energy, and scientific progress.',
    color: 'teal',
    icon: Globe,
    domains: ['utilities', 'agtech', 'science', 'non-profit']
  }
];
