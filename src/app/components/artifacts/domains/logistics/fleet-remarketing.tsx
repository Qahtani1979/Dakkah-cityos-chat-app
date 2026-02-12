import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { DollarSign, RefreshCw, BarChart2 } from 'lucide-react';

export const AssetRemarketing = ({ data, onAction }: any) => (
  <Card className="w-full h-full shadow-sm">
    <CardHeader className="pb-2">
      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4 text-emerald-500" />
        <CardTitle className="text-base">Asset Disposal</CardTitle>
      </div>
      <CardDescription className="text-xs">Remarketing & Decommissioning</CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      <div className="flex items-center justify-between bg-stone-50 p-3 rounded-lg border border-stone-100">
        <div>
          <p className="text-[10px] text-stone-500 uppercase font-bold">Projected Recovery</p>
          <p className="text-xl font-bold text-stone-900">${data.projectedValue}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-stone-500 uppercase font-bold">Assets</p>
          <p className="text-xl font-bold text-stone-900">{data.count}</p>
        </div>
      </div>
      
      <div className="space-y-2">
        {data.assets.map((asset: any) => (
          <div key={asset.id} className="flex items-center justify-between text-xs p-2 hover:bg-stone-50 rounded transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
               <div className="w-2 h-2 rounded-full bg-amber-400" />
               <div>
                 <p className="font-medium">{asset.name}</p>
                 <p className="text-[10px] text-stone-400">{asset.mileage}</p>
               </div>
            </div>
            <div className="text-right">
                <p className="font-bold text-emerald-600">${asset.estValue}</p>
                <p className="text-[10px] text-stone-400">Auction in 2d</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="secondary" size="sm" className="w-full" onClick={() => onAction('view_auctions')}>
        <BarChart2 className="w-3 h-3 mr-2" /> Market Analysis
      </Button>
    </CardFooter>
  </Card>
);
