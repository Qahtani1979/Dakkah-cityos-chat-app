import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';
import { 
  Factory, Calendar, AlertTriangle, CheckCircle2, 
  BarChart2, Clock, Activity, Settings, Users,
  ClipboardCheck, Microscope, StopCircle, PlayCircle
} from 'lucide-react';

// --- 1. Production Schedule Gantt (The Plan) ---
// Persona: Production Planner / Shop Floor Manager
export const ProductionScheduleGantt = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-stone-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <CardTitle className="text-base">Master Schedule</CardTitle>
              <CardDescription className="text-xs">Line A • Week 42</CardDescription>
            </div>
          </div>
          <div className="flex gap-1">
             <Badge variant="outline" className="text-[10px] bg-white">Shift 1 (Active)</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Timeline Header */}
        <div className="flex text-[10px] text-stone-400 font-mono border-b border-stone-100 pb-1">
           <div className="w-16">Job ID</div>
           <div className="flex-1 grid grid-cols-6 gap-1 text-center">
              <span>08:00</span><span>10:00</span><span>12:00</span><span>14:00</span><span>16:00</span><span>18:00</span>
           </div>
        </div>

        {/* Jobs */}
        <div className="space-y-3">
           {data.jobs.map((job: any, i: number) => (
             <div key={i} className="flex items-center gap-2">
                <div className="w-16 text-xs font-bold text-stone-700">{job.id}</div>
                <div className="flex-1 relative h-8 bg-stone-100 rounded overflow-hidden">
                   {/* Progress Bar within Slot */}
                   <div 
                      className={`absolute top-1 bottom-1 rounded-sm border ${
                        job.status === 'running' ? 'bg-blue-100 border-blue-300' : 
                        job.status === 'completed' ? 'bg-green-100 border-green-300' : 
                        'bg-stone-200 border-stone-300'
                      }`}
                      style={{ left: `${job.start}%`, width: `${job.duration}%` }}
                   >
                      <div className="px-2 py-0.5 text-[10px] font-medium truncate flex justify-between items-center h-full">
                         <span>{job.product}</span>
                         {job.status === 'running' && <Activity className="w-3 h-3 text-blue-600 animate-pulse" />}
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>

        {/* Resource Conflict Alert */}
        {data.conflicts > 0 && (
           <div className="p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>{data.conflicts} resource conflict(s) detected. Machine B overload.</span>
           </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50">
        <Button size="sm" className="w-full text-xs" onClick={() => onAction('optimize')}>
           Running Optimizer...
        </Button>
      </CardFooter>
    </Card>
  );
};

// --- 2. OEE Dashboard (The Efficiency) ---
// Persona: Plant Manager / Process Engineer
export const OeeDashboard = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-600" />
            <div>
              <CardTitle className="text-base">OEE Performance</CardTitle>
              <CardDescription className="text-xs">Overall Equipment Effectiveness</CardDescription>
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-700">{data.score}%</div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-5">
        
        {/* The 3 Factors */}
        <div className="grid grid-cols-3 gap-2">
           {[
             { label: 'Availability', val: data.availability, color: 'bg-blue-500' },
             { label: 'Performance', val: data.performance, color: 'bg-purple-500' },
             { label: 'Quality', val: data.quality, color: 'bg-amber-500' }
           ].map((item, i) => (
             <div key={i} className="flex flex-col items-center p-2 bg-stone-50 rounded border border-stone-100">
                <div className="relative w-12 h-12 flex items-center justify-center rounded-full border-4 border-stone-200 mb-1">
                   <span className="text-xs font-bold">{item.val}%</span>
                   <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path className={`${item.color} opacity-20`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="4" />
                      <path className={item.color} strokeDasharray={`${item.val}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="4" />
                   </svg>
                </div>
                <span className="text-[9px] text-stone-500 uppercase">{item.label}</span>
             </div>
           ))}
        </div>

        {/* Downtime Reasons */}
        <div className="space-y-2">
           <h4 className="text-xs font-semibold text-stone-600">Top Downtime Reasons</h4>
           <div className="space-y-1">
              {data.downtime.map((reason: any, i: number) => (
                 <div key={i} className="flex items-center justify-between text-xs p-1">
                    <span className="text-stone-600 truncate flex-1">{reason.reason}</span>
                    <div className="flex items-center gap-2 w-24">
                       <Progress value={reason.impact} className="h-1.5 flex-1 bg-red-100" />
                       <span className="text-stone-400 w-6 text-right">{reason.mins}m</span>
                    </div>
                 </div>
              ))}
           </div>
        </div>

      </CardContent>
    </Card>
  );
};

// --- 3. Quality Control Station (The Check) ---
// Persona: QA Technician
export const QualityControlStation = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-red-50">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
             <div className="p-1.5 bg-red-100 rounded text-red-600">
                <Microscope className="w-5 h-5" />
             </div>
            <div>
              <CardTitle className="text-base text-red-900">QC Station #04</CardTitle>
              <CardDescription className="text-red-700 text-xs">Batch: #992-AX • Insp: 12/50</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        
        {/* Current Inspection Item */}
        <div className="flex gap-3">
           <div className="w-16 h-16 bg-stone-100 rounded-lg flex items-center justify-center border border-stone-200">
              <img src={data.sampleImage} alt="Sample" className="w-12 h-12 object-contain mix-blend-multiply opacity-80" />
           </div>
           <div className="flex-1 space-y-1">
              <div className="text-sm font-bold text-stone-900">Housing Casing (Left)</div>
              <div className="text-xs text-stone-500">Spec: 14.2mm ± 0.1mm</div>
              <Badge variant="outline" className="text-[10px] border-stone-300">Visual + Caliper</Badge>
           </div>
        </div>

        {/* Check List */}
        <div className="space-y-2">
           {data.checks.map((check: any, i: number) => (
             <div key={i} className="flex items-center justify-between p-2 rounded bg-white border border-stone-200">
                <span className="text-xs font-medium text-stone-700">{check.point}</span>
                <div className="flex gap-1">
                   <button className={`p-1 rounded ${check.status === 'pass' ? 'bg-green-600 text-white' : 'bg-stone-100 text-stone-400'}`}>
                      <CheckCircle2 className="w-4 h-4" />
                   </button>
                   <button className={`p-1 rounded ${check.status === 'fail' ? 'bg-red-600 text-white' : 'bg-stone-100 text-stone-400'}`}>
                      <AlertTriangle className="w-4 h-4" />
                   </button>
                </div>
             </div>
           ))}
        </div>

      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50 gap-2">
         <Button variant="destructive" className="flex-1 text-xs" onClick={() => onAction('fail_batch')}>
            <StopCircle className="w-3 h-3 mr-2" /> Reject Batch
         </Button>
         <Button className="flex-1 text-xs bg-green-600 hover:bg-green-700" onClick={() => onAction('pass_item')}>
            <CheckCircle2 className="w-3 h-3 mr-2" /> Pass Item
         </Button>
      </CardFooter>
    </Card>
  );
};
