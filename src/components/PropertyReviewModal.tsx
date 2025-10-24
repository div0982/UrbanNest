import { useState } from "react";
import { Property } from "@/services/propertyService";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Users, 
  IndianRupee, 
  Shield, 
  Home, 
  Utensils, 
  Wifi, 
  Car, 
  Dumbbell, 
  Camera,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  User,
  Building,
  FileText,
  Trash2
} from "lucide-react";

interface PropertyReviewModalProps {
  property: Property | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (propertyId: string) => void;
  onReject: (propertyId: string) => void;
  onDelete?: (propertyId: string) => void;
  isLoading?: boolean;
}

const PropertyReviewModal = ({ 
  property, 
  isOpen, 
  onClose, 
  onApprove, 
  onReject, 
  onDelete,
  isLoading = false 
}: PropertyReviewModalProps) => {
  if (!property) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "rejected": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getGenderDisplay = (gender: string) => {
    const genderMap: { [key: string]: string } = {
      'male': 'Male Only',
      'female': 'Female Only',
      'coliving': 'Co-living (Mixed)'
    };
    return genderMap[gender] || gender;
  };

  const getPropertyTypeDisplay = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'independent': 'Independent House',
      'apartment': 'Apartment Building',
      'villa': 'Villa',
      'hostel': 'Hostel Building'
    };
    return typeMap[type] || type;
  };

  const getFoodTypeDisplay = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'veg': 'Vegetarian',
      'nonveg': 'Non-Vegetarian',
      'both': 'Both Available'
    };
    return typeMap[type] || type;
  };

  const getDisplayPrice = () => {
    const prices = [];
    if (property.singlePrice > 0) prices.push(`Single: ₹${property.singlePrice.toLocaleString()}`);
    if (property.doublePrice > 0) prices.push(`Double: ₹${property.doublePrice.toLocaleString()}`);
    if (property.triplePrice > 0) prices.push(`Triple: ₹${property.triplePrice.toLocaleString()}`);
    return prices.length > 0 ? prices.join(', ') : 'Contact for price';
  };

  const getRoomCounts = () => {
    const rooms = [];
    if (property.singleRooms > 0) rooms.push(`${property.singleRooms} Single`);
    if (property.doubleRooms > 0) rooms.push(`${property.doubleRooms} Double`);
    if (property.tripleRooms > 0) rooms.push(`${property.tripleRooms} Triple`);
    return rooms.length > 0 ? rooms.join(', ') : 'No rooms specified';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="text-primary" size={24} />
            Property Review: {property.pgName}
          </DialogTitle>
          <DialogDescription>
            Review all property details before approval
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status and Actions */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <Badge className={`${getStatusColor(property.status)} text-white`}>
                {property.status.toUpperCase()}
              </Badge>
              {property.verified && (
                <Badge variant="secondary" className="gap-1">
                  <Shield size={12} />
                  Verified
                </Badge>
              )}
              {property.rating && (
                <Badge variant="outline" className="gap-1">
                  <Star size={12} />
                  {property.rating}
                </Badge>
              )}
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={onClose}
                disabled={isLoading}
              >
                Close
              </Button>
              {onDelete && (
                <Button 
                  variant="outline" 
                  onClick={() => onDelete(property.id!)}
                  disabled={isLoading}
                  className="gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                  Delete
                </Button>
              )}
              <Button 
                variant="destructive" 
                onClick={() => onReject(property.id!)}
                disabled={isLoading}
                className="gap-1"
              >
                <XCircle size={16} />
                Reject
              </Button>
              <Button 
                onClick={() => onApprove(property.id!)}
                disabled={isLoading}
                className="gap-1"
              >
                <CheckCircle size={16} />
                Approve
              </Button>
            </div>
          </div>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="rooms">Rooms & Pricing</TabsTrigger>
              <TabsTrigger value="amenities">Amenities & Rules</TabsTrigger>
              <TabsTrigger value="owner">Owner & KYC</TabsTrigger>
            </TabsList>

            {/* Basic Information */}
            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="text-primary" size={20} />
                    Property Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Property Name</label>
                      <p className="font-semibold">{property.pgName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Property Type</label>
                      <p className="font-semibold">{getPropertyTypeDisplay(property.propertyType)}</p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-muted-foreground">Description</label>
                      <p className="text-sm">{property.description || 'No description provided'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="text-primary" size={20} />
                    Location Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Address</label>
                      <p className="font-semibold">{property.address}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">City</label>
                      <p className="font-semibold">{property.city}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Locality</label>
                      <p className="font-semibold">{property.locality}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Pincode</label>
                      <p className="font-semibold">{property.pincode}</p>
                    </div>
                    {property.fullAddress && (
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-muted-foreground">Full Address</label>
                        <p className="text-sm">{property.fullAddress}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Rooms & Pricing */}
            <TabsContent value="rooms" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="text-primary" size={20} />
                    Room Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Single Rooms */}
                  {property.singleRooms > 0 && (
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Single Occupancy Rooms</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Number of Rooms</label>
                          <p className="font-semibold">{property.singleRooms}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Monthly Rent</label>
                          <p className="font-semibold text-green-600">₹{property.singlePrice.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Double Rooms */}
                  {property.doubleRooms > 0 && (
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Double Occupancy Rooms</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Number of Rooms</label>
                          <p className="font-semibold">{property.doubleRooms}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Monthly Rent</label>
                          <p className="font-semibold text-green-600">₹{property.doublePrice.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Triple Rooms */}
                  {property.tripleRooms > 0 && (
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Triple Occupancy Rooms</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Number of Rooms</label>
                          <p className="font-semibold">{property.tripleRooms}</p>
                        </div>
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">Monthly Rent</label>
                          <p className="font-semibold text-green-600">₹{property.triplePrice.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-muted rounded-lg">
                    <h4 className="font-semibold mb-2">Summary</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Total Rooms</label>
                        <p className="font-semibold">{property.singleRooms + property.doubleRooms + property.tripleRooms}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Price Range</label>
                        <p className="font-semibold">{getDisplayPrice()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="text-primary" size={20} />
                    Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Gender Preference</label>
                      <p className="font-semibold">{getGenderDisplay(property.genderPreference)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Food Included</label>
                      <p className="font-semibold">{property.foodIncluded ? 'Yes' : 'No'}</p>
                    </div>
                    {property.foodIncluded && property.foodType && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Food Type</label>
                        <p className="font-semibold">{getFoodTypeDisplay(property.foodType)}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Amenities & Rules */}
            <TabsContent value="amenities" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="text-primary" size={20} />
                    Amenities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm">{amenity}</span>
                      </div>
                    ))}
                    {property.amenities.length === 0 && (
                      <p className="text-muted-foreground col-span-full">No amenities listed</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="text-primary" size={20} />
                    House Rules
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Gate Closing Time</label>
                      <p className="font-semibold">{property.gateClosingTime || 'Not specified'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Smoking Allowed</label>
                      <p className="font-semibold">{property.smokingAllowed ? 'Yes' : 'No'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Drinking Allowed</label>
                      <p className="font-semibold">{property.drinkingAllowed ? 'Yes' : 'No'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Guests Allowed</label>
                      <p className="font-semibold">{property.guestsAllowed ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Owner & KYC */}
            <TabsContent value="owner" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="text-primary" size={20} />
                    Owner Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Owner Name</label>
                      <p className="font-semibold">{property.ownerName}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                      <p className="font-semibold flex items-center gap-1">
                        <Phone size={14} />
                        {property.ownerPhone}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                      <p className="font-semibold flex items-center gap-1">
                        <Mail size={14} />
                        {property.ownerEmail}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="text-primary" size={20} />
                    KYC Documents
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Aadhar Number</label>
                      <p className="font-semibold font-mono">{property.aadhar}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">PAN Number</label>
                      <p className="font-semibold font-mono">{property.pan}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="text-primary" size={20} />
                    Submission Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Submitted On</label>
                      <p className="font-semibold flex items-center gap-1">
                        <Calendar size={14} />
                        {property.createdAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Last Updated</label>
                      <p className="font-semibold flex items-center gap-1">
                        <Clock size={14} />
                        {property.updatedAt?.toDate?.()?.toLocaleDateString() || 'Unknown'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Owner ID</label>
                      <p className="font-semibold font-mono text-sm">{property.ownerId}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Property ID</label>
                      <p className="font-semibold font-mono text-sm">{property.id}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyReviewModal;
