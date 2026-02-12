import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import type { ZoneData } from '../../types/copilot';

interface ZoneHeatmapProps {
  data: {
    zones: ZoneData[];
  };
}

export function ZoneHeatmap({ data }: ZoneHeatmapProps) {
  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-emerald-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-rose-500" />;
      case 'stable':
        return <Minus className="w-4 h-4 text-stone-400" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-emerald-600';
    if (score >= 70) return 'text-stone-700';
    return 'text-amber-600';
  };

  return (
    <Card className="bg-white border-stone-100 p-5 shadow-sm">
      <div className="mb-5">
        <h3 className="text-stone-900 font-semibold mb-1">Zone Experience Scores</h3>
        <p className="text-xs text-stone-500">Real-time intelligence across the city</p>
      </div>

      <div className="space-y-4">
        {data.zones.map((zone) => (
          <div
            key={zone.id}
            className="p-4 rounded-xl bg-stone-50 border border-stone-200 hover:border-stone-300 transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-stone-900 font-medium">{zone.name}</h4>
                  {getTrendIcon(zone.trend)}
                </div>
                <p className="text-xs text-stone-500">Click to explore experiences</p>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${getScoreColor(zone.score)}`}>
                  {zone.score}
                </div>
                <p className="text-[10px] text-stone-400 uppercase tracking-wide font-medium">Score</p>
              </div>
            </div>

            {/* Factor Breakdown */}
            {zone.factors ? (
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-stone-500">Vibes</span>
                  <span className="text-stone-700 font-medium">{zone.factors.vibes || 0}/100</span>
                </div>
                <Progress value={zone.factors.vibes || 0} className="h-1.5 bg-stone-200" />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-stone-500">Activity</span>
                  <span className="text-stone-700 font-medium">{zone.factors.activity || 0}/100</span>
                </div>
                <Progress value={zone.factors.activity || 0} className="h-1.5 bg-stone-200" />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-stone-500">Safety</span>
                  <span className="text-stone-700 font-medium">{zone.factors.safety || 0}/100</span>
                </div>
                <Progress value={zone.factors.safety || 0} className="h-1.5 bg-stone-200" />
              </div>
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-stone-500">Events</span>
                  <span className="text-stone-700 font-medium">{zone.factors.events || 0}/100</span>
                </div>
                <Progress value={zone.factors.events || 0} className="h-1.5 bg-stone-200" />
              </div>
            </div>
            ) : (
                <div className="text-xs text-stone-400 italic py-2">Detailed metrics unavailable</div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
