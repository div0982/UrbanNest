import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PropertyCard from "@/components/PropertyCard";
import HowItWorks from "@/components/HowItWorks";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import FirebaseStatus from "@/components/FirebaseStatus";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCap, Briefcase, Users2, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

// Note: Property images are now handled by the PropertyCard component

const featuredProperties = [
  {
    id: "featured-1",
    pgName: "Sunshine Residency - Shared",
    description: "A comfortable shared accommodation in the heart of Koramangala",
    propertyType: "hostel" as const,
    address: "123, 5th Cross, Koramangala",
    city: "Bangalore",
    locality: "Koramangala",
    pincode: "560034",
    singleRooms: 0,
    singlePrice: 0,
    doubleRooms: 0,
    doublePrice: 0,
    tripleRooms: 4,
    triplePrice: 8500,
    amenities: ["WiFi", "AC", "Laundry", "Parking"],
    genderPreference: "male" as const,
    foodIncluded: true,
    foodType: "both" as const,
    gateClosingTime: "11:00 PM",
    smokingAllowed: false,
    drinkingAllowed: false,
    guestsAllowed: false,
    ownerName: "Sunshine Residency",
    ownerPhone: "+91-9876543210",
    ownerEmail: "contact@sunshineresidency.com",
    ownerId: "featured-owner-1",
    aadhar: "123456789012",
    pan: "ABCDE1234F",
    status: "approved" as const,
    verified: true,
    rating: 4.7,
    createdAt: new Date() as any,
    updatedAt: new Date() as any,
  },
  {
    id: "featured-2",
    pgName: "Green Valley PG - Single",
    description: "Premium single occupancy rooms with modern amenities",
    propertyType: "apartment" as const,
    address: "456, Powai Lake Road",
    city: "Mumbai",
    locality: "Powai",
    pincode: "400076",
    singleRooms: 8,
    singlePrice: 12000,
    doubleRooms: 0,
    doublePrice: 0,
    tripleRooms: 0,
    triplePrice: 0,
    amenities: ["WiFi", "AC", "Gym", "Laundry", "Parking"],
    genderPreference: "female" as const,
    foodIncluded: true,
    foodType: "veg" as const,
    gateClosingTime: "10:30 PM",
    smokingAllowed: false,
    drinkingAllowed: false,
    guestsAllowed: true,
    ownerName: "Green Valley Properties",
    ownerPhone: "+91-9876543211",
    ownerEmail: "info@greenvalley.com",
    ownerId: "featured-owner-2",
    aadhar: "123456789013",
    pan: "ABCDE1235F",
    status: "approved" as const,
    verified: true,
    rating: 4.8,
    createdAt: new Date() as any,
    updatedAt: new Date() as any,
  },
  {
    id: "featured-3",
    pgName: "Elite Heights - Premium",
    description: "Luxury co-living space with premium amenities",
    propertyType: "villa" as const,
    address: "789, Hinjewadi IT Park",
    city: "Pune",
    locality: "Hinjewadi",
    pincode: "411057",
    singleRooms: 0,
    singlePrice: 0,
    doubleRooms: 6,
    doublePrice: 15500,
    tripleRooms: 0,
    triplePrice: 0,
    amenities: ["WiFi", "AC", "Gym", "Swimming Pool", "Laundry", "Parking", "Security"],
    genderPreference: "coliving" as const,
    foodIncluded: false,
    gateClosingTime: "12:00 AM",
    smokingAllowed: true,
    drinkingAllowed: true,
    guestsAllowed: true,
    ownerName: "Elite Heights Group",
    ownerPhone: "+91-9876543212",
    ownerEmail: "contact@eliteheights.com",
    ownerId: "featured-owner-3",
    aadhar: "123456789014",
    pan: "ABCDE1236F",
    status: "approved" as const,
    verified: true,
    rating: 4.9,
    createdAt: new Date() as any,
    updatedAt: new Date() as any,
  },
  {
    id: "featured-4",
    pgName: "The Nest Co-living",
    description: "Modern co-living space with community vibes",
    propertyType: "apartment" as const,
    address: "321, Cyber City",
    city: "Gurgaon",
    locality: "Cyber City",
    pincode: "122002",
    singleRooms: 0,
    singlePrice: 0,
    doubleRooms: 0,
    doublePrice: 0,
    tripleRooms: 3,
    triplePrice: 11000,
    amenities: ["WiFi", "AC", "Laundry", "Parking", "Common Area"],
    genderPreference: "coliving" as const,
    foodIncluded: true,
    foodType: "both" as const,
    gateClosingTime: "11:30 PM",
    smokingAllowed: false,
    drinkingAllowed: false,
    guestsAllowed: true,
    ownerName: "The Nest Co-living",
    ownerPhone: "+91-9876543213",
    ownerEmail: "hello@thenest.com",
    ownerId: "featured-owner-4",
    aadhar: "123456789015",
    pan: "ABCDE1237F",
    status: "approved" as const,
    verified: true,
    rating: 4.6,
    createdAt: new Date() as any,
    updatedAt: new Date() as any,
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
  const { currentUser, userRoles } = useAuth();

  const handleListPropertyClick = () => {
    // Check if user is signed in
    if (!currentUser) {
      // Not signed in - redirect to login
      navigate("/login");
      return;
    }

    // Check if user has owner or admin role
    if (userRoles.isOwner || userRoles.isAdmin) {
      // User is owner/admin - go to list property page
      navigate("/list-pg");
    } else {
      // User is signed in but not owner/admin - redirect to get-started
      navigate("/learn-more");
    }
  };

  // Only show "List Your Property" button for owners/admins or non-authenticated users
  const shouldShowListButton = !currentUser || userRoles.isOwner || userRoles.isAdmin;

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
          <Button 
            variant="outline"
            onClick={() => navigate("/search")}
          >
            View All
          </Button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property, index) => (
            <PropertyCard key={index} property={property} />
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
            {shouldShowListButton && (
              <Button 
                size="lg" 
                variant="secondary" 
                className="shadow-lg"
                onClick={handleListPropertyClick}
              >
                List Your Property
              </Button>
            )}
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => navigate("/learn-more")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Firebase Status - Development Only */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center">
            <FirebaseStatus />
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default Index;
