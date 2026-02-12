import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "./ui/dialog";
import { ScrollArea } from "./ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Info, Calendar, UserMinus, Shield } from "lucide-react";
import { format } from "date-fns";

export interface GroupMember {
    name: string;
    avatar?: string;
    role?: 'admin' | 'member' | 'bot';
    isMe?: boolean;
}

interface GroupInfoDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    description?: string;
    createdAt?: Date;
    members: GroupMember[];
    onRemoveMember?: (memberName: string) => void;
    onAddMember?: () => void;
}

export function GroupInfoDialog({ 
    open, 
    onOpenChange, 
    title, 
    description = "A space for coordinating city experiences and improved daily life.",
    createdAt = new Date(), 
    members,
    onRemoveMember,
    onAddMember
}: GroupInfoDialogProps) {
    
    // Sort members: Me first, then bots, then others
    const sortedMembers = [...members].sort((a, b) => {
        if (a.isMe) return -1;
        if (b.isMe) return 1;
        if (a.role === 'bot' && b.role !== 'bot') return -1;
        if (a.role !== 'bot' && b.role === 'bot') return 1;
        return 0;
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] p-0 gap-0 overflow-hidden bg-white/95 backdrop-blur-xl border-stone-200">
                <DialogHeader className="p-6 pb-4 border-b border-stone-100 bg-stone-50/50">
                    <div className="flex flex-col items-center text-center gap-2">
                        <div className="w-16 h-16 rounded-full bg-white shadow-sm border border-stone-200 flex items-center justify-center text-3xl mb-1">
                            {title.includes("Food") ? "🍔" : 
                             title.includes("Trip") ? "✈️" :
                             title.includes("Family") ? "🏠" : 
                             title.includes("Football") ? "⚽" : "💬"}
                        </div>
                        <DialogTitle className="text-xl font-semibold text-stone-900">{title}</DialogTitle>
                        <DialogDescription className="text-sm text-stone-500 max-w-[80%] leading-relaxed">
                            {description}
                        </DialogDescription>
                        
                        <div className="flex items-center gap-2 mt-2 text-xs text-stone-400 font-medium bg-white px-3 py-1 rounded-full border border-stone-200 shadow-sm">
                            <Calendar className="w-3 h-3" />
                            Created {format(createdAt, "MMM d, yyyy")}
                        </div>
                    </div>
                </DialogHeader>

                <div className="p-0">
                    <div className="px-6 py-3 bg-stone-50/80 border-b border-stone-100 flex items-center justify-between">
                        <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
                            {members.length} Members
                        </span>
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-7 text-xs text-stone-500 hover:text-stone-900"
                            onClick={() => {
                                onOpenChange(false);
                                onAddMember?.();
                            }}
                        >
                            Add People
                        </Button>
                    </div>
                    
                    <ScrollArea className="max-h-[300px]">
                        <div className="p-2">
                            {sortedMembers.map((member, i) => (
                                <div key={i} className="flex items-center justify-between p-2 rounded-xl hover:bg-stone-50 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <Avatar className="h-10 w-10 border border-stone-200">
                                                <AvatarImage src={member.avatar} />
                                                <AvatarFallback className="bg-stone-100 text-stone-500">
                                                    {member.name.substring(0, 2).toUpperCase()}
                                                </AvatarFallback>
                                            </Avatar>
                                            {member.role === 'bot' && (
                                                <div className="absolute -bottom-1 -right-1 bg-stone-900 text-white rounded-full p-0.5 border-2 border-white">
                                                    <span className="sr-only">Bot</span>
                                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/>
                                                        <rect width="20" height="14" x="2" y="8" rx="2" ry="2"/>
                                                        <path d="M12 14h.01"/>
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-sm text-stone-900">
                                                    {member.isMe ? "You" : member.name}
                                                </span>
                                                {member.role === 'admin' && (
                                                    <Badge variant="secondary" className="h-4 px-1 text-[9px] bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">
                                                        ADMIN
                                                    </Badge>
                                                )}
                                                {member.role === 'bot' && (
                                                    <Badge variant="secondary" className="h-4 px-1 text-[9px] bg-stone-100 text-stone-600 hover:bg-stone-100 border-stone-200">
                                                        AGENT
                                                    </Badge>
                                                )}
                                            </div>
                                            <span className="text-xs text-stone-500">
                                                {member.role === 'bot' ? 'AI Copilot' : member.isMe ? 'Online' : 'Last seen recently'}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {!member.isMe && (
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-8 w-8 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-600 hover:bg-red-50"
                                            onClick={() => onRemoveMember?.(member.name)}
                                            title="Remove from group"
                                        >
                                            <UserMinus className="w-4 h-4" />
                                        </Button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </div>

                <DialogFooter className="p-4 border-t border-stone-100 bg-stone-50/30">
                     <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full">
                        Close
                     </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
