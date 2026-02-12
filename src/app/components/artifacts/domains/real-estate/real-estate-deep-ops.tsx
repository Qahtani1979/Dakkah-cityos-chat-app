import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';
import { 
  Building, Zap, HardHat, FileText, 
  DollarSign, BarChart3, Wrench, LayoutTemplate,
  CalendarDays, CheckSquare, Layers
} from 'lucide-react';

// --- 1. Lease Admin Ledger (The Rent Roll) ---
// Persona: Property Manager / Asset Manager
export const LeaseAdminLedger = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-stone-50">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-indigo-600" />
            <div>
              <CardTitle className="text-base">Lease Abstract</CardTitle>
              <CardDescription className="text-xs">Suite 400 • TechCorp Inc.</CardDescription>
            </div>
          </div>
          <div className="flex flex-col items-end">
             <div className="text-sm font-bold text-stone-900">{data.leaseType}</div>
             <div className="text-[10px] text-stone-500">Exp: {data.expiry}</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Financials */}
        <div className="grid grid-cols-2 gap-3">
           <div className="p-2 bg-white border border-stone-200 rounded">
              <div className="text-[10px] text-stone-500 uppercase">Base Rent (Monthly)</div>
              <div className="text-lg font-bold text-stone-900">${data.baseRent}</div>
           </div>
           <div className="p-2 bg-white border border-stone-200 rounded">
              <div className="text-[10px] text-stone-500 uppercase">CAM Charges</div>
              <div className="text-lg font-bold text-stone-900">${data.cam}</div>
           </div>
        </div>

        {/* Ledger */}
        <div className="space-y-2">
           <h4 className="text-xs font-semibold text-stone-500 uppercase">Payment History</h4>
           <div className="border rounded-lg overflow-hidden">
              <table className="w-full text-xs text-left">
                 <thead className="bg-stone-50 text-stone-500 font-semibold">
                    <tr>
                       <th className="p-2">Date</th>
                       <th className="p-2">Type</th>
                       <th className="p-2 text-right">Amount</th>
                       <th className="p-2 text-center">Status</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-stone-100">
                    {data.ledger.map((row: any, i: number) => (
                       <tr key={i}>
                          <td className="p-2 text-stone-600">{row.date}</td>
                          <td className="p-2 text-stone-600">{row.type}</td>
                          <td className="p-2 text-right font-medium">${row.amount}</td>
                          <td className="p-2 text-center">
                             <span className={`px-1.5 py-0.5 rounded text-[9px] ${row.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {row.status.toUpperCase()}
                             </span>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50 gap-2">
        <Button variant="outline" className="flex-1 text-xs" onClick={() => onAction('generate_invoice')}>
           Send Invoice
        </Button>
        <Button className="flex-1 text-xs bg-indigo-600" onClick={() => onAction('view_docs')}>
           View Contract
        </Button>
      </CardFooter>
    </Card>
  );
};

// --- 2. Facility Energy Manager (The BMS) ---
// Persona: Facility Manager / Engineer
export const FacilityEnergyManager = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-stone-900 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <div>
              <CardTitle className="text-base text-stone-100">Energy Monitor</CardTitle>
              <CardDescription className="text-xs text-stone-400">Main Building • Zone A</CardDescription>
            </div>
          </div>
          <div className="text-right">
             <div className="text-xl font-bold text-yellow-400">{data.currentLoad} kW</div>
             <div className="text-[10px] text-stone-400">Real-time Load</div>
          </div>
       </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Systems Status */}
        <div className="grid grid-cols-2 gap-2">
           {data.systems.map((sys: any, i: number) => (
              <div key={i} className="p-2 bg-stone-50 border border-stone-200 rounded flex flex-col items-center">
                 <div className={`w-2 h-2 rounded-full mb-1 ${sys.status === 'on' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-stone-300'}`} />
                 <span className="text-xs font-bold text-stone-700">{sys.name}</span>
                 <span className="text-[10px] text-stone-500">{sys.metric}</span>
              </div>
           ))}
        </div>

        {/* Consumption Graph */}
        <div className="space-y-2">
           <h4 className="text-xs font-semibold text-stone-600">Daily Trend</h4>
           <div className="h-20 flex items-end justify-between px-1 gap-1 bg-stone-50 rounded p-1 border border-stone-100">
              {data.trend.map((val: number, i: number) => (
                 <div key={i} className="w-full bg-indigo-400 hover:bg-indigo-500 rounded-t-sm transition-all" style={{ height: `${val}%` }} />
              ))}
           </div>
        </div>

        {/* HVAC Setpoint */}
        <div className="flex items-center justify-between p-2 bg-blue-50 border border-blue-100 rounded">
           <div className="text-xs font-medium text-blue-900">HVAC Setpoint</div>
           <div className="flex items-center gap-2">
              <button className="w-6 h-6 rounded bg-white text-blue-600 border border-blue-200 flex items-center justify-center text-sm font-bold">-</button>
              <span className="text-sm font-bold text-blue-900">72°F</span>
              <button className="w-6 h-6 rounded bg-white text-blue-600 border border-blue-200 flex items-center justify-center text-sm font-bold">+</button>
           </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50">
         <Button variant="destructive" size="sm" className="w-full text-xs" onClick={() => onAction('load_shed')}>
            Initiate Load Shed
         </Button>
      </CardFooter>
    </Card>
  );
};

// --- 3. Construction Project Tracker (The Build) ---
// Persona: Project Manager / GC
export const ConstructionProjectTracker = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-orange-50">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <HardHat className="w-5 h-5 text-orange-600" />
            <div>
              <CardTitle className="text-base text-orange-900">Site Daily Log</CardTitle>
              <CardDescription className="text-orange-700 text-xs">Project: West Wing Reno</CardDescription>
            </div>
          </div>
          <Badge className="bg-orange-200 text-orange-800 border-orange-300">Week 12</Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Progress */}
        <div className="space-y-1">
           <div className="flex justify-between text-xs font-medium text-stone-700">
              <span>Overall Completion</span>
              <span>{data.completion}%</span>
           </div>
           <Progress value={data.completion} className="h-2 bg-stone-200" />
        </div>

        {/* Active RFIs */}
        <div className="space-y-2">
           <h4 className="text-xs font-semibold text-stone-500 uppercase">Open RFIs</h4>
           {data.rfis.map((rfi: any, i: number) => (
             <div key={i} className="p-2 bg-white border border-stone-200 rounded hover:shadow-sm transition-shadow cursor-pointer" onClick={() => onAction('view_rfi')}>
                <div className="flex justify-between items-center mb-1">
                   <span className="text-xs font-bold text-stone-800">#{rfi.id}: {rfi.title}</span>
                   <Badge variant="outline" className="text-[9px] h-4">{rfi.status}</Badge>
                </div>
                <div className="text-[10px] text-stone-500">Assigned: {rfi.assignedTo} • Due: {rfi.due}</div>
             </div>
           ))}
        </div>

        {/* Recent Photo */}
        <div className="relative h-24 bg-stone-200 rounded-lg overflow-hidden group">
           <img src={data.recentPhoto} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500" />
           <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent text-white text-[10px]">
              Latest Site Photo (Today 09:00 AM)
           </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50 gap-2">
         <Button variant="outline" className="flex-1 text-xs" onClick={() => onAction('upload_photo')}>Upload</Button>
         <Button className="flex-1 text-xs bg-orange-600 hover:bg-orange-700" onClick={() => onAction('daily_report')}>Submit Daily</Button>
      </CardFooter>
    </Card>
  );
};
