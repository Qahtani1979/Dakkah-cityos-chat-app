import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { LayoutGrid, Truck, Clock, AlertCircle } from 'lucide-react';

export const YardMonitor = ({ data, onAction }: any) => (
  <Card className="w-full h-full bg-stone-900 text-stone-50 border-stone-800">
    <CardHeader className="pb-2 border-b border-stone-800">
      <div className="flex justify-between items-center">
        <CardTitle className="text-sm font-mono text-stone-400">Yard View</CardTitle>
        <div className="flex gap-2 text-[10px]">
          <span className="text-emerald-400">{data.inGate} In</span>
          <span className="text-blue-400">{data.outGate} Out</span>
        </div>
      </div>
    </CardHeader>
    <CardContent className="pt-4">
      <div className="grid grid-cols-4 gap-2 mb-4">
        {data.spots.map((spot: any, i: number) => (
          <div 
            key={i} 
            className={`
              aspect-square rounded border flex flex-col items-center justify-center cursor-pointer transition-colors
              ${spot.status === 'occupied' ? 'bg-stone-800 border-stone-700 hover:bg-stone-700' : 'bg-transparent border-stone-800 border-dashed hover:border-stone-600'}
            `}
            onClick={() => onAction('view_spot', spot)}
          >
            <span className="text-[10px] text-stone-500 font-mono mb-1">{spot.id}</span>
            {spot.status === 'occupied' && (
              <Truck className={`w-4 h-4 ${spot.type === 'reefer' ? 'text-blue-400' : 'text-stone-300'}`} />
            )}
          </div>
        ))}
      </div>
      
      {data.alerts.length > 0 && (
        <div className="bg-rose-900/20 border border-rose-900/50 rounded p-2 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
          <div className="text-xs text-rose-200">
            <p className="font-bold">Dwell Time Alert</p>
            <p>{data.alerts[0]}</p>
          </div>
        </div>
      )}
    </CardContent>
    <CardFooter>
      <Button variant="secondary" size="sm" className="w-full bg-stone-800 hover:bg-stone-700 text-stone-300 border-none" onClick={() => onAction('yard_jockey')}>
        Request Move
      </Button>
    </CardFooter>
  </Card>
);
