import { MapPin, Users, Utensils, Wifi, Shield, Heart } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Property } from "@/services/propertyService";
import { useAuth } from "@/contexts/AuthContext";
import FavoritesService from "@/services/favoritesService";
import { useState, useEffect } from "react";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Check if property is favorited when component mounts
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (currentUser && property.id) {
        try {
          const favorited = await FavoritesService.isPropertyFavorited(currentUser.uid, property.id);
          setIsFavorited(favorited);
        } catch (error) {
          console.error('Error checking favorite status:', error);
        }
      }
    };

    checkFavoriteStatus();
  }, [currentUser, property.id]);

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!currentUser) {
      navigate('/login');
      return;
    }

    try {
      setIsLoading(true);
      const newFavoriteStatus = await FavoritesService.toggleFavorite(currentUser.uid, property);
      setIsFavorited(newFavoriteStatus);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to get display price
  const getDisplayPrice = () => {
    if (property.singlePrice > 0) {
      return `₹${property.singlePrice.toLocaleString()}`;
    } else if (property.doublePrice > 0) {
      return `₹${property.doublePrice.toLocaleString()}`;
    } else if (property.triplePrice > 0) {
      return `₹${property.triplePrice.toLocaleString()}`;
    }
    return "Contact for price";
  };

  // Helper function to get room type
  const getRoomType = () => {
    const types = [];
    if (property.singleRooms > 0) types.push(`${property.singleRooms} Single`);
    if (property.doubleRooms > 0) types.push(`${property.doubleRooms} Double`);
    if (property.tripleRooms > 0) types.push(`${property.tripleRooms} Triple`);
    return types.join(", ");
  };

  // Helper function to get gender display
  const getGenderDisplay = () => {
    const genderMap: { [key: string]: string } = {
      'male': 'Male',
      'female': 'Female',
      'coliving': 'Co-living'
    };
    return genderMap[property.genderPreference] || property.genderPreference;
  };

  return (
    <Card 
      className="group overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img 
          src={property.image || "/placeholder.svg"} 
          alt={property.pgName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {property.verified && (
          <div className="absolute top-3 left-3">
            <Badge variant="secondary" className="gap-1 bg-green-100 text-green-800">
              <Shield size={12} />
              Verified
            </Badge>
          </div>
        )}
        {property.rating && (
          <div className="absolute top-3 right-12">
            <Badge className="bg-background/90 text-foreground">
              ⭐ {property.rating}
            </Badge>
          </div>
        )}
        {/* Favorite Button */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute top-3 right-3 bg-background/80 hover:bg-background"
          onClick={handleFavoriteClick}
          disabled={isLoading}
        >
          <Heart 
            size={20} 
            className={isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"} 
          />
        </Button>
      </div>

      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {property.pgName}
          </h3>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin size={14} className="mr-1" />
          <span className="line-clamp-1">{property.locality}, {property.city}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="gap-1">
            <Users size={12} />
            {getRoomType()}
          </Badge>
          <Badge variant="outline">
            {getGenderDisplay()}
          </Badge>
          {property.foodIncluded && (
            <Badge variant="outline" className="gap-1">
              <Utensils size={12} />
              Food
            </Badge>
          )}
          {property.amenities.includes('WiFi') && (
            <Badge variant="outline" className="gap-1">
              <Wifi size={12} />
              WiFi
            </Badge>
          )}
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">{getDisplayPrice()}</span>
            <span className="text-muted-foreground text-sm">/month</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
        >
          View Details
        </Button>
        <Button 
          className="flex-1"
          onClick={(e) => {
            e.stopPropagation();
            handleCardClick();
          }}
        >
          Book Visit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;