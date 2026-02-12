import { 
  Plane, CreditCard, FileText
} from 'lucide-react';
import { Button } from '../../../ui/button';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// 19. Customs Clearance Hub (Block)
export function CustomsClearanceCard({ data, onAction }: { data: any } & ActionProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden w-full max-w-sm border-l-4 border-l-amber-500 shadow-sm border-y border-r border-stone-200">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
           <div className="flex gap-3">
              <div className="p-2 bg-amber-50 rounded-lg text-amber-600">
                 <Plane className="w-5 h-5" />
              </div>
              <div>
                 <h4 className="text-sm font-bold text-stone-900">Customs Action</h4>
                 <p className="text-[10px] text-stone-500">Held at {data.port}</p>
              </div>
           </div>
           <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
             Action Required
           </span>
        </div>

        <div className="bg-stone-50 rounded-lg p-3 space-y-3 mb-4">
           <div className="flex justify-between text-xs">
              <span className="text-stone-500">Commercial Invoice</span>
              <span className="font-mono font-bold text-stone-900">{data.invoiceValue}</span>
           </div>
           <div className="flex justify-between text-xs">
              <span className="text-stone-500">Duty Rate ({data.dutyRate}%)</span>
              <span className="font-mono text-stone-900">{data.dutyAmount}</span>
           </div>
           <div className="flex justify-between text-xs">
              <span className="text-stone-500">VAT / Tax</span>
              <span className="font-mono text-stone-900">{data.taxAmount}</span>
           </div>
           <div className="h-px bg-stone-200 w-full"></div>
           <div className="flex justify-between text-sm font-bold">
              <span className="text-stone-900">Total Payable</span>
              <span className="text-emerald-600">{data.totalDue}</span>
           </div>
        </div>

        <div className="space-y-2">
           <Button className="w-full bg-stone-900 text-white h-9 flex justify-between px-4" onClick={() => onAction?.('pay_duties', { amount: data.totalDue })}>
              <span className="flex items-center gap-2"><CreditCard className="w-3.5 h-3.5" /> Pay & Release</span>
              <span className="text-xs opacity-80">Secure Checkout</span>
           </Button>
           <Button variant="outline" className="w-full h-8 text-xs text-stone-500">
              <FileText className="w-3 h-3 mr-2" /> Upload Missing Documents
           </Button>
        </div>
      </div>
    </div>
  );
}