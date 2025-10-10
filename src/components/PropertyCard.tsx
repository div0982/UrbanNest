import { MapPin, Users, Utensils, Wifi, Shield } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PropertyCardProps {
  image: string;
  title: string;
  location: string;
  price: string;
  gender: "Male" | "Female" | "Co-living";
  foodIncluded: boolean;
  verified: boolean;
  roomType: string;
  rating?: number;
}

const PropertyCard = ({
  image,
  title,
  location,
  price,
  gender,
  foodIncluded,
  verified,
  roomType,
  rating = 4.5,
}: PropertyCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/property/${encodeURIComponent(title)}`);
  };

  return (
    <Card 
      className="group overflow-hidden hover:shadow-[var(--shadow-card-hover)] transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
      onClick={handleCardClick}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {verified && (
          <div className="absolute top-3 left-3">
            <Badge variant="success" className="gap-1">
              <Shield size={12} />
              Verified
            </Badge>
          </div>
        )}
        <div className="absolute top-3 right-3">
          <Badge className="bg-background/90 text-foreground">
            ⭐ {rating}
          </Badge>
        </div>
      </div>

      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
        </div>
        
        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <MapPin size={14} className="mr-1" />
          <span className="line-clamp-1">{location}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="outline" className="gap-1">
            <Users size={12} />
            {roomType}
          </Badge>
          <Badge variant="outline">
            {gender}
          </Badge>
          {foodIncluded && (
            <Badge variant="outline" className="gap-1">
              <Utensils size={12} />
              Food
            </Badge>
          )}
          <Badge variant="outline" className="gap-1">
            <Wifi size={12} />
            WiFi
          </Badge>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-2xl font-bold text-primary">{price}</span>
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
