import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ArrowLeft,
  Users, 
  Shield, 
  MapPin, 
  Star, 
  Heart,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Globe,
  Award,
  TrendingUp,
  Home,
  Wifi,
  Utensils,
  Car,
  Dumbbell,
  ShieldCheck,
  Users2,
  Calendar,
  IndianRupee,
  ChevronRight,
  Play,
  BookOpen,
  Target,
  Zap
} from "lucide-react";

const LearnMore = () => {
  const navigate = useNavigate();
  const { currentUser, userRoles } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

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
      // User is signed in but not owner/admin - stay on learn more page
      // (they're already here, so just scroll to top or show a message)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Verified Properties",
      description: "All properties are verified by our team for safety and quality standards"
    },
    {
      icon: Users,
      title: "Community Living",
      description: "Connect with like-minded individuals in safe, comfortable environments"
    },
    {
      icon: MapPin,
      title: "Prime Locations",
      description: "Properties located near colleges, offices, and transportation hubs"
    },
    {
      icon: Star,
      title: "Quality Assurance",
      description: "Rated and reviewed by real residents for transparency"
    }
  ];

  const amenities = [
    { icon: Wifi, name: "High-Speed WiFi", available: true },
    { icon: Utensils, name: "Meals Included", available: true },
    { icon: Car, name: "Parking Space", available: true },
    { icon: Dumbbell, name: "Gym Access", available: true },
    { icon: ShieldCheck, name: "24/7 Security", available: true },
    { icon: Users2, name: "Common Areas", available: true }
  ];

  const pricing = [
    { type: "Single Room", price: "₹8,000", features: ["Private space", "Personal storage", "Study desk"] },
    { type: "Double Room", price: "₹6,000", features: ["Shared space", "Cost-effective", "Roommate matching"] },
    { type: "Triple Room", price: "₹4,500", features: ["Budget-friendly", "Social environment", "Group living"] }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Student, Delhi University",
      rating: 5,
      text: "UrbanNest helped me find the perfect PG near my college. The verification process gave me confidence, and the community is amazing!"
    },
    {
      name: "Rahul Kumar",
      role: "Software Engineer",
      rating: 5,
      text: "Great platform! Found a verified property with all amenities. The owner was responsive and the location is perfect for my office commute."
    },
    {
      name: "Anjali Patel",
      role: "MBA Student",
      rating: 4,
      text: "Love the transparency and quality of properties listed. The booking process was smooth and hassle-free."
    }
  ];

  const stats = [
    { number: "10,000+", label: "Happy Residents" },
    { number: "500+", label: "Verified Properties" },
    { number: "50+", label: "Cities Covered" },
    { number: "4.8/5", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-r from-primary to-blue-600 text-white">
        <div className="container mx-auto max-w-6xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6 text-white hover:bg-white/20"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
          
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Perfect Home Awaits
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover verified PG accommodations designed for students and working professionals
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                onClick={() => navigate("/search")}
                className="text-lg px-8 py-3"
              >
                <Home size={20} className="mr-2" />
                Browse Properties
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary"
                onClick={handleListPropertyClick}
              >
                <Users size={20} className="mr-2" />
                List Your Property
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose UrbanNest?</h2>
            <p className="text-xl text-gray-600">We make finding your perfect home simple and secure</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Amenities</h2>
            <p className="text-xl text-gray-600">Everything you need for comfortable living</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {amenities.map((amenity, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <amenity.icon size={24} className="text-primary mx-auto mb-2" />
                  <div className="text-sm font-medium">{amenity.name}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Flexible Pricing Options</h2>
            <p className="text-xl text-gray-600">Choose the accommodation that fits your budget</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {pricing.map((option, index) => (
              <Card key={index} className={`text-center ${index === 1 ? 'border-primary border-2' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-2xl">{option.type}</CardTitle>
                  <div className="text-4xl font-bold text-primary">{option.price}</div>
                  <div className="text-gray-600">per month</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-gray-600">Simple steps to find your perfect home</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Search & Filter</h3>
              <p className="text-gray-600">Browse verified properties with advanced filters for location, price, and amenities</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Visit & Verify</h3>
              <p className="text-gray-600">Schedule visits and verify property details with our comprehensive verification process</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Book & Move In</h3>
              <p className="text-gray-600">Complete your booking and move into your new home with confidence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-600">Real experiences from our community</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Find Your Perfect Home?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of satisfied residents who found their ideal accommodation
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/search")}
              className="text-lg px-8 py-3"
            >
              <Home size={20} className="mr-2" />
              Start Searching
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-primary"
              onClick={handleListPropertyClick}
            >
              <Users size={20} className="mr-2" />
              List Your Property
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default LearnMore;
