import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Box, FileText, Activity
} from 'lucide-react';
import { ECOSYSTEM_RELATIONS, MEGA_PROCESSES } from '../../data/ecosystem-relations';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';

export const EcosystemProcesses = ({ selectedProcess }: { selectedProcess: string }) => {
  const activeProcess = useMemo(() => 
    MEGA_PROCESSES.find(p => p.id === selectedProcess), 
  [selectedProcess]);

  return (
    <div className="flex h-full bg-stone-50 overflow-hidden">
        {/* Main Content: Process Visualizer */}
        <div className="flex-1 overflow-y-auto p-8 bg-stone-50/50">
            {activeProcess ? (
                <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-stone-900 mb-2">{activeProcess.title}</h2>
                    <p className="text-stone-500 max-w-xl mx-auto">{activeProcess.description}</p>
                </div>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-indigo-100 hidden md:block"></div>

                    <div className="space-y-8 relative">
                        {activeProcess.steps.map((step, idx) => {
                            const domain = ECOSYSTEM_RELATIONS.find(d => d.id === step.domainId);
                            return (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.15 }}
                                className="flex md:flex-row flex-col gap-6 md:items-center group"
                            >
                                {/* Step Number Bubble */}
                                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-white border-4 border-indigo-50 text-indigo-600 font-bold text-xl flex items-center justify-center relative z-10 shadow-sm group-hover:border-indigo-200 transition-colors">
                                    {idx + 1}
                                </div>

                                {/* Step Content */}
                                <Card className="flex-1 hover:shadow-lg transition-all duration-300 border-l-4 border-l-indigo-500">
                                    <CardContent className="p-5 flex items-start gap-4">
                                        <div className="p-3 bg-stone-100 rounded-lg text-stone-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                        {domain ? <domain.icon className="w-6 h-6" /> : <Box className="w-6 h-6" />}
                                        </div>
                                        <div className="flex-1">
                                        <div className="flex justify-between items-center mb-1">
                                            <h4 className="font-bold text-lg text-stone-900">{step.action}</h4>
                                            <Badge variant="secondary" className="text-xs bg-stone-100 text-stone-600">{domain?.label || 'System'}</Badge>
                                        </div>
                                        <p className="text-stone-600 mb-2">{step.description}</p>
                                        <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-stone-50 border border-stone-200 rounded text-xs text-stone-500 font-mono">
                                            <FileText className="w-3 h-3" />
                                            Artifact: {step.artifact}
                                        </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                            );
                        })}
                    </div>

                    <div className="mt-12 p-6 bg-indigo-900 rounded-xl text-white text-center">
                        <h3 className="text-xl font-bold mb-2">Process Complete</h3>
                        <p className="text-indigo-200">Value delivered across {activeProcess.steps.length} domains.</p>
                    </div>
                </div>
                </div>
            ) : null}
        </div>
    </div>
  );
};
