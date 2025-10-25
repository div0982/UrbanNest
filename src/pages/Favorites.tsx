import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import PropertyCard from "@/components/PropertyCard";
import { demoProperties } from "@/data/properties";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Search } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import SupabaseFavoritesService from "@/services/supabaseFavoritesService";
import SupabasePropertyService from "@/services/supabasePropertyService";

const Favorites = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [favoriteProperties, setFavoriteProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFavorites = async () => {
      if (!currentUser) {
        setError("Please log in to view your favorites");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Get user's favorites from Firebase
        const userFavorites = await SupabaseFavoritesService.getUserFavorites(currentUser.uid);
        setFavorites(userFavorites);
        
        // Get full property details for each favorite
        const propertyPromises = userFavorites.map(async (favorite) => {
          try {
            const property = await PropertyService.getPropertyById(favorite.propertyId);
            return property;
          } catch (error) {
            console.error(`Error loading property ${favorite.propertyId}:`, error);
            // Return a fallback property object
            return {
              id: favorite.propertyId,
              pgName: favorite.propertyName,
              image: favorite.propertyImage,
              singlePrice: favorite.propertyPrice,
              location: favorite.propertyLocation,
              // Add other required fields with defaults
              propertyType: "apartment" as const,
              address: "",
              city: "",
              locality: "",
              pincode: "",
              singleRooms: 0,
              doubleRooms: 0,
              tripleRooms: 0,
              doublePrice: 0,
              triplePrice: 0,
              amenities: [],
              genderPreference: "coliving" as const,
              foodIncluded: false,
              foodType: "veg" as const,
              gateClosingTime: "",
              smokingAllowed: false,
              drinkingAllowed: false,
              guestsAllowed: false,
              ownerName: "",
              ownerPhone: "",
              ownerEmail: "",
              ownerId: "",
              aadhar: "",
              pan: "",
              status: "approved" as const,
              verified: true,
              rating: 4.5,
              createdAt: new Date() as any,
              updatedAt: new Date() as any,
            };
          }
        });
        
        const properties = await Promise.all(propertyPromises);
        setFavoriteProperties(properties.filter(Boolean));
        
      } catch (error) {
        console.error('Error loading favorites:', error);
        setError("Failed to load favorites");
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [currentUser]);

  const removeFavorite = async (propertyId: string) => {
    if (!currentUser) return;

    try {
      await SupabaseFavoritesService.removeFromFavorites(currentUser.uid, propertyId);
      
      // Update local state
      setFavorites(prev => prev.filter(fav => fav.propertyId !== propertyId));
      setFavoriteProperties(prev => prev.filter(prop => prop.id !== propertyId));
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
              <p className="text-muted-foreground">
                Properties you've saved for later
              </p>
            </div>
            <Badge variant="outline" className="gap-1">
              <Heart size={14} />
              {favoriteProperties.length} saved
            </Badge>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="text-lg">Loading your favorites...</div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-lg text-red-600 mb-4">{error}</div>
              <Button onClick={() => navigate("/login")}>Login to View Favorites</Button>
            </div>
          ) : favoriteProperties.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteProperties.map((property, index) => (
                <div key={property.id || index} className="relative">
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Heart size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
              <p className="text-muted-foreground mb-6">
                Start exploring and save properties you like
              </p>
              <Button onClick={() => navigate("/search")} className="gap-2">
                <Search size={16} />
                Browse Properties
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Favorites;
