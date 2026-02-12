import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';
import { 
  Building2, FileBadge, Gavel, Map, 
  Users, User, Archive, Activity, Globe,
  Scale, FileText, AlertTriangle
} from 'lucide-react';

// --- 1. Civil Registry Record (The Source of Truth) ---
// Persona: Civil Servant / Registrar
export const CivilRegistryRecord = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-stone-50">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-stone-200 rounded-full flex items-center justify-center text-stone-600">
               <User className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-base">Citizen Record</CardTitle>
              <CardDescription className="text-xs">ID: {data.nationalId}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="bg-white text-xs font-mono">
             {data.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Vital Info */}
        <div className="grid grid-cols-2 gap-3 text-sm">
           <div>
              <div className="text-[10px] text-stone-500 uppercase">Full Name</div>
              <div className="font-semibold text-stone-900">{data.fullName}</div>
           </div>
           <div>
              <div className="text-[10px] text-stone-500 uppercase">Date of Birth</div>
              <div className="font-medium text-stone-900">{data.dob}</div>
           </div>
           <div>
              <div className="text-[10px] text-stone-500 uppercase">Place of Birth</div>
              <div className="font-medium text-stone-900">{data.pob}</div>
           </div>
           <div>
              <div className="text-[10px] text-stone-500 uppercase">Family Book</div>
              <div className="font-medium text-stone-900">{data.familyBookId}</div>
           </div>
        </div>

        {/* Linked Records */}
        <div className="space-y-2">
           <h4 className="text-xs font-semibold text-stone-500 uppercase">Life Events</h4>
           {data.events.map((evt: any, i: number) => (
             <div key={i} className="flex items-center gap-2 p-2 bg-stone-50 rounded border border-stone-100">
                <FileBadge className="w-4 h-4 text-indigo-500" />
                <div className="flex-1">
                   <div className="text-xs font-bold text-stone-800">{evt.type}</div>
                   <div className="text-[10px] text-stone-500">{evt.date} • Reg: {evt.regId}</div>
                </div>
             </div>
           ))}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50">
        <Button size="sm" className="w-full text-xs" onClick={() => onAction('issue_cert')}>
           Issue Certificate
        </Button>
      </CardFooter>
    </Card>
  );
};

// --- 2. Judicial Case Manager (The Docket) ---
// Persona: Court Clerk / Judge
export const JudicialCaseManager = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Gavel className="w-5 h-5 text-stone-700" />
            <div>
              <CardTitle className="text-base">Case {data.caseNumber}</CardTitle>
              <CardDescription className="text-xs">Civil • Small Claims</CardDescription>
            </div>
          </div>
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
             {data.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Parties */}
        <div className="flex items-center justify-between text-xs px-2">
           <div className="text-center">
              <div className="font-bold text-stone-900">{data.plaintiff}</div>
              <div className="text-stone-500">Plaintiff</div>
           </div>
           <div className="text-stone-400 font-serif italic">vs</div>
           <div className="text-center">
              <div className="font-bold text-stone-900">{data.defendant}</div>
              <div className="text-stone-500">Defendant</div>
           </div>
        </div>

        {/* Docket Timeline */}
        <div className="space-y-3 relative pl-3 border-l border-stone-200 ml-2">
           {data.docket.map((entry: any, i: number) => (
             <div key={i} className="relative">
                <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-stone-300 ring-4 ring-white"></div>
                <div className="text-xs font-medium text-stone-800">{entry.title}</div>
                <div className="text-[10px] text-stone-500">{entry.date}</div>
             </div>
           ))}
        </div>

        {/* Next Hearing */}
        <div className="p-2 bg-stone-50 border border-stone-200 rounded text-xs flex justify-between items-center">
           <span className="text-stone-600">Next Hearing:</span>
           <span className="font-bold text-stone-900">{data.nextHearing}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t gap-2">
         <Button variant="outline" className="flex-1 text-xs" onClick={() => onAction('schedule')}>Reschedule</Button>
         <Button className="flex-1 text-xs bg-stone-800" onClick={() => onAction('file_motion')}>File Motion</Button>
      </CardFooter>
    </Card>
  );
};

// --- 3. Urban Planning Grid (The Infrastructure) ---
// Persona: City Planner / GIS Analyst
export const UrbanPlanningGrid = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-emerald-50">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Map className="w-5 h-5 text-emerald-600" />
            <div>
              <CardTitle className="text-base text-emerald-900">Zone B-4</CardTitle>
              <CardDescription className="text-emerald-700 text-xs">Mixed Use • Downtown</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="bg-white/50 text-emerald-800 border-emerald-200">
             GIS-882
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Map Placeholder */}
        <div className="h-32 bg-emerald-100/50 rounded-lg border border-emerald-200 relative overflow-hidden group">
           <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-0.5">
              {[...Array(16)].map((_, i) => (
                 <div key={i} className={`
                    ${i === 5 || i === 6 ? 'bg-stone-400' : 'bg-emerald-200/50'} 
                    hover:bg-emerald-300 transition-colors
                 `}></div>
              ))}
           </div>
           <div className="absolute bottom-2 right-2 px-2 py-1 bg-white/90 rounded text-[9px] font-bold shadow-sm">
              Layer: Zoning
           </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-2">
           <div className="p-2 bg-white border border-stone-200 rounded">
              <div className="text-[10px] text-stone-500">Density</div>
              <div className="text-sm font-bold text-stone-800">{data.density} / sq km</div>
           </div>
           <div className="p-2 bg-white border border-stone-200 rounded">
              <div className="text-[10px] text-stone-500">Green Space</div>
              <div className="text-sm font-bold text-stone-800">{data.greenSpace}%</div>
           </div>
        </div>

        {/* Alerts */}
        {data.alerts.length > 0 && (
           <div className="flex items-start gap-2 p-2 bg-amber-50 rounded text-xs text-amber-800 border border-amber-100">
              <AlertTriangle className="w-3 h-3 mt-0.5" />
              <span>{data.alerts[0]}</span>
           </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50">
         <Button size="sm" className="w-full text-xs" onClick={() => onAction('view_gis')}>
            Open GIS Layer
         </Button>
      </CardFooter>
    </Card>
  );
};
