import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from './ui/sheet';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  Settings, User, History, MessageSquare, 
  Users, Bell, HelpCircle, LogOut, 
  Menu, Plus, Search, Archive, Moon,
  Shield, CreditCard, Globe, Smartphone,
  LogIn, RefreshCw, Crown, ChevronRight,
  MapPin, Heart, Activity, Zap, Trophy,
  Bookmark, Layout
} from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';
import { cn } from './ui/utils';
import { useAuth } from '../context/auth-context';
import { AuthDialog } from './auth-dialog';
import { SettingsDialog } from './settings-dialog';
import { SupportDialog } from './support-dialog';
import { toast } from 'sonner';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import type { ChatThread, UserContext } from '../types/copilot';

interface AppMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNewChat: () => void;
  threads: ChatThread[];
  onLoadThread: (id: string) => void;
  onRefreshThreads: () => void;
}

const SERVER_URL = `https://${projectId}.supabase.co/functions/v1/make-server-e4305fae`;

export function AppMenu({ isOpen, onClose, onNewChat, threads, onLoadThread, onRefreshThreads }: AppMenuProps) {
  const { user, signOut, session } = useAuth();
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authView, setAuthView] = useState<'signin' | 'signup'>('signin');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Settings & Support State
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [settingsTab, setSettingsTab] = useState('profile');
  const [supportOpen, setSupportOpen] = useState(false);

  // Context Data
  const [context, setContext] = useState<UserContext | null>(null);
  const [isContextLoading, setIsContextLoading] = useState(false);

  useEffect(() => {
    if (isOpen && !context && user) {
       setIsContextLoading(true);
       fetch(`${SERVER_URL}/context`, {
         headers: { 'Authorization': `Bearer ${publicAnonKey}` }
       })
       .then(res => res.json())
       .then(data => setContext(data))
       .catch(err => console.error("Failed to load context", err))
       .finally(() => setIsContextLoading(false));
    }
  }, [isOpen, context, user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully');
    } catch (error) {
      toast.error('Failed to sign out');
    }
  };

  const openAuth = (view: 'signin' | 'signup') => {
    setAuthView(view);
    setAuthDialogOpen(true);
  };
  
  const openSettings = (tab: string) => {
    setSettingsTab(tab);
    setSettingsOpen(true);
  };

  const handleSeed = async () => {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (session?.access_token) headers['Authorization'] = `Bearer ${session.access_token}`;
      else headers['Authorization'] = `Bearer ${publicAnonKey}`;

      await fetch(`${SERVER_URL}/debug/seed`, { method: 'POST', headers });
      toast.success('Mock data seeded!');
      onRefreshThreads();
    } catch (e) {
      toast.error('Failed to seed');
    }
  };

  const handleRefresh = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRefreshing(true);
    onRefreshThreads();
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const displayUser = user || {
      email: 'guest@dakkah.app',
      user_metadata: { name: 'Guest User', avatar_url: '' }
  };
  const isLoggedIn = !!user;

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="w-[85vw] sm:w-80 p-0 flex flex-col bg-stone-50 border-r border-stone-200 h-dvh">
          <SheetHeader className="sr-only">
            <SheetTitle>App Menu</SheetTitle>
            <SheetDescription>Navigation menu for accessing chat history, agent groups, and settings</SheetDescription>
          </SheetHeader>
          
          {/* Header / New Chat */}
          <div className="p-4 border-b border-stone-200 bg-white shrink-0">
            <Button 
              onClick={() => {
                onNewChat();
                onClose();
              }} 
              className="w-full justify-start gap-2 bg-stone-900 hover:bg-stone-800 text-white shadow-sm"
            >
              <Plus className="w-4 h-4" /> New Conversation
            </Button>
          </div>

          {/* Main Content */}
          <ScrollArea className="flex-1">
            <div className="p-3">
              <Accordion type="multiple" defaultValue={['dashboard', 'quests', 'collections', 'history']} className="w-full space-y-2">
                
                {/* Dashboard Section */}
                <AccordionItem value="dashboard" className="border-none bg-white rounded-xl shadow-sm px-3">
                  <AccordionTrigger className="py-3 hover:no-underline">
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">My Dashboard</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 pt-1 space-y-4">
                    
                    {/* Gamification Mini */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <Crown className="w-3 h-3 text-amber-500" />
                            <span className="text-xs font-medium text-stone-900">Gold Tier</span>
                        </div>
                        <span className="text-[10px] text-stone-500">4,500/5,000 XP</span>
                      </div>
                      <Progress value={90} className="h-1.5" indicatorClassName="bg-amber-500" />
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-stone-50 p-2 rounded-lg border border-stone-100 flex flex-col items-center">
                          <div className="flex items-center gap-1 text-stone-500 mb-1">
                            <MapPin className="w-3 h-3" /> <span className="text-[10px] font-medium uppercase">Places</span>
                          </div>
                          <p className="text-sm font-bold text-stone-900">128</p>
                      </div>
                      <div className="bg-stone-50 p-2 rounded-lg border border-stone-100 flex flex-col items-center">
                          <div className="flex items-center gap-1 text-stone-500 mb-1">
                            <Heart className="w-3 h-3" /> <span className="text-[10px] font-medium uppercase">Favs</span>
                          </div>
                          <p className="text-sm font-bold text-stone-900">42</p>
                      </div>
                    </div>

                    {/* Wallet Mini */}
                    <div className="flex items-center justify-between bg-stone-50 p-2 rounded-lg border border-stone-100 cursor-pointer hover:bg-stone-100 transition-colors">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-white border border-stone-200 flex items-center justify-center">
                              <CreditCard className="w-3 h-3 text-stone-600" />
                          </div>
                          <div>
                              <p className="text-xs font-bold text-stone-900">SAR 2,450</p>
                          </div>
                        </div>
                        <ChevronRight className="w-3 h-3 text-stone-400" />
                    </div>

                  </AccordionContent>
                </AccordionItem>

                {/* ACTIVE QUESTS (NEW) */}
                <AccordionItem value="quests" className="border-none bg-white rounded-xl shadow-sm px-3">
                  <AccordionTrigger className="py-3 hover:no-underline">
                     <div className="flex items-center justify-between w-full pr-2">
                       <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Active Quests</span>
                       <Badge variant="outline" className="text-[10px] h-5 px-1 bg-amber-50 text-amber-600 border-amber-200">2 New</Badge>
                     </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 pt-1">
                     <div className="space-y-2">
                        {[
                          { title: "Coffee Explorer", desc: "Visit 3 new cafes", progress: 66, reward: "+50 XP" },
                          { title: "Weekend Warrior", desc: "Attend 2 events", progress: 0, reward: "+100 XP" }
                        ].map((quest, i) => (
                           <div key={i} className="bg-stone-50 rounded-lg p-2.5 border border-stone-100">
                              <div className="flex justify-between items-start mb-1">
                                 <div>
                                    <h4 className="text-xs font-bold text-stone-900">{quest.title}</h4>
                                    <p className="text-[10px] text-stone-500">{quest.desc}</p>
                                 </div>
                                 <span className="text-[9px] font-bold text-amber-600 bg-amber-50 px-1 rounded">{quest.reward}</span>
                              </div>
                              <Progress value={quest.progress} className="h-1 mt-2" indicatorClassName="bg-stone-800" />
                           </div>
                        ))}
                     </div>
                  </AccordionContent>
                </AccordionItem>

                {/* MY COLLECTIONS (NEW) */}
                <AccordionItem value="collections" className="border-none bg-white rounded-xl shadow-sm px-3">
                   <AccordionTrigger className="py-3 hover:no-underline">
                     <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">My Collections</span>
                   </AccordionTrigger>
                   <AccordionContent className="pb-3 pt-1">
                      <div className="space-y-1">
                         {[
                           { name: "Weekend Trip to AlUla", items: 4, icon: Layout },
                           { name: "Best Burgers", items: 12, icon: Heart },
                           { name: "Saved Events", items: 3, icon: Bookmark }
                         ].map((col, i) => (
                            <Button 
                              key={i} 
                              variant="ghost" 
                              className="w-full justify-start text-sm text-stone-600 font-normal hover:bg-stone-100 h-9 px-2"
                            >
                               <col.icon className="w-4 h-4 mr-2 text-stone-400 shrink-0" />
                               <div className="flex-1 flex justify-between items-center">
                                  <span>{col.name}</span>
                                  <span className="text-[10px] text-stone-400">{col.items}</span>
                               </div>
                            </Button>
                         ))}
                         <Button variant="ghost" className="w-full text-xs h-8 text-amber-600 hover:text-amber-700 hover:bg-amber-50 mt-1">
                            <Plus className="w-3 h-3 mr-1" /> Create Collection
                         </Button>
                      </div>
                   </AccordionContent>
                </AccordionItem>

                {/* Social Section */}
                <AccordionItem value="social" className="border-none bg-white rounded-xl shadow-sm px-3">
                  <AccordionTrigger className="py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-2">
                      <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Social Circle</span>
                      <Badge variant="outline" className="text-[10px] h-5 px-1 text-emerald-600 border-emerald-200 bg-emerald-50">
                        {context?.friends?.filter(f => f.status === 'online')?.length || 3} Online
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 pt-1">
                    <div className="space-y-2">
                        {isContextLoading ? (
                          <div className="text-center py-2 text-stone-400 text-xs">Loading...</div>
                        ) : (context?.friends || [
                          { name: 'Sarah', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', status: 'online' },
                          { name: 'Mike', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike', status: 'online' },
                          { name: 'Ahmed', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed', status: 'online' }
                        ]).slice(0, 3).map((friend: any, i: number) => (
                          <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-stone-50 p-1.5 -mx-1.5 rounded-lg transition-colors">
                            <div className="flex items-center gap-2">
                                <div className="relative">
                                  <Avatar className="h-6 w-6">
                                      <AvatarImage src={friend.avatar} />
                                      <AvatarFallback>{friend.name[0]}</AvatarFallback>
                                  </Avatar>
                                  <span className={cn("absolute bottom-0 right-0 w-2 h-2 border border-white rounded-full", 
                                    friend.status === 'online' ? 'bg-emerald-500' : 'bg-stone-400'
                                  )}></span>
                                </div>
                                <div className="overflow-hidden">
                                  <p className="text-xs font-medium text-stone-900 truncate w-24">{friend.name}</p>
                                </div>
                            </div>
                            <Button size="icon" variant="ghost" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Zap className="w-3 h-3 text-stone-400" />
                            </Button>
                          </div>
                        ))}
                        <Button variant="ghost" className="w-full text-xs h-6 text-stone-400">View All</Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* History Section */}
                <AccordionItem value="history" className="border-none bg-white rounded-xl shadow-sm px-3">
                  <AccordionTrigger className="py-3 hover:no-underline">
                    <div className="flex items-center justify-between w-full pr-2">
                      <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Recent History</span>
                      <div className="flex items-center gap-1">
                         <div 
                           className="p-1 hover:bg-stone-100 rounded-md transition-colors"
                           onClick={handleRefresh}
                           title="Refresh History"
                         >
                           <RefreshCw className={cn("w-3 h-3 text-stone-400", isRefreshing && "animate-spin")} />
                         </div>
                         <div
                           className="p-1 hover:bg-stone-100 rounded-md transition-colors"
                           onClick={(e) => { e.stopPropagation(); handleSeed(); }}
                           title="Seed Mock Data"
                         >
                           <Archive className="w-3 h-3 text-stone-400" />
                         </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 pt-1">
                    <div className="space-y-1">
                      {threads.length === 0 ? (
                        <div className="px-2 py-2 text-xs text-stone-400 italic">No history yet</div>
                      ) : threads.map((thread) => (
                        <Button 
                          key={thread.id} 
                          variant="ghost" 
                          onClick={() => {
                            onLoadThread(thread.id);
                            onClose();
                          }}
                          className="w-full justify-start text-sm text-stone-600 font-normal hover:bg-stone-100 h-9 px-2 truncate"
                        >
                          <MessageSquare className="w-4 h-4 mr-2 text-stone-400 shrink-0" />
                          <span className="truncate">{thread.title}</span>
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Agent Groups Section */}
                <AccordionItem value="groups" className="border-none bg-white rounded-xl shadow-sm px-3">
                  <AccordionTrigger className="py-3 hover:no-underline">
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Agent Groups</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 pt-1">
                    <div className="space-y-1">
                      {[
                        { name: "Family Planner", members: 3, id: 'g1' },
                        { name: "Work Logistics", members: 5, id: 'g2' },
                        { name: "Crypto Watchers", members: 12, id: 'g3' },
                        { name: "Riyadh Foodies", members: 8, id: 'g4' },
                        { name: "Weekend Football", members: 16, id: 'g5' },
                        { name: "Startup Founders", members: 42, id: 'g6' },
                        { name: "Book Club", members: 6, id: 'g7' }
                      ].map((group, i) => (
                        <Button 
                          key={i} 
                          variant="ghost" 
                          onClick={() => {
                            onLoadThread(group.id);
                            onClose();
                          }}
                          className="w-full justify-start text-sm text-stone-600 font-normal hover:bg-stone-100 h-9 px-2"
                        >
                          <Users className="w-4 h-4 mr-2 text-stone-400 shrink-0" />
                          <span>{group.name}</span>
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Settings Section */}
                <AccordionItem value="prefs" className="border-none bg-white rounded-xl shadow-sm px-3">
                  <AccordionTrigger className="py-3 hover:no-underline">
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Preferences</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 pt-1">
                    <div className="space-y-1">
                      <Button 
                        variant="ghost" 
                        onClick={() => openSettings('profile')}
                        className="w-full justify-start text-sm text-stone-600 font-normal hover:bg-stone-100 h-9 px-2"
                      >
                        <User className="w-4 h-4 mr-2 text-stone-400" /> Profile & Identity
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={() => openSettings('general')}
                        className="w-full justify-start text-sm text-stone-600 font-normal hover:bg-stone-100 h-9 px-2"
                      >
                        <Settings className="w-4 h-4 mr-2 text-stone-400" /> General Settings
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={() => openSettings('notifications')}
                        className="w-full justify-start text-sm text-stone-600 font-normal hover:bg-stone-100 h-9 px-2"
                      >
                        <Bell className="w-4 h-4 mr-2 text-stone-400" /> Notifications
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={() => openSettings('privacy')}
                        className="w-full justify-start text-sm text-stone-600 font-normal hover:bg-stone-100 h-9 px-2"
                      >
                        <Shield className="w-4 h-4 mr-2 text-stone-400" /> Privacy & Security
                      </Button>
                      <Button 
                        variant="ghost" 
                        onClick={() => openSettings('language')}
                        className="w-full justify-start text-sm text-stone-600 font-normal hover:bg-stone-100 h-9 px-2"
                      >
                        <Globe className="w-4 h-4 mr-2 text-stone-400" /> Language (English)
                      </Button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
              </Accordion>
            </div>
          </ScrollArea>

          {/* Footer */}
          <div className="p-4 border-t border-stone-200 bg-white space-y-2 shrink-0">
            <Button 
              variant="outline" 
              onClick={() => setSupportOpen(true)}
              className="w-full justify-start border-stone-200 hover:bg-stone-50 text-stone-600"
            >
               <HelpCircle className="w-4 h-4 mr-2" /> Help & Support
            </Button>
            
            {/* Show User Profile (or Guest Profile if simulated) */}
            <div className="space-y-2">
              <div 
                onClick={() => openSettings('profile')}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-stone-50 cursor-pointer transition-colors mt-2"
              >
                  <Avatar className="h-9 w-9 border border-stone-200">
                    <AvatarImage src={displayUser.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${displayUser.email}`} />
                    <AvatarFallback>{displayUser.email?.[0]?.toUpperCase() || 'G'}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium text-stone-900 truncate">{displayUser.user_metadata?.name || 'Guest User'}</p>
                    <p className="text-xs text-stone-500 truncate text-amber-600 flex items-center gap-1">
                      <Crown className="w-3 h-3 fill-current" /> Level 5 Explorer
                    </p>
                  </div>
                  <Settings className="w-4 h-4 text-stone-400" />
              </div>
              
              {isLoggedIn ? (
                <Button 
                  variant="ghost" 
                  onClick={handleSignOut}
                  className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 h-8 text-xs"
                >
                  <LogOut className="w-3 h-3 mr-2" /> Sign Out
                </Button>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" onClick={() => openAuth('signin')} className="w-full h-8 text-xs">
                    Sign In
                  </Button>
                  <Button onClick={() => openAuth('signup')} className="w-full bg-stone-900 text-white hover:bg-stone-800 h-8 text-xs">
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </div>

        </SheetContent>
      </Sheet>

      <AuthDialog 
        isOpen={authDialogOpen} 
        onClose={() => setAuthDialogOpen(false)} 
        defaultView={authView}
      />
      
      <SettingsDialog 
        open={settingsOpen} 
        onOpenChange={setSettingsOpen} 
        defaultTab={settingsTab} 
      />
      
      <SupportDialog 
        open={supportOpen} 
        onOpenChange={setSupportOpen} 
      />
    </>
  );
}