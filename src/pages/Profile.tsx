import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Heart, 
  Clock, 
  CheckCircle,
  Edit,
  Settings,
  LogOut
} from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, userData, logout, updateUserData } = useAuth();
  
  const [user, setUser] = useState({
    name: userData?.name || "User",
    email: userData?.email || "user@example.com",
    phone: "+91 98765 43210",
    location: "Bangalore, India",
    joinDate: userData?.createdAt?.toDate?.() || new Date()
  });
  
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [bookings] = useState([
    {
      id: 1,
      property: "Sunshine Residency - Shared",
      location: "Koramangala, Bangalore",
      date: "2024-02-15",
      status: "confirmed",
      amount: "₹8,500"
    },
    {
      id: 2,
      property: "Green Valley PG - Single",
      location: "Powai, Mumbai",
      date: "2024-01-20",
      status: "pending",
      amount: "₹12,000"
    }
  ]);

  useEffect(() => {
    if (userData) {
      setUser(prev => ({
        ...prev,
        name: userData.name,
        email: userData.email,
        joinDate: userData.createdAt
      }));
      setFavorites(new Set(userData.likedProperties));
    }
  }, [userData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-10 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Profile Header */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                  <User size={32} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <p className="text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      {user.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      Member since {new Date(user.joinDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit size={16} />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="bookings" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bookings">My Bookings</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">My Bookings</h2>
                <Badge variant="outline">{bookings.length} bookings</Badge>
              </div>
              
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <Card key={booking.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{booking.property}</h3>
                          <p className="text-sm text-muted-foreground">{booking.location}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              {new Date(booking.date).toLocaleDateString()}
                            </div>
                            <div className="font-semibold text-primary">{booking.amount}/month</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(booking.status)}>
                            {booking.status}
                          </Badge>
                          <Button variant="outline" size="sm" className="mt-2">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Favorites Tab */}
            <TabsContent value="favorites" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">My Favorites</h2>
                <Badge variant="outline" className="gap-1">
                  <Heart size={14} />
                  {favorites.size} saved
                </Badge>
              </div>
              
              {favorites.size > 0 ? (
                <div className="text-center py-8">
                  <Heart size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    You have {favorites.size} favorite properties
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => navigate("/favorites")}
                  >
                    View All Favorites
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No favorites yet</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => navigate("/search")}
                  >
                    Browse Properties
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-4">
              <h2 className="text-xl font-semibold">Account Settings</h2>
              
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" value={user.name} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={user.email} />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" value={user.phone} />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" value={user.location} />
                    </div>
                  </div>
                  <Button>Save Changes</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive updates about bookings and new properties</p>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">SMS Notifications</h4>
                      <p className="text-sm text-muted-foreground">Get text messages for important updates</p>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full gap-2">
                    <Settings size={16} />
                    Privacy Settings
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2"
                    onClick={logout}
                  >
                    <LogOut size={16} />
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Profile;
