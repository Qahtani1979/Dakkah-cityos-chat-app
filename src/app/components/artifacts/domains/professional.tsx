import { UserCheck, Clock, FileText, Briefcase, Play, Pause } from 'lucide-react';
import { Button } from '../../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { useState, useEffect } from 'react';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// 1. Freelancer Card (Inline)
export function FreelancerCard({ data, onAction }: { data: any } & ActionProps) {
    return (
        <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-xs">
            <div className="flex items-start justify-between gap-3 mb-3">
                 <Avatar className="w-10 h-10 border border-stone-200">
                     <AvatarImage src={data.avatar} />
                     <AvatarFallback>FL</AvatarFallback>
                 </Avatar>
                 <div className="flex-1 min-w-0">
                     <div className="flex items-center justify-between">
                         <h4 className="text-xs font-bold text-stone-900 truncate">{data.name}</h4>
                         <span className="text-[10px] font-bold text-stone-900 bg-stone-100 px-1.5 py-0.5 rounded">${data.rate}/hr</span>
                     </div>
                     <p className="text-[10px] text-stone-500 truncate">{data.role}</p>
                     <div className="flex gap-1 mt-1">
                         {data.skills?.slice(0, 2).map((s: string) => (
                             <span key={s} className="text-[9px] bg-stone-50 text-stone-500 border border-stone-100 px-1 py-px rounded">{s}</span>
                         ))}
                     </div>
                 </div>
            </div>
            <Button className="w-full h-8 text-xs bg-stone-900 text-white" onClick={() => onAction?.('hire_freelancer', data)}>
                Message & Hire
            </Button>
        </div>
    );
}

// 2. Consultation Timer (Inline)
export function ConsultationTimer({ data }: { data: any }) {
    const [seconds, setSeconds] = useState(data.elapsedSeconds || 0);
    const [isActive, setIsActive] = useState(data.active || false);

    useEffect(() => {
        let interval: any;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds((s: number) => s + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive]);

    const formatTime = (totalSeconds: number) => {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor((totalSeconds % 3600) / 60);
        const s = totalSeconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-stone-900 rounded-xl p-3 text-white w-full max-w-xs">
             <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2">
                     <Clock className="w-4 h-4 text-emerald-400" />
                     <span className="text-xs font-bold text-stone-200">Consultation</span>
                 </div>
                 <Badge variant="outline" className={`border-0 text-[10px] h-5 ${isActive ? 'bg-emerald-500/20 text-emerald-400 animate-pulse' : 'bg-stone-700 text-stone-400'}`}>
                     {isActive ? 'Active' : 'Paused'}
                 </Badge>
             </div>
             
             <div className="text-center mb-4">
                 <div className="text-3xl font-mono font-bold tracking-wider tabular-nums">
                     {formatTime(seconds)}
                 </div>
                 <div className="text-[10px] text-stone-400 mt-1">
                     Estimated Cost: <span className="text-white font-bold">${((seconds / 3600) * (data.rate || 100)).toFixed(2)}</span>
                 </div>
             </div>

             <div className="grid grid-cols-2 gap-2">
                 <Button size="sm" variant="ghost" className="h-8 text-xs bg-stone-800 hover:bg-stone-700 text-white" onClick={() => setIsActive(!isActive)}>
                     {isActive ? <Pause className="w-3.5 h-3.5 mr-1.5" /> : <Play className="w-3.5 h-3.5 mr-1.5" />}
                     {isActive ? 'Pause' : 'Resume'}
                 </Button>
                 <Button size="sm" className="h-8 text-xs bg-red-600 hover:bg-red-700 text-white">
                     End Session
                 </Button>
             </div>
        </div>
    );
}

// 3. Document Scanner (Block)
export function DocumentScanner({ data, onAction }: { data: any } & ActionProps) {
    return (
        <div className="bg-stone-50 border border-stone-200 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-stone-100 transition-colors">
            <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mb-3">
                <FileText className="w-6 h-6 text-stone-400" />
            </div>
            <h4 className="text-sm font-bold text-stone-900 mb-1">Scan Document</h4>
            <p className="text-xs text-stone-500 mb-4 max-w-[200px]">Position document in frame. We'll extract the text automatically.</p>
            <Button size="sm" className="bg-stone-900 text-white text-xs" onClick={() => onAction?.('scan_document', {})}>
                Open Camera
            </Button>
        </div>
    );
}
