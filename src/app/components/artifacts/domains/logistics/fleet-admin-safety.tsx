import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';
import { Shield, AlertTriangle, Award, FileText, Calendar, DollarSign, CheckCircle } from 'lucide-react';

export const DriverSafetyScore = ({ data, onAction }: any) => (
  <Card className="w-full h-full shadow-sm">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-500" />
          <div>
            <CardTitle className="text-base">Safety Score</CardTitle>
            <CardDescription className="text-xs">Rolling 30-day average</CardDescription>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-3xl font-bold text-emerald-600">{data.score}</span>
          <span className="text-[10px] text-stone-500 uppercase">Top 10%</span>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Harsh Braking</span>
          <span className="font-bold">{data.events.braking} events</span>
        </div>
        <Progress value={100 - (data.events.braking * 5)} className="h-1.5" />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Speeding</span>
          <span className="font-bold">{data.events.speeding} events</span>
        </div>
        <Progress value={100 - (data.events.speeding * 10)} className="h-1.5" />
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Distraction</span>
          <span className="font-bold">{data.events.distraction} events</span>
        </div>
        <Progress value={100 - (data.events.distraction * 20)} className="h-1.5" />
      </div>

      <div className="bg-amber-50 border border-amber-100 rounded-lg p-2 flex gap-2 items-center">
        <Award className="w-4 h-4 text-amber-600" />
        <span className="text-xs text-amber-800 font-medium">Safe Driver Bonus Eligible</span>
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => onAction('view_coaching')}>
        View Coaching Plan
      </Button>
    </CardFooter>
  </Card>
);

export const CitationManager = ({ data, onAction }: any) => (
  <Card className="w-full h-full shadow-sm border-l-4 border-l-rose-500">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-stone-500 uppercase tracking-wider">Violations</CardTitle>
      <div className="flex justify-between items-end">
        <span className="text-2xl font-bold">{data.openCount} Open</span>
        <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-1 rounded-full">${data.totalDue} Due</span>
      </div>
    </CardHeader>
    <CardContent className="space-y-2">
      {data.citations.map((cite: any, i: number) => (
        <div key={i} className="flex justify-between items-center p-2 bg-stone-50 rounded border border-stone-100">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            <div>
              <p className="text-xs font-bold">{cite.type}</p>
              <p className="text-[10px] text-stone-500">{cite.vehicle} • {cite.date}</p>
            </div>
          </div>
          <Button size="sm" variant="ghost" className="h-6 text-[10px]" onClick={() => onAction('pay_citation', cite)}>
            Pay ${cite.amount}
          </Button>
        </div>
      ))}
    </CardContent>
  </Card>
);

export const RegistrationTracker = ({ data, onAction }: any) => (
  <Card className="w-full h-full shadow-sm">
    <CardHeader className="pb-2">
      <div className="flex items-center gap-2">
        <FileText className="w-4 h-4 text-blue-500" />
        <CardTitle className="text-base">Renewals</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex items-center gap-4">
        <div className="flex-1 text-center p-2 bg-blue-50 rounded-lg">
          <p className="text-xl font-bold text-blue-700">{data.dueSoon}</p>
          <p className="text-[10px] text-blue-600 uppercase">Due &lt; 30d</p>
        </div>
        <div className="flex-1 text-center p-2 bg-stone-50 rounded-lg">
          <p className="text-xl font-bold text-stone-700">{data.expired}</p>
          <p className="text-[10px] text-stone-500 uppercase">Expired</p>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-xs font-bold text-stone-400 uppercase">Upcoming</p>
        {data.upcoming.slice(0, 2).map((item: any, i: number) => (
          <div key={i} className="flex items-center justify-between text-xs py-1 border-b border-stone-50 last:border-0">
            <span className="font-medium">{item.vehicle}</span>
            <div className="flex items-center gap-1 text-stone-500">
              <Calendar className="w-3 h-3" />
              <span>{item.date}</span>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button className="w-full" size="sm" onClick={() => onAction('batch_renew')}>
        <CheckCircle className="w-3 h-3 mr-2" /> Batch Renew ({data.dueSoon})
      </Button>
    </CardFooter>
  </Card>
);
