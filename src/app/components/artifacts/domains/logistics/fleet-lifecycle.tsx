import { 
  TrendingDown, TrendingUp, DollarSign, Calendar, Truck,
  Package, AlertCircle, ShoppingCart, FileText, CheckCircle2
} from 'lucide-react';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';
import { Badge } from '../../../ui/badge';
import { Separator } from '../../../ui/separator';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// 1. Asset Lifecycle & TCO (Financial View)
export function AssetLifecycleTCO({ data, onAction }: { data: any } & ActionProps) {
  // data: { id, name, purchaseDate, purchasePrice, currentValue, depreciationRate, maintenanceCostYTD, warrantyStatus }
  
  const depreciationPercent = (data.currentValue / data.purchasePrice) * 100;
  
  return (
    <div className="bg-white rounded-xl p-4 border border-stone-200 w-full max-w-sm shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-sm font-bold text-stone-900">{data.name}</h4>
          <span className="text-[10px] text-stone-500 font-mono">{data.id}</span>
        </div>
        <Badge variant={data.warrantyStatus === 'Active' ? 'default' : 'secondary'} className={data.warrantyStatus === 'Active' ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200' : ''}>
          Warranty: {data.warrantyStatus}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="space-y-1">
          <span className="text-[10px] text-stone-500 uppercase tracking-wider">Current Value</span>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-stone-400" />
            <span className="text-xl font-bold text-stone-900">{data.currentValue.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-red-500">
            <TrendingDown className="w-3 h-3" />
            <span>{data.depreciationRate}% / yr</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-stone-500 uppercase tracking-wider">Maint. Spend (YTD)</span>
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4 text-stone-400" />
            <span className="text-xl font-bold text-stone-900">{data.maintenanceCostYTD.toLocaleString()}</span>
          </div>
          <div className="text-[10px] text-stone-400">
            vs. $2,100 Budget
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-[10px] font-medium">
          <span className="text-stone-600">Lifecycle Stage</span>
          <span className="text-stone-900">{depreciationPercent > 60 ? 'Prime' : depreciationPercent > 30 ? 'Aging' : 'Replacement Due'}</span>
        </div>
        <Progress value={100 - depreciationPercent} className="h-2 bg-stone-100 [&>div]:bg-stone-800" />
        <div className="flex justify-between text-[9px] text-stone-400">
          <span>Purchased: {data.purchaseDate}</span>
          <span>Est. End: {data.replacementDate}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1 h-8 text-xs" onClick={() => onAction?.('view_valuation', { id: data.id })}>
          Valuation Report
        </Button>
        <Button size="sm" className="flex-1 h-8 text-xs bg-stone-900 text-white" onClick={() => onAction?.('initiate_disposal', { id: data.id })}>
          Sell Asset
        </Button>
      </div>
    </div>
  );
}

// 2. Parts Inventory Widget (Maintenance Dependency)
export function PartsInventoryWidget({ data, onAction }: { data: any } & ActionProps) {
  // data: { items: [{ name, sku, stock, minLevel, status }] }
  
  return (
    <div className="bg-white rounded-xl overflow-hidden border border-stone-200 w-full max-w-sm">
      <div className="bg-stone-50 p-3 border-b border-stone-200 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-stone-600" />
          <h4 className="text-xs font-bold text-stone-900">Critical Spares</h4>
        </div>
        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onAction?.('open_inventory_full')}>
          <ShoppingCart className="w-3.5 h-3.5 text-stone-400" />
        </Button>
      </div>

      <div className="divide-y divide-stone-100">
        {data.items.map((item: any, i: number) => {
          const isLow = item.stock <= item.minLevel;
          return (
            <div key={i} className="p-3 flex items-center justify-between hover:bg-stone-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isLow ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`} />
                <div>
                  <div className="text-xs font-bold text-stone-900">{item.name}</div>
                  <div className="text-[10px] text-stone-500 font-mono">{item.sku}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-sm font-bold ${isLow ? 'text-red-600' : 'text-stone-900'}`}>
                  {item.stock} <span className="text-[10px] font-normal text-stone-400">/ {item.minLevel}</span>
                </div>
                {isLow && (
                  <button 
                    className="text-[9px] font-bold text-blue-600 hover:underline mt-0.5"
                    onClick={() => onAction?.('reorder_part', { sku: item.sku })}
                  >
                    REORDER
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 3. Procurement Request (Growth Workflow)
export function ProcurementRequest({ data, onAction }: { data: any } & ActionProps) {
  // data: { budgetRemaining, pendingRequests: number }
  
  return (
    <div className="bg-stone-900 rounded-xl p-4 text-white w-full max-w-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 p-3 opacity-10">
        <Truck className="w-24 h-24" />
      </div>

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <FileText className="w-5 h-5 text-emerald-400" />
          <h4 className="text-sm font-bold">Asset Procurement</h4>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <span className="text-[10px] text-stone-400 block mb-1">Q4 CapEx Budget</span>
            <span className="text-lg font-bold text-white">{data.budgetRemaining}</span>
          </div>
          <div>
            <span className="text-[10px] text-stone-400 block mb-1">Pending Approval</span>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-bold text-amber-400">{data.pendingRequests}</span>
              <span className="text-[10px] text-stone-500">requests</span>
            </div>
          </div>
        </div>

        <Button className="w-full bg-white text-stone-900 hover:bg-stone-100 font-bold" onClick={() => onAction?.('new_procurement')}>
          + New Vehicle Request
        </Button>
      </div>
    </div>
  );
}