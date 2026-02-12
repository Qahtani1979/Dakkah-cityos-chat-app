import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import type { OrderStatus } from '../../types/copilot';

interface OrderTrackerProps {
  data: OrderStatus;
  onClick?: () => void;
}

export function OrderTracker({ data, onClick }: OrderTrackerProps) {
  const steps = [
    { id: 'confirmed', label: 'Confirmed', icon: CheckCircle },
    { id: 'preparing', label: 'Preparing', icon: Package },
    { id: 'on-the-way', label: 'On Way', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: Clock }, // Clock as placeholder for done
  ];

  if (!data) return null;

  const currentStepIndex = steps.findIndex(s => s.id === data.status);
  const items = data.items || [];

  return (
    <Card 
      className="w-full max-w-sm bg-white p-5 border-stone-200 shadow-sm space-y-6 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
           <p className="text-xs text-stone-400 font-medium uppercase tracking-wider">Order #{data.orderNumber}</p>
           <h3 className="text-lg font-bold text-stone-900 mt-1">Est. {data.estimatedTime}</h3>
        </div>
        <Badge variant={data.status === 'delivered' ? 'default' : 'secondary'} className="capitalize">
          {data.status?.replace('-', ' ')}
        </Badge>
      </div>

      {/* Progress Bar */}
      <div className="relative flex justify-between items-center z-0">
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-stone-100 -z-10" />
        <div 
           className="absolute top-1/2 left-0 h-0.5 bg-emerald-500 -z-10 transition-all duration-1000" 
           style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
        />
        
        {steps.map((step, idx) => {
          const isCompleted = idx <= currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          
          return (
            <div key={step.id} className="flex flex-col items-center gap-2 bg-white px-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                isCompleted ? 'bg-emerald-500 text-white shadow-emerald-200 shadow-md' : 'bg-stone-100 text-stone-400'
              }`}>
                <step.icon className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-medium ${isCurrent ? 'text-stone-900' : 'text-stone-400'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Order Items Summary */}
      <div className="bg-stone-50 rounded-lg p-3 space-y-2 border border-stone-100">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between text-xs text-stone-600">
            <span>{item}</span>
          </div>
        ))}
        <div className="border-t border-stone-200 pt-2 flex justify-between font-semibold text-sm text-stone-900">
          <span>Total</span>
          <span>{data.total}</span>
        </div>
      </div>
    </Card>
  );
}
