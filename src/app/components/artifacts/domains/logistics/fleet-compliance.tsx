import { 
  AlertOctagon, Camera, Gauge, AlertTriangle, Activity, Shield, ClipboardCheck, FileCheck
} from 'lucide-react';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';
import { Input } from '../../../ui/input';
import { Label } from '../../../ui/label';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// 11. Incident Report Form (Inline)
export function IncidentReportForm({ data, onAction }: { data: any } & ActionProps) {
  return (
    <div className="bg-red-50 rounded-xl p-4 border border-red-100 w-full max-w-sm">
      <div className="flex items-center gap-2 mb-3 text-red-800">
        <AlertOctagon className="w-5 h-5" />
        <div>
          <h4 className="text-sm font-bold">Report Incident</h4>
          {data.shipmentId && <p className="text-[10px] opacity-80">Ref: {data.shipmentId}</p>}
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-3 border border-red-100 shadow-sm space-y-3">
        <div>
          <Label className="text-xs text-stone-600">Incident Type</Label>
          <div className="flex gap-2 mt-1.5 overflow-x-auto pb-1">
             {['Damage', 'Delay', 'Accident', 'Theft'].map(type => (
               <button key={type} className="px-3 py-1 rounded-full text-[10px] font-medium border border-stone-200 bg-stone-50 hover:bg-red-100 hover:border-red-200 transition-colors whitespace-nowrap">
                 {type}
               </button>
             ))}
          </div>
        </div>

        <div>
           <Label className="text-xs text-stone-600">Description</Label>
           <Input placeholder="What happened?" className="mt-1 h-8 text-xs bg-stone-50 border-stone-200" />
        </div>

        <div className="flex gap-2">
           <Button variant="outline" size="sm" className="flex-1 h-8 text-xs border-dashed text-stone-500">
             <Camera className="w-3 h-3 mr-2" /> Add Photo
           </Button>
           <Button size="sm" className="flex-1 h-8 text-xs bg-red-600 hover:bg-red-700 text-white" onClick={() => onAction?.('submit_incident', { id: data.id })}>
             Submit Report
           </Button>
        </div>
      </div>
    </div>
  );
}

// 20. Telematics & Safety Scorecard (Block)
export function TelematicsScorecard({ data, onAction }: { data: any } & ActionProps) {
  return (
    <div className="bg-white rounded-xl p-4 border border-stone-200 w-full max-w-sm shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-sm font-bold text-stone-900">Safety Scorecard</h4>
          <p className="text-[10px] text-stone-500">Driver: {data.driverName}</p>
        </div>
        <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-full border-4 ${data.score >= 90 ? 'border-emerald-500 text-emerald-600' : data.score >= 70 ? 'border-amber-500 text-amber-600' : 'border-red-500 text-red-600'}`}>
           <span className="text-sm font-black">{data.score}</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-stone-50 p-2 rounded border border-stone-100 text-center">
           <Gauge className="w-4 h-4 mx-auto text-stone-400 mb-1" />
           <div className="text-xs font-bold text-stone-900">{data.events.speeding}</div>
           <div className="text-[9px] text-stone-500">Speeding</div>
        </div>
        <div className="bg-stone-50 p-2 rounded border border-stone-100 text-center">
           <AlertTriangle className="w-4 h-4 mx-auto text-stone-400 mb-1" />
           <div className="text-xs font-bold text-stone-900">{data.events.braking}</div>
           <div className="text-[9px] text-stone-500">Harsh Brake</div>
        </div>
        <div className="bg-stone-50 p-2 rounded border border-stone-100 text-center">
           <Activity className="w-4 h-4 mx-auto text-stone-400 mb-1" />
           <div className="text-xs font-bold text-stone-900">{data.events.cornering}</div>
           <div className="text-[9px] text-stone-500">Cornering</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3 p-2 rounded-lg bg-red-50 border border-red-100">
           <Shield className="w-8 h-8 text-red-500 bg-white rounded-full p-1.5" />
           <div>
             <h5 className="text-xs font-bold text-red-900">Critical Event</h5>
             <p className="text-[10px] text-red-700">10:42 AM • Hard Braking (-0.6g)</p>
           </div>
           <Button variant="ghost" size="sm" className="ml-auto h-6 text-[10px] bg-white text-stone-900 hover:bg-stone-100" onClick={() => onAction?.('view_dashcam', { id: data.lastEventId })}>
             Video
           </Button>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-stone-100">
        <Button className="w-full h-8 text-xs bg-stone-900 text-white" onClick={() => onAction?.('assign_training', { driverId: data.driverId })}>
           Assign Coaching Module
        </Button>
      </div>
    </div>
  );
}

// 22. Digital Logbook & Compliance (Block)
export function DigitalLogbookCompliance({ data, onAction }: { data: any } & ActionProps) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 w-full max-w-sm overflow-hidden">
       <div className="bg-stone-100 p-3 flex justify-between items-center border-b border-stone-200">
          <div className="flex items-center gap-2">
             <ClipboardCheck className="w-4 h-4 text-stone-600" />
             <h4 className="text-xs font-bold text-stone-900">HOS & DVIR Log</h4>
          </div>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${data.status === 'Violation' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>
             {data.status}
          </span>
       </div>

       {/* HOS Clocks */}
       <div className="grid grid-cols-2 gap-px bg-stone-200">
          <div className="bg-white p-3 flex flex-col items-center">
             <span className="text-[10px] text-stone-500 uppercase">Drive Left</span>
             <span className="text-xl font-mono font-bold text-stone-900">{data.driveTimeLeft}</span>
             <Progress value={parseInt(data.driveTimeLeft) / 11 * 100} className="h-1 w-16 mt-2 bg-stone-100 [&>div]:bg-blue-600" />
          </div>
          <div className="bg-white p-3 flex flex-col items-center">
             <span className="text-[10px] text-stone-500 uppercase">Cycle Left</span>
             <span className="text-xl font-mono font-bold text-stone-900">{data.cycleLeft}</span>
             <Progress value={parseInt(data.cycleLeft) / 70 * 100} className="h-1 w-16 mt-2 bg-stone-100 [&>div]:bg-stone-900" />
          </div>
       </div>

       {/* Pre-Trip Inspection Summary */}
       <div className="p-3">
          <div className="flex justify-between items-center mb-2">
             <h5 className="text-xs font-bold text-stone-900">Pre-Trip Inspection (DVIR)</h5>
             <span className="text-[10px] text-stone-400">{data.lastInspection}</span>
          </div>
          <div className="space-y-1.5">
             <div className="flex items-center gap-2 text-xs">
                <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span className="flex-1">Brakes & Air System</span>
                <span className="text-emerald-700 font-bold text-[10px]">PASS</span>
             </div>
             <div className="flex items-center gap-2 text-xs">
                <FileCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span className="flex-1">Lights & Reflectors</span>
                <span className="text-emerald-700 font-bold text-[10px]">PASS</span>
             </div>
             <div className="flex items-center gap-2 text-xs">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span className="flex-1">Tire Tread Depth</span>
                <span className="text-amber-700 font-bold text-[10px]">NOTE</span>
             </div>
          </div>
          
          <Button variant="outline" className="w-full mt-3 h-8 text-xs" onClick={() => onAction?.('start_inspection', { type: 'post-trip' })}>
             Start Post-Trip Inspection
          </Button>
       </div>
    </div>
  );
}