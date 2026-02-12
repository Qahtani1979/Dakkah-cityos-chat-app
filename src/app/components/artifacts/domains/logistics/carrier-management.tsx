import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../../ui/card';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';
import { Network, Truck, DollarSign, Star } from 'lucide-react';

export const CarrierNetwork = ({ data, onAction }: any) => (
  <Card className="w-full h-full shadow-sm">
    <CardHeader className="pb-3 border-b border-stone-100">
      <div className="flex items-center gap-2">
        <Network className="w-4 h-4 text-stone-400" />
        <CardTitle className="text-base">Carrier Network</CardTitle>
      </div>
    </CardHeader>
    <CardContent className="pt-4 space-y-4">
      {data.carriers.map((carrier: any) => (
        <div key={carrier.id} className="flex items-center justify-between p-2 hover:bg-stone-50 rounded-lg transition-colors cursor-pointer group" onClick={() => onAction('view_carrier', carrier)}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-stone-200 flex items-center justify-center font-bold text-stone-600 text-xs">
              {carrier.code}
            </div>
            <div>
              <p className="text-sm font-bold text-stone-900">{carrier.name}</p>
              <div className="flex items-center gap-2 text-[10px] text-stone-500">
                <span className="flex items-center gap-0.5"><Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" /> {carrier.rating}</span>
                <span>•</span>
                <span>{carrier.lanes} Lanes</span>
              </div>
            </div>
          </div>
          <Badge variant={carrier.status === 'Active' ? 'outline' : 'secondary'} className="text-[10px]">
            {carrier.status}
          </Badge>
        </div>
      ))}
    </CardContent>
    <CardFooter className="pt-2">
      <Button variant="ghost" className="w-full text-xs" onClick={() => onAction('add_carrier')}>
        + Add Partner
      </Button>
    </CardFooter>
  </Card>
);
