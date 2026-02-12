import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';
import { 
  Briefcase, Shield, Sprout, 
  UserCheck, AlertOctagon, CloudRain,
  Users, CheckSquare, Search, Lock
} from 'lucide-react';

// --- 1. Recruitment Pipeline Board (The Recruiter) ---
// Persona: Talent Acquisition Manager
export const RecruitmentPipelineBoard = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-stone-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-indigo-600" />
            <div>
              <CardTitle className="text-base">Role: {data.role}</CardTitle>
              <CardDescription className="text-xs">Req ID: {data.reqId} • {data.daysOpen} days open</CardDescription>
            </div>
          </div>
          <div className="text-xs font-bold text-stone-500">
             {data.totalCandidates} Active
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Pipeline Stages */}
        <div className="flex gap-2 h-32 overflow-x-auto pb-2">
           {data.stages.map((stage: any, i: number) => (
              <div key={i} className="min-w-[100px] bg-stone-100 rounded-lg p-2 flex flex-col">
                 <div className="text-[10px] font-bold text-stone-500 uppercase mb-2 flex justify-between">
                    <span>{stage.name}</span>
                    <span>{stage.count}</span>
                 </div>
                 <div className="flex-1 space-y-1 overflow-y-auto">
                    {stage.candidates.map((cand: any, j: number) => (
                       <div key={j} className="bg-white p-1.5 rounded border border-stone-200 shadow-sm text-xs cursor-pointer hover:border-indigo-300">
                          <div className="font-bold text-stone-800 truncate">{cand.name}</div>
                          <div className="text-[9px] text-stone-400">{cand.score}% Match</div>
                       </div>
                    ))}
                 </div>
              </div>
           ))}
        </div>

        {/* Top Candidate */}
        <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-lg flex items-center gap-3">
           <div className="w-8 h-8 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs">
              {data.topCandidate.initials}
           </div>
           <div className="flex-1">
              <div className="text-xs font-bold text-indigo-900">Top Pick: {data.topCandidate.name}</div>
              <div className="text-[10px] text-indigo-700">Strong technical fit. 4 years React exp.</div>
           </div>
           <Button size="sm" className="h-6 text-[10px] bg-indigo-600">Offer</Button>
        </div>
      </CardContent>
    </Card>
  );
};

// --- 2. SOC Incident Response (The Analyst) ---
// Persona: Security Analyst
export const SocIncidentResponse = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col border-red-200">
      <CardHeader className="pb-3 border-b border-red-100 bg-red-50">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-red-600" />
            <div>
              <CardTitle className="text-base text-red-900">Incident #{data.incidentId}</CardTitle>
              <CardDescription className="text-red-700 text-xs">Type: {data.type}</CardDescription>
            </div>
          </div>
          <Badge className="bg-red-600 text-white animate-pulse">SEV 1</Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Timeline */}
        <div className="space-y-2">
           <h4 className="text-xs font-semibold text-stone-500 uppercase">Attack Vector</h4>
           <div className="text-xs p-2 bg-stone-900 text-green-400 font-mono rounded border border-stone-800">
              {data.logs.map((line: string, i: number) => (
                 <div key={i}>{`> ${line}`}</div>
              ))}
           </div>
        </div>

        {/* Affected Assets */}
        <div className="grid grid-cols-2 gap-2">
           {data.assets.map((asset: any, i: number) => (
              <div key={i} className="p-2 bg-stone-50 border border-stone-200 rounded flex items-center gap-2">
                 <div className={`w-2 h-2 rounded-full ${asset.compromised ? 'bg-red-500' : 'bg-green-500'}`} />
                 <div>
                    <div className="text-xs font-bold text-stone-800">{asset.name}</div>
                    <div className="text-[9px] text-stone-500">{asset.ip}</div>
                 </div>
              </div>
           ))}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50 gap-2">
         <Button variant="destructive" className="flex-1 text-xs" onClick={() => onAction('isolate')}>
            <Lock className="w-3 h-3 mr-2" /> Isolate Host
         </Button>
         <Button variant="outline" className="flex-1 text-xs" onClick={() => onAction('escalate')}>
            Escalate
         </Button>
      </CardFooter>
    </Card>
  );
};

// --- 3. Precision Ag Dashboard (The Farmer) ---
// Persona: Agronomist / Farmer
export const PrecisionAgDashboard = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-green-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-green-600" />
            <div>
              <CardTitle className="text-base text-green-900">Field 4B</CardTitle>
              <CardDescription className="text-green-700 text-xs">Crop: Corn (Week 8)</CardDescription>
            </div>
          </div>
          <div className="flex gap-1 text-[10px] text-green-800">
             <CloudRain className="w-3 h-3" /> 40% Chance
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Soil Sensors */}
        <div className="grid grid-cols-3 gap-2">
           {[
             { label: 'Moisture', val: data.moisture, unit: '%' },
             { label: 'Nitrogen', val: data.nitrogen, unit: 'ppm' },
             { label: 'pH', val: data.ph, unit: '' }
           ].map((s, i) => (
             <div key={i} className="flex flex-col items-center p-2 bg-white border border-stone-200 rounded">
                <span className="text-[9px] text-stone-500 uppercase">{s.label}</span>
                <span className="text-sm font-bold text-stone-900">{s.val}{s.unit}</span>
             </div>
           ))}
        </div>

        {/* NDVI Map (Simulated) */}
        <div className="space-y-1">
           <h4 className="text-xs font-semibold text-stone-600">Health Index (NDVI)</h4>
           <div className="h-24 bg-stone-100 rounded overflow-hidden grid grid-cols-6 gap-0.5 p-0.5">
              {[...Array(24)].map((_, i) => (
                 <div key={i} className={`
                    ${i === 7 || i === 8 ? 'bg-yellow-400' : 'bg-green-500'} 
                    opacity-80 hover:opacity-100 transition-opacity
                 `} title={i === 7 ? 'Stress Detected' : 'Healthy'}></div>
              ))}
           </div>
        </div>

        {/* Alerts */}
        {data.alerts.length > 0 && (
           <div className="p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800 flex items-center gap-2">
              <AlertOctagon className="w-4 h-4" />
              <span>{data.alerts[0]}</span>
           </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50">
         <Button size="sm" className="w-full text-xs bg-green-700 hover:bg-green-800" onClick={() => onAction('activate_irrigation')}>
            Activate Irrigation
         </Button>
      </CardFooter>
    </Card>
  );
};
