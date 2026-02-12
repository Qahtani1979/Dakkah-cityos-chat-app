import { Users, EllipsisVertical, Phone, Video, Info, Image, Search, BellOff, LogOut, Settings, X, ChevronLeft, Bell } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import { AddMemberDialog } from "./add-member-dialog";
import { SharedMediaDialog } from "./shared-media-dialog";
import { GroupInfoDialog, GroupMember } from "./group-info-dialog";
import { CopilotSettingsDialog } from "./copilot-settings-dialog";
import { toast } from "sonner";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import type { Message } from "../types/copilot";

interface ChatHeaderProps {
    title: string;
    memberCount: number;
    threadId: string;
    onAddMember: (ids: string[], shareHistory: boolean) => void;
    activeMembers?: GroupMember[];
    messages?: Message[];
    onRemoveMember?: (name: string) => void;
    onLeaveGroup?: () => void;
    onUpdateSettings?: (settings: any) => void;
    onSearch?: (query: string) => void;
}

export function ChatHeader({ 
    title, 
    memberCount, 
    threadId, 
    onAddMember, 
    activeMembers = [], 
    messages = [],
    onRemoveMember,
    onLeaveGroup,
    onUpdateSettings,
    onSearch
}: ChatHeaderProps) {
    const [showInvite, setShowInvite] = useState(false);
    const [showGroupInfo, setShowGroupInfo] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showLeaveAlert, setShowLeaveAlert] = useState(false);
    const [showMedia, setShowMedia] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isMuted, setIsMuted] = useState(false);

    const handleSearch = (q: string) => {
        setSearchQuery(q);
        onSearch?.(q);
    };

    const handleMuteToggle = () => {
        setIsMuted(!isMuted);
        toast.success(isMuted ? "Notifications unmuted" : "Notifications muted", {
            description: isMuted ? "You will receive notifications for this chat." : "You won't be disturbed by this chat."
        });
    };

    const handleLeaveGroup = () => {
        onLeaveGroup?.();
        setShowLeaveAlert(false);
    };

    return (
        <div className="flex flex-col bg-white/80 backdrop-blur-md border-b border-stone-100 z-10 sticky top-0 transition-all">
            <div className="flex items-center justify-between px-4 py-3">
                {/* Left: Title & Info or Search */}
                {isSearching ? (
                    <div className="flex items-center gap-2 flex-1 animate-in fade-in slide-in-from-left-2 duration-200">
                        <Button variant="ghost" size="icon" className="h-8 w-8 -ml-1" onClick={() => { setIsSearching(false); handleSearch(""); }}>
                            <ChevronLeft className="w-5 h-5 text-stone-500" />
                        </Button>
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                            <Input 
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search in chat..."
                                className="pl-9 h-9 bg-stone-50 border-stone-200 focus-visible:ring-stone-400"
                                autoFocus
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex items-center gap-3">
                         <div 
                            className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200 shadow-sm cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setShowGroupInfo(true)}
                         >
                            {/* Dynamic Icon based on title usually, static for now */}
                            <span className="text-lg">
                                {title.includes("Food") ? "🍔" : 
                                 title.includes("Trip") ? "✈️" :
                                 title.includes("Family") ? "🏠" : 
                                 title.includes("Football") ? "⚽" : "💬"}
                            </span>
                         </div>
                         <div className="cursor-pointer" onClick={() => setShowGroupInfo(true)}>
                             <h2 className="font-semibold text-stone-900 text-sm flex items-center gap-2">
                                {title}
                                {isMuted && <BellOff className="w-3 h-3 text-stone-400" />}
                             </h2>
                             <p className="text-xs text-stone-500 font-medium hover:underline">
                                {memberCount > 2 ? `${memberCount} members` : 'Private Chat'}
                             </p>
                         </div>
                    </div>
                )}
    
                {/* Right: Actions */}
                {!isSearching && (
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-stone-400 hover:text-stone-800 rounded-full hidden sm:flex">
                            <Phone className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-stone-400 hover:text-stone-800 rounded-full hidden sm:flex">
                            <Video className="w-4 h-4" />
                        </Button>
                        
                        <div className="w-px h-5 bg-stone-200 mx-1 hidden sm:block"></div>
    
                        <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-9 gap-2 text-stone-600 hover:text-stone-900 rounded-full bg-stone-50 hover:bg-stone-100 px-3 border border-stone-200/50"
                            onClick={() => setShowInvite(true)}
                        >
                            <Users className="w-4 h-4" />
                            <span className="text-xs font-semibold">Add</span>
                        </Button>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-9 w-9 text-stone-400 hover:text-stone-800 rounded-full">
                                    <EllipsisVertical className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-xl border-stone-200">
                                <DropdownMenuLabel className="text-stone-500 text-xs font-medium uppercase tracking-wider px-2 py-1.5">
                                    Chat Options
                                </DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => setShowGroupInfo(true)} className="gap-2 cursor-pointer text-stone-700 focus:bg-stone-100 focus:text-stone-900">
                                    <Info className="w-4 h-4" />
                                    <span>Group Info</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setShowMedia(true)} className="gap-2 cursor-pointer text-stone-700 focus:bg-stone-100 focus:text-stone-900">
                                    <Image className="w-4 h-4" />
                                    <span>Shared Media</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setIsSearching(true)} className="gap-2 cursor-pointer text-stone-700 focus:bg-stone-100 focus:text-stone-900">
                                    <Search className="w-4 h-4" />
                                    <span>Search in Chat</span>
                                </DropdownMenuItem>
                                
                                <DropdownMenuSeparator className="bg-stone-100" />
                                
                                <DropdownMenuItem onClick={handleMuteToggle} className="gap-2 cursor-pointer text-stone-700 focus:bg-stone-100 focus:text-stone-900">
                                    {isMuted ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                                    <span>{isMuted ? "Unmute Notifications" : "Mute Notifications"}</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setShowSettings(true)} className="gap-2 cursor-pointer text-stone-700 focus:bg-stone-100 focus:text-stone-900">
                                    <Settings className="w-4 h-4" />
                                    <span>Copilot Settings</span>
                                </DropdownMenuItem>
    
                                <DropdownMenuSeparator className="bg-stone-100" />
    
                                <DropdownMenuItem onClick={() => setShowLeaveAlert(true)} className="gap-2 cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700">
                                    <LogOut className="w-4 h-4" />
                                    <span>Leave Group</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}
    
                <AddMemberDialog 
                    open={showInvite} 
                    onOpenChange={setShowInvite}
                    onInvite={onAddMember}
                />
    
                <GroupInfoDialog
                    open={showGroupInfo}
                    onOpenChange={setShowGroupInfo}
                    title={title}
                    members={activeMembers.length > 0 ? activeMembers : [
                        { name: "You", isMe: true, role: 'admin' },
                        { name: "Dakkah Copilot", role: 'bot' }
                    ]}
                    onAddMember={() => {
                        setShowGroupInfo(false);
                        setShowInvite(true);
                    }}
                    onRemoveMember={onRemoveMember}
                />

                <SharedMediaDialog
                    open={showMedia}
                    onOpenChange={setShowMedia}
                    messages={messages}
                />
    
                <CopilotSettingsDialog
                    open={showSettings}
                    onOpenChange={setShowSettings}
                    onSave={onUpdateSettings}
                />
    
                <AlertDialog open={showLeaveAlert} onOpenChange={setShowLeaveAlert}>
                    <AlertDialogContent className="bg-white/95 backdrop-blur-xl border-stone-200">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Leave this conversation?</AlertDialogTitle>
                            <AlertDialogDescription>
                                You will no longer receive messages from this group. You can be re-added by an admin later.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleLeaveGroup} className="bg-red-600 hover:bg-red-700 text-white">
                                Leave Group
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
}