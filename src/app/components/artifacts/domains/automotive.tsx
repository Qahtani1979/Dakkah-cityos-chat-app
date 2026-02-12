import { Zap, Car, Lock, Unlock, Key, QrCode } from 'lucide-react';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// 1. EV Charging Status (Inline)
export function EVChargingStatus({ data }: { data: any }) {
    return (
        <div className="bg-stone-900 rounded-xl p-3 text-white w-full max-w-xs relative overflow-hidden">
             {/* Charging Animation Overlay */}
             {data.isCharging && (
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
             )}

             <div className="flex items-center justify-between mb-4 relative z-10">
                 <div className="flex items-center gap-2">
                     <div className="p-1.5 bg-stone-800 rounded-lg">
                         <Zap className={`w-4 h-4 ${data.isCharging ? 'text-emerald-400 fill-emerald-400' : 'text-stone-400'}`} />
                     </div>
                     <div>
                         <p className="text-xs font-bold text-stone-100">{data.vehicleName}</p>
                         <p className="text-[10px] text-stone-400">{data.isCharging ? 'Charging...' : 'Connected'}</p>
                     </div>
                 </div>
                 <div className="text-right">
                     <p className="text-lg font-bold font-mono text-emerald-400">{data.batteryLevel}%</p>
                 </div>
             </div>
             
             <div className="relative z-10">
                 <Progress value={data.batteryLevel} className="h-1.5 bg-stone-800 [&>div]:bg-emerald-500" />
                 <div className="flex justify-between mt-2 text-[10px] text-stone-400 font-mono">
                     <span>{data.range} mi range</span>
                     <span>{data.timeRemaining} left</span>
                 </div>
             </div>
        </div>
    );
}

// 2. Vehicle Remote (Inline)
export function VehicleRemote({ data, onAction }: { data: any } & ActionProps) {
    return (
        <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-xs">
            <div className="flex items-center justify-between mb-3">
                 <div className="flex items-center gap-2">
                     <div className="w-10 h-10 bg-stone-100 rounded overflow-hidden flex items-center justify-center">
                        {data.image ? (
                             <img src={data.image} alt="Car" className="w-full h-full object-cover" />
                        ) : (
                             <Car className="w-5 h-5 text-stone-500" />
                        )}
                     </div>
                     <div>
                        <span className="text-xs font-bold text-stone-900 block">{data.licensePlate}</span>
                        <span className="text-[10px] text-stone-500">{data.model || 'Vehicle'}</span>
                     </div>
                 </div>
                 <div className="flex items-center gap-1">
                     <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                     <span className="text-[10px] text-stone-400">Online</span>
                 </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="h-12 flex flex-col items-center justify-center gap-1" onClick={() => onAction?.('toggle_lock', { id: data.id, locked: !data.locked })}>
                    {data.locked ? <Lock className="w-4 h-4 text-stone-600" /> : <Unlock className="w-4 h-4 text-amber-600" />}
                    <span className="text-[9px] text-stone-500 font-normal">{data.locked ? 'Unlock' : 'Lock'}</span>
                </Button>
                
                <Button variant="outline" className="h-12 flex flex-col items-center justify-center gap-1" onClick={() => onAction?.('start_engine', data)}>
                    <Zap className="w-4 h-4 text-stone-600" />
                    <span className="text-[9px] text-stone-500 font-normal">Start</span>
                </Button>
            </div>
        </div>
    );
}

// 3. Toll Pass (Inline)
export function TollPass({ data }: { data: any }) {
    return (
        <div className="bg-white rounded-xl border border-stone-200 w-full max-w-xs overflow-hidden flex flex-col">
            <div className="bg-orange-500 p-2 flex justify-center items-center">
                 <span className="text-white text-[10px] font-bold tracking-widest uppercase">FastPass Highway</span>
            </div>
            <div className="p-4 flex flex-col items-center gap-3 bg-stone-50">
                 <div className="p-2 bg-white rounded border border-stone-200 shadow-sm">
                     <QrCode className="w-20 h-20 text-stone-900" />
                 </div>
                 <div className="text-center">
                     <p className="text-xs font-bold text-stone-900">{data.id}</p>
                     <p className="text-[10px] text-stone-500">Scan at Gantry</p>
                 </div>
            </div>
        </div>
    );
}
