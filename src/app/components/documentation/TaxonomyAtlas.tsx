
import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Layers, Box, GitBranch, Target, FileText, 
  ChevronRight, ChevronDown, Activity, Database,
  Search, ArrowRight
} from 'lucide-react';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { DOMAIN_GROUPS, GroupConfig } from '../../data/showcase-config';
import { MEGA_PROCESSES, MegaProcess } from '../../data/ecosystem-relations';

export function TaxonomyAtlas() {
  const [searchTerm, setSearchTerm] = useState('');

  // --- Statistics Calculation ---
  const stats = useMemo(() => {
    const spectrums = new Set(DOMAIN_GROUPS.map(d => d.category));
    const domains = DOMAIN_GROUPS.length;
    let subDomains = 0;
    let businessLines = 0;
    let useCases = 0;
    let artifacts = 0;

    DOMAIN_GROUPS.forEach(d => {
      d.models.forEach(m => {
        subDomains++;
        m.lines.forEach(l => {
          businessLines++;
          l.stages.forEach(s => {
            useCases++;
            artifacts += s.artifacts.length;
          });
        });
      });
    });

    return {
      spectrums: spectrums.size,
      domains,
      subDomains,
      businessLines,
      useCases,
      artifacts,
      processes: MEGA_PROCESSES.length
    };
  }, []);

  // --- Search Filtering ---
  const filteredDomains = useMemo(() => {
    if (!searchTerm) return DOMAIN_GROUPS;
    return DOMAIN_GROUPS.filter(d => 
      d.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.models.some(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  const filteredProcesses = useMemo(() => {
    if (!searchTerm) return MEGA_PROCESSES;
    return MEGA_PROCESSES.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  return (
    <div className="h-full flex flex-col bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200 px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-stone-900 mb-2">Dakkah Ecosystem Atlas</h1>
          <p className="text-stone-500 max-w-2xl">
            The comprehensive taxonomy of the Dakkah Super App, mapping Spectrums, Domains, 
            Business Models, and Value Chains into a unified operating system for the world.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mt-6">
            <StatCard label="Spectrums" value={stats.spectrums} icon={Layers} />
            <StatCard label="Domains" value={stats.domains} icon={Box} />
            <StatCard label="Sub-Domains" value={stats.subDomains} icon={GitBranch} />
            <StatCard label="LOBs" value={stats.businessLines} icon={Target} />
            <StatCard label="Use Cases" value={stats.useCases} icon={Activity} />
            <StatCard label="Artifacts" value={stats.artifacts} icon={FileText} />
            <StatCard label="Mega-Processes" value={stats.processes} icon={Database} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full max-w-7xl mx-auto p-8">
          <Tabs defaultValue="hierarchy" className="h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="hierarchy">Domain Hierarchy</TabsTrigger>
                <TabsTrigger value="processes">Mega-Process Map</TabsTrigger>
                <TabsTrigger value="matrix">Domain Matrix</TabsTrigger>
              </TabsList>

              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-stone-400" />
                <input
                  type="text"
                  placeholder="Search taxonomy..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-8 pr-4 py-2 text-sm bg-white border border-stone-200 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <TabsContent value="hierarchy" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-8 pb-12">
                  {['Physical Fulfillment', 'Risk & Safety', 'Civic & Identity', 'Financial', 'Sustainable World'].map(category => {
                    const categoryDomains = filteredDomains.filter(d => d.category === category);
                    if (categoryDomains.length === 0) return null;

                    return (
                      <div key={category} className="space-y-4">
                        <h2 className="text-xl font-bold text-stone-800 flex items-center gap-2">
                          <span className="w-2 h-8 bg-indigo-500 rounded-full" />
                          {category} Spectrum
                        </h2>
                        
                        <div className="grid grid-cols-1 gap-6">
                          {categoryDomains.map(domain => (
                            <DomainCard key={domain.id} domain={domain} />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="processes" className="flex-1 overflow-hidden">
              <ScrollArea className="h-full pr-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                  {filteredProcesses.map(process => (
                    <ProcessCard key={process.id} process={process} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="matrix" className="flex-1 overflow-hidden">
               <ScrollArea className="h-full pr-4">
                <div className="bg-white rounded-lg border border-stone-200 overflow-hidden">
                   <table className="w-full text-sm text-left">
                    <thead className="bg-stone-50 text-stone-600 font-medium">
                      <tr>
                        <th className="p-4 border-b">Mega-Process</th>
                        {DOMAIN_GROUPS.map(d => (
                          <th key={d.id} className="p-4 border-b border-l text-center min-w-[4rem]" title={d.label}>
                            <d.icon className="w-4 h-4 mx-auto" />
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {MEGA_PROCESSES.map(proc => (
                        <tr key={proc.id} className="hover:bg-stone-50 border-b last:border-0">
                          <td className="p-4 font-medium text-stone-900 border-r">{proc.title}</td>
                          {DOMAIN_GROUPS.map(d => {
                            const isInvolved = proc.steps.some(s => s.domainId === d.id);
                            return (
                              <td key={d.id} className="p-4 text-center border-l bg-white">
                                {isInvolved ? (
                                  <div className="w-2 h-2 rounded-full bg-indigo-500 mx-auto" />
                                ) : (
                                  <span className="text-stone-200">·</span>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                   </table>
                </div>
               </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: any) {
  return (
    <div className="bg-white p-3 rounded-lg border border-stone-200 shadow-sm flex items-center gap-3">
      <div className="p-2 bg-indigo-50 rounded-md">
        <Icon className="w-4 h-4 text-indigo-600" />
      </div>
      <div>
        <div className="text-xl font-bold text-stone-900 leading-none">{value}</div>
        <div className="text-xs text-stone-500 mt-0.5">{label}</div>
      </div>
    </div>
  );
}

function DomainCard({ domain }: { domain: GroupConfig }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader className="pb-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-stone-100 rounded-lg">
              <domain.icon className="w-6 h-6 text-stone-700" />
            </div>
            <div>
              <CardTitle className="text-lg font-bold text-stone-900">{domain.label}</CardTitle>
              <CardDescription>{domain.description}</CardDescription>
            </div>
          </div>
          <button className="text-stone-400">
            {expanded ? <ChevronDown /> : <ChevronRight />}
          </button>
        </div>
      </CardHeader>
      
      {expanded && (
        <CardContent className="pt-0 pb-6 animate-in slide-in-from-top-2 duration-200">
          <div className="mt-4 space-y-6 pl-4 border-l-2 border-stone-100 ml-5">
            {domain.models.map((model, idx) => (
              <div key={idx} className="relative">
                 <div className="absolute -left-[1.35rem] top-3 w-3 h-3 bg-stone-200 rounded-full ring-4 ring-white" />
                 <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide mb-2 flex items-center gap-2">
                    <Box className="w-3 h-3 text-indigo-500" />
                    {model.title}
                    <span className="text-xs font-normal text-stone-500 normal-case ml-2">- {model.description}</span>
                 </h3>
                 
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
                    {model.lines.map((line, lIdx) => (
                        <div key={lIdx} className="bg-stone-50 rounded-md p-3 border border-stone-100">
                            <div className="flex items-center gap-2 mb-2">
                                <GitBranch className="w-3.5 h-3.5 text-stone-500" />
                                <span className="font-semibold text-sm text-stone-800">{line.title}</span>
                            </div>
                            <p className="text-xs text-stone-500 mb-3 italic">{line.valueProp}</p>
                            
                            <div className="space-y-2">
                                {line.stages.map((stage, sIdx) => (
                                    <div key={sIdx} className="flex items-start gap-2 text-xs">
                                        <div className="bg-white border border-stone-200 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium text-stone-600 min-w-[3.5rem] text-center shrink-0">
                                            {stage.name}
                                        </div>
                                        <span className="text-stone-600">{stage.description}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                 </div>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

function ProcessCard({ process }: { process: MegaProcess }) {
  return (
    <Card className="border-stone-200 flex flex-col h-full hover:border-indigo-200 transition-colors">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-bold text-stone-900">{process.title}</CardTitle>
        <CardDescription className="line-clamp-2">{process.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-end">
        <div className="mt-4 space-y-3">
          {process.steps.map((step, idx) => {
             const domain = DOMAIN_GROUPS.find(d => d.id === step.domainId);
             const Icon = domain?.icon || Activity;
             
             return (
               <div key={idx} className="flex items-center gap-3 relative">
                 {idx !== process.steps.length - 1 && (
                    <div className="absolute left-3.5 top-7 w-px h-3 bg-stone-200" />
                 )}
                 <div className="w-7 h-7 rounded-full bg-stone-100 flex items-center justify-center shrink-0 border border-stone-200 z-10">
                    <Icon className="w-3.5 h-3.5 text-stone-600" />
                 </div>
                 <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between">
                        <span className="text-xs font-bold text-stone-800">{step.action}</span>
                        <span className="text-[10px] text-stone-400 uppercase tracking-wider">{domain?.label}</span>
                    </div>
                    <div className="text-xs text-stone-500 truncate">{step.description}</div>
                 </div>
               </div>
             );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
