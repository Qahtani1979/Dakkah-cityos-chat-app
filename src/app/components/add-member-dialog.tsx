import { useState, useEffect } from "react";
import { Plus, Check, Search, Users, Shield } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Checkbox } from "./ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { projectId, publicAnonKey } from "../../../utils/supabase/info";
import type { UserContext, Friend, Agent } from "../types/copilot";

interface AddMemberDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onInvite: (selectedIds: string[], shareHistory: boolean) => void;
}

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-e4305fae`;

export function AddMemberDialog({ open, onOpenChange, onInvite }: AddMemberDialogProps) {
    const [context, setContext] = useState<UserContext | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [shareHistory, setShareHistory] = useState(true);
    const [activeTab, setActiveTab] = useState<'friends' | 'agents'>('friends');

    useEffect(() => {
        if (open) {
            fetchContext();
            setSelectedIds([]);
            setSearchTerm("");
            setShareHistory(true);
        }
    }, [open]);

    const fetchContext = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/context`, {
                headers: { 'Authorization': `Bearer ${publicAnonKey}` }
            });
            if (response.ok) {
                const data = await response.json();
                setContext(data);
            }
        } catch (error) {
            console.error("Failed to fetch context for invite:", error);
        }
    };

    const toggleSelection = (id: string) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleInvite = () => {
        onInvite(selectedIds, shareHistory);
        onOpenChange(false);
    };

    const filteredFriends = (context?.friends || []).filter(f => 
        f.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredAgents = (context?.agents || []).filter(a => 
        a.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] p-0 gap-0 overflow-hidden bg-white/95 backdrop-blur-xl border-stone-200">
                <DialogHeader className="p-4 pb-2 border-b border-stone-100">
                    <DialogTitle className="text-lg font-semibold flex items-center gap-2">
                        <Users className="w-5 h-5 text-stone-500" />
                        Add to Chat
                    </DialogTitle>
                    <DialogDescription className="text-xs text-stone-500">
                        Select friends or agents to add to this conversation.
                    </DialogDescription>
                </DialogHeader>

                <div className="p-4 space-y-4">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                        <Input 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search names..." 
                            className="pl-9 bg-stone-50 border-stone-200 focus-visible:ring-stone-400"
                        />
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-2 p-1 bg-stone-100 rounded-lg">
                        <button 
                            onClick={() => setActiveTab('friends')}
                            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'friends' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
                        >
                            Friends ({filteredFriends.length})
                        </button>
                        <button 
                            onClick={() => setActiveTab('agents')}
                            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${activeTab === 'agents' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
                        >
                            Agents ({filteredAgents.length})
                        </button>
                    </div>

                    {/* List */}
                    <ScrollArea className="h-[240px] pr-2">
                        <div className="space-y-2">
                            {activeTab === 'friends' ? (
                                filteredFriends.map(friend => (
                                    <div 
                                        key={friend.id}
                                        onClick={() => toggleSelection(friend.id)}
                                        className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-colors border ${selectedIds.includes(friend.id) ? 'bg-stone-900/5 border-stone-900/10' : 'hover:bg-stone-50 border-transparent'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-stone-100 overflow-hidden relative border border-stone-200">
                                                <img src={friend.avatar} alt={friend.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm text-stone-900">{friend.name}</p>
                                                <p className="text-xs text-stone-500">{friend.activity}</p>
                                            </div>
                                        </div>
                                        {selectedIds.includes(friend.id) && (
                                            <div className="w-5 h-5 rounded-full bg-stone-900 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                filteredAgents.map(agent => (
                                    <div 
                                        key={agent.id}
                                        onClick={() => toggleSelection(agent.id)}
                                        className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-colors border ${selectedIds.includes(agent.id) ? 'bg-stone-900/5 border-stone-900/10' : 'hover:bg-stone-50 border-transparent'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center overflow-hidden border border-stone-200">
                                                 <img src={agent.avatar} alt={agent.name} className="w-6 h-6 object-contain filter invert opacity-90" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm text-stone-900">{agent.name}</p>
                                                <div className="flex gap-1 mt-0.5">
                                                    {agent.capabilities.slice(0, 2).map((cap, i) => (
                                                        <span key={i} className="text-[10px] bg-stone-100 px-1.5 py-0.5 rounded text-stone-600 border border-stone-200">{cap}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        {selectedIds.includes(agent.id) && (
                                            <div className="w-5 h-5 rounded-full bg-stone-900 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                        )}
                                    </div>
                                ))
                            )}
                        </div>
                    </ScrollArea>
                    
                    {/* Privacy Option */}
                    <div className="flex items-start gap-3 p-3 bg-amber-50/50 rounded-xl border border-amber-100/50">
                        <Checkbox 
                            id="share-history" 
                            checked={shareHistory}
                            onCheckedChange={(c) => setShareHistory(c as boolean)}
                            className="mt-0.5 data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                        />
                        <div className="grid gap-1.5 leading-none">
                            <label
                                htmlFor="share-history"
                                className="text-sm font-medium text-amber-900 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                Share Conversation History
                            </label>
                            <p className="text-xs text-amber-700/80">
                                {shareHistory 
                                    ? "New members will see all previous messages to get context." 
                                    : "New members will only see messages from this point forward."}
                            </p>
                        </div>
                    </div>
                </div>

                <DialogFooter className="p-4 pt-2 border-t border-stone-100 flex sm:justify-between items-center w-full">
                     <span className="text-xs text-stone-400 font-medium hidden sm:block">
                        {selectedIds.length} selected
                     </span>
                     <div className="flex gap-2 w-full sm:w-auto">
                        <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1 sm:flex-none">Cancel</Button>
                        <Button 
                            onClick={handleInvite} 
                            disabled={selectedIds.length === 0}
                            className="bg-stone-900 hover:bg-stone-800 flex-1 sm:flex-none"
                        >
                            Add to Chat
                        </Button>
                     </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}