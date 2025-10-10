import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import PropertyCard from "@/components/PropertyCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { demoProperties } from "@/data/properties";
import { Search as SearchIcon, SlidersHorizontal, MapPin, Clock, Heart } from "lucide-react";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const Search = () => {
  const navigate = useNavigate();
  const queryParams = useQuery();
  const q = (queryParams.get("q") || "").trim();
  
  // Filters state
  const [filters, setFilters] = useState({
    priceRange: [5000, 20000] as [number, number],
    gender: "any",
    foodIncluded: false,
    verified: false,
    roomType: "any",
    sortBy: "relevance"
  });
  
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  // Load recent searches and favorites from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) setRecentSearches(JSON.parse(saved));
    
    const favs = localStorage.getItem("favorites");
    if (favs) setFavorites(new Set(JSON.parse(favs)));
  }, []);

  // Save recent search
  useEffect(() => {
    if (q && !recentSearches.includes(q)) {
      const updated = [q, ...recentSearches.slice(0, 4)];
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated));
    }
  }, [q, recentSearches]);

  const filtered = useMemo(() => {
    let results = demoProperties;
    
    // Text search
    if (q) {
      const lower = q.toLowerCase();
      results = results.filter((p) =>
        [p.title, p.location, p.roomType, p.gender].some((v) => v.toLowerCase().includes(lower))
      );
    }
    
    // Apply filters
    results = results.filter((p) => {
      const price = parseInt(p.price.replace(/[₹,]/g, ""));
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false;
      if (filters.gender !== "any" && p.gender !== filters.gender) return false;
      if (filters.foodIncluded && !p.foodIncluded) return false;
      if (filters.verified && !p.verified) return false;
      if (filters.roomType !== "any" && p.roomType !== filters.roomType) return false;
      return true;
    });
    
    // Sort
    switch (filters.sortBy) {
      case "price-low":
        return results.sort((a, b) => parseInt(a.price.replace(/[₹,]/g, "")) - parseInt(b.price.replace(/[₹,]/g, "")));
      case "price-high":
        return results.sort((a, b) => parseInt(b.price.replace(/[₹,]/g, "")) - parseInt(a.price.replace(/[₹,]/g, "")));
      case "rating":
        return results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return results;
    }
  }, [q, filters]);

  const toggleFavorite = (title: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(title)) {
      newFavorites.delete(title);
    } else {
      newFavorites.add(title);
    }
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify([...newFavorites]));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-6">
            <div className="flex-1 flex gap-2">
              <Input
                defaultValue={q}
                placeholder="Search city, locality, PG name..."
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const value = (e.target as HTMLInputElement).value.trim();
                    navigate(`/search?q=${encodeURIComponent(value)}`);
                  }
                }}
              />
              <Button
                onClick={() => {
                  const input = document.querySelector<HTMLInputElement>("input[placeholder='Search city, locality, PG name...']");
                  const value = (input?.value || "").trim();
                  navigate(`/search?q=${encodeURIComponent(value)}`);
                }}
              >
                <SearchIcon size={18} className="mr-1" />
                Search
              </Button>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <SlidersHorizontal size={18} /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Select options to refine properties</SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Price Range</label>
                    <div className="px-2">
                      <Slider
                        value={filters.priceRange}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                        max={25000}
                        min={3000}
                        step={500}
                        className="mb-2"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>₹{filters.priceRange[0].toLocaleString()}</span>
                        <span>₹{filters.priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Gender Preference</label>
                    <Select value={filters.gender} onValueChange={(value) => setFilters(prev => ({ ...prev, gender: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="Male">Male Only</SelectItem>
                        <SelectItem value="Female">Female Only</SelectItem>
                        <SelectItem value="Co-living">Co-living</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Room Type */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Room Type</label>
                    <Select value={filters.roomType} onValueChange={(value) => setFilters(prev => ({ ...prev, roomType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Shared">Shared</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Sort By</label>
                    <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="food"
                        checked={filters.foodIncluded}
                        onCheckedChange={(checked) => setFilters(prev => ({ ...prev, foodIncluded: !!checked }))}
                      />
                      <label htmlFor="food" className="text-sm">Food Included</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="verified"
                        checked={filters.verified}
                        onCheckedChange={(checked) => setFilters(prev => ({ ...prev, verified: !!checked }))}
                      />
                      <label htmlFor="verified" className="text-sm">Verified Only</label>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setFilters({
                      priceRange: [5000, 20000],
                      gender: "any",
                      foodIncluded: false,
                      verified: false,
                      roomType: "any",
                      sortBy: "relevance"
                    })}
                  >
                    Clear Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Recent Searches */}
          {recentSearches.length > 0 && !q && (
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                <Clock size={16} />
                Recent Searches
              </h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, idx) => (
                  <Button
                    key={idx}
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/search?q=${encodeURIComponent(search)}`)}
                  >
                    {search}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Results Header */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">
              {q ? `Results for "${q}"` : "All PGs"}
            </h1>
            <Badge variant="outline">{filtered.length} results</Badge>
          </div>

          {/* Results Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((p, idx) => (
              <div key={`sr-${idx}`} className="relative">
                <PropertyCard {...p} />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                  onClick={() => toggleFavorite(p.title)}
                >
                  <Heart 
                    size={16} 
                    className={favorites.has(p.title) ? "fill-red-500 text-red-500" : ""} 
                  />
                </Button>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No results found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Search;


