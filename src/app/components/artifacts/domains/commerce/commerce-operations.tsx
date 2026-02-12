import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';
import { 
  ShoppingBag, TrendingUp, Users, Package, 
  AlertCircle, BarChart3, Globe, Store, 
  Truck, ArrowUpRight, DollarSign, Star,
  RefreshCw, ShieldCheck, PieChart
} from 'lucide-react';

// --- 1. Vendor Performance Scorecard (The Sourcing) ---
// Persona: Procurement Officer / Category Manager
export const VendorPerformanceScorecard = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-stone-50">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-indigo-600" />
            <div>
              <CardTitle className="text-base">Vendor Scorecard</CardTitle>
              <CardDescription className="text-xs">TechHaven Supplies • Q3 2025</CardDescription>
            </div>
          </div>
          <div className="flex flex-col items-end">
             <div className="text-xl font-bold text-indigo-700">A+</div>
             <div className="text-[10px] text-stone-500">Tier 1 Partner</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-5">
        
        {/* KPI Grid */}
        <div className="grid grid-cols-2 gap-3">
           <div className="p-3 bg-white border border-stone-200 rounded-lg">
              <div className="text-[10px] text-stone-500 uppercase">On-Time Ship</div>
              <div className="flex items-end gap-1">
                 <span className="text-lg font-bold text-green-600">98.2%</span>
                 <span className="text-[9px] text-green-600 mb-1">▲ 1.2%</span>
              </div>
              <Progress value={98} className="h-1 mt-2 bg-green-100" />
           </div>
           <div className="p-3 bg-white border border-stone-200 rounded-lg">
              <div className="text-[10px] text-stone-500 uppercase">Defect Rate</div>
              <div className="flex items-end gap-1">
                 <span className="text-lg font-bold text-stone-700">0.4%</span>
                 <span className="text-[9px] text-green-600 mb-1">▼ 0.1%</span>
              </div>
              <Progress value={4} className="h-1 mt-2 bg-stone-100" />
           </div>
        </div>

        {/* Lead Time Analysis */}
        <div className="space-y-2">
           <div className="flex justify-between items-center">
              <h4 className="text-xs font-semibold text-stone-600">Lead Time Variance (Days)</h4>
              <Badge variant="outline" className="text-[10px]">Target: 14d</Badge>
           </div>
           <div className="h-24 flex items-end justify-between px-2 gap-2 border-b border-stone-200 pb-1">
              {[12, 14, 13, 14, 15, 14, 14, 13, 12, 11].map((d, i) => (
                <div key={i} className="w-full bg-indigo-100 rounded-t-sm relative group" style={{ height: `${(d/20)*100}%` }}>
                   <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[9px] text-indigo-700 hidden group-hover:block">{d}d</div>
                </div>
              ))}
           </div>
        </div>

        {/* Compliance & Risk */}
        <div className="space-y-2">
           <h4 className="text-xs font-semibold text-stone-600">Compliance Documents</h4>
           <div className="space-y-1">
              {data.documents.map((doc: any, i: number) => (
                <div key={i} className="flex justify-between items-center text-xs p-2 bg-stone-50 rounded border border-stone-100">
                   <div className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full ${doc.status === 'valid' ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className="text-stone-700">{doc.name}</span>
                   </div>
                   <span className="text-stone-400">{doc.expiry}</span>
                </div>
              ))}
           </div>
        </div>

      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50">
        <Button size="sm" className="w-full text-xs" onClick={() => onAction('initiate_audit')}>
           Initiate Quality Audit
        </Button>
      </CardFooter>
    </Card>
  );
};

