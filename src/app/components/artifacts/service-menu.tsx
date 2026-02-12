import { Clock, ChevronRight, Check } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import type { ServiceItem } from '../../types/copilot';

interface ServiceMenuProps {
  data: {
    title: string;
    items: ServiceItem[];
  };
  onAction?: (action: string) => void;
  onShowDetails?: (service: ServiceItem) => void;
}

export function ServiceMenu({ data, onAction, onShowDetails }: ServiceMenuProps) {
  return (
    <Card className="w-full max-w-full bg-white border-stone-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-stone-100 bg-stone-50/50">
        <h3 className="font-semibold text-stone-900">{data.title}</h3>
      </div>
      <div className="divide-y divide-stone-100">
        {data.items.map((item) => (
          <div 
            key={item.id} 
            className="p-4 hover:bg-stone-50 transition-colors cursor-pointer group"
            onClick={() => onShowDetails ? onShowDetails(item) : onAction?.(`Selected Service: ${item.name}`)}
          >
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-medium text-stone-900">{item.name}</h4>
              <span className="font-semibold text-stone-900">{item.price}</span>
            </div>
            <p className="text-xs text-stone-500 line-clamp-2 mb-2">{item.description}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-xs text-stone-400">
                <Clock className="w-3 h-3 mr-1" />
                {item.duration}
              </div>
              <Button 
                 size="sm" 
                 variant="ghost" 
                 className="h-6 px-2 text-stone-400 group-hover:text-stone-900 group-hover:bg-white border border-transparent group-hover:border-stone-200 shadow-none group-hover:shadow-sm"
                 onClick={(e) => {
                     e.stopPropagation();
                     onAction?.(`Selected Service: ${item.name}`);
                 }}
              >
                Select <ChevronRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}