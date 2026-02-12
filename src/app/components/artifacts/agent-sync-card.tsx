import { useState, useEffect } from 'react';
import { Loader2, Check, CheckCheck, Users, Car, Utensils, Ticket, Zap, Sparkles, AlertTriangle, XCircle, ChevronRight, Clock, ArrowRight } from 'lucide-react';
import { cn } from '../ui/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '../ui/button';

export type AgentSyncType = 'social' | 'transport' | 'dining' | 'ticket' | 'service' | 'general';
export type AgentCardStatus = 'active' | 'success' | 'warning' | 'error';

interface AgentSyncUser {
    name: string;
    avatar?: string;
    initials?: string;
    status?: 'pending' | 'accepted' | 'declined' | 'viewing';
}

interface AgentSyncCardProps {
  data: {
    type?: AgentSyncType;
    title: string;
    status?: AgentCardStatus;
    steps?: string[];
    users?: AgentSyncUser[]; // Added users array
    
    result?: {
        title?: string;
        description?: string;
        // Details are passed to parent handler, NOT rendered in card
        details?: Record<string, string> | Array<{ label: string; value: string }>;
        actions?: Array<{ label: string; action: string; primary?: boolean }>;
        impact?: string;
    };
    
    description?: string;
    action?: string;
  };
  onClick?: (action?: string) => void;
}

const THEMES: Record<AgentSyncType, { icon: any, color: string, bg: string }> = {
    social: { icon: Users, color: "text-violet-600", bg: "bg-violet-50" },
    transport: { icon: Car, color: "text-blue-600", bg: "bg-blue-50" },
    dining: { icon: Utensils, color: "text-orange-600", bg: "bg-orange-50" },
    ticket: { icon: Ticket, color: "text-pink-600", bg: "bg-pink-50" },
    service: { icon: Zap, color: "text-emerald-600", bg: "bg-emerald-50" },
    general: { icon: Sparkles, color: "text-stone-600", bg: "bg-stone-50" }
};

