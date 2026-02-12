import { Users, Monitor, Briefcase, FileSignature, CheckSquare, Shield } from 'lucide-react';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';

interface ActionProps {
  onAction?: (action: string, payload?: any) => void;
}

// 1. HR Onboarding Task (Inline)
export function HROnboardingTask({ data, onAction }: { data: any } & ActionProps) {
    if (!data) return null;
    // data: { candidate: 'Alice Smith', step: 'Contract Signing', progress: 60 }
    const candidate = data.candidate || 'Unknown';

    return (
        <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-xs">
            <div className="flex items-center gap-3 mb-3">
                 <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold border border-indigo-100 overflow-hidden">
                     {candidate.substring(0, 2).toUpperCase()}
                 </div>
                 <div className="flex-1 min-w-0">
                     <h4 className="text-xs font-bold text-stone-900 truncate">{candidate}</h4>
                     <p className="text-[10px] text-stone-500">New Hire • Engineering</p>
                 </div>
            </div>
            
            <div className="bg-stone-50 rounded-lg p-2 mb-3 border border-stone-100">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-[10px] font-bold text-stone-700">{data.step || 'Pending'}</span>
                    <span className="text-[9px] text-stone-400">{data.progress || 0}%</span>
                </div>
                <Progress value={data.progress || 0} className="h-1.5 bg-white [&>div]:bg-indigo-500" />
            </div>

            <Button className="w-full h-8 text-xs bg-stone-900 text-white gap-2" onClick={() => onAction?.('review_doc', data)}>
                <FileSignature className="w-3.5 h-3.5" />
                Review & Sign
            </Button>
        </div>
    );
}

// 2. Digital Signage Preview (Block)
export function DigitalSignagePreview({ data }: { data: any }) {
    return (
        <div className="bg-stone-900 rounded-xl overflow-hidden w-full max-w-sm border border-stone-800">
            <div className="p-3 bg-stone-950 flex justify-between items-center border-b border-stone-800">
                <div className="flex items-center gap-2 text-white">
                    <Monitor className="w-4 h-4 text-purple-400" />
                    <span className="text-xs font-bold">{data.screenId || 'Lobby Screen'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] text-stone-400">Online</span>
                </div>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center overflow-hidden group cursor-pointer">
                {/* Simulated Screen Content */}
                <div className="absolute inset-0 bg-cover bg-center flex flex-col items-center justify-center text-center p-6 transition-transform duration-500 group-hover:scale-105"
                     style={{ 
                         backgroundImage: data.image ? `url('${data.image}')` : undefined,
                         background: !data.image ? 'linear-gradient(to bottom right, #312e81, #581c87)' : undefined
                     }}
                >
                     {data.image && <div className="absolute inset-0 bg-black/40"></div>}
                     <div className="relative z-10">
                        <h1 className="text-xl font-bold text-white mb-2">{data.campaign || 'Welcome'}</h1>
                        <p className="text-xs text-indigo-100">{data.subtext || 'Event in progress'}</p>
                     </div>
                     <div className="mt-4 flex gap-2 relative z-10">
                         <div className="w-8 h-8 rounded bg-white/10 backdrop-blur"></div>
                         <div className="w-8 h-8 rounded bg-white/10 backdrop-blur"></div>
                         <div className="w-8 h-8 rounded bg-white/10 backdrop-blur"></div>
                     </div>
                </div>
                
                {/* Overlay Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end opacity-0 group-hover:opacity-100 transition-opacity">
                     <div className="text-[9px] text-stone-300">
                         Playlist: <span className="text-white font-bold">Corp_Events_V2</span>
                     </div>
                     <Button size="sm" variant="secondary" className="h-6 text-[10px] px-2">Change Content</Button>
                </div>
            </div>
        </div>
    );
}

// 3. Asset Tracker (Inline)
export function InventoryAssetTracker({ data, onAction }: { data: any } & ActionProps) {
    return (
        <div className="bg-white rounded-xl p-3 border border-stone-200 w-full max-w-xs">
            <div className="flex items-start justify-between mb-2">
                 <div className="flex items-center gap-2">
                     <div className="p-1.5 bg-stone-100 rounded text-stone-600">
                         <Briefcase className="w-4 h-4" />
                     </div>
                     <div>
                         <h4 className="text-xs font-bold text-stone-900">{data.assetName}</h4>
                         <p className="text-[10px] font-mono text-stone-400">{data.serialNumber}</p>
                     </div>
                 </div>
                 <div className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${data.status === 'Assigned' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                     {data.status}
                 </div>
            </div>
            
            <div className="flex items-center gap-2 bg-stone-50 p-2 rounded mb-3">
                 <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center text-[10px] font-bold text-stone-600">
                     {data.assignedTo?.substring(0,2) || '--'}
                 </div>
                 <span className="text-xs text-stone-700 truncate flex-1">{data.assignedTo || 'Unassigned'}</span>
                 {data.status === 'Assigned' && (
                     <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
                 )}
            </div>

            <Button variant="outline" className="w-full h-7 text-[10px]" onClick={() => onAction?.('view_asset_history', data)}>
                View History
            </Button>
        </div>
    );
}
