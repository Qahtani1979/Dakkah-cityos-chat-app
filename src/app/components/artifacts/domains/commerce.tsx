import { useState, useEffect } from 'react';
import { ShoppingCart, Star, Clock, Zap, ShieldCheck, Filter, X } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// 1. Flash Sale Countdown (Inline)
export function FlashSaleCountdown({ data, onAction }: { data: any } & ActionProps) {
  const [timeLeft, setTimeLeft] = useState(data.secondsRemaining || 3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev: number) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl p-3 text-white w-full max-w-xs shadow-lg relative overflow-hidden">
       {/* Background Pattern */}
       <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
       
       <div className="relative z-10 flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 font-bold italic">
             <Zap className="w-4 h-4 fill-yellow-300 text-yellow-300" />
             FLASH SALE
          </div>
          <div className="font-mono font-bold bg-black/20 px-2 py-0.5 rounded text-sm">
             {formatTime(timeLeft)}
          </div>
       </div>

       <div className="relative bg-white/10 rounded-lg p-2 flex gap-3 items-center backdrop-blur-sm">
          <img src={data.image} alt="Product" className="w-12 h-12 bg-white rounded object-cover" />
          <div className="flex-1 min-w-0">
             <p className="text-xs font-medium truncate text-white">{data.name}</p>
             <div className="flex items-center gap-2 mt-0.5">
                 <span className="text-sm font-bold text-white">${data.price}</span>
                 <span className="text-[10px] text-pink-200 line-through">${data.originalPrice}</span>
             </div>
          </div>
          <Button size="sm" className="h-7 w-7 p-0 rounded-full bg-white text-rose-600 hover:bg-white/90" onClick={() => onAction?.('add_to_cart', data)}>
              <ShoppingCart className="w-3.5 h-3.5" />
          </Button>
       </div>
    </div>
  );
}

// 2. Comparison Grid (Block)
export function ComparisonGrid({ data }: { data: any }) {
  const products = data?.products || [];
  const features = data?.features || [];

  if (!products.length || !features.length) {
    return (
      <div className="bg-white rounded-xl border border-stone-200 p-4 w-full max-w-lg text-center text-stone-400 text-xs">
        No comparison data available
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-stone-200 overflow-hidden w-full max-w-full">
       <div className="overflow-x-auto scrollbar-hide">
         <div className="min-w-[320px]">
           <div className="grid grid-cols-4 bg-stone-50 border-b border-stone-200 text-[10px] font-bold text-stone-500 uppercase tracking-wider">
              <div className="p-3 sticky left-0 bg-stone-50 z-10 border-r border-stone-200">Feature</div>
              {products.map((p: any) => (
                  <div key={p.id} className="p-3 text-center border-l border-stone-200 min-w-[60px] truncate">{p.name}</div>
              ))}
           </div>
           
           {features.map((feature: any, i: number) => (
               <div key={i} className="grid grid-cols-4 text-xs border-b border-stone-100 last:border-0">
                   <div className="p-3 font-medium text-stone-600 bg-stone-50/50 sticky left-0 border-r border-stone-100 truncate">{feature.name}</div>
                   {products.map((p: any, j: number) => {
                       const val = p.features?.[feature.key];
                       const isBool = typeof val === 'boolean';
                       return (
                           <div key={j} className="p-3 text-center border-l border-stone-100 flex items-center justify-center text-stone-800">
                               {isBool ? (val ? <CheckCircle className="w-4 h-4 text-emerald-500" /> : '-') : val || '-'}
                           </div>
                       );
                   })}
               </div>
           ))}
         </div>
       </div>
    </div>
  );
}

function CheckCircle(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
}

// 3. Product Card (Refined)
export function ProductCard({ data, onAction }: { data: any } & ActionProps) {
    return (
        <div className="w-40 flex-shrink-0 bg-white rounded-xl border border-stone-200 overflow-hidden snap-start">
            <div className="relative aspect-square">
                <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
                {data.discount && (
                    <Badge className="absolute top-2 left-2 bg-rose-500 hover:bg-rose-600 text-[10px] h-5 px-1.5">
                        -{data.discount}%
                    </Badge>
                )}
            </div>
            <div className="p-2.5">
                <div className="flex items-center gap-1 mb-1">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-[10px] font-medium text-stone-500">{data.rating}</span>
                </div>
                <h4 className="text-xs font-bold text-stone-900 truncate mb-2">{data.name}</h4>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-stone-900">${data.price}</span>
                    <Button size="icon" className="h-6 w-6 rounded-full bg-stone-900 text-white" onClick={() => onAction?.('add_to_cart', data)}>
                        <ShoppingCart className="w-3 h-3" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

// 4. Vendor Trust Profile (Inline)
export function VendorTrustProfile({ data, onAction }: { data: any } & ActionProps) {
    // data: { name: 'TechHaven', rating: 4.9, verified: true, responseTime: '< 1hr', sales: '10k+' }
    if (!data) return null;
    const name = data.name || 'Vendor';

    return (
        <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-xs cursor-pointer hover:bg-stone-50" onClick={() => onAction?.('view_store', data)}>
            <div className="flex items-center gap-3">
                 <div className="relative">
                     <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center font-bold text-stone-600 overflow-hidden">
                         {data.logo ? <img src={data.logo} className="w-full h-full object-cover" /> : name.substring(0,1)}
                     </div>
                     {data.verified && (
                         <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full">
                             <ShieldCheck className="w-4 h-4 text-blue-500 fill-blue-50" />
                         </div>
                     )}
                 </div>
                 
                 <div className="flex-1 min-w-0">
                     <div className="flex items-center gap-1.5">
                         <h4 className="text-sm font-bold text-stone-900 truncate">{name}</h4>
                         <span className="text-[10px] bg-stone-100 text-stone-500 px-1.5 rounded-full">{data.sales || 'New'} Sold</span>
                     </div>
                     <div className="flex items-center gap-2 text-[10px] text-stone-500 mt-0.5">
                         <span className="flex items-center gap-0.5"><Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {data.rating || 'N/A'}</span>
                         <span>•</span>
                         <span>Replies {data.responseTime || 'Soon'}</span>
                     </div>
                 </div>
            </div>
        </div>
    );
}

// 5. Smart Filter Chips (Inline)
export function SmartFilterChips({ data, onAction }: { data: any } & ActionProps) {
    const [activeFilters, setActiveFilters] = useState<string[]>(data.selected || []);

    const toggleFilter = (id: string) => {
        const newFilters = activeFilters.includes(id) 
            ? activeFilters.filter(f => f !== id)
            : [...activeFilters, id];
        setActiveFilters(newFilters);
        onAction?.('filter_change', newFilters);
    };

    const filters = data?.filters || [];

    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar w-full max-w-md">
             <div className="flex-shrink-0 w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                 <Filter className="w-3 h-3" />
             </div>
             {filters.map((filter: any, index: number) => {
                 // Handle string filters or object filters
                 const id = typeof filter === 'string' ? filter : filter.id;
                 const label = typeof filter === 'string' ? filter : filter.label;
                 const isActive = activeFilters.includes(id);
                 
                 return (
                     <button
                        key={id || index}
                        onClick={() => toggleFilter(id)}
                        className={`flex-shrink-0 px-2.5 py-1 rounded-full text-[10px] font-medium transition-colors flex items-center gap-1 border ${
                            isActive 
                            ? 'bg-stone-900 text-white border-stone-900' 
                            : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-50'
                        }`}
                     >
                        {label}
                        {isActive && <X className="w-2.5 h-2.5" />}
                     </button>
                 );
             })}
        </div>
    );
}