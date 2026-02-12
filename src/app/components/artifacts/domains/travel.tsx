import { Plane, Hotel, Coins, MapPin, Calendar, Clock, CreditCard } from 'lucide-react';
import { Button } from '../../ui/button';
import { Separator } from '../../ui/separator';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// 1. Flight Boarding Pass (Block)
export function FlightBoardingPass({ data }: { data: any }) {
    return (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden w-full max-w-full shadow-sm">
            <div className="bg-stone-900 p-4 text-white">
                <div className="flex justify-between items-center mb-4">
                     <span className="text-xs font-bold tracking-widest text-stone-400">BOARDING PASS</span>
                     <Plane className="w-4 h-4 text-stone-400" />
                </div>
                <div className="flex justify-between items-end">
                     <div>
                         <div className="text-2xl sm:text-3xl font-mono font-bold">{data.origin}</div>
                         <div className="text-[10px] text-stone-400 max-w-[80px] truncate">{data.originCity}</div>
                     </div>
                     <div className="flex-1 px-2 sm:px-4 pb-2 relative min-w-[60px]">
                         <div className="h-px bg-stone-700 w-full relative">
                             <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 w-3 h-3 bg-stone-900 border border-stone-600 rounded-full flex items-center justify-center">
                                 <div className="w-1 h-1 bg-stone-400 rounded-full"></div>
                             </div>
                         </div>
                         <div className="text-[9px] text-stone-500 text-center mt-1 truncate">{data.duration}</div>
                     </div>
                     <div className="text-right">
                         <div className="text-2xl sm:text-3xl font-mono font-bold">{data.dest}</div>
                         <div className="text-[10px] text-stone-400 max-w-[80px] truncate ml-auto">{data.destCity}</div>
                     </div>
                </div>
            </div>

            <div className="p-4 grid grid-cols-3 gap-2 sm:gap-4 border-b border-stone-100 border-dashed relative">
                 <div className="absolute -left-2 bottom-0 translate-y-1/2 w-4 h-4 bg-stone-50 rounded-full border border-stone-200 z-10"></div>
                 <div className="absolute -right-2 bottom-0 translate-y-1/2 w-4 h-4 bg-stone-50 rounded-full border border-stone-200 z-10"></div>
                 
                 <div>
                     <span className="text-[10px] text-stone-400 uppercase block mb-0.5">Flight</span>
                     <span className="text-sm font-bold text-stone-900 truncate block">{data.flightNo}</span>
                 </div>
                 <div>
                     <span className="text-[10px] text-stone-400 uppercase block mb-0.5">Gate</span>
                     <span className="text-sm font-bold text-stone-900 truncate block">{data.gate}</span>
                 </div>
                 <div className="text-right">
                     <span className="text-[10px] text-stone-400 uppercase block mb-0.5">Seat</span>
                     <span className="text-sm font-bold text-stone-900 truncate block">{data.seat}</span>
                 </div>
            </div>

            <div className="p-4 flex justify-between items-center bg-stone-50">
                 <div>
                     <span className="text-[10px] text-stone-400 uppercase block mb-0.5">Boarding Time</span>
                     <span className="text-sm font-bold text-stone-900">{data.boardingTime}</span>
                 </div>
                 <div className="bg-white p-1 rounded border border-stone-200">
                     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" className="w-10 h-10 opacity-80" alt="QR" />
                 </div>
            </div>
        </div>
    );
}

// 2. Hotel Concierge (Inline)
export function HotelConcierge({ data, onAction }: { data: any } & ActionProps) {
    return (
        <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-xs">
             <div className="flex items-center gap-2 mb-3">
                 <div className="p-1.5 bg-indigo-50 rounded-lg text-indigo-600">
                     <Hotel className="w-4 h-4" />
                 </div>
                 <div>
                     <h4 className="text-xs font-bold text-stone-900">Room {data.roomNumber}</h4>
                     <p className="text-[10px] text-stone-500">Concierge Services</p>
                 </div>
             </div>

             <div className="grid grid-cols-2 gap-2 mb-2">
                 {['Towels', 'Cleaning', 'Room Service', 'Late Checkout'].map(item => (
                     <Button key={item} variant="outline" size="sm" className="h-8 text-[10px] font-normal justify-start px-2 bg-stone-50" onClick={() => onAction?.('request_service', { item })}>
                         {item}
                     </Button>
                 ))}
             </div>
        </div>
    );
}

// 3. Currency Converter (Inline)
export function CurrencyConverter({ data }: { data: any }) {
    return (
        <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-xs shadow-sm">
             <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900">
                     <Coins className="w-3.5 h-3.5 text-amber-500" />
                     Converter
                 </div>
                 <span className="text-[9px] text-stone-400">Live Rates</span>
             </div>
             
             <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-lg mb-1">
                 <span className="text-lg font-bold text-stone-900">1</span>
                 <span className="text-xs font-bold text-stone-500">{data.from}</span>
                 <span className="flex-1 border-b border-stone-200 border-dashed mx-2"></span>
                 <span className="text-lg font-bold text-stone-900">{data.rate}</span>
                 <span className="text-xs font-bold text-stone-500">{data.to}</span>
             </div>
             
             <p className="text-[9px] text-stone-400 text-center">Updated: {new Date().toLocaleTimeString()}</p>
        </div>
    );
}
