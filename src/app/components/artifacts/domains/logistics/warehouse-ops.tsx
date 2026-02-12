import { useState } from 'react';
import { 
  Package, LayoutGrid, CalendarClock
} from 'lucide-react';
import { Button } from '../../../ui/button';
import { Label } from '../../../ui/label';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// 6. Warehouse Picker UI (Block)
export function WarehousePickerUI({ data, onAction }: { data: any } & ActionProps) {
    const [items, setItems] = useState<any[]>(data.items || []);

    const toggleItem = (id: string) => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, picked: !item.picked } : item));
    };

    const progress = (items.filter(i => i.picked).length / items.length) * 100;

    return (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden w-full max-w-full flex flex-col h-80">
            <div className="bg-stone-900 p-3 text-white flex justify-between items-center">
                 <div>
                     <h4 className="text-xs font-bold flex items-center gap-2">
                         <Package className="w-4 h-4" /> Picking List
                     </h4>
                     <p className="text-[10px] text-stone-400">Order #{data.orderId}</p>
                 </div>
                 <div className="text-right">
                     <span className="text-lg font-bold">{Math.round(progress)}%</span>
                 </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-2 space-y-2 bg-stone-50">
                {items.map((item) => (
                    <div key={item.id} className={`p-2 rounded-lg border flex gap-3 transition-colors ${item.picked ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-stone-200'}`}>
                        <div className="w-12 h-12 bg-stone-100 rounded flex items-center justify-center flex-shrink-0 overflow-hidden">
                            {item.image ? (
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                                <Package className="w-6 h-6 text-stone-300" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <h5 className={`text-xs font-bold truncate ${item.picked ? 'text-emerald-900' : 'text-stone-900'}`}>{item.sku}</h5>
                                <span className="text-[10px] font-mono text-stone-400">{item.loc}</span>
                            </div>
                            <p className="text-[10px] text-stone-500 mb-1">{item.name}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] bg-stone-100 px-1.5 py-0.5 rounded font-bold">Qty: {item.qty}</span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center">
                             <input 
                                type="checkbox" 
                                checked={item.picked} 
                                onChange={() => toggleItem(item.id)}
                                className="w-5 h-5 accent-emerald-600 rounded cursor-pointer" 
                             />
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="p-2 border-t border-stone-200 bg-white flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 text-[10px] text-red-600 hover:text-red-700 h-8" onClick={() => onAction?.('report_missing', { orderId: data.orderId })}>
                    Report Issue
                </Button>
                <Button size="sm" className="flex-1 text-[10px] bg-stone-900 text-white h-8" disabled={progress < 100} onClick={() => onAction?.('complete_picking', { orderId: data.orderId })}>
                    Complete Order
                </Button>
            </div>
        </div>
    );
}

// 10. Load Balancing Visualizer (Block)
export function LoadBalancingVisualizer({ data }: { data: any }) {
  // data.grid = 2D array representing truck floor: 0=empty, 1=box, 2=heavy, 3=fragile
  return (
    <div className="bg-stone-900 rounded-xl p-4 text-white w-full max-w-sm">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-xs font-bold flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-emerald-400" />
          Load Optimization
        </h4>
        <div className="text-[10px] text-stone-400">Truck: {data.truckType}</div>
      </div>

      <div className="aspect-[3/4] bg-stone-800 rounded-lg border-2 border-stone-700 p-1 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full text-[10px] text-stone-500 pb-1">CABIN</div>
        
        <div className="grid grid-cols-4 grid-rows-6 gap-1 h-full">
          {data.slots?.map((slot: any, i: number) => (
             <div 
               key={i} 
               className={`rounded border flex items-center justify-center text-[10px] font-bold transition-all hover:scale-105
                 ${slot.type === 'empty' ? 'bg-stone-800/50 border-stone-700 border-dashed text-transparent' : 
                   slot.type === 'heavy' ? 'bg-stone-600 border-stone-500 text-stone-300' :
                   slot.type === 'fragile' ? 'bg-red-900/50 border-red-500/50 text-red-200' :
                   'bg-emerald-900/50 border-emerald-500/50 text-emerald-200'}
               `}
             >
               {slot.id || ''}
             </div>
          ))}
        </div>

        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full text-[10px] text-stone-500 pt-1">REAR DOOR</div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-[10px]">
        <div className="flex items-center gap-1.5">
           <div className="w-2 h-2 bg-emerald-900 border border-emerald-500 rounded"></div> Standard
        </div>
        <div className="flex items-center gap-1.5">
           <div className="w-2 h-2 bg-stone-600 border border-stone-500 rounded"></div> Heavy
        </div>
        <div className="flex items-center gap-1.5">
           <div className="w-2 h-2 bg-red-900 border border-red-500 rounded"></div> Fragile
        </div>
      </div>
    </div>
  );
}

// 18. Dock Appointment Scheduler (Block)
export function DockScheduler({ data, onAction }: { data: any } & ActionProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl p-4 border border-stone-200 w-full max-w-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
          <CalendarClock className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-stone-900">Inbound Dock</h4>
          <p className="text-[10px] text-stone-500">{data.warehouseName}</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Bay Selection */}
        <div className="flex gap-2">
          {data.bays.map((bay: any) => (
             <div key={bay.id} className="flex-1 text-center p-2 rounded border border-stone-200 bg-stone-50">
                <p className="text-[10px] text-stone-500 uppercase font-bold">{bay.name}</p>
                <p className="text-xs font-bold text-stone-900">{bay.status}</p>
             </div>
          ))}
        </div>

        {/* Time Grid */}
        <div>
           <Label className="text-xs text-stone-500 mb-2 block">Available Slots ({data.date})</Label>
           <div className="grid grid-cols-3 gap-2">
              {data.slots.map((slot: any) => (
                <button
                  key={slot.time}
                  disabled={!slot.available}
                  onClick={() => setSelectedSlot(slot.time)}
                  className={`py-2 rounded text-xs font-medium transition-all border
                    ${!slot.available ? 'bg-stone-100 text-stone-300 border-transparent cursor-not-allowed' : 
                      selectedSlot === slot.time ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 
                      'bg-white text-stone-900 border-stone-200 hover:border-blue-400'}
                  `}
                >
                  {slot.time}
                </button>
              ))}
           </div>
        </div>
        
        <Button 
          className="w-full bg-stone-900 text-white" 
          disabled={!selectedSlot}
          onClick={() => onAction?.('book_dock', { time: selectedSlot, warehouse: data.warehouseName })}
        >
          Book Appointment
        </Button>
      </div>
    </div>
  );
}