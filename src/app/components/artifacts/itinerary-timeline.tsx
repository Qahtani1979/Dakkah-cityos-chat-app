import { Clock, MapPin, Navigation } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import type { ItineraryBlock } from '../../types/copilot';

interface ItineraryTimelineProps {
  data: {
    title: string;
    days?: {
      day: string;
      blocks: ItineraryBlock[];
    }[];
    blocks?: ItineraryBlock[]; // Support flat structure
  };
}

const typeColors = {
  experience: 'bg-rose-50 border-rose-100 text-rose-700',
  transit: 'bg-sky-50 border-sky-100 text-sky-700',
  meal: 'bg-orange-50 border-orange-100 text-orange-700',
  rest: 'bg-stone-50 border-stone-200 text-stone-600',
};

const typeIcons = {
  experience: '🎭',
  transit: '🚗',
  meal: '🍽️',
  rest: '☕',
};

export function ItineraryTimeline({ data }: ItineraryTimelineProps) {
  // Normalize data to ensure 'days' array exists
  const days = data.days || (data.blocks ? [{ day: 'Itinerary', blocks: data.blocks }] : []);

  return (
    <Card className="bg-white border-stone-100 p-5 shadow-sm">
      <div className="mb-6">
        <h3 className="text-stone-900 font-semibold mb-1">{data.title}</h3>
        <p className="text-xs text-stone-500">Tap any block to edit or optimize</p>
      </div>

      <div className="space-y-8">
        {days.map((day, dayIndex) => (
          <div key={dayIndex}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-stone-900 flex items-center justify-center text-white text-xs font-medium shadow-sm">
                {dayIndex + 1}
              </div>
              <h4 className="text-stone-700 font-medium">{day.day}</h4>
            </div>

            <div className="space-y-4 pl-4 border-l-2 border-stone-100 ml-4">
              {day.blocks.map((block) => (
                <div key={block.id} className="relative pb-4 last:pb-0">
                  <div className="absolute left-[-21px] top-2 w-4 h-4 rounded-full bg-white border-2 border-stone-300 ring-4 ring-white" />
                  
                  <div className="ml-5">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs text-stone-400 font-mono">{block.time}</span>
                          <Badge variant="outline" className={`text-[10px] font-normal ${typeColors[block.type]}`}>
                            {typeIcons[block.type]} {block.type}
                          </Badge>
                        </div>
                        <h5 className="text-stone-800 text-sm font-medium">{block.title}</h5>
                      </div>
                      <span className="text-xs text-stone-400 flex-shrink-0 bg-stone-50 px-2 py-1 rounded-full">{block.duration}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mb-2">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      <span>{block.location}</span>
                    </div>

                    {block.notes && (
                      <p className="text-xs text-stone-400 italic bg-stone-50 p-2 rounded-lg">{block.notes}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
