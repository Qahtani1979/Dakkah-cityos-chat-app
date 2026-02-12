import { Home, Hammer, CheckCircle2, Bed, Bath, Move } from 'lucide-react';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// 1. Property Listing (Block)
export function PropertyListing({ data, onAction }: { data: any } & ActionProps) {
    return (
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden w-full max-w-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => onAction?.('view_property', data)}>
            <div className="relative aspect-video bg-stone-100">
                <img src={data.image} alt={data.address} className="w-full h-full object-cover" />
                <Badge className="absolute top-2 right-2 bg-stone-900 text-white border-0">
                    ${data.price}/mo
                </Badge>
            </div>
            
            <div className="p-3">
                <h4 className="text-sm font-bold text-stone-900 mb-1">{data.address}</h4>
                <p className="text-xs text-stone-500 mb-3">{data.neighborhood}</p>
                
                <div className="flex items-center gap-4 text-xs text-stone-600 font-medium">
                    <div className="flex items-center gap-1">
                        <Bed className="w-3.5 h-3.5 text-stone-400" />
                        {data.beds} Beds
                    </div>
                    <div className="flex items-center gap-1">
                        <Bath className="w-3.5 h-3.5 text-stone-400" />
                        {data.baths} Bath
                    </div>
                    <div className="flex items-center gap-1">
                        <Move className="w-3.5 h-3.5 text-stone-400" />
                        {data.sqft} sqft
                    </div>
                </div>
            </div>
        </div>
    );
}

// 2. Maintenance Request (Inline)
export function MaintenanceRequest({ data, onAction }: { data: any } & ActionProps) {
    const statusColor = data.status === 'Open' ? 'text-blue-600 bg-blue-50' : data.status === 'In Progress' ? 'text-amber-600 bg-amber-50' : 'text-emerald-600 bg-emerald-50';
    
    return (
        <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-xs">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <Hammer className="w-4 h-4 text-stone-400" />
                    <span className="text-xs font-bold text-stone-900">Maintenance</span>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusColor}`}>
                    {data.status}
                </span>
            </div>
            
            <h5 className="text-xs font-medium text-stone-800 mb-1">{data.title}</h5>
            <p className="text-[10px] text-stone-500 line-clamp-2 mb-3">{data.description}</p>
            
            <div className="flex gap-2">
                <Button variant="outline" size="sm" className="h-7 text-[10px] flex-1">Details</Button>
                {data.status === 'Resolved' && (
                     <Button size="sm" className="h-7 text-[10px] bg-stone-900 text-white flex-1" onClick={() => onAction?.('close_ticket', data)}>
                         Close Ticket
                     </Button>
                )}
            </div>
        </div>
    );
}
