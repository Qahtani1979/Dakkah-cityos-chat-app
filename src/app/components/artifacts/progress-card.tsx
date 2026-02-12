import { Trophy, Target, Zap, Award } from 'lucide-react';
import { Card } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';

interface ProgressCardProps {
  data: {
    currentLevel: number;
    currentXP: number;
    nextLevelXP: number;
    badges: {
      name: string;
      earned: boolean;
    }[];
    activeMissions: {
      title: string;
      progress: number;
      total: number;
      reward: string;
    }[];
  };
}

export function ProgressCard({ data }: ProgressCardProps) {
  if (!data) return null;
  const currentLevel = data.currentLevel || 1;
  const currentXP = data.currentXP || 0;
  const nextLevelXP = data.nextLevelXP || 100;

  const xpProgress = (currentXP / nextLevelXP) * 100;
  const xpRemaining = nextLevelXP - currentXP;
  
  const badges = data.badges || [];
  const activeMissions = data.activeMissions || [];

  return (
    <Card className="bg-white border-stone-100 p-5 shadow-sm">
      {/* Level Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-stone-900 flex items-center justify-center shadow-md">
              <Trophy className="w-6 h-6 text-stone-50" />
            </div>
            <div>
              <h3 className="text-stone-900 font-bold text-lg">Level {currentLevel}</h3>
              <p className="text-xs text-stone-500 font-medium">{xpRemaining} XP to Level {currentLevel + 1}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-mono font-medium text-stone-900">{currentXP.toLocaleString()}</div>
            <p className="text-[10px] text-stone-400 uppercase tracking-wide">Total XP</p>
          </div>
        </div>
        <Progress value={xpProgress} className="h-2 bg-stone-100" />
      </div>

      {/* Badges */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-4 h-4 text-stone-400" />
          <h4 className="text-sm font-semibold text-stone-700">Badges</h4>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {badges.map((badge) => (
            <div
              key={badge.name}
              className={`p-3 rounded-lg border transition-all ${
                badge.earned
                  ? 'bg-stone-50 border-stone-200'
                  : 'bg-stone-50/50 border-stone-100 opacity-60'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  badge.earned ? 'bg-white border border-stone-200 shadow-sm' : 'bg-stone-100'
                }`}>
                  <Award className={`w-4 h-4 ${badge.earned ? 'text-stone-700' : 'text-stone-300'}`} />
                </div>
                <span className={`text-xs font-medium ${badge.earned ? 'text-stone-700' : 'text-stone-400'}`}>
                  {badge.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Missions */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Target className="w-4 h-4 text-stone-400" />
          <h4 className="text-sm font-semibold text-stone-700">Active Missions</h4>
        </div>
        <div className="space-y-3">
          {activeMissions.map((mission, index) => (
            <div
              key={index}
              className="p-3 rounded-lg bg-stone-50 border border-stone-100"
            >
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm text-stone-800 font-medium flex-1">{mission.title}</p>
                <Badge className="bg-white border border-stone-200 text-stone-600 text-[10px] ml-2 shadow-sm">
                  <Zap className="w-3 h-3 mr-1 text-amber-500 fill-amber-500" />
                  {mission.reward}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <Progress
                  value={(mission.progress / mission.total) * 100}
                  className="h-1.5 flex-1 bg-stone-200"
                />
                <span className="text-xs text-stone-500 font-mono">
                  {mission.progress}/{mission.total}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
