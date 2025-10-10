import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { demoProperties } from "@/data/properties";
import { 
  MapPin, 
  Users, 
  Utensils, 
  Wifi, 
  Shield, 
  Star, 
  Heart, 
  Phone, 
  Calendar,
  IndianRupee,
  Clock,
  CheckCircle,
  X
} from "lucide-react";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(demoProperties[0]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    name: "",
    phone: "",
    email: "",
    moveInDate: "",
    message: ""
  });

  useEffect(() => {
    const favs = localStorage.getItem("favorites");
    if (favs) setFavorites(new Set(JSON.parse(favs)));
    
    // Find property by index or title
    const foundProperty = demoProperties.find((p, idx) => 
      idx.toString() === id || p.title.toLowerCase().includes(id?.toLowerCase() || "")
    );
    if (foundProperty) setProperty(foundProperty);
  }, [id]);

  const toggleFavorite = () => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(property.title)) {
      newFavorites.delete(property.title);
    } else {
      newFavorites.add(property.title);
    }
    setFavorites(newFavorites);
    localStorage.setItem("favorites", JSON.stringify([...newFavorites]));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate booking submission
    alert("Booking request submitted! Owner will contact you within 24 hours.");
    setShowBookingForm(false);
    setBookingData({ name: "", phone: "", email: "", moveInDate: "", message: "" });
  };

  const amenities = [
    { icon: Wifi, name: "WiFi", available: true },
    { icon: Utensils, name: "Food", available: property.foodIncluded },
    { icon: Shield, name: "Security", available: true },
    { icon: Users, name: "Common Area", available: true },
    { icon: Clock, name: "24/7 Access", available: true },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            ← Back to Search
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <div className="relative">
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-80 object-cover rounded-2xl"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {property.verified && (
                    <Badge variant="success" className="gap-1">
                      <Shield size={12} />
                      Verified
                    </Badge>
                  )}
                  <Badge className="bg-background/90 text-foreground gap-1">
                    <Star size={12} />
                    {property.rating}
                  </Badge>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-4 right-4 bg-background/80 hover:bg-background"
                  onClick={toggleFavorite}
                >
                  <Heart 
                    size={20} 
                    className={favorites.has(property.title) ? "fill-red-500 text-red-500" : ""} 
                  />
                </Button>
              </div>

              {/* Property Info */}
              <div>
                <h1 className="text-3xl font-bold mb-2">{property.title}</h1>
                <div className="flex items-center text-muted-foreground mb-4">
                  <MapPin size={16} className="mr-1" />
                  {property.location}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="outline" className="gap-1">
                    <Users size={12} />
                    {property.roomType}
                  </Badge>
                  <Badge variant="outline">{property.gender}</Badge>
                  {property.foodIncluded && (
                    <Badge variant="outline" className="gap-1">
                      <Utensils size={12} />
                      Food Included
                    </Badge>
                  )}
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  Experience comfortable living in this well-maintained PG accommodation. 
                  Located in a prime area with easy access to public transportation, 
                  shopping centers, and educational institutions. The property offers 
                  modern amenities and a safe environment for students and working professionals.
                </p>
              </div>

              {/* Amenities */}
              <Card>
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <amenity.icon 
                          size={18} 
                          className={amenity.available ? "text-green-500" : "text-muted-foreground"} 
                        />
                        <span className={amenity.available ? "" : "text-muted-foreground"}>
                          {amenity.name}
                        </span>
                        {amenity.available ? (
                          <CheckCircle size={14} className="text-green-500" />
                        ) : (
                          <X size={14} className="text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle>Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-bold">{property.rating}</div>
                      <div>
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map((star) => (
                            <Star 
                              key={star} 
                              size={16} 
                              className={star <= Math.floor(property.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"} 
                            />
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground">Based on 24 reviews</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="border-l-4 border-primary pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Rahul S.</span>
                          <div className="flex">
                            {[1,2,3,4,5].map((star) => (
                              <Star key={star} size={12} className="fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          "Great place to stay! Clean rooms, good food, and friendly staff. 
                          Highly recommended for students."
                        </p>
                      </div>
                      
                      <div className="border-l-4 border-primary pl-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium">Priya M.</span>
                          <div className="flex">
                            {[1,2,3,4].map((star) => (
                              <Star key={star} size={12} className="fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          "Good location and amenities. The WiFi is fast and the common areas are well maintained."
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price Card */}
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IndianRupee className="text-primary" />
                    Pricing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary">{property.price}</div>
                    <div className="text-muted-foreground">per month</div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Room Rent</span>
                      <span>{property.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Security Deposit</span>
                      <span>₹5,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Maintenance</span>
                      <span>₹500</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{parseInt(property.price.replace(/[₹,]/g, "")) + 5500}</span>
                    </div>
                  </div>

                  <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
                    <DialogTrigger asChild>
                      <Button className="w-full" size="lg">
                        Book Visit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Book a Visit</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleBookingSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={bookingData.name}
                            onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={bookingData.phone}
                            onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={bookingData.email}
                            onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="moveInDate">Preferred Move-in Date</Label>
                          <Input
                            id="moveInDate"
                            type="date"
                            value={bookingData.moveInDate}
                            onChange={(e) => setBookingData(prev => ({ ...prev, moveInDate: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="message">Message (Optional)</Label>
                          <Textarea
                            id="message"
                            value={bookingData.message}
                            onChange={(e) => setBookingData(prev => ({ ...prev, message: e.target.value }))}
                            placeholder="Any specific requirements or questions..."
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button type="button" variant="outline" onClick={() => setShowBookingForm(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" className="flex-1">
                            Submit Request
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" className="w-full gap-2">
                    <Phone size={16} />
                    Contact Owner
                  </Button>
                </CardContent>
              </Card>

              {/* Owner Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Owner Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users size={20} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Rajesh Kumar</div>
                      <div className="text-sm text-muted-foreground">Property Owner</div>
                    </div>
                  </div>
                  <div className="text-sm space-y-1">
                    <div className="flex items-center gap-2">
                      <Phone size={14} />
                      <span>+91 98765 43210</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>Available 9 AM - 8 PM</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default PropertyDetails;
