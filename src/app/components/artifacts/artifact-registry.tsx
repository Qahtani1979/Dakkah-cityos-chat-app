import type { ComponentType } from 'react';

// --- 1. Logistics Domain ---
import { 
  LiveTrackingMap, LogisticsTimeline, ProofOfDelivery, IoTSensorDashboard,
  FleetMaintenanceCard, WarehousePickerUI,
  FreightQuoteCalculator, ShipmentLabelGenerator, DriverManifest,
  LoadBalancingVisualizer, IncidentReportForm,
  DeliveryPreferences, ReturnRequestManager, SmartLockerSelector, DriverStatsCard,
  ArPackageSizer, EcoRoutePlanner, DockScheduler, CustomsClearanceCard,
  TelematicsScorecard, FuelEnergyAnalytics, DigitalLogbookCompliance, PredictiveFleetMatrix,
  AssetLifecycleTCO, PartsInventoryWidget, ProcurementRequest,
  DemandForecast, InventoryPlanning, CarrierNetwork, YardMonitor, ReverseLogistics,
  DriverSafetyScore, CitationManager, RegistrationTracker, AssetRemarketing,
  EVChargingMonitor, GreyFleetManager,
  DriverQualification, VehicleBooking,
  TechnicianJobCard, EsgCarbonTracker, DriverCoaching,
  AccidentReportFNOL, VendorRepairApproval, LeaseContractManager,
  EldComplianceLog, YardDockScheduler, DigitalPodManifest,
  DriverSettlementSheet, IftaFuelTaxManager, ColdChainMonitor
} from './domains/logistics/index';

import {
  VendorPerformanceScorecard, OmniChannelInventory, CustomerLifetimeValueCRM
} from './domains/commerce/index';

import {
  ProductionScheduleGantt, OeeDashboard, QualityControlStation
} from './domains/manufacturing/index';

import {
  KycVerificationPortal, LoanUnderwritingDesk, FraudDetectionConsole
} from './domains/fintech/index';

import {
  EmrPatientRecord, InsuranceClaimsProcessor, TelehealthDoctorConsole
} from './domains/health/index';

import {
  CivilRegistryRecord, JudicialCaseManager, UrbanPlanningGrid
} from './domains/govtech/index';

import {
  StudentInfoSystem, CurriculumBuilder, CampusSafetyMonitor
} from './domains/education/index';

import {
  LeaseAdminLedger, FacilityEnergyManager, ConstructionProjectTracker
} from './domains/real-estate/index';

import {
  PolicyAdminSystem, ClaimsAdjusterWorkbench, ActuarialRiskHeatmap
} from './domains/insurance/index';

import {
  CommunityModerationQueue, LabSampleManager, DonorImpactCrm
} from './domains/social-science-deep-ops';

import {
  FleetTelematicsHub, SmartGridLoadBalancer, GdsBookingTerminal
} from './domains/service-infra-deep-ops';

import {
  RecruitmentPipelineBoard, SocIncidentResponse, PrecisionAgDashboard
} from './domains/professional-deep-ops';

// --- 2. Commerce Domain ---
import { 
  FlashSaleCountdown, ComparisonGrid, ProductCard,
  VendorTrustProfile, SmartFilterChips
} from './domains/commerce';

// --- 3. Fintech Domain ---
import { 
  EscrowStatus, InvoicePreview, CreditLimitGauge 
} from './domains/fintech';

// --- 4. Health & Edu Domain ---
import { 
  SymptomTriage, LessonTracker, ServiceQuoteBuilder 
} from './domains/health-edu';

// --- 5. Social Domain ---
import { 
  MiniVideoFeed, GamificationScoreboard 
} from './domains/social-media';

// --- 6. GovTech & Civic Domain ---
import { 
  PermitApplication, IssueReporter, TaxSummary 
} from './domains/govtech';

// --- 7. Real Estate Domain ---
import { 
  PropertyListing, MaintenanceRequest 
} from './domains/real-estate';

// --- 8. Automotive Domain ---
import { 
  EVChargingStatus, VehicleRemote, TollPass 
} from './domains/automotive';

// --- 9. Professional Services Domain ---
import { 
  FreelancerCard, ConsultationTimer, DocumentScanner 
} from './domains/professional';

