import { useState } from 'react';
import { FileText, MapPin, Camera, AlertTriangle, CheckCircle2, Landmark, DollarSign } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// 1. Permit Application (Block)
export function PermitApplication({ data, onAction }: { data: any } & ActionProps) {
    const steps = ['Details', 'Documents', 'Review', 'Payment'];
    const currentStep = 1; // Demo

    return (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden w-full max-w-md">
            <div className="bg-stone-900 p-4 text-white flex justify-between items-center">
                <div>
                    <h4 className="text-sm font-bold flex items-center gap-2">
                        <Landmark className="w-4 h-4" />
                        City Permit Portal
                    </h4>
                    <p className="text-[10px] text-stone-400">Application #{data.id}</p>
                </div>
                <Badge variant="outline" className="text-white border-white/20 bg-white/10">
                    {data.type}
                </Badge>
            </div>

            <div className="px-6 py-4">
                 <div className="flex items-center justify-between relative mb-6">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-stone-100 -z-10 -translate-y-1/2"></div>
                    {steps.map((s, i) => (
                        <div key={s} className="flex flex-col items-center gap-1 bg-white px-1">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border-2 ${i <= currentStep ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 text-stone-300'}`}>
                                {i + 1}
                            </div>
                            <span className="text-[9px] font-medium text-stone-500">{s}</span>
                        </div>
                    ))}
                 </div>

                 <div className="space-y-4">
                     <div className="p-3 bg-stone-50 rounded-lg border border-stone-100">
                         <h5 className="text-xs font-bold text-stone-900 mb-2">Project Details</h5>
                         <div className="grid grid-cols-2 gap-y-2 text-[11px]">
                             <span className="text-stone-500">Location:</span>
                             <span className="font-medium">{data.address}</span>
                             <span className="text-stone-500">Owner:</span>
                             <span className="font-medium">{data.owner}</span>
                             <span className="text-stone-500">Est. Cost:</span>
                             <span className="font-medium">${data.cost}</span>
                         </div>
                     </div>
                 </div>
            </div>

            <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end gap-2">
                <Button variant="outline" size="sm" className="h-8 text-xs">Save Draft</Button>
                <Button size="sm" className="h-8 text-xs bg-stone-900 text-white" onClick={() => onAction?.('submit_permit', data)}>
                    Continue
                </Button>
            </div>
        </div>
    );
}

// 2. Issue Reporter (Inline)
export function IssueReporter({ data, onAction }: { data: any } & ActionProps) {
    return (
        <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-xs shadow-sm">
            <div className="flex items-center gap-2 mb-2 text-rose-600">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-xs font-bold">Report Issue</span>
            </div>
            
            <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-xs text-stone-600 bg-stone-50 p-2 rounded">
                    <MapPin className="w-3.5 h-3.5 text-stone-400" />
                    <span className="truncate">{data.address || "Current Location"}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-600 bg-stone-50 p-2 rounded cursor-pointer hover:bg-stone-100">
                    <Camera className="w-3.5 h-3.5 text-stone-400" />
                    <span>Add Photo Evidence</span>
                </div>
            </div>

            <Button className="w-full h-8 text-xs bg-rose-600 hover:bg-rose-700 text-white" onClick={() => onAction?.('report_issue', data)}>
                Submit Report
            </Button>
        </div>
    );
}

// 3. Tax Summary (Inline)
export function TaxSummary({ data }: { data: any }) {
    if (!data) return null;
    const amount = data.amount || data.total || '0.00';
    const breakdown = data.breakdown || { municipal: '0.00', education: '0.00' };

    return (
        <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-xs">
            <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                        <DollarSign className="w-4 h-4" />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-stone-900">Property Tax</p>
                        <p className="text-[10px] text-stone-500">Due: {data.dueDate || data.due || 'Now'}</p>
                    </div>
                </div>
                <Badge variant="outline" className="text-[10px] h-5 bg-amber-50 text-amber-700 border-amber-200">Pending</Badge>
            </div>
            
            <div className="mb-3">
                <span className="text-2xl font-bold text-stone-900">{amount}</span>
            </div>

            <div className="space-y-1 text-[10px] text-stone-500 border-t border-stone-100 pt-2">
                <div className="flex justify-between">
                    <span>Municipal</span>
                    <span>{breakdown.municipal}</span>
                </div>
                <div className="flex justify-between">
                    <span>Education</span>
                    <span>{breakdown.education}</span>
                </div>
            </div>
        </div>
    );
}
