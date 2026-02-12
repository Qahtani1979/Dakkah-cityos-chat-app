import { Zap, AlertOctagon, FileText, CheckCircle2 } from 'lucide-react';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// 1. Energy Usage Graph (Block)
export function EnergyUsageGraph({ data }: { data: any }) {
    // Fake bar graph
    const bars = [40, 65, 30, 80, 55, 45, 70];
    const max = Math.max(...bars);

    return (
        <div className="bg-white rounded-xl border border-stone-200 p-4 w-full">
             <div className="flex justify-between items-start mb-6">
                 <div>
                     <h4 className="text-sm font-bold text-stone-900">Energy Usage</h4>
                     <p className="text-[10px] text-stone-500">Last 7 Days • {data.total} kWh Total</p>
                 </div>
                 <div className="text-right">
                     <span className="text-sm font-bold text-stone-900">${data.cost}</span>
                     <span className="text-[10px] text-stone-500 block">Est. Bill</span>
                 </div>
             </div>

             <div className="flex items-end justify-between h-24 gap-2">
                 {bars.map((val, i) => (
                     <div key={i} className="flex-1 flex flex-col items-center gap-1 group min-w-0">
                         <div 
                             className="w-full bg-stone-100 rounded-sm hover:bg-emerald-500 transition-colors relative"
                             style={{ height: `${(val / max) * 100}%` }}
                         >
                            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                {val}
                            </div>
                         </div>
                         <span className="text-[9px] text-stone-400 font-mono truncate w-full text-center">D{i+1}</span>
                     </div>
                 ))}
             </div>
        </div>
    );
}

// 2. Bill Pay Widget (Inline)
export function BillPayWidget({ data, onAction }: { data: any } & ActionProps) {
    return (
        <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-xs shadow-sm">
            <div className="flex items-center gap-3 mb-3">
                 <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 font-bold text-xs">
                     {data.providerLogo || "PG&E"}
                 </div>
                 <div className="flex-1">
                     <h4 className="text-xs font-bold text-stone-900">Utility Bill</h4>
                     <p className="text-[10px] text-stone-500">Due {data.dueDate}</p>
                 </div>
                 <div className="text-right">
                     <p className="text-sm font-bold text-stone-900">${data.amount}</p>
                 </div>
            </div>
            <Button className="w-full h-8 text-xs bg-stone-900 text-white" onClick={() => onAction?.('pay_bill', data)}>
                Pay Now
            </Button>
        </div>
    );
}

// 3. Outage Map (Block)
export function OutageMap({ data }: { data: any }) {
    return (
        <div className="bg-stone-900 rounded-xl overflow-hidden w-full max-w-md relative aspect-video">
             {/* Fake Map Background */}
             <div className="absolute inset-0 bg-[#1a1a1a]">
                 <svg className="w-full h-full opacity-10" width="100%" height="100%">
                     <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                         <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="1"/>
                     </pattern>
                     <rect width="100%" height="100%" fill="url(#grid)" />
                 </svg>
             </div>

             {/* Outage Zones */}
             <div className="absolute top-1/4 left-1/3 w-16 h-16 bg-red-500/30 rounded-full blur-xl animate-pulse"></div>
             <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-red-500 rounded-full border border-white shadow-[0_0_10px_rgba(239,68,68,1)]"></div>
             
             <div className="absolute bottom-4 left-4 right-4 bg-stone-800/90 backdrop-blur rounded-lg p-3 border border-stone-700">
                 <div className="flex items-center gap-2 text-white mb-1">
                     <AlertOctagon className="w-4 h-4 text-red-500" />
                     <span className="text-xs font-bold">Power Outage Detected</span>
                 </div>
                 <p className="text-[10px] text-stone-400">Affecting {data.affectedCount} customers in {data.area}. Crew assigned.</p>
                 <div className="mt-2 text-[9px] font-mono text-stone-500">Est. Repair: {data.estRepair}</div>
             </div>
        </div>
    );
}