export function AgentSyncCard({ data, onClick }: AgentSyncCardProps) {
  // Determine Type & Theme
  const type = data.type || 'general';
  const theme = THEMES[type] || THEMES.general;
  
  // Determine Initial State
  const hasSteps = data.steps && data.steps.length > 0;
  const initialStatus = data.status || (hasSteps ? 'active' : 'success');
  
  const [status, setStatus] = useState<AgentCardStatus>(initialStatus);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = data.steps || ["Processing..."];
  const users = data.users || []; // Extract users
  
  // Animation Logic for 'active' state
  useEffect(() => {
    if (status === 'active' && hasSteps) {
        const stepDuration = 3000 / steps.length;
        if (currentStepIndex < steps.length) {
            const timer = setTimeout(() => {
                setCurrentStepIndex(prev => prev + 1);
            }, stepDuration);
            return () => clearTimeout(timer);
        } else {
            setStatus('success');
        }
    }
  }, [status, currentStepIndex, steps.length, hasSteps]);

  const isComplete = status === 'success';
  const isDone = isComplete || status === 'warning' || status === 'error';

  // Display Text
  const displayTitle = isDone && data.result?.title ? data.result.title : data.title;
  const displayDesc = isDone 
    ? (data.result?.description || data.description || "Completed")
    : steps[Math.min(currentStepIndex, steps.length - 1)];

  // Actions
  let actions = data.result?.actions || [];
  if (!actions.length && (data.result?.action || data.action)) {
      const act = data.result?.action || data.action;
      if (act) actions = [{ label: act, action: act, primary: true }];
  }

  // Calculate width based on content
  const hasUsers = users.length > 0;
  // Use w-full to fill the bubble container, but cap it at max-w-md to prevent it from looking too stretched on wide screens
  // while removing the rigid 280px limit that made it look "fixed"
  const maxWidthClass = "w-full max-w-md"; 

  return (
    <div className={cn("py-1 select-none transition-all duration-300", maxWidthClass)}>
        <motion.div 
            layout
            onClick={() => onClick?.()}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
                "group relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer bg-white shadow-sm hover:shadow-md",
                status === 'error' ? "border-rose-100 bg-rose-50/30" : "border-stone-200"
            )}
        >
            {/* Main Compact Row */}
            <div className="flex items-center gap-3 p-3">
                
                {/* Status Icon (Left) */}
                <div className={cn(
                    "w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors duration-500",
                    isComplete ? theme.bg : "bg-stone-50"
                )}>
                    {status === 'active' ? (
                        <Loader2 className="w-4 h-4 text-stone-400 animate-spin" />
                    ) : status === 'error' ? (
                         <XCircle className="w-4 h-4 text-rose-500" />
                    ) : status === 'warning' ? (
                         <AlertTriangle className="w-4 h-4 text-amber-500" />
                    ) : (
                         <theme.icon className={cn("w-4 h-4", theme.color)} />
                    )}
                </div>

                {/* Content (Middle) */}
                <div className="flex-1 min-w-0 flex flex-col">
                    <div className="flex items-center justify-between mb-0.5">
                        <span className="font-semibold text-sm text-stone-900 truncate pr-2">
                            {displayTitle}
                        </span>
                        
                        {/* Visual Status Indicators (Right - Only if no users, otherwise status is implicit or integrated) */}
                        {!hasUsers && (
                            <div className="flex items-center gap-1 shrink-0">
                                {status === 'active' && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                )}
                                {status === 'success' && (
                                    <div className="flex text-blue-500" title="Delivered & Read">
                                        <CheckCheck className="w-3.5 h-3.5" />
                                    </div>
                                )}
                                {status === 'warning' && (
                                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                                )}
                            </div>
                        )}
                    </div>
                    
                    {/* Subtext */}
                    <p className={cn(
                        "text-[11px] truncate transition-colors duration-300",
                        status === 'active' ? "text-stone-400" : "text-stone-500"
                    )}>
                        {displayDesc}
                    </p>
                </div>

                {/* Users Stack (Right) */}
                {hasUsers && (
                    <div className="flex items-center -space-x-2 shrink-0 pl-2 border-l border-stone-100 ml-1">
                         {users.slice(0, 3).map((u, i) => (
                             <div key={i} className="relative w-7 h-7 rounded-full ring-2 ring-white bg-stone-100 flex items-center justify-center overflow-hidden" title={u.name}>
                                 {u.avatar ? (
                                     <img src={u.avatar} alt={u.name} className="w-full h-full object-cover" />
                                 ) : (
                                     <span className="text-[9px] font-bold text-stone-500">{u.initials || u.name[0]}</span>
                                 )}
                                 {/* Optional small status dot on avatar? */}
                                 {u.status === 'accepted' && (
                                     <div className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border border-white rounded-full"></div>
                                 )}
                             </div>
                         ))}
                         {users.length > 3 && (
                             <div className="w-7 h-7 rounded-full ring-2 ring-white bg-stone-100 flex items-center justify-center text-[9px] font-medium text-stone-500">
                                 +{users.length - 3}
                             </div>
                         )}
                         {/* Status Icon after avatars for group context */}
                         <div className="ml-2">
                             {status === 'success' && <CheckCheck className="w-3.5 h-3.5 text-blue-500" />}
                             {status === 'active' && <Loader2 className="w-3.5 h-3.5 text-stone-400 animate-spin" />}
                         </div>
                    </div>
                )}
            </div>

            {/* Actions Footer (If available) */}
            {actions.length > 0 && (
                <div className="px-3 pb-3 pt-0 flex gap-2">
                     {actions.map((act, i) => (
                        <Button
                            key={i}
                            size="sm"
                            variant={act.primary ? "default" : "secondary"}
                            className={cn(
                                "h-7 text-[10px] font-medium px-3 flex-1",
                                act.primary ? "bg-stone-900 text-white hover:bg-stone-800" : "bg-stone-100 text-stone-700 hover:bg-stone-200"
                            )}
                            onClick={(e) => {
                                e.stopPropagation();
                                onClick?.(act.action);
                            }}
                        >
                            {act.label}
                        </Button>
                     ))}
                </div>
            )}

            {/* Progress Bar (Active Only) */}
            {status === 'active' && (
                <div className="absolute bottom-0 left-0 h-0.5 bg-blue-500/20 w-full">
                    <motion.div 
                        className="h-full bg-blue-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3, ease: "linear" }}
                    />
                </div>
            )}
        </motion.div>
    </div>
  );
}