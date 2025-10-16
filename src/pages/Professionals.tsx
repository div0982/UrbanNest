import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import PropertyCard from "@/components/PropertyCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, MapPin, Star, Wifi, Car, Coffee, Dumbbell, Shield } from "lucide-react";
import { demoProperties } from "@/data/properties";

const ProfessionalsPage = () => {
  const navigate = useNavigate();
  
  // Filter properties suitable for professionals
  const professionalProperties = demoProperties.filter(p => 
    p.price.includes("12,000") || p.price.includes("15,500") || 
    p.price.includes("11,000") || p.price.includes("13,250")
  );

  const professionalCities = [
    { name: "Bangalore", count: "520+", companies: ["Infosys", "TCS", "Wipro", "Google"] },
    { name: "Mumbai", count: "480+", companies: ["Reliance", "Tata", "HDFC", "Mahindra"] },
    { name: "Pune", count: "420+", companies: ["Tech Mahindra", "Persistent", "KPIT", "Amdocs"] },
    { name: "Hyderabad", count: "380+", companies: ["Microsoft", "Amazon", "Deloitte", "Accenture"] },
    { name: "Gurgaon", count: "350+", companies: ["IBM", "Sapient", "Genpact", "Airtel"] },
    { name: "Chennai", count: "320+", companies: ["CTS", "HCL", "Zoho", "PayPal"] },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-6">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mx-auto mb-4">
              <Briefcase className="text-primary" size={32} />
            </div>
            <h1 className="text-3xl font-bold mb-2">PGs for Professionals</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Premium accommodations near IT parks and business hubs across India
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">1,800+</div>
                <div className="text-sm text-muted-foreground">Professional PGs</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">₹12,000</div>
                <div className="text-sm text-muted-foreground">Avg. Starting Price</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">40+</div>
                <div className="text-sm text-muted-foreground">IT Parks</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">4.8</div>
                <div className="text-sm text-muted-foreground">Avg. Rating</div>
              </CardContent>
            </Card>
          </div>

          {/* Popular Cities */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Top Professional Cities</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {professionalCities.map((city, index) => (
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
                        <span>Major Companies:</span>
                      </div>
                      <div className="text-sm">
                        {city.companies.map((company, idx) => (
                          <span key={idx} className="inline-block mr-2 mb-1">
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Professional Features */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Professional Amenities</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Wifi className="text-primary mx-auto mb-2" size={24} />
                  <h3 className="font-semibold mb-1">High-Speed WiFi</h3>
                  <p className="text-sm text-muted-foreground">Unlimited internet</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Car className="text-primary mx-auto mb-2" size={24} />
                  <h3 className="font-semibold mb-1">Parking</h3>
                  <p className="text-sm text-muted-foreground">Vehicle parking</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Coffee className="text-primary mx-auto mb-2" size={24} />
                  <h3 className="font-semibold mb-1">Coffee Station</h3>
                  <p className="text-sm text-muted-foreground">24/7 coffee</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Dumbbell className="text-primary mx-auto mb-2" size={24} />
                  <h3 className="font-semibold mb-1">Gym Access</h3>
                  <p className="text-sm text-muted-foreground">Fitness center</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Featured Properties */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Featured Professional PGs</h2>
              <Button 
                variant="outline"
                onClick={() => navigate("/search?q=professional")}
              >
                View All
              </Button>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {professionalProperties.slice(0, 8).map((property, index) => (
                <PropertyCard key={index} {...property} />
              ))}
            </div>
          </section>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-primary via-[hsl(14_100%_70%)] to-[hsl(30_100%_65%)] text-primary-foreground">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Find Your Professional Home</h2>
              <p className="text-lg mb-6 opacity-90">
                Premium accommodations designed for working professionals
              </p>
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate("/search")}
              >
                Search Professional PGs
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

export default ProfessionalsPage;





