import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, Users2, TrendingUp } from "lucide-react";

// Import property images
import pgShared from "@/assets/pg-shared.jpg";
import pgSingle from "@/assets/pg-single.jpg";
import pgPremium from "@/assets/pg-premium.jpg";
import pgCommon from "@/assets/pg-common.jpg";

const featuredProperties = [
  {
    image: pgShared,
    title: "Sunshine Residency - Shared",
    location: "Koramangala, Bangalore",
    price: "₹8,500",
    gender: "Male" as const,
    foodIncluded: true,
    verified: true,
    roomType: "Shared",
    rating: 4.7,
  },
  {
    image: pgSingle,
    title: "Green Valley PG - Single",
    location: "Powai, Mumbai",
    price: "₹12,000",
    gender: "Female" as const,
    foodIncluded: true,
    verified: true,
    roomType: "Single",
    rating: 4.8,
  },
  {
    image: pgPremium,
    title: "Elite Heights - Premium",
    location: "Hinjewadi, Pune",
    price: "₹15,500",
    gender: "Co-living" as const,
    foodIncluded: false,
    verified: true,
    roomType: "Premium",
    rating: 4.9,
  },
  {
    image: pgCommon,
    title: "The Nest Co-living",
    location: "Gurgaon, Delhi NCR",
    price: "₹11,000",
    gender: "Co-living" as const,
    foodIncluded: true,
    verified: true,
    roomType: "Shared",
    rating: 4.6,
  },
];

const categories = [
  {
    icon: GraduationCap,
    title: "For Students",
    description: "Budget-friendly PGs near colleges and universities",
    count: "2,500+",
  },
  {
    icon: Briefcase,
    title: "For Professionals",
    description: "Premium PGs near IT parks and business hubs",
    count: "1,800+",
  },
  {
    icon: Users2,
    title: "Co-living Spaces",
    description: "Modern shared living with community vibes",
    count: "750+",
  },
  {
    icon: TrendingUp,
    title: "Premium Stays",
    description: "Luxury PG accommodations with top amenities",
    count: "450+",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />

      {/* Featured Properties */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured PGs</h2>
            <p className="text-muted-foreground">
              Hand-picked verified accommodations across top cities
            </p>
          </div>
          <Button variant="outline">View All</Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </section>

      <HowItWorks />

      {/* Categories */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Find PG by Category</h2>
          <p className="text-muted-foreground text-lg">
            Tailored accommodations for every need
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const routes = ["/students", "/professionals", "/co-living", "/premium"];
            return (
              <div
                key={index}
                className="group p-6 rounded-2xl bg-gradient-to-br from-background to-muted/50 border-2 border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg cursor-pointer"
                onClick={() => navigate(routes[index])}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <category.icon className="text-primary" size={28} />
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {category.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-3">
                  {category.description}
                </p>
                <Badge variant="outline">{category.count} listings</Badge>
              </div>
            );
          })}
        </div>
      </section>

      {/* Removed massive demo listings; search will show results on /search */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-[hsl(14_100%_70%)] to-[hsl(30_100%_65%)] text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Own a PG? List it on UrbanNest
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of PG owners who have found great tenants through our platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="shadow-lg"
              onClick={() => navigate("/list-pg")}
            >
              List Your Property
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default Index;
