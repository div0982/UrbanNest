import React, { useState, useEffect } from 'react';
import PropertyMap from '@/components/PropertyMap';
import { demoProperties, DemoProperty } from '@/data/properties';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { MapPin, Filter, List, Grid, Star, Wifi, Car, Dumbbell, Shield, ArrowUpDown, Snowflake } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MapPage: React.FC = () => {
  const [properties, setProperties] = useState<DemoProperty[]>(demoProperties);
  const [selectedProperty, setSelectedProperty] = useState<DemoProperty | undefined>();
  const [showRealPlacesOnly, setShowRealPlacesOnly] = useState(false);
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [filteredProperties, setFilteredProperties] = useState<DemoProperty[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = showRealPlacesOnly 
      ? properties.filter(p => p.isRealPlace && p.latitude && p.longitude)
      : properties.filter(p => p.latitude && p.longitude);
    setFilteredProperties(filtered);
  }, [properties, showRealPlacesOnly]);

  const handlePropertySelect = (property: DemoProperty) => {
    setSelectedProperty(property);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'WiFi': return <Wifi className="w-4 h-4" />;
      case 'Parking': return <Car className="w-4 h-4" />;
      case 'Gym': return <Dumbbell className="w-4 h-4" />;
      case 'Security': return <Shield className="w-4 h-4" />;
      case 'Elevator': return <ArrowUpDown className="w-4 h-4" />;
      case 'AC': return <Snowflake className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const getAmenities = (property: DemoProperty) => {
    const amenities = [];
    if (property.hasWiFi) amenities.push('WiFi');
    if (property.hasParking) amenities.push('Parking');
    if (property.hasGym) amenities.push('Gym');
    if (property.hasSecurity) amenities.push('Security');
    if (property.hasElevator) amenities.push('Elevator');
    if (property.hasAC) amenities.push('AC');
    return amenities;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Property Map</h1>
              <p className="text-sm text-gray-600">Find your perfect accommodation</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Real Places Toggle */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="real-places"
                  checked={showRealPlacesOnly}
                  onCheckedChange={setShowRealPlacesOnly}
                />
                <Label htmlFor="real-places" className="text-sm font-medium">
                  Real Places Only
                </Label>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Map
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4 mr-2" />
                  List
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {viewMode === 'map' ? (
          <div className="space-y-6">
            {/* Map */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Interactive Map
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <PropertyMap
                  properties={properties}
                  selectedProperty={selectedProperty}
                  onPropertySelect={handlePropertySelect}
                  showRealPlacesOnly={showRealPlacesOnly}
                  onToggleRealPlaces={setShowRealPlacesOnly}
                  height="600px"
                  className="rounded-lg"
                />
              </CardContent>
            </Card>

            {/* Selected Property Details */}
            {selectedProperty && (
              <Card>
                <CardHeader>
                  <CardTitle>Selected Property</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <img
                        src={selectedProperty.image}
                        alt={selectedProperty.title}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold">{selectedProperty.title}</h3>
                        <p className="text-gray-600">{selectedProperty.location}</p>
                        {selectedProperty.fullAddress && (
                          <p className="text-sm text-gray-500">{selectedProperty.fullAddress}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-green-600">{selectedProperty.price}</span>
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="ml-1">{selectedProperty.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm">
                        <Badge variant="outline">{selectedProperty.roomType}</Badge>
                        <Badge variant="outline">{selectedProperty.gender}</Badge>
                        {selectedProperty.verified && (
                          <Badge variant="secondary">Verified</Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {getAmenities(selectedProperty).map((amenity) => (
                          <div key={amenity} className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                            {getAmenityIcon(amenity)}
                            <span className="ml-1">{amenity}</span>
                          </div>
                        ))}
                      </div>
                      
                      <Button 
                        onClick={() => navigate(`/property/${properties.indexOf(selectedProperty)}`)}
                        className="w-full"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        ) : (
          /* List View */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {filteredProperties.length} Properties Found
              </h2>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <span className="text-sm text-gray-600">Filter by amenities</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProperties.map((property, index) => (
                <Card 
                  key={index} 
                  className={`cursor-pointer transition-all hover:shadow-lg ${
                    selectedProperty === property ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => handlePropertySelect(property)}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      
                      <div>
                        <h3 className="font-semibold text-sm line-clamp-2">{property.title}</h3>
                        <p className="text-xs text-gray-600">{property.location}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-600">{property.price}</span>
                        <div className="flex items-center text-yellow-500">
                          <Star className="w-3 h-3 fill-current" />
                          <span className="ml-1 text-sm">{property.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">{property.roomType}</Badge>
                        <Badge variant="outline" className="text-xs">{property.gender}</Badge>
                        {property.verified && (
                          <Badge variant="secondary" className="text-xs">Verified</Badge>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {getAmenities(property).slice(0, 3).map((amenity) => (
                          <div key={amenity} className="flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                            {getAmenityIcon(amenity)}
                            <span className="ml-1">{amenity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapPage;
