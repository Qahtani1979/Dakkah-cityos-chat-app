import { Sprout, CloudRain, ThermometerSun, Leaf, Tractor, Activity } from 'lucide-react';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// 1. Livestock IoT Tracker (Inline)
export function LivestockTracker({ data }: { data: any }) {
    // data: { id: 'COW-1092', temp: 38.5, activity: 'Grazing', steps: 4500, estrus: false }
    return (
        <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-xs shadow-sm">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                         <span className="text-lg">🐄</span>
                    </div>
                    <div>
                        <h4 className="text-xs font-bold text-stone-900">{data.id}</h4>
                        <span className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                            <Activity className="w-3 h-3" /> {data.activity}
                        </span>
                    </div>
                </div>
                <div className="text-right">
                    <div className="flex items-center gap-1 text-xs font-bold text-stone-700">
                        <ThermometerSun className="w-3.5 h-3.5 text-orange-500" />
                        {data.temp}°C
                    </div>
                    <span className="text-[9px] text-stone-400">Normal Range</span>
                </div>
            </div>
            
            <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] text-stone-500">
                    <span>Daily Activity Goal</span>
                    <span>{data.steps} / 8000 steps</span>
                </div>
                <Progress value={(data.steps / 8000) * 100} className="h-1.5 bg-stone-100 [&>div]:bg-amber-500" />
            </div>
        </div>
    );
}

// 2. Precision Crop Map (Block)
export function CropMoistureMap({ data }: { data: any }) {
    // data: { sector: 'Field A', crop: 'Corn', grid: [ [0.8, 0.2, 0.5], [0.9, 0.4, 0.3] ... ] }
    return (
        <div className="bg-stone-900 rounded-xl overflow-hidden w-full max-w-sm border border-stone-800">
            <div className="p-3 bg-stone-950 border-b border-stone-800 flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                    <Sprout className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold">{data.sector} • {data.crop}</span>
                </div>
                <div className="flex gap-2 text-[9px]">
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Wet</span>
                    <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500"></span>Dry</span>
                </div>
            </div>
            
            <div className="p-4 grid grid-cols-4 gap-1 bg-stone-900">
                 {/* Simulated 4x4 Grid based on data.grid or random if missing */}
                 {Array.from({ length: 16 }).map((_, i) => {
                     const moisture = Math.random(); // Simulating data
                     const color = moisture > 0.7 ? 'bg-blue-500' : moisture > 0.4 ? 'bg-emerald-500' : 'bg-amber-500';
                     return (
                         <div key={i} className={`aspect-square rounded-sm ${color} opacity-80 hover:opacity-100 transition-opacity cursor-pointer relative group`}>
                             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 text-white text-[9px] font-bold">
                                 {(moisture * 100).toFixed(0)}%
                             </div>
                         </div>
                     );
                 })}
            </div>
            
            <div className="p-3 bg-stone-900 border-t border-stone-800 text-[10px] text-stone-400 flex justify-between">
                <span className="flex items-center gap-1"><CloudRain className="w-3 h-3" /> Irrigation Scheduled: 04:00 AM</span>
                <span className="text-emerald-500 font-bold">Health: 98%</span>
            </div>
        </div>
    );
}

// 3. Carbon Credit Marketplace (Block)
export function CarbonCreditCard({ data, onAction }: { data: any } & ActionProps) {
    return (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden w-full max-w-sm">
             <div className="relative h-24 bg-emerald-900 overflow-hidden">
                 <div className="absolute inset-0 opacity-30 bg-cover bg-center" style={{ backgroundImage: `url('${data.image || "https://images.unsplash.com/photo-1448375240586-dfd8d395ea6c?auto=format&fit=crop&q=80"}')` }}></div>
                 <div className="absolute bottom-2 left-3 text-white">
                     <h4 className="text-sm font-bold shadow-black drop-shadow-md">Amazon Rainforest Project</h4>
                     <p className="text-[10px] text-emerald-100">Verified by Verra</p>
                 </div>
                 <div className="absolute top-2 right-2 bg-white/10 backdrop-blur text-white text-[9px] px-2 py-0.5 rounded-full border border-white/20">
                     Vintage 2024
                 </div>
             </div>
             
             <div className="p-3">
                 <div className="flex justify-between items-end mb-4">
                     <div>
                         <span className="text-[10px] text-stone-500 uppercase tracking-wider">Current Price</span>
                         <div className="text-xl font-bold text-stone-900 flex items-baseline gap-1">
                             ${data.price} <span className="text-xs text-stone-400 font-normal">/ ton</span>
                         </div>
                     </div>
                     <div className="text-right">
                         <span className={`text-xs font-bold ${data.change > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                             {data.change > 0 ? '+' : ''}{data.change}%
                         </span>
                         <span className="text-[9px] text-stone-400 block">Last 24h</span>
                     </div>
                 </div>
                 
                 <div className="space-y-2">
                     <div className="flex justify-between text-xs border-b border-stone-100 pb-2">
                         <span className="text-stone-500">Available Volume</span>
                         <span className="font-mono font-medium">{data.volume} tCO2e</span>
                     </div>
                     <div className="flex gap-2 pt-1">
                         <Button variant="outline" className="flex-1 h-8 text-xs">View Certs</Button>
                         <Button className="flex-1 h-8 text-xs bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => onAction?.('buy_credits', data)}>
                             Purchase
                         </Button>
                     </div>
                 </div>
             </div>
        </div>
    );
}
