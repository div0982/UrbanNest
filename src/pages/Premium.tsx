import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import PropertyCard from "@/components/PropertyCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, MapPin, Star, Crown, Car, Wifi, Dumbbell, Coffee } from "lucide-react";
import { demoProperties } from "@/data/properties";

const PremiumPage = () => {
  const navigate = useNavigate();
  
  // Filter premium properties
  const premiumProperties = demoProperties.filter(p => 
    p.price.includes("15,500") || p.price.includes("14,000") || 
    p.price.includes("16,250") || p.price.includes("17,000")
  );

  const premiumCities = [
    { name: "Bangalore", count: "120+", areas: ["Whitefield", "Electronic City", "Manyata Tech Park"] },
    { name: "Mumbai", count: "100+", areas: ["BKC", "Powai", "Lower Parel"] },
    { name: "Delhi", count: "90+", areas: ["Cyber City", "Sector 62", "DLF Phase 2"] },
    { name: "Pune", count: "80+", areas: ["Hinjewadi", "Baner", "Koregaon Park"] },
    { name: "Hyderabad", count: "70+", areas: ["HITEC City", "Gachibowli", "Financial District"] },
    { name: "Chennai", count: "60+", areas: ["OMR", "Velachery", "T. Nagar"] },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-primary" size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-2">Premium Stays</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Luxury PG accommodations with top-tier amenities and services
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">450+</div>
                <div className="text-sm text-muted-foreground">Premium PGs</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">₹15,500</div>
                <div className="text-sm text-muted-foreground">Avg. Starting Price</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">20+</div>
                <div className="text-sm text-muted-foreground">Cities</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">4.9</div>
                <div className="text-sm text-muted-foreground">Avg. Rating</div>
              </CardContent>
            </Card>
          </div>

          {/* Popular Cities */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Premium Locations</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {premiumCities.map((city, index) => (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{city.name}</CardTitle>
                      <Badge variant="outline">{city.count}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin size={14} />
                        <span>Premium Areas:</span>
                      </div>
                      <div className="text-sm">
                        {city.areas.map((area, idx) => (
                          <span key={idx} className="inline-block mr-2 mb-1">
                            {area}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Premium Features */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Premium Amenities</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Crown className="text-primary mx-auto mb-2" size={24} />
                  <h3 className="font-semibold mb-1">Luxury Rooms</h3>
                  <p className="text-sm text-muted-foreground">Premium interiors</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Car className="text-primary mx-auto mb-2" size={24} />
                  <h3 className="font-semibold mb-1">Valet Parking</h3>
                  <p className="text-sm text-muted-foreground">Concierge service</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Wifi className="text-primary mx-auto mb-2" size={24} />
                  <h3 className="font-semibold mb-1">Fiber Internet</h3>
                  <p className="text-sm text-muted-foreground">Ultra-fast WiFi</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Dumbbell className="text-primary mx-auto mb-2" size={24} />
                  <h3 className="font-semibold mb-1">Premium Gym</h3>
                  <p className="text-sm text-muted-foreground">Full equipment</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Featured Properties */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Featured Premium PGs</h2>
              <Button 
                variant="outline"
                onClick={() => navigate("/search?q=premium")}
              >
                View All
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {premiumProperties.slice(0, 8).map((property, index) => (
                <PropertyCard key={index} {...property} />
              ))}
            </div>
          </section>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-primary via-[hsl(14_100%_70%)] to-[hsl(30_100%_65%)] text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Experience Luxury Living</h2>
              <p className="text-lg mb-6 opacity-90">
                Indulge in premium accommodations with world-class amenities
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate("/search")}
              >
                Find Premium PGs
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default PremiumPage;
