// --- Documentation & Metadata ---
export interface ArtifactDoc {
  description: string;
  useCase: string;
  personas: string[];
  dataPoints: string[];
  technical: string;
  actions: string[];
}

export const ARTIFACT_DOCS: Record<string, ArtifactDoc> = {
  // Fleet Enterprise
  'fleet-maintenance': {
    description: "Real-time health monitoring of vehicle systems, surfacing critical alerts and maintenance schedules.",
    useCase: "Drivers check before shifts; Fleet Managers monitor fleet-wide readiness.",
    personas: ["Fleet Manager", "Driver", "Mechanic"],
    dataPoints: ["Vehicle ID", "Fuel Level", "Tire Pressure", "Service Due Date"],
    technical: "Events: onScheduleService()",
    actions: ["Schedule Service", "View Service History", "Contact Driver"]
  },
  'fuel-analytics': {
    description: "Comprehensive analytics of fuel consumption patterns and efficiency metrics.",
    useCase: "Identifying fuel theft, optimizing routes for efficiency, and tracking carbon output.",
    personas: ["Fleet Director", "Sustainability Officer"],
    dataPoints: ["Fuel Efficiency (MPG)", "Cost per Mile", "Historical Trend"],
    technical: "Charts: Recharts LineChart",
    actions: ["Export Report", "Set Alert Threshold", "Compare Vehicles"]
  },
  'fleet-health-matrix': {
    description: "High-level visual triage of the entire fleet's operational status.",
    useCase: "Morning stand-up meetings to allocate resources and prioritize repairs.",
    personas: ["Operations Manager"],
    dataPoints: ["Vehicle Status Count", "Critical Issues List"],
    technical: "Layout: Grid Matrix",
    actions: ["Filter by Region", "View Critical Only", "Assign Technician"]
  },
  'asset-lifecycle-tco': {
    description: "Financial dashboard tracking asset depreciation, warranty status, and total cost of ownership.",
    useCase: "Strategic planning for fleet renewal and asset disposal.",
    personas: ["CFO", "Fleet Director"],
    dataPoints: ["Purchase Value", "Current Value", "Depreciation Rate", "Maintenance YTD"],
    technical: "Calculations: Straight-line depreciation",
    actions: ["Calculate Resale Value", "Extend Warranty", "Initiate Disposal"]
  },
  'parts-inventory': {
    description: "Tracks critical spare parts inventory levels to prevent maintenance bottlenecks.",
    useCase: "Shop managers ensuring filters and pads are in stock before scheduling service.",
    personas: ["Parts Manager", "Maintenance Lead"],
    dataPoints: ["SKU", "Stock Level", "Reorder Point"],
    technical: "Actions: onReorder()",
    actions: ["Reorder Stock", "Audit Inventory", "Locate Part"]
  },
  'procurement-request': {
    description: "Standardized workflow for requesting new capital assets and vehicles.",
    useCase: "Initiating the purchase process for new fleet additions with budget checks.",
    personas: ["Regional Manager", "Finance"],
    dataPoints: ["Budget Remaining", "Pending Requests"],
    technical: "Flow: Multi-step approval",
    actions: ["Approve Request", "Reject Request", "Request Modification"]
  },
  
  // --- Logistics: Supply Chain ---
  'demand-forecast': {
    description: "AI-driven demand prediction model.",
    useCase: "Planning inventory levels based on market trends.",
    personas: ["Planner", "Analyst"],
    dataPoints: ["Forecast Curve", "Confidence Interval"],
    technical: "Time-series Forecasting",
    actions: ["Adjust Parameters", "Export Data", "Compare Scenarios"]
  },
  'inventory-planning': {
    description: "Strategic inventory health and coverage analysis.",
    useCase: "Balancing stock levels to prevent stockouts and overstock.",
    personas: ["Inventory Manager"],
    dataPoints: ["Days of Cover", "Stock Health"],
    technical: "Inventory Optimization",
    actions: ["Reorder", "Transfer Stock", "Mark Obsolete"]
  },
  'carrier-network': {
    description: "Directory and performance management for logicstics providers.",
    useCase: "Managing 3PL relationships and performance.",
    personas: ["Logistics Manager"],
    dataPoints: ["Carrier Rating", "Lane Coverage"],
    technical: "Vendor Relationship Mgmt",
    actions: ["Rate Carrier", "Negotiate Rates", "Add Lane"]
  },
  'yard-monitor': {
    description: "Digital twin of the warehouse yard.",
    useCase: "Managing trailer spotting and gate operations.",
    personas: ["Yard Jockey", "Gate Clerk"],
    dataPoints: ["Spot Status", "Dwell Time"],
    technical: "Yard Management System",
    actions: ["Move Trailer", "Check In", "Seal Door"]
  },
  'reverse-logistics': {
    description: "End-to-end returns processing and disposition.",
    useCase: "Handling RMAs, refurbishment, and restocking.",
    personas: ["Returns Clerk"],
    dataPoints: ["RMA Status", "Disposition"],
    technical: "Reverse Flow Logic",
    actions: ["Approve RMA", "Inspect Item", "Issue Refund"]
  },

  // --- Fleet Admin & Safety ---
  'driver-safety-score': {
    description: "Gamified driver behavior metrics and coaching.",
    useCase: "Improving fleet safety and reducing insurance premiums.",
    personas: ["Safety Manager", "Driver"],
    dataPoints: ["G-Force Events", "Speeding"],
    technical: "Telematics Integration",
    actions: ["Assign Coaching", "View Trip", "Award Bonus"]
  },
  'citation-manager': {
    description: "Centralized processing of tolls and traffic violations.",
    useCase: "Reducing late fees and administrative overhead.",
    personas: ["Fleet Admin"],
    dataPoints: ["Violation Type", "Fine Amount"],
    technical: "OCR / Gov API",
    actions: ["Pay Ticket", "Dispute", "Bill Driver"]
  },
  'registration-tracker': {
    description: "Compliance tracking for vehicle tags and titles.",
    useCase: "Preventing impounds and fines from expired tags.",
    personas: ["Fleet Admin"],
    dataPoints: ["Expiry Date", "Jurisdiction"],
    technical: "Date Tracking",
    actions: ["Renew Online", "Upload Doc", "Order Plates"]
  },
  'asset-remarketing': {
    description: "Maximizing value from retired fleet assets.",
    useCase: "Managing the sale or auction of old vehicles.",
    personas: ["Fleet Manager", "Finance"],
    dataPoints: ["Fair Market Value", "Auction Bids"],
    technical: "Marketplace Feed",
    actions: ["List for Sale", "Accept Bid", "Transfer Title"]
  },
  'ev-charging-monitor': {
    description: "Real-time state of charge and infrastructure status.",
    useCase: "Managing electric vehicle range and charging schedules.",
    personas: ["Dispatcher", "Sustainability Lead"],
    dataPoints: ["SoC %", "Range", "Charger Status"],
    technical: "IoT / EVSE API",
    actions: ["Start Charge", "Schedule Pre-conditioning", "Locate Plug"]
  },
  'grey-fleet-manager': {
    description: "Compliance and reimbursement for personal vehicle use.",
    useCase: "Managing risks of employees driving their own cars.",
    personas: ["HR", "Finance"],
    dataPoints: ["Mileage", "Insurance Policy"],
    technical: "Expense API",
    actions: ["Approve Claim", "Verify Insurance", "Audit Logs"]
  },
  'driver-qualification': {
    description: "Tracking CDL and medical certification compliance.",
    useCase: "Ensuring all drivers are legally permitted to operate.",
    personas: ["Safety Manager", "HR"],
    dataPoints: ["License Expiry", "Medical Cert", "MVR Status"],
    technical: "Date Tracking",
    actions: ["Upload Doc", "Run MVR", "Suspend Driver"]
  },
  'vehicle-booking': {
    description: "Reservation system for shared motor pool assets.",
    useCase: "Employees booking shared cars for business travel.",
    personas: ["Employee", "Fleet Manager"],
    dataPoints: ["Availability", "Booking Duration"],
    technical: "Scheduler / Calendar",
    actions: ["Book Car", "Cancel", "Key Exchange"]
  },
  'technician-job-card': {
    description: "Mobile-first digital work order for mechanics.",
    useCase: "Technicians documenting repairs and parts in the bay.",
    personas: ["Mechanic", "Service Writer"],
    dataPoints: ["Labor Time", "Parts Used", "Inspection Results"],
    technical: "Touch Interface",
    actions: ["Start Timer", "Pass/Fail Item", "Sign Off"]
  },
  'esg-carbon-tracker': {
    description: "Sustainability dashboard for emissions and electrification.",
    useCase: "Tracking progress towards Net Zero goals.",
    personas: ["Sustainability Officer", "Executive"],
    dataPoints: ["CO2 Output", "EV Adoption %", "Offsets"],
    technical: "Data Visualization",
    actions: ["Buy Offsets", "Export ESG Report", "Set Targets"]
  },
  'driver-coaching': {
    description: "LMS for remedial driver training.",
    useCase: "Assigning training modules based on safety infractions.",
    personas: ["Driver", "Safety Coach"],
    dataPoints: ["Module Status", "Quiz Score"],
    technical: "LMS Integration",
    actions: ["Assign Training", "Watch Video", "Take Quiz"]
  },
  'accident-report-fnol': {
    description: "Mobile wizard for First Notice of Loss (FNOL).",
    useCase: "Driver reporting a crash at the scene.",
    personas: ["Driver", "Claims Specialist"],
    dataPoints: ["Photos", "GPS Location", "Witness Info"],
    technical: "Camera / Maps",
    actions: ["Upload Photo", "Call Emergency", "Submit Claim"]
  },
  'vendor-repair-approval': {
    description: "Approval workflow for 3rd-party maintenance.",
    useCase: "Controlling costs from external repair shops.",
    personas: ["Maintenance Controller", "Vendor"],
    dataPoints: ["Line Item Cost", "Labor Rate"],
    technical: "Invoice Parsing",
    actions: ["Approve", "Reject", "Negotiate"]
  },
  'lease-contract-manager': {
    description: "Financial dashboard for lease expirations.",
    useCase: "Avoiding mileage penalties and managing returns.",
    personas: ["Fleet Finance Mgr", "Lease Admin"],
    dataPoints: ["Mileage Projection", "Contract Term"],
    technical: "Forecasting",
    actions: ["Extend Lease", "Return Vehicle", "Buyout"]
  },
  'eld-compliance-log': {
    description: "FMCSA-compliant electronic logging device interface.",
    useCase: "Drivers tracking Hours of Service (HOS) to remain legal.",
    personas: ["Driver", "Compliance Officer"],
    dataPoints: ["Drive Time", "On-Duty Time", "Cycle Time"],
    technical: "Timer / Rule Engine",
    actions: ["Change Status", "Certify Log", "Inspection Mode"]
  },
  'yard-dock-scheduler': {
    description: "Facility management for gates and loading docks.",
    useCase: "Managing inbound/outbound traffic at the warehouse.",
    personas: ["Yard Jockey", "Dock Master"],
    dataPoints: ["Dock Status", "Wait Time"],
    technical: "Grid Visualization",
    actions: ["Assign Dock", "Check In", "Block Dock"]
  },
  'digital-pod-manifest': {
    description: "Mobile manifest and Proof of Delivery (POD).",
    useCase: "Executing the final mile delivery and capturing signatures.",
    personas: ["Driver", "Customer"],
    dataPoints: ["Signature", "Time Stamp", "Geo-Fence"],
    technical: "Signature Pad",
    actions: ["Sign", "Photo Proof", "Navigate"]
  },
  'driver-settlement-sheet': {
    description: "Payroll transparency for driver earnings.",
    useCase: "Showing drivers exactly how their pay is calculated.",
    personas: ["Driver", "Payroll Clerk"],
    dataPoints: ["Mileage Pay", "Deductions", "Net Pay"],
    technical: "Payroll Engine",
    actions: ["Download PDF", "Dispute", "View History"]
  },
  'ifta-fuel-tax-manager': {
    description: "Automated fuel tax compliance calculator.",
    useCase: "Reconciling fuel purchases vs. miles driven by state.",
    personas: ["Compliance Mgr", "Tax Accountant"],
    dataPoints: ["State Miles", "Gallons Purchased"],
    technical: "Tax Logic",
    actions: ["Generate Return", "Audit Log", "Upload Receipt"]
  },
  'cold-chain-monitor': {
    description: "Real-time temperature monitoring for reefers.",
    useCase: "Ensuring food/pharma safety during transit.",
    personas: ["QA Manager", "Driver"],
    dataPoints: ["Return Air Temp", "Door Status"],
    technical: "IoT Stream",
    actions: ["Set Point", "Download Log", "Pre-Cool"]
  },

  // --- Logistics (Full Scope) ---
  'logistics-timeline': {
    description: "End-to-end visibility of a shipment's lifecycle stages.",
    useCase: "Tracking high-value cargo from pickup to final delivery.",
    personas: ["Logistics Coordinator", "Customer"],
    dataPoints: ["Stage Status", "Timestamps", "ETA"],
    technical: "Progress Stepper",
    actions: ["View Details", "Share Tracking", "Report Delay"]
  },
  'proof-of-delivery': {
    description: "Digital confirmation of successful handover.",
    useCase: "Drivers capturing signatures or photos at the doorstep.",
    personas: ["Driver", "Recipient"],
    dataPoints: ["Signature", "Timestamp", "Location"],
    technical: "Canvas Drawing / Camera",
    actions: ["View Signature", "Download Receipt", "Dispute"]
  },
  'iot-dashboard': {
    description: "Sensor data visualization for cold-chain and sensitive cargo.",
    useCase: "Ensuring pharmaceutical or food safety compliance during transit.",
    personas: ["Compliance Officer", "Driver"],
    dataPoints: ["Temperature", "Humidity", "Shock/Vibration"],
    technical: "WebSocket real-time updates",
    actions: ["Export Data", "Set Alerts", "Calibrate"]
  },
  'warehouse-picker': {
    description: "Mobile interface for efficient item retrieval in warehouses.",
    useCase: "Staff fulfilling orders by following optimized pick paths.",
    personas: ["Warehouse Associate"],
    dataPoints: ["SKU", "Bin Location", "Quantity"],
    technical: "List View + Scanner",
    actions: ["Confirm Pick", "Mark Missing", "Skip Item"]
  },
  'freight-quote': {
    description: "Instant rate calculator for various shipping modes.",
    useCase: "Merchants comparing costs between air, ground, and sea.",
    personas: ["Shipping Manager"],
    dataPoints: ["Weight", "Dimensions", "Service Level"],
    technical: "Rate Engine API",
    actions: ["Book Shipment", "Save Quote", "Email Quote"]
  },
  'shipment-label': {
    description: "Print-ready shipping label generation.",
    useCase: "Finalizing shipments and attaching tracking identifiers.",
    personas: ["Warehouse Packer"],
    dataPoints: ["Sender/Receiver", "Tracking #", "Barcode"],
    technical: "PDF Generation / ZPL",
    actions: ["Print Label", "Void Label", "Reprint"]
  },
  'driver-manifest': {
    description: "Daily route and task list for delivery drivers.",
    useCase: "Drivers organizing their shift and stops sequence.",
    personas: ["Driver"],
    dataPoints: ["Stop List", "Time Windows", "Status"],
    technical: "Optimized List",
    actions: ["Start Route", "Navigate", "Contact Dispatch"]
  },
  'load-balancer': {
    description: "Visual tool for distributing cargo weight and volume.",
    useCase: "Loading trucks safely to prevent axle overload.",
    personas: ["Load Planner", "Dock Supervisor"],
    dataPoints: ["Axle Weight", "Volume Utilization"],
    technical: "2D/3D Visualization",
    actions: ["Rebalance", "Verify Load", "Print Plan"]
  },
  'incident-report': {
    description: "Standardized form for documenting logistics exceptions.",
    useCase: "Reporting damage, accidents, or delays during transit.",
    personas: ["Driver", "Safety Officer"],
    dataPoints: ["Incident Type", "Photos", "Description"],
    technical: "Form with Media Upload",
    actions: ["Submit Report", "Attach Photo", "Call Safety"]
  },
  'delivery-prefs': {
    description: "Customer-facing controls for delivery instructions.",
    useCase: "Recipients specifying gate codes or drop-off spots.",
    personas: ["Recipient"],
    dataPoints: ["Gate Code", "Safe Place", "Contact Method"],
    technical: "User Preferences Form",
    actions: ["Save Preferences", "Update Instructions"]
  },
  'return-manager': {
    description: "Self-service portal for initiating product returns.",
    useCase: "Customers generating return labels and selecting reasons.",
    personas: ["Customer", "Support Agent"],
    dataPoints: ["Order Items", "Return Reason"],
    technical: "RMA Workflow",
    actions: ["Create Label", "Find Drop-off", "Track Return"]
  },
  'smart-locker': {
    description: "Interface for locating and accessing automated lockers.",
    useCase: "Contactless pickup and drop-off of parcels.",
    personas: ["Recipient", "Courier"],
    dataPoints: ["Locker Location", "Availability"],
    technical: "Map + PIN Auth",
    actions: ["Reserve Locker", "Open Compartment", "Navigate"]
  },
  'driver-stats': {
    description: "Performance dashboard for driver gamification.",
    useCase: "Drivers tracking earnings, rating, and safety scores.",
    personas: ["Driver"],
    dataPoints: ["Earnings", "Trips", "Safety Score"],
    technical: "Gamified Dashboard",
    actions: ["View Payouts", "Check Leaderboard", "Tips"]
  },
  'ar-package-sizer': {
    description: "Augmented reality tool to measure items and suggest packaging.",
    useCase: "Selecting the right box size to minimize air shipping.",
    personas: ["Packer"],
    dataPoints: ["Dimensions (LxWxH)", "Recommended Box"],
    technical: "WebAR / Camera Access",
    actions: ["Scan Item", "Select Box", "Capture Dims"]
  },
  'eco-route-planner': {
    description: "AI-driven route optimization balancing speed, cost, and emissions.",
    useCase: "Planning daily delivery routes to minimize fuel burn.",
    personas: ["Dispatcher", "Driver"],
    dataPoints: ["Route Options", "CO2 Est", "Time/Distance"],
    technical: "Algorithm: A* or Dijkstra variant",
    actions: ["Select Route", "Optimize", "Print Manifest"]
  },
  'dock-scheduler': {
    description: "Calendar view for managing warehouse loading bays.",
    useCase: "Preventing truck congestion at distribution centers.",
    personas: ["Dock Manager", "Carrier"],
    dataPoints: ["Time Slots", "Bay Status", "Carrier"],
    technical: "Resource Calendar",
    actions: ["Book Slot", "Check-in", "Reschedule"]
  },
  'customs-clearance': {
    description: "Dashboard for cross-border documentation and duty status.",
    useCase: "Clearing international shipments through customs authorities.",
    personas: ["Customs Broker"],
    dataPoints: ["HS Codes", "Duty Amount", "Clearance Status"],
    technical: "Regulatory API Integration",
    actions: ["Pay Duty", "Upload Docs", "Check Status"]
  },
  'telematics-scorecard': {
    description: "Detailed safety and efficiency report per driver.",
    useCase: "Coaching drivers on braking, acceleration, and idling.",
    personas: ["Fleet Manager", "Safety Coach"],
    dataPoints: ["Speeding Events", "Harsh Braking", "Idling Time"],
    technical: "Telemetry Aggregation",
    actions: ["Send Feedback", "Schedule Training", "Export"]
  },
  'digital-logbook': {
    description: "Electronic compliance recording for Hours of Service (HOS).",
    useCase: "Drivers logging status to meet legal rest requirements.",
    personas: ["Driver", "DOT Officer"],
    dataPoints: ["Driving Time", "On-Duty Time", "Rest Breaks"],
    technical: "Time Tracking / State Machine",
    actions: ["Change Status", "Certify Logs", "Inspection Mode"]
  },

  // --- Commerce ---
  'flash-sale': {
    description: "High-urgency promotional timer to drive impulse purchases.",
    useCase: "Limited-time offers on landing pages.",
    personas: ["Shopper", "Marketer"],
    dataPoints: ["Time Remaining", "Discount %", "Stock Level"],
    technical: "setInterval() countdown",
    actions: ["Add to Cart", "Remind Me", "Share Deal"]
  },
  'product-card': {
    description: "Standard e-commerce product display with quick actions.",
    useCase: "Catalog browsing and search results.",
    personas: ["Shopper"],
    dataPoints: ["Price", "Rating", "Image URL", "Badge"],
    technical: "Composite component",
    actions: ["Quick View", "Add to Wishlist", "Compare"]
  },
  'vendor-trust': {
    description: "Social proof badge showing seller reliability metrics.",
    useCase: "Displayed on product pages to reduce cart abandonment.",
    personas: ["Shopper", "Vendor"],
    dataPoints: ["Verified Status", "Sales Count", "Response Time"],
    technical: "Trust calculation logic",
    actions: ["View Profile", "Contact Seller", "Report Issue"]
  },
  'comparison-grid': {
    description: "Side-by-side feature comparison of multiple products or plans.",
    useCase: "SaaS pricing pages or electronic specs comparison.",
    personas: ["Buyer", "Analyst"],
    dataPoints: ["Feature List", "Price Tier", "Differences Highlight"],
    technical: "Responsive Grid Layout",
    actions: ["Highlight Differences", "Download PDF", "Share Comparison"]
  },
  'vendor-performance-scorecard': {
    description: "Supplier quality and compliance tracking.",
    useCase: "Monitoring upstream supply chain health.",
    personas: ["Procurement Officer", "Category Mgr"],
    dataPoints: ["Defect Rate", "Lead Time"],
    technical: "Scorecarding",
    actions: ["Audit", "Renew Contract"]
  },
  'omni-channel-inventory': {
    description: "Real-time stock visibility across all nodes.",
    useCase: "Optimizing fulfillment and preventing stockouts.",
    personas: ["Planner", "Store Mgr"],
    dataPoints: ["Fill Rate", "Stock Level"],
    technical: "Inventory Graph",
    actions: ["Transfer Stock", "Mark Down"]
  },
  'customer-lifetime-value-crm': {
    description: "Predictive analytics for customer retention.",
    useCase: "Identifying churn risk and high-value cohorts.",
    personas: ["CMO", "Retention Lead"],
    dataPoints: ["Churn Probability", "Lifetime Value"],
    technical: "ML Prediction",
    actions: ["Send Offer", "Start Campaign"]
  },

  // --- Fintech ---
  'crypto-wallet': {
    description: "Digital asset portfolio view with real-time value tracking.",
    useCase: "Personal finance dashboard or investment app.",
    personas: ["Investor", "Trader"],
    dataPoints: ["Asset Balance", "Fiat Value", "24h Change"],
    technical: "Live Price Feed API",
    actions: ["Send Crypto", "Receive", "View History"]
  },
  'payment-request': {
    description: "Peer-to-peer payment initiation card with context.",
    useCase: "Splitting bills or requesting service payments.",
    personas: ["Payer", "Payee"],
    dataPoints: ["Amount", "Requester", "Note"],
    technical: "Payment Gateway Intent",
    actions: ["Pay Now", "Decline", "Split Bill"]
  },
  'invoice-preview': {
    description: "Miniature view of a generated invoice document.",
    useCase: "Freelancer dashboard or billing history.",
    personas: ["Contractor", "Client"],
    dataPoints: ["Invoice #", "Due Date", "Total Amount"],
    technical: "PDF Generation Preview",
    actions: ["Download PDF", "Send Reminder", "Mark Paid"]
  },

  // --- Health ---
  'symptom-triage': {
    description: "Interactive questionnaire to assess patient urgency.",
    useCase: "Telehealth intake flow.",
    personas: ["Patient", "Triage Nurse"],
    dataPoints: ["Symptoms Selected", "Severity Score"],
    technical: "Decision Tree Logic",
    actions: ["Start Assessment", "Contact Doctor", "Emergency Call"]
  },
  'health-snapshot': {
    description: "Daily wellness metrics visualization from wearables.",
    useCase: "Personal health tracking dashboard.",
    personas: ["User", "Doctor"],
    dataPoints: ["Steps", "Sleep Quality", "Heart Rate"],
    technical: "Aggregated HealthKit Data",
    actions: ["Sync Device", "View Trends", "Share with Doctor"]
  },

  // --- Social ---
  'mini-video': {
    description: "Short-form vertical video player with engagement overlay.",
    useCase: "Social feed or product demo reels.",
    personas: ["Content Creator", "Viewer"],
    dataPoints: ["Video Source", "Like Count", "Author Profile"],
    technical: "HTML5 Video + Overlay",
    actions: ["Like", "Comment", "Share"]
  },
  'poll-card': {
    description: "Interactive voting widget for community feedback.",
    useCase: "Social posts or user research.",
    personas: ["Community Manager", "Member"],
    dataPoints: ["Question", "Options", "Vote Distribution"],
    technical: "Real-time Vote Sync",
    actions: ["Vote", "View Results", "Share Poll"]
  },

  // --- GovTech ---
  'permit-app': {
    description: "Progress tracker for bureaucratic processes.",
    useCase: "Citizens tracking building permits or visa applications.",
    personas: ["Citizen", "Civil Servant"],
    dataPoints: ["Application ID", "Current Step", "ETA"],
    technical: "State Machine Visualization",
    actions: ["Check Status", "Upload Docs", "Contact Support"]
  },
  'issue-reporter': {
    description: "Geo-tagged incident reporting form.",
    useCase: "Reporting potholes, outages, or hazards.",
    personas: ["Citizen", "City Maintenance"],
    dataPoints: ["Location", "Category", "Photo"],
    technical: "Geolocation API",
    actions: ["Submit Report", "Add Photo", "My Reports"]
  },

  // --- Real Estate ---
  'property-listing': {
    description: "Rich property card with key amenities and status.",
    useCase: "Real estate marketplace search results.",
    personas: ["Homebuyer", "Agent"],
    dataPoints: ["Price", "Beds/Baths", "Sqft", "Address"],
    technical: "Image Carousel + Specs",
    actions: ["Schedule Tour", "Contact Agent", "Save Listing"]
  },
  'smart-home-control': {
    description: "IoT device controller for home automation.",
    useCase: "Managing lights, locks, and thermostats.",
    personas: ["Homeowner", "Tenant"],
    dataPoints: ["Device State", "Connectivity"],
    technical: "IoT Hub Integration",
    actions: ["Toggle Power", "Set Schedule", "Device Settings"]
  },

  // --- Automotive ---
  'ev-status': {
    description: "Electric vehicle battery and charging monitor.",
    useCase: "EV owner companion app.",
    personas: ["Driver"],
    dataPoints: ["SoC %", "Range Estimate", "Charging Status"],
    technical: "Vehicle Telemetry",
    actions: ["Find Charger", "Stop Charging", "Climate Control"]
  },
  'toll-pass': {
    description: "Digital toll payment and history tracker.",
    useCase: "Highway travel and expense management.",
    personas: ["Commuter", "Fleet Mgr"],
    dataPoints: ["Balance", "Last Trip Cost"],
    technical: "Transaction Ledger",
    actions: ["Top Up", "View History", "Manage Vehicles"]
  },

  // --- Professional ---
  'freelancer-card': {
    description: "Professional profile summary for gig marketplaces.",
    useCase: "Hiring platform search results.",
    personas: ["Recruiter", "Freelancer"],
    dataPoints: ["Hourly Rate", "Skills", "Availability"],
    technical: "Profile Composite",
    actions: ["Hire Now", "View Portfolio", "Message"]
  },
  'doc-scanner': {
    description: "Camera interface for digitizing physical documents.",
    useCase: "Expense receipt scanning or ID verification.",
    personas: ["User", "Admin"],
    dataPoints: ["Image Stream", "Edge Detection"],
    technical: "Computer Vision / OCR",
    actions: ["Capture", "Retake", "Save as PDF"]
  },

  // --- Travel ---
  'boarding-pass': {
    description: "Digital flight ticket with QR code and gate info.",
    useCase: "Airport check-in and boarding.",
    personas: ["Traveler", "Gate Agent"],
    dataPoints: ["Flight #", "Seat", "Gate", "Boarding Time"],
    technical: "Barcode Rendering",
    actions: ["Add to Wallet", "Share Trip", "Gate Info"]
  },
  'itinerary-timeline': {
    description: "Chronological view of trip activities.",
    useCase: "Travel planning and day-of coordination.",
    personas: ["Tourist", "Guide"],
    dataPoints: ["Time Slots", "Locations", "Durations"],
    technical: "Timeline Layout",
    actions: ["Edit Itinerary", "Share", "Add Stop"]
  },

  // --- Enterprise ---
  'hr-onboarding': {
    description: "Task checklist for new employee orientation.",
    useCase: "Employee self-service portal.",
    personas: ["New Hire", "HR Manager"],
    dataPoints: ["Task List", "Completion %"],
    technical: "Workflow Engine",
    actions: ["Start Task", "Contact HR", "View Benefits"]
  },
  'asset-tracker': {
    description: "Enterprise IT asset assignment and location view.",
    useCase: "IT inventory management.",
    personas: ["IT Admin", "Employee"],
    dataPoints: ["Asset Tag", "Assigned User", "Location"],
    technical: "Inventory DB Link",
    actions: ["Update Location", "Report Issue", "Reassign"]
  },
  'service-quote': {
    description: "Detailed cost breakdown for service-based work.",
    useCase: "Freelancers sending estimates to clients.",
    personas: ["Freelancer", "Client"],
    dataPoints: ["Base Price", "Extras", "Total"],
    technical: "Quote Generator",
    actions: ["Accept Quote", "Decline", "Download PDF"]
  },
  'parcel-locker': {
    description: "Automated package retrieval interface.",
    useCase: "Last-mile delivery collection points.",
    personas: ["Recipient"],
    dataPoints: ["Access Code", "Map Location"],
    technical: "QR / PIN System",
    actions: ["Open Locker", "Extend Pickup", "Report Issue"]
  },

  // --- Misc & Services ---
  'poi-carousel': {
    description: "Horizontal scrolling list of points of interest.",
    useCase: "Travel or dining discovery apps.",
    personas: ["Tourist", "Foodie"],
    dataPoints: ["Rating", "Image", "Distance"],
    technical: "CSS Scroll Snap",
    actions: ["Save Place", "Get Directions", "View Menu"]
  },
  'event-carousel': {
    description: "Showcase of upcoming events or webinars.",
    useCase: "Community portals and ticketing sites.",
    personas: ["Attendee"],
    dataPoints: ["Date/Time", "Location", "Category"],
    technical: "Carousel",
    actions: ["Buy Ticket", "RSVP", "Add to Calendar"]
  },
  'ambassador-carousel': {
    description: "Influencer or brand ambassador profile slider.",
    useCase: "Social marketing campaigns.",
    personas: ["Marketer", "User"],
    dataPoints: ["Follower Count", "Niche"],
    technical: "Profile Card",
    actions: ["Follow", "Partner", "View Content"]
  },
  'confirmation-card': {
    description: "Success state feedback component.",
    useCase: "Post-transaction confirmation.",
    personas: ["User"],
    dataPoints: ["Transaction ID", "Summary"],
    technical: "Status Icon + Text",
    actions: ["View Details", "Home", "Share"]
  },
  'zone-heatmap': {
    description: "Geospatial density visualization.",
    useCase: "Urban planning or demand analysis.",
    personas: ["Planner", "Analyst"],
    dataPoints: ["Intensity Color", "Region"],
    technical: "Map Overlay",
    actions: ["Zoom In", "Filter Layer", "Export"]
  },
  'selection-chips': {
    description: "Compact multi-select UI elements.",
    useCase: "Filtering search results or preferences.",
    personas: ["User"],
    dataPoints: ["Label", "Selected State"],
    technical: "Interactive Tags",
    actions: ["Toggle", "Clear All", "Save"]
  },
  'comparison-table': {
    description: "Detailed row-based comparison view.",
    useCase: "Technical product specifications.",
    personas: ["Engineer", "Buyer"],
    dataPoints: ["Spec Name", "Value A", "Value B"],
    technical: "Table Component",
    actions: ["Highlight Diff", "Sort", "Export"]
  },
  'progress-card': {
    description: "Metric visualization against a goal.",
    useCase: "Fitness apps or project management.",
    personas: ["User", "Manager"],
    dataPoints: ["Current Value", "Target", "Percentage"],
    technical: "SVG Progress Bar",
    actions: ["Update", "View History", "Share"]
  },
  'calendar-selector': {
    description: "Date picker and schedule view.",
    useCase: "Booking appointments or filtering logs.",
    personas: ["User", "Admin"],
    dataPoints: ["Selected Date", "Availability"],
    technical: "Calendar Lib",
    actions: ["Select Date", "Change Month", "Today"]
  },
  'form-group': {
    description: "Structured input field layout.",
    useCase: "Data entry forms.",
    personas: ["User"],
    dataPoints: ["Label", "Input Type", "Validation"],
    technical: "Form Control",
    actions: ["Input Data", "Validate", "Reset"]
  },
  'ticket-pass': {
    description: "Event admission ticket with QR.",
    useCase: "Concerts, movies, or conferences.",
    personas: ["Attendee", "Scanner"],
    dataPoints: ["Event Info", "Seat", "QR Code"],
    technical: "Digital Wallet Pass",
    actions: ["Scan", "Transfer", "Add to Wallet"]
  },
  'order-tracker': {
    description: "Real-time status updates for orders.",
    useCase: "Food delivery or e-commerce shipping.",
    personas: ["Customer"],
    dataPoints: ["Current Stage", "ETA"],
    technical: "Stepper",
    actions: ["Contact Support", "Cancel", "View Receipt"]
  },
  'map-view': {
    description: "Interactive map component.",
    useCase: "Location selection or visualization.",
    personas: ["User"],
    dataPoints: ["Center", "Zoom", "Markers"],
    technical: "Map API",
    actions: ["Pan", "Zoom", "Select Marker"]
  },
  'product-carousel': {
    description: "Merchandising slider for items.",
    useCase: "Related products or best sellers.",
    personas: ["Shopper"],
    dataPoints: ["Product Img", "Price"],
    technical: "Slider",
    actions: ["Add to Cart", "View Product", "Wishlist"]
  },
  'service-menu': {
    description: "List of available services and prices.",
    useCase: "Salon or spa booking.",
    personas: ["Client"],
    dataPoints: ["Service Name", "Duration", "Cost"],
    technical: "List Item",
    actions: ["Book", "More Info"]
  },
  'analytics-snapshot': {
    description: "Mini-dashboard card with sparkline.",
    useCase: "Executive summary views.",
    personas: ["Manager"],
    dataPoints: ["Metric", "Trend", "Sparkline"],
    technical: "Chart",
    actions: ["Expand", "Export", "Change Range"]
  },
  'media-player': {
    description: "Audio/Video playback controls.",
    useCase: "Music streaming or video courses.",
    personas: ["Listener"],
    dataPoints: ["Track Info", "Progress", "Volume"],
    technical: "Media API",
    actions: ["Play/Pause", "Skip", "Scrub"]
  },
  'agent-sync-card': {
    description: "Visual feedback for AI agent actions.",
    useCase: "Conversational UI interfaces.",
    personas: ["User"],
    dataPoints: ["Agent Status", "Action Name"],
    technical: "Animation",
    actions: ["Cancel", "Retry", "View Log"]
  },
  'payment-request': {
    description: "Peer-to-peer payment initiation.",
    useCase: "Digital wallet transfers.",
    personas: ["Sender", "Receiver"],
    dataPoints: ["Amount", "User", "Note"],
    technical: "Payment API",
    actions: ["Pay", "Decline", "Remind"]
  },
  'weather-card': {
    description: "Current weather conditions widget.",
    useCase: "Dashboard context.",
    personas: ["User"],
    dataPoints: ["Temp", "Icon", "Humidity"],
    technical: "Weather API",
    actions: ["Refresh", "Change Location"]
  },
  'alert-card': {
    description: "Critical notification component.",
    useCase: "System warnings or emergencies.",
    personas: ["User", "Admin"],
    dataPoints: ["Message", "Severity", "Time"],
    technical: "Toast / Banner",
    actions: ["Dismiss", "View Details", "Snooze"]
  },
  'document-card': {
    description: "File attachment preview.",
    useCase: "Messaging or file management.",
    personas: ["User"],
    dataPoints: ["File Name", "Type", "Size"],
    technical: "File Icon",
    actions: ["Download", "Preview", "Delete"]
  },
  'receipt-card': {
    description: "Digital transaction record.",
    useCase: "Expense tracking.",
    personas: ["Shopper"],
    dataPoints: ["Merchant", "Total", "Date"],
    technical: "List",
    actions: ["Print", "Email", "Dispute"]
  },
  'reservation-card': {
    description: "Booking confirmation details.",
    useCase: "Restaurant or service bookings.",
    personas: ["Guest"],
    dataPoints: ["Place", "Time", "Party Size"],
    technical: "Card",
    actions: ["Modify", "Cancel", "Add to Calendar"]
  },
  'voice-note': {
    description: "Audio message bubble.",
    useCase: "Chat applications.",
    personas: ["User"],
    dataPoints: ["Duration", "Waveform"],
    technical: "Audio Player",
    actions: ["Play", "Delete", "Transcribe"]
  },
  'production-line': {
    description: "Factory floor line status.",
    useCase: "Industrial monitoring.",
    personas: ["Plant Mgr"],
    dataPoints: ["Status", "Output Rate"],
    technical: "Live Data",
    actions: ["Stop", "Maintenance", "View Details"]
  },
  'insurance-policy': {
    description: "Policy summary view.",
    useCase: "Insurance customer portal.",
    personas: ["Policyholder"],
    dataPoints: ["Policy #", "Coverage", "Premium"],
    technical: "Data Card",
    actions: ["Renew", "File Claim", "Edit Coverage"]
  },
  
  // --- Non-Profit & Philanthropy ---
  'donor-profile': {
    description: "Comprehensive view of a donor's history and engagement.",
    useCase: "Fundraisers preparing for meetings or analyzing segments.",
    personas: ["Fundraiser"],
    dataPoints: ["Total Giving", "Last Gift", "Interests"],
    technical: "CRM Profile",
    actions: ["Log Call", "Email", "Edit Profile"]
  },
  'campaign-dashboard': {
    description: "Real-time fundraising progress vs goals.",
    useCase: "Monitoring campaign performance during events.",
    personas: ["Campaign Manager"],
    dataPoints: ["Raised Amount", "% to Goal", "Donor Count"],
    technical: "Progress Charts",
    actions: ["Share Update", "View Donors", "Edit Goal"]
  },
  'volunteer-roster': {
    description: "List of signed-up volunteers for an event.",
    useCase: "Coordinating shifts and checking in volunteers.",
    personas: ["Volunteer Coordinator"],
    dataPoints: ["Name", "Shift", "Status"],
    technical: "List / Table",
    actions: ["Check In", "Message", "Reassign"]
  },
  'impact-report': {
    description: "Data-driven storytelling of mission success.",
    useCase: "Reporting to donors and board members.",
    personas: ["Program Director"],
    dataPoints: ["Metric", "Outcome Value", "Visual"],
    technical: "Infographic",
    actions: ["Download PDF", "Share", "Embed"]
  },
  'aid-distribution-map': {
    description: "Geospatial view of aid delivery and logistics.",
    useCase: "Coordinating humanitarian relief efforts.",
    personas: ["Logistics Coordinator"],
    dataPoints: ["Asset Location", "Delivery Status"],
    technical: "Map",
    actions: ["Route", "Track", "Update Status"]
  },
  'donation-card': {
    description: "Simplified donation checkout component.",
    useCase: "Embedding giving opportunities in apps.",
    personas: ["Donor"],
    dataPoints: ["Amount", "Frequency", "Campaign"],
    technical: "Payment Form",
    actions: ["Donate", "Recurring", "Dedicate"]
  },
  'outcome-tracker': {
    description: "Tracking long-term mission outcomes over time.",
    useCase: "Monitoring program effectiveness.",
    personas: ["M&E Officer"],
    dataPoints: ["Indicator", "Target", "Trend"],
    technical: "Trend Chart",
    actions: ["Add Data", "View Report", "Set Target"]
  },
  
  // --- Science & R&D ---
  'lab-sample-manager': {
    description: "LIMS interface for tracking biological samples.",
    useCase: "Managing chain of custody and storage locations.",
    personas: ["Lab Tech", "Scientist"],
    dataPoints: ["Chain of Custody", "Storage Location"],
    technical: "LIMS Database",
    actions: ["Print Label", "Log Result", "Move Sample"]
  },
  'experiment-designer': {
    description: "Protocol builder for scientific experiments.",
    useCase: "Researchers planning methodology and variables.",
    personas: ["Principal Investigator", "Lab Tech"],
    dataPoints: ["Hypothesis", "Variables", "Steps"],
    technical: "Form Builder",
    actions: ["Save Draft", "Start Experiment", "Share Protocol"]
  },
  'research-paper-draft': {
    description: "Collaborative editing and review for publications.",
    useCase: "Drafting and peer-reviewing scientific papers.",
    personas: ["Author", "Reviewer"],
    dataPoints: ["Version", "Comments", "Status"],
    technical: "Document Editor",
    actions: ["Add Comment", "Submit Review", "Export PDF"]
  },
  'biohazard-monitor': {
    description: "Safety dashboard for controlled lab environments.",
    useCase: "Ensuring compliance with biosafety levels.",
    personas: ["Safety Officer"],
    dataPoints: ["Air Quality", "Pressure", "Alerts"],
    technical: "IoT Monitoring",
    actions: ["Emergency Seal", "Ventilate", "Log Incident"]
  },
  'recruitment-pipeline': {
    description: "Kanban board for candidate tracking.",
    useCase: "Managing the hiring funnel and candidate evaluation.",
    personas: ["Recruiter", "Hiring Manager"],
    dataPoints: ["Stage Count", "Candidate Score"],
    technical: "Kanban Board",
    actions: ["Move Candidate", "Schedule Interview", "Offer"]
  },
  'soc-incident-response': {
    description: "Security Operations Center incident triage.",
    useCase: "Investigating and containing cyber threats.",
    personas: ["Security Analyst"],
    dataPoints: ["Attack Vector", "Compromised Assets"],
    technical: "SIEM Integration",
    actions: ["Isolate Host", "Block IP", "Forensics"]
  },
  'precision-ag-dashboard': {
    description: "Farm management system for crop health.",
    useCase: "Monitoring soil conditions and crop vitality.",
    personas: ["Farmer", "Agronomist"],
    dataPoints: ["Soil Moisture", "NDVI"],
    technical: "IoT / Satellite",
    actions: ["Irrigate", "Fertilize", "Scout Field"]
  },
  'donor-impact-crm': {
    description: "Major donor relationship management view.",
    useCase: "Cultivating high-value donors and tracking engagement.",
    personas: ["Fundraiser", "Major Gifts Officer"],
    dataPoints: ["Lifetime Giving", "Engagement Score"],
    technical: "CRM Integration",
    actions: ["Log Touch", "Plan Ask", "Review History"]
  },
  'fleet-telematics-hub': {
    description: "Real-time vehicle telemetry and diagnostics.",
    useCase: "Monitoring active fleet assets for health and safety.",
    personas: ["Fleet Manager", "Dispatcher"],
    dataPoints: ["Speed", "Fuel", "Fault Codes"],
    technical: "IoT Stream",
    actions: ["Message Driver", "Schedule Service", "Geofence"]
  },
  'smart-grid-load-balancer': {
    description: "Utility grid management and demand response.",
    useCase: "Balancing power generation with consumption load.",
    personas: ["Grid Operator"],
    dataPoints: ["Load %", "Generation Mix"],
    technical: "SCADA Integration",
    actions: ["Dispatch Peaker", "Shed Load", "Isolate"]
  },
  'gds-booking-terminal': {
    description: "Professional travel agent booking interface (GDS).",
    useCase: "Managing complex flight itineraries and ticketing.",
    personas: ["Travel Agent"],
    dataPoints: ["PNR", "Fare Calculation"],
    technical: "Mainframe Terminal Emulation",
    actions: ["Refund", "Exchange", "Issue Ticket"]
  },
  'threat-radar': {
    description: "Live visualization of cyber threats and attack vectors.",
    useCase: "SOC teams monitoring network security posture.",
    personas: ["Security Analyst"],
    dataPoints: ["Threat Level", "Attack Type", "Origin"],
    technical: "Radar Chart",
    actions: ["Block IP", "Isolate Node", "View Threat Intel"]
  },
  'contract-lifecycle': {
    description: "Stage-gate process for legal agreement management.",
    useCase: "Tracking contracts from draft to signature.",
    personas: ["Legal Counsel"],
    dataPoints: ["Stage", "Version", "Due Date"],
    technical: "Workflow State",
    actions: ["Review", "Sign", "Reject"]
  },
  'compliance-checklist': {
    description: "Audit tool for regulatory adherence.",
    useCase: "Preparing for SOC2 or ISO audits.",
    personas: ["Compliance Officer"],
    dataPoints: ["Control Status", "Pass/Fail Rate"],
    technical: "Audit Log",
    actions: ["Start Audit", "Export Report", "Assign Task"]
  },
  'incident-war-room': {
    description: "Command center for active security incident response.",
    useCase: "Coordinating teams during a breach or outage.",
    personas: ["Incident Commander"],
    dataPoints: ["Severity", "Time Elapsed", "Team"],
    technical: "Real-time Collaboration",
    actions: ["Declare Incident", "Invite Team", "Close Room"]
  },
  'moderation-queue': {
    description: "Content moderation workflow for community governance.",
    useCase: "Reviewing reported content and managing user bans.",
    personas: ["Moderator", "Community Manager"],
    dataPoints: ["Report Flags", "User History"],
    technical: "Queue System",
    actions: ["Approve", "Ban User", "Escalate"]
  }
};
