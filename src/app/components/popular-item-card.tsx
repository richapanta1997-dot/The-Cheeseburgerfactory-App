import { Heart } from 'lucide-react';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

interface PopularItemCardProps {
  name: string;
  image: string;
  price: number;
  rating?: number;
  onClick: () => void;
}

export function PopularItemCard({ name, image, price, rating, onClick }: PopularItemCardProps) {
  return (
    <Card 
      className="flex-shrink-0 w-32 overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="p-4 bg-gray-100 h-32 flex items-center justify-center relative">
        <div className="text-4xl">🍔</div>
        <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
          <Heart className="h-4 w-4 text-gray-600" />
        </button>
      </div>
      <div className="p-2">
        <h4 className="font-medium text-sm truncate">{name}</h4>
        <div className="flex items-center justify-between mt-1">
          <span className="text-sm font-semibold text-red-600">${price.toFixed(2)}</span>
          {rating && (
            <Badge variant="secondary" className="text-xs px-1.5 py-0">
              ⭐ {rating}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}