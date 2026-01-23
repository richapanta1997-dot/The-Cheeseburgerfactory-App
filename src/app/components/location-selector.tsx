import { MapPin, Check } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { ScrollArea } from '@/app/components/ui/scroll-area';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/app/components/ui/sheet';
import { Badge } from '@/app/components/ui/badge';

export interface Location {
  id: string;
  name: string;
  address: string;
  distance?: string;
  hours: string;
  phone: string;
}

interface LocationSelectorProps {
  locations: Location[];
  selectedLocation: Location;
  onSelectLocation: (location: Location) => void;
}

export function LocationSelector({ locations, selectedLocation, onSelectLocation }: LocationSelectorProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="w-full justify-start p-0 h-auto hover:bg-transparent">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4" />
            <div className="text-left">
              <div className="font-medium text-gray-900">{selectedLocation.name}</div>
              <div>{selectedLocation.address}</div>
            </div>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh]">
        <SheetHeader>
          <SheetTitle>Select Location</SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(80vh-80px)] mt-4">
          <div className="space-y-3">
            {locations.map((location) => (
              <Card 
                key={location.id}
                className={`cursor-pointer transition-all ${
                  selectedLocation.id === location.id 
                    ? 'border-red-500 border-2 bg-red-50' 
                    : 'hover:border-gray-400'
                }`}
                onClick={() => onSelectLocation(location)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{location.name}</h3>
                        {selectedLocation.id === location.id && (
                          <Check className="h-5 w-5 text-red-500" />
                        )}
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-start gap-2">
                          <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                          <span>{location.address}</span>
                        </div>
                        
                        {location.distance && (
                          <Badge variant="outline" className="mt-2">
                            {location.distance} away
                          </Badge>
                        )}
                        
                        <div className="mt-2 pt-2 border-t text-xs">
                          <div>📞 {location.phone}</div>
                          <div>🕐 {location.hours}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
