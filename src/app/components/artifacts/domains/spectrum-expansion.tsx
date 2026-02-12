import React from 'react';
import { 
  Heart, Target, Users, TrendingUp, MapPin, Calendar, 
  Leaf, Droplets, BookOpen, AlertCircle, CheckCircle2, 
  Microscope, FlaskConical, Thermometer, Clock, FileText, 
  Shield, AlertTriangle, Lock, FileCheck, Gavel, Eye,
  Activity, Zap, Server, ChevronRight, Download, Truck
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Progress } from '../../ui/progress';
import { Separator } from '../../ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar';
import { ScrollArea } from '../../ui/scroll-area';

// --- Non-Profit & Philanthropy ---

export const DonorProfile = ({ data, onAction }: any) => (
  <Card className="w-full h-full shadow-sm hover:shadow-md transition-shadow">
    <CardHeader className="pb-3 flex flex-row items-center gap-4">
      <Avatar className="w-12 h-12">
        <AvatarImage src={data.image} />
        <AvatarFallback>{data.name[0]}</AvatarFallback>
      </Avatar>
      <div>
        <CardTitle className="text-base">{data.name}</CardTitle>
        <Badge variant="secondary" className="mt-1 text-xs">{data.segment}</Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-stone-50 p-3 rounded-lg">
          <p className="text-[10px] text-stone-500 uppercase font-bold">Total Given</p>
          <p className="text-lg font-bold text-emerald-600">{data.totalGiven}</p>
        </div>
        <div className="bg-stone-50 p-3 rounded-lg">
          <p className="text-[10px] text-stone-500 uppercase font-bold">Last Gift</p>
          <p className="text-sm font-medium">{data.lastGift}</p>
        </div>
      </div>
      <Button className="w-full" size="sm" onClick={() => onAction('contact_donor', data)}>
        Contact Donor
      </Button>
    </CardContent>
  </Card>
);

export const CampaignDashboard = ({ data, onAction }: any) => (
  <Card className="w-full h-full shadow-sm">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div>
          <CardDescription className="text-xs font-mono">CAMPAIGN-2025</CardDescription>
          <CardTitle className="text-lg mt-1">Annual Giving</CardTitle>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Clock className="w-3 h-3" /> {data.daysLeft} days left
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="font-medium">{data.raised}</span>
          <span className="text-stone-500">of {data.goal}</span>
        </div>
        <Progress value={(parseInt(data.raised.replace(/\D/g,'')) / parseInt(data.goal.replace(/\D/g,''))) * 100} className="h-2" />
      </div>
      <div className="flex items-center justify-between text-xs text-stone-500">
        <div className="flex items-center gap-1">
          <Users className="w-3 h-3" /> {data.donors} donors
        </div>
        <div className="flex items-center gap-1 text-emerald-600 font-bold">
          <TrendingUp className="w-3 h-3" /> On Track
        </div>
      </div>
    </CardContent>
  </Card>
);

export const VolunteerRoster = ({ data, onAction }: any) => (
  <Card className="w-full h-full flex flex-col">
    <CardHeader className="pb-3 border-b border-stone-100">
      <CardTitle className="text-base flex items-center justify-between">
        {data.event}
        <Badge>{data.shift}</Badge>
      </CardTitle>
    </CardHeader>
    <CardContent className="pt-4 flex-1">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-stone-600">
          <span className="font-bold text-stone-900">{data.signedUp}</span> / {data.needed} Volunteers
        </div>
        <Progress value={(data.signedUp / data.needed) * 100} className="w-24 h-2" />
      </div>
      <div className="space-y-2">
        {[1,2,3].map(i => (
           <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-stone-50 text-sm">
             <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-600">
               V{i}
             </div>
             <div className="flex-1">
               <p className="font-medium">Volunteer Name</p>
               <p className="text-[10px] text-stone-400">Confirmed</p>
             </div>
             <Button size="icon" variant="ghost" className="h-6 w-6"><ChevronRight className="w-3 h-3" /></Button>
           </div>
        ))}
      </div>
    </CardContent>
    <CardFooter className="pt-2 border-t border-stone-100">
      <Button variant="ghost" className="w-full text-xs" onClick={() => onAction('manage_roster')}>View Full Roster</Button>
    </CardFooter>
  </Card>
);

export const ImpactReport = ({ data, onAction }: any) => (
  <Card className="w-full h-full bg-emerald-50/50 border-emerald-100">
    <CardHeader>
      <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2">
        <Leaf className="w-5 h-5" />
      </div>
      <CardTitle className="text-emerald-900">{data.metric}</CardTitle>
      <CardDescription className="text-emerald-700/70">{data.year} Impact Report</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="text-4xl font-black text-emerald-600 tracking-tighter mb-2">
        {data.value.toLocaleString()}
      </div>
      <div className="flex items-center gap-2 text-sm text-emerald-800">
        <MapPin className="w-4 h-4" /> {data.location}
      </div>
    </CardContent>
  </Card>
);

export const AidDistributionMap = ({ data, onAction }: any) => (
  <div className="relative w-full h-full bg-stone-100 rounded-xl overflow-hidden group">
    <div 
      className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:opacity-30 transition-opacity"
      style={{ backgroundImage: `url(${data.bgImage})` }}
    />
    <div className="absolute inset-0 bg-stone-900/10" />
    
    {/* Map Markers */}
    {data.assets.map((asset: any) => (
      <div 
        key={asset.id}
        className="absolute w-8 h-8 -ml-4 -mt-4 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform"
        style={{ left: `${asset.x}%`, top: `${asset.y}%` }}
        onClick={() => onAction('view_aid_asset', asset)}
      >
        <div className={`w-3 h-3 rounded-full ${asset.status === 'delivered' ? 'bg-emerald-500' : 'bg-blue-500'} animate-ping absolute`} />
        <div className={`relative z-10 w-6 h-6 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${asset.status === 'delivered' ? 'bg-emerald-500' : 'bg-blue-500'}`}>
          <Truck className="w-3 h-3 text-white" />
        </div>
      </div>
    ))}
    
    <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-sm border border-stone-200">
      <div className="flex justify-between items-center text-xs">
        <span className="font-bold text-stone-800">Distribution Zones</span>
        <span className="text-stone-500">Live Update</span>
      </div>
    </div>
  </div>
);

export const DonationCard = ({ data, onAction }: any) => (
  <Card className="w-full">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-stone-500 uppercase tracking-wider">Quick Give</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-end gap-1 mb-4">
        <span className="text-3xl font-bold text-stone-900">{data.amount}</span>
        <span className="text-sm text-stone-500 mb-1">/{data.frequency}</span>
      </div>
      <p className="text-xs text-stone-500 mb-4">To: <span className="font-medium text-stone-900">{data.campaign}</span></p>
      <Button className="w-full bg-rose-500 hover:bg-rose-600" onClick={() => onAction('process_donation')}>
        <Heart className="w-4 h-4 mr-2" /> Donate Now
      </Button>
    </CardContent>
  </Card>
);

export const OutcomeTracker = ({ data, onAction }: any) => (
  <Card className="w-full flex flex-col justify-center items-center text-center p-6">
    <div className="relative w-32 h-32 flex items-center justify-center mb-4">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="45" className="fill-none stroke-stone-100 stroke-[8]" />
        <circle 
          cx="50" cy="50" r="45" 
          className="fill-none stroke-blue-500 stroke-[8] transition-all duration-1000 ease-out" 
          strokeDasharray="283"
          strokeDashoffset={283 - (283 * data.current) / 100}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold text-stone-900">{data.current}{data.unit}</span>
        <span className="text-[10px] text-stone-400 font-mono">TARGET: {data.target}{data.unit}</span>
      </div>
    </div>
    <h4 className="font-bold text-stone-800">{data.goal}</h4>
    <p className="text-xs text-stone-500 mt-1">Impact Metric</p>
  </Card>
);


// --- Science & R&D ---

export const ExperimentDesigner = ({ data, onAction }: any) => (
  <Card className="w-full h-full border-l-4 border-l-violet-500">
    <CardHeader>
      <div className="flex justify-between">
        <Badge variant="secondary" className="bg-violet-50 text-violet-700 hover:bg-violet-100">{data.status}</Badge>
        <FlaskConical className="w-4 h-4 text-violet-400" />
      </div>
      <CardTitle className="text-lg leading-tight mt-2">{data.hypothesis}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-xs font-bold text-stone-400 uppercase mb-2">Variables</p>
      <div className="flex flex-wrap gap-2">
        {data.variables.map((v: string) => (
          <Badge key={v} variant="outline" className="font-mono text-xs">{v}</Badge>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button size="sm" variant="ghost" className="w-full text-violet-600" onClick={() => onAction('edit_experiment')}>
        Configure Protocol
      </Button>
    </CardFooter>
  </Card>
);

export const LabDataFeed = ({ data, onAction }: any) => (
  <Card className="w-full bg-stone-950 text-stone-50 border-stone-800">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-center">
        <CardTitle className="text-sm font-mono text-stone-400">{data.sensor}</CardTitle>
        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-mono font-bold text-emerald-400 mb-1">{data.reading}</div>
      <div className="flex justify-between text-xs text-stone-500 font-mono">
        <span>{data.status}</span>
        <span>{data.time}</span>
      </div>
      
      {/* Fake Graph */}
      <div className="mt-4 h-12 flex items-end gap-1">
        {[40, 65, 45, 80, 55, 70, 60, 90, 50, 65, 75, 55, 80, 40].map((h, i) => (
          <div key={i} className="flex-1 bg-stone-800 hover:bg-emerald-500/50 transition-colors rounded-t-sm" style={{ height: `${h}%` }} />
        ))}
      </div>
    </CardContent>
  </Card>
);

export const SampleInventory = ({ data, onAction }: any) => (
  <Card className="w-full flex items-center p-4 gap-4 hover:bg-stone-50 transition-colors cursor-pointer" onClick={() => onAction('view_sample')}>
    <div className="w-12 h-12 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
      <Microscope className="w-6 h-6" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex justify-between items-center mb-1">
        <h4 className="font-bold text-stone-900 truncate">{data.id}</h4>
        <Badge variant="outline" className="text-[10px]">{data.expiry}</Badge>
      </div>
      <p className="text-sm text-stone-600">{data.type}</p>
      <div className="flex items-center gap-1 text-xs text-stone-400 mt-1">
        <MapPin className="w-3 h-3" /> {data.loc}
      </div>
    </div>
  </Card>
);

export const BiohazardMonitor = ({ data, onAction }: any) => (
  <Card className="w-full relative overflow-hidden">
    <div className="absolute top-0 right-0 p-3 opacity-10">
      <AlertTriangle className="w-24 h-24" />
    </div>
    <CardHeader>
      <CardTitle className="text-sm font-medium text-stone-500">Lab Safety Status</CardTitle>
      <div className="text-2xl font-bold text-stone-900">{data.zone}</div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center gap-3">
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${data.level === 'Safe' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
          {data.level}
        </div>
        <span className="text-xs text-stone-400">System Nominal</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2 bg-stone-50 rounded border border-stone-100">
          <span className="block text-stone-400 mb-1">Air Quality</span>
          <span className="font-mono font-bold">{data.airQuality}</span>
        </div>
        <div className="p-2 bg-stone-50 rounded border border-stone-100">
          <span className="block text-stone-400 mb-1">Pressure</span>
          <span className="font-mono font-bold">{data.pressure}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const ResearchPaperDraft = ({ data, onAction }: any) => (
  <Card className="w-full">
    <CardHeader className="pb-2">
      <div className="flex items-center gap-2 mb-2">
         <FileText className="w-4 h-4 text-stone-400" />
         <span className="text-xs font-mono text-stone-500">v{data.version}</span>
      </div>
      <CardTitle className="text-base">{data.title}</CardTitle>
    </CardHeader>
    <CardContent className="pb-2">
      <div className="flex items-center justify-between text-sm">
        <Badge variant="secondary">{data.status}</Badge>
        <span className="text-stone-500 text-xs">{data.comments} Comments</span>
      </div>
    </CardContent>
    <CardFooter className="pt-2">
      <div className="flex -space-x-2">
        {[1,2,3].map(i => (
          <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-stone-200" />
        ))}
      </div>
      <Button size="sm" variant="ghost" className="ml-auto h-8" onClick={() => onAction('review_paper')}>Review</Button>
    </CardFooter>
  </Card>
);

// --- Security & Legal ---

export const ThreatRadar = ({ data, onAction }: any) => (
  <Card className="w-full bg-slate-900 text-white border-slate-800">
    <CardHeader className="pb-2 border-b border-slate-800">
      <div className="flex justify-between items-center">
        <CardTitle className="text-sm font-mono text-slate-400">THREATCON</CardTitle>
        <Badge variant="destructive" className="animate-pulse">{data.level.toUpperCase()}</Badge>
      </div>
    </CardHeader>
    <CardContent className="pt-4">
      <div className="space-y-3">
        {data.threats.map((t: any, i: number) => (
          <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-800/50 border border-slate-700">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-rose-500" />
              <div>
                <p className="text-sm font-bold">{t.type}</p>
                <p className="text-[10px] text-slate-400 font-mono">{t.source}</p>
              </div>
            </div>
            <span className="text-xs font-mono text-rose-400">{t.severity}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-center">
         <div className="relative w-32 h-16 overflow-hidden">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-32 rounded-full border border-slate-700 bg-slate-800/20" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full border border-slate-600" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-16 bg-gradient-to-t from-emerald-500 to-transparent opacity-50 origin-bottom animate-[spin_2s_linear_infinite]" />
         </div>
      </div>
    </CardContent>
  </Card>
);

export const ContractLifecycle = ({ data, onAction }: any) => (
  <Card className="w-full border-l-4 border-l-amber-500">
    <CardHeader className="pb-2">
      <div className="flex justify-between">
        <Badge variant="secondary" className="bg-amber-50 text-amber-700 hover:bg-amber-100">{data.status}</Badge>
        <Gavel className="w-4 h-4 text-amber-400" />
      </div>
      <CardTitle className="text-base mt-2">{data.name}</CardTitle>
      <CardDescription className="text-xs">Version {data.version} • Due {data.due}</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="w-full bg-stone-100 h-1.5 rounded-full mt-2 overflow-hidden">
        <div className="bg-amber-500 h-full rounded-full w-2/3" />
      </div>
      <div className="flex justify-between mt-2 text-[10px] text-stone-400 uppercase font-bold">
        <span>Draft</span>
        <span className="text-amber-600">Review</span>
        <span>Sign</span>
      </div>
    </CardContent>
  </Card>
);

export const ComplianceChecklist = ({ data, onAction }: any) => (
  <Card className="w-full">
    <CardHeader className="pb-3 flex flex-row items-center justify-between">
      <CardTitle className="text-sm font-bold">Compliance Score</CardTitle>
      <span className={`text-xl font-bold ${data.percent >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
        {data.percent}%
      </span>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="space-y-2">
        {data.failing.map((item: string) => (
          <div key={item} className="flex items-center gap-2 text-xs text-rose-600 bg-rose-50 p-2 rounded">
            <AlertCircle className="w-3 h-3 shrink-0" />
            <span className="font-medium">{item}</span>
            <Button size="sm" variant="ghost" className="ml-auto h-5 text-[10px] bg-white hover:bg-rose-100">Fix</Button>
          </div>
        ))}
        {data.passing.slice(0, 2).map((item: string) => (
          <div key={item} className="flex items-center gap-2 text-xs text-stone-500 p-2">
            <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const IncidentWarRoom = ({ data, onAction }: any) => (
  <Card className="w-full bg-rose-50 border-rose-100">
    <CardHeader className="pb-2">
       <div className="flex items-center gap-2 text-rose-700 mb-1">
         <Siren className="w-4 h-4 animate-pulse" />
         <span className="text-xs font-bold uppercase tracking-wider">Active Incident</span>
       </div>
       <CardTitle className="text-lg text-rose-900">{data.id}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex justify-between items-center text-sm">
        <span className="font-bold text-rose-800">Severity: {data.severity}</span>
        <span className="font-mono text-rose-600">{data.timeOpen} elapsed</span>
      </div>
      
      <div className="bg-white/60 p-3 rounded-lg border border-rose-200">
        <p className="text-[10px] text-rose-500 uppercase font-bold mb-2">Responders Active</p>
        <div className="flex gap-2">
           {data.team.map((t: string) => (
             <Badge key={t} variant="outline" className="bg-white border-rose-200 text-rose-700">{t}</Badge>
           ))}
        </div>
      </div>
      
      <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white" onClick={() => onAction('join_war_room')}>
        Join War Room
      </Button>
    </CardContent>
  </Card>
);

// Helper component for Icon use in this file
function Siren({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M7 18v-6a5 5 0 1 1 10 0v6" />
      <path d="M5 21a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2" />
      <path d="M21 12h1" />
      <path d="M18.5 4.5 21 2" />
      <path d="M2 12h1" />
      <path d="M5.5 4.5 3 2" />
    </svg>
  );
}
