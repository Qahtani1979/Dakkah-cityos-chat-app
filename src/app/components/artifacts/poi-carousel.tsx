import { Star, MapPin, ArrowRight, Info } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { imageUrls } from '../../utils/image-urls';
import { motion } from 'motion/react';
import type { POI } from '../../types/copilot';

interface POICarouselProps {
  data: {
    pois: POI[];
  } | POI[]; 
  onAction?: (action: string) => void;
  onShowDetails?: (item: POI) => void;
}

export function POICarousel({ data, onAction, onShowDetails }: POICarouselProps) {
  const pois = Array.isArray(data) ? data : data?.pois || [];
  
  return (
    <div className="w-full relative group/carousel">
      <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide px-1 snap-x snap-mandatory">
        {pois.map((poi, idx) => (
          <motion.div
            key={poi.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="snap-center"
          >
            <Card
                className="flex-shrink-0 w-[260px] sm:w-[300px] bg-white border-stone-100 hover:border-stone-200 transition-all cursor-pointer overflow-hidden shadow-sm hover:shadow-lg rounded-2xl group"
                onClick={() => onShowDetails?.(poi)}
            >
                <div className="relative h-44 overflow-hidden">
                <img
                    src={imageUrls[poi.image as keyof typeof imageUrls] || poi.image}
                    alt={poi.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
                
                {poi.openNow && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider shadow-sm border border-emerald-400/50">
                    Open Now
                    </div>
                )}

                <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300">
                    <Button 
                    size="icon" 
                    variant="secondary" 
                    className="h-8 w-8 rounded-full bg-white/90 shadow-sm hover:bg-white"
                    onClick={(e) => {
                        e.stopPropagation();
                        onShowDetails?.(poi);
                    }}
                    >
                    <Info className="w-4 h-4 text-stone-700" />
                    </Button>
                </div>
                </div>
                
                <div className="p-4 space-y-3">
                <div className="flex justify-between items-start gap-2">
                    <div>
                    <h3 className="text-stone-900 font-bold truncate pr-2 text-base">{poi.name}</h3>
                    <p className="text-xs text-stone-500 font-medium">{poi.category}</p>
                    </div>
                    <Button
                    size="icon"
                    variant="ghost" 
                    className="h-8 w-8 -mt-1 -mr-2 text-stone-300 hover:text-stone-900 hover:bg-stone-100 rounded-full"
                    onClick={(e) => {
                        e.stopPropagation();
                        onAction?.(`I choose ${poi.name}`);
                    }}
                    >
                    <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
                
                <div className="flex items-center gap-3 text-xs text-stone-500 font-medium">
                    <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded-md">
                    <Star className="w-3 h-3 fill-amber-500" />
                    <span>{poi.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    <span>{poi.distance}</span>
                    </div>
                    <span className="text-stone-400">{poi.priceRange}</span>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                    {poi.vibe.slice(0, 3).map((tag) => (
                    <Badge
                        key={tag}
                        variant="secondary"
                        className="text-[10px] bg-stone-100/80 text-stone-500 hover:bg-stone-100 font-medium px-2 py-0.5 rounded-md border-0"
                    >
                        {tag}
                    </Badge>
                    ))}
                    {poi.vibe.length > 3 && (
                         <Badge variant="secondary" className="text-[10px] bg-stone-50 text-stone-400 px-1.5 rounded-md border-0">+{poi.vibe.length - 3}</Badge>
                    )}
                </div>
                </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
