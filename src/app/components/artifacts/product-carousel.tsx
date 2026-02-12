import { Plus, ShoppingBag } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import type { Product } from '../../types/copilot';

interface ProductCarouselProps {
  data: {
    title?: string;
    products: Product[];
  } | Product[];
  onAction?: (action: string) => void;
  onShowDetails?: (product: Product) => void;
}

export function ProductCarousel({ data, onAction, onShowDetails }: ProductCarouselProps) {
  const products = Array.isArray(data) ? data : data?.products || [];
  const title = Array.isArray(data) ? undefined : data?.title;

  return (
    <div className="w-full space-y-3">
      {title && <h3 className="text-sm font-semibold text-stone-900 px-1">{title}</h3>}
      <div className="flex gap-3 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
        {products.map((product) => (
          <Card 
            key={product.id} 
            className="min-w-[160px] max-w-[160px] bg-white overflow-hidden border-stone-200 shadow-sm hover:shadow-md transition-all group cursor-pointer"
            onClick={() => onShowDetails?.(product)}
          >
            <div className="relative h-32 w-full bg-stone-100">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover mix-blend-multiply" />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="icon" className="h-6 w-6 rounded-full bg-white shadow-sm hover:bg-stone-100" onClick={(e) => {
                  e.stopPropagation();
                  onAction?.(`View product: ${product.name}`);
                }}>
                  <Plus className="w-4 h-4 text-stone-900" />
                </Button>
              </div>
            </div>
            <div className="p-3">
              <div className="text-[10px] text-stone-500 font-medium uppercase tracking-wider mb-1">{product.brand}</div>
              <h4 className="text-sm font-semibold text-stone-900 leading-tight mb-2 line-clamp-2 min-h-[2.5em]">{product.name}</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-stone-900">{product.price}</span>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="h-6 w-6 text-stone-400 hover:text-stone-900"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAction?.(`Add to cart: ${product.name}`);
                  }}
                >
                  <ShoppingBag className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}