import { useState } from 'react';
import { 
  Package, CheckCircle2, Truck, DoorOpen, Lock, Undo2, Camera, Box, Map
} from 'lucide-react';
import { Button } from '../../../ui/button';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';
import { Switch } from '../../../ui/switch';
import { Textarea } from '../../../ui/textarea';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// 2. Logistics Milestone Timeline (Inline)
export function LogisticsTimeline({ data }: { data: any }) {
  const steps = [
    { id: 'placed', label: 'Order Placed', icon: Package },
    { id: 'warehouse', label: 'Warehouse Exit', icon: BoxIcon },
    { id: 'customs', label: 'Customs Cleared', icon: CheckCircle2 },
    { id: 'delivery', label: 'Out for Delivery', icon: Truck },
  ];

  // Helper for icons
  function BoxIcon(props: any) { return <Package {...props} /> }

  const currentIndex = steps.findIndex(s => s.id === data.currentStage) || 1;

  return (
    <div className="bg-white rounded-xl p-4 border border-stone-200 w-full max-w-sm">
      <div className="flex justify-between items-center mb-4">
         <h4 className="text-xs font-bold text-stone-900">Shipment #{data.id}</h4>
         <span className="text-[10px] bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-medium">In Transit</span>
      </div>
      
      <div className="relative pl-2">
        {/* Vertical Line */}
        <div className="absolute top-2 left-[19px] bottom-2 w-0.5 bg-stone-100"></div>
        
        <div className="space-y-4">
          {steps.map((step, i) => {
             const isCompleted = i <= currentIndex;
             const isCurrent = i === currentIndex;
             const Icon = step.icon;
             
             return (
               <div key={step.id} className="relative flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 border-2 ${isCompleted ? 'bg-stone-900 border-stone-900 text-white' : 'bg-white border-stone-200 text-stone-300'}`}>
                      <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                      <p className={`text-xs font-semibold ${isCompleted ? 'text-stone-900' : 'text-stone-400'}`}>{step.label}</p>
                      {isCurrent && <p className="text-[10px] text-stone-500 mt-0.5">Est. 2:00 PM Today</p>}
                  </div>
               </div>
             )
          })}
        </div>
      </div>
    </div>
  );
}

// 12. Delivery Preferences (Inline)
export function DeliveryPreferences({ data, onAction }: { data: any } & ActionProps) {
  const [preferences, setPreferences] = useState({
    leaveAtDoor: data.leaveAtDoor || false,
    callOnArrival: data.callOnArrival || true,
    gateCode: data.gateCode || '',
    instructions: data.instructions || ''
  });

  return (
    <div className="bg-white rounded-xl p-4 border border-stone-200 w-full max-w-sm">
      <div className="flex items-center gap-2 mb-4">
        <DoorOpen className="w-5 h-5 text-stone-900" />
        <h4 className="text-sm font-bold text-stone-900">Delivery Instructions</h4>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-xs text-stone-900">Leave at Door</Label>
            <p className="text-[10px] text-stone-500">No signature required</p>
          </div>
          <Switch 
            checked={preferences.leaveAtDoor}
            onCheckedChange={(c) => setPreferences({...preferences, leaveAtDoor: c})}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-xs text-stone-900">Call on Arrival</Label>
            <p className="text-[10px] text-stone-500">Driver will phone you</p>
          </div>
          <Switch 
            checked={preferences.callOnArrival}
            onCheckedChange={(c) => setPreferences({...preferences, callOnArrival: c})}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-stone-900">Gate / Access Code</Label>
          <div className="relative">
            <Lock className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-stone-400" />
            <Input 
              className="h-9 pl-8 text-xs bg-stone-50 border-stone-200" 
              placeholder="e.g. #1234"
              value={preferences.gateCode}
              onChange={(e) => setPreferences({...preferences, gateCode: e.target.value})}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label className="text-xs text-stone-900">Note to Driver</Label>
          <Textarea 
            className="text-xs bg-stone-50 border-stone-200 min-h-[60px]" 
            placeholder="e.g. Blue house, beware of dog..."
            value={preferences.instructions}
            onChange={(e) => setPreferences({...preferences, instructions: e.target.value})}
          />
        </div>

        <Button className="w-full h-8 text-xs bg-stone-900 text-white" onClick={() => onAction?.('save_preferences', preferences)}>
          Update Instructions
        </Button>
      </div>
    </div>
  );
}

