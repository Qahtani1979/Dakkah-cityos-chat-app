import { useState } from 'react';
import { 
  Heart, Activity, Moon, Home, Thermometer, Lock, Unlock, Lightbulb, 
  Car, Clock, Box, QrCode, Calendar, Users, Utensils, Wallet, 
  Bitcoin, TrendingUp, CheckSquare, Mic, Play, Pause 
} from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Switch } from '../ui/switch';

// --- Types ---

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// --- 9. Health Snapshot (Apple Health Style) ---

export function HealthSnapshot({ data }: { data: any }) {
  return (
    <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-xs shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
          <Heart className="w-3.5 h-3.5" />
        </div>
        <span className="text-xs font-bold text-stone-900">Health Summary</span>
        <span className="ml-auto text-[10px] text-stone-400">Today</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-stone-50 rounded-lg p-2">
           <div className="flex items-center gap-1.5 text-rose-600 mb-1">
              <Activity className="w-3 h-3" />
              <span className="text-[10px] font-medium uppercase">Steps</span>
           </div>
           <p className="text-lg font-bold text-stone-900">{data.steps?.toLocaleString() || "8,432"}</p>
        </div>
        <div className="bg-stone-50 rounded-lg p-2">
           <div className="flex items-center gap-1.5 text-indigo-600 mb-1">
              <Moon className="w-3 h-3" />
              <span className="text-[10px] font-medium uppercase">Sleep</span>
           </div>
           <p className="text-lg font-bold text-stone-900">{data.sleep || "7h 12m"}</p>
        </div>
      </div>
    </div>
  );
}

// --- 10. Smart Home Control ---

export function SmartHomeControl({ data, onAction }: { data: any } & ActionProps) {
  const [locked, setLocked] = useState(data.isLocked ?? true);
  const [lights, setLights] = useState(data.lightsOn ?? false);

  return (
    <div className="bg-stone-900 rounded-xl p-4 w-full max-w-xs text-white shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <Home className="w-4 h-4 text-stone-400" />
        <span className="text-xs font-bold">{data.roomName || "Living Room"}</span>
      </div>
      
      <div className="space-y-4">
        {/* Thermostat */}
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center">
                    <Thermometer className="w-4 h-4 text-amber-500" />
                </div>
                <div>
                    <p className="text-xs font-medium">Temp</p>
                    <p className="text-[10px] text-stone-400">Heating to 72°</p>
                </div>
            </div>
            <span className="text-xl font-bold">70°</span>
        </div>

        {/* Lock */}
        <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${locked ? 'bg-emerald-900/50 text-emerald-500' : 'bg-rose-900/50 text-rose-500'}`}>
                    {locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </div>
                <p className="text-xs font-medium">Door Lock</p>
            </div>
            <Switch checked={locked} onCheckedChange={(c) => { setLocked(c); onAction?.('toggle_lock', c); }} className="scale-75" />
        </div>

         {/* Lights */}
         <div className="flex items-center justify-between">
             <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${lights ? 'bg-amber-100 text-amber-500' : 'bg-stone-800 text-stone-500'}`}>
                    <Lightbulb className="w-4 h-4" />
                </div>
                <p className="text-xs font-medium">Lights</p>
            </div>
            <Switch checked={lights} onCheckedChange={(c) => { setLights(c); onAction?.('toggle_lights', c); }} className="scale-75" />
        </div>
      </div>
    </div>
  );
}

// --- 11. Parking Meter ---

export function ParkingMeter({ data, onAction }: { data: any } & ActionProps) {
  return (
    <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-xs relative overflow-hidden">
      {/* Progress Circle visual hack using conic gradient would be complex here, simplifying to bar */}
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
            <div className="bg-blue-50 text-blue-600 p-1.5 rounded-lg">
                <Car className="w-4 h-4" />
            </div>
            <div>
                <p className="text-xs font-bold text-stone-900">Zone {data.zone || "4A"}</p>
                <p className="text-[10px] text-stone-500">{data.location}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="text-lg font-mono font-bold text-stone-900">{data.timeLeft || "00:14"}</p>
            <p className="text-[10px] text-rose-500 font-medium">Expiring soon</p>
        </div>
      </div>
      
      <Progress value={85} className="h-1.5 mb-3 bg-stone-100" />
      
      <Button 
        className="w-full h-8 text-xs bg-stone-900 text-white"
        onClick={() => onAction?.('extend_parking', data.id)}
      >
        Extend (+15m)
      </Button>
    </div>
  );
}

// --- 12. Parcel Locker ---

export function ParcelLocker({ data }: { data: any }) {
  return (
    <div className="bg-stone-50 rounded-xl border border-stone-200 w-full max-w-xs overflow-hidden">
      <div className="p-3 border-b border-stone-100 flex justify-between items-center bg-white">
         <div className="flex items-center gap-2">
            <Box className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold text-stone-900">Ready for Pickup</span>
         </div>
         <span className="text-[10px] text-stone-400">Amazon Hub</span>
      </div>
      
      <div className="p-4 flex flex-col items-center justify-center text-center">
         <div className="bg-white p-2 rounded-lg border border-stone-200 mb-3 shadow-sm">
             <QrCode className="w-24 h-24 text-stone-900" />
         </div>
         <p className="text-[10px] text-stone-500 mb-1">Pickup Code</p>
         <p className="text-2xl font-mono font-bold text-stone-900 tracking-widest">{data.code || "892 103"}</p>
         <p className="text-[10px] text-stone-400 mt-2">Locker {data.lockerNumber} • Expires tomorrow</p>
      </div>
    </div>
  );
}

