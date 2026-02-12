import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Activity, Layers, Repeat, 
  GitBranch, Box, FileText, CheckCircle,
  Database, ArrowLeftRight, MonitorPlay, ExternalLink
} from 'lucide-react';
import { ECOSYSTEM_RELATIONS } from '../../data/ecosystem-relations';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';

export const EcosystemNetwork = ({ selectedDomain }: { selectedDomain: string }) => {
  const activeDomain = useMemo(() => 
    ECOSYSTEM_RELATIONS.find(d => d.id === selectedDomain), 
  [selectedDomain]);

  // Find incoming relations (where other domains point to the selected one)
  const incomingRelations = useMemo(() => {
    if (!selectedDomain) return [];
    return ECOSYSTEM_RELATIONS.filter(d => 
      d.relations.some(r => r.targetId === selectedDomain)
    ).map(source => {
      const relation = source.relations.find(r => r.targetId === selectedDomain);
      return { source, relation };
    });
  }, [selectedDomain]);

  return (
    <div className="flex h-full bg-stone-50 overflow-hidden">
        {/* Main Content: Relationship View */}
        <div className="flex-1 overflow-y-auto p-8 bg-stone-50/50">
        {activeDomain ? (
            <div className="max-w-5xl mx-auto space-y-8">
            
            {/* Active Domain Header */}
            <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
                    <activeDomain.icon className="w-10 h-10 text-white" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-stone-900">{activeDomain.label} Ops</h2>
                    <p className="text-lg text-stone-600 mt-2 max-w-2xl">{activeDomain.description}</p>
                    <div className="flex gap-2 mt-4">
                        <Badge className="bg-stone-200 text-stone-700 hover:bg-stone-300">{activeDomain.category}</Badge>
                        <Badge variant="outline" className="text-indigo-600 border-indigo-200">
                        {activeDomain.relations.length} Outgoing Flows
                        </Badge>
                        <Badge variant="outline" className="text-amber-600 border-amber-200">
                        {incomingRelations.length} Incoming Flows
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Incoming Column */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-amber-100 rounded-full text-amber-600"><ArrowLeftRight className="w-4 h-4" /></div>
                        <h3 className="text-lg font-bold text-stone-800">Incoming Dependencies</h3>
                    </div>
                    
                    {incomingRelations.map(({ source, relation }, idx) => (
                        <motion.div 
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        >
                        <Card className="border-l-4 border-l-amber-400 hover:shadow-md transition-shadow">
                            <CardHeader className="py-3 px-4 pb-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                    <source.icon className="w-4 h-4 text-stone-500" />
                                    <span className="font-semibold text-stone-900">{source.label}</span>
                                    </div>
                                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{relation?.type}</Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="px-4 pb-4 pt-2">
                                <p className="text-sm text-stone-600 mb-3">{relation?.description}</p>
                                <div className="bg-stone-50 rounded-md p-3 border border-stone-100 space-y-2">
                                    {relation?.touchpoints.map((tp, i) => (
                                    <div key={i} className="text-xs">
                                        <div className="font-semibold text-stone-800 flex items-center gap-2">
                                            <GitBranch className="w-3 h-3 text-amber-500" />
                                            {tp.name}
                                        </div>
                                        <div className="pl-5 text-stone-500 mt-1">{tp.description}</div>
                                        <div className="pl-5 font-mono text-[10px] text-indigo-600 mt-1 bg-indigo-50/50 inline-block px-1 rounded">
                                            {tp.dataFlow}
                                        </div>
                                    </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        </motion.div>
                    ))}
                    {incomingRelations.length === 0 && (
                        <div className="p-8 border border-dashed border-stone-300 rounded-lg text-center text-stone-400">
                        No direct incoming dependencies mapped.
                        </div>
                    )}
                </div>

                {/* Outgoing Column */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="p-2 bg-blue-100 rounded-full text-blue-600"><ExternalLink className="w-4 h-4" /></div>
                        <h3 className="text-lg font-bold text-stone-800">Outgoing Impacts</h3>
                    </div>

                    {activeDomain.relations.map((relation, idx) => {
                        const target = ECOSYSTEM_RELATIONS.find(d => d.id === relation.targetId);
                        return (
                        <motion.div 
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
                                <CardHeader className="py-3 px-4 pb-2">
                                    <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="font-semibold text-stone-900">To: {target?.label}</span>
                                        {target && <target.icon className="w-4 h-4 text-stone-500" />}
                                    </div>
                                    <Badge variant="outline" className="text-[10px] uppercase tracking-wider">{relation.type}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-4 pb-4 pt-2">
                                    <p className="text-sm text-stone-600 mb-3">{relation.description}</p>
                                    <div className="bg-stone-50 rounded-md p-3 border border-stone-100 space-y-2">
                                    {relation.touchpoints.map((tp, i) => (
                                        <div key={i} className="text-xs">
                                            <div className="font-semibold text-stone-800 flex items-center gap-2">
                                                <CheckCircle className="w-3 h-3 text-blue-500" />
                                                {tp.name}
                                            </div>
                                            <div className="pl-5 text-stone-500 mt-1">{tp.description}</div>
                                            <div className="pl-5 font-mono text-[10px] text-indigo-600 mt-1 bg-indigo-50/50 inline-block px-1 rounded">
                                                {tp.dataFlow}
                                            </div>
                                        </div>
                                    ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                        );
                    })}
                    {activeDomain.relations.length === 0 && (
                        <div className="p-8 border border-dashed border-stone-300 rounded-lg text-center text-stone-400">
                        No direct outgoing impacts mapped.
                        </div>
                    )}
                </div>

            </div>
            </div>
        ) : (
            <div className="flex items-center justify-center h-full text-stone-400">Select a domain to view relationships</div>
        )}
        </div>
    </div>
  );
};