// 13. Return Request Manager (Block)
export function ReturnRequestManager({ data, onAction }: { data: any } & ActionProps) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  const toggleItem = (id: string) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 w-full max-w-sm overflow-hidden">
      <div className="bg-stone-50 p-3 border-b border-stone-200 flex justify-between items-center">
        <div>
          <h4 className="text-sm font-bold text-stone-900">Create Return</h4>
          <p className="text-[10px] text-stone-500">Order #{data.orderId}</p>
        </div>
        <Undo2 className="w-4 h-4 text-stone-500" />
      </div>

      <div className="p-3 space-y-3">
        <p className="text-xs font-semibold text-stone-900">Select items to return:</p>
        {data.items?.map((item: any) => (
          <div 
            key={item.id} 
            className={`flex gap-3 p-2 rounded-lg border transition-all cursor-pointer ${selectedItems.includes(item.id) ? 'border-stone-900 bg-stone-50' : 'border-stone-100 hover:border-stone-300'}`}
            onClick={() => toggleItem(item.id)}
          >
             <div className="w-12 h-12 bg-white rounded border border-stone-100 flex-shrink-0 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
             </div>
             <div className="flex-1 min-w-0">
                <h5 className="text-xs font-bold text-stone-900 truncate">{item.name}</h5>
                <p className="text-[10px] text-stone-500">{item.variant}</p>
                <p className="text-xs font-semibold mt-1">{item.price}</p>
             </div>
             <div className="flex items-center">
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedItems.includes(item.id) ? 'bg-stone-900 border-stone-900' : 'border-stone-300'}`}>
                   {selectedItems.includes(item.id) && <CheckCircle2 className="w-3 h-3 text-white" />}
                </div>
             </div>
          </div>
        ))}
      </div>

      {selectedItems.length > 0 && (
        <div className="p-3 border-t border-stone-200 bg-stone-50 animate-in slide-in-from-bottom-2">
          <div className="mb-3">
             <Label className="text-xs text-stone-900 mb-1.5 block">Reason for Return</Label>
             <select className="w-full h-8 text-xs rounded border border-stone-300 px-2 bg-white">
               <option>Does not fit</option>
               <option>Damaged item</option>
               <option>Wrong item sent</option>
               <option>Changed mind</option>
             </select>
          </div>
          <div className="flex gap-2">
             <Button variant="outline" className="flex-1 h-8 text-xs">
                <Camera className="w-3 h-3 mr-2" /> Add Photo
             </Button>
             <Button className="flex-1 h-8 text-xs bg-stone-900 text-white" onClick={() => onAction?.('submit_return', { items: selectedItems })}>
                Confirm Return
             </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// 14. Smart Locker Selector (Block)
export function SmartLockerSelector({ data, onAction }: { data: any } & ActionProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="bg-stone-900 rounded-xl p-4 text-white w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold flex items-center gap-2">
             <Box className="w-4 h-4 text-amber-400" /> Nearby Lockers
          </h4>
          <p className="text-[10px] text-stone-400">Select a pickup point</p>
        </div>
        <Map className="w-4 h-4 text-stone-500" />
      </div>

      <div className="space-y-2">
        {data.lockers?.map((locker: any) => {
          const isSelected = selectedId === locker.id;
          const isFull = locker.status === 'Full';
          
          return (
            <div 
              key={locker.id}
              className={`p-3 rounded-lg border transition-all cursor-pointer relative overflow-hidden
                ${isSelected ? 'bg-amber-500/10 border-amber-500' : 'bg-stone-800 border-stone-700 hover:border-stone-600'}
                ${isFull ? 'opacity-50 pointer-events-none' : ''}
              `}
              onClick={() => !isFull && setSelectedId(locker.id)}
            >
              <div className="flex justify-between items-start">
                 <div>
                    <h5 className={`text-xs font-bold ${isSelected ? 'text-amber-400' : 'text-stone-200'}`}>{locker.name}</h5>
                    <p className="text-[10px] text-stone-400 mt-0.5">{locker.distance} • {locker.address}</p>
                 </div>
                 <div className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${isFull ? 'bg-red-900/50 text-red-400' : 'bg-emerald-900/50 text-emerald-400'}`}>
                    {locker.status}
                 </div>
              </div>
              
              {isSelected && (
                <div className="mt-3 flex gap-2">
                   <Button size="sm" className="h-6 text-[10px] bg-amber-500 text-stone-900 hover:bg-amber-400 w-full" onClick={(e) => { e.stopPropagation(); onAction?.('confirm_locker', locker); }}>
                      Confirm Pickup Here
                   </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}