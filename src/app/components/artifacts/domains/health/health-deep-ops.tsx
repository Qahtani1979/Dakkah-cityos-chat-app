import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';
import { 
  HeartPulse, FileText, Video, Stethoscope, 
  Activity, Calendar, Clock, Phone, AlertCircle,
  Pill, DollarSign, User
} from 'lucide-react';

// --- 1. EMR Patient Record (The Chart) ---
// Persona: Doctor / Nurse
export const EmrPatientRecord = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-sky-50">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-sky-600 font-bold border border-sky-100">
               {data.initials}
            </div>
            <div>
              <CardTitle className="text-base text-sky-900">{data.name}</CardTitle>
              <CardDescription className="text-sky-700 text-xs">DOB: {data.dob} • MRN: {data.mrn}</CardDescription>
            </div>
          </div>
          <div className="flex gap-1">
             {data.allergies.length > 0 && <Badge variant="destructive" className="text-[10px]">Allergy: {data.allergies[0]}</Badge>}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        
        {/* Vitals */}
        <div className="grid grid-cols-4 gap-2">
           {[
             { label: 'BP', val: data.vitals.bp },
             { label: 'HR', val: data.vitals.hr },
             { label: 'Temp', val: data.vitals.temp },
             { label: 'O2', val: data.vitals.o2 }
           ].map((v, i) => (
             <div key={i} className="flex flex-col items-center p-1.5 bg-stone-50 rounded border border-stone-100">
                <span className="text-[10px] text-stone-500 uppercase">{v.label}</span>
                <span className="text-sm font-bold text-stone-900">{v.val}</span>
             </div>
           ))}
        </div>

        {/* Clinical Notes Summary */}
        <div className="space-y-1">
           <h4 className="text-xs font-semibold text-stone-600">Latest SOAP Note</h4>
           <div className="text-[11px] leading-relaxed text-stone-600 p-2 bg-white border border-stone-100 rounded shadow-sm">
              <span className="font-bold text-stone-800">S:</span> Patient c/o persistent cough x3 days.
              <br/>
              <span className="font-bold text-stone-800">O:</span> Lungs clear to auscultation. No fever.
              <br/>
              <span className="font-bold text-stone-800">A:</span> Upper Respiratory Infection (Viral).
              <br/>
              <span className="font-bold text-stone-800">P:</span> Supportive care, fluids, rest.
           </div>
        </div>

        {/* Active Meds */}
        <div className="space-y-1">
           <h4 className="text-xs font-semibold text-stone-600 flex items-center gap-1">
              <Pill className="w-3 h-3" /> Medications
           </h4>
           {data.meds.map((med: any, i: number) => (
             <div key={i} className="flex justify-between items-center text-xs p-1.5 bg-stone-50 rounded">
                <span className="font-medium">{med.name}</span>
                <span className="text-stone-500">{med.dose}</span>
             </div>
           ))}
        </div>

      </CardContent>

      <CardFooter className="pt-3 border-t gap-2">
         <Button variant="outline" size="sm" className="flex-1 text-xs" onClick={() => onAction('refill')}>Rx Refill</Button>
         <Button size="sm" className="flex-1 text-xs bg-sky-600 hover:bg-sky-700" onClick={() => onAction('add_note')}>Add Note</Button>
      </CardFooter>
    </Card>
  );
};

// --- 2. Insurance Claims Processor (The Payer) ---
// Persona: Medical Biller
export const InsuranceClaimsProcessor = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-600" />
            <div>
              <CardTitle className="text-base">Claim #8821</CardTitle>
              <CardDescription className="text-xs">BlueCross • DOS: Oct 12</CardDescription>
            </div>
          </div>
          <Badge variant={data.status === 'paid' ? 'default' : data.status === 'denied' ? 'destructive' : 'secondary'} className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-emerald-200">
             {data.status.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        
        {/* Codes */}
        <div className="border rounded-lg overflow-hidden">
           <table className="w-full text-xs text-left">
              <thead className="bg-stone-50 text-stone-500 font-semibold border-b">
                 <tr>
                    <th className="p-2">CPT Code</th>
                    <th className="p-2 text-right">Billed</th>
                    <th className="p-2 text-right">Allowed</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                 {data.lines.map((line: any, i: number) => (
                    <tr key={i}>
                       <td className="p-2 font-mono text-stone-700">{line.code}</td>
                       <td className="p-2 text-right text-stone-500">${line.billed}</td>
                       <td className="p-2 text-right font-medium text-stone-900">${line.allowed}</td>
                    </tr>
                 ))}
              </tbody>
              <tfoot className="bg-stone-50 font-bold text-stone-900">
                 <tr>
                    <td className="p-2">Total</td>
                    <td className="p-2 text-right text-stone-500">${data.totalBilled}</td>
                    <td className="p-2 text-right">${data.totalAllowed}</td>
                 </tr>
              </tfoot>
           </table>
        </div>

        {/* Denial Reason (if any) */}
        {data.status === 'denied' && (
           <div className="p-2 bg-red-50 border border-red-200 rounded text-xs text-red-800">
              <strong>Denial Code CO-16:</strong> Claim/service lacks information which is needed for adjudication.
           </div>
        )}

      </CardContent>

      <CardFooter className="pt-3 border-t gap-2">
         <Button variant="ghost" className="flex-1 text-xs" onClick={() => onAction('view_eob')}>View EOB</Button>
         <Button className="flex-1 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={() => onAction('resubmit')}>Correct & Resubmit</Button>
      </CardFooter>
    </Card>
  );
};

// --- 3. Telehealth Doctor Console (The Visit) ---
// Persona: Provider
export const TelehealthDoctorConsole = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col bg-stone-900 text-white border-stone-800">
      {/* Video Area (Simulated) */}
      <div className="relative flex-1 bg-stone-950 rounded-t-lg overflow-hidden flex items-center justify-center group">
         <img src={data.patientVideo} alt="Patient" className="absolute inset-0 w-full h-full object-cover opacity-80" />
         
         {/* Self View PIP */}
         <div className="absolute top-4 right-4 w-24 h-16 bg-black rounded border border-stone-700 overflow-hidden shadow-lg">
            <img src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" />
         </div>

         {/* Controls Overlay */}
         <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-2 rounded-full bg-red-600 hover:bg-red-700 text-white"><Phone className="w-4 h-4" /></button>
            <button className="p-2 rounded-full bg-stone-700 hover:bg-stone-600 text-white"><Video className="w-4 h-4" /></button>
            <button className="p-2 rounded-full bg-stone-700 hover:bg-stone-600 text-white"><div className="w-4 h-4 flex items-center justify-center font-bold">Mic</div></button>
         </div>
      </div>

      {/* Quick Actions / Chart Sidebar */}
      <div className="h-1/3 border-t border-stone-800 bg-stone-900 p-3 flex gap-3">
         <div className="flex-1 space-y-2">
            <div className="flex justify-between items-center">
               <span className="text-xs font-bold text-stone-300">Wait Time: {data.waitTime}</span>
               <Badge variant="outline" className="text-[10px] text-green-400 border-green-900 bg-green-900/20">Connection: Stable</Badge>
            </div>
            <div className="text-sm font-medium">{data.chiefComplaint}</div>
            <div className="flex gap-2 mt-2">
               <Button size="sm" variant="secondary" className="h-7 text-[10px]" onClick={() => onAction('open_chart')}>Open Chart</Button>
               <Button size="sm" variant="secondary" className="h-7 text-[10px]" onClick={() => onAction('eprescribe')}>ePrescribe</Button>
            </div>
         </div>
      </div>
    </Card>
  );
};
