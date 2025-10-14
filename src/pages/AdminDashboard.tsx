import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import RoleManagement from "@/components/RoleManagement";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Users, 
  Home, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Ban,
  Check,
  BarChart3,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Star,
  IndianRupee,
  Activity
} from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for admin dashboard
  const adminStats = {
    totalUsers: 15420,
    totalProperties: 2847,
    pendingApprovals: 23,
    activeOwners: 1240,
    totalRevenue: 12500000,
    monthlyGrowth: 15.2,
    avgRating: 4.6,
    complaints: 8
  };

  const pendingProperties = [
    {
      id: 1,
      name: "Royal PG Residency",
      owner: "Rajesh Kumar",
      location: "Koramangala, Bangalore",
      submittedDate: "2024-01-15",
      status: "pending",
      rooms: 12,
      price: 8500,
      documents: "complete",
      verification: "pending"
    },
    {
      id: 2,
      name: "Green Valley Co-living",
      owner: "Priya Sharma",
      location: "Powai, Mumbai",
      submittedDate: "2024-01-14",
      status: "pending",
      rooms: 8,
      price: 12000,
      documents: "incomplete",
      verification: "pending"
    },
    {
      id: 3,
      name: "Elite Heights Premium",
      owner: "Amit Singh",
      location: "Hinjewadi, Pune",
      submittedDate: "2024-01-13",
      status: "pending",
      rooms: 15,
      price: 15500,
      documents: "complete",
      verification: "pending"
    }
  ];

  const recentUsers = [
    {
      id: 1,
      name: "Suresh Patel",
      email: "suresh@email.com",
      phone: "+91 98765 43210",
      type: "owner",
      joinDate: "2024-01-15",
      status: "active",
      properties: 2
    },
    {
      id: 2,
      name: "Meera Joshi",
      email: "meera@email.com",
      phone: "+91 87654 32109",
      type: "tenant",
      joinDate: "2024-01-14",
      status: "active",
      properties: 0
    },
    {
      id: 3,
      name: "Vikram Reddy",
      email: "vikram@email.com",
      phone: "+91 76543 21098",
      type: "owner",
      joinDate: "2024-01-13",
      status: "suspended",
      properties: 1
    }
  ];

  const complaints = [
    {
      id: 1,
      user: "Arjun Mehta",
      property: "Sunshine Residency",
      issue: "Maintenance complaint",
      priority: "high",
      status: "open",
      date: "2 hours ago"
    },
    {
      id: 2,
      user: "Kavya Nair",
      property: "Green Valley PG",
      issue: "Payment dispute",
      priority: "medium",
      status: "in_progress",
      date: "5 hours ago"
    },
    {
      id: 3,
      user: "Rohit Gupta",
      property: "Elite Heights",
      issue: "Noise complaint",
      priority: "low",
      status: "resolved",
      date: "1 day ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "suspended": return "bg-red-500";
      case "inactive": return "bg-gray-500";
      case "complete": return "bg-green-500";
      case "incomplete": return "bg-red-500";
      case "open": return "bg-red-500";
      case "in_progress": return "bg-yellow-500";
      case "resolved": return "bg-green-500";
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-blue-500";
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
              <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
                <Shield className="text-primary" size={32} />
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">Manage platform operations and user activities</p>
            </div>
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button variant="outline" className="rounded-xl">
                <Activity className="mr-2" size={18} />
                System Status
              </Button>
              <Button className="rounded-xl">
                <TrendingUp className="mr-2" size={18} />
                Generate Report
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Users</p>
                    <p className="text-2xl font-bold">{adminStats.totalUsers.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Users className="text-blue-600" size={24} />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="text-green-500 mr-1" size={16} />
                  <span className="text-sm text-green-500">+{adminStats.monthlyGrowth}% this month</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Properties</p>
                    <p className="text-2xl font-bold">{adminStats.totalProperties.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <Home className="text-green-600" size={24} />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <AlertTriangle className="text-yellow-500 mr-1" size={16} />
                  <span className="text-sm text-yellow-500">{adminStats.pendingApprovals} pending approval</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Owners</p>
                    <p className="text-2xl font-bold">{adminStats.activeOwners.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Shield className="text-purple-600" size={24} />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <CheckCircle className="text-green-500 mr-1" size={16} />
                  <span className="text-sm text-green-500">All verified</span>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Platform Revenue</p>
                    <p className="text-2xl font-bold">₹{(adminStats.totalRevenue / 100000).toFixed(1)}L</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                    <IndianRupee className="text-yellow-600" size={24} />
                  </div>
                </div>
                <div className="flex items-center mt-2">
                  <TrendingUp className="text-green-500 mr-1" size={16} />
                  <span className="text-sm text-green-500">+8% from last month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6 rounded-xl">
              <TabsTrigger value="overview" className="rounded-lg">Overview</TabsTrigger>
              <TabsTrigger value="properties" className="rounded-lg">Properties</TabsTrigger>
              <TabsTrigger value="users" className="rounded-lg">Users</TabsTrigger>
              <TabsTrigger value="roles" className="rounded-lg">Roles</TabsTrigger>
              <TabsTrigger value="complaints" className="rounded-lg">Complaints</TabsTrigger>
              <TabsTrigger value="analytics" className="rounded-lg">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Pending Approvals */}
                <Card className="rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="text-yellow-500" size={20} />
                      Pending Approvals
                    </CardTitle>
                    <CardDescription>Properties waiting for approval</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {pendingProperties.slice(0, 3).map((property) => (
                        <div key={property.id} className="flex items-center justify-between p-4 rounded-xl border">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{property.name}</h4>
                              <Badge className={`${getStatusColor(property.status)} text-white text-xs`}>
                                {property.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{property.owner}</p>
                            <p className="text-sm text-muted-foreground">{property.location}</p>
                            <p className="text-xs text-muted-foreground">Submitted: {property.submittedDate}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" className="rounded-lg">
                              <Check size={14} />
                            </Button>
                            <Button size="sm" variant="outline" className="rounded-lg">
                              <Eye size={14} />
                            </Button>
                            <Button size="sm" variant="destructive" className="rounded-lg">
                              <XCircle size={14} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 rounded-xl">
                      View All Pending
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Complaints */}
                <Card className="rounded-2xl">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="text-red-500" size={20} />
                      Recent Complaints
                    </CardTitle>
                    <CardDescription>Latest user complaints and issues</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {complaints.map((complaint) => (
                        <div key={complaint.id} className="flex items-center justify-between p-4 rounded-xl border">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{complaint.user}</h4>
                              <Badge className={`${getStatusColor(complaint.priority)} text-white text-xs`}>
                                {complaint.priority}
                              </Badge>
                              <Badge className={`${getStatusColor(complaint.status)} text-white text-xs`}>
                                {complaint.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{complaint.property}</p>
                            <p className="text-sm text-muted-foreground">{complaint.issue}</p>
                            <p className="text-xs text-muted-foreground">{complaint.date}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="rounded-lg">
                              <Eye size={14} />
                            </Button>
                            <Button size="sm" className="rounded-lg">
                              Resolve
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4 rounded-xl">
                      View All Complaints
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Properties Tab */}
            <TabsContent value="properties" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search properties..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <Button variant="outline" className="rounded-xl">
                  <Filter className="mr-2" size={18} />
                  Filters
                </Button>
              </div>

              <div className="grid gap-6">
                {pendingProperties.map((property) => (
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
                              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                <MapPin size={14} />
                                <span>{property.location}</span>
                              </div>
                              <p className="text-sm text-muted-foreground">Owner: {property.owner}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Badge className={`${getStatusColor(property.status)} text-white`}>
                                {property.status}
                              </Badge>
                              <Badge className={`${getStatusColor(property.documents)} text-white`}>
                                {property.documents}
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Rooms</p>
                              <p className="font-semibold">{property.rooms}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Price</p>
                              <p className="font-semibold">₹{property.price.toLocaleString()}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Submitted</p>
                              <p className="font-semibold text-xs">{property.submittedDate}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-muted-foreground">Verification</p>
                              <p className="font-semibold text-xs">{property.verification}</p>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm" className="rounded-lg">
                              <Check size={14} className="mr-1" />
                              Approve
                            </Button>
                            <Button size="sm" variant="outline" className="rounded-lg">
                              <Eye size={14} className="mr-1" />
                              Review
                            </Button>
                            <Button size="sm" variant="outline" className="rounded-lg">
                              <Edit size={14} className="mr-1" />
                              Edit
                            </Button>
                            <Button size="sm" variant="destructive" className="rounded-lg">
                              <XCircle size={14} className="mr-1" />
                              Reject
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <Button variant="outline" className="rounded-xl">
                  <Filter className="mr-2" size={18} />
                  Filters
                </Button>
              </div>

              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                  <CardDescription>Manage platform users and their activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-4 rounded-xl border">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{user.name}</h4>
                            <Badge className={`${getStatusColor(user.status)} text-white text-xs`}>
                              {user.status}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {user.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <p className="text-sm text-muted-foreground">{user.phone}</p>
                          <p className="text-xs text-muted-foreground">Joined: {user.joinDate}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="rounded-lg">
                            <Eye size={14} />
                          </Button>
                          <Button size="sm" variant="outline" className="rounded-lg">
                            <Edit size={14} />
                          </Button>
                          <Button size="sm" variant="destructive" className="rounded-lg">
                            <Ban size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Roles Tab */}
            <TabsContent value="roles" className="space-y-6">
              <RoleManagement />
            </TabsContent>

            {/* Complaints Tab */}
            <TabsContent value="complaints" className="space-y-6">
              <Card className="rounded-2xl">
                <CardHeader>
                  <CardTitle>All Complaints</CardTitle>
                  <CardDescription>Manage user complaints and resolve issues</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complaints.map((complaint) => (
                      <div key={complaint.id} className="flex items-center justify-between p-4 rounded-xl border">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{complaint.user}</h4>
                            <Badge className={`${getStatusColor(complaint.priority)} text-white text-xs`}>
                              {complaint.priority}
                            </Badge>
                            <Badge className={`${getStatusColor(complaint.status)} text-white text-xs`}>
                              {complaint.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{complaint.property}</p>
                          <p className="text-sm text-muted-foreground">{complaint.issue}</p>
                          <p className="text-xs text-muted-foreground">{complaint.date}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="rounded-lg">
                            <Eye size={14} />
                          </Button>
                          <Button size="sm" className="rounded-lg">
                            Resolve
                          </Button>
                          <Button size="sm" variant="destructive" className="rounded-lg">
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
                    <CardTitle>Platform Analytics</CardTitle>
                    <CardDescription>Overall platform performance</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <BarChart3 size={48} className="mx-auto mb-2" />
                        <p>Platform analytics chart will be displayed here</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="rounded-2xl">
                  <CardHeader>
                    <CardTitle>User Growth</CardTitle>
                    <CardDescription>User registration trends</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                      <div className="text-center">
                        <TrendingUp size={48} className="mx-auto mb-2" />
                        <p>User growth chart will be displayed here</p>
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

export default AdminDashboard;



