import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';
import { 
  AlertTriangle, Camera, MapPin, Phone, ShieldAlert, 
  FileText, DollarSign, Calendar, Check, X, Building2,
  TrendingUp, Clock
} from 'lucide-react';

// --- 1. Accident Report / FNOL (First Notice of Loss) ---
// Persona: Driver (Mobile context, High Stress)
export const AccidentReportFNOL = ({ data, onAction }: any) => {
  const [step, setStep] = useState(1);

  return (
    <Card className="w-full h-full shadow-sm flex flex-col border-red-100">
      <CardHeader className="bg-red-50 pb-4 border-b border-red-100">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-red-100 rounded-lg text-red-600">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-lg text-red-900">Accident Report</CardTitle>
              <CardDescription className="text-red-700">Guide Mode • Step {step} of 3</CardDescription>
            </div>
          </div>
          <Button variant="destructive" size="sm" className="h-8 text-xs">
            <Phone className="w-3 h-3 mr-2" /> Call 911
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-6 space-y-6">
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg text-sm text-orange-800">
              <strong>Check Safety:</strong> Ensure you and all passengers are safe. Move to a safe location if possible.
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">Photos of Scene</label>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-24 flex flex-col gap-2 border-dashed border-2">
                  <Camera className="w-6 h-6 text-stone-400" />
                  <span className="text-xs text-stone-500">My Vehicle</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col gap-2 border-dashed border-2">
                  <Camera className="w-6 h-6 text-stone-400" />
                  <span className="text-xs text-stone-500">Other Vehicle</span>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">Location</label>
              <div className="flex items-center gap-2 p-3 bg-stone-50 rounded-md border text-sm text-stone-600">
                <MapPin className="w-4 h-4 text-blue-500" />
                {data.location || "Detecting GPS location..."}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">Other Driver Details</label>
              <input className="w-full p-2 border rounded-md text-sm" placeholder="Name" />
              <input className="w-full p-2 border rounded-md text-sm" placeholder="Phone Number" />
              <input className="w-full p-2 border rounded-md text-sm" placeholder="License Plate" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-stone-700">Witnesses?</label>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">No</Button>
                <Button variant="outline" size="sm" className="flex-1 bg-blue-50 border-blue-200 text-blue-700">Yes</Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-4 border-t gap-3">
        {step > 1 && (
          <Button variant="ghost" onClick={() => setStep(s => s - 1)} className="flex-1">Back</Button>
        )}
        <Button 
          className="flex-1 bg-stone-900" 
          onClick={() => step < 3 ? setStep(s => s + 1) : onAction('submit')}
        >
          {step === 3 ? "Submit Report" : "Next Step"}
        </Button>
      </CardFooter>
    </Card>
  );
};

// --- 2. Vendor Repair Approval ---
// Persona: Maintenance Controller (Cost Control)
export const VendorRepairApproval = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-base">{data.vendorName}</CardTitle>
              <CardDescription className="text-xs">Repair Quote #{data.quoteId}</CardDescription>
            </div>
          </div>
          <Badge variant={data.status === 'urgent' ? 'destructive' : 'secondary'}>
            {data.status}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-auto pt-4 space-y-5">
        <div className="flex items-center justify-between p-3 bg-stone-50 rounded-lg border border-stone-200">
          <div className="text-sm font-medium text-stone-600">Total Estimate</div>
          <div className="text-2xl font-bold text-stone-900">${data.totalAmount.toLocaleString()}</div>
        </div>

        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Line Items</h4>
          {data.items.map((item: any, idx: number) => (
            <div key={idx} className="flex justify-between items-start p-2 hover:bg-stone-50 rounded transition-colors text-sm">
              <div className="flex gap-2">
                <div className={`mt-1 w-2 h-2 rounded-full ${item.approved ? 'bg-green-500' : 'bg-amber-400'}`} />
                <div>
                  <div className="font-medium text-stone-900">{item.description}</div>
                  <div className="text-xs text-stone-500">{item.partNumber}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-mono font-medium">${item.cost}</div>
                {item.variance && (
                  <div className="text-[10px] text-red-600">+{item.variance}% vs Avg</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {data.autoRejectReason && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800 flex gap-2">
            <AlertTriangle className="w-4 h-4" />
            <div>
              <strong>Auto-Flagged:</strong> {data.autoRejectReason}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 border-t border-stone-100 gap-2">
        <Button variant="outline" className="flex-1 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => onAction('reject')}>
          <X className="w-4 h-4 mr-2" /> Reject
        </Button>
        <Button className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => onAction('approve')}>
          <Check className="w-4 h-4 mr-2" /> Approve
        </Button>
      </CardFooter>
    </Card>
  );
};

// --- 3. Lease & Contract Manager ---
// Persona: Lease Administrator (Finance)
export const LeaseContractManager = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <div>
              <CardTitle className="text-base">Lease Portfolio</CardTitle>
              <CardDescription className="text-xs">Expiring within 90 days</CardDescription>
            </div>
          </div>
          <Button size="sm" variant="ghost" className="h-8">View All</Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {data.leases.map((lease: any) => {
          const usagePercent = (lease.currentMileage / lease.allowanceMileage) * 100;
          const timePercent = (lease.monthsElapsed / lease.termMonths) * 100;
          const isOverMileage = usagePercent > timePercent;

          return (
            <div key={lease.id} className="p-4 border border-stone-200 rounded-xl space-y-3 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold text-stone-900">{lease.vehicle}</div>
                  <div className="text-xs text-stone-500 font-mono">{lease.vin}</div>
                </div>
                <Badge variant={isOverMileage ? "destructive" : "outline"} className={!isOverMileage ? "bg-green-50 text-green-700 border-green-200" : ""}>
                  {isOverMileage ? "Over Usage" : "On Track"}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-stone-500">
                    <span>Mileage</span>
                    <span>{lease.currentMileage.toLocaleString()} / {lease.allowanceMileage.toLocaleString()}</span>
                  </div>
                  <Progress value={usagePercent} className={`h-1.5 ${isOverMileage ? "[&>div]:bg-red-500" : "[&>div]:bg-blue-500"}`} />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-stone-500">
                    <span>Contract Time</span>
                    <span>{lease.monthsElapsed}/{lease.termMonths} mo</span>
                  </div>
                  <Progress value={timePercent} className="h-1.5 [&>div]:bg-stone-300" />
                </div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <div className="text-xs">
                  <span className="text-stone-500">Expires: </span>
                  <span className="font-medium text-stone-900">{lease.expiryDate}</span>
                </div>
                <div className="text-xs font-mono text-stone-500">
                  Est. Overage: <span className={isOverMileage ? "text-red-600 font-bold" : "text-stone-400"}>${lease.estPenalty}</span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