// --- 13. Reservation Card ---

export function ReservationCard({ data, onAction }: { data: any } & ActionProps) {
  return (
    <div className="bg-white rounded-xl p-0 border border-stone-200 w-full max-w-xs flex overflow-hidden">
       {/* Date Left Side */}
       <div className="bg-stone-50 border-r border-stone-100 p-3 flex flex-col items-center justify-center min-w-[70px]">
           <span className="text-[10px] font-bold text-stone-500 uppercase">{data.month || "OCT"}</span>
           <span className="text-2xl font-bold text-stone-900">{data.day || "24"}</span>
           <span className="text-[10px] text-stone-400">{data.weekday || "Fri"}</span>
       </div>
       
       <div className="p-3 flex-1">
           <h4 className="text-sm font-bold text-stone-900 mb-1">{data.placeName}</h4>
           <div className="flex items-center gap-3 mb-3">
               <div className="flex items-center gap-1 text-[11px] text-stone-600">
                   <Clock className="w-3 h-3" />
                   {data.time}
               </div>
               <div className="flex items-center gap-1 text-[11px] text-stone-600">
                   <Users className="w-3 h-3" />
                   {data.guests} ppl
               </div>
           </div>
           
           <div className="flex gap-2">
               <Button size="sm" variant="outline" className="h-7 text-[10px] flex-1" onClick={() => onAction?.('modify_reservation', data.id)}>
                   Modify
               </Button>
               <Button size="sm" className="h-7 text-[10px] flex-1 bg-black text-white" onClick={() => onAction?.('get_directions', data.id)}>
                   Directions
               </Button>
           </div>
       </div>
    </div>
  );
}

// --- 14. Crypto / Wallet Card ---

export function CryptoWallet({ data }: { data: any }) {
  const isUp = (data.change || 0) > 0;
  return (
    <div className="bg-stone-900 rounded-xl p-3 border border-stone-800 w-full max-w-xs text-white">
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
                    <Bitcoin className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-medium text-stone-300">{data.asset || "Bitcoin"}</span>
            </div>
            <div className={`flex items-center gap-1 text-[10px] font-bold px-1.5 py-0.5 rounded ${isUp ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                {isUp ? '+' : ''}{data.change}%
                <TrendingUp className={`w-3 h-3 ${!isUp && 'rotate-180'}`} />
            </div>
        </div>
        
        <div className="mb-1">
            <span className="text-2xl font-bold">${data.balance?.toLocaleString()}</span>
        </div>
        <p className="text-[10px] text-stone-500">{data.amount} BTC Available</p>
    </div>
  );
}

// --- 15. Task Checklist ---

export function TaskChecklist({ data, onAction }: { data: any } & ActionProps) {
  const [tasks, setTasks] = useState(data.tasks || []);

  const toggleTask = (id: string) => {
    const newTasks = tasks.map((t: any) => 
        t.id === id ? { ...t, completed: !t.completed } : t
    );
    setTasks(newTasks);
    onAction?.('update_tasks', newTasks);
  };

  return (
    <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-xs">
        <div className="flex items-center gap-2 mb-3 pb-2 border-b border-stone-100">
            <CheckSquare className="w-4 h-4 text-stone-400" />
            <span className="text-xs font-bold text-stone-900">{data.title || "To Do"}</span>
        </div>
        
        <div className="space-y-2">
            {tasks.map((task: any) => (
                <div 
                    key={task.id} 
                    className="flex items-start gap-2 group cursor-pointer"
                    onClick={() => toggleTask(task.id)}
                >
                    <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition-colors ${task.completed ? 'bg-blue-500 border-blue-500 text-white' : 'bg-white border-stone-300 group-hover:border-blue-300'}`}>
                        {task.completed && <CheckSquare className="w-3 h-3" />}
                    </div>
                    <span className={`text-xs transition-colors ${task.completed ? 'text-stone-400 line-through' : 'text-stone-700'}`}>
                        {task.label}
                    </span>
                </div>
            ))}
        </div>
    </div>
  );
}

// --- 16. Voice Note ---

export function VoiceNote({ data }: { data: any }) {
  const [playing, setPlaying] = useState(false);
  
  return (
    <div className="bg-stone-100 rounded-full p-1.5 pr-4 flex items-center gap-3 w-fit border border-stone-200">
        <Button 
            size="icon" 
            className="w-8 h-8 rounded-full bg-stone-900 text-white hover:bg-stone-800"
            onClick={() => setPlaying(!playing)}
        >
            {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
        </Button>
        
        <div className="flex gap-0.5 items-center h-6">
            {/* Fake waveform visualization */}
            {[4, 8, 5, 10, 14, 8, 6, 12, 16, 10, 4, 8, 3, 7, 12, 5].map((h, i) => (
                <div 
                    key={i} 
                    className={`w-0.5 rounded-full transition-all duration-300 ${playing ? 'bg-stone-800 animate-pulse' : 'bg-stone-400'}`}
                    style={{ height: `${h + 4}px` }} 
                />
            ))}
        </div>
        
        <span className="text-[10px] font-mono font-medium text-stone-500">{data.duration || "0:24"}</span>
    </div>
  );
}
