import { Calendar, MapPin, Users, Tag } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { imageUrls } from '../../utils/image-urls';
import type { Event, Product, MediaItem } from '../../types/copilot';

interface EventCarouselProps {
  data: {
    events: Event[];
  } | Event[];
  onShowDetails?: (event: Event) => void;
}

export function EventCarousel({ data, onShowDetails }: EventCarouselProps) {
  const events = Array.isArray(data) ? data : data?.events || [];

  return (
    <div className="space-y-2">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {events.map((event) => (
          <Card
            key={event.id}
            className="flex-shrink-0 w-[300px] bg-white border-stone-100 hover:border-stone-200 transition-all cursor-pointer overflow-hidden shadow-sm hover:shadow-md"
            onClick={() => onShowDetails?.(event)}
          >
            <div className="relative h-44 overflow-hidden">
              <img
                src={imageUrls[event.image as keyof typeof imageUrls] || event.image}
                alt={event.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <h3 className="text-white font-semibold leading-tight">{event.name}</h3>
                <Badge className="mt-2 bg-white/90 text-stone-900 border-0 text-[10px] backdrop-blur-sm">
                  <Tag className="w-3 h-3 mr-1 opacity-70" />
                  {event.category}
                </Badge>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                <Calendar className="w-3 h-3 text-stone-400" />
                <span>{event.date} • {event.time}</span>
              </div>
              
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <MapPin className="w-3 h-3 text-stone-400" />
                <span>{event.location}</span>
              </div>

              <div className="flex items-center justify-between pt-3 mt-1 border-t border-stone-100">
                <div className="flex items-center gap-1 text-xs text-stone-500">
                  <Users className="w-3 h-3 text-stone-400" />
                  <span>{event.attendees.toLocaleString()} interested</span>
                </div>
                {event.price && (
                  <span className="text-xs font-medium text-stone-700">{event.price}</span>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
