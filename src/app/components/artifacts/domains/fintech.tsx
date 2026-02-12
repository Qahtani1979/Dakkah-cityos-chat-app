import { Lock, FileCheck, ShieldAlert, PieChart, TrendingUp, AlertCircle, Download } from 'lucide-react';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// 1. Escrow Status (Inline)
export function EscrowStatus({ data }: { data: any }) {
  const steps = ['Deposited', 'Locked', 'Verified', 'Released'];
  const currentStep = steps.indexOf(data.status) !== -1 ? steps.indexOf(data.status) : 1;
  
  return (
    <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-xs">
       <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
             <Lock className="w-4 h-4" />
          </div>
          <div>
             <p className="text-xs font-bold text-stone-900">Escrow #{data.id}</p>
             <p className="text-[10px] text-stone-500">${data.amount.toLocaleString()} • {data.status}</p>
          </div>
       </div>
       
       <div className="flex items-center justify-between relative px-2 mb-1">
          {/* Connecting Line */}
          <div className="absolute top-1.5 left-2 right-2 h-0.5 bg-stone-100 -z-10"></div>
          
          {steps.map((step, i) => {
             const active = i <= currentStep;
             return (
                 <div key={i} className="flex flex-col items-center gap-1">
                    <div className={`w-3 h-3 rounded-full border-2 ${active ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-stone-200'}`}></div>
                    <span className={`text-[9px] ${active ? 'text-indigo-600 font-bold' : 'text-stone-300'}`}>{step}</span>
                 </div>
             )
          })}
       </div>
    </div>
  );
}

// 2. Invoice Preview (Inline)
export function InvoicePreview({ data, onAction }: { data: any } & ActionProps) {
  return (
    <div className="bg-white rounded-xl border border-stone-200 w-full max-w-xs overflow-hidden group hover:border-blue-300 transition-colors">
       {/* PDF Header Look */}
       <div className="h-2 bg-rose-500"></div>
       <div className="p-3">
          <div className="flex justify-between items-start mb-4">
             <div>
                <div className="text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-0.5">Invoice</div>
                <div className="text-lg font-bold text-stone-900">#{data.number}</div>
             </div>
             <div className="text-right">
                <div className="text-sm font-bold text-stone-900">${data.total}</div>
                <div className="text-[10px] text-stone-500">Due {data.dueDate}</div>
             </div>
          </div>
          
          <div className="bg-stone-50 rounded p-2 mb-3 space-y-1">
             <div className="flex justify-between text-[10px] text-stone-600">
                <span>{data.items?.[0]?.name || "Consulting Services"}</span>
                <span>${data.items?.[0]?.amount}</span>
             </div>
             {data.items?.length > 1 && (
                 <div className="text-[10px] text-stone-400 italic">
                     + {data.items.length - 1} more items...
                 </div>
             )}
          </div>
          
          <div className="flex gap-2">
             <Button variant="outline" size="sm" className="flex-1 h-7 text-[10px]">
                 <Download className="w-3 h-3 mr-1.5" /> PDF
             </Button>
             <Button size="sm" className="flex-1 h-7 text-[10px] bg-stone-900 text-white" onClick={() => onAction?.('pay_invoice', data)}>
                 Approve
             </Button>
          </div>
       </div>
    </div>
  );
}

// 3. Credit Limit Gauge (Inline)
export function CreditLimitGauge({ data }: { data: any }) {
  const percent = Math.min(100, Math.max(0, (data.used / data.limit) * 100));
  const isWarning = percent > 80;

  return (
    <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-xs">
        <div className="flex justify-between items-end mb-2">
            <div>
                <p className="text-xs font-bold text-stone-900">Credit Line</p>
                <p className="text-[10px] text-stone-500">Net-30 Terms</p>
            </div>
            <div className={`text-right ${isWarning ? 'text-amber-600' : 'text-emerald-600'}`}>
                <span className="text-xs font-bold">${(data.limit - data.used).toLocaleString()}</span>
                <span className="text-[10px] block opacity-70">Available</span>
            </div>
        </div>
        
        <Progress value={percent} className={`h-2 ${isWarning ? 'bg-amber-100 [&>div]:bg-amber-500' : 'bg-stone-100 [&>div]:bg-stone-900'}`} />
        
        <div className="mt-1 flex justify-between text-[9px] text-stone-400 font-mono">
            <span>$0</span>
            <span>Limit: ${data.limit.toLocaleString()}</span>
        </div>
    </div>
  );
}
