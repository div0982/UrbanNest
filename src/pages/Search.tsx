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
import { PropertyService, Property, PropertyFilters } from "@/services/propertyService";
import { Search as SearchIcon, SlidersHorizontal, MapPin, Clock, Map, Grid, List, Star, Loader2, RefreshCw } from "lucide-react";

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

const Search = () => {
  const navigate = useNavigate();
  const queryParams = useQuery();
  const q = (queryParams.get("q") || "").trim();
  
  // State for Firebase data
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Dummy data for map visualization
  const dummyProperties = [
    {
      id: "dummy-1",
      pgName: "Sunshine Residency",
      locality: "Koramangala",
      city: "Bangalore",
      singlePrice: 8500,
      doublePrice: 0,
      triplePrice: 0,
      singleRooms: 4,
      doubleRooms: 0,
      tripleRooms: 0,
      genderPreference: "male" as const,
      foodIncluded: true,
      verified: true,
      rating: 4.7,
      amenities: ["WiFi", "AC", "Parking"],
      latitude: 12.9352,
      longitude: 77.6245,
      status: "approved" as const,
      ownerName: "Rajesh Kumar",
      ownerPhone: "+91-9876543210",
      ownerEmail: "rajesh@sunshine.com",
      ownerId: "dummy-owner-1",
      aadhar: "123456789012",
      pan: "ABCDE1234F",
      createdAt: new Date() as any,
      updatedAt: new Date() as any,
      propertyType: "hostel" as const,
      address: "123, 5th Cross, Koramangala",
      pincode: "560034",
      description: "A comfortable PG in the heart of Koramangala",
      gateClosingTime: "11:00 PM",
      smokingAllowed: false,
      drinkingAllowed: false,
      guestsAllowed: false,
      foodType: "both" as const
    },
    {
      id: "dummy-2", 
      pgName: "Green Valley PG",
      locality: "Powai",
      city: "Mumbai",
      singlePrice: 12000,
      doublePrice: 0,
      triplePrice: 0,
      singleRooms: 8,
      doubleRooms: 0,
      tripleRooms: 0,
      genderPreference: "female" as const,
      foodIncluded: true,
      verified: true,
      rating: 4.8,
      amenities: ["WiFi", "AC", "Gym", "Parking"],
      latitude: 19.1197,
      longitude: 72.9064,
      status: "approved" as const,
      ownerName: "Priya Sharma",
      ownerPhone: "+91-9876543211",
      ownerEmail: "priya@greenvalley.com",
      ownerId: "dummy-owner-2",
      aadhar: "123456789013",
      pan: "ABCDE1235F",
      createdAt: new Date() as any,
      updatedAt: new Date() as any,
      propertyType: "apartment" as const,
      address: "456, Powai Lake Road",
      pincode: "400076",
      description: "Premium PG with modern amenities",
      gateClosingTime: "10:30 PM",
      smokingAllowed: false,
      drinkingAllowed: false,
      guestsAllowed: true,
      foodType: "veg" as const
    },
    {
      id: "dummy-3",
      pgName: "Elite Heights Premium",
      locality: "Hinjewadi",
      city: "Pune",
      singlePrice: 0,
      doublePrice: 15500,
      triplePrice: 0,
      singleRooms: 0,
      doubleRooms: 6,
      tripleRooms: 0,
      genderPreference: "coliving" as const,
      foodIncluded: false,
      verified: true,
      rating: 4.9,
      amenities: ["WiFi", "AC", "Gym", "Swimming Pool", "Parking"],
      latitude: 18.5912,
      longitude: 73.7415,
      status: "approved" as const,
      ownerName: "Amit Singh",
      ownerPhone: "+91-9876543212",
      ownerEmail: "amit@eliteheights.com",
      ownerId: "dummy-owner-3",
      aadhar: "123456789014",
      pan: "ABCDE1236F",
      createdAt: new Date() as any,
      updatedAt: new Date() as any,
      propertyType: "villa" as const,
      address: "789, Hinjewadi IT Park",
      pincode: "411057",
      description: "Luxury co-living space",
      gateClosingTime: "12:00 AM",
      smokingAllowed: true,
      drinkingAllowed: true,
      guestsAllowed: true,
      foodType: "both" as const
    }
  ];
  
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
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedProperty, setSelectedProperty] = useState<Property | undefined>();
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Normalize Firebase properties to ensure they have all required fields
  const normalizeProperty = (property: Property): Property => {
    const normalized = {
      ...property,
      // Ensure all required fields have defaults
      amenities: property.amenities || [],
      rating: property.rating || 0,
      verified: property.verified || false,
      foodIncluded: property.foodIncluded || false,
      genderPreference: property.genderPreference || 'coliving',
      singlePrice: property.singlePrice || 0,
      doublePrice: property.doublePrice || 0,
      triplePrice: property.triplePrice || 0,
      singleRooms: property.singleRooms || 0,
      doubleRooms: property.doubleRooms || 0,
      tripleRooms: property.tripleRooms || 0,
      // Add coordinates if missing (use city center as default)
      latitude: property.latitude || getDefaultLatitude(property.city),
      longitude: property.longitude || getDefaultLongitude(property.city),
    };
    
    console.log('Normalizing property:', {
      id: property.id,
      name: property.pgName,
      image: property.image,
      images: property.images,
      normalizedImage: normalized.image,
      normalizedImages: normalized.images
    });
    
    return normalized;
  };

  // Helper function to get default coordinates for cities
  const getDefaultLatitude = (city?: string): number => {
    const cityCoords: { [key: string]: number } = {
      'Bangalore': 12.9716,
      'Mumbai': 19.0760,
      'Pune': 18.5204,
      'Delhi': 28.7041,
      'Chennai': 13.0827,
      'Hyderabad': 17.3850,
      'Kolkata': 22.5726,
    };
    return cityCoords[city || 'Bangalore'] || 12.9716;
  };

  const getDefaultLongitude = (city?: string): number => {
    const cityCoords: { [key: string]: number } = {
      'Bangalore': 77.5946,
      'Mumbai': 72.8777,
      'Pune': 73.8567,
      'Delhi': 77.1025,
      'Chennai': 80.2707,
      'Hyderabad': 78.4867,
      'Kolkata': 88.3639,
    };
    return cityCoords[city || 'Bangalore'] || 77.5946;
  };

  // Manual refresh function
  const refreshProperties = async () => {
    setIsRefreshing(true);
    try {
      let fetchedProperties: Property[] = [];
      
      if (q) {
        fetchedProperties = await PropertyService.searchProperties(q);
      } else {
        fetchedProperties = await PropertyService.getApprovedProperties();
      }
      
      console.log(`Refreshed: Loaded ${fetchedProperties.length} approved properties from Firebase`);
      console.log('Refreshed properties:', fetchedProperties.map(p => ({
        id: p.id,
        name: p.pgName,
        status: p.status
      })));
      
      // Normalize Firebase properties to ensure consistent display
      const normalizedProperties = fetchedProperties.map(normalizeProperty);
      setProperties(normalizedProperties);
    } catch (err) {
      console.error('Error refreshing properties:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Load properties from Firebase
  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let fetchedProperties: Property[] = [];
        
        if (q) {
          // Search with query
          fetchedProperties = await PropertyService.searchProperties(q);
        } else {
          // Get only approved properties for public search
          fetchedProperties = await PropertyService.getApprovedProperties();
        }
        
        // If no Firebase properties found, we still have dummy data to show
        console.log(`=== SEARCH PAGE DEBUG ===`);
        console.log(`Loaded ${fetchedProperties.length} approved properties from Firebase`);
        console.log('Raw Firebase properties:', fetchedProperties.map(p => ({
          id: p.id,
          name: p.pgName,
          status: p.status,
          verified: p.verified,
          image: p.image,
          images: p.images
        })));
        
        // Normalize Firebase properties to ensure consistent display
        const normalizedProperties = fetchedProperties.map(normalizeProperty);
        console.log('Normalized properties:', normalizedProperties.map(p => ({
          id: p.id,
          name: p.pgName,
          status: p.status,
          verified: p.verified
        })));
        
        setProperties(normalizedProperties);
        console.log('=== END SEARCH PAGE DEBUG ===');
      } catch (err) {
        console.error('Error loading properties:', err);
        // Don't set error state - we have dummy data to show
        console.log('Using dummy data due to Firebase error');
        setProperties([]); // Empty array, dummy data will still be shown
      } finally {
        setLoading(false);
      }
    };

    loadProperties();
    
    // Auto-refresh every 30 seconds to catch newly approved properties
    const refreshInterval = setInterval(loadProperties, 30000);
    
    return () => clearInterval(refreshInterval);
  }, [q]);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("recentSearches");
    if (saved) setRecentSearches(JSON.parse(saved));
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
    console.log('=== FILTERING DEBUG ===');
    console.log('Properties to filter:', properties.length);
    console.log('Properties details:', properties.map(p => ({ id: p.id, name: p.pgName })));
    
    // TEMPORARY: Return properties directly without any filtering
    return properties;
  }, [properties, filters]);

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
                        onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
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
              <Button
                variant="outline"
                size="sm"
                onClick={refreshProperties}
                disabled={isRefreshing}
                className="gap-1"
              >
                <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
                Refresh
              </Button>
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
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mr-2" />
              <span>Loading properties...</span>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : viewMode === 'list' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((p, idx) => (
                <PropertyCard key={`sr-${idx}`} property={p} />
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
                          src="/placeholder.svg"
                          alt={selectedProperty.pgName}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h3 className="text-xl font-semibold">{selectedProperty.pgName}</h3>
                          <p className="text-gray-600">{selectedProperty.locality}, {selectedProperty.city}</p>
                          {selectedProperty.fullAddress && (
                            <p className="text-sm text-gray-500">{selectedProperty.fullAddress}</p>
                          )}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-green-600">
                            ₹{Math.min(
                              selectedProperty.singlePrice || Infinity,
                              selectedProperty.doublePrice || Infinity,
                              selectedProperty.triplePrice || Infinity
                            ).toLocaleString()}
                          </span>
                          <div className="flex items-center text-yellow-500">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="ml-1">{selectedProperty.rating || 'N/A'}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-sm">
                          <Badge variant="outline">
                            {selectedProperty.singleRooms > 0 ? 'Single' : 
                             selectedProperty.doubleRooms > 0 ? 'Double' : 
                             selectedProperty.tripleRooms > 0 ? 'Triple' : 'Mixed'}
                          </Badge>
                          <Badge variant="outline">{selectedProperty.genderPreference}</Badge>
                          {selectedProperty.verified && (
                            <Badge variant="secondary">Verified</Badge>
                          )}
                        </div>
                        
                        <Button 
                          onClick={() => navigate(`/property/${selectedProperty.id}`)}
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


