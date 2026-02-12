import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Layout, Smartphone, Monitor, Activity, Globe, Layers, Book
} from 'lucide-react';
import { Button } from '../ui/button';
import { DOMAIN_REGISTRY } from '../../data/showcase-constants';
import { ArtifactExplorer } from './ArtifactExplorer';
import { EcosystemNetwork } from '../ecosystem/EcosystemNetwork';
import { EcosystemProcesses } from '../ecosystem/EcosystemProcesses';
import { SystemSidebar } from './SystemSidebar';
import { TaxonomyAtlas } from '../documentation/TaxonomyAtlas';

export function SystemShowcase({ onClose }: { onClose: () => void }) {
  const [appMode, setAppMode] = useState<'explorer' | 'network' | 'process' | 'taxonomy'>('taxonomy');
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [activeId, setActiveId] = useState<string>('atlas');

  const handleSidebarSelect = (id: string, type: 'domain' | 'process' | 'core') => {
    setActiveId(id);
    
    if (id === 'atlas') {
      setAppMode('taxonomy');
    } else if (type === 'process') {
      setAppMode('process');
    } else if (type === 'domain') {
      // If we are in process mode, switch back to network or explorer
      if (appMode === 'process' || appMode === 'taxonomy') {
        setAppMode('network'); 
      }
      // If in explorer or network, stay there
    } else if (type === 'core') {
      setAppMode('explorer');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-50 bg-stone-50 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <header className="h-16 border-b border-stone-200 bg-white px-6 flex items-center justify-between shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center shadow-md">
            <Layout className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-stone-900 leading-tight">Dakkah Design OS</h1>
            <p className="text-[10px] text-stone-500 font-medium tracking-wider uppercase">System v2.6.0 • {DOMAIN_REGISTRY.length} Verticals</p>
          </div>
        </div>

        {/* Central Toggle */}
        <div className="flex items-center gap-4">
          <div className="flex bg-stone-100 p-1 rounded-lg">
              <button 
                onClick={() => setAppMode('taxonomy')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${appMode === 'taxonomy' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
              >
                <Book className="w-3 h-3" /> Atlas
              </button>
              <button 
                onClick={() => setAppMode('explorer')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${appMode === 'explorer' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-500 hover:text-stone-700'}`}
              >
                Artifact Explorer
              </button>
              <button 
                onClick={() => setAppMode('network')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${appMode === 'network' ? 'bg-white shadow-sm text-indigo-700' : 'text-stone-500 hover:text-stone-700'}`}
              >
                <Globe className="w-3 h-3" /> Domain Network
              </button>
              <button 
                onClick={() => setAppMode('process')}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all flex items-center gap-2 ${appMode === 'process' ? 'bg-white shadow-sm text-amber-700' : 'text-stone-500 hover:text-stone-700'}`}
              >
                <Layers className="w-3 h-3" /> Mega-Processes
              </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
           {/* View Mode Toggle (Visual Only for now) */}
           <div className="hidden md:flex bg-stone-100 p-1 rounded-lg gap-1">
              <button 
                onClick={() => setViewMode('desktop')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
              >
                 <Monitor className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('mobile')}
                className={`p-1.5 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-white shadow-sm text-stone-900' : 'text-stone-400 hover:text-stone-600'}`}
              >
                 <Smartphone className="w-4 h-4" />
              </button>
           </div>

           <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-stone-100">
             <X className="w-5 h-5" />
           </Button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden relative bg-stone-50">
        
        {/* Unified Sidebar */}
        <SystemSidebar 
          activeId={activeId} 
          onSelect={handleSidebarSelect}
        />

        {/* Content Area */}
        <div className="flex-1 relative overflow-hidden">
          <AnimatePresence mode="wait">
            {appMode === 'taxonomy' && (
              <motion.div 
                key="taxonomy" 
                initial={{ opacity: 0, scale: 0.98 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0"
              >
                <TaxonomyAtlas />
              </motion.div>
            )}
            {appMode === 'explorer' && (
              <motion.div 
                key="explorer" 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: 10 }}
                className="absolute inset-0"
              >
                <ArtifactExplorer activeTab={activeId} />
              </motion.div>
            )}
            {appMode === 'network' && (
              <motion.div 
                key="network" 
                initial={{ opacity: 0, x: 10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -10 }}
                className="absolute inset-0"
              >
                <EcosystemNetwork selectedDomain={activeId} />
              </motion.div>
            )}
            {appMode === 'process' && (
              <motion.div 
                key="process" 
                initial={{ opacity: 0, x: 10 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -10 }}
                className="absolute inset-0"
              >
                <EcosystemProcesses selectedProcess={activeId} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