// --- 10. Utilities Domain ---
import { 
  EnergyUsageGraph, BillPayWidget, OutageMap 
} from './domains/utilities';

// --- 11. Travel Domain ---
import { 
  FlightBoardingPass, HotelConcierge, CurrencyConverter 
} from './domains/travel';

// --- 12. AgTech Domain ---
import {
  LivestockTracker, CropMoistureMap, CarbonCreditCard
} from './domains/agtech';

// --- 13. Enterprise Domain ---
import {
  HROnboardingTask, DigitalSignagePreview, InventoryAssetTracker
} from './domains/enterprise';

// --- 14. Spectrum Expansion (Non-Profit, Science, Security) ---
import {
  DonorProfile, CampaignDashboard, VolunteerRoster, ImpactReport, 
  AidDistributionMap, DonationCard, OutcomeTracker,
  ExperimentDesigner, LabDataFeed, SampleInventory, BiohazardMonitor, 
  ResearchPaperDraft,
  ThreatRadar, ContractLifecycle, ComplianceChecklist, IncidentWarRoom
} from './domains/spectrum-expansion';



// --- Legacy & City OS Support ---
import { POICarousel } from './poi-carousel';
import { EventCarousel } from './event-carousel';
import { AmbassadorCarousel } from './ambassador-carousel';
import { ItineraryTimeline } from './itinerary-timeline';
import { ConfirmationCard } from './confirmation-card';
import { ZoneHeatmap } from './zone-heatmap';
import { SelectionChips } from './selection-chips';
import { ComparisonTable } from './comparison-table';
import { ProgressCard } from './progress-card';
import { CalendarSelector } from './calendar-selector';
import { FormGroup } from './form-group';
import { TicketPass } from './ticket-pass';
import { OrderTracker } from './order-tracker';
import { MapView } from './map-view';
import { ProductCarousel } from './product-carousel';
import { ServiceMenu } from './service-menu';
import { AnalyticsSnapshot } from './analytics-snapshot';
import { MediaPlayer } from './media-player';
import { AgentSyncCard } from './agent-sync-card';

// Import City OS Batch 1 & 2
import { 
  PaymentRequest, RideStatus, ProfileCard, WeatherCard, 
  PollCard, AlertCard, DocumentCard, ReceiptCard 
} from './city-os-artifacts';
import {
  HealthSnapshot, SmartHomeControl, ParkingMeter, ParcelLocker,
  ReservationCard, CryptoWallet, TaskChecklist, VoiceNote
} from './city-os-artifacts-expanded';

export type ArtifactMode = 'inline' | 'block';

export interface ArtifactConfig {
  component: ComponentType<any>;
  mode: ArtifactMode;
}

