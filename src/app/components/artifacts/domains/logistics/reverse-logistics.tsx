import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { RotateCcw, Package, RefreshCw, CheckCircle2 } from 'lucide-react';

export const ReverseLogistics = ({ data, onAction }: any) => (
  <Card className="w-full h-full shadow-sm">
    <CardHeader className="pb-2">
      <div className="flex items-center gap-2">
        <RotateCcw className="w-4 h-4 text-orange-500" />
        <CardTitle className="text-base">Returns Processing</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-orange-50 p-3 rounded-lg text-center">
          <p className="text-2xl font-bold text-orange-700">{data.pending}</p>
          <p className="text-[10px] text-orange-600 uppercase font-bold">Pending</p>
        </div>
        <div className="bg-stone-50 p-3 rounded-lg text-center">
          <p className="text-2xl font-bold text-stone-700">{data.processed}</p>
          <p className="text-[10px] text-stone-500 uppercase font-bold">Processed</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <p className="text-xs font-bold text-stone-400 uppercase">Recent RMAs</p>
        {data.items.slice(0, 3).map((item: any) => (
          <div key={item.id} className="flex items-center gap-3 p-2 border border-stone-100 rounded-lg bg-white">
            <div className="w-8 h-8 bg-stone-100 rounded flex items-center justify-center shrink-0">
              <Package className="w-4 h-4 text-stone-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">{item.name}</p>
              <p className="text-[10px] text-stone-500">{item.reason}</p>
            </div>
            <Badge variant="outline" className="text-[10px] h-5">{item.status}</Badge>
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter className="pt-2">
      <Button className="w-full" size="sm" variant="secondary" onClick={() => onAction('process_returns')}>
        <RefreshCw className="w-3 h-3 mr-2" /> Start Batch
      </Button>
    </CardFooter>
  </Card>
);
