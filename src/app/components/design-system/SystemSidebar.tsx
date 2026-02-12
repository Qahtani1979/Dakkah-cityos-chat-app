import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, ChevronRight, List, Table as TableIcon, Palette, 
  Activity, Layers, Globe, LayoutGrid, ChevronDown, ChevronUp, Book
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { DOMAIN_GROUPS } from '../../data/showcase-config';
import { MEGA_PROCESSES } from '../../data/ecosystem-relations';

export interface SidebarProps {
  activeId: string;
  onSelect: (id: string, type: 'domain' | 'process' | 'core') => void;
  className?: string;
}

export function SystemSidebar({ activeId, onSelect, className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  // Accordion states
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'processes': true,
    'spectrum': true
  });
  
  const [expandedSpectrumCategories, setExpandedSpectrumCategories] = useState<Record<string, boolean>>({
    'Physical Fulfillment': false,
    'Risk & Safety': false,
    'Civic & Identity': false,
    'Financial': false,
    'Sustainable World': false
  });

  const categories = ['Physical Fulfillment', 'Risk & Safety', 'Civic & Identity', 'Financial', 'Sustainable World'];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleSpectrumCategory = (cat: string) => {
    setExpandedSpectrumCategories(prev => ({ ...prev, [cat]: !prev[cat] }));
  };

  const NavItem = ({ id, label, icon: Icon, type, count, depth = 0 }: any) => (
    <button
      onClick={() => onSelect(id, type)}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all group relative
        ${activeId === id 
          ? 'bg-stone-900 text-white shadow-md font-medium' 
          : 'text-stone-500 hover:bg-stone-100 hover:text-stone-900'
        }
        ${isCollapsed ? 'justify-center px-2' : ''}
      `}
      style={{ paddingLeft: !isCollapsed ? `${(depth * 0.75) + 0.75}rem` : undefined }}
      title={isCollapsed ? label : undefined}
    >
      <Icon className={`w-4 h-4 shrink-0 ${activeId === id ? 'text-white' : 'text-stone-400 group-hover:text-stone-700'}`} />
      {!isCollapsed && (
        <span className="flex-1 text-left truncate">{label}</span>
      )}
      {!isCollapsed && count && (
        <Badge variant="secondary" className="text-[10px] h-5 px-1.5 min-w-[1.25rem] bg-stone-100 text-stone-500 group-hover:bg-white">{count}</Badge>
      )}
      {isCollapsed && activeId === id && (
        <div className="absolute right-1 top-1 w-1.5 h-1.5 rounded-full bg-emerald-400" />
      )}
    </button>
  );

  return (
    <motion.nav 
      animate={{ width: isCollapsed ? 64 : 280 }}
      className={`bg-white border-r border-stone-200 flex flex-col shrink-0 transition-all duration-300 relative z-20 ${className}`}
    >
      {/* Collapse Toggle */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 bg-white border border-stone-200 rounded-full p-1 shadow-sm hover:bg-stone-50 z-30"
      >
        {isCollapsed ? <ChevronRight className="w-3 h-3 text-stone-500" /> : <ChevronLeft className="w-3 h-3 text-stone-500" />}
      </button>

      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-4 scrollbar-thin">
        
        {/* Core Section */}
        <div>
          <div className="space-y-0.5">
            <NavItem id="atlas" label="Taxonomy Atlas" icon={Book} type="core" />
            <NavItem id="directory" label="Domain Directory" icon={List} type="core" />
          </div>
        </div>

        {/* Mega Processes Section */}
        <div className="border-t border-stone-100 pt-2">
            {!isCollapsed ? (
                <button 
                    onClick={() => toggleSection('processes')}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-stone-400 uppercase tracking-wider hover:text-stone-600 transition-colors"
                >
                    <span>Mega-Processes</span>
                    {expandedSections['processes'] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
            ) : (
                <div className="px-3 py-2 flex justify-center">
                    <Layers className="w-4 h-4 text-stone-400" />
                </div>
            )}
            
            <AnimatePresence>
                {(expandedSections['processes'] || isCollapsed) && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                         <div className="space-y-0.5 mt-1">
                            {MEGA_PROCESSES.map(proc => (
                                <NavItem 
                                    key={proc.id} 
                                    id={proc.id} 
                                    label={proc.title} 
                                    icon={Activity} 
                                    type="process" 
                                    depth={0}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* The Dakkah Spectrum Section */}
        <div className="border-t border-stone-100 pt-2">
             {!isCollapsed ? (
                <button 
                    onClick={() => toggleSection('spectrum')}
                    className="w-full flex items-center justify-between px-3 py-2 text-xs font-bold text-stone-400 uppercase tracking-wider hover:text-stone-600 transition-colors"
                >
                    <span>The Dakkah Spectrum</span>
                    {expandedSections['spectrum'] ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                </button>
            ) : (
                <div className="px-3 py-2 flex justify-center">
                    <LayoutGrid className="w-4 h-4 text-stone-400" />
                </div>
            )}

            <AnimatePresence>
                {(expandedSections['spectrum'] || isCollapsed) && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                         <div className="space-y-1 mt-1">
                            {categories.map(cat => {
                                const domains = DOMAIN_GROUPS.filter(d => d.category === cat);
                                if (domains.length === 0) return null;
                                const isCatExpanded = expandedSpectrumCategories[cat];

                                return (
                                    <div key={cat}>
                                        {!isCollapsed && (
                                            <button
                                                onClick={() => toggleSpectrumCategory(cat)}
                                                className="w-full flex items-center justify-between px-3 py-1.5 text-xs font-medium text-stone-500 hover:bg-stone-50 hover:text-stone-800 rounded-md transition-colors"
                                                style={{ paddingLeft: '0.75rem' }}
                                            >
                                                <span className="truncate">{cat}</span>
                                                {isCatExpanded ? <ChevronUp className="w-3 h-3 opacity-50" /> : <ChevronDown className="w-3 h-3 opacity-50" />}
                                            </button>
                                        )}
                                        
                                        <AnimatePresence>
                                            {(isCatExpanded || isCollapsed) && (
                                                 <motion.div
                                                    initial={!isCollapsed ? { height: 0, opacity: 0 } : false}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={!isCollapsed ? { height: 0, opacity: 0 } : false}
                                                    className="overflow-hidden"
                                                >
                                                     <div className="space-y-0.5 mt-0.5">
                                                        {domains.map(domain => (
                                                            <NavItem 
                                                                key={domain.id} 
                                                                id={domain.id} 
                                                                label={domain.label} 
                                                                icon={domain.icon} 
                                                                type="domain" 
                                                                depth={1}
                                                            />
                                                        ))}
                                                    </div>
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

      </div>

      {/* Footer / User User */}
      {!isCollapsed && (
        <div className="p-4 border-t border-stone-100 bg-stone-50/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              DK
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-sm font-bold text-stone-900 truncate">Dakkah Admin</div>
              <div className="text-xs text-stone-500 truncate">v3.0.0 Spectrum</div>
            </div>
          </div>
        </div>
      )}
    </motion.nav>
  );
}
