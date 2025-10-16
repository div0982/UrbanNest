import { useMemo, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import PropertyCard from "@/components/PropertyCard";
import PropertyMapView from "@/components/PropertyMapView";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { demoProperties } from "@/data/properties";
import { Search as SearchIcon, SlidersHorizontal, MapPin, Clock, Heart, Map, Grid, List, Star } from "lucide-react";

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
    sortBy: "relevance",
    // New filter options
    hasAC: false,
    hasWiFi: false,
    hasParking: false,
    hasGym: false,
    hasLaundry: false,
    hasSecurity: false,
    hasElevator: false,
    hasBalcony: false,
    hasGeyser: false,
    hasRefrigerator: false
  });
  
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedProperty, setSelectedProperty] = useState<DemoProperty | undefined>();

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
      
      // Apply amenity filters
      if (filters.hasAC && !p.hasAC) return false;
      if (filters.hasWiFi && !p.hasWiFi) return false;
      if (filters.hasParking && !p.hasParking) return false;
      if (filters.hasGym && !p.hasGym) return false;
      if (filters.hasLaundry && !p.hasLaundry) return false;
      if (filters.hasSecurity && !p.hasSecurity) return false;
      if (filters.hasElevator && !p.hasElevator) return false;
      if (filters.hasBalcony && !p.hasBalcony) return false;
      if (filters.hasGeyser && !p.hasGeyser) return false;
      if (filters.hasRefrigerator && !p.hasRefrigerator) return false;
      
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
                className="rounded-xl"
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
                className="rounded-xl"
              >
                <SearchIcon size={18} className="mr-1" />
                Search
              </Button>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 rounded-xl">
                  <SlidersHorizontal size={18} /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 mobile-safe-area rounded-l-2xl">
                <SheetHeader className="pb-4">
                  <SheetTitle className="text-lg font-semibold">Filters</SheetTitle>
                  <SheetDescription className="text-sm text-muted-foreground">Refine your search</SheetDescription>
                </SheetHeader>
                <div className="mt-2 space-y-6 overflow-y-auto">
                  {/* Price Range */}
                  <div className="bg-muted/30 rounded-xl p-4">
                    <label className="text-sm font-semibold mb-3 block text-foreground">Price Range</label>
                    <div className="px-1">
                      <Slider
                        value={filters.priceRange}
                        onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value }))}
                        max={25000}
                        min={3000}
                        step={500}
                        className="mb-3"
                      />
                      <div className="flex justify-between text-sm font-medium">
                        <span className="bg-background px-2 py-1 rounded-md">₹{filters.priceRange[0].toLocaleString()}</span>
                        <span className="bg-background px-2 py-1 rounded-md">₹{filters.priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="bg-muted/30 rounded-xl p-4">
                    <label className="text-sm font-semibold mb-3 block text-foreground">Gender Preference</label>
                    <Select value={filters.gender} onValueChange={(value) => setFilters(prev => ({ ...prev, gender: value }))}>
                      <SelectTrigger className="bg-background border-border/50 rounded-lg">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="Male">Male Only</SelectItem>
                        <SelectItem value="Female">Female Only</SelectItem>
                        <SelectItem value="Co-living">Co-living</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Room Type */}
                  <div className="bg-muted/30 rounded-xl p-4">
                    <label className="text-sm font-semibold mb-3 block text-foreground">Room Type</label>
                    <Select value={filters.roomType} onValueChange={(value) => setFilters(prev => ({ ...prev, roomType: value }))}>
                      <SelectTrigger className="bg-background border-border/50 rounded-lg">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="Single">Single</SelectItem>
                        <SelectItem value="Shared">Shared</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Sort By */}
                  <div className="bg-muted/30 rounded-xl p-4">
                    <label className="text-sm font-semibold mb-3 block text-foreground">Sort By</label>
                    <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value }))}>
                      <SelectTrigger className="bg-background border-border/50 rounded-lg">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="relevance">Relevance</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Basic Checkboxes */}
                  <div className="bg-muted/30 rounded-xl p-4">
                    <label className="text-sm font-semibold mb-3 block text-foreground">Preferences</label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="food"
                          checked={filters.foodIncluded}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, foodIncluded: !!checked }))}
                          className="rounded-md"
                        />
                        <label htmlFor="food" className="text-sm font-medium cursor-pointer">Food Included</label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="verified"
                          checked={filters.verified}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, verified: !!checked }))}
                          className="rounded-md"
                        />
                        <label htmlFor="verified" className="text-sm font-medium cursor-pointer">Verified Only</label>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="bg-muted/30 rounded-xl p-4">
                    <label className="text-sm font-semibold mb-3 block text-foreground">Amenities</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="ac"
                          checked={filters.hasAC}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, hasAC: !!checked }))}
                          className="rounded-md"
                        />
                        <label htmlFor="ac" className="text-sm font-medium cursor-pointer">AC</label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="wifi"
                          checked={filters.hasWiFi}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, hasWiFi: !!checked }))}
                          className="rounded-md"
                        />
                        <label htmlFor="wifi" className="text-sm font-medium cursor-pointer">WiFi</label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="parking"
                          checked={filters.hasParking}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, hasParking: !!checked }))}
                          className="rounded-md"
                        />
                        <label htmlFor="parking" className="text-sm font-medium cursor-pointer">Parking</label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="gym"
                          checked={filters.hasGym}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, hasGym: !!checked }))}
                          className="rounded-md"
                        />
                        <label htmlFor="gym" className="text-sm font-medium cursor-pointer">Gym</label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="laundry"
                          checked={filters.hasLaundry}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, hasLaundry: !!checked }))}
                          className="rounded-md"
                        />
                        <label htmlFor="laundry" className="text-sm font-medium cursor-pointer">Laundry</label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="security"
                          checked={filters.hasSecurity}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, hasSecurity: !!checked }))}
                          className="rounded-md"
                        />
                        <label htmlFor="security" className="text-sm font-medium cursor-pointer">Security</label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="elevator"
                          checked={filters.hasElevator}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, hasElevator: !!checked }))}
                          className="rounded-md"
                        />
                        <label htmlFor="elevator" className="text-sm font-medium cursor-pointer">Elevator</label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="balcony"
                          checked={filters.hasBalcony}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, hasBalcony: !!checked }))}
                          className="rounded-md"
                        />
                        <label htmlFor="balcony" className="text-sm font-medium cursor-pointer">Balcony</label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="geyser"
                          checked={filters.hasGeyser}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, hasGeyser: !!checked }))}
                          className="rounded-md"
                        />
                        <label htmlFor="geyser" className="text-sm font-medium cursor-pointer">Geyser</label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          id="refrigerator"
                          checked={filters.hasRefrigerator}
                          onCheckedChange={(checked) => setFilters(prev => ({ ...prev, hasRefrigerator: !!checked }))}
                          className="rounded-md"
                        />
                        <label htmlFor="refrigerator" className="text-sm font-medium cursor-pointer">Refrigerator</label>
                      </div>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full rounded-xl border-border/50"
                    onClick={() => setFilters({
                      priceRange: [5000, 20000],
                      gender: "any",
                      foodIncluded: false,
                      verified: false,
                      roomType: "any",
                      sortBy: "relevance",
                      hasAC: false,
                      hasWiFi: false,
                      hasParking: false,
                      hasGym: false,
                      hasLaundry: false,
                      hasSecurity: false,
                      hasElevator: false,
                      hasBalcony: false,
                      hasGeyser: false,
                      hasRefrigerator: false
                    })}
                  >
                    Clear All Filters
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
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-semibold">
                {q ? `Results for "${q}"` : "All PGs"}
              </h1>
              <Badge variant="outline">{filtered.length} results</Badge>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-r-none"
                >
                  <List className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                  className="rounded-l-none"
                >
                  <Map className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Content */}
          {viewMode === 'list' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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
          ) : (
            <div className="space-y-4">
              {/* Map View */}
              <Card>
                <CardContent className="p-0">
                  <PropertyMapView
                    properties={filtered}
                    selectedProperty={selectedProperty}
                    onPropertySelect={setSelectedProperty}
                    height="500px"
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <img
                          src={selectedProperty.image}
                          alt={selectedProperty.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <div className="space-y-3">
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
                        
                        <div className="flex items-center space-x-2 text-sm">
                          <Badge variant="outline">{selectedProperty.roomType}</Badge>
                          <Badge variant="outline">{selectedProperty.gender}</Badge>
                          {selectedProperty.verified && (
                            <Badge variant="secondary">Verified</Badge>
                          )}
                        </div>
                        
                        <Button 
                          onClick={() => navigate(`/property/${filtered.indexOf(selectedProperty)}`)}
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
          )}

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


