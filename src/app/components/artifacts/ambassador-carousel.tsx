import { Users, Heart } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { imageUrls } from '../../utils/image-urls';
import type { Ambassador } from '../../types/copilot';

interface AmbassadorCarouselProps {
  data: {
    ambassadors: Ambassador[];
  } | Ambassador[];
  onShowDetails?: (ambassador: Ambassador) => void;
}

export function AmbassadorCarousel({ data, onShowDetails }: AmbassadorCarouselProps) {
  const ambassadors = Array.isArray(data) ? data : data?.ambassadors || [];

  return (
    <div className="space-y-2">
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {ambassadors.map((ambassador) => (
          <Card
            key={ambassador.id}
            className="flex-shrink-0 w-[260px] bg-white border-stone-100 hover:border-stone-200 transition-all cursor-pointer shadow-sm hover:shadow-md"
            onClick={() => onShowDetails?.(ambassador)}
          >
            <div className="p-5 space-y-4">
              <div className="flex items-start gap-3">
                <Avatar className="w-14 h-14 border-2 border-stone-100">
                  <AvatarImage src={imageUrls[ambassador.avatar as keyof typeof imageUrls] || ambassador.avatar} />
                  <AvatarFallback className="bg-stone-100 text-stone-500">
                    {ambassador.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="text-stone-900 font-semibold truncate">{ambassador.name}</h3>
                  <p className="text-xs text-stone-500">{ambassador.style}</p>
                </div>
              </div>

              {/* Fit Score */}
              <div className="bg-stone-50 rounded-lg p-3 border border-stone-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-stone-500 font-medium">Fit Score</span>
                  <span className="text-lg font-bold text-stone-900">{ambassador.fitScore}%</span>
                </div>
                <div className="w-full bg-stone-200 rounded-full h-1.5">
                  <div
                    className="bg-stone-800 h-1.5 rounded-full transition-all"
                    style={{ width: `${ambassador.fitScore}%` }}
                  />
                </div>
              </div>

              {/* Specialties */}
              <div className="flex flex-wrap gap-1">
                {ambassador.specialty.map((spec) => (
                  <Badge
                    key={spec}
                    variant="outline"
                    className="text-[10px] bg-white border-stone-200 text-stone-600 font-normal"
                  >
                    {spec}
                  </Badge>
                ))}
              </div>

              {/* Followers */}
              <div className="flex items-center gap-1 text-xs text-stone-500 pt-3 border-t border-stone-100">
                <Users className="w-3 h-3 text-stone-400" />
                <span>{(ambassador.followers / 1000).toFixed(1)}K followers</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
