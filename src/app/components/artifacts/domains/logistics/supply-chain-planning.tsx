import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Progress } from '../../../ui/progress';
import { TrendingUp, TrendingDown, BarChart3, Calendar, Layers } from 'lucide-react';

export const DemandForecast = ({ data, onAction }: any) => (
  <Card className="w-full h-full shadow-sm">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-center">
        <div>
          <CardTitle className="text-base font-bold">Demand Forecast</CardTitle>
          <CardDescription className="text-xs">{data.period}</CardDescription>
        </div>
        <Badge variant={data.trend === 'up' ? 'default' : 'secondary'} className={data.trend === 'up' ? 'bg-emerald-100 text-emerald-700' : ''}>
          {data.trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
          {data.confidence}% Conf.
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex items-end gap-2 h-32 mt-2 mb-4">
        {data.forecast.map((val: number, i: number) => (
          <div key={i} className="flex-1 flex flex-col justify-end gap-1 group">
            <div 
              className="w-full bg-indigo-100 rounded-t-sm transition-all hover:bg-indigo-500 relative"
              style={{ height: `${(val / Math.max(...data.forecast)) * 100}%` }}
            >
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-[10px] bg-black text-white px-1 rounded transition-opacity">
                {val}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between text-xs text-stone-500">
        <span>Current</span>
        <span>+30 Days</span>
      </div>
    </CardContent>
    <CardFooter className="pt-0">
      <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => onAction('adjust_model')}>
        <BarChart3 className="w-3 h-3 mr-2" /> Adjust Model
      </Button>
    </CardFooter>
  </Card>
);

export const InventoryPlanning = ({ data, onAction }: any) => (
  <Card className="w-full h-full shadow-sm border-l-4 border-l-blue-500">
    <CardHeader className="pb-2">
      <CardTitle className="text-sm font-medium text-stone-500 uppercase tracking-wider">Inventory Health</CardTitle>
      <div className="flex justify-between items-end">
        <span className="text-2xl font-bold">{data.totalSKUs} SKUs</span>
        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">98% In-Stock</span>
      </div>
    </CardHeader>
    <CardContent className="space-y-4">
      {data.categories.map((cat: any, i: number) => (
        <div key={i} className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="font-medium">{cat.name}</span>
            <span className="text-stone-500">{cat.coverage} Days</span>
          </div>
          <Progress value={cat.health} className={`h-1.5 ${cat.health < 30 ? 'bg-red-100' : 'bg-stone-100'}`} />
        </div>
      ))}
      
      <div className="p-3 bg-stone-50 rounded-lg border border-stone-100 mt-2">
        <div className="flex items-center gap-2 mb-1">
          <Layers className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold text-stone-700">Reorder Alert</span>
        </div>
        <p className="text-[10px] text-stone-500">
          {data.alerts} items below safety stock. Recommended action: Bulk PO.
        </p>
      </div>
    </CardContent>
    <CardFooter>
        <Button size="sm" className="w-full" onClick={() => onAction('generate_po')}>Generate Orders</Button>
    </CardFooter>
  </Card>
);
