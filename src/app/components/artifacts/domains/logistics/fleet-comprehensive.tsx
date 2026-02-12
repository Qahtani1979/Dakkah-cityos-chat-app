import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../ui/tabs';
import { 
  Wrench, CheckCircle2, Clock, AlertTriangle, Leaf, 
  BarChart3, PlayCircle, Award, BookOpen, User
} from 'lucide-react';

// --- 1. Technician Job Card (The Mechanic) ---
export const TechnicianJobCard = ({ data, onAction }: any) => {
  const [activeTask, setActiveTask] = useState<string | null>(null);

  return (
    <Card className="w-full h-full flex flex-col shadow-sm">
      <CardHeader className="pb-3 bg-stone-50 border-b border-stone-100">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Wrench className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-base">{data.woNumber}</CardTitle>
              <CardDescription className="text-xs font-mono">{data.vehicleId} • {data.symptom}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="bg-white">
            <Clock className="w-3 h-3 mr-1" />
            {data.timeElapsed}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-auto pt-4 space-y-6">
        {/* Inspection Tasks */}
        <div className="space-y-3">
          <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Inspection Checklist</h4>
          {data.tasks.map((task: any) => (
            <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg border border-stone-100 hover:bg-stone-50 transition-colors">
              <div 
                className={`w-5 h-5 rounded-full border flex items-center justify-center cursor-pointer
                  ${task.status === 'done' ? 'bg-green-500 border-green-500 text-white' : 'border-stone-300'}
                `}
              >
                {task.status === 'done' && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-stone-900">{task.label}</div>
                {task.notes && <div className="text-xs text-stone-500">{task.notes}</div>}
              </div>
              {task.status === 'issue' && (
                <Badge variant="destructive" className="text-[10px]">Fail</Badge>
              )}
            </div>
          ))}
        </div>

        {/* Parts Used */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
             <h4 className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Parts & Consumables</h4>
             <Button variant="ghost" size="sm" className="h-6 text-xs text-blue-600">+ Add Part</Button>
          </div>
          <div className="bg-stone-50 rounded-lg p-3 text-sm space-y-2">
            {data.parts.map((part: any, idx: number) => (
              <div key={idx} className="flex justify-between border-b border-stone-200 last:border-0 pb-2 last:pb-0">
                <span>{part.qty}x {part.name}</span>
                <span className="font-mono text-stone-500">{part.sku}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t border-stone-100 gap-2">
        <Button variant="outline" className="flex-1 text-xs" onClick={() => onAction('pause')}>Pause</Button>
        <Button className="flex-1 text-xs bg-orange-600 hover:bg-orange-700" onClick={() => onAction('complete')}>
          Complete WO
        </Button>
      </CardFooter>
    </Card>
  );
};

// --- 2. ESG Carbon Tracker (Sustainability Officer) ---
export const EsgCarbonTracker = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <div>
              <CardTitle className="text-base">Fleet ESG Pulse</CardTitle>
              <CardDescription className="text-xs">Sustainability & Emissions</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="border-emerald-200 bg-emerald-50 text-emerald-700">
            A- Rating
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6 pt-2">
        
        {/* Big Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-xs text-stone-500">CO2 Emissions (YTD)</div>
            <div className="text-2xl font-bold tracking-tight text-stone-900">{data.emissionsYtd} <span className="text-sm font-normal text-stone-400">mT</span></div>
            <div className="text-[10px] text-emerald-600 font-medium flex items-center">
              ↓ {data.emissionsChange}% vs last year
            </div>
          </div>
          <div className="space-y-1">
            <div className="text-xs text-stone-500">EV Fleet Share</div>
            <div className="text-2xl font-bold tracking-tight text-stone-900">{data.evShare}%</div>
            <Progress value={data.evShare} className="h-1.5 bg-stone-100 [&>div]:bg-emerald-500" />
          </div>
        </div>

        {/* Reduction Goals */}
        <div className="space-y-3">
           <h4 className="text-xs font-semibold text-stone-500 uppercase">2030 Zero-Emission Targets</h4>
           {data.goals.map((goal: any, idx: number) => (
             <div key={idx} className="space-y-1">
               <div className="flex justify-between text-xs">
                 <span>{goal.label}</span>
                 <span className="font-medium">{goal.current} / {goal.target}</span>
               </div>
               <Progress value={(goal.current / goal.target) * 100} className="h-2 bg-stone-100 [&>div]:bg-emerald-600" />
             </div>
           ))}
        </div>

        {/* Offsets */}
        <div className="bg-emerald-50 rounded-lg p-3 flex items-center justify-between border border-emerald-100">
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-emerald-600" />
            <div className="text-xs text-emerald-900">
              <span className="font-semibold">Carbon Neutral</span> for 245 days
            </div>
          </div>
          <Button size="sm" variant="ghost" className="h-6 text-xs text-emerald-700 hover:text-emerald-800 hover:bg-emerald-100" onClick={() => onAction('buy_offsets')}>
            View Offsets
          </Button>
        </div>

      </CardContent>
    </Card>
  );
};

// --- 3. Driver Coaching LMS (Safety Coach) ---
export const DriverCoaching = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
             <div className="relative">
                <div className="w-10 h-10 rounded-full bg-stone-200 overflow-hidden">
                    <img src={data.driver.avatar} alt="Driver" className="w-full h-full object-cover" />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white
                    ${data.driver.score >= 80 ? 'bg-green-500' : 'bg-amber-500'}
                `}>
                    {data.driver.score}
                </div>
             </div>
             <div>
                <CardTitle className="text-base">{data.driver.name}</CardTitle>
                <CardDescription className="text-xs">Coach: {data.coachName}</CardDescription>
             </div>
          </div>
          <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => onAction('message')}>
             <User className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 overflow-auto pt-4 space-y-5">
         
         {/* Assigned Training */}
         <div className="space-y-3">
            <h4 className="text-xs font-semibold text-stone-500 uppercase flex items-center gap-2">
                <AlertTriangle className="w-3 h-3 text-amber-500" /> 
                Assigned Remediation
            </h4>
            {data.assignments.map((module: any) => (
                <div key={module.id} className="p-3 rounded-lg border border-amber-200 bg-amber-50/50 flex gap-3 items-center">
                    <div className="w-10 h-10 rounded bg-white flex items-center justify-center border border-amber-100 shadow-sm">
                        <PlayCircle className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-amber-900 truncate">{module.title}</div>
                        <div className="text-xs text-amber-700">Due: {module.dueDate} • {module.duration}</div>
                    </div>
                    <Button size="sm" className="h-7 text-xs bg-amber-600 hover:bg-amber-700 text-white" onClick={() => onAction('start_module')}>
                        Start
                    </Button>
                </div>
            ))}
         </div>

         {/* Recent Achievements */}
         <div className="space-y-3">
             <h4 className="text-xs font-semibold text-stone-500 uppercase flex items-center gap-2">
                 <Award className="w-3 h-3 text-purple-500" />
                 Recent Certifications
             </h4>
             <div className="grid grid-cols-2 gap-2">
                 {data.completed.map((cert: any) => (
                     <div key={cert.id} className="p-2 rounded border border-stone-200 bg-stone-50 text-center">
                         <div className="flex justify-center mb-1">
                             <BookOpen className="w-4 h-4 text-stone-400" />
                         </div>
                         <div className="text-xs font-medium text-stone-700 truncate">{cert.name}</div>
                         <div className="text-[10px] text-stone-400">{cert.date}</div>
                     </div>
                 ))}
             </div>
         </div>

      </CardContent>
    </Card>
  );
};
