import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';
import { 
  Truck, Zap, Plane, MapPin, 
  Battery, Activity, Server, Radio,
  Navigation, CalendarClock, Ticket
} from 'lucide-react';

// --- 1. Fleet Telematics Hub (The Fleet Mgr) ---
// Persona: Fleet Manager / Dispatcher
export const FleetTelematicsHub = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-stone-900 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-blue-400" />
            <div>
              <CardTitle className="text-base text-stone-100">Vehicle {data.vehicleId}</CardTitle>
              <CardDescription className="text-xs text-stone-400">{data.makeModel} • {data.driver}</CardDescription>
            </div>
          </div>
          <div className="flex items-center gap-1">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-[10px] text-stone-400">Live</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Vital Stats */}
        <div className="grid grid-cols-3 gap-2">
           <div className="p-2 bg-stone-50 border border-stone-200 rounded text-center">
              <div className="text-[10px] text-stone-500 uppercase">Speed</div>
              <div className="text-sm font-bold text-stone-900">{data.speed} mph</div>
           </div>
           <div className="p-2 bg-stone-50 border border-stone-200 rounded text-center">
              <div className="text-[10px] text-stone-500 uppercase">Fuel</div>
              <div className="text-sm font-bold text-stone-900">{data.fuel}%</div>
           </div>
           <div className="p-2 bg-stone-50 border border-stone-200 rounded text-center">
              <div className="text-[10px] text-stone-500 uppercase">Odometer</div>
              <div className="text-sm font-bold text-stone-900">{data.odometer}</div>
           </div>
        </div>

        {/* Map Snapshot (Simulated) */}
        <div className="h-24 bg-blue-50 rounded border border-blue-100 relative overflow-hidden flex items-center justify-center">
           <MapPin className="text-blue-500 w-6 h-6 absolute" style={{ top: '40%', left: '60%' }} />
           <div className="absolute bottom-1 left-1 bg-white/80 px-1 rounded text-[9px] text-stone-600">
              {data.location}
           </div>
        </div>

        {/* Diagnostic Codes */}
        {data.codes.length > 0 && (
           <div className="space-y-1">
              <h4 className="text-xs font-semibold text-stone-500 uppercase">Alerts</h4>
              {data.codes.map((code: any, i: number) => (
                 <div key={i} className="text-xs p-1.5 bg-red-50 text-red-800 rounded border border-red-100 flex justify-between">
                    <span>{code.code}: {code.desc}</span>
                    <span className="font-bold">Critical</span>
                 </div>
              ))}
           </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50">
         <Button size="sm" className="w-full text-xs" onClick={() => onAction('message_driver')}>
            Message Driver
         </Button>
      </CardFooter>
    </Card>
  );
};

// --- 2. Smart Grid Load Balancer (The Grid Operator) ---
// Persona: Utility Operator
export const SmartGridLoadBalancer = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            <div>
              <CardTitle className="text-base">Substation 4</CardTitle>
              <CardDescription className="text-xs">Capacity: {data.capacity} MW</CardDescription>
            </div>
          </div>
          <div className="text-right">
             <div className={`text-xl font-bold ${data.loadPct > 90 ? 'text-red-600' : 'text-stone-900'}`}>{data.loadPct}%</div>
             <div className="text-[10px] text-stone-500">Load</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Source Mix */}
        <div className="space-y-2">
           <h4 className="text-xs font-semibold text-stone-500 uppercase">Generation Mix</h4>
           <div className="flex h-4 rounded-full overflow-hidden">
              <div style={{ width: `${data.mix.solar}%` }} className="bg-yellow-400" title="Solar" />
              <div style={{ width: `${data.mix.wind}%` }} className="bg-green-400" title="Wind" />
              <div style={{ width: `${data.mix.gas}%` }} className="bg-stone-400" title="Nat Gas" />
           </div>
           <div className="flex justify-between text-[10px] text-stone-500">
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-400" /> Solar {data.mix.solar}%</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-400" /> Wind {data.mix.wind}%</div>
              <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-stone-400" /> Gas {data.mix.gas}%</div>
           </div>
        </div>

        {/* Demand Response */}
        <div className="p-3 bg-stone-50 border border-stone-200 rounded-lg">
           <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold text-stone-700">Demand Response Event</span>
              <Badge variant="outline" className="text-[9px] bg-white">Active</Badge>
           </div>
           <p className="text-[10px] text-stone-500 leading-snug">
              Reducing residential load by 15% via smart thermostat setback. Est. savings: 2.5 MW.
           </p>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50 gap-2">
         <Button variant="outline" className="flex-1 text-xs" onClick={() => onAction('view_outages')}>Outages</Button>
         <Button className="flex-1 text-xs bg-stone-800" onClick={() => onAction('dispatch_peaker')}>Dispatch Peaker</Button>
      </CardFooter>
    </Card>
  );
};

// --- 3. GDS Booking Terminal (The Agent) ---
// Persona: Travel Agent
export const GdsBookingTerminal = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col font-mono">
      <CardHeader className="pb-3 border-b border-stone-100 bg-blue-900 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-blue-300" />
            <div>
              <CardTitle className="text-base text-blue-100">SABRE: {data.pnr}</CardTitle>
              <CardDescription className="text-xs text-blue-400">PAX: {data.paxName}</CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-blue-800 text-blue-200 border-blue-700">TICKETED</Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4 bg-stone-50">
        {/* Segments */}
        <div className="space-y-2">
           {data.segments.map((seg: any, i: number) => (
             <div key={i} className="flex justify-between items-center text-xs p-2 bg-white border border-stone-200 rounded shadow-sm">
                <div>
                   <div className="font-bold text-stone-900">{seg.flight} {seg.class}</div>
                   <div className="text-stone-500">{seg.date} {seg.route}</div>
                </div>
                <div className="text-right">
                   <div className="text-stone-900">{seg.time}</div>
                   <div className="text-stone-400">{seg.status}</div>
                </div>
             </div>
           ))}
        </div>

        {/* Fare Construction */}
        <div className="p-2 border border-stone-300 border-dashed rounded text-[10px] text-stone-600 bg-stone-100">
           <div className="mb-1 font-bold">FARE CALC:</div>
           {data.fareCalc}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t bg-white gap-2">
         <Button variant="outline" className="flex-1 text-xs" onClick={() => onAction('modify')}>Refund/Exchange</Button>
         <Button className="flex-1 text-xs bg-blue-600 hover:bg-blue-700" onClick={() => onAction('email_itin')}>Email Itin</Button>
      </CardFooter>
    </Card>
  );
};
