import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import PropertyCard from "@/components/PropertyCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users2, MapPin, Star, Gamepad2, Utensils, Music, Heart, Calendar } from "lucide-react";
import { demoProperties } from "@/data/properties";

const CoLivingPage = () => {
  const navigate = useNavigate();
  
  // Filter co-living properties
  const coLivingProperties = demoProperties.filter(p => 
    p.gender === "Co-living"
  );

  const coLivingCities = [
    { name: "Bangalore", count: "180+", communities: ["Koramangala", "Indiranagar", "HSR Layout"] },
    { name: "Mumbai", count: "150+", communities: ["Powai", "Andheri", "Bandra"] },
    { name: "Delhi", count: "140+", communities: ["Gurgaon", "Noida", "Saket"] },
    { name: "Pune", count: "120+", communities: ["Baner", "Hinjewadi", "Koregaon Park"] },
    { name: "Hyderabad", count: "100+", communities: ["Gachibowli", "HITEC City", "Kondapur"] },
    { name: "Chennai", count: "90+", communities: ["OMR", "Velachery", "T. Nagar"] },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
              <Users2 className="text-primary" size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-2">Co-living Spaces</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Modern shared living with community vibes and premium amenities
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">750+</div>
                <div className="text-sm text-muted-foreground">Co-living Spaces</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">₹11,000</div>
                <div className="text-sm text-muted-foreground">Avg. Starting Price</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">25+</div>
                <div className="text-sm text-muted-foreground">Cities</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">4.6</div>
                <div className="text-sm text-muted-foreground">Avg. Rating</div>
              </CardContent>
            </Card>
          </div>

          {/* Popular Cities */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Top Co-living Cities</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {coLivingCities.map((city, index) => (
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
                        <span>Popular Areas:</span>
                      </div>
                      <div className="text-sm">
                        {city.communities.map((area, idx) => (
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

          {/* Co-living Features */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Community Features</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Gamepad2 className="text-primary mx-auto mb-2" size={24} />
                  <h3 className="font-semibold mb-1">Game Room</h3>
                  <p className="text-sm text-muted-foreground">Entertainment zone</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Utensils className="text-primary mx-auto mb-2" size={24} />
                  <h3 className="font-semibold mb-1">Community Kitchen</h3>
                  <p className="text-sm text-muted-foreground">Shared cooking</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Music className="text-primary mx-auto mb-2" size={24} />
                  <h3 className="font-semibold mb-1">Events & Activities</h3>
                  <p className="text-sm text-muted-foreground">Regular meetups</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Heart className="text-primary mx-auto mb-2" size={24} />
                  <h3 className="font-semibold mb-1">Community Support</h3>
                  <p className="text-sm text-muted-foreground">Helpful neighbors</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Featured Properties */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Featured Co-living Spaces</h2>
              <Button 
                variant="outline"
                onClick={() => navigate("/search?q=co-living")}
              >
                View All
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coLivingProperties.slice(0, 8).map((property, index) => (
                <PropertyCard key={index} {...property} />
              ))}
            </div>
          </section>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-primary via-[hsl(14_100%_70%)] to-[hsl(30_100%_65%)] text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Join a Vibrant Community</h2>
              <p className="text-lg mb-6 opacity-90">
                Experience modern co-living with like-minded people
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate("/search")}
              >
                Find Co-living Spaces
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

export default CoLivingPage;





