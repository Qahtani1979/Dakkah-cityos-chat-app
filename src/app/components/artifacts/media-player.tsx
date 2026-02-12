import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Share2 } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type { MediaItem } from '../../types/copilot';

interface MediaPlayerProps {
  data: MediaItem;
  onAction?: (action: string) => void;
  onShowDetails?: (item: MediaItem) => void;
}

export function MediaPlayer({ data, onAction, onShowDetails }: MediaPlayerProps) {
  return (
    <Card 
      className="w-full max-w-sm bg-stone-900 text-white overflow-hidden shadow-lg border-stone-800 cursor-pointer"
      onClick={() => onShowDetails?.(data)}
    >
      <div className="relative aspect-video w-full bg-stone-800 group">
        <img src={data.cover} alt={data.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Button 
            size="icon" 
            className="h-12 w-12 rounded-full bg-white text-stone-900 hover:bg-stone-200 hover:scale-105 transition-all"
            onClick={(e) => {
               e.stopPropagation();
               onAction?.(`Play ${data.title}`);
            }}
          >
            <Play className="w-5 h-5 ml-1 fill-current" />
          </Button>
        </div>
        <div className="absolute top-3 right-3 flex gap-2">
            <Button size="icon" variant="ghost" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10 rounded-full" onClick={(e) => e.stopPropagation()}>
                <Heart className="w-4 h-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10 rounded-full" onClick={(e) => e.stopPropagation()}>
                <Share2 className="w-4 h-4" />
            </Button>
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h3 className="font-bold text-lg leading-tight mb-1">{data.title}</h3>
            <p className="text-sm text-stone-400">{data.artist}</p>
          </div>
          <Badge variant="outline" className="border-stone-700 text-stone-300 text-[10px] uppercase">{data.type}</Badge>
        </div>

        <div className="space-y-2">
          <div className="h-1 bg-stone-800 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-white rounded-full" />
          </div>
          <div className="flex justify-between text-[10px] text-stone-500 font-medium font-mono">
             <span>1:12</span>
             <span>{data.duration}</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-1">
          <Volume2 className="w-4 h-4 text-stone-400" />
          <div className="flex items-center gap-4">
            <SkipBack className="w-5 h-5 text-stone-300 hover:text-white cursor-pointer" onClick={(e) => e.stopPropagation()} />
            <Play className="w-8 h-8 text-white fill-white hover:scale-105 transition-transform cursor-pointer" onClick={(e) => { e.stopPropagation(); onAction?.(`Play ${data.title}`); }} />
            <SkipForward className="w-5 h-5 text-stone-300 hover:text-white cursor-pointer" onClick={(e) => e.stopPropagation()} />
          </div>
          <div className="w-4" /> {/* Spacer */}
        </div>
      </div>
    </Card>
  );
}
