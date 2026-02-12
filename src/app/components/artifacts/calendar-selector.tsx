import { Calendar as CalendarIcon, Clock, ChevronRight, ChevronLeft } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

interface CalendarSelectorProps {
  data: {
    dates: { date: string; day: string; available: boolean }[];
    timeSlots: string[];
  };
  onAction?: (action: string) => void;
}

export function CalendarSelector({ data, onAction }: CalendarSelectorProps) {
  const dates = data?.dates || [];
  const timeSlots = data?.timeSlots || [];

  return (
    <Card className="w-full max-w-sm bg-white border-stone-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-stone-100 flex justify-between items-center">
        <h3 className="font-semibold text-stone-900 flex items-center gap-2">
          <CalendarIcon className="w-4 h-4" /> Select Date & Time
        </h3>
        <div className="flex gap-1">
          <Button size="icon" variant="ghost" className="h-6 w-6"><ChevronLeft className="w-4 h-4" /></Button>
          <Button size="icon" variant="ghost" className="h-6 w-6"><ChevronRight className="w-4 h-4" /></Button>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Date Strip */}
        <div className="flex justify-between gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {dates.map((d, i) => (
            <button
              key={i}
              disabled={!d.available}
              onClick={() => d.available && onAction?.(`Selected Date: ${d.date}`)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl min-w-[50px] transition-all ${
                i === 1 // Simulate selected
                  ? 'bg-stone-900 text-white shadow-md'
                  : d.available 
                    ? 'bg-stone-50 text-stone-700 hover:bg-stone-100' 
                    : 'bg-stone-50/50 text-stone-300 cursor-not-allowed'
              }`}
            >
              <span className="text-[10px] uppercase font-medium">{d.day}</span>
              <span className="text-lg font-bold">{d.date.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Time Slots */}
        <div className="space-y-2">
          <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">Available Slots</div>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((slot) => (
              <Button
                key={slot}
                variant="outline"
                className="text-xs border-stone-200 hover:border-stone-900 hover:bg-stone-50"
                onClick={() => onAction?.(`Booked for ${slot}`)}
              >
                {slot}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
