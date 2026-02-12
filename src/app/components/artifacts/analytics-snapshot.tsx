import { TrendingUp, TrendingDown, Minus, ArrowUpRight } from 'lucide-react';
import { Card } from '../ui/card';
import type { AnalyticsData } from '../../types/copilot';

interface AnalyticsSnapshotProps {
  data: AnalyticsData;
  onShowDetails?: (data: AnalyticsData) => void;
}

export function AnalyticsSnapshot({ data, onShowDetails }: AnalyticsSnapshotProps) {
  return (
    <Card 
      className="w-full max-w-sm bg-white p-4 border-stone-200 shadow-sm space-y-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={() => onShowDetails?.(data)}
    >
      <div className="flex justify-between items-center">
         <h3 className="text-sm font-semibold text-stone-900 uppercase tracking-wide">{data.title}</h3>
         <ArrowUpRight className="w-4 h-4 text-stone-400" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {data.metrics.map((metric, idx) => (
          <div key={idx} className="space-y-1">
            <p className="text-xs text-stone-500">{metric.label}</p>
            <p className="text-xl font-bold text-stone-900">{metric.value}</p>
            {metric.trend && (
              <div className={`flex items-center text-xs font-medium ${
                metric.trend === 'up' ? 'text-emerald-600' : 
                metric.trend === 'down' ? 'text-rose-600' : 'text-stone-400'
              }`}>
                {metric.trend === 'up' && <TrendingUp className="w-3 h-3 mr-1" />}
                {metric.trend === 'down' && <TrendingDown className="w-3 h-3 mr-1" />}
                {metric.trend === 'neutral' && <Minus className="w-3 h-3 mr-1" />}
                {metric.trendValue}
              </div>
            )}
          </div>
        ))}
      </div>

      {data.chartImage && (
        <div className="h-16 w-full mt-2 opacity-50 grayscale hover:grayscale-0 transition-all">
           <img src={data.chartImage} alt="Chart" className="w-full h-full object-cover rounded-md" />
        </div>
      )}
    </Card>
  );
}