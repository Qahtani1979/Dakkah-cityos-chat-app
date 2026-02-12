import { MapPin, Navigation } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';

interface MapViewProps {
  data: {
    lat: number;
    lng: number;
    zoom: number;
    title: string;
    image?: string; // Static map image URL
  };
}

export function MapView({ data }: MapViewProps) {
  // Using a static map placeholder since we don't have a real map API key environment
  // In a real app, this would be a Google Maps or Mapbox component
  const staticMapUrl = data.image || "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=600&h=300";

  return (
    <Card className="w-full max-w-sm bg-white border-stone-200 overflow-hidden shadow-sm group cursor-pointer">
      <div className="relative h-48 w-full overflow-hidden">
        <img src={staticMapUrl} alt="Map View" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        
        {/* Central Pin */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
           <div className="relative">
             <div className="w-4 h-4 bg-red-500 rounded-full animate-ping absolute inset-0 opacity-75"></div>
             <MapPin className="w-8 h-8 text-red-600 fill-red-600 relative z-10 drop-shadow-lg" />
           </div>
        </div>

        <div className="absolute bottom-3 right-3">
           <Button size="sm" className="bg-white/90 text-stone-900 hover:bg-white shadow-sm backdrop-blur-sm">
             <Navigation className="w-3 h-3 mr-1.5" /> Open
           </Button>
        </div>
      </div>
      <div className="p-3 bg-stone-50 border-t border-stone-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-stone-400" />
          <span className="text-sm font-medium text-stone-700 truncate max-w-[200px]">{data.title}</span>
        </div>
        <span className="text-xs text-stone-400">2.5 km</span>
      </div>
    </Card>
  );
}
