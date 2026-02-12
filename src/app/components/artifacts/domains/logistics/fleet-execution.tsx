import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';
import { ScrollArea } from '../../../ui/scroll-area';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../ui/tabs';
import { 
  Clock, Truck, MapPin, FileCheck, CalendarClock, 
  AlertOctagon, PenTool, Box, ArrowRight, UserCheck,
  History, LayoutGrid
} from 'lucide-react';

// --- 1. ELD & HOS Logbook (The Legal Clock) ---
export const EldComplianceLog = ({ data, onAction }: any) => {
  const [status, setStatus] = useState('driving');

  const statusColors: Record<string, string> = {
    'off': 'bg-stone-100 text-stone-600',
    'sb': 'bg-blue-100 text-blue-700',
    'driving': 'bg-green-100 text-green-700 border-green-200',
    'on': 'bg-amber-100 text-amber-700'
  };

  return (
    <Card className="w-full h-full shadow-sm flex flex-col border-stone-200">
      <CardHeader className="pb-3 border-b border-stone-100 bg-stone-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-indigo-600" />
            <div>
              <CardTitle className="text-base">HOS Compliance</CardTitle>
              <CardDescription className="text-xs">USDOT #199282 • Cycle 70/8</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className={`${statusColors[status]} capitalize`}>
            ● {status === 'sb' ? 'Sleeper Berth' : status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-6">
        {/* The Clocks */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 rounded-xl border-2 border-green-100 bg-green-50/50 flex flex-col items-center justify-center text-center">
             <div className="text-3xl font-bold text-green-700 tabular-nums">{data.driveLeft}</div>
             <div className="text-[10px] font-semibold text-green-800 uppercase tracking-wide">Drive Time Left</div>
             <div className="text-[10px] text-green-600 mt-1">of 11:00 hrs</div>
          </div>
          <div className="p-3 rounded-xl border border-stone-200 bg-white flex flex-col items-center justify-center text-center">
             <div className="text-3xl font-bold text-stone-700 tabular-nums">{data.cycleLeft}</div>
             <div className="text-[10px] font-semibold text-stone-500 uppercase tracking-wide">Cycle Left</div>
             <div className="text-[10px] text-stone-400 mt-1">of 70:00 hrs</div>
          </div>
        </div>

        {/* Status Grid */}
        <div className="space-y-2">
           <h4 className="text-xs font-medium text-stone-500">Change Duty Status</h4>
           <div className="grid grid-cols-4 gap-2">
             {['off', 'sb', 'driving', 'on'].map((s) => (
               <button
                 key={s}
                 onClick={() => setStatus(s)}
                 className={`
                   p-2 rounded-lg text-xs font-bold border transition-all
                   ${status === s 
                     ? 'bg-indigo-600 text-white border-indigo-600 shadow-md transform scale-105' 
                     : 'bg-white text-stone-600 border-stone-200 hover:border-indigo-300 hover:bg-indigo-50'}
                 `}
               >
                 {s === 'sb' ? 'SLEEPER' : s.toUpperCase()}
               </button>
             ))}
           </div>
        </div>

        {/* Recent Violations / Alerts */}
        {data.violations.length > 0 && (
          <div className="p-3 bg-red-50 border border-red-100 rounded-lg flex gap-3">
             <AlertOctagon className="w-5 h-5 text-red-600 shrink-0" />
             <div className="space-y-1">
               <div className="text-xs font-bold text-red-800">Compliance Alert</div>
               {data.violations.map((v: any, i: number) => (
                 <div key={i} className="text-[10px] text-red-700 leading-tight">• {v}</div>
               ))}
             </div>
          </div>
        )}
        
        {/* Graph Grid (Visual Simulation) */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-stone-400 px-1">
             <span>M</span><span>4</span><span>8</span><span>N</span><span>4</span><span>8</span><span>M</span>
          </div>
          <div className="h-12 w-full bg-stone-100 rounded border border-stone-200 relative overflow-hidden">
             {/* Simulated log lines */}
             <div className="absolute top-8 left-0 w-1/4 h-0.5 bg-stone-400"></div> {/* Off */}
             <div className="absolute top-8 left-1/4 w-0.5 h-8 bg-stone-400"></div> {/* Up to Drive */}
             <div className="absolute top-2 left-1/4 w-1/2 h-0.5 bg-green-600"></div> {/* Drive */}
             <div className="absolute top-2 left-3/4 w-0.5 h-4 bg-stone-400"></div> {/* Down to On */}
             <div className="absolute top-6 left-3/4 w-1/4 h-0.5 bg-amber-500"></div> {/* On Duty */}
          </div>
        </div>

      </CardContent>
      
      <CardFooter className="pt-3 border-t bg-stone-50">
         <Button className="w-full h-9 text-xs" variant="outline" onClick={() => onAction('certify')}>
           <UserCheck className="w-3.5 h-3.5 mr-2" /> Certify Logs
         </Button>
      </CardFooter>
    </Card>
  );
};

// --- 2. Yard & Dock Scheduler (Facility Control) ---
export const YardDockScheduler = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-2 border-b border-stone-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-5 h-5 text-stone-600" />
            <div>
              <CardTitle className="text-base">Yard Master</CardTitle>
              <CardDescription className="text-xs">East Gate • 85% Capacity</CardDescription>
            </div>
          </div>
          <div className="flex text-xs bg-stone-100 rounded-md p-1">
             <div className="px-2 py-0.5 bg-white shadow-sm rounded text-stone-900 font-medium">Inbound</div>
             <div className="px-2 py-0.5 text-stone-500">Outbound</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        
        {/* Dock Visualization */}
        <div className="grid grid-cols-4 gap-2">
           {data.docks.map((dock: any) => (
             <div 
               key={dock.id}
               className={`
                 aspect-[3/4] rounded-lg border-2 flex flex-col items-center p-2 relative
                 ${dock.status === 'open' ? 'border-dashed border-stone-200 bg-stone-50' : ''}
                 ${dock.status === 'occupied' ? 'border-solid border-blue-200 bg-blue-50' : ''}
                 ${dock.status === 'blocked' ? 'border-solid border-red-200 bg-red-50' : ''}
               `}
             >
               <div className="text-[10px] font-bold text-stone-400 absolute top-1 left-1">D{dock.id}</div>
               {dock.status === 'open' && <span className="text-xs text-stone-400 mt-4">Open</span>}
               {dock.status === 'occupied' && (
                 <>
                   <Truck className="w-8 h-8 text-blue-600 mt-2" />
                   <div className="text-[10px] font-bold text-blue-900 mt-auto">{dock.truckId}</div>
                   <div className="text-[9px] text-blue-600">{dock.carrier}</div>
                 </>
               )}
             </div>
           ))}
        </div>

        {/* Appointment List */}
        <div className="space-y-2">
           <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Gate Check-In Queue</h4>
           {data.queue.map((truck: any) => (
             <div key={truck.id} className="flex items-center justify-between p-2 rounded-lg border border-stone-200 bg-white hover:bg-stone-50">
               <div className="flex items-center gap-3">
                 <div className={`w-1.5 h-8 rounded-full ${truck.late ? 'bg-red-500' : 'bg-green-500'}`} />
                 <div>
                   <div className="text-sm font-medium text-stone-900">{truck.carrier}</div>
                   <div className="text-xs text-stone-500">Appt: {truck.time}</div>
                 </div>
               </div>
               <Button size="sm" variant="ghost" className="h-7 text-xs border border-stone-200" onClick={() => onAction('assign_dock', truck.id)}>
                 Assign
               </Button>
             </div>
           ))}
        </div>

      </CardContent>
    </Card>
  );
};

// --- 3. Digital POD & Manifest (The Money) ---
export const DigitalPodManifest = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 bg-stone-900 text-white rounded-t-xl">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-base text-white">Delivery Manifest</CardTitle>
            <CardDescription className="text-stone-400 text-xs">Load #{data.loadId} • {data.stops} Stops</CardDescription>
          </div>
          <div className="text-right">
             <div className="text-lg font-bold">{data.completion}%</div>
             <div className="text-[10px] text-stone-400">Complete</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-0 p-0">
        
        {/* Current Stop (Highlighted) */}
        {data.currentStop && (
          <div className="p-4 bg-blue-50 border-b border-blue-100">
            <div className="flex justify-between items-center mb-2">
               <Badge className="bg-blue-600 hover:bg-blue-700">Current Stop</Badge>
               <span className="text-xs font-mono text-blue-800">{data.currentStop.distance} away</span>
            </div>
            <h3 className="font-bold text-lg text-stone-900">{data.currentStop.customer}</h3>
            <div className="flex items-center text-sm text-stone-600 mt-1 mb-3">
               <MapPin className="w-4 h-4 mr-1 text-blue-500" />
               {data.currentStop.address}
            </div>
            
            <div className="bg-white rounded-lg p-3 border border-blue-200 space-y-3">
               <div className="flex justify-between text-xs text-stone-500 border-b pb-2">
                 <span>Items: {data.currentStop.items} plts</span>
                 <span>Ref: {data.currentStop.ref}</span>
               </div>
               <Button className="w-full bg-blue-600 hover:bg-blue-700 h-10 gap-2" onClick={() => onAction('capture_pod')}>
                 <PenTool className="w-4 h-4" /> Capture Signature
               </Button>
            </div>
          </div>
        )}

        {/* Upcoming Stops */}
        <div className="p-4 space-y-4">
           <h4 className="text-xs font-semibold text-stone-500 uppercase">Up Next</h4>
           {data.upcoming.map((stop: any, idx: number) => (
             <div key={idx} className="flex gap-4 opacity-70 hover:opacity-100 transition-opacity">
               <div className="flex flex-col items-center">
                 <div className="w-6 h-6 rounded-full border-2 border-stone-300 flex items-center justify-center text-[10px] font-bold text-stone-500 bg-white">
                   {idx + 2}
                 </div>
                 <div className="w-0.5 flex-1 bg-stone-200 my-1" />
               </div>
               <div className="pb-4">
                 <div className="font-medium text-stone-900 text-sm">{stop.customer}</div>
                 <div className="text-xs text-stone-500">{stop.address}</div>
                 <div className="flex gap-2 mt-2">
                   <Badge variant="outline" className="text-[10px] h-5 bg-stone-50">{stop.type}</Badge>
                   {stop.notes && <Badge variant="secondary" className="text-[10px] h-5">Note</Badge>}
                 </div>
               </div>
             </div>
           ))}
        </div>

      </CardContent>
    </Card>
  );
};
