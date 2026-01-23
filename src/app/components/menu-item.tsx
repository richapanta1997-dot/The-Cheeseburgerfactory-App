import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  popular?: boolean;
}

interface MenuItemProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{item.name}</h3>
          <span className="font-semibold text-green-600">${item.price.toFixed(2)}</span>
        </div>
        {item.popular && (
          <Badge className="mb-2 bg-orange-500">Popular</Badge>
        )}
        <p className="text-sm text-gray-600">{item.description}</p>
        <div className="mt-3 pt-3 border-t">
          <Badge variant="outline" className="text-xs">{item.category}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}