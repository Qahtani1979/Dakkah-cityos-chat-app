export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  sender?: {
    name: string;
    avatar?: string;
    isMe?: boolean;
    id?: string;
    role?: 'admin' | 'member' | 'bot'; // Added for profile
    bio?: string; // Added for profile
  };
  content: string;
  timestamp: Date;
  artifacts?: Artifact[];
  mode?: 'suggest' | 'propose' | 'execute';
  reactions?: Record<string, string[]>; // emoji -> userIds
  pinned?: boolean;
  replyTo?: string; // ID of message being replied to
  edited?: boolean; // If message was edited
}

export type ArtifactType = 
  | 'poi-carousel'
  | 'event-carousel'
  | 'ambassador-carousel'
  | 'itinerary-timeline'
  | 'confirmation-card'
  | 'map-view'
  | 'comparison-table'
  | 'progress-card'
  | 'zone-heatmap'
  | 'selection-chips'
  | 'budget-slider'
  | 'analytics-snapshot'
  | 'calendar-selector'
  | 'service-menu'
  | 'ticket-pass'
  | 'order-tracker'
  | 'form-group'
  | 'product-carousel'
  | 'service-menu'
  | 'analytics-snapshot'
  | 'media-player'
  | 'agent-sync-card';

export interface Artifact {
  type: ArtifactType;
  data: any;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  tags?: string[];
  description?: string; // Added for details
  rating?: number; // Added for details
}

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  rating?: number; // Added
  provider?: string; // Added
}

export interface MediaItem {
  id: string;
  title: string;
  artist: string;
  cover: string;
  duration: string;
  type: 'audio' | 'video';
  description?: string;
  streamUrl?: string; // Mock
}

export interface AnalyticsMetric {
   label: string;
   value: string;
   trend?: 'up' | 'down' | 'neutral';
   trendValue?: string;
}

export interface AnalyticsData {
  title: string;
  metrics: AnalyticsMetric[];
  chartImage?: string;
  details?: string; // Full report text
}

export interface POI {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
  distance: string;
  vibe: string[];
  priceRange: string;
  openNow: boolean;
}

export interface Ticket {
  id: string;
  eventName: string;
  date: string;
  time: string;
  seat: string;
  qrCode: string;
  image: string;
  location: string;
}

export interface OrderStatus {
  id: string;
  orderNumber: string;
  status: 'confirmed' | 'preparing' | 'on-the-way' | 'delivered';
  items: string[];
  total: string;
  estimatedTime: string;
}

export interface FormOption {
  id: string;
  label: string;
  value: string;
  price?: string;
}

export interface FormData {
  id: string;
  title: string;
  type: 'checkbox' | 'radio';
  options: FormOption[];
}

export interface Event {
  id: string;
  name: string;
  date: string;
  time: string;
  location: string;
  image: string;
  category: string;
  attendees: number;
  price?: string;
}

export interface Ambassador {
  id: string;
  name: string;
  avatar: string;
  specialty: string[];
  fitScore: number;
  followers: number;
  style: string;
}

export interface ItineraryBlock {
  id: string;
  time: string;
  title: string;
  location: string;
  duration: string;
  type: 'experience' | 'transit' | 'meal' | 'rest';
  notes?: string;
}

export interface ConfirmationAction {
  id: string;
  title: string;
  description: string;
  impact: string;
  riskLevel: 'low' | 'medium' | 'high';
  action: string;
}

export interface ZoneData {
  id: string;
  name: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  factors: {
    vibes: number;
    activity: number;
    safety: number;
    events: number;
  };
}

export interface ComparisonItem {
  name: string;
  values: Record<string, string | number>;
}

// === Context Types ===

export interface Friend {
  id: string;
  name: string;
  status: string;
  activity: string;
  avatar: string;
  time?: string;
}

export interface Agent {
  id: string;
  name: string;
  status: string;
  capabilities: string[];
  avatar: string; // Used for icon mapping usually, or URL
  icon?: any; // internal use
}

export interface UserContext {
  friends: Friend[];
  agents: Agent[];
  agentGroups?: {
    id: string;
    name: string;
    members: number;
  }[];
}

export interface ChatThread {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}
