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
import { ARTIFACT_REGISTRY } from './artifact-registry';
import type { Artifact, POI, Ticket, OrderStatus, Product, ServiceItem, AnalyticsData, MediaItem, Event, Ambassador } from '../../types/copilot';

interface MessageArtifactsProps {
  artifacts: Artifact[];
  onAction?: (action: string, payload?: any) => void;
  onShowDetails?: (item: POI | Ticket | OrderStatus | Product | ServiceItem | AnalyticsData | MediaItem | Event | Ambassador) => void;
}

export function MessageArtifacts({ artifacts, onAction, onShowDetails }: MessageArtifactsProps) {
  return (
    <>
      {artifacts.map((artifact, index) => {
        const config = ARTIFACT_REGISTRY[artifact.type];
        
        if (!config) {
          console.warn(`Unknown artifact type: ${artifact.type}`);
          return null;
        }

        const Component = config.component;

        return (
          <Component 
            key={index} 
            data={artifact.data} 
            onAction={onAction} 
            onShowDetails={onShowDetails}
            onClick={(action: any) => {
                // Compatibility shim for older components that use onClick instead of onAction
                if (typeof action === 'string' && onAction) onAction(action, artifact.data);
                else if (onShowDetails && artifact.data.result?.details) onShowDetails(artifact.data.result.details);
            }}
          />
        );
      })}
    </>
  );
}