// --- 2. Omni-Channel Inventory Matrix (The Stock) ---
// Persona: Inventory Planner / Merchandiser
export const OmniChannelInventory = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-600" />
            <div>
              <CardTitle className="text-base">Inventory Allocation</CardTitle>
              <CardDescription className="text-xs">SKU: WID-2024-X (Smart Watch)</CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
             {data.totalStock} Units
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-5">
        
        {/* Channel Distribution */}
        <div className="space-y-3">
           <h4 className="text-xs font-semibold text-stone-500 uppercase">Stock by Channel</h4>
           {data.channels.map((channel: any, i: number) => (
             <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                   {channel.type === 'ecom' ? <Globe className="w-4 h-4" /> : 
                    channel.type === 'retail' ? <Store className="w-4 h-4" /> : <Truck className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                   <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-stone-700">{channel.name}</span>
                      <span className="font-mono text-stone-900">{channel.stock}</span>
                   </div>
                   <Progress value={channel.fillRate} className={`h-1.5 ${channel.status === 'low' ? 'bg-red-100' : 'bg-green-100'}`} />
                </div>
                {channel.status === 'low' && <AlertCircle className="w-4 h-4 text-red-500" />}
             </div>
           ))}
        </div>

        {/* Transfer Recommendation */}
        {data.transfers.length > 0 && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
             <div className="flex items-start gap-2">
                <RefreshCw className="w-4 h-4 text-blue-600 mt-0.5" />
                <div className="space-y-1 flex-1">
                   <h4 className="text-xs font-bold text-blue-800">Rebalancing Suggested</h4>
                   {data.transfers.map((t: any, i: number) => (
                     <div key={i} className="text-[10px] text-blue-700">
                        Move <strong>{t.amount} units</strong> from {t.from} ➔ {t.to}
                     </div>
                   ))}
                   <Button size="sm" variant="ghost" className="h-6 text-[10px] bg-white border border-blue-200 text-blue-700 mt-1" onClick={() => onAction('approve_transfer')}>
                      Approve Move
                   </Button>
                </div>
             </div>
          </div>
        )}

      </CardContent>
    </Card>
  );
};

// --- 3. Customer Lifetime Value CRM (The Retention) ---
// Persona: Marketing Manager / Retention Specialist
export const CustomerLifetimeValueCRM = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-purple-50">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            <div>
              <CardTitle className="text-base text-purple-900">Sarah Jenkins</CardTitle>
              <CardDescription className="text-purple-700 text-xs">Joined: Nov 2021 • VIP Tier</CardDescription>
            </div>
          </div>
          <div className="text-right">
             <div className="text-lg font-bold text-purple-900">${data.clv.toLocaleString()}</div>
             <div className="text-[10px] text-purple-600 uppercase">Lifetime Value</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-5">
        
        {/* Predictive Churn Risk */}
        <div className="space-y-2">
           <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-stone-600">Churn Probability</span>
              <span className={`text-xs font-bold ${data.churnRisk > 50 ? 'text-red-600' : 'text-green-600'}`}>
                 {data.churnRisk}%
              </span>
           </div>
           <Progress value={data.churnRisk} className={`h-2 ${data.churnRisk > 50 ? 'bg-red-100' : 'bg-green-100'}`} />
           <div className="text-[10px] text-stone-400">Based on recent inactivity (14 days)</div>
        </div>

        {/* Purchase Habits */}
        <div className="grid grid-cols-2 gap-2">
           <div className="p-2 bg-stone-50 rounded border border-stone-100">
              <div className="text-[10px] text-stone-500">AOV</div>
              <div className="text-sm font-bold text-stone-900">${data.aov}</div>
           </div>
           <div className="p-2 bg-stone-50 rounded border border-stone-100">
              <div className="text-[10px] text-stone-500">Frequency</div>
              <div className="text-sm font-bold text-stone-900">{data.frequency} days</div>
           </div>
        </div>

        {/* Next Best Action */}
        <div className="space-y-2">
           <h4 className="text-xs font-semibold text-stone-500 uppercase">Recommended Actions</h4>
           <div className="space-y-2">
              <button className="w-full flex items-center justify-between p-2 rounded border border-purple-200 bg-purple-50 hover:bg-purple-100 transition-colors text-left" onClick={() => onAction('send_offer')}>
                 <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-medium text-purple-900">Send "We Miss You" (15% Off)</span>
                 </div>
                 <ArrowUpRight className="w-3 h-3 text-purple-400" />
              </button>
              <button className="w-full flex items-center justify-between p-2 rounded border border-stone-200 bg-white hover:bg-stone-50 transition-colors text-left" onClick={() => onAction('view_history')}>
                 <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-stone-500" />
                    <span className="text-xs font-medium text-stone-700">Review Last Return</span>
                 </div>
                 <ArrowUpRight className="w-3 h-3 text-stone-400" />
              </button>
           </div>
        </div>

      </CardContent>
    </Card>
  );
};
