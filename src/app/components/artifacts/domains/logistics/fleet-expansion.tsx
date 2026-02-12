import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../../ui/avatar';
import { Progress } from '../../../ui/progress';
import { FileCheck, AlertCircle, Calendar, Clock, Car, UserCheck, ShieldAlert } from 'lucide-react';

export const DriverQualification = ({ data, onAction }: any) => (
  <Card className="w-full h-full shadow-sm">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-blue-600" />
          <div>
            <CardTitle className="text-base">Driver Qualification</CardTitle>
            <CardDescription className="text-xs">DQ Files & Compliance</CardDescription>
          </div>
        </div>
        <div className="flex gap-1">
            <Badge variant="outline" className="text-xs border-green-200 bg-green-50 text-green-700">
                {data.compliantCount} OK
            </Badge>
            <Badge variant="destructive" className="text-xs">
                {data.riskCount} Risk
            </Badge>
        </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="space-y-3">
        {data.drivers.map((driver: any) => (
          <div key={driver.id} className="flex items-start gap-3 p-2 bg-stone-50 rounded-lg border border-stone-100">
            <Avatar className="w-8 h-8 mt-1">
              <AvatarImage src={driver.avatar} />
              <AvatarFallback>{driver.initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium text-xs truncate">{driver.name}</span>
                {driver.status === 'compliant' ? (
                   <FileCheck className="w-3 h-3 text-green-500" />
                ) : (
                   <ShieldAlert className="w-3 h-3 text-red-500" />
                )}
              </div>
              
              <div className="space-y-1">
                {driver.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-[10px]">
                        <span className="text-stone-500">{item.type}</span>
                        <span className={item.daysLeft < 30 ? "text-red-600 font-bold" : "text-stone-700"}>
                            {item.expiry} ({item.daysLeft}d)
                        </span>
                    </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => onAction('audit_report')}>
        Run Compliance Audit
      </Button>
    </CardFooter>
  </Card>
);

export const VehicleBooking = ({ data, onAction }: any) => (
  <Card className="w-full h-full shadow-sm flex flex-col">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <div>
                <CardTitle className="text-base">Motor Pool</CardTitle>
                <CardDescription className="text-xs">Shared Vehicle Reservations</CardDescription>
            </div>
        </div>
        <Button size="sm" className="h-7 text-xs" onClick={() => onAction('new_booking')}>
            + Book
        </Button>
      </div>
    </CardHeader>
    <CardContent className="flex-1 space-y-4">
       {/* Timeline Header */}
       <div className="flex text-[10px] text-stone-400 font-mono border-b border-stone-100 pb-1">
          <div className="w-16">Asset</div>
          <div className="flex-1 flex justify-between px-2">
             <span>08:00</span>
             <span>12:00</span>
             <span>16:00</span>
          </div>
       </div>

       {/* Lanes */}
       <div className="space-y-3">
          {data.vehicles.map((v: any) => (
              <div key={v.id} className="relative">
                  <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded bg-stone-100 flex items-center justify-center">
                          <Car className="w-3 h-3 text-stone-500" />
                      </div>
                      <div className="text-xs font-medium">{v.name}</div>
                      <span className="text-[10px] text-stone-400 ml-auto">{v.type}</span>
                  </div>
                  {/* Timeline Track */}
                  <div className="h-6 bg-stone-50 rounded-md relative w-full overflow-hidden border border-stone-100">
                      {v.bookings.map((b: any) => (
                          <div 
                            key={b.id}
                            className={`absolute top-0.5 bottom-0.5 rounded-sm text-[9px] flex items-center px-1 truncate border
                                ${b.status === 'active' ? 'bg-indigo-100 border-indigo-200 text-indigo-700' : 'bg-stone-200 border-stone-300 text-stone-600'}
                            `}
                            style={{ left: `${b.start}%`, width: `${b.width}%` }}
                            title={`${b.user}: ${b.time}`}
                          >
                             {b.user}
                          </div>
                      ))}
                  </div>
              </div>
          ))}
       </div>
    </CardContent>
    <CardFooter className="pt-2 border-t border-stone-100">
        <div className="flex justify-between w-full text-xs text-stone-500">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-indigo-500"></span> Active</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-stone-300"></span> Reserved</span>
        </div>
    </CardFooter>
  </Card>
);
