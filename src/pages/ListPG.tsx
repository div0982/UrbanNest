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
import { Upload, MapPin, Home, Users, IndianRupee, Shield, Camera, X } from "lucide-react";
import { PropertyService } from "@/services/propertyService";
import { useAuth } from "@/contexts/AuthContext";

const ListPG = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
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
    singleRooms: 0,
    singlePrice: 0,
    doubleRooms: 0,
    doublePrice: 0,
    tripleRooms: 0,
    triplePrice: 0,
    
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
    "WiFi", "AC", "Washing Machine", "TV", "Refrigerator", "Geyser",
    "Parking", "Power Backup", "CCTV", "Security Guard",
    "Housekeeping", "Water Purifier", "Gym", "Common Area",
    "Elevator", "Balcony", "Laundry Service", "Study Room",
    "Cafeteria", "Rooftop", "Garden", "Swimming Pool"
  ];

  const cities = [
    "Bangalore", "Mumbai", "Delhi", "Pune", "Hyderabad",
    "Chennai", "Kolkata", "Ahmedabad", "Gurgaon", "Noida",
    "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore",
    "Thane", "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad",
    "Patna", "Vadodara", "Ghaziabad", "Ludhiana", "Agra",
    "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan",
    "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad",
    "Navi Mumbai", "Solapur", "Vijayawada", "Kolhapur",
    "Amritsar", "Ranchi", "Howrah", "Coimbatore",
    "Raipur", "Jabalpur", "Gwalior", "Chandigarh", "Tiruchirappalli"
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate file types and sizes
    const validFiles = files.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      
      if (!isValidType) {
        toast({
          title: "Invalid File Type",
          description: `${file.name} is not a valid image file. Please select JPG or PNG files.`,
          variant: "destructive",
        });
        return false;
      }
      
      if (!isValidSize) {
        toast({
          title: "File Too Large",
          description: `${file.name} is larger than 5MB. Please select a smaller file.`,
          variant: "destructive",
        });
        return false;
      }
      
      return true;
    });
    
    setSelectedFiles(prev => [...prev, ...validFiles]);
    
    if (validFiles.length > 0) {
      toast({
        title: "Files Selected",
        description: `${validFiles.length} file(s) selected successfully.`,
      });
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast({
        title: "Authentication Required",
        description: "Please log in to list your PG",
        variant: "destructive",
      });
      return;
    }
    
    // Basic validation
    if (!formData.pgName || !formData.address || !formData.city) {
      toast({
        title: "Missing Information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    // Check minimum photos requirement
    if (selectedFiles.length < 5) {
      toast({
        title: "Insufficient Photos",
        description: "Please upload at least 5 photos of your property",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('=== FORM SUBMISSION DEBUG ===');
      console.log('Form data:', formData);
      console.log('Selected files:', selectedFiles.length);
      console.log('Current user:', currentUser?.uid);
      console.log('=== END FORM SUBMISSION DEBUG ===');
      
      // Prepare property data for Firebase
      const propertyData = {
        pgName: formData.pgName,
        description: formData.description,
        propertyType: formData.propertyType as 'independent' | 'apartment' | 'villa' | 'hostel',
        
        // Location
        address: formData.address,
        city: formData.city,
        locality: formData.locality,
        pincode: formData.pincode,
        fullAddress: `${formData.address}, ${formData.locality}, ${formData.city} - ${formData.pincode}`,
        
        // Room Details
        singleRooms: formData.singleRooms,
        singlePrice: formData.singlePrice,
        doubleRooms: formData.doubleRooms,
        doublePrice: formData.doublePrice,
        tripleRooms: formData.tripleRooms,
        triplePrice: formData.triplePrice,
        
        // Amenities
        amenities: formData.amenities,
        
        // Preferences
        genderPreference: formData.genderPreference as 'male' | 'female' | 'coliving',
        foodIncluded: formData.foodIncluded,
        foodType: formData.foodType as 'veg' | 'nonveg' | 'both' | undefined,
        
        // Rules
        gateClosingTime: formData.gateClosingTime,
        smokingAllowed: formData.smokingAllowed,
        drinkingAllowed: formData.drinkingAllowed,
        guestsAllowed: formData.guestsAllowed,
        
        // Owner Details
        ownerName: formData.ownerName,
        ownerPhone: formData.ownerPhone,
        ownerEmail: formData.ownerEmail,
        ownerId: currentUser.uid,
        
        // KYC
        aadhar: formData.aadhar,
        pan: formData.pan,
      };

      const propertyId = await PropertyService.createProperty(propertyData);
      
      console.log("Property created successfully:", propertyId);
      
      // Upload images if any are selected
      if (selectedFiles.length > 0) {
        try {
          console.log('=== IMAGE UPLOAD DEBUG ===');
          console.log('Starting image upload for property:', propertyId);
          console.log('Number of files to upload:', selectedFiles.length);
          
          const imageUrls: string[] = [];
          
          for (let i = 0; i < selectedFiles.length; i++) {
            console.log(`Uploading file ${i + 1}/${selectedFiles.length}:`, selectedFiles[i].name);
            const imageUrl = await PropertyService.uploadPropertyImage(selectedFiles[i], propertyId);
            imageUrls.push(imageUrl);
            console.log(`File ${i + 1} uploaded successfully:`, imageUrl);
          }
          
          console.log('All images uploaded. URLs:', imageUrls);
          
          // Update property with image URLs
          await PropertyService.updateProperty(propertyId, { 
            images: imageUrls,
            image: imageUrls[0] // Set first image as main image
          });
          
          console.log('Property updated with image URLs');
          console.log('=== END IMAGE UPLOAD DEBUG ===');
        } catch (imageError) {
          console.error("Error uploading images:", imageError);
          toast({
            title: "Image Upload Failed",
            description: "Property was created but some images failed to upload. You can add images later.",
            variant: "destructive",
          });
        }
      }
      
      toast({
        title: "Success!",
        description: "Your PG listing has been submitted for review. We'll get back to you within 24 hours.",
      });
      
      setTimeout(() => navigate("/"), 2000);
      
    } catch (error) {
      console.error("Error creating property:", error);
      toast({
        title: "Error",
        description: "Failed to submit your PG listing. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
      
      <main className="flex-1 py-6 md:py-12 bg-gradient-to-b from-background to-muted/20 mobile-safe-area">
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
                          onChange={(e) => handleInputChange("singleRooms", parseInt(e.target.value) || 0)}
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
                          onChange={(e) => handleInputChange("singlePrice", parseInt(e.target.value) || 0)}
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
                          onChange={(e) => handleInputChange("doubleRooms", parseInt(e.target.value) || 0)}
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
                          onChange={(e) => handleInputChange("doublePrice", parseInt(e.target.value) || 0)}
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
                          onChange={(e) => handleInputChange("tripleRooms", parseInt(e.target.value) || 0)}
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
                          onChange={(e) => handleInputChange("triplePrice", parseInt(e.target.value) || 0)}
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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
                        <input
                          type="file"
                          id="file-upload"
                          multiple
                          accept="image/*"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="sm"
                          onClick={() => document.getElementById('file-upload')?.click()}
                        >
                          <Upload className="mr-2" size={16} />
                          Choose Files
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        JPG, PNG up to 5MB each. Include room photos, common areas, and exterior.
                      </p>
                      
                      {/* File Preview Section */}
                      {selectedFiles.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">
                            Selected Files ({selectedFiles.length}):
                          </p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {selectedFiles.map((file, index) => (
                              <div key={index} className="relative border rounded-lg p-2">
                                <div className="flex items-center justify-between">
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs font-medium truncate">
                                      {file.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                  </div>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeFile(index)}
                                    className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                                  >
                                    <X size={14} />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
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
                  <Button type="submit" variant="hero" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit for Review"}
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