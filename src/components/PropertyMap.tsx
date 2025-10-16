import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, Tooltip, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DemoProperty } from '@/data/properties';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Home, Star, Wifi, Car, Dumbbell, Shield, ArrowUpDown, Waves, Snowflake } from 'lucide-react';

// Fix for default markers in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons
const createCustomIcon = (color: string, icon: any) => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
      background-color: ${color};
      width: 30px;
      height: 30px;
      border-radius: 50% 50% 50% 0;
      position: relative;
      transform: rotate(-45deg);
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="transform: rotate(45deg); color: white; font-size: 12px;">
        ${icon}
      </div>
    </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
};

const homeIcon = createCustomIcon('#ff6b35', '🏠');
const premiumIcon = createCustomIcon('#4caf50', '⭐');
const sharedIcon = createCustomIcon('#2196f3', '👥');
const singleIcon = createCustomIcon('#9c27b0', '👤');

const getMarkerIcon = (property: DemoProperty) => {
  if (property.roomType === 'Premium') return premiumIcon;
  if (property.roomType === 'Shared') return sharedIcon;
  if (property.roomType === 'Single') return singleIcon;
  return homeIcon;
};

interface PropertyMapProps {
  properties: DemoProperty[];
  selectedProperty?: DemoProperty;
  onPropertySelect?: (property: DemoProperty) => void;
  showRealPlacesOnly?: boolean;
  onToggleRealPlaces?: (show: boolean) => void;
  height?: string;
  className?: string;
}

const MapCenter: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, 13);
  }, [map, center]);

  return null;
};

const PropertyMap: React.FC<PropertyMapProps> = ({
  properties,
  selectedProperty,
  onPropertySelect,
  showRealPlacesOnly = false,
  onToggleRealPlaces,
  height = '400px',
  className = ''
}) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]); // India center
  const [mapZoom, setMapZoom] = useState(6);

  // Filter properties based on real places toggle - memoized to prevent infinite re-renders
  const filteredProperties = useMemo(() => {
    return showRealPlacesOnly 
      ? properties.filter(p => p.isRealPlace && p.latitude && p.longitude)
      : properties.filter(p => p.latitude && p.longitude);
  }, [properties, showRealPlacesOnly]);

  // Calculate map bounds
  useEffect(() => {
    if (filteredProperties.length > 0) {
      const lats = filteredProperties.map(p => p.latitude!).filter(lat => lat !== undefined);
      const lngs = filteredProperties.map(p => p.longitude!).filter(lng => lng !== undefined);
      
      if (lats.length > 0 && lngs.length > 0) {
        const minLat = Math.min(...lats);
        const maxLat = Math.max(...lats);
        const minLng = Math.min(...lngs);
        const maxLng = Math.max(...lngs);
        
        setMapCenter([(minLat + maxLat) / 2, (minLng + maxLng) / 2]);
        setMapZoom(10);
      }
    }
  }, [filteredProperties]);

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'WiFi': return <Wifi className="w-3 h-3" />;
      case 'Parking': return <Car className="w-3 h-3" />;
      case 'Gym': return <Dumbbell className="w-3 h-3" />;
      case 'Security': return <Shield className="w-3 h-3" />;
      case 'Elevator': return <ArrowUpDown className="w-3 h-3" />;
      case 'AC': return <Snowflake className="w-3 h-3" />;
      default: return <Home className="w-3 h-3" />;
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
    <div className={`relative ${className}`}>
      {/* Toggle for real places */}
      {onToggleRealPlaces && (
        <div className="absolute top-4 right-4 z-[1000]">
          <Button
            variant={showRealPlacesOnly ? "default" : "outline"}
            size="sm"
            onClick={() => onToggleRealPlaces(!showRealPlacesOnly)}
            className="bg-white/90 backdrop-blur-sm shadow-lg"
          >
            <MapPin className="w-4 h-4 mr-2" />
            {showRealPlacesOnly ? 'Real Places' : 'All Places'}
          </Button>
        </div>
      )}

      {/* Map Container */}
      <div style={{ height }} className="rounded-lg overflow-hidden border">
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
          scrollWheelZoom={true}
          doubleClickZoom={true}
          touchZoom={true}
          dragging={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <ZoomControl position="bottomright" />
          
          <MapCenter center={mapCenter} />

          {/* Property Markers */}
          {filteredProperties.map((property, index) => (
            <Marker
              key={index}
              position={[property.latitude!, property.longitude!]}
              icon={getMarkerIcon(property)}
              eventHandlers={{
                click: () => onPropertySelect?.(property),
              }}
            >
              <Popup maxWidth={300} className="property-popup">
                <div className="p-2">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm text-gray-900 line-clamp-2">
                      {property.title}
                    </h3>
                    {property.verified && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Verified
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-600 mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span className="line-clamp-1">{property.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-lg font-bold text-green-600">{property.price}</span>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="ml-1 text-sm">{property.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {getAmenities(property).slice(0, 4).map((amenity) => (
                      <div key={amenity} className="flex items-center text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {getAmenityIcon(amenity)}
                        <span className="ml-1">{amenity}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{property.roomType}</span>
                    <span>{property.gender}</span>
                  </div>
                  
                  {property.fullAddress && (
                    <div className="mt-2 text-xs text-gray-500 border-t pt-2">
                      {property.fullAddress}
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

          {/* Selected Property Circle */}
          {selectedProperty && selectedProperty.latitude && selectedProperty.longitude && (
            <Circle
              center={[selectedProperty.latitude, selectedProperty.longitude]}
              radius={200}
              pathOptions={{
                color: '#ff6b35',
                fillColor: '#ff6b35',
                fillOpacity: 0.1,
                weight: 2,
                dashArray: '5, 5'
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div className="text-center">
                  <div className="font-semibold">{selectedProperty.title}</div>
                  <div className="text-sm text-gray-600">{selectedProperty.price}</div>
                </div>
              </Tooltip>
            </Circle>
          )}
        </MapContainer>
      </div>

      {/* Property Count Badge */}
      <div className="absolute bottom-4 left-4 z-[1000]">
        <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm shadow-lg">
          {filteredProperties.length} properties
        </Badge>
      </div>
    </div>
  );
};

export default PropertyMap;
