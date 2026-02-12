import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';
import { 
  ShieldAlert, Eye, MessageSquare, Microscope, 
  FlaskConical, Database, Heart, HandHeart, 
  TrendingUp, Flag, Check, X, Share2, Beaker
} from 'lucide-react';

// --- 1. Community Moderation Queue (The Moderator) ---
// Persona: Community Manager / Moderator
export const CommunityModerationQueue = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-red-50">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-red-600" />
            <div>
              <CardTitle className="text-base text-red-900">Mod Queue</CardTitle>
              <CardDescription className="text-red-700 text-xs">{data.queueCount} items pending</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="bg-white text-xs text-red-800 border-red-200">
             High Priority
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Reported Content */}
        <div className="p-3 bg-white border border-stone-200 rounded-lg shadow-sm">
           <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 rounded-full bg-stone-200 flex items-center justify-center text-[10px] font-bold">U1</div>
                 <span className="text-xs font-bold text-stone-700">user_192</span>
              </div>
              <span className="text-[10px] text-stone-400">2 mins ago</span>
           </div>
           <p className="text-sm text-stone-800 italic border-l-2 border-stone-200 pl-2 mb-2">
              "{data.reportedContent}"
           </p>
           <div className="flex gap-1 flex-wrap">
              {data.flags.map((flag: string, i: number) => (
                 <Badge key={i} variant="secondary" className="text-[10px] h-5 bg-red-100 text-red-700 hover:bg-red-200">
                    {flag}
                 </Badge>
              ))}
           </div>
        </div>

        {/* User History */}
        <div className="flex items-center justify-between text-xs text-stone-500 px-1">
           <span>Prev. Violations: <span className="font-bold text-stone-900">{data.userHistory.violations}</span></span>
           <span>Acct Age: <span className="font-bold text-stone-900">{data.userHistory.age}</span></span>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50 gap-2">
        <Button variant="outline" className="flex-1 text-xs" onClick={() => onAction('ignore')}>
           <Check className="w-3 h-3 mr-1" /> Approve
        </Button>
        <Button variant="destructive" className="flex-1 text-xs" onClick={() => onAction('ban')}>
           <X className="w-3 h-3 mr-1" /> Ban User
        </Button>
      </CardFooter>
    </Card>
  );
};

// --- 2. Lab Sample Manager (The Scientist) ---
// Persona: Lab Technician / Researcher
export const LabSampleManager = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-purple-600" />
            <div>
              <CardTitle className="text-base">LIMS: Sample {data.sampleId}</CardTitle>
              <CardDescription className="text-xs">Study: {data.studyCode}</CardDescription>
            </div>
          </div>
          <Badge className={`
             ${data.status === 'Processing' ? 'bg-amber-100 text-amber-700' : 
               data.status === 'Complete' ? 'bg-green-100 text-green-700' : 'bg-stone-100 text-stone-700'}
          `}>
             {data.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Chain of Custody */}
        <div className="relative pl-3 border-l border-stone-200 ml-1 space-y-3">
           {data.chainOfCustody.map((log: any, i: number) => (
             <div key={i} className="relative">
                <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-stone-300 ring-4 ring-white"></div>
                <div className="text-xs font-bold text-stone-800">{log.action}</div>
                <div className="text-[10px] text-stone-500">{log.user} • {log.timestamp}</div>
             </div>
           ))}
        </div>

        {/* Storage Info */}
        <div className="p-2 bg-purple-50 border border-purple-100 rounded flex items-center gap-3">
           <Database className="w-8 h-8 text-purple-300" />
           <div>
              <div className="text-[10px] text-purple-600 uppercase font-bold">Location</div>
              <div className="text-sm font-mono text-purple-900">Freezer {data.location.freezer} / Shelf {data.location.shelf}</div>
           </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50 gap-2">
         <Button variant="outline" className="flex-1 text-xs" onClick={() => onAction('print_label')}>Label</Button>
         <Button className="flex-1 text-xs bg-purple-600 hover:bg-purple-700" onClick={() => onAction('update_status')}>Log Result</Button>
      </CardFooter>
    </Card>
  );
};

// --- 3. Donor Impact CRM (The Fundraiser) ---
// Persona: Major Gifts Officer
export const DonorImpactCrm = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-amber-50">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <HandHeart className="w-5 h-5 text-amber-600" />
            <div>
              <CardTitle className="text-base text-amber-900">{data.donorName}</CardTitle>
              <CardDescription className="text-amber-700 text-xs">Lifetime Giving: ${data.lifetimeValue}</CardDescription>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-amber-600 font-bold border border-amber-200">
             {data.score}
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Engagement Heatmap (Simulated) */}
        <div className="space-y-1">
           <h4 className="text-xs font-semibold text-stone-600">Engagement (Last 12mo)</h4>
           <div className="flex gap-0.5 h-6">
              {[...Array(12)].map((_, i) => (
                 <div key={i} className={`flex-1 rounded-sm ${i % 3 === 0 ? 'bg-amber-400' : 'bg-stone-200'}`} />
              ))}
           </div>
           <div className="flex justify-between text-[10px] text-stone-400">
              <span>Jan</span><span>Dec</span>
           </div>
        </div>

        {/* Last Interaction */}
        <div className="p-2 bg-white border border-stone-200 rounded text-xs">
           <div className="flex items-center gap-2 text-stone-500 mb-1">
              <MessageSquare className="w-3 h-3" />
              <span>Last Touch: {data.lastTouch.date}</span>
           </div>
           <p className="text-stone-800 italic">"{data.lastTouch.note}"</p>
        </div>

        {/* Suggested Ask */}
        <div className="flex items-center justify-between p-2 bg-green-50 border border-green-100 rounded">
           <span className="text-xs text-green-800 font-medium">Suggested Ask:</span>
           <span className="text-sm font-bold text-green-700">${data.suggestedAsk}</span>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50">
         <Button size="sm" className="w-full text-xs bg-amber-600 hover:bg-amber-700" onClick={() => onAction('log_touch')}>
            Log Interaction
         </Button>
      </CardFooter>
    </Card>
  );
};
