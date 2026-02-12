import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';
import { 
  ScanLine, UserCheck, ShieldAlert, FileText, 
  Landmark, CreditCard, Banknote, Search,
  Fingerprint, Check, X, Building, AlertOctagon
} from 'lucide-react';

// --- 1. KYC Verification Portal (The Gatekeeper) ---
// Persona: Compliance Officer
export const KycVerificationPortal = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-stone-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-indigo-600" />
            <div>
              <CardTitle className="text-base">Identity Verification</CardTitle>
              <CardDescription className="text-xs">Case #9921 • Level 2 Check</CardDescription>
            </div>
          </div>
          <Badge variant={data.riskLevel === 'high' ? 'destructive' : 'secondary'} className="uppercase">
             {data.riskLevel} Risk
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Applicant Profile */}
        <div className="flex items-center gap-3 p-3 bg-white border border-stone-200 rounded-lg">
           <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              {data.initials}
           </div>
           <div>
              <div className="text-sm font-bold text-stone-900">{data.name}</div>
              <div className="text-xs text-stone-500">ID: {data.govId}</div>
           </div>
        </div>

        {/* Verification Steps */}
        <div className="space-y-2">
           <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Checks</h4>
           {data.checks.map((check: any, i: number) => (
             <div key={i} className="flex justify-between items-center text-sm p-2 rounded bg-stone-50">
                <div className="flex items-center gap-2">
                   {check.passed ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-600" />}
                   <span className="text-stone-700">{check.label}</span>
                </div>
                {check.match && <Badge variant="outline" className="text-[10px] h-5 bg-white">{check.match}% Match</Badge>}
             </div>
           ))}
        </div>

        {/* Sanctions Hit */}
        {data.pepMatch && (
           <div className="p-3 bg-red-50 border border-red-200 rounded text-xs text-red-800 flex gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <div>
                 <strong>PEP Watchlist Match:</strong> Potential name match with "Politically Exposed Person" list (Tier 1). Manual review required.
              </div>
           </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50 gap-2">
        <Button variant="outline" className="flex-1 text-xs" onClick={() => onAction('request_docs')}>
           Request More Info
        </Button>
        <Button className="flex-1 text-xs bg-indigo-600" onClick={() => onAction('approve')}>
           Approve
        </Button>
      </CardFooter>
    </Card>
  );
};

// --- 2. Loan Underwriting Desk (The Vault) ---
// Persona: Credit Analyst / Underwriter
export const LoanUnderwritingDesk = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Landmark className="w-5 h-5 text-emerald-600" />
            <div>
              <CardTitle className="text-base">Loan Application</CardTitle>
              <CardDescription className="text-xs">SMB Growth Capital • $150k</CardDescription>
            </div>
          </div>
          <div className="text-right">
             <div className="text-xl font-bold text-stone-900">{data.creditScore}</div>
             <div className="text-[10px] text-stone-500 uppercase">FICO Score</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-5">
        
        {/* Financial Ratios */}
        <div className="grid grid-cols-3 gap-2">
           <div className="p-2 bg-stone-50 rounded border border-stone-200 text-center">
              <div className="text-[10px] text-stone-500 uppercase">DSCR</div>
              <div className={`text-sm font-bold ${data.dscr >= 1.25 ? 'text-green-600' : 'text-amber-600'}`}>{data.dscr}x</div>
           </div>
           <div className="p-2 bg-stone-50 rounded border border-stone-200 text-center">
              <div className="text-[10px] text-stone-500 uppercase">LTV</div>
              <div className="text-sm font-bold text-stone-700">{data.ltv}%</div>
           </div>
           <div className="p-2 bg-stone-50 rounded border border-stone-200 text-center">
              <div className="text-[10px] text-stone-500 uppercase">Debt/Inc</div>
              <div className="text-sm font-bold text-stone-700">{data.dti}%</div>
           </div>
        </div>

        {/* Cash Flow Chart Simulation */}
        <div className="space-y-2">
           <h4 className="text-xs font-semibold text-stone-600">Bank Statement Analysis (6mo)</h4>
           <div className="h-16 flex items-end justify-between gap-1 px-1">
              {[45, 52, 48, 60, 58, 70, 75, 72, 80, 85, 90, 88].map((h, i) => (
                 <div key={i} className="w-full bg-emerald-100 hover:bg-emerald-200 rounded-t-sm" style={{ height: `${h}%` }} />
              ))}
           </div>
           <div className="flex justify-between text-[10px] text-stone-400">
              <span>Jan</span><span>Jun</span>
           </div>
        </div>

        {/* AI Recommendation */}
        <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
           <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-blue-600 text-[10px] hover:bg-blue-700">AI Recommendation</Badge>
              <span className="text-xs font-bold text-blue-900">Approve with Conditions</span>
           </div>
           <p className="text-[10px] text-blue-700 leading-snug">
              Strong cash flow trend (+12% MoM). Collateral coverage is sufficient. Suggest requiring personal guarantee due to limited operating history (2 years).
           </p>
        </div>

      </CardContent>

      <CardFooter className="pt-3 border-t gap-2">
         <Button variant="ghost" size="sm" className="flex-1 text-xs" onClick={() => onAction('reject')}>Decline</Button>
         <Button size="sm" className="flex-1 text-xs bg-emerald-600 hover:bg-emerald-700" onClick={() => onAction('approve')}>Issue Term Sheet</Button>
      </CardFooter>
    </Card>
  );
};