export const ARTIFACT_REGISTRY: Record<string, ArtifactConfig> = {
  // --- 1. Logistics ---
  'logistics-map':       { component: LiveTrackingMap, mode: 'block' },
  'logistics-timeline':  { component: LogisticsTimeline, mode: 'inline' },
  'proof-of-delivery':   { component: ProofOfDelivery, mode: 'inline' },
  'iot-dashboard':       { component: IoTSensorDashboard, mode: 'inline' },
  'fleet-maintenance':   { component: FleetMaintenanceCard, mode: 'inline' },
  'warehouse-picker':    { component: WarehousePickerUI, mode: 'block' },
  'freight-quote':       { component: FreightQuoteCalculator, mode: 'inline' },
  'shipment-label':      { component: ShipmentLabelGenerator, mode: 'block' },
  'driver-manifest':     { component: DriverManifest, mode: 'block' },
  'load-balancer':       { component: LoadBalancingVisualizer, mode: 'block' },
  'incident-report':     { component: IncidentReportForm, mode: 'inline' },
  'delivery-prefs':      { component: DeliveryPreferences, mode: 'inline' },
  'return-manager':      { component: ReturnRequestManager, mode: 'block' },
  'smart-locker':        { component: SmartLockerSelector, mode: 'block' },
  'driver-stats':        { component: DriverStatsCard, mode: 'inline' },
  
  // Advanced Logistics (Gap Analysis)
  'ar-package-sizer':    { component: ArPackageSizer, mode: 'block' },
  'eco-route-planner':   { component: EcoRoutePlanner, mode: 'block' },
  'dock-scheduler':      { component: DockScheduler, mode: 'block' },
  'customs-clearance':   { component: CustomsClearanceCard, mode: 'block' },
  
  // Logistics: Fleet Ops Deep Dive
  'telematics-scorecard': { component: TelematicsScorecard, mode: 'block' },
  'fuel-analytics':       { component: FuelEnergyAnalytics, mode: 'block' },
  'digital-logbook':      { component: DigitalLogbookCompliance, mode: 'block' },
  'fleet-health-matrix':  { component: PredictiveFleetMatrix, mode: 'block' },

  // Logistics: Fleet Lifecycle (New)
  'asset-lifecycle-tco': { component: AssetLifecycleTCO, mode: 'block' },
  'parts-inventory':     { component: PartsInventoryWidget, mode: 'inline' },
  'procurement-request': { component: ProcurementRequest, mode: 'inline' },

  // Logistics: Supply Chain & Yard (New)
  'demand-forecast':     { component: DemandForecast, mode: 'block' },
  'inventory-planning':  { component: InventoryPlanning, mode: 'block' },
  'carrier-network':     { component: CarrierNetwork, mode: 'block' },
  'yard-monitor':        { component: YardMonitor, mode: 'block' },
  'reverse-logistics':   { component: ReverseLogistics, mode: 'block' },

  // Logistics: Fleet Admin & Safety (New)
  'driver-safety-score': { component: DriverSafetyScore, mode: 'block' },
  'citation-manager':    { component: CitationManager, mode: 'block' },
  'registration-tracker':{ component: RegistrationTracker, mode: 'block' },
  'asset-remarketing':   { component: AssetRemarketing, mode: 'block' },
  'ev-charging-monitor': { component: EVChargingMonitor, mode: 'block' },
  'grey-fleet-manager':  { component: GreyFleetManager, mode: 'block' },
  'driver-qualification': { component: DriverQualification, mode: 'block' },
  'vehicle-booking':      { component: VehicleBooking, mode: 'block' },
  'technician-job-card':  { component: TechnicianJobCard, mode: 'block' },
  'esg-carbon-tracker':   { component: EsgCarbonTracker, mode: 'block' },
  'driver-coaching':      { component: DriverCoaching, mode: 'block' },
  'accident-report-fnol': { component: AccidentReportFNOL, mode: 'block' },
  'vendor-repair-approval': { component: VendorRepairApproval, mode: 'block' },
  'lease-contract-manager': { component: LeaseContractManager, mode: 'block' },
  'eld-compliance-log':     { component: EldComplianceLog, mode: 'block' },
  'yard-dock-scheduler':    { component: YardDockScheduler, mode: 'block' },
  'digital-pod-manifest':   { component: DigitalPodManifest, mode: 'block' },
  'driver-settlement-sheet': { component: DriverSettlementSheet, mode: 'block' },
  'ifta-fuel-tax-manager':   { component: IftaFuelTaxManager, mode: 'block' },
  'cold-chain-monitor':      { component: ColdChainMonitor, mode: 'block' },
  
  // Commerce Operations
  'vendor-performance-scorecard': { component: VendorPerformanceScorecard, mode: 'block' },
  'omni-channel-inventory':       { component: OmniChannelInventory, mode: 'block' },
  'customer-lifetime-value-crm':  { component: CustomerLifetimeValueCRM, mode: 'block' },
  
  // Manufacturing Deep Ops
  'production-schedule-gantt':    { component: ProductionScheduleGantt, mode: 'block' },
  'project-gantt':                { component: ProductionScheduleGantt, mode: 'block' },
  'oee-dashboard':                { component: OeeDashboard, mode: 'block' },
  'quality-control-station':      { component: QualityControlStation, mode: 'block' },

  // Fintech Deep Ops
  'kyc-verification-portal':      { component: KycVerificationPortal, mode: 'block' },
  'loan-underwriting-desk':       { component: LoanUnderwritingDesk, mode: 'block' },
  'fraud-detection-console':      { component: FraudDetectionConsole, mode: 'block' },

  // Health Deep Ops
  'emr-patient-record':           { component: EmrPatientRecord, mode: 'block' },
  'insurance-claims-processor':   { component: InsuranceClaimsProcessor, mode: 'block' },
  'telehealth-doctor-console':    { component: TelehealthDoctorConsole, mode: 'block' },

  // GovTech Deep Ops
  'civil-registry-record':        { component: CivilRegistryRecord, mode: 'block' },
  'judicial-case-manager':        { component: JudicialCaseManager, mode: 'block' },
  'urban-planning-grid':          { component: UrbanPlanningGrid, mode: 'block' },

  // Education Deep Ops
  'student-info-system':          { component: StudentInfoSystem, mode: 'block' },
  'curriculum-builder':           { component: CurriculumBuilder, mode: 'block' },
  'campus-safety-monitor':        { component: CampusSafetyMonitor, mode: 'block' },

  // Real Estate Deep Ops
  'lease-admin-ledger':           { component: LeaseAdminLedger, mode: 'block' },
  'facility-energy-manager':      { component: FacilityEnergyManager, mode: 'block' },
  'construction-project-tracker': { component: ConstructionProjectTracker, mode: 'block' },

  // Insurance Deep Ops
  'policy-admin-system':          { component: PolicyAdminSystem, mode: 'block' },
  'claims-adjuster-workbench':    { component: ClaimsAdjusterWorkbench, mode: 'block' },
  'actuarial-risk-heatmap':       { component: ActuarialRiskHeatmap, mode: 'block' },

  // Social/Science/Non-Profit Deep Ops
  'moderation-queue':             { component: CommunityModerationQueue, mode: 'block' },
  'lab-sample-manager':           { component: LabSampleManager, mode: 'block' },
  'donor-impact-crm':             { component: DonorImpactCrm, mode: 'block' },

  // Service Infra Deep Ops
  'fleet-telematics-hub':         { component: FleetTelematicsHub, mode: 'block' },
  'smart-grid-load-balancer':     { component: SmartGridLoadBalancer, mode: 'block' },
  'gds-booking-terminal':         { component: GdsBookingTerminal, mode: 'block' },

  // Professional Deep Ops
  'recruitment-pipeline':         { component: RecruitmentPipelineBoard, mode: 'block' },
  'soc-incident-response':        { component: SocIncidentResponse, mode: 'block' },
  'precision-ag-dashboard':       { component: PrecisionAgDashboard, mode: 'block' },

  // --- 2. Commerce ---
  'flash-sale':          { component: FlashSaleCountdown, mode: 'inline' },
  'comparison-grid':     { component: ComparisonGrid, mode: 'block' },
  'product-card':        { component: ProductCard, mode: 'inline' },
  'vendor-trust':        { component: VendorTrustProfile, mode: 'inline' },
  'smart-filters':       { component: SmartFilterChips, mode: 'inline' },

  // --- 3. Fintech ---
  'escrow-status':       { component: EscrowStatus, mode: 'inline' },
  'invoice-preview':     { component: InvoicePreview, mode: 'inline' },
  'credit-gauge':        { component: CreditLimitGauge, mode: 'inline' },

  // --- 4. Health & Edu ---
  'symptom-triage':      { component: SymptomTriage, mode: 'block' },
  'lesson-tracker':      { component: LessonTracker, mode: 'inline' },
  'service-quote':       { component: ServiceQuoteBuilder, mode: 'block' },

  // --- 5. Social ---
  'mini-video':          { component: MiniVideoFeed, mode: 'block' },
  'game-scoreboard':     { component: GamificationScoreboard, mode: 'inline' },

  // --- 6. GovTech ---
  'permit-app':          { component: PermitApplication, mode: 'block' },
  'issue-reporter':      { component: IssueReporter, mode: 'inline' },
  'tax-summary':         { component: TaxSummary, mode: 'inline' },

  // --- 7. Real Estate ---
  'property-listing':    { component: PropertyListing, mode: 'block' },
  'maintenance-req':     { component: MaintenanceRequest, mode: 'inline' },

  // --- 8. Automotive ---
  'ev-status':           { component: EVChargingStatus, mode: 'inline' },
  'vehicle-remote':      { component: VehicleRemote, mode: 'inline' },
  'toll-pass':           { component: TollPass, mode: 'inline' },

  // --- 9. Professional ---
  'freelancer-card':     { component: FreelancerCard, mode: 'inline' },
  'consultation-timer':  { component: ConsultationTimer, mode: 'inline' },
  'doc-scanner':         { component: DocumentScanner, mode: 'block' },

  // --- 10. Utilities ---
  'energy-graph':        { component: EnergyUsageGraph, mode: 'block' },
  'bill-pay':            { component: BillPayWidget, mode: 'inline' },
  'outage-map':          { component: OutageMap, mode: 'block' },

  // --- 11. Travel ---
  'boarding-pass':       { component: FlightBoardingPass, mode: 'block' },
  'hotel-concierge':     { component: HotelConcierge, mode: 'inline' },
  'currency-converter':  { component: CurrencyConverter, mode: 'inline' },

  // --- 12. AgTech ---
  'livestock-tracker':   { component: LivestockTracker, mode: 'inline' },
  'crop-map':            { component: CropMoistureMap, mode: 'block' },
  'harvest-log':         { component: OutcomeTracker, mode: 'inline' },
  'carbon-credit':       { component: CarbonCreditCard, mode: 'block' },

  // --- 13. Enterprise ---
  'hr-onboarding':       { component: HROnboardingTask, mode: 'inline' },
  'digital-signage':     { component: DigitalSignagePreview, mode: 'block' },
  'asset-tracker':       { component: InventoryAssetTracker, mode: 'inline' },


  // --- 14. Non-Profit ---
  'donor-profile':       { component: DonorProfile, mode: 'inline' },
  'campaign-dashboard':  { component: CampaignDashboard, mode: 'inline' },
  'volunteer-roster':    { component: VolunteerRoster, mode: 'inline' },
  'impact-report':       { component: ImpactReport, mode: 'inline' },
  'aid-distribution-map':{ component: AidDistributionMap, mode: 'block' },
  'donation-card':       { component: DonationCard, mode: 'inline' },
  'outcome-tracker':     { component: OutcomeTracker, mode: 'inline' },

  // --- 15. Science ---
  'experiment-designer': { component: ExperimentDesigner, mode: 'block' },
  'lab-data-feed':       { component: LabDataFeed, mode: 'inline' },
  'sample-inventory':    { component: SampleInventory, mode: 'block' },
  'biohazard-monitor':   { component: BiohazardMonitor, mode: 'inline' },
  'research-paper-draft':{ component: ResearchPaperDraft, mode: 'inline' },
  'research-paper':      { component: ResearchPaperDraft, mode: 'inline' },

  // --- 16. Security ---
  'threat-radar':        { component: ThreatRadar, mode: 'block' },
  'contract-lifecycle':  { component: ContractLifecycle, mode: 'inline' },
  'compliance-checklist':{ component: ComplianceChecklist, mode: 'inline' },
  'incident-war-room':   { component: IncidentWarRoom, mode: 'block' },


  // --- Legacy & City OS Support ---
  'poi-carousel':        { component: POICarousel, mode: 'block' },
  'event-carousel':      { component: EventCarousel, mode: 'block' },
  'ambassador-carousel': { component: AmbassadorCarousel, mode: 'block' },
  'itinerary-timeline':  { component: ItineraryTimeline, mode: 'block' },
  'confirmation-card':   { component: ConfirmationCard, mode: 'inline' },
  'zone-heatmap':        { component: ZoneHeatmap, mode: 'block' },
  'selection-chips':     { component: SelectionChips, mode: 'inline' },
  'comparison-table':    { component: ComparisonTable, mode: 'block' },
  'progress-card':       { component: ProgressCard, mode: 'inline' },
  'calendar-selector':   { component: CalendarSelector, mode: 'block' },
  'form-group':          { component: FormGroup, mode: 'block' },
  'ticket-pass':         { component: TicketPass, mode: 'inline' },
  'order-tracker':       { component: OrderTracker, mode: 'inline' },
  'map-view':            { component: MapView, mode: 'block' },
  'product-carousel':    { component: ProductCarousel, mode: 'block' },
  'service-menu':        { component: ServiceMenu, mode: 'block' },
  'analytics-snapshot':  { component: AnalyticsSnapshot, mode: 'block' },
  'media-player':        { component: MediaPlayer, mode: 'block' },
  'agent-sync-card':     { component: AgentSyncCard, mode: 'inline' },
  
  // City OS Batch 1
  'payment-request':     { component: PaymentRequest, mode: 'inline' },
  'ride-status':         { component: RideStatus, mode: 'inline' },
  'profile-card':        { component: ProfileCard, mode: 'inline' },
  'weather-card':        { component: WeatherCard, mode: 'inline' },
  'poll-card':           { component: PollCard, mode: 'inline' },
  'alert-card':          { component: AlertCard, mode: 'inline' },
  'document-card':       { component: DocumentCard, mode: 'inline' },
  'receipt-card':        { component: ReceiptCard, mode: 'inline' },

  // City OS Batch 2
  'health-snapshot':     { component: HealthSnapshot, mode: 'inline' },
  'smart-home-control':  { component: SmartHomeControl, mode: 'inline' },
  'parking-meter':       { component: ParkingMeter, mode: 'inline' },
  'parcel-locker':       { component: ParcelLocker, mode: 'inline' },
  'reservation-card':    { component: ReservationCard, mode: 'inline' },
  'crypto-wallet':       { component: CryptoWallet, mode: 'inline' },
  'task-checklist':      { component: TaskChecklist, mode: 'inline' },
  'voice-note':          { component: VoiceNote, mode: 'inline' },

  // --- Gap Fillers ---
  'credential-verification': { component: DocumentCard, mode: 'inline' },
  'clinical-decision-support': { component: AlertCard, mode: 'inline' },
  'geological-survey':   { component: ZoneHeatmap, mode: 'block' },
  'yield-grading':       { component: QualityControlStation, mode: 'block' },
  'production-recipe':   { component: TaskChecklist, mode: 'inline' },
  'payroll-run':         { component: AnalyticsSnapshot, mode: 'block' },
  'traffic-monitor':     { component: ZoneHeatmap, mode: 'block' },
  
  // --- Platform Kernel ---
  'control-plane-console': { component: AnalyticsSnapshot, mode: 'block' },
  'ai-inference-log':      { component: TaskChecklist, mode: 'inline' },
  'security-audit-log':    { component: TaskChecklist, mode: 'block' },
  'config-rollout-tracker':{ component: ProgressCard, mode: 'inline' },
  
  // --- Vertical Kernels (The God View) ---
  'global-supply-tower':   { component: ZoneHeatmap, mode: 'block' },
  'marketplace-pulse':     { component: AnalyticsSnapshot, mode: 'block' },
  'crowd-control-system':  { component: ZoneHeatmap, mode: 'block' },
  'border-flow-analyzer':  { component: AnalyticsSnapshot, mode: 'block' },
  'cdn-distribution-node': { component: AnalyticsSnapshot, mode: 'block' },
  'liquidity-ledger':      { component: AnalyticsSnapshot, mode: 'block' },
  'epidemic-surveillance': { component: ZoneHeatmap, mode: 'block' },
  'property-market-heatmap': { component: ZoneHeatmap, mode: 'block' },
  
  // --- Domain 12-19 Expansion ---
  'learning-progress-tracker': { component: AnalyticsSnapshot, mode: 'block' },
  'live-auction-bidding':      { component: AnalyticsSnapshot, mode: 'block' },
  'work-order-dispatcher':     { component: TaskChecklist, mode: 'block' },
  'vehicle-marketplace-listing':{ component: AnalyticsSnapshot, mode: 'block' },
  'smart-home-hub':            { component: AnalyticsSnapshot, mode: 'block' },
  'incident-command-map':      { component: ZoneHeatmap, mode: 'block' },
  'fediverse-feed':            { component: TaskChecklist, mode: 'block' },
  'neighborhood-pulse':        { component: ZoneHeatmap, mode: 'block' },
  'virtual-classroom':         { component: AnalyticsSnapshot, mode: 'block' },
  'ehr-patient-record':        { component: TaskChecklist, mode: 'block' },
  'vod-creator-studio':        { component: AnalyticsSnapshot, mode: 'block' },
};
