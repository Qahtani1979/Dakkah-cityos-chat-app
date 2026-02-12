import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Heart, MessageCircle, Trophy, Medal } from 'lucide-react';
import { Button } from '../../ui/button';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// 1. Mini Video Feed (Block)
export function MiniVideoFeed({ data }: { data: any }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  return (
    <div className="relative w-full max-w-[240px] aspect-[9/16] bg-black rounded-xl overflow-hidden shadow-lg group">
       {/* Video Placeholder (Image for now to avoid loading heavy assets in demo) */}
       <img src={data.thumbnail} alt="Video" className="w-full h-full object-cover opacity-80" />
       
       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80"></div>
       
       {/* Controls Overlay */}
       <div className="absolute top-3 right-3 flex flex-col gap-2">
           <button onClick={() => setMuted(!muted)} className="w-8 h-8 rounded-full bg-black/40 backdrop-blur text-white flex items-center justify-center hover:bg-black/60">
               {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
           </button>
       </div>
       
       <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={() => setPlaying(!playing)}>
           {!playing && (
               <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center text-white ring-1 ring-white/50">
                   <Play className="w-5 h-5 ml-1 fill-white" />
               </div>
           )}
       </div>

       <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
           <div className="flex items-center gap-2 mb-2">
               <img src={data.creatorAvatar} className="w-6 h-6 rounded-full border border-white" alt="Creator" />
               <span className="text-xs font-bold shadow-black drop-shadow-md">{data.creatorName}</span>
           </div>
           <p className="text-xs leading-snug line-clamp-2 mb-3 drop-shadow-md">{data.caption}</p>
           
           <div className="flex items-center justify-between mt-2">
                <Button size="sm" variant="ghost" className="h-8 text-white hover:bg-white/20 gap-1.5 px-2">
                    <Heart className="w-4 h-4" /> {data.likes}
                </Button>
                <Button size="sm" variant="ghost" className="h-8 text-white hover:bg-white/20 gap-1.5 px-2">
                    <MessageCircle className="w-4 h-4" /> {data.comments}
                </Button>
           </div>
       </div>
    </div>
  );
}

// 2. Gamification Scoreboard (Inline)
export function GamificationScoreboard({ data }: { data: any }) {
  const rankings = data?.rankings || [];
  return (
    <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-xs">
        <div className="flex items-center justify-between mb-3">
             <div className="flex items-center gap-2">
                 <Trophy className="w-4 h-4 text-amber-500" />
                 <span className="text-xs font-bold text-stone-900">{data?.event || 'Leaderboard'}</span>
             </div>
             <span className="text-[10px] bg-stone-100 text-stone-500 px-1.5 py-0.5 rounded font-mono">LIVE</span>
        </div>
        
        <div className="space-y-2">
            {rankings.map((rank: any, i: number) => {
                const isFirst = i === 0;
                return (
                    <div key={i} className={`flex items-center gap-3 p-2 rounded-lg ${isFirst ? 'bg-amber-50 border border-amber-100' : 'bg-white'}`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${isFirst ? 'bg-amber-100 text-amber-600' : 'bg-stone-100 text-stone-500'}`}>
                            {i + 1}
                        </div>
                        <div className="flex-1 min-w-0 flex items-center gap-2">
                             <img src={rank.avatar} className="w-5 h-5 rounded-full bg-stone-200" alt={rank.name} />
                             <span className="text-xs font-medium text-stone-900 truncate">{rank.name}</span>
                        </div>
                        <span className="text-xs font-bold text-stone-900 font-mono">{rank.score}</span>
                        {isFirst && <Medal className="w-3.5 h-3.5 text-amber-500" />}
                    </div>
                )
            })}
        </div>
    </div>
  );
}
