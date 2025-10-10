import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, MapPin, Home, Users, IndianRupee, Shield, Camera } from "lucide-react";

const ListPG = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Details
    pgName: "",
    description: "",
    propertyType: "",
    
    // Location
    address: "",
    city: "",
    locality: "",
    pincode: "",
    
    // Room Details
    singleRooms: "",
    singlePrice: "",
    doubleRooms: "",
    doublePrice: "",
    tripleRooms: "",
    triplePrice: "",
    
    // Amenities
    amenities: [] as string[],
    
    // Preferences
    genderPreference: "",
    foodIncluded: false,
    foodType: "",
    
    // Rules
    gateClosingTime: "",
    smokingAllowed: false,
    drinkingAllowed: false,
    guestsAllowed: false,
    
    // Owner Details
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    
    // KYC
    aadhar: "",
    pan: "",
  });

  const amenitiesList = [
    "WiFi", "AC", "Washing Machine", "TV", "Fridge", "Geyser",
    "Parking", "Power Backup", "CCTV", "Security Guard",
    "Housekeeping", "Water Purifier", "Gym", "Common Area"
  ];

  const cities = [
    "Bangalore", "Mumbai", "Delhi", "Pune", "Hyderabad",
    "Chennai", "Kolkata", "Ahmedabad", "Gurgaon", "Noida"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.pgName || !formData.address || !formData.city) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    console.log("Form submitted:", formData);
    toast({
      title: "Success!",
      description: "Your PG listing has been submitted for review. We'll get back to you within 24 hours.",
    });
    
    setTimeout(() => navigate("/"), 2000);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-[hsl(14_100%_70%)] bg-clip-text text-transparent">
              List Your PG
            </h1>
            <p className="text-muted-foreground text-lg">
              Join thousands of PG owners and find verified tenants
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8 max-w-2xl mx-auto">
            {[
              { num: 1, label: "Basic Info" },
              { num: 2, label: "Room Details" },
              { num: 3, label: "Amenities" },
              { num: 4, label: "Owner Details" }
            ].map((step) => (
              <div key={step.num} className="flex flex-col items-center flex-1">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  currentStep >= step.num 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "bg-muted text-muted-foreground"
                }`}>
                  {step.num}
                </div>
                <span className="text-xs mt-2 text-muted-foreground">{step.label}</span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Home className="text-primary" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>Tell us about your PG property</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="pgName">PG Name *</Label>
                    <Input
                      id="pgName"
                      placeholder="e.g., Sunshine Residency"
                      value={formData.pgName}
                      onChange={(e) => handleInputChange("pgName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your PG, its location benefits, nearby places..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="propertyType">Property Type *</Label>
                    <Select 
                      value={formData.propertyType} 
                      onValueChange={(value) => handleInputChange("propertyType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="independent">Independent House</SelectItem>
                        <SelectItem value="apartment">Apartment Building</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="hostel">Hostel Building</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Select 
                        value={formData.city} 
                        onValueChange={(value) => handleInputChange("city", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select city" />
                        </SelectTrigger>
                        <SelectContent>
                          {cities.map(city => (
                            <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="locality">Locality *</Label>
                      <Input
                        id="locality"
                        placeholder="e.g., Koramangala"
                        value={formData.locality}
                        onChange={(e) => handleInputChange("locality", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Full Address *</Label>
                    <Input
                      id="address"
                      placeholder="House/Building number, Street name"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      placeholder="e.g., 560034"
                      value={formData.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      maxLength={6}
                      required
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Room Details & Pricing */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <IndianRupee className="text-primary" />
                    Room Details & Pricing
                  </CardTitle>
                  <CardDescription>Set up room types and monthly rent</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Single Rooms */}
                  <div className="p-4 rounded-lg border-2 border-border space-y-4">
                    <h3 className="font-semibold">Single Occupancy Rooms</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="singleRooms">Number of Rooms</Label>
                        <Input
                          id="singleRooms"
                          type="number"
                          placeholder="0"
                          value={formData.singleRooms}
                          onChange={(e) => handleInputChange("singleRooms", e.target.value)}
                          min="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="singlePrice">Monthly Rent (₹)</Label>
                        <Input
                          id="singlePrice"
                          type="number"
                          placeholder="10000"
                          value={formData.singlePrice}
                          onChange={(e) => handleInputChange("singlePrice", e.target.value)}
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Double Rooms */}
                  <div className="p-4 rounded-lg border-2 border-border space-y-4">
                    <h3 className="font-semibold">Double Occupancy Rooms</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="doubleRooms">Number of Rooms</Label>
                        <Input
                          id="doubleRooms"
                          type="number"
                          placeholder="0"
                          value={formData.doubleRooms}
                          onChange={(e) => handleInputChange("doubleRooms", e.target.value)}
                          min="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="doublePrice">Monthly Rent (₹)</Label>
                        <Input
                          id="doublePrice"
                          type="number"
                          placeholder="7000"
                          value={formData.doublePrice}
                          onChange={(e) => handleInputChange("doublePrice", e.target.value)}
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Triple Rooms */}
                  <div className="p-4 rounded-lg border-2 border-border space-y-4">
                    <h3 className="font-semibold">Triple Occupancy Rooms</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tripleRooms">Number of Rooms</Label>
                        <Input
                          id="tripleRooms"
                          type="number"
                          placeholder="0"
                          value={formData.tripleRooms}
                          onChange={(e) => handleInputChange("tripleRooms", e.target.value)}
                          min="0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="triplePrice">Monthly Rent (₹)</Label>
                        <Input
                          id="triplePrice"
                          type="number"
                          placeholder="5500"
                          value={formData.triplePrice}
                          onChange={(e) => handleInputChange("triplePrice", e.target.value)}
                          min="0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Gender Preference *</Label>
                    <RadioGroup 
                      value={formData.genderPreference}
                      onValueChange={(value) => handleInputChange("genderPreference", value)}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male" className="font-normal cursor-pointer">Male Only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female" className="font-normal cursor-pointer">Female Only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="coliving" id="coliving" />
                        <Label htmlFor="coliving" className="font-normal cursor-pointer">Co-living (Mixed)</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="foodIncluded"
                        checked={formData.foodIncluded}
                        onCheckedChange={(checked) => handleInputChange("foodIncluded", checked)}
                      />
                      <Label htmlFor="foodIncluded" className="font-normal cursor-pointer">
                        Food Included
                      </Label>
                    </div>

                    {formData.foodIncluded && (
                      <div className="space-y-2 ml-6">
                        <Label>Food Type</Label>
                        <RadioGroup 
                          value={formData.foodType}
                          onValueChange={(value) => handleInputChange("foodType", value)}
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="veg" id="veg" />
                            <Label htmlFor="veg" className="font-normal cursor-pointer">Vegetarian</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="nonveg" id="nonveg" />
                            <Label htmlFor="nonveg" className="font-normal cursor-pointer">Non-Vegetarian</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="both" id="both" />
                            <Label htmlFor="both" className="font-normal cursor-pointer">Both Available</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Amenities & Rules */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="text-primary" />
                    Amenities & House Rules
                  </CardTitle>
                  <CardDescription>Select available amenities and set house rules</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <Label>Available Amenities</Label>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {amenitiesList.map((amenity) => (
                        <div key={amenity} className="flex items-center space-x-2">
                          <Checkbox
                            id={amenity}
                            checked={formData.amenities.includes(amenity)}
                            onCheckedChange={() => handleAmenityToggle(amenity)}
                          />
                          <Label htmlFor={amenity} className="font-normal cursor-pointer">
                            {amenity}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="font-semibold">House Rules</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gateClosingTime">Gate Closing Time</Label>
                      <Input
                        id="gateClosingTime"
                        type="time"
                        value={formData.gateClosingTime}
                        onChange={(e) => handleInputChange("gateClosingTime", e.target.value)}
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="smokingAllowed"
                          checked={formData.smokingAllowed}
                          onCheckedChange={(checked) => handleInputChange("smokingAllowed", checked)}
                        />
                        <Label htmlFor="smokingAllowed" className="font-normal cursor-pointer">
                          Smoking Allowed
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="drinkingAllowed"
                          checked={formData.drinkingAllowed}
                          onCheckedChange={(checked) => handleInputChange("drinkingAllowed", checked)}
                        />
                        <Label htmlFor="drinkingAllowed" className="font-normal cursor-pointer">
                          Drinking Allowed
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="guestsAllowed"
                          checked={formData.guestsAllowed}
                          onCheckedChange={(checked) => handleInputChange("guestsAllowed", checked)}
                        />
                        <Label htmlFor="guestsAllowed" className="font-normal cursor-pointer">
                          Guests/Visitors Allowed
                        </Label>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 4: Owner Details & KYC */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="text-primary" />
                    Owner Details & KYC
                  </CardTitle>
                  <CardDescription>Your contact information and KYC documents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Full Name *</Label>
                    <Input
                      id="ownerName"
                      placeholder="Enter your full name"
                      value={formData.ownerName}
                      onChange={(e) => handleInputChange("ownerName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="ownerPhone">Phone Number *</Label>
                      <Input
                        id="ownerPhone"
                        type="tel"
                        placeholder="10-digit mobile number"
                        value={formData.ownerPhone}
                        onChange={(e) => handleInputChange("ownerPhone", e.target.value)}
                        maxLength={10}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ownerEmail">Email Address *</Label>
                      <Input
                        id="ownerEmail"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.ownerEmail}
                        onChange={(e) => handleInputChange("ownerEmail", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t space-y-4">
                    <h3 className="font-semibold">KYC Documents</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="aadhar">Aadhar Number *</Label>
                      <Input
                        id="aadhar"
                        placeholder="12-digit Aadhar number"
                        value={formData.aadhar}
                        onChange={(e) => handleInputChange("aadhar", e.target.value)}
                        maxLength={12}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pan">PAN Number *</Label>
                      <Input
                        id="pan"
                        placeholder="10-character PAN"
                        value={formData.pan}
                        onChange={(e) => handleInputChange("pan", e.target.value.toUpperCase())}
                        maxLength={10}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Upload Photos *</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/40 transition-colors cursor-pointer">
                        <Camera className="mx-auto mb-3 text-muted-foreground" size={40} />
                        <p className="text-sm text-muted-foreground mb-2">
                          Upload property photos (minimum 5 photos)
                        </p>
                        <Button type="button" variant="outline" size="sm">
                          <Upload className="mr-2" size={16} />
                          Choose Files
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG up to 5MB each. Include room photos, common areas, and exterior.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
              
              <div className="ml-auto flex gap-3">
                {currentStep < 4 ? (
                  <Button type="button" onClick={nextStep}>
                    Next Step
                  </Button>
                ) : (
                  <Button type="submit" variant="hero">
                    Submit for Review
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default ListPG;