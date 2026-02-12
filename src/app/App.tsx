import { useState } from 'react';
import { CopilotInterface } from './components/copilot-interface';
import { BottomDrawer } from './components/bottom-drawer';
import { DetailsDrawer } from './components/details-drawer';
import { AppMenu } from './components/app-menu';
import { RightDrawer } from './components/right-drawer';
import { Sparkles, Menu, LayoutGrid, HelpCircle } from 'lucide-react';
import { Button } from './components/ui/button';
import type { POI, Ticket, OrderStatus, Event as CopilotEvent, Product, ServiceItem, AnalyticsData, MediaItem, Ambassador } from './types/copilot';
import { AuthProvider } from './context/auth-context';
import { Toaster } from 'sonner';
import { useCopilot } from './hooks/useCopilot';
import { SystemShowcase } from './components/design-system/SystemShowcase';
import { AnimatePresence } from 'motion/react';

function AppContent() {
  const copilot = useCopilot();
  const [showExamples, setShowExamples] = useState(true);
  const [showcaseOpen, setShowcaseOpen] = useState(false);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);
  
  // Drawer States
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  
  const [selectedItem, setSelectedItem] = useState<POI | Ticket | OrderStatus | CopilotEvent | Product | ServiceItem | AnalyticsData | MediaItem | Ambassador | null>(null);

  const handlePromptSelect = (prompt: string) => {
    setPendingPrompt(prompt);
    setShowExamples(false);
  };

  const handleShowDetails = (item: any) => {
    setSelectedItem(item);
    setMenuOpen(false);
    setRightDrawerOpen(false);
    setDetailsOpen(true);
  };

  const toggleMenu = () => {
    if (!menuOpen) {
      setDetailsOpen(false);
      setRightDrawerOpen(false);
    }
    setMenuOpen(!menuOpen);
  };

  const toggleRightDrawer = () => {
    if (!rightDrawerOpen) {
      setDetailsOpen(false);
      setMenuOpen(false);
    }
    setRightDrawerOpen(!rightDrawerOpen);
  };

  const handleDrawerAction = (action: string) => {
    setPendingPrompt(action);
  };

  const handleNewChat = () => {
    setDetailsOpen(false);
    setMenuOpen(false);
    setRightDrawerOpen(false);
    setShowExamples(true);
    copilot.createNewChat();
  };
  
  const handleLoadThread = (id: string) => {
    copilot.loadThread(id);
    setDetailsOpen(false);
    setMenuOpen(false);
    setRightDrawerOpen(false);
    setShowExamples(false); // Hide discovery if loading a thread
  };

  return (
    <div className="h-dvh bg-stone-50 flex flex-col font-sans text-stone-900">
      {/* Header */}
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-xl shrink-0 z-40">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden -ml-2">
              <Menu className="w-5 h-5" />
            </Button>
            <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl bg-stone-900 shrink-0 shadow-sm cursor-pointer hover:bg-stone-800 transition-colors" onClick={toggleMenu}>
              <Menu className="w-5 h-5 text-stone-50" />
            </div>
            <div className="md:hidden w-10 h-10 rounded-xl bg-stone-900 flex items-center justify-center shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5 text-stone-50" />
            </div>
            <div>
              <h1 className="text-stone-900 text-lg font-bold tracking-tight">Dakkah</h1>
              <p className="text-xs text-stone-500 font-medium">City Experience OS</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="text-right hidden sm:block">
               <p className="text-xs text-stone-500 font-medium">Conversational Interface</p>
               <p className="text-[10px] text-stone-400">Powered by Super Copilot</p>
             </div>
             
             {/* Design System Trigger */}
             <Button 
               variant="ghost" 
               size="icon" 
               onClick={() => setShowcaseOpen(true)}
               className="h-10 w-10 rounded-xl border border-stone-200 text-stone-500 hover:text-stone-900 hover:bg-stone-50 mr-2"
             >
               <HelpCircle className="w-5 h-5" />
             </Button>

             {/* Right Drawer Trigger */}
             <Button 
               variant="ghost" 
               size="icon" 
               onClick={toggleRightDrawer}
               className="h-10 w-10 rounded-xl border border-stone-200 text-stone-500 hover:text-stone-900 hover:bg-stone-50"
             >
               <LayoutGrid className="w-5 h-5" />
             </Button>
          </div>
        </div>
      </header>

      {/* Main Interface */}
      <div className="flex-1 relative overflow-hidden flex flex-col max-w-5xl mx-auto w-full">
        <BottomDrawer 
          isOpen={showExamples}
          onClose={() => setShowExamples(false)} 
          onSelect={handlePromptSelect}
          onActivateVertical={copilot.activateVertical}
        />
        <CopilotInterface 
          onInteraction={() => setShowExamples(false)}
          activePrompt={pendingPrompt}
          onPromptHandled={() => setPendingPrompt(null)}
          onShowDiscovery={() => setShowExamples(true)}
          onShowDetails={handleShowDetails}
          messages={copilot.messages}
          isProcessing={copilot.isProcessing}
          sendMessage={copilot.sendMessage}
          handleMessageAction={copilot.handleMessageAction}
        />
      </div>

      <DetailsDrawer 
        isOpen={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        item={selectedItem}
        onAction={handleDrawerAction}
      />
      
      <AppMenu 
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNewChat={handleNewChat}
        threads={copilot.threads}
        onLoadThread={handleLoadThread}
        onRefreshThreads={copilot.fetchThreads}
        onAction={handleDrawerAction}
        onItemClick={handleShowDetails}
      />

      <RightDrawer 
        isOpen={rightDrawerOpen} 
        onClose={() => setRightDrawerOpen(false)}
        onAction={handleDrawerAction}
        onItemClick={handleShowDetails}
      />

      <AnimatePresence>
        {showcaseOpen && (
          <SystemShowcase onClose={() => setShowcaseOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent key="refresh-v1" />
      <Toaster />
    </AuthProvider>
  );
}