// --- 3. Fraud Detection Console (The Shield) ---
// Persona: Fraud Analyst
export const FraudDetectionConsole = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-red-50">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
             <AlertOctagon className="w-5 h-5 text-red-600" />
            <div>
              <CardTitle className="text-base text-red-900">Transaction Alert</CardTitle>
              <CardDescription className="text-red-700 text-xs">TX-9982 • $4,250.00</CardDescription>
            </div>
          </div>
          <Badge className="bg-red-200 text-red-800 hover:bg-red-300 border-red-300">
             Score: {data.fraudScore}/100
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        
        {/* Map Visualization (Mock) */}
        <div className="relative h-24 bg-stone-100 rounded border border-stone-200 overflow-hidden">
           <div className="absolute inset-0 opacity-20 bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] bg-cover bg-center"></div>
           {/* Connecting Lines */}
           <div className="absolute top-1/2 left-1/4 w-1/2 h-px bg-red-400 border-t border-dashed"></div>
           {/* Points */}
           <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-white transform -translate-y-1/2" title="User Home"></div>
           <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-red-600 rounded-full ring-2 ring-white transform -translate-y-1/2 animate-ping"></div>
           <div className="absolute bottom-1 left-2 text-[9px] text-stone-500">Distance: 4,200 miles (Impossible Travel)</div>
        </div>

        {/* Signals */}
        <div className="space-y-1">
           {data.signals.map((sig: any, i: number) => (
             <div key={i} className="flex justify-between items-center text-xs p-2 bg-white border border-stone-100 rounded">
                <span className="text-stone-700">{sig.label}</span>
                <Badge variant="outline" className={`${sig.risk === 'high' ? 'text-red-600 border-red-200 bg-red-50' : 'text-amber-600 border-amber-200 bg-amber-50'}`}>
                   {sig.risk.toUpperCase()}
                </Badge>
             </div>
           ))}
        </div>

        {/* Device Fingerprint */}
        <div className="text-[10px] text-stone-500 flex items-center gap-2 p-2 bg-stone-50 rounded">
           <Fingerprint className="w-3 h-3" />
           <span>Device ID: ...8f2a (New Device) • IP: Proxy Detected</span>
        </div>

      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50 gap-2">
         <Button variant="outline" className="flex-1 text-xs" onClick={() => onAction('allow_once')}>
            Allow (Exception)
         </Button>
         <Button variant="destructive" className="flex-1 text-xs" onClick={() => onAction('block_card')}>
            Block Card
         </Button>
      </CardFooter>
    </Card>
  );
};
