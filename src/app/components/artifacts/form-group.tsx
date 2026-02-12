import { Check, Circle } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import type { FormData } from '../../types/copilot';

interface FormGroupProps {
  data: FormData;
  onAction?: (action: string) => void;
}

export function FormGroup({ data, onAction }: FormGroupProps) {
  return (
    <Card className="w-full max-w-sm bg-white border-stone-200 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-stone-100">
        <h3 className="font-semibold text-stone-900">{data.title}</h3>
      </div>
      <div className="p-2">
        {data.options.map((option) => (
          <div 
            key={option.id}
            className="flex items-center justify-between p-3 hover:bg-stone-50 rounded-lg cursor-pointer transition-colors group"
            onClick={() => onAction?.(`Selected option: ${option.value}`)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-${data.type === 'radio' ? 'full' : 'md'} border border-stone-300 flex items-center justify-center group-hover:border-stone-900`}>
                {/* Simulate unchecked state unless clicked (controlled by logic) */}
              </div>
              <span className="text-sm font-medium text-stone-700">{option.label}</span>
            </div>
            {option.price && (
              <span className="text-xs font-semibold text-stone-500">{option.price}</span>
            )}
          </div>
        ))}
      </div>
      <div className="p-4 pt-0">
        <Button className="w-full bg-stone-900 hover:bg-stone-800 text-white" onClick={() => onAction?.('Options confirmed')}>
          Confirm Selection
        </Button>
      </div>
    </Card>
  );
}
