import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';
import { 
  Shield, FileSearch, Calculator, TrendingUp, 
  AlertTriangle, CheckCircle, FileText, User,
  Umbrella, PieChart, DollarSign
} from 'lucide-react';

// --- 1. Policy Admin System (The Core) ---
// Persona: Underwriter / Policy Admin
export const PolicyAdminSystem = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-stone-50">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            <div>
              <CardTitle className="text-base">Policy Jacket</CardTitle>
              <CardDescription className="text-xs">Pol #: {data.policyNumber}</CardDescription>
            </div>
          </div>
          <Badge className={data.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-stone-200 text-stone-700'}>
             {data.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Coverage Summary */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
           <div className="text-xs font-semibold text-blue-900 mb-2">Commercial General Liability</div>
           <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-blue-800">
                 <span>Occurrence Limit</span>
                 <span className="font-bold">${data.limits.occurrence}</span>
              </div>
              <div className="flex justify-between text-[11px] text-blue-800">
                 <span>Aggregate Limit</span>
                 <span className="font-bold">${data.limits.aggregate}</span>
              </div>
              <div className="flex justify-between text-[11px] text-blue-800 border-t border-blue-200 pt-1 mt-1">
                 <span>Deductible</span>
                 <span className="font-bold">${data.deductible}</span>
              </div>
           </div>
        </div>

        {/* Endorsements */}
        <div className="space-y-2">
           <h4 className="text-xs font-semibold text-stone-500 uppercase">Endorsements</h4>
           {data.endorsements.map((end: any, i: number) => (
             <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                <FileText className="w-3 h-3 text-stone-400" />
                <span>{end.code}: {end.name}</span>
             </div>
           ))}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50 gap-2">
         <Button variant="outline" className="flex-1 text-xs" onClick={() => onAction('endorse')}>Modify</Button>
         <Button className="flex-1 text-xs bg-blue-600 hover:bg-blue-700" onClick={() => onAction('renew')}>Renew</Button>
      </CardFooter>
    </Card>
  );
};

// --- 2. Claims Adjuster Workbench (The Investigation) ---
// Persona: Claims Adjuster
export const ClaimsAdjusterWorkbench = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-amber-600" />
            <div>
              <CardTitle className="text-base">Claim File</CardTitle>
              <CardDescription className="text-xs">CLM-{data.claimId} • Loss Date: {data.lossDate}</CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Reserve Tracking */}
        <div className="grid grid-cols-2 gap-3">
           <div className="p-2 bg-stone-50 border border-stone-200 rounded">
              <div className="text-[10px] text-stone-500 uppercase">Indemnity Reserve</div>
              <div className="text-sm font-bold text-stone-900">${data.reserves.indemnity}</div>
           </div>
           <div className="p-2 bg-stone-50 border border-stone-200 rounded">
              <div className="text-[10px] text-stone-500 uppercase">Expense Reserve</div>
              <div className="text-sm font-bold text-stone-900">${data.reserves.expense}</div>
           </div>
        </div>

        {/* Action Plan */}
        <div className="space-y-2">
           <h4 className="text-xs font-semibold text-stone-500 uppercase">Investigation Steps</h4>
           {data.steps.map((step: any, i: number) => (
             <div key={i} className="flex items-center gap-2 p-2 rounded hover:bg-stone-50 transition-colors">
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${step.completed ? 'bg-green-100 border-green-300 text-green-700' : 'border-stone-300 text-transparent'}`}>
                   <CheckCircle className="w-3 h-3" />
                </div>
                <span className={`text-xs ${step.completed ? 'text-stone-400 line-through' : 'text-stone-700 font-medium'}`}>
                   {step.task}
                </span>
             </div>
           ))}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50 gap-2">
         <Button variant="outline" className="flex-1 text-xs" onClick={() => onAction('set_reserve')}>Set Reserves</Button>
         <Button className="flex-1 text-xs bg-amber-600 hover:bg-amber-700" onClick={() => onAction('pay')}>Issue Payment</Button>
      </CardFooter>
    </Card>
  );
};

// --- 3. Actuarial Risk Heatmap (The Model) ---
// Persona: Actuary / Risk Manager
export const ActuarialRiskHeatmap = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-stone-900 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-400" />
            <div>
              <CardTitle className="text-base text-stone-100">Portfolio Risk</CardTitle>
              <CardDescription className="text-xs text-stone-400">Q3 2025 • Auto Book</CardDescription>
            </div>
          </div>
          <div className="text-right">
             <div className="text-lg font-bold text-purple-400">{data.lossRatio}%</div>
             <div className="text-[10px] text-stone-400">Loss Ratio</div>
          </div>
       </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Heatmap Grid (Simulated) */}
        <div className="space-y-1">
           <div className="flex justify-between text-[10px] text-stone-500">
              <span>Low Risk Segments</span>
              <span>High Risk Segments</span>
           </div>
           <div className="grid grid-cols-5 gap-1 h-24">
              {data.segments.map((seg: any, i: number) => (
                 <div 
                    key={i} 
                    className={`rounded transition-all hover:scale-105 cursor-help flex items-center justify-center text-[9px] font-bold text-white/80
                       ${seg.risk > 80 ? 'bg-red-600' : seg.risk > 60 ? 'bg-orange-500' : seg.risk > 40 ? 'bg-yellow-500' : 'bg-green-500'}
                    `}
                    title={`${seg.name}: ${seg.risk} Risk Score`}
                 >
                    {seg.code}
                 </div>
              ))}
           </div>
        </div>

        {/* Alert */}
        <div className="p-2 bg-red-50 border border-red-100 rounded flex gap-2">
           <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
           <div className="text-[10px] text-red-800 leading-snug">
              <strong>Exposure Alert:</strong> High concentration of risk in Coastal Zone 4 (Wind/Hail). Reinsurance treaty limits approaching capacity.
           </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50">
         <Button size="sm" className="w-full text-xs" onClick={() => onAction('run_model')}>
            <Calculator className="w-3 h-3 mr-2" /> Re-run Pricing Model
         </Button>
      </CardFooter>
    </Card>
  );
};
