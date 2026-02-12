import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';
import { Zap, Battery, MapPin, AlertTriangle } from 'lucide-react';

export const EVChargingMonitor = ({ data, onAction }: any) => (
  <Card className="w-full h-full shadow-sm">
    <CardHeader className="pb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          <div>
            <CardTitle className="text-base">EV Fleet Status</CardTitle>
            <CardDescription className="text-xs">State of Charge & Range</CardDescription>
          </div>
        </div>
        <Badge variant="outline" className="text-xs font-mono">
          {data.activeChargers}/{data.totalChargers} Chargers Active
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        <div className="p-2 bg-stone-50 rounded-lg border border-stone-100 text-center">
          <span className="text-xs text-stone-500 uppercase">Avg SOC</span>
          <p className="text-xl font-bold text-stone-900">{data.avgSoc}%</p>
        </div>
        <div className="p-2 bg-stone-50 rounded-lg border border-stone-100 text-center">
          <span className="text-xs text-stone-500 uppercase">Range (Avg)</span>
          <p className="text-xl font-bold text-stone-900">{data.avgRange} mi</p>
        </div>
      </div>

      <div className="space-y-3">
        {data.vehicles.map((v: any) => (
          <div key={v.id} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="font-medium">{v.name}</span>
              <span className={v.soc < 20 ? "text-red-600 font-bold" : "text-stone-600"}>
                {v.soc}% ({v.range} mi)
              </span>
            </div>
            <div className="flex items-center gap-2">
               <Progress value={v.soc} className={`h-1.5 flex-1 ${v.soc < 20 ? 'bg-red-100' : ''}`} indicatorClassName={v.soc < 20 ? 'bg-red-500' : 'bg-green-500'} />
               {v.status === 'charging' && <Zap className="w-3 h-3 text-yellow-500 animate-pulse" />}
            </div>
            <div className="flex justify-between text-[10px] text-stone-400">
               <span>{v.location}</span>
               <span>{v.status === 'charging' ? `Full in ${v.timeToFull}` : v.status}</span>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button size="sm" className="w-full text-xs" onClick={() => onAction('find_chargers')}>
        <MapPin className="w-3 h-3 mr-2" /> Locate Chargers
      </Button>
    </CardFooter>
  </Card>
);

export const GreyFleetManager = ({ data, onAction }: any) => (
  <Card className="w-full h-full shadow-sm">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div>
            <CardTitle className="text-base">Grey Fleet</CardTitle>
            <CardDescription className="text-xs">Reimbursements & Compliance</CardDescription>
        </div>
        <Badge variant={data.pendingApproval > 0 ? "destructive" : "secondary"}>
            {data.pendingApproval} Pending
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-2">
        <h4 className="text-[10px] uppercase font-bold text-stone-500">Mileage Claims</h4>
        {data.claims.map((claim: any) => (
            <div key={claim.id} className="flex justify-between items-center p-2 bg-stone-50 border border-stone-100 rounded text-xs">
                <div>
                    <p className="font-medium">{claim.employee}</p>
                    <p className="text-stone-500">{claim.trip} • {claim.miles} mi</p>
                </div>
                <div className="text-right">
                    <p className="font-bold">${claim.amount}</p>
                    <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => onAction('approve_claim', claim.id)}>
                        <span className="text-green-600 font-bold">✓</span>
                    </Button>
                </div>
            </div>
        ))}
      </div>

      <div className="pt-2 border-t border-stone-100">
        <h4 className="text-[10px] uppercase font-bold text-stone-500 mb-2">Insurance Alerts</h4>
        {data.alerts.map((alert: any, i: number) => (
            <div key={i} className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 p-2 rounded">
                <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>{alert.message}</span>
            </div>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => onAction('export_report')}>
        Export Tax Log
      </Button>
    </CardFooter>
  </Card>
);
