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

const Favorites = () => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [favoriteProperties, setFavoriteProperties] = useState(demoProperties.slice(0, 0));

  useEffect(() => {
    const favs = localStorage.getItem("favorites");
    if (favs) {
      const favSet = new Set(JSON.parse(favs));
      setFavorites(favSet);
      
      // Filter properties that are in favorites
      const favProps = demoProperties.filter(p => favSet.has(p.title));
      setFavoriteProperties(favProps);
    }
  }, []);

  const removeFavorite = (title: string) => {
    const newFavorites = new Set(favorites);
    newFavorites.delete(title);
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify([...newFavorites]));
    
    // Update favorite properties
    setFavoriteProperties(prev => prev.filter(p => p.title !== title));
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

          {favoriteProperties.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {favoriteProperties.map((property, index) => (
                <div key={index} className="relative">
                  <PropertyCard {...property} />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                    onClick={() => removeFavorite(property.title)}
                  >
                    <Heart size={16} className="fill-red-500 text-red-500" />
                  </Button>
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
