import { useState } from 'react';
import { 
  CheckCircle2, PenTool, Camera, ClipboardList, Navigation, Truck, Star, Wallet, Clock
} from 'lucide-react';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// 3. Proof of Delivery (POD) Pad (Inline)
export function ProofOfDelivery({ data, onAction }: { data: any } & ActionProps) {
  const [signed, setSigned] = useState(false);

  return (
    <div className="bg-stone-50 rounded-xl p-3 border border-stone-200 w-full max-w-xs">
      <div className="flex items-center gap-2 mb-3">
         <CheckCircle2 className="w-4 h-4 text-emerald-600" />
         <span className="text-xs font-bold text-stone-900">Proof of Delivery</span>
      </div>

      <div className="bg-white border border-stone-200 border-dashed rounded-lg h-24 flex flex-col items-center justify-center mb-3 cursor-pointer hover:bg-stone-50 transition-colors" onClick={() => setSigned(true)}>
         {signed ? (
             <div className="w-full h-full flex items-center justify-center">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Signature_sample.svg/1200px-Signature_sample.svg.png" className="h-12 opacity-80" alt="Signed" />
             </div>
         ) : (
             <>
                <PenTool className="w-5 h-5 text-stone-300 mb-1" />
                <span className="text-[10px] text-stone-400">Tap to Sign</span>
             </>
         )}
      </div>

      <div className="flex gap-2">
         <Button variant="outline" size="sm" className="flex-1 h-8 text-[10px]">
             <Camera className="w-3 h-3 mr-1.5" /> Photo
         </Button>
         <Button size="sm" className="flex-1 h-8 text-[10px] bg-stone-900 text-white" disabled={!signed} onClick={() => onAction?.('submit_pod', { id: data.id })}>
             Submit POD
         </Button>
      </div>
    </div>
  );
}

// 9. Driver Manifest (Block)
export function DriverManifest({ data, onAction }: { data: any } & ActionProps) {
  return (
    <div className="bg-stone-50 rounded-xl border border-stone-200 overflow-hidden w-full max-w-sm">
      <div className="bg-white p-3 border-b border-stone-200 flex justify-between items-center">
        <div>
          <h4 className="text-xs font-bold text-stone-900">Run Sheet: {data.shiftId}</h4>
          <p className="text-[10px] text-stone-500">{data.date} • {data.stops?.length} Stops</p>
        </div>
        <div className="bg-stone-100 p-1.5 rounded-md">
          <ClipboardList className="w-4 h-4 text-stone-600" />
        </div>
      </div>

      <div className="divide-y divide-stone-200">
        {data.stops?.map((stop: any, i: number) => {
          const isNext = stop.status === 'pending' && (i === 0 || data.stops[i-1].status === 'completed');
          
          return (
            <div key={stop.id} className={`p-3 flex gap-3 ${isNext ? 'bg-blue-50/50' : 'bg-white'} ${stop.status === 'completed' ? 'opacity-60' : ''}`}>
               <div className="flex flex-col items-center gap-1 pt-1">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${stop.status === 'completed' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : isNext ? 'bg-blue-600 text-white border-blue-600' : 'bg-stone-100 text-stone-500 border-stone-200'}`}>
                    {i + 1}
                  </div>
                  {i !== data.stops.length - 1 && <div className="w-0.5 h-full bg-stone-200 min-h-[20px]"></div>}
               </div>
               
               <div className="flex-1 pb-2">
                 <div className="flex justify-between items-start mb-1">
                   <span className={`text-[10px] px-1.5 rounded uppercase font-bold ${stop.type === 'PICKUP' ? 'bg-amber-100 text-amber-700' : 'bg-purple-100 text-purple-700'}`}>
                     {stop.type}
                   </span>
                   <span className="text-[10px] font-mono text-stone-400">{stop.timeWindow}</span>
                 </div>
                 <h5 className="text-sm font-semibold text-stone-900 mb-0.5">{stop.customer}</h5>
                 <p className="text-xs text-stone-500 truncate">{stop.address}</p>
                 
                 {isNext && (
                   <div className="mt-2 flex gap-2">
                     <Button size="sm" className="h-7 text-[10px] bg-blue-600 text-white hover:bg-blue-700" onClick={() => onAction?.('navigate', stop)}>
                       <Navigation className="w-3 h-3 mr-1" /> Go
                     </Button>
                     <Button size="sm" variant="outline" className="h-7 text-[10px]" onClick={() => onAction?.('mark_arrived', stop)}>
                       Arrived
                     </Button>
                   </div>
                 )}
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 15. Driver Stats Card (Inline)
export function DriverStatsCard({ data }: { data: any }) {
  return (
    <div className="bg-white rounded-xl p-4 border border-stone-200 w-full max-w-sm shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200">
             {data.driverImage ? (
                <img src={data.driverImage} className="w-full h-full rounded-full object-cover" alt="Driver" />
             ) : (
                <Truck className="w-5 h-5 text-stone-500" />
             )}
          </div>
          <div>
            <h4 className="text-sm font-bold text-stone-900">Today's Shift</h4>
            <div className="flex items-center gap-1">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               <span className="text-[10px] text-stone-500 font-medium">Online</span>
            </div>
          </div>
        </div>
        <div className="text-right">
           <div className="flex items-center justify-end gap-1 text-amber-500 font-bold text-sm">
              <Star className="w-3.5 h-3.5 fill-current" /> {data.rating}
           </div>
           <p className="text-[10px] text-stone-400">{data.trips} Trips</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
         <div className="bg-stone-50 rounded-lg p-3 border border-stone-100">
            <div className="flex items-center gap-1.5 text-stone-500 mb-1">
               <Wallet className="w-3.5 h-3.5" />
               <span className="text-[10px] uppercase font-bold">Earnings</span>
            </div>
            <span className="text-xl font-bold text-stone-900">{data.earnings}</span>
         </div>
         <div className="bg-stone-50 rounded-lg p-3 border border-stone-100">
            <div className="flex items-center gap-1.5 text-stone-500 mb-1">
               <Clock className="w-3.5 h-3.5" />
               <span className="text-[10px] uppercase font-bold">Online</span>
            </div>
            <span className="text-xl font-bold text-stone-900">{data.hours}h</span>
         </div>
      </div>
      
      <div className="mt-3">
         <div className="flex justify-between text-[10px] text-stone-500 mb-1">
            <span>Daily Goal</span>
            <span>85%</span>
         </div>
         <Progress value={85} className="h-1.5 bg-stone-100 [&>div]:bg-stone-900" />
      </div>
    </div>
  );
}