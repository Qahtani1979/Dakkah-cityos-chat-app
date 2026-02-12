import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';
import { 
  DollarSign, Calculator, Snowflake, Thermometer, 
  Map, FileSpreadsheet, TrendingUp, AlertCircle,
  Receipt, History, Activity
} from 'lucide-react';

// --- 1. Driver Settlement Sheet (The Paycheck) ---
// Persona: Driver & Payroll Clerk
export const DriverSettlementSheet = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-stone-50">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-green-100 rounded-lg text-green-600">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <CardTitle className="text-lg text-stone-900">Weekly Settlement</CardTitle>
              <CardDescription className="text-stone-600">Period: Oct 12 - Oct 18</CardDescription>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-700">${data.totalNetPay.toLocaleString()}</div>
            <div className="text-xs text-stone-500 uppercase tracking-wide">Net Earnings</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-5">
        
        {/* Earnings Breakdown */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Earnings</h4>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-stone-50 rounded border border-stone-200">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Mileage Pay</span>
                <span className="text-xs text-stone-400">{data.totalMiles} mi @ ${data.ratePerMile}/mi</span>
              </div>
              <span className="font-mono font-medium">${data.mileagePay.toLocaleString()}</span>
            </div>
            
            {data.accessorials.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center p-2 bg-white border-b border-stone-100 last:border-0">
                <span className="text-sm text-stone-600">{item.type}</span>
                <span className="font-mono text-stone-900">${item.amount}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-2 border-t border-dashed border-stone-300">
            <span className="text-sm font-bold text-stone-700">Gross Pay</span>
            <span className="text-sm font-bold text-stone-900">${data.grossPay.toLocaleString()}</span>
          </div>
        </div>

        {/* Deductions */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Deductions</h4>
          <div className="space-y-1">
            {data.deductions.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-stone-500">{item.type}</span>
                <span className="font-mono text-red-600">-${item.amount}</span>
              </div>
            ))}
          </div>
        </div>

      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50 gap-2">
        <Button variant="ghost" className="flex-1 text-xs" onClick={() => onAction('view_history')}>
          <History className="w-3 h-3 mr-2" /> History
        </Button>
        <Button className="flex-1 text-xs bg-stone-900" onClick={() => onAction('download_pdf')}>
          <Receipt className="w-3 h-3 mr-2" /> Download PDF
        </Button>
      </CardFooter>
    </Card>
  );
};

// --- 2. IFTA Fuel Tax Manager (The Compliance) ---
// Persona: Compliance Manager
export const IftaFuelTaxManager = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-600" />
            <div>
              <CardTitle className="text-base">IFTA Tax Manager</CardTitle>
              <CardDescription className="text-xs">Q3 2025 • Due: Oct 31</CardDescription>
            </div>
          </div>
          <Badge variant={data.liability > 0 ? "default" : "secondary"} className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-indigo-200">
            ${data.liability.toFixed(2)} Due
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        
        {/* Summary Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
             <div className="text-xs text-stone-500">Total Miles</div>
             <div className="text-lg font-bold text-stone-900">{data.totalMiles.toLocaleString()}</div>
          </div>
          <div className="p-3 bg-stone-50 rounded-lg border border-stone-200">
             <div className="text-xs text-stone-500">Total Fuel (Gal)</div>
             <div className="text-lg font-bold text-stone-900">{data.totalFuel.toLocaleString()}</div>
          </div>
        </div>

        {/* State Breakdown Table */}
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-xs text-left">
            <thead className="bg-stone-100 text-stone-600 font-semibold border-b">
              <tr>
                <th className="p-2">Jurisdiction</th>
                <th className="p-2 text-right">Miles</th>
                <th className="p-2 text-right">Tax Paid</th>
                <th className="p-2 text-right">Net Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {data.states.map((state: any, idx: number) => (
                <tr key={idx} className="hover:bg-stone-50">
                  <td className="p-2 font-medium flex items-center gap-2">
                    <span className="w-6 h-4 bg-stone-200 rounded flex items-center justify-center text-[9px] text-stone-600 border">{state.code}</span>
                  </td>
                  <td className="p-2 text-right font-mono text-stone-600">{state.miles}</td>
                  <td className="p-2 text-right font-mono text-green-600">${state.taxPaid}</td>
                  <td className={`p-2 text-right font-mono font-bold ${state.netDue > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {state.netDue > 0 ? `+$${state.netDue}` : `-$${Math.abs(state.netDue)}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Alert for Missing Fuel Receipts */}
        {data.missingReceipts > 0 && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex gap-2 items-center text-xs text-amber-800">
            <AlertCircle className="w-4 h-4" />
            <span><strong>Action Required:</strong> {data.missingReceipts} fuel stops detected without receipts.</span>
          </div>
        )}

      </CardContent>

      <CardFooter className="pt-3 border-t">
        <Button className="w-full bg-indigo-600 hover:bg-indigo-700" onClick={() => onAction('generate_return')}>
          <FileSpreadsheet className="w-4 h-4 mr-2" /> Generate Quarterly Return
        </Button>
      </CardFooter>
    </Card>
  );
};

// --- 3. Cold Chain Monitor (The Quality) ---
// Persona: Quality Mgr & Driver
export const ColdChainMonitor = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-sky-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Snowflake className="w-5 h-5 text-sky-600" />
            <div>
              <CardTitle className="text-base text-sky-900">Reefer Unit #202</CardTitle>
              <CardDescription className="text-sky-700 text-xs">Pharma Load • Setpoint: -20°C</CardDescription>
            </div>
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-bold ${data.status === 'ok' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            <Activity className="w-3 h-3" />
            {data.status === 'ok' ? 'Normal' : 'Alarm'}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-6 space-y-6">
        
        {/* Main Temp Display */}
        <div className="flex items-center justify-center py-4">
          <div className="relative">
            <div className="text-5xl font-bold text-stone-800 tabular-nums tracking-tighter">
              {data.currentTemp}°
            </div>
            <div className="absolute -right-6 top-1 text-stone-400 text-sm">C</div>
            <div className="text-xs text-center text-stone-400 mt-2 font-medium uppercase tracking-wide">
              Return Air
            </div>
          </div>
        </div>

        {/* Zones / Sensors */}
        <div className="grid grid-cols-2 gap-3">
           <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-center">
              <div className="text-[10px] text-stone-500 uppercase">Supply Air</div>
              <div className="text-lg font-bold text-stone-700">{data.supplyTemp}°C</div>
           </div>
           <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-center">
              <div className="text-[10px] text-stone-500 uppercase">Ambient</div>
              <div className="text-lg font-bold text-stone-700">{data.ambientTemp}°C</div>
           </div>
        </div>

        {/* Temp Graph Simulation */}
        <div className="space-y-2">
           <div className="flex justify-between items-center">
              <h4 className="text-xs font-semibold text-stone-500">24h History</h4>
              <span className="text-[10px] text-stone-400">Range: -22° to -18°</span>
           </div>
           <div className="h-16 w-full bg-stone-100 rounded border border-stone-200 relative overflow-hidden flex items-end px-1 gap-1">
              {/* Simulated bars */}
              {[40, 42, 45, 41, 38, 40, 43, 60, 55, 42, 41, 40, 39, 41, 44, 42].map((h, i) => (
                <div 
                  key={i} 
                  className={`w-full rounded-t-sm ${h > 50 ? 'bg-red-400' : 'bg-sky-400'}`} 
                  style={{ height: `${h}%` }} 
                />
              ))}
              {/* Threshold Line */}
              <div className="absolute top-1/2 w-full h-px bg-red-300 border-t border-dashed opacity-50"></div>
           </div>
           {data.excursions > 0 && (
             <div className="text-[10px] text-red-600 flex items-center gap-1">
               <AlertCircle className="w-3 h-3" />
               {data.excursions} temp excursion(s) detected in last 24h
             </div>
           )}
        </div>

        {/* Door Status */}
        <div className="flex items-center gap-2 text-xs text-stone-600 p-2 bg-stone-50 rounded">
           <div className={`w-2 h-2 rounded-full ${data.doorOpen ? 'bg-red-500' : 'bg-green-500'}`} />
           Doors are {data.doorOpen ? 'OPEN' : 'CLOSED'}
           <span className="ml-auto text-stone-400">{data.fuelLevel}% Fuel</span>
        </div>

      </CardContent>

      <CardFooter className="pt-3 border-t">
         <Button variant="outline" className="w-full text-xs" onClick={() => onAction('download_log')}>
           Export Temp Log (USDA)
         </Button>
      </CardFooter>
    </Card>
  );
};
