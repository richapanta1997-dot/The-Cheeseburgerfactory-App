import { Clock, CheckCircle2, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Separator } from '@/app/components/ui/separator';

export interface Order {
  id: string;
  date: string;
  items: Array<{ name: string; quantity: number; price: number }>;
  total: number;
  status: 'completed' | 'preparing' | 'ready';
  pointsEarned: number;
}

interface OrderHistoryProps {
  orders: Order[];
}

export function OrderHistory({ orders }: OrderHistoryProps) {
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'preparing':
        return <Clock className="h-5 w-5 text-orange-600" />;
      case 'ready':
        return <Package className="h-5 w-5 text-blue-600" />;
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'preparing':
        return 'Preparing';
      case 'ready':
        return 'Ready for pickup';
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'preparing':
        return 'bg-orange-100 text-orange-800';
      case 'ready':
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center text-gray-500">
          <Package className="h-16 w-16 mx-auto mb-4 opacity-20" />
          <p>No orders yet</p>
          <p className="text-sm mt-2">Your order history will appear here</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-200px)]">
      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Order #{order.id}</CardTitle>
                <Badge className={getStatusColor(order.status)}>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(order.status)}
                    {getStatusText(order.status)}
                  </div>
                </Badge>
              </div>
              <p className="text-sm text-gray-600">{order.date}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>
                      {item.quantity}x {item.name}
                    </span>
                    <span className="text-gray-600">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-green-600">${order.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-orange-600">Points Earned</span>
                  <span className="text-orange-600 font-semibold">
                    +{order.pointsEarned} pts
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
