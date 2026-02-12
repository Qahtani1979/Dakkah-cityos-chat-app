import { TriangleAlert, CircleCheck, Info } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import type { ConfirmationAction } from '../../types/copilot';

interface ConfirmationCardProps {
  data: Partial<ConfirmationAction> & {
    details?: Record<string, string> | Array<{ label: string; value: string }>;
    status?: string;
  };
}

const riskStyles = {
  low: {
    icon: CircleCheck,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    border: 'border-emerald-100',
  },
  medium: {
    icon: Info,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-100',
  },
  high: {
    icon: TriangleAlert,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-100',
  },
};

export function ConfirmationCard({ data, onAction }: ConfirmationCardProps & { onAction?: (action: string) => void }) {
  const level = data.riskLevel || 'low';
  const style = riskStyles[level];
  const Icon = style.icon;

  return (
    <Card className={`bg-white border ${style.border} p-5 shadow-sm`}>
      <div className="flex items-start gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full ${style.bg} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${style.color}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-stone-900 font-semibold mb-1">{data.title}</h3>
          <p className="text-sm text-stone-500">{data.description || data.status}</p>
        </div>
      </div>

      {/* Details */}
      {data.details && (
        <div className="space-y-2 mb-4 p-3 rounded-lg bg-stone-50 border border-stone-100">
          {Array.isArray(data.details) ? (
            data.details.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <span className="text-stone-500">{item.label}</span>
                <span className="text-stone-900 font-medium">{item.value}</span>
              </div>
            ))
          ) : (
            Object.entries(data.details).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between text-sm">
                <span className="text-stone-500">{key}</span>
                <span className="text-stone-900 font-medium">{value}</span>
              </div>
            ))
          )}
        </div>
      )}

      {/* Impact */}
      {data.impact && (
        <div className={`p-3 rounded-lg ${style.bg} border ${style.border} mb-4`}>
          <p className={`text-xs ${style.color}`}>{data.impact}</p>
        </div>
      )}

      {/* Actions */}
      {data.action && (
        <div className="flex gap-3">
          <Button
            className="flex-1 bg-stone-900 hover:bg-stone-800 text-white shadow-sm"
            onClick={() => onAction?.(data.action!)}
          >
            {data.action}
          </Button>
          <Button variant="outline" className="border-stone-200 text-stone-600 hover:bg-stone-50 hover:text-stone-900">
            Cancel
          </Button>
        </div>
      )}
    </Card>
  );
}
