import { 
  Truck, Wrench, Fuel, Zap, AlertTriangle
} from 'lucide-react';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

function DiscIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
}

// 5. Fleet Maintenance Card (Inline)
export function FleetMaintenanceCard({ data, onAction }: { data: any } & ActionProps) {
    // data: { vehicleId: 'TRK-99', fuel: 45, tires: 90, serviceDue: '2024-02-01', vehicleImage: '...' }
    return (
        <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-xs">
             <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center gap-2">
                     <div className="w-10 h-10 bg-stone-100 rounded overflow-hidden flex-shrink-0 flex items-center justify-center">
                         {data.vehicleImage ? (
                             <img src={data.vehicleImage} alt="Vehicle" className="w-full h-full object-cover" />
                         ) : (
                             <Truck className="w-5 h-5 text-stone-600" />
                         )}
                     </div>
                     <div>
                         <h4 className="text-xs font-bold text-stone-900">{data.vehicleId}</h4>
                         <span className="text-[10px] text-stone-500">Service Due: {data.serviceDue}</span>
                     </div>
                 </div>
                 <Button variant="ghost" size="icon" className="h-6 w-6 text-stone-400" onClick={() => onAction?.('schedule_service', data)}>
                     <Wrench className="w-3.5 h-3.5" />
                 </Button>
             </div>

             <div className="space-y-3">
                 <div className="space-y-1">
                     <div className="flex justify-between text-[10px] font-medium text-stone-600">
                         <span className="flex items-center gap-1"><Fuel className="w-3 h-3" /> Fuel Level</span>
                         <span className={data.fuel < 20 ? 'text-red-500' : 'text-stone-900'}>{data.fuel}%</span>
                     </div>
                     <Progress value={data.fuel} className={`h-1.5 bg-stone-100 ${data.fuel < 20 ? '[&>div]:bg-red-500' : '[&>div]:bg-stone-900'}`} />
                 </div>
                 
                 <div className="space-y-1">
                     <div className="flex justify-between text-[10px] font-medium text-stone-600">
                         <span className="flex items-center gap-1"><DiscIcon className="w-3 h-3" /> Tire Health</span>
                         <span className="text-stone-900">{data.tires}%</span>
                     </div>
                     <Progress value={data.tires} className="h-1.5 bg-stone-100 [&>div]:bg-emerald-500" />
                 </div>
             </div>
        </div>
    );
}

// 21. Fuel & Energy Analytics (Block)
export function FuelEnergyAnalytics({ data, onAction }: { data: any } & ActionProps) {
  const isEV = data.fuelType === 'Electric';
  
  return (
    <div className="bg-stone-900 rounded-xl p-4 text-white w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
         <div className="flex items-center gap-2">
            {isEV ? <Zap className="w-5 h-5 text-yellow-400" /> : <Fuel className="w-5 h-5 text-amber-500" />}
            <h4 className="text-sm font-bold">{isEV ? 'Energy' : 'Fuel'} Analytics</h4>
         </div>
         <span className="text-[10px] bg-stone-800 px-2 py-0.5 rounded text-stone-400">
            Last 30 Days
         </span>
      </div>

      <div className="flex items-end gap-1 mb-6">
         <span className="text-3xl font-bold">{data.efficiency}</span>
         <span className="text-xs text-stone-400 mb-1.5 font-mono">{isEV ? 'Wh/mi' : 'MPG'}</span>
         <div className="ml-auto flex flex-col items-end">
            <span className="text-xs text-stone-400">Est. Cost</span>
            <span className="text-sm font-bold text-emerald-400">{data.costPerMile}/mi</span>
         </div>
      </div>

      <div className="space-y-3">
         {/* Spending Trend (Simulated) */}
         <div className="h-16 flex items-end gap-1 pb-1 border-b border-stone-800">
            {[40, 65, 45, 80, 55, 70, 60, 90, 50, 65].map((h, i) => (
               <div key={i} className={`flex-1 rounded-t ${h > 75 ? 'bg-red-500/80' : 'bg-stone-700'}`} style={{ height: `${h}%` }}></div>
            ))}
         </div>

         <div className="bg-stone-800 rounded-lg p-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <AlertTriangle className="w-4 h-4 text-red-500" />
               <div>
                  <h5 className="text-xs font-bold text-stone-200">Potential Fraud</h5>
                  <p className="text-[10px] text-stone-500">Tank capacity exceeded</p>
               </div>
            </div>
            <Button size="sm" className="h-6 text-[10px] bg-red-900/50 text-red-200 border border-red-900" onClick={() => onAction?.('investigate_fuel', { id: data.alertId })}>
               Review
            </Button>
         </div>
      </div>
    </div>
  );
}

// 23. Predictive Fleet Matrix (Block)
export function PredictiveFleetMatrix({ data }: { data: any }) {
  // data.vehicles = [{id, status: 'active'|'maintenance'|'critical', type}]
  return (
    <div className="bg-white rounded-xl p-4 border border-stone-200 w-full max-w-sm shadow-sm">
       <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-stone-900">Fleet Health Matrix</h4>
          <div className="flex gap-2 text-[10px]">
             <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> 92%</span>
             <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500"></span> 4%</span>
          </div>
       </div>

       <div className="grid grid-cols-10 gap-1 mb-4">
          {data.vehicles.map((v: any, i: number) => (
             <div 
               key={i} 
               className={`aspect-square rounded-sm transition-transform hover:scale-125 cursor-pointer
                 ${v.status === 'active' ? 'bg-emerald-100 hover:bg-emerald-500' : 
                   v.status === 'maintenance' ? 'bg-amber-100 hover:bg-amber-500' : 
                   'bg-red-100 hover:bg-red-500'}
               `}
               title={`${v.id} - ${v.status}`}
             />
          ))}
       </div>

       <div className="bg-stone-50 rounded-lg p-3 space-y-2">
          <h5 className="text-xs font-bold text-stone-900">Critical Attention Required</h5>
          {data.criticals.map((v: any) => (
             <div key={v.id} className="flex justify-between items-center text-xs bg-white p-2 rounded border border-stone-100">
                <div className="flex items-center gap-2">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                   <span className="font-mono font-medium">{v.id}</span>
                </div>
                <span className="text-stone-500">{v.issue}</span>
                <span className="font-bold text-stone-900">{v.predictedFailure}</span>
             </div>
          ))}
       </div>
    </div>
  );
}