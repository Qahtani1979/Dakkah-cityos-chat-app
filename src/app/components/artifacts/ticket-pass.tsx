import { Ticket as TicketIcon, MapPin, Calendar, QrCode } from 'lucide-react';
import { Card } from '../ui/card';
import { Separator } from '../ui/separator';
import type { Ticket } from '../../types/copilot';

interface TicketPassProps {
  data: Ticket;
  onClick?: () => void;
}

export function TicketPass({ data, onClick }: TicketPassProps) {
  return (
    <div 
      className="relative w-full max-w-xs mx-auto filter drop-shadow-md cursor-pointer transition-transform hover:scale-[1.02]"
      onClick={onClick}
    >
      <div className="bg-white rounded-2xl overflow-hidden flex flex-col relative">
        {/* Header Image */}
        <div className="h-32 relative">
          <img src={data.image} alt={data.eventName} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h3 className="text-white font-bold text-xl text-center px-4">{data.eventName}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-xs text-stone-400 uppercase tracking-wider">Date</span>
              <div className="flex items-center gap-2 font-semibold text-stone-800">
                <Calendar className="w-4 h-4 text-stone-500" /> {data.date}
              </div>
            </div>
            <div className="space-y-1 text-right">
              <span className="text-xs text-stone-400 uppercase tracking-wider">Time</span>
              <div className="font-semibold text-stone-800">{data.time}</div>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-stone-400 uppercase tracking-wider">Location</span>
            <div className="flex items-center gap-2 font-medium text-stone-700">
              <MapPin className="w-4 h-4 text-stone-500" /> {data.location}
            </div>
          </div>

          <div className="bg-stone-50 rounded-lg p-3 flex justify-between items-center border border-dashed border-stone-200">
             <div className="space-y-0.5">
               <span className="text-[10px] text-stone-400 uppercase">Seat</span>
               <div className="text-lg font-bold text-stone-900">{data.seat}</div>
             </div>
             <div className="h-10 w-10 bg-white p-1 rounded-md">
                <QrCode className="w-full h-full text-stone-900" />
             </div>
          </div>
        </div>

        {/* Perforated Bottom Effect (Visual) */}
        <div className="absolute -bottom-2 left-0 w-full h-4 bg-transparent bg-[radial-gradient(circle,transparent_50%,white_50%)] bg-[length:10px_20px] bg-repeat-x rotate-180"></div>
      </div>
    </div>
  );
}
