import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import type { Location } from '@/app/components/location-selector';

interface FindUsProps {
  locations: Location[];
  selectedLocation: Location;
  onSelectLocation: (location: Location) => void;
}

export function FindUs({ locations, selectedLocation, onSelectLocation }: FindUsProps) {
  const handleGetDirections = (location: Location) => {
    // Create Google Maps URL with the address
    const encodedAddress = encodeURIComponent(location.address);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(mapsUrl, '_blank');
  };

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone.replace(/[^0-9]/g, '')}`;
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Our Locations</h2>
        <p className="text-gray-600">
          Find your nearest Cheeseburger Factory location
        </p>
      </div>

      {/* Locations List */}
      <div className="space-y-4">
        {locations.map((location) => {
          const isSelected = selectedLocation.id === location.id;
          
          return (
            <Card 
              key={location.id}
              className={`transition-all ${
                isSelected 
                  ? 'border-red-500 border-2 bg-red-50' 
                  : 'hover:shadow-md'
              }`}
            >
              <CardContent className="p-5">
                <div className="space-y-4">
                  {/* Location Name & Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{location.name}</h3>
                      {isSelected && (
                        <Badge className="bg-red-500">Current Location</Badge>
                      )}
                      {location.distance && (
                        <Badge variant="outline" className="ml-2">
                          {location.distance} away
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start gap-3 text-gray-700">
                    <MapPin className="h-5 w-5 mt-0.5 shrink-0 text-red-500" />
                    <span>{location.address}</span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3 text-gray-700">
                    <Phone className="h-5 w-5 shrink-0 text-red-500" />
                    <button
                      onClick={() => handleCall(location.phone)}
                      className="hover:text-red-500 transition-colors"
                    >
                      {location.phone}
                    </button>
                  </div>

                  {/* Hours */}
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="h-5 w-5 shrink-0 text-red-500" />
                    <span>{location.hours}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-3 border-t">
                    <Button
                      onClick={() => handleGetDirections(location)}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                    >
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                    
                    {!isSelected && (
                      <Button
                        onClick={() => onSelectLocation(location)}
                        variant="outline"
                        className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
                      >
                        Order Here
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-900">
          <strong>Note:</strong> Opening hours may vary on public holidays. 
          Please call ahead to confirm availability.
        </p>
      </div>
    </div>
  );
}
