import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Home, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  Users, 
  IndianRupee, 
  TrendingUp, 
  Calendar,
  Star,
  MessageCircle,
  Settings,
  BarChart3,
  MapPin,
  Phone,
  Mail
} from "lucide-react";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for owner's properties
  const ownerProperties = [
    {
      id: 1,
      name: "Sunshine Residency",
      location: "Koramangala, Bangalore",
      status: "active",
      totalRooms: 12,
      occupiedRooms: 8,
      monthlyRevenue: 85000,
      rating: 4.7,
      lastUpdated: "2 days ago",
      image: "/api/placeholder/300/200"
    },
    {
      id: 2,
      name: "Green Valley PG",
      location: "Powai, Mumbai",
      status: "pending",
      totalRooms: 8,
      occupiedRooms: 3,
      monthlyRevenue: 36000,
      rating: 4.8,
      lastUpdated: "1 week ago",
      image: "/api/placeholder/300/200"
    },
    {
      id: 3,
      name: "Elite Heights",
      location: "Hinjewadi, Pune",
      status: "active",
      totalRooms: 15,
      occupiedRooms: 12,
      monthlyRevenue: 180000,
      rating: 4.9,
      lastUpdated: "1 day ago",
      image: "/api/placeholder/300/200"
    }
  ];

  // Mock analytics data
  const analytics = {
    totalRevenue: 301000,
    occupancyRate: 76,
    totalProperties: 3,
    activeProperties: 2,
    pendingInquiries: 12,
    avgRating: 4.8
  };

  const recentInquiries = [
    {
      id: 1,
      name: "Rajesh Kumar",
      phone: "+91 98765 43210",
      property: "Sunshine Residency",
      roomType: "Single",
      date: "2 hours ago",
      status: "new"
    },
    {
      id: 2,
      name: "Priya Sharma",
      phone: "+91 87654 32109",
      property: "Elite Heights",
      roomType: "Shared",
      date: "5 hours ago",
      status: "contacted"
    },
    {
      id: 3,
      name: "Amit Singh",
      phone: "+91 76543 21098",
      property: "Green Valley PG",
      roomType: "Single",
      date: "1 day ago",
      status: "new"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "inactive": return "bg-red-500";
      case "new": return "bg-blue-500";
      case "contacted": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-6 mobile-safe-area">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Owner Dashboard</h1>
              <p className="text-muted-foreground">Manage your PG properties and track performance</p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button 
                onClick={() => navigate("/list-pg")}
                className="rounded-xl"
              >
                <Plus className="mr-2" size={18} />
                Add New Property
              </Button>
              <Button variant="outline" className="rounded-xl">
                <Settings className="mr-2" size={18} />
                Settings
              </Button>
            </div>
          </div>

          {/* Analytics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">₹{analytics.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <IndianRupee className="text-green-600" size={24} />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="text-green-500 mr-1" size={16} />
                  <span className="text-sm text-green-500">+12% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Occupancy Rate</p>
                    <p className="text-2xl font-bold">{analytics.occupancyRate}%</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Users className="text-blue-600" size={24} />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="text-green-500 mr-1" size={16} />
                  <span className="text-sm text-green-500">+5% from last month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Properties</p>
                    <p className="text-2xl font-bold">{analytics.activeProperties}/{analytics.totalProperties}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Home className="text-purple-600" size={24} />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <Calendar className="text-blue-500 mr-1" size={16} />
                  <span className="text-sm text-blue-500">2 pending approval</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                    <p className="text-2xl font-bold">{analytics.avgRating}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                    <Star className="text-yellow-600" size={24} />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <Star className="text-yellow-500 mr-1" size={16} />
                  <span className="text-sm text-yellow-500">Based on 45 reviews</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 rounded-xl">
              <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
              <TabsTrigger value="properties" className="rounded-lg">Properties</TabsTrigger>
              <TabsTrigger value="inquiries" className="rounded-lg">Inquiries</TabsTrigger>
              <TabsTrigger value="analytics" className="rounded-lg">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Inquiries */}
                <Card className="rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageCircle className="text-primary" size={20} />
                      Recent Inquiries
                    </CardTitle>
                    <CardDescription>Latest inquiries from potential tenants</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentInquiries.map((inquiry) => (
                        <div key={inquiry.id} className="flex items-center justify-between p-4 rounded-xl border">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{inquiry.name}</h4>
                              <Badge className={`${getStatusColor(inquiry.status)} text-white text-xs`}>
                                {inquiry.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{inquiry.property} - {inquiry.roomType}</p>
                            <p className="text-xs text-muted-foreground">{inquiry.date}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="rounded-lg">
                              <Phone size={14} />
                            </Button>
                            <Button size="sm" variant="outline" className="rounded-lg">
                              <Mail size={14} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 rounded-xl">
                      View All Inquiries
                    </Button>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="text-primary" size={20} />
                      Quick Actions
                    </CardTitle>
                    <CardDescription>Manage your properties efficiently</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col gap-2 rounded-xl"
                        onClick={() => navigate("/list-pg")}
                      >
                        <Plus size={24} />
                        <span className="text-sm">Add Property</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col gap-2 rounded-xl"
                      >
                        <Edit size={24} />
                        <span className="text-sm">Edit Property</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col gap-2 rounded-xl"
                      >
                        <Users size={24} />
                        <span className="text-sm">Manage Tenants</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="h-20 flex-col gap-2 rounded-xl"
                      >
                        <BarChart3 size={24} />
                        <span className="text-sm">View Reports</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Properties Tab */}
            <TabsContent value="properties" className="space-y-6">
              <div className="grid gap-6">
                {ownerProperties.map((property) => (
                  <Card key={property.id} className="rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-48 h-32 bg-muted rounded-xl flex items-center justify-center">
                          <Home size={40} className="text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-xl font-semibold mb-1">{property.name}</h3>
                              <div className="flex items-center gap-2 text-muted-foreground">
                                <MapPin size={14} />
                                <span>{property.location}</span>
                              </div>
                            </div>
                            <Badge className={`${getStatusColor(property.status)} text-white`}>
                              {property.status}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Rooms</p>
                              <p className="font-semibold">{property.occupiedRooms}/{property.totalRooms}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Revenue</p>
                              <p className="font-semibold">₹{property.monthlyRevenue.toLocaleString()}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Rating</p>
                              <div className="flex items-center justify-center gap-1">
                                <Star size={14} className="text-yellow-500 fill-current" />
                                <span className="font-semibold">{property.rating}</span>
                              </div>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Updated</p>
                              <p className="font-semibold text-xs">{property.lastUpdated}</p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="rounded-lg">
                              <Eye size={14} className="mr-1" />
                              View
                            </Button>
                            <Button size="sm" variant="outline" className="rounded-lg">
                              <Edit size={14} className="mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="outline" className="rounded-lg">
                              <Users size={14} className="mr-1" />
                              Tenants
                            </Button>
                            <Button size="sm" variant="destructive" className="rounded-lg">
                              <Trash2 size={14} className="mr-1" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Inquiries Tab */}
            <TabsContent value="inquiries" className="space-y-6">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>All Inquiries</CardTitle>
                  <CardDescription>Manage inquiries from potential tenants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentInquiries.map((inquiry) => (
                      <div key={inquiry.id} className="flex items-center justify-between p-4 rounded-xl border">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{inquiry.name}</h4>
                            <Badge className={`${getStatusColor(inquiry.status)} text-white text-xs`}>
                              {inquiry.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{inquiry.property} - {inquiry.roomType}</p>
                          <p className="text-sm text-muted-foreground">{inquiry.phone}</p>
                          <p className="text-xs text-muted-foreground">{inquiry.date}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" className="rounded-lg">
                            Contact
                          </Button>
                          <Button size="sm" variant="outline" className="rounded-lg">
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="rounded-2xl">
                  <CardHeader>
                    <CardTitle>Revenue Analytics</CardTitle>
                    <CardDescription>Monthly revenue trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <BarChart3 size={48} className="mx-auto mb-2" />
                        <p>Revenue chart will be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl">
                  <CardHeader>
                    <CardTitle>Occupancy Analytics</CardTitle>
                    <CardDescription>Room occupancy trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <Users size={48} className="mx-auto mb-2" />
                        <p>Occupancy chart will be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default OwnerDashboard;



