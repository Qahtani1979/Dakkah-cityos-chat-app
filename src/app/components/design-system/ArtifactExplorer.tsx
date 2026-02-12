import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, Palette, Layout, Smartphone, Monitor, 
  Truck, ShoppingBag, Landmark, Stethoscope, GraduationCap, 
  Users, Building2, Home, Car, Briefcase, Lightbulb, Plane, 
  Sprout, Building, Settings, Info, Database, User,
  Search, Table as TableIcon, ExternalLink, ChevronLeft, ChevronRight,
  Activity, ArrowRight, ChevronDown, List, Hash, CornerDownRight, Zap,
  Factory, Shield, Globe, Heart, FlaskConical, Scale, Lock, HandHeart, Microscope, Siren
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { DetailsDrawer } from '../details-drawer';
import { toast } from "sonner";
import { ARTIFACT_REGISTRY } from '../artifacts/artifact-registry';

import { DOMAIN_REGISTRY, MOCK_ARTIFACT_DATA } from '../../data/showcase-constants';
import { ARTIFACT_DOCS } from '../../data/showcase-docs';
import { DOMAIN_GROUPS, SPECTRUMS } from '../../data/showcase-config';

// --- Components ---
export function ArtifactExplorer({ activeTab }: { activeTab: string }) {
  const [highlightedArtifact, setHighlightedArtifact] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const activeDomainGroup = useMemo(() => {
    return DOMAIN_GROUPS.find(g => g.id === activeTab);
  }, [activeTab]);

  const handleArtifactAction = (action: string, payload?: any, key?: string) => {
    console.log("Artifact Action:", action, payload);
    
    let itemToOpen = payload || (key ? MOCK_ARTIFACT_DATA[key] : null);
    
    // Enrich with doc data if available
    if (key && ARTIFACT_DOCS[key]) {
        const doc = ARTIFACT_DOCS[key];
        itemToOpen = {
            ...itemToOpen,
            description: itemToOpen?.description || doc.description,
            category: itemToOpen?.category || "System Artifact",
            availableActions: doc.actions
        };
    }
    
    if (itemToOpen) {
      setSelectedItem(itemToOpen);
      setIsDrawerOpen(true);
      toast(`Action: ${action}`, { description: "Opening details drawer..." });
    } else {
      toast(`Action: ${action}`);
    }
  };

  // Helper to scroll to section
  const scrollToSection = (id: string) => {
     const el = document.getElementById(id);
     if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  
  const Section = ({ id, title, children }: { id: string; title: string; children: React.ReactNode }) => (
    <section id={id} className="mb-20 scroll-mt-28">
      <div className="flex items-center gap-3 mb-8 border-b border-stone-200 pb-4">
        <h2 className="text-3xl font-bold text-stone-900 tracking-tight">{title}</h2>
      </div>
      {children}
    </section>
  );

  return (
    <div className="flex h-full overflow-hidden relative">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-stone-50/50 p-6 md:p-10 scroll-smooth">
          <div className="max-w-7xl mx-auto min-h-full">
            
            {/* Domain Directory View */}
            {activeTab === 'directory' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <h2 className="text-4xl font-black text-stone-900 tracking-tight mb-4">The Dakkah Spectrum</h2>
                  <p className="text-lg text-stone-500">
                    A comprehensive taxonomy of human activity, organizing digital experiences into three core spectrums of Life, Business, and Connection.
                  </p>
                </div>

                {SPECTRUMS.map((spectrum, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-4 top-0 bottom-0 w-1 bg-${spectrum.color}-500/20 rounded-full hidden md:block`} />
                    <div className="mb-8 pl-4">
                      <div className="flex items-center gap-3 mb-2">
                         <div className={`p-2 rounded-lg bg-${spectrum.color}-100 text-${spectrum.color}-700`}>
                           <spectrum.icon className="w-5 h-5" />
                         </div>
                         <h3 className="text-2xl font-bold text-stone-900">{spectrum.title}</h3>
                      </div>
                      <p className="text-stone-500 max-w-xl">{spectrum.description}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {spectrum.domains.map(domainId => {
                        const domain = DOMAIN_GROUPS.find(d => d.id === domainId);
                        if (!domain) return null;
                        
                        return (
                          <div
                            key={domainId}
                            className="group flex flex-col items-start p-6 bg-white rounded-xl border border-stone-200 shadow-sm transition-all text-left opacity-80"
                          >
                            <div className="mb-4 p-3 rounded-full bg-stone-50 text-stone-500 transition-colors">
                              <domain.icon className="w-6 h-6" />
                            </div>
                            <h4 className="text-lg font-bold text-stone-900 mb-2">{domain.label}</h4>
                            <p className="text-sm text-stone-500 line-clamp-2 mb-4">{domain.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Domain View (Dynamic) */}
            {activeDomainGroup && (
               <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={activeTab}>
                 <Section id={activeDomainGroup.id} title={`${activeDomainGroup.label} Artifacts`}>
                   <p className="text-stone-500 mb-12 max-w-3xl text-lg leading-relaxed">
                     {activeDomainGroup.description}
                   </p>

                   {/* Quick Index / Table of Contents */}
                   <div className="mb-16 bg-white rounded-xl border border-stone-200 p-6 shadow-sm">
                     <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                        <List className="w-4 h-4" />
                        Quick Navigation
                     </h4>
                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                       {activeDomainGroup.models.map((model, idx) => (
                         <button 
                           key={idx}
                           onClick={() => {
                             if (!expandedItems[`model-${idx}`]) {
                               toggleItem(`model-${idx}`);
                             }
                             // Short timeout to allow expansion before scrolling
                             setTimeout(() => {
                                const el = document.getElementById(`model-${idx}`);
                                el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                             }, 100);
                           }}
                           className="flex items-center gap-3 p-3 rounded-lg border border-stone-100 hover:border-stone-300 hover:bg-stone-50 transition-all text-left group"
                         >
                           <div className="w-8 h-8 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center text-xs font-bold group-hover:bg-stone-900 group-hover:text-white transition-colors">
                             {idx + 1}
                           </div>
                           <span className="text-sm font-medium text-stone-700 group-hover:text-stone-900">{model.title}</span>
                         </button>
                       ))}
                     </div>
                   </div>
                   
                   <div className="space-y-12">
                     {activeDomainGroup.models.map((model, modelIdx) => {
                       const isModelOpen = expandedItems[`model-${modelIdx}`];
                       
                       return (
                         <div id={`model-${modelIdx}`} key={modelIdx} className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm transition-all duration-300">
                           
                           {/* Business Model Header (Collapsible) */}
                           <div 
                             onClick={() => toggleItem(`model-${modelIdx}`)}
                             className="p-6 md:p-8 cursor-pointer hover:bg-stone-50 transition-colors flex items-start justify-between group select-none"
                           >
                             <div className="flex flex-col gap-2">
                                <h3 className="text-xl md:text-2xl font-black text-stone-900 flex items-center gap-3">
                                  <span className="text-stone-300 text-2xl font-light">/</span> 
                                  {model.title}
                                </h3>
                                <p className="text-stone-500 max-w-2xl text-sm md:text-base pl-6">{model.description}</p>
                             </div>
                             <div className="p-2 rounded-full bg-stone-100 text-stone-400 group-hover:bg-white group-hover:shadow-sm transition-all">
                               {isModelOpen ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                             </div>
                           </div>
                           
                           {/* Collapsible Content: Business Lines */}
                           <AnimatePresence>
                             {isModelOpen && (
                               <motion.div 
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: "auto", opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 className="border-t border-stone-100 bg-stone-50/30"
                               >
                                 <div className="p-6 md:p-8 space-y-4">
                                   {model.lines.map((line, lineIdx) => {
                                     const lineId = `model-${modelIdx}-line-${lineIdx}`;
                                     const isLineOpen = expandedItems[lineId];
                                     
                                     return (
                                       <div key={lineIdx} className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                                         
                                         {/* Business Line Header (Collapsible) */}
                                         <div 
                                           onClick={() => toggleItem(lineId)}
                                           className="p-5 cursor-pointer hover:bg-stone-50 transition-colors flex items-center justify-between group select-none"
                                         >
                                           <div className="flex items-center gap-4">
                                              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                              <div>
                                                <h4 className="font-bold text-stone-800">{line.title}</h4>
                                                <p className="text-stone-500 text-xs mt-0.5">{line.valueProp}</p>
                                              </div>
                                           </div>
                                           
                                           <div className="flex items-center gap-4">
                                              {/* Mini Lifecycle Preview (Visible when collapsed) */}
                                              {!isLineOpen && (
                                                <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-stone-400">
                                                  {line.stages.map((s, i) => (
                                                    <span key={i} className="flex items-center">
                                                      {i > 0 && <ArrowRight className="w-2 h-2 mx-1" />}
                                                      {s.name}
                                                    </span>
                                                  ))}
                                                </div>
                                              )}
                                              <div className="text-stone-400">
                                                {isLineOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                              </div>
                                           </div>
                                         </div>

                                         {/* Collapsible Content: Stages & Artifacts */}
                                         <AnimatePresence>
                                           {isLineOpen && (
                                             <motion.div 
                                               initial={{ height: 0, opacity: 0 }}
                                               animate={{ height: "auto", opacity: 1 }}
                                               exit={{ height: 0, opacity: 0 }}
                                               className="border-t border-stone-100 bg-stone-50 p-6 space-y-10"
                                             >
                                               {line.stages.map((stage, stageIdx) => (
                                                 <div key={stageIdx} className="relative">
                                                   {/* Stage Header */}
                                                   <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 mt-2">
                                                     <div className="flex items-center gap-3">
                                                       <div className="w-6 h-6 rounded bg-stone-200 text-stone-600 flex items-center justify-center font-mono text-xs font-bold">
                                                         {stageIdx + 1}
                                                       </div>
                                                       <h5 className="text-sm font-bold text-stone-900 uppercase tracking-wide">{stage.name}</h5>
                                                     </div>
                                                     <div className="hidden md:block w-px h-4 bg-stone-300 mx-2" />
                                                     <p className="text-xs text-stone-500 italic flex-1">{stage.description}</p>
                                                   </div>
                                                   
                                                   {/* Artifacts Grid */}
                                                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 pl-0 md:pl-9">
                                                     {stage.artifacts.map(key => {
                                                       const config = ARTIFACT_REGISTRY[key];
                                                       const data = MOCK_ARTIFACT_DATA[key];
                                                       
                                                       if (!data) return (
                                                         <div key={key} className="p-6 border border-dashed border-stone-300 rounded-xl flex items-center justify-center text-stone-400 text-sm bg-white">
                                                            Missing mock data: {key}
                                                         </div>
                                                       );

                                                       const Component = config?.component;

                                                       return (
                                                         <div key={key} id={`artifact-${key}`} className="flex flex-col gap-2 group">
                                                           <div className="flex items-center justify-between px-1">
                                                              <span className={`text-xs font-mono transition-colors ${highlightedArtifact === key ? 'text-emerald-600 font-bold' : 'text-stone-400 group-hover:text-stone-600'}`}>{key}</span>
                                                              <Badge variant="outline" className="text-[10px] h-5 bg-white">{config?.mode || 'Data'}</Badge>
                                                           </div>
                                                           
                                                           <div className={`rounded-2xl border border-stone-200 bg-white p-4 flex items-center justify-center min-h-[180px] hover:shadow-lg transition-all duration-300 relative overflow-hidden ${config?.mode === 'block' ? 'col-span-full lg:col-span-2' : ''}`}>
                                                              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
                                                              
                                                              <div className="relative z-10 w-full">
                                                                {Component ? (
                                                                  <Component data={data} />
                                                                ) : (
                                                                  <pre className="text-[10px] font-mono text-stone-600 bg-stone-50/50 p-2 rounded border border-stone-100 overflow-hidden line-clamp-6">
                                                                    {JSON.stringify(data, null, 2)}
                                                                  </pre>
                                                                )}
                                                              </div>

                                                              <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4 z-20 pointer-events-none group-hover:pointer-events-auto">
                                                                <Button size="sm" variant="outline" onClick={() => handleArtifactAction("inspect", data, key)}>
                                                                  <Search className="w-3 h-3 mr-2" /> Inspect
                                                                </Button>
                                                              </div>
                                                           </div>
                                                         </div>
                                                       );
                                                     })}
                                                   </div>
                                                 </div>
                                               ))}
                                             </motion.div>
                                           )}
                                         </AnimatePresence>
                                       </div>
                                     );
                                   })}
                                 </div>
                               </motion.div>
                             )}
                           </AnimatePresence>
                         </div>
                       );
                     })}
                   </div>
                 </Section>
               </motion.div>
            )}

          </div>
        </main>

        <DetailsDrawer 
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          item={selectedItem}
          onAction={(action) => toast.info(`Drawer Action: ${action}`)}
        />
    </div>
  );
}
