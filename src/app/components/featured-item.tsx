import { Clock } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

interface FeaturedItemProps {
  name: string;
  description?: string;
  originalPrice?: number;
  salePrice: number;
  badge?: string;
}

export function FeaturedItem({ name, description, originalPrice, salePrice, badge }: FeaturedItemProps) {
  return (
    <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            {badge && (
              <Badge className="bg-red-500 mb-2">
                <Clock className="h-3 w-3 mr-1" />
                {badge}
              </Badge>
            )}
            <h3 className="font-semibold text-lg">{name}</h3>
            {description && (
              <p className="text-sm text-gray-600 mt-1">{description}</p>
            )}
          </div>
          <div className="text-right">
            {originalPrice && (
              <div className="text-sm text-gray-500 line-through">${originalPrice.toFixed(2)}</div>
            )}
            <div className="text-xl font-bold text-red-600">${salePrice.toFixed(2)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
