import { useState } from 'react';
import { 
  Navigation, Leaf, Thermometer, Activity
} from 'lucide-react';
import { Button } from '../../../ui/button';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// 1. Live Multi-Asset Map (Block)
export function LiveTrackingMap({ data }: { data: any }) {
  return (
    <div className="w-full h-64 bg-stone-100 rounded-xl overflow-hidden relative border border-stone-200">
      {/* Fake Map Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Assets */}
      {data.assets?.map((asset: any, i: number) => (
        <div 
          key={i}
          className="absolute flex flex-col items-center gap-1 transition-all duration-1000"
          style={{ top: `${asset.y}%`, left: `${asset.x}%` }}
        >
          <div className={`p-1.5 rounded-full shadow-md border-2 border-white transform transition-transform ${asset.status === 'delayed' ? 'bg-red-500 text-white' : 'bg-stone-900 text-white'}`} style={{ transform: `rotate(${asset.bearing || 0}deg)` }}>
             <Navigation className="w-3 h-3 fill-current" />
          </div>
          <div className="bg-white/90 backdrop-blur px-1.5 py-0.5 rounded text-[10px] font-bold shadow-sm whitespace-nowrap flex items-center gap-1">
             <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
             {asset.id}
          </div>
        </div>
      ))}

      {/* Route Lines (SVG Overlay) */}
      <svg className="absolute inset-0 pointer-events-none opacity-20">
        <path d="M 50 150 Q 150 50 250 150 T 450 150" fill="none" stroke="black" strokeWidth="2" strokeDasharray="4 4" />
      </svg>
      
      <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded-lg text-[10px] font-mono shadow-sm border border-stone-200">
        <span className="font-bold">{data.assets?.length || 0}</span> Assets Active
      </div>
    </div>
  );
}

// 4. IoT Sensor Dashboard (Inline)
export function IoTSensorDashboard({ data }: { data: any }) {
  return (
    <div className="bg-stone-900 rounded-xl p-3 text-white w-full max-w-xs">
       <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-2">
          <span className="text-xs font-bold text-stone-300">Cold Chain Monitor</span>
          <div className="flex items-center gap-1">
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
             <span className="text-[10px] text-emerald-500 font-mono">LIVE</span>
          </div>
       </div>

       <div className="grid grid-cols-2 gap-2">
          <div className="bg-stone-800 rounded-lg p-2">
             <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                <Thermometer className="w-3 h-3" />
                <span className="text-[10px] uppercase">Temp</span>
             </div>
             <span className="text-lg font-bold">{data.temp}°C</span>
          </div>
          <div className="bg-stone-800 rounded-lg p-2">
             <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                <Activity className="w-3 h-3" />
                <span className="text-[10px] uppercase">Shock</span>
             </div>
             <span className="text-lg font-bold text-emerald-400">OK</span>
          </div>
       </div>
    </div>
  );
}

// 17. Eco-Route Planner (Block)
export function EcoRoutePlanner({ data, onAction }: { data: any } & ActionProps) {
  const [selectedRoute, setSelectedRoute] = useState<string>(data.routes[0].id);

  return (
    <div className="bg-white rounded-xl overflow-hidden w-full max-w-sm border border-stone-200 shadow-sm">
      <div className="bg-stone-50 p-3 border-b border-stone-200 flex justify-between items-center">
        <div>
          <h4 className="text-sm font-bold text-stone-900">Route Optimization</h4>
          <p className="text-[10px] text-stone-500">{data.origin} → {data.destination}</p>
        </div>
        <Leaf className="w-4 h-4 text-emerald-600" />
      </div>

      <div className="p-1 space-y-1">
        {data.routes.map((route: any) => {
           const isSelected = selectedRoute === route.id;
           const isEco = route.type === 'eco';
           
           return (
             <div 
               key={route.id}
               onClick={() => setSelectedRoute(route.id)}
               className={`p-3 rounded-lg border cursor-pointer transition-all ${
                 isSelected 
                   ? 'bg-stone-900 text-white border-stone-900 shadow-md' 
                   : 'bg-white text-stone-600 border-white hover:bg-stone-50 hover:border-stone-200'
               }`}
             >
               <div className="flex justify-between items-start mb-2">
                 <div className="flex items-center gap-2">
                    <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                       isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-900'
                    }`}>
                      {route.label}
                    </span>
                    {isEco && (
                      <span className="flex items-center gap-0.5 text-[10px] text-emerald-500 font-bold">
                        <Leaf className="w-3 h-3 fill-current" /> BEST CHOICE
                      </span>
                    )}
                 </div>
                 <span className={`text-lg font-bold ${isSelected ? 'text-white' : 'text-stone-900'}`}>
                    {route.duration}
                 </span>
               </div>
               
               <div className="grid grid-cols-3 gap-2 text-[10px] opacity-90">
                  <div>
                    <span className="block opacity-60">Distance</span>
                    <span className="font-mono font-medium">{route.distance}</span>
                  </div>
                  <div>
                    <span className="block opacity-60">CO2 Output</span>
                    <span className={`font-mono font-medium ${isEco ? 'text-emerald-400' : ''}`}>{route.co2}</span>
                  </div>
                  <div>
                    <span className="block opacity-60">Fuel Cost</span>
                    <span className="font-mono font-medium">{route.cost}</span>
                  </div>
               </div>
             </div>
           )
        })}
      </div>
      
      <div className="p-3 border-t border-stone-200 bg-stone-50">
        <Button className="w-full bg-stone-900 text-white h-9" onClick={() => onAction?.('dispatch_route', { routeId: selectedRoute })}>
          <Navigation className="w-3 h-3 mr-2" /> Dispatch Driver
        </Button>
      </div>
    </div>
  );
}