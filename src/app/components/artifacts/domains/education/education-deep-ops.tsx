import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';
import { 
  BookOpen, GraduationCap, Users, ShieldCheck, 
  Library, FileText, Bell, Lock, CalendarCheck,
  Award, TrendingUp, AlertCircle
} from 'lucide-react';

// --- 1. Student Info System (The Core Record) ---
// Persona: Registrar / Admin
export const StudentInfoSystem = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-stone-50">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-indigo-600" />
            <div>
              <CardTitle className="text-base">Student Profile</CardTitle>
              <CardDescription className="text-xs">ID: {data.studentId} • Grade {data.grade}</CardDescription>
            </div>
          </div>
          <Badge className={data.standing === 'Good' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
             {data.standing}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* GPA & Attendance */}
        <div className="grid grid-cols-2 gap-3">
           <div className="p-3 bg-white border border-stone-200 rounded text-center">
              <div className="text-[10px] text-stone-500 uppercase">GPA</div>
              <div className="text-xl font-bold text-indigo-700">{data.gpa}</div>
           </div>
           <div className="p-3 bg-white border border-stone-200 rounded text-center">
              <div className="text-[10px] text-stone-500 uppercase">Attendance</div>
              <div className={`text-xl font-bold ${data.attendance >= 90 ? 'text-green-600' : 'text-amber-600'}`}>{data.attendance}%</div>
           </div>
        </div>

        {/* Schedule */}
        <div className="space-y-2">
           <h4 className="text-xs font-semibold text-stone-500 uppercase">Current Schedule</h4>
           {data.schedule.map((cls: any, i: number) => (
             <div key={i} className="flex justify-between items-center text-xs p-2 bg-stone-50 rounded border border-stone-100">
                <div>
                   <span className="font-bold text-stone-800">{cls.subject}</span>
                   <span className="text-stone-400 ml-2">{cls.room}</span>
                </div>
                <div className="text-stone-500 font-mono">{cls.grade}</div>
             </div>
           ))}
        </div>

        {/* Discipline Flag */}
        {data.disciplinePoints > 0 && (
           <div className="p-2 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{data.disciplinePoints} Active Demerit Points</span>
           </div>
        )}
      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50">
         <Button size="sm" className="w-full text-xs" onClick={() => onAction('view_transcript')}>
            Full Transcript
         </Button>
      </CardFooter>
    </Card>
  );
};

// --- 2. Curriculum Builder (The Teacher's Tool) ---
// Persona: Teacher / Dept Head
export const CurriculumBuilder = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <div>
              <CardTitle className="text-base">Lesson Planner</CardTitle>
              <CardDescription className="text-xs">Physics 101 • Unit 4: Motion</CardDescription>
            </div>
          </div>
       </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Learning Objectives */}
        <div className="space-y-2">
           <div className="flex justify-between items-center">
              <h4 className="text-xs font-semibold text-stone-500 uppercase">Objectives</h4>
              <Badge variant="outline" className="text-[9px]">State Standards: CA-PH-4</Badge>
           </div>
           <ul className="space-y-1">
              {data.objectives.map((obj: string, i: number) => (
                 <li key={i} className="flex gap-2 text-xs text-stone-700">
                    <div className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 shrink-0" />
                    {obj}
                 </li>
              ))}
           </ul>
        </div>

        {/* Lesson Flow */}
        <div className="space-y-3 relative pl-3 border-l border-stone-200 ml-1">
           {data.blocks.map((block: any, i: number) => (
             <div key={i} className="relative group">
                <div className="absolute -left-[17px] top-1 w-2 h-2 rounded-full bg-stone-300 ring-4 ring-white group-hover:bg-amber-400 transition-colors"></div>
                <div className="p-2 bg-stone-50 rounded border border-stone-100 hover:border-amber-200 transition-colors">
                   <div className="flex justify-between text-xs font-bold text-stone-800">
                      <span>{block.title}</span>
                      <span className="text-stone-400 font-normal">{block.duration}m</span>
                   </div>
                   <div className="text-[10px] text-stone-500 mt-1">{block.activity}</div>
                </div>
             </div>
           ))}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t gap-2">
         <Button variant="outline" className="flex-1 text-xs" onClick={() => onAction('attach_resource')}>Add Resource</Button>
         <Button className="flex-1 text-xs bg-amber-600 hover:bg-amber-700" onClick={() => onAction('publish')}>Publish</Button>
      </CardFooter>
    </Card>
  );
};

// --- 3. Campus Safety Monitor (The Watchdog) ---
// Persona: Security Officer
export const CampusSafetyMonitor = ({ data, onAction }: any) => {
  return (
    <Card className="w-full h-full shadow-sm flex flex-col">
      <CardHeader className="pb-3 border-b border-stone-100 bg-stone-900 text-white">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <div>
              <CardTitle className="text-base text-stone-100">Security Ops</CardTitle>
              <CardDescription className="text-stone-400 text-xs">North Campus • Status: Secure</CardDescription>
            </div>
          </div>
          <div className="animate-pulse w-2 h-2 rounded-full bg-green-500"></div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-auto pt-4 space-y-4">
        {/* Access Log */}
        <div className="space-y-2">
           <h4 className="text-xs font-semibold text-stone-600 uppercase">Recent Access</h4>
           {data.accessLogs.map((log: any, i: number) => (
             <div key={i} className="flex justify-between items-center text-xs p-1 border-b border-stone-50 last:border-0">
                <div className="flex items-center gap-2">
                   <div className={`w-1.5 h-1.5 rounded-full ${log.status === 'granted' ? 'bg-green-500' : 'bg-red-500'}`} />
                   <span className="text-stone-700">{log.location}</span>
                </div>
                <div className="text-stone-400 font-mono text-[10px]">{log.time}</div>
             </div>
           ))}
        </div>

        {/* Active Zones */}
        <div className="grid grid-cols-2 gap-2">
           {data.cameras.map((cam: any, i: number) => (
              <div key={i} className="relative bg-black rounded overflow-hidden h-20 group cursor-pointer" onClick={() => onAction('view_cam')}>
                 <img src={cam.feed} className="opacity-60 group-hover:opacity-80 transition-opacity w-full h-full object-cover" />
                 <div className="absolute top-1 left-1 text-[9px] text-white bg-black/50 px-1 rounded">{cam.name}</div>
                 {cam.alert && (
                    <div className="absolute inset-0 border-2 border-red-500 animate-pulse pointer-events-none"></div>
                 )}
              </div>
           ))}
        </div>
      </CardContent>

      <CardFooter className="pt-3 border-t bg-stone-50">
         <Button variant="destructive" size="sm" className="w-full text-xs" onClick={() => onAction('lockdown')}>
            <Lock className="w-3 h-3 mr-2" /> Initiate Lockdown
         </Button>
      </CardFooter>
    </Card>
  );
};
