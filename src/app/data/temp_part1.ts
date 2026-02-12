import { 
  X, Palette, Layout, Smartphone, Monitor, 
  Truck, ShoppingBag, Landmark, Stethoscope, GraduationCap, 
  Users, Building2, Home, Car, Briefcase, Lightbulb, Plane, 
  Sprout, Building, Settings, Info, Database, User,
  Search, Table as TableIcon, ExternalLink, ChevronLeft, ChevronRight,
  Activity, ArrowRight, ChevronDown, List, Hash, CornerDownRight, Zap,
  Factory, Shield, Globe, Heart, FlaskConical, Scale, Lock, HandHeart, Microscope, Siren,
  GitBranch, CheckCircle, ArrowLeftRight, MonitorPlay, Box, FileText, Layers, Repeat
} from 'lucide-react';
import { MASTER_REGISTRY } from './registry-loader';

// --- Domain Registry Data ---
export const DOMAIN_REGISTRY = MASTER_REGISTRY;

// --- Mock Artifact Data ---
export const MOCK_ARTIFACT_DATA: Record<string, any> = {
  // --- Logistics ---
  'logistics-map': { 
    assets: [
      { id: 'TRK-01', x: 20, y: 30, status: 'moving', bearing: 45 }, 
      { id: 'TRK-02', x: 60, y: 70, status: 'delayed', bearing: 180 },
      { id: 'TRK-03', x: 40, y: 50, status: 'moving', bearing: 90 }
    ],
    bgImage: "https://images.unsplash.com/photo-1681514583222-0579e6835666?auto=format&fit=crop&q=80&w=800"
  },
  'logistics-timeline': { 
    id: 'PKG-8892', 
    currentStage: 'customs',
    stages: [
      { stage: 'pickup', time: '09:00 AM', completed: true },
      { stage: 'transit', time: '02:00 PM', completed: true },
      { stage: 'customs', time: 'In Progress', completed: false },
      { stage: 'delivery', time: 'Est. Tomorrow', completed: false }
    ]
  },
  'proof-of-delivery': { 
    id: 'ORD-991', 
    signedBy: 'John Doe', 
    timestamp: '2025-01-15 14:30', 
    signature: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/Signature_sample.svg' 
  },
  'iot-dashboard': { 
    temp: 4.2, 
    humidity: 55, 
    status: 'optimal',
    alerts: [] 
  },
  'fleet-maintenance': { 
    vehicleId: 'TRK-99', 
    fuel: 45, 
    tires: 90, 
    serviceDue: '2025-02-01',
    status: 'Operational'
  },
  'warehouse-picker': { 
    orderId: 'PICK-112', 
    items: [
      { id: '1', sku: 'WID-100', name: 'Widget A', loc: 'A-01', qty: 2, picked: false }, 
      { id: '2', sku: 'GAD-200', name: 'Gadget B', loc: 'B-04', qty: 1, picked: true },
      { id: '3', sku: 'TOOL-X', name: 'Power Drill', loc: 'C-12', qty: 1, picked: false }
    ] 
  },
  'freight-quote': { 
    defaultWeight: 5,
    defaultDims: { l: 20, w: 20, h: 10 },
    quotes: [
      { name: "Express Air", type: "Express", eta: "2 Days", price: "$120.00" },
      { name: "Standard Ground", type: "Standard", eta: "5-7 Days", price: "$45.50" }
    ]
  },
  'shipment-label': { 
    id: "LBL-882",
    serviceLevel: "EXP",
    trackingNumber: "1Z999AA10123456784",
    sender: { name: "Acme Corp", address: "123 Ind. Estate", city: "Riyadh, SA" },
    receiver: { name: "John Smith", address: "45 Palm St", city: "Jeddah, SA" }
  },
  'driver-manifest': {
    shiftId: "SHIFT-AM-01",
    date: "Today, Oct 24",
    stops: [
      { id: "1", type: "PICKUP", customer: "MegaStore HQ", address: "King Fahd Rd, Exit 4", timeWindow: "08:00 - 10:00", status: "completed" },
      { id: "2", type: "DROP", customer: "Small Mart", address: "Olaya St, Building 12", timeWindow: "10:30 - 11:30", status: "pending" },
      { id: "3", type: "DROP", customer: "Tech Zone", address: "Digital City, B4", timeWindow: "12:00 - 13:00", status: "pending" }
    ]
  },
  'load-balancer': {
    truckType: "5-Ton Box",
    slots: [
      { id: "H1", type: "heavy" }, { id: "H2", type: "heavy" }, { id: "S1", type: "standard" }, { id: "S2", type: "standard" },
      { id: "H3", type: "heavy" }, { id: "H4", type: "heavy" }, { id: "S3", type: "standard" }, { id: "S4", type: "standard" },
      { id: "F1", type: "fragile" }, { id: "F2", type: "fragile" }, { id: "", type: "empty" }, { id: "", type: "empty" },
      { id: "S5", type: "standard" }, { id: "S6", type: "standard" }, { id: "", type: "empty" }, { id: "", type: "empty" },
      { id: "", type: "empty" }, { id: "", type: "empty" }, { id: "", type: "empty" }, { id: "", type: "empty" },
      { id: "", type: "empty" }, { id: "", type: "empty" }, { id: "", type: "empty" }, { id: "", type: "empty" }
    ]
  },
  'incident-report': { id: 'INC-NEW', shipmentId: "TRK-99281-X" },
  'delivery-prefs': { 
    leaveAtDoor: true, 
    callOnArrival: false, 
    gateCode: '4491', 
    instructions: 'Leave package behind the planter.' 
  },
  'return-manager': { 
    orderId: 'ORD-9921', 
    items: [
      { id: 'i1', name: 'Wireless Headphones', variant: 'Black', price: '$129.00', image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=200' },
      { id: 'i2', name: 'USB-C Cable', variant: '2m Braided', price: '$12.00', image: 'https://images.unsplash.com/photo-1761497715258-d144090c6d02?auto=format&fit=crop&q=80&w=200' }
    ] 
  },
  'smart-locker': { 
    lockers: [
      { id: 'l1', name: 'Locker Station 01', distance: '0.3 km', address: 'Metro Station Exit A', status: 'Available' },
      { id: 'l2', name: 'Mall Box', distance: '1.2 km', address: 'Central Mall, L1', status: 'Full' },
      { id: 'l3', name: 'Gas Stop Box', distance: '2.5 km', address: 'Shell Station', status: 'Available' }
    ] 
  },
  'driver-stats': { 
    earnings: '$142.50',
    trips: 12,
    hours: 6.5,
    rating: 4.9,
    driverImage: 'https://images.unsplash.com/photo-1659353220597-71b8c6a56259?auto=format&fit=crop&q=80&w=200'
  },
  
  // --- Advanced Logistics Artifacts ---
  'ar-package-sizer': {
    detectedItem: "Ceramic Vase",
    dimensions: { l: 24, w: 18, h: 42 },
    recommendation: { boxType: "Medium Box (M2)", price: "$2.50" }
  },
  'eco-route-planner': {
    origin: "Warehouse A",
    destination: "Downtown Hub",
    routes: [
      { id: "r1", label: "Fastest", duration: "42 min", distance: "35km", co2: "8.5kg", cost: "$12", type: "standard" },
      { id: "r2", label: "Eco-Friendly", duration: "55 min", distance: "28km", co2: "3.2kg", cost: "$8", type: "eco" }
    ]
  },
  'dock-scheduler': {
    warehouseName: "Riyadh Fulfillment Ctr",
    date: "Oct 24",
    bays: [
      { id: "b1", name: "Bay 01", status: "Occupied" },
      { id: "b2", name: "Bay 02", status: "Free" }
    ],
    slots: [
      { time: "08:00", available: false },
      { time: "09:00", available: true },
      { time: "10:00", available: true },
      { time: "11:00", available: false },
      { time: "12:00", available: true },
      { time: "13:00", available: true }
    ]
  },
  'customs-clearance': {
    port: "King Khaled Int'l",
    invoiceValue: "$1,250.00",
    dutyRate: 5,
    dutyAmount: "$62.50",
    taxAmount: "$187.50",
    totalDue: "$250.00"
  },
  'telematics-scorecard': {
    driverName: "Ahmed Al-Farsi",
    driverId: "DRV-101",
    score: 88,
    lastEventId: "EVT-9921",
    events: { speeding: 2, braking: 1, cornering: 0 }
  },
  'fuel-analytics': {
    fuelType: "Diesel",
    efficiency: "8.2",
    costPerMile: "$0.55",
    alertId: "ALERT-F99",
    history: [40, 65, 45, 80, 55, 70, 60, 90, 50, 65]
  },
  'digital-logbook': {
    status: "Compliant",
    driveTimeLeft: "04:15",
    cycleLeft: "12:45",
    lastInspection: "Today, 06:00 AM"
  },
  'fleet-health-matrix': {
    vehicles: [
      { id: "V01", status: "active" }, { id: "V02", status: "active" }, { id: "V03", status: "maintenance" }, { id: "V04", status: "active" },
      { id: "V05", status: "active" }, { id: "V06", status: "critical" }, { id: "V07", status: "active" }, { id: "V08", status: "active" },
      { id: "V09", status: "active" }, { id: "V10", status: "active" }
    ],
    criticals: [
      { id: "V06", issue: "Engine Fault", predictedFailure: "24h" },
      { id: "V03", issue: "Brake Pads", predictedFailure: "72h" }
    ]
  },
  'asset-lifecycle-tco': {
    id: "TRK-9921",
    name: "Volvo VNL 860",
    purchaseDate: "2023-01-15",
    purchasePrice: 185000,
    currentValue: 142000,
    depreciationRate: 15,
    maintenanceCostYTD: 1250,
    replacementDate: "2028-01-01",
    warrantyStatus: "Active"
  },
  'parts-inventory': {
    items: [
      { name: "Brake Pads (Rear)", sku: "BRK-009", stock: 4, minLevel: 10, status: "low" },
      { name: "Fuel Filter X5", sku: "FIL-221", stock: 25, minLevel: 15, status: "ok" },
      { name: "Alternator 24V", sku: "ALT-991", stock: 1, minLevel: 3, status: "critical" }
    ]
  },
  'procurement-request': {
    budgetRemaining: "$450,000",
    pendingRequests: 3
  },

  // --- Supply Chain & Yard ---
  'demand-forecast': {
    period: "Q4 2025",
    trend: "up",
    confidence: 89,
    forecast: [120, 135, 142, 138, 150, 165, 160, 172, 180, 175, 185, 190]
  },
  'inventory-planning': {
    totalSKUs: 1450,
    categories: [
      { name: "Electronics", coverage: 45, health: 92 },
      { name: "Apparel", coverage: 12, health: 25 },
      { name: "Home Goods", coverage: 60, health: 88 }
    ],
    alerts: 12
  },
  'carrier-network': {
    carriers: [
      { id: "c1", name: "FastFreight", code: "FF", rating: 4.8, lanes: 12, status: "Active" },
      { id: "c2", name: "GlobalShip", code: "GS", rating: 4.2, lanes: 8, status: "Active" },
      { id: "c3", name: "LocalHaul", code: "LH", rating: 3.9, lanes: 4, status: "Review" }
    ]
  },
  'yard-monitor': {
    inGate: 12,
    outGate: 8,
    spots: [
      { id: "A1", status: "occupied", type: "dry" }, { id: "A2", status: "empty" }, { id: "A3", status: "occupied", type: "reefer" }, { id: "A4", status: "empty" },
      { id: "B1", status: "empty" }, { id: "B2", status: "occupied", type: "dry" }, { id: "B3", status: "empty" }, { id: "B4", status: "empty" }
    ],
    alerts: ["Trailer TRK-992 dwelling > 48h"]
  },
  'reverse-logistics': {
    pending: 45,
    processed: 128,
    items: [
      { id: "R1", name: "Gaming Monitor", reason: "Defective", status: "Triaged" },
      { id: "R2", name: "Office Chair", reason: "Changed Mind", status: "Received" },
      { id: "R3", name: "Headphones", reason: "Wrong Color", status: "Restocked" }
    ]
  },

  // --- Fleet Admin & Safety ---
  'driver-safety-score': {
    score: 94,
    events: { braking: 2, speeding: 1, distraction: 0 }
  },
  'citation-manager': {
    openCount: 3,
    totalDue: 450,
    citations: [
      { type: "Parking Violation", vehicle: "Van-102", amount: 75, date: "Oct 12" },
      { type: "Toll Evasion", vehicle: "Truck-88", amount: 125, date: "Oct 14" },
      { type: "Red Light Camera", vehicle: "Van-105", amount: 250, date: "Oct 15" }
    ]
  },
  'registration-tracker': {
    dueSoon: 12,
    expired: 2,
    upcoming: [
      { vehicle: "Truck-401", date: "Nov 01" },
      { vehicle: "Trailer-882", date: "Nov 03" }
    ]
  },
  'asset-remarketing': {
    projectedValue: "185,000",
    count: 8,
    assets: [
      { id: 1, name: "2018 Freightliner", mileage: "450k mi", estValue: "45,000" },
      { id: 2, name: "2019 Ford Transit", mileage: "120k mi", estValue: "22,500" }
    ]
  },
  'ev-charging-monitor': {
    avgSoc: 72,
    avgRange: 210,
    activeChargers: 8,
    totalChargers: 12,
    vehicles: [
      { id: 1, name: "E-Transit 101", soc: 15, range: 45, status: "charging", timeToFull: "2h 30m", location: "Depot A" },
      { id: 2, name: "Rivian Van 04", soc: 88, range: 250, status: "active", timeToFull: null, location: "Route 5" },
      { id: 3, name: "E-Transit 102", soc: 45, range: 120, status: "idle", timeToFull: null, location: "Depot B" }
    ]
  },
  'grey-fleet-manager': {
    pendingApproval: 4,
    claims: [
      { id: 101, employee: "Sarah Connor", trip: "Client Visit - Downtown", miles: 24, amount: 15.60 },
      { id: 102, employee: "John Smith", trip: "Site Survey - Westside", miles: 45, amount: 29.25 }
    ],
    alerts: [
      { message: "Sarah Connor: Insurance expiring in 15 days" },
      { message: "Mike Ross: Registration proof missing" }
    ]
  },
  'driver-qualification': {
    compliantCount: 142,
    riskCount: 3,
    drivers: [
      { 
        id: 1, name: "Marcus Holloway", initials: "MH", status: "compliant", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100",
        items: [{ type: "CDL License", expiry: "2026-04-12", daysLeft: 420 }, { type: "Medical Cert", expiry: "2025-09-01", daysLeft: 240 }]
      },
      { 
        id: 2, name: "David Kim", initials: "DK", status: "risk", avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100",
        items: [{ type: "CDL License", expiry: "2025-02-15", daysLeft: 14 }, { type: "HazMat Endorsement", expiry: "2025-01-20", daysLeft: -12 }]
      }
    ]
  },
  'vehicle-booking': {
    vehicles: [
      { 
        id: 1, name: "Pool Car 01 (Sedan)", type: "Camry",
        bookings: [
          { id: "b1", user: "J. Doe", time: "09:00 - 11:30", start: 10, width: 30, status: "active" },
          { id: "b2", user: "M. Lee", time: "14:00 - 16:00", start: 60, width: 20, status: "reserved" }
        ]
      },
      { 
        id: 2, name: "Pool Van 04 (Cargo)", type: "Transit",
        bookings: [
          { id: "b3", user: "Facilities", time: "08:00 - 17:00", start: 0, width: 90, status: "active" }
        ]
      },
      { 
        id: 3, name: "Exec SUV 02", type: "Tahoe",
        bookings: []
      }
    ]
  },
  'technician-job-card': {
    woNumber: "WO-9921",
    vehicleId: "TRK-405",
    symptom: "Brake Squeal / Pulling Left",
    timeElapsed: "00:42:15",
    tasks: [
      { id: 1, label: "Check Brake Pads (Front)", status: "issue", notes: "< 3mm remaining" },
      { id: 2, label: "Check Brake Rotors", status: "done", notes: "Normal wear" },
      { id: 3, label: "Inspect Calipers", status: "done" },
      { id: 4, label: "Check Fluid Lines", status: "pending" }
    ],
    parts: [
      { name: "Brake Pad Kit (Axle Set)", sku: "BP-9921", qty: 1 }
    ]
  },
  'esg-carbon-tracker': {
    emissionsYtd: 425.8,
    emissionsChange: 12,
    evShare: 24,
    goals: [
      { label: "Fleet Electrification", current: 35, target: 150 },
      { label: "Carbon Intensity Reduction", current: 8, target: 20 }
    ]
  },
  'driver-coaching': {
    driver: { name: "Michael Chen", score: 72, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" },
    coachName: "Sarah Connor",
    assignments: [
      { id: 1, title: "Speed Management Lvl 2", dueDate: "Tomorrow", duration: "15m" },
      { id: 2, title: "Cornering Safety", dueDate: "Oct 30", duration: "10m" }
    ],
    completed: [
      { id: 101, name: "HOS Basics", date: "Sep 15" },
      { id: 102, name: "Pre-Trip Inspect", date: "Aug 01" }
    ]
  },
  'accident-report-fnol': {
    location: "I-95 South, Exit 42"
  },
  'vendor-repair-approval': {
    vendorName: "Midtown Truck Center",
    quoteId: "QT-8821",
    status: "urgent",
    totalAmount: 2450.00,
    autoRejectReason: "Labor rate ($185/hr) exceeds regional cap ($150/hr)",
    items: [
      { description: "Replace Alternator", partNumber: "ALT-220X", cost: 850, approved: true },
      { description: "Diagnostic Labor (3hr)", partNumber: "LBR-DIAG", cost: 555, approved: false, variance: 25 },
      { description: "Battery Heavy Duty", partNumber: "BAT-900", cost: 320, approved: true }
    ]
  },
  'lease-contract-manager': {
    leases: [
      { id: 1, vehicle: "2022 Ford F-150", vin: "...8842", currentMileage: 42000, allowanceMileage: 36000, monthsElapsed: 34, termMonths: 36, expiryDate: "Nov 15, 2025", estPenalty: 1250 },
      { id: 2, vehicle: "2023 Transit Van", vin: "...9921", currentMileage: 12000, allowanceMileage: 36000, monthsElapsed: 12, termMonths: 36, expiryDate: "Oct 01, 2026", estPenalty: 0 }
    ]
  },
  'eld-compliance-log': {
    driveLeft: "04:12",
    cycleLeft: "18:45",
    violations: ["11-Hour Rule Violation (Oct 12)", "Form & Manner (Oct 10)"]
  },
  'yard-dock-scheduler': {
    docks: [
      { id: 1, status: 'occupied', truckId: 'TRK-992', carrier: 'FedEx' },
      { id: 2, status: 'occupied', truckId: 'TRK-104', carrier: 'DHL' },
      { id: 3, status: 'open' },
      { id: 4, status: 'blocked' }
    ],
    queue: [
      { id: 101, carrier: 'UPS Freight', time: '10:00 AM', late: false },
      { id: 102, carrier: 'XPO', time: '09:30 AM', late: true }
    ]
  },
  'digital-pod-manifest': {
    loadId: "LD-99281",
    stops: 4,
    completion: 25,
    currentStop: { customer: "Walmart DC #442", address: "100 Distribution Way", items: 24, ref: "PO-9921", distance: "2.1 mi" },
    upcoming: [
      { customer: "Target Store #102", address: "550 Main St", type: "Drop" },
      { customer: "Costco Depot", address: "88 Industrial Blvd", type: "Pick" }
    ]
  },
  'driver-settlement-sheet': {
    totalNetPay: 1245.50,
    grossPay: 1580.00,
    totalMiles: 2450,
    ratePerMile: 0.58,
    mileagePay: 1421.00,
    accessorials: [
      { type: "Detention Pay (2hr)", amount: 50.00 },
      { type: "Stop Pay (3 stops)", amount: 75.00 },
      { type: "Layover", amount: 34.00 }
    ],
    deductions: [
      { type: "Federal Tax", amount: 210.50 },
      { type: "Health Ins", amount: 85.00 },
      { type: "Uniform", amount: 15.00 }
    ]
  },
  'ifta-fuel-tax-manager': {
    liability: 412.55,
    totalMiles: 12450,
    totalFuel: 1850,
    missingReceipts: 3,
    states: [
      { code: "CA", miles: 4200, taxPaid: 320, netDue: 45.00 },
      { code: "NV", miles: 1100, taxPaid: 85, netDue: -12.00 },
      { code: "AZ", miles: 2200, taxPaid: 150, netDue: 28.50 },
      { code: "NM", miles: 950, taxPaid: 45, netDue: 15.00 }
    ]
  },
  'cold-chain-monitor': {
    currentTemp: -19.5,
    supplyTemp: -21.0,
    ambientTemp: 28.5,
    status: "ok",
    doorOpen: false,
    fuelLevel: 82,
    excursions: 1
  },

  // --- Commerce Ops ---
  'vendor-performance-scorecard': {
    documents: [
       { name: "ISO 9001 Cert", status: "valid", expiry: "2026-01" },
       { name: "Liability Insurance", status: "valid", expiry: "2025-11" },
       { name: "Code of Conduct", status: "expired", expiry: "2024-09" }
    ]
  },
  'omni-channel-inventory': {
    totalStock: 1240,
    channels: [
      { name: "E-Commerce WH", type: "ecom", stock: 850, fillRate: 92, status: "ok" },
      { name: "Flagship Store", type: "retail", stock: 45, fillRate: 25, status: "low" },
      { name: "3PL Partner", type: "truck", stock: 345, fillRate: 88, status: "ok" }
    ],
    transfers: [
      { from: "E-Commerce WH", to: "Flagship Store", amount: 150 }
    ]
  },
  'customer-lifetime-value-crm': {
    clv: 4250.00,
    churnRisk: 65,
    aov: 125.50,
    frequency: 42
  },

  // --- Manufacturing Ops ---
  'production-schedule-gantt': {
    jobs: [
      { id: "JOB-101", product: "Engine Block V6", start: 0, duration: 40, status: "completed" },
      { id: "JOB-102", product: "Cylinder Head", start: 45, duration: 30, status: "running" },
      { id: "JOB-103", product: "Piston Set", start: 80, duration: 20, status: "scheduled" }
    ],
    conflicts: 1
  },
  'oee-dashboard': {
    score: 82,
    availability: 90,
    performance: 85,
    quality: 98,
    downtime: [
       { reason: "Material Shortage", mins: 45, impact: 60 },
       { reason: "Machine Setup", mins: 20, impact: 25 },
       { reason: "Jam / Fault", mins: 12, impact: 15 }
    ]
  },
  'quality-control-station': {
    sampleImage: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=200",
    checks: [
      { point: "Surface Finish", status: "pass" },
      { point: "Dimensional Tolerance", status: "pass" },
      { point: "Thread Integrity", status: "fail" },
      { point: "Weight", status: "pending" }
    ]
  },

  // --- Fintech Ops ---
  'kyc-verification-portal': {
    name: "Robert J. Miller",
    initials: "RM",
    govId: "A-9921002",
    riskLevel: "medium",
    checks: [
       { label: "Document Authenticity", passed: true, match: 98 },
       { label: "Biometric Face Match", passed: true, match: 95 },
       { label: "Address Verification", passed: false }
    ],
    pepMatch: true
  },
  'loan-underwriting-desk': {
    creditScore: 742,
    dscr: 1.35,
    ltv: 65,
    dti: 42
  },
  'fraud-detection-console': {
    fraudScore: 88,
    signals: [
       { label: "IP Geolocation Mismatch", risk: "high" },
       { label: "Velocity (3 tx in 5m)", risk: "medium" },
       { label: "Device Fingerprint New", risk: "medium" }
    ]
  },

  // --- Health Ops ---
  'emr-patient-record': {
    name: "Sarah Jenkins",
    initials: "SJ",
    dob: "1985-04-12",
    mrn: "MR-9921",
    allergies: ["Penicillin"],
    vitals: { bp: "120/80", hr: 72, temp: "98.6", o2: "99%" },
    meds: [
       { name: "Lisinopril", dose: "10mg daily" },
       { name: "Atorvastatin", dose: "20mg daily" }
    ]
  },
  'insurance-claims-processor': {
    status: "paid",
    totalBilled: 1250.00,
    totalAllowed: 850.00,
    lines: [
       { code: "99213", billed: 150, allowed: 95 },
       { code: "71045", billed: 350, allowed: 125 }
    ]
  },
  'telehealth-doctor-console': {
    patientVideo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    waitTime: "04:21",
    chiefComplaint: "Sore throat and fever x2 days"
  },

  // --- GovTech Ops ---
  'civil-registry-record': {
    fullName: "Ahmed Al-Farsi",
    nationalId: "10992812",
    dob: "1988-05-12",
    pob: "Riyadh",
    familyBookId: "FB-9921",
    status: "Active",
    events: [
       { type: "Birth Registration", date: "1988-05-14", regId: "B-8812" },
       { type: "Marriage", date: "2015-08-20", regId: "M-1542" }
    ]
  },
  'judicial-case-manager': {
    caseNumber: "CV-2025-9921",
    status: "Discovery",
    plaintiff: "Acme Corp",
    defendant: "John Doe",
    nextHearing: "Nov 15, 2025",
    docket: [
       { title: "Complaint Filed", date: "Oct 01" },
       { title: "Summons Served", date: "Oct 05" },
       { title: "Answer Filed", date: "Oct 18" }
    ]
  },
  'urban-planning-grid': {
    density: 4500,
    greenSpace: 12,
    alerts: ["Flood Zone overlap detected in Sector 4"]
  },

  // --- Education Ops ---
  'student-info-system': {
    studentId: "9921005",
    grade: 11,
    standing: "Good",
    gpa: 3.8,
    attendance: 94,
    disciplinePoints: 0,
    schedule: [
       { subject: "Physics AP", room: "304", grade: "A-" },
       { subject: "Calculus", room: "102", grade: "B+" }
    ]
  },
  'curriculum-builder': {
    objectives: ["Understand Newton's 2nd Law", "Calculate Force vectors"],
    blocks: [
       { title: "Intro Lecture", duration: 15, activity: "Direct Instruction" },
       { title: "Lab: Ramp Roll", duration: 30, activity: "Group Work" },
       { title: "Exit Ticket", duration: 5, activity: "Assessment" }
    ]
  },
  'campus-safety-monitor': {
    accessLogs: [
       { location: "Main Gate", time: "08:05", status: "granted" },
       { location: "Lab 4 (Restricted)", time: "09:12", status: "denied" }
    ],
    cameras: [
       { name: "Hall A", feed: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&q=80&w=200" },
       { name: "Gym", feed: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=200", alert: true }
    ]
  },

  // --- Real Estate Ops ---
  'lease-admin-ledger': {
    leaseType: "NNN",
    expiry: "2028-12-31",
    baseRent: "12,500",
    cam: "2,100",
    ledger: [
       { date: "Oct 01", type: "Rent", amount: "14,600", status: "paid" },
       { date: "Sep 01", type: "Rent", amount: "14,600", status: "paid" }
    ]
  },
  'facility-energy-manager': {
    currentLoad: 425,
    systems: [
       { name: "HVAC Main", status: "on", metric: "120 kW" },
       { name: "Lighting L2", status: "on", metric: "45 kW" }
    ],
    trend: [40, 55, 60, 85, 90, 70, 50, 45, 60, 55]
  },
  'construction-project-tracker': {
    completion: 45,
    rfis: [
       { id: 12, title: "Beam spec conflict", status: "Open", assignedTo: "Structural Eng", due: "Tomorrow" }
    ],
    recentPhoto: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=400"
  },

  // --- Insurance Ops ---
  'policy-admin-system': {
    policyNumber: "POL-9921-X",
    status: "Active",
    limits: { occurrence: "1,000,000", aggregate: "2,000,000" },
    deductible: "5,000",
    endorsements: [
       { code: "CG 20 10", name: "Addl Insured" },
       { code: "CG 24 04", name: "Waiver of Subrogation" }
    ]
  },
  'claims-adjuster-workbench': {
    claimId: "99281",
    lossDate: "Oct 12, 2025",
    reserves: { indemnity: "15,000", expense: "2,500" },
    steps: [
       { task: "Contact Insured", completed: true },
       { task: "Scene Investigation", completed: true },
       { task: "Review Medicals", completed: false }
    ]
  },
  'actuarial-risk-heatmap': {
    lossRatio: 72.5,
    segments: [
       { code: "A1", risk: 20, name: "Sedan < 5yr" }, { code: "A2", risk: 45, name: "SUV < 5yr" }, { code: "A3", risk: 85, name: "Sport > 10yr" }, { code: "B1", risk: 30 }, { code: "B2", risk: 55 },
       { code: "C1", risk: 15 }, { code: "C2", risk: 40 }, { code: "C3", risk: 65 }, { code: "C4", risk: 90 }, { code: "D1", risk: 25 },
       { code: "D2", risk: 50 }, { code: "D3", risk: 75 }, { code: "E1", risk: 35 }, { code: "E2", risk: 60 }, { code: "E3", risk: 80 }
    ]
  },

  // --- Commerce ---
  'flash-sale': { 
    endTime: new Date(Date.now() + 3600000).toISOString(), 
    secondsRemaining: 3500,
    name: "Sony WH-1000XM5", 
    price: 299, 
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1547932087-59a8f2be576e?auto=format&fit=crop&q=80&w=200"
  },
  'comparison-grid': { 
    products: [
      { id: 'p1', name: 'Basic Plan', price: '$10/mo', features: { users: '1', storage: '10GB', support: 'Email' } },
      { id: 'p2', name: 'Pro Plan', price: '$29/mo', features: { users: '5', storage: '100GB', support: 'Priority' } },
      { id: 'p3', name: 'Enterprise', price: '$99/mo', features: { users: 'Unlimited', storage: '1TB', support: '24/7 Live' } }
    ],
    features: [
      { key: 'users', name: 'User Limit' },
      { key: 'storage', name: 'Cloud Storage' },
      { key: 'support', name: 'Support Level' }
    ]
  },
  'product-card': { 
    id: 'p1', 
    name: 'Eames Lounge Chair', 
    price: 1400, 
    rating: 4.9, 
    discount: 15,
    image: 'https://images.unsplash.com/photo-1762803841693-9efdc2fbf446?auto=format&fit=crop&q=80&w=400' 
  },
  'vendor-trust': { 
    name: 'TechHaven', 
    rating: 4.9, 
    verified: true, 
    sales: '10k+', 
    responseTime: '< 1hr', 
    logo: 'https://images.unsplash.com/photo-1619571547561-060bcc8f5843?auto=format&fit=crop&q=80&w=200'
  },
  'ev-status': { charge: 85, range: '320 km', charging: true, station: 'Tesla Supercharger' },
  'vehicle-remote': { locked: true, engine: false, temp: 22, location: 'Garage' },
  'toll-pass': { balance: '$45.50', lastTrip: '-$2.50', route: 'M1 Highway' },
  'parking-meter': { expires: '14:30', location: 'Zone A - Downtown', cost: '$4.00' },
  'ride-status': { driver: 'Mike', car: 'Tesla Model 3', plate: 'ABC-123', eta: '4 min', rating: 4.9 },

  // --- Professional ---
  'freelancer-card': { name: 'Alex Morgan', rate: '$80/hr', skills: ['React', 'Node.js', 'UI/UX'], available: true },
  'consultation-timer': { duration: '30:00', remaining: '14:20', client: 'Client A' },
  'doc-scanner': { status: 'Scanning...', progress: 40, fileName: 'Contract_v2.pdf' },
  'task-checklist': { tasks: [{ id: 't1', text: 'Review Design', done: true }, { id: 't2', text: 'Push Code', done: false }] },

  // --- Utilities ---
  'energy-graph': { usage: [10, 20, 15, 30, 25, 10, 5], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
  'bill-pay': { provider: 'Electric Co', amount: '$120.50', due: '2025-01-15' },
  'outage-map': { outages: 3, affected: 120, estimatedFix: '2h 30m' },

  // --- Travel ---
  'boarding-pass': { flight: 'SA123', seat: '4A', gate: 'B2', time: '14:30', from: 'RUH', to: 'DXB', passenger: 'Fahad Al-Saud' },
  'hotel-concierge': { request: 'Late Checkout', status: 'Approved', room: '304' },
  'currency-converter': { from: 'USD', to: 'SAR', rate: 3.75, amount: 100 },
  'itinerary-timeline': { 
    blocks: [
      { id: 'b1', time: '09:00', title: 'Breakfast at Tiffany\'s', duration: '1h' }, 
      { id: 'b2', time: '10:30', title: 'Louvre Museum Tour', duration: '2h' },
      { id: 'b3', time: '13:00', title: 'Lunch at Rivera', duration: '1.5h' }
    ] 
  },

  // --- AgTech ---
  'livestock-tracker': { id: 'Cow-101', health: 'Good', location: 'Pasture A', temp: 38.5 },
  'crop-map': { moisture: 60, temp: 24, health: 'Optimal', area: 'Field B' },
  'carbon-credit': { credits: 150, value: '$4,500', verified: true },

  // --- Enterprise ---
  'hr-onboarding': { step: 'Documents', progress: 30, nextTask: 'Upload ID' },
  'digital-signage': { active: true, campaign: 'Summer Sale', screenId: 'Lobby-01' },
  'asset-tracker': { id: 'LPT-009', user: 'Jane Doe', location: 'Office', type: 'Laptop' },

  // --- Services / Misc ---
  'poi-carousel': { 
    pois: [
      { id: "1", name: "The Coffee Lab", category: "Cafe", image: "https://images.unsplash.com/photo-1582076151909-b80addc76f97?auto=format&fit=crop&q=80&w=400", rating: 4.8, distance: "0.5 km", vibe: ["#cozy"], priceRange: "$$", openNow: true },
      { id: "2", name: "Ritz Paris", category: "Hotel", image: "https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?auto=format&fit=crop&q=80&w=400", rating: 4.9, distance: "2.1 km", vibe: ["#luxury"], priceRange: "$$$$", openNow: true }
    ] 
  },
  'event-carousel': { 
    events: [
      { id: "e1", name: "Jazz Night", date: "Tonight", time: "20:00", location: "Blue Note", image: "https://images.unsplash.com/photo-1631061434620-db65394197e2?auto=format&fit=crop&q=80&w=400", category: "Music", attendees: 120 },
      { id: "e2", name: "Tech Summit", date: "Tomorrow", time: "09:00", location: "Convention Center", image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=400", category: "Conference", attendees: 5000 }
    ] 
  },
  'ambassador-carousel': { 
    ambassadors: [
      { id: 'a1', name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1758273239228-04a19ba5a1b3?auto=format&fit=crop&q=80&w=100', followers: 5000, specialty: ['Travel', 'Food'], fitScore: 95 }
    ] 
  },
  'confirmation-card': { title: 'Booking Confirmed', description: 'Table for 2 at 8pm', id: 'RES-992' },
  'zone-heatmap': { zones: [{ id: 'z1', name: 'Downtown', score: 85 }, { id: 'z2', name: 'Uptown', score: 92 }] },
  'selection-chips': { options: ['Vegan', 'Gluten Free', 'Spicy', 'Halal'] },
  'comparison-table': { items: [{ name: 'Basic', price: 10 }, { name: 'Pro', price: 15 }] },
  'progress-card': { title: 'Weekly Goal', current: 75, target: 100, unit: '%' },
  'calendar-selector': { selected: new Date() },
  'form-group': { id: 'f1', title: 'Preferences', type: 'checkbox', options: [{ id: 'o1', label: 'Enable Notifications', value: 'notify' }] },
  'ticket-pass': { eventName: 'Coldplay Live', seat: '12B', qrCode: '...', date: '2025-11-15', time: '20:00', location: 'Wembley Stadium' },
  'order-tracker': { orderNumber: '#8821', status: 'preparing', estimatedTime: '15 mins', items: ['Burger', 'Fries'], total: '$15.50' },
  'map-view': { center: { lat: 24, lng: 46 }, zoom: 12 },
  'product-carousel': { products: [{ id: 'p1', name: 'Running Shoes', price: '$85', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400' }] },
  'service-menu': { items: [{ id: 's1', name: 'Haircut', price: '$30', duration: '30m' }, { id: 's2', name: 'Shave', price: '$20', duration: '20m' }] },
  'analytics-snapshot': { title: 'Weekly Views', metrics: [{ label: 'Total', value: '1.2k', change: '+12%' }] },
  'media-player': { title: 'Bohemian Rhapsody', artist: 'Queen', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=400' },
  'agent-sync-card': { agentName: 'TravelBot', status: 'Syncing...', task: 'Finding flights' },
  'payment-request': { amount: '$50', requester: 'John Doe', reason: 'Dinner split' },
  'weather-card': { temp: 28, condition: 'Sunny', location: 'Riyadh', humidity: '20%' },
  'alert-card': { message: 'Severe Sandstorm Warning', type: 'warning', time: '10 mins ago' },
  'document-card': { name: 'Project_Proposal.pdf', size: '2.5MB', type: 'PDF' },
  'receipt-card': { store: 'Apple Store', total: '$1,200', date: '2025-01-10', items: ['iPhone 15 Pro'] },
  'smart-home-control': { device: 'Living Room Lights', state: 'On', brightness: 80 },
  'parcel-locker': { code: '8922', location: 'Locker 5 - Mall Entrance', packageId: 'PKG-112' },
  'reservation-card': { place: 'Cipriani', time: '20:00', guests: 2, date: 'Tonight' },
  'voice-note': { duration: '0:45', sender: 'Mom', date: 'Yesterday' },
  'production-line': { id: "Line-A", status: "Running", output: "120/hr", efficiency: "94%" },
  'insurance-policy': { id: "POL-991", type: "Comprehensive", coverage: "$1M", premium: "$120/mo", nextPayment: "Oct 1" },

  // --- Non-Profit & Philanthropy ---
  'donor-profile': { name: "Elena Fisher", totalGiven: "$12,500", lastGift: "2 days ago", segment: "Major Donor", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" },
  'campaign-dashboard': { goal: "$50,000", raised: "$32,150", daysLeft: 12, donors: 145 },
  'volunteer-roster': { event: "Beach Cleanup", needed: 50, signedUp: 34, shift: "Saturday 9am" },
  'impact-report': { metric: "Trees Planted", value: 1540, location: "Amazon Basin", year: 2024 },
  'aid-distribution-map': { 
    assets: [
      { id: 'AID-01', x: 25, y: 35, status: 'delivered', bearing: 0 }, 
      { id: 'AID-02', x: 55, y: 75, status: 'moving', bearing: 180 }
    ],
    bgImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800"
  },
  'donation-card': { amount: "$50", frequency: "Monthly", campaign: "Clean Water Initiative" },
  'outcome-tracker': { goal: "Literacy Rate", current: 78, target: 85, unit: "%" },

  // --- Science & R&D ---
  'lab-sample-manager': { id: "SMP-10021", type: "Blood Plasma", temp: "-80C", location: "Freezer 4, Shelf 2" },
  'experiment-designer': { protocol: "PCR Amplification", step: 3, totalSteps: 12, status: "Active" },
  'research-paper-draft': { title: "Novel Protein Folding", authors: ["Dr. Smith", "A. Jones"], version: 2.1 },
  'biohazard-monitor': { level: "BSL-3", pressure: "-25 Pa", airChange: "12/hr", status: "Secure" },
  'recruitment-pipeline': { 
    stages: [
      { name: "Applied", count: 45 },
      { name: "Screen", count: 12 },
      { name: "Interview", count: 3, candidates: [{name: "C. Davis", score: 95}] }
    ],
    topCandidate: { name: "C. Davis", initials: "CD" }
  },
  'soc-incident-response': { 
    incidentId: "INC-2025-001", type: "Ransomware Attempt", 
    logs: ["Suspicious process spawned: cmd.exe", "Outbound conn blocked: 192.168.1.55"],
    assets: [{ name: "HR-Server-01", ip: "10.0.4.2", compromised: true }, { name: "DB-Replica", ip: "10.0.4.3", compromised: false }]
  },
  'precision-ag-dashboard': { 
    moisture: 35, nitrogen: 140, ph: 6.5,
    alerts: ["Low Moisture Warning - Sector 4"]
  }
};
