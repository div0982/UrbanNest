import pgShared from "@/assets/pg-shared.jpg";
import pgSingle from "@/assets/pg-single.jpg";
import pgPremium from "@/assets/pg-premium.jpg";
import pgCommon from "@/assets/pg-common.jpg";

type GenderType = "Male" | "Female" | "Co-living";

export interface DemoProperty {
  image: string;
  title: string;
  location: string;
  price: string;
  gender: GenderType;
  foodIncluded: boolean;
  verified: boolean;
  roomType: string;
  rating?: number;
  // New amenity fields
  hasAC?: boolean;
  hasWiFi?: boolean;
  hasParking?: boolean;
  hasGym?: boolean;
  hasLaundry?: boolean;
  hasSecurity?: boolean;
  hasElevator?: boolean;
  hasBalcony?: boolean;
  hasGeyser?: boolean;
  hasRefrigerator?: boolean;
  // Map-related fields
  latitude?: number;
  longitude?: number;
  fullAddress?: string;
  isRealPlace?: boolean;
}

const baseItems: DemoProperty[] = [
  {
    image: pgShared,
    title: "Sunshine Residency - Shared",
    location: "Koramangala, Bangalore",
    price: "₹8,500",
    gender: "Male",
    foodIncluded: true,
    verified: true,
    roomType: "Shared",
    rating: 4.7,
    hasAC: true,
    hasWiFi: true,
    hasParking: false,
    hasGym: false,
    hasLaundry: true,
    hasSecurity: true,
    hasElevator: false,
    hasBalcony: true,
    hasGeyser: true,
    hasRefrigerator: false,
    latitude: 12.9352,
    longitude: 77.6245,
    fullAddress: "Koramangala 5th Block, Bangalore, Karnataka 560034",
    isRealPlace: true,
  },
  {
    image: pgSingle,
    title: "Green Valley PG - Single",
    location: "Powai, Mumbai",
    price: "₹12,000",
    gender: "Female",
    foodIncluded: true,
    verified: true,
    roomType: "Single",
    rating: 4.8,
    hasAC: true,
    hasWiFi: true,
    hasParking: true,
    hasGym: true,
    hasLaundry: true,
    hasSecurity: true,
    hasElevator: true,
    hasBalcony: true,
    hasGeyser: true,
    hasRefrigerator: true,
    latitude: 19.1176,
    longitude: 72.9060,
    fullAddress: "Powai, Mumbai, Maharashtra 400076",
    isRealPlace: true,
  },
  {
    image: pgPremium,
    title: "Elite Heights - Premium",
    location: "Hinjewadi, Pune",
    price: "₹15,500",
    gender: "Co-living",
    foodIncluded: false,
    verified: true,
    roomType: "Premium",
    rating: 4.9,
    hasAC: true,
    hasWiFi: true,
    hasParking: true,
    hasGym: true,
    hasLaundry: true,
    hasSecurity: true,
    hasElevator: true,
    hasBalcony: true,
    hasGeyser: true,
    hasRefrigerator: true,
    latitude: 18.5912,
    longitude: 73.7389,
    fullAddress: "Hinjewadi, Pune, Maharashtra 411057",
    isRealPlace: true,
  },
  {
    image: pgCommon,
    title: "The Nest Co-living",
    location: "Gurgaon, Delhi NCR",
    price: "₹11,000",
    gender: "Co-living",
    foodIncluded: true,
    verified: true,
    roomType: "Shared",
    rating: 4.6,
    hasAC: true,
    hasWiFi: true,
    hasParking: true,
    hasGym: false,
    hasLaundry: true,
    hasSecurity: true,
    hasElevator: false,
    hasBalcony: false,
    hasGeyser: true,
    hasRefrigerator: true,
    latitude: 28.4595,
    longitude: 77.0266,
    fullAddress: "Gurgaon, Haryana 122001",
    isRealPlace: true,
  },
];

// Extensive Indian cities and localities data
const indianCities = [
  // Karnataka
  { city: "Bangalore", state: "Karnataka", localities: ["Koramangala", "Indiranagar", "HSR Layout", "Whitefield", "Electronic City", "Manyata Tech Park", "Marathahalli", "Bellandur", "Sarjapur", "Hebbal"] },
  { city: "Mysore", state: "Karnataka", localities: ["Vijayanagar", "Saraswathipuram", "Gokulam", "Jayalakshmipuram", "Nazarbad"] },
  { city: "Mangalore", state: "Karnataka", localities: ["Kadri", "Bejai", "Kodialbail", "Hampankatta", "Lalbagh"] },
  
  // Maharashtra
  { city: "Mumbai", state: "Maharashtra", localities: ["Powai", "Andheri", "Bandra", "Malad", "Borivali", "Thane", "Navi Mumbai", "Lower Parel", "BKC", "Goregaon"] },
  { city: "Pune", state: "Maharashtra", localities: ["Baner", "Hinjewadi", "Koregaon Park", "Viman Nagar", "Wakad", "Aundh", "Kothrud", "Hadapsar", "Magarpatta", "Pimpri"] },
  { city: "Nagpur", state: "Maharashtra", localities: ["Civil Lines", "Ramdaspeth", "Dharampeth", "Sadar", "Wardha Road"] },
  { city: "Nashik", state: "Maharashtra", localities: ["College Road", "Gangapur Road", "Satpur", "Ambad", "CIDCO"] },
  
  // Delhi NCR
  { city: "Delhi", state: "Delhi", localities: ["Connaught Place", "Karol Bagh", "Rajouri Garden", "Lajpat Nagar", "Saket", "Dwarka", "Rohini", "Pitampura", "Janakpuri", "Vasant Kunj"] },
  { city: "Gurgaon", state: "Haryana", localities: ["Cyber City", "Sector 62", "DLF Phase 2", "Sohna Road", "MG Road", "Sector 14", "Sector 29", "Udyog Vihar", "Manesar", "Sector 57"] },
  { city: "Noida", state: "Uttar Pradesh", localities: ["Sector 62", "Sector 18", "Sector 63", "Greater Noida", "Sector 137", "Sector 15", "Sector 16", "Sector 12", "Sector 62", "Sector 125"] },
  { city: "Faridabad", state: "Haryana", localities: ["Sector 16", "Sector 21", "Sector 15", "Ballabgarh", "Neelam Chowk"] },
  
  // Tamil Nadu
  { city: "Chennai", state: "Tamil Nadu", localities: ["OMR", "Velachery", "T. Nagar", "Anna Nagar", "Adyar", "Mylapore", "Guindy", "Tambaram", "Chromepet", "Porur"] },
  { city: "Coimbatore", state: "Tamil Nadu", localities: ["RS Puram", "Saibaba Colony", "Peelamedu", "Gandhipuram", "Saravanampatti"] },
  { city: "Madurai", state: "Tamil Nadu", localities: ["Anna Nagar", "K. K. Nagar", "Villapuram", "Tallakulam", "Simmakkal"] },
  
  // Telangana
  { city: "Hyderabad", state: "Telangana", localities: ["Gachibowli", "HITEC City", "Kondapur", "Banjara Hills", "Jubilee Hills", "Secunderabad", "Begumpet", "Madhapur", "Kukatpally", "Miyapur"] },
  { city: "Warangal", state: "Telangana", localities: ["Hanamkonda", "Kazipet", "Station Ghanpur", "Narsampet"] },
  
  // West Bengal
  { city: "Kolkata", state: "West Bengal", localities: ["Salt Lake", "New Town", "Park Street", "Ballygunge", "Dum Dum", "Howrah", "Sealdah", "Tollygunge", "Jadavpur", "Garia"] },
  { city: "Durgapur", state: "West Bengal", localities: ["City Center", "Benachity", "A-Zone", "C-Zone"] },
  
  // Gujarat
  { city: "Ahmedabad", state: "Gujarat", localities: ["Vastrapur", "Bodakdev", "Satellite", "Maninagar", "Navrangpura", "Paldi", "Ambawadi", "Gurukul", "Thaltej", "Bopal"] },
  { city: "Surat", state: "Gujarat", localities: ["Adajan", "Vesu", "Piplod", "Athwa", "Parle Point", "City Light", "Katargam", "Sarthana"] },
  { city: "Vadodara", state: "Gujarat", localities: ["Alkapuri", "Akota", "Gotri", "Manjalpur", "Subhanpura"] },
  
  // Rajasthan
  { city: "Jaipur", state: "Rajasthan", localities: ["C-Scheme", "Vaishali Nagar", "Malviya Nagar", "Bani Park", "Civil Lines", "Pink City", "Raja Park", "Jhotwara", "Vidhyadhar Nagar", "Mansarovar"] },
  { city: "Udaipur", state: "Rajasthan", localities: ["Fateh Sagar", "Lake City", "Bapu Bazar", "Hiran Magri", "Sector 14"] },
  { city: "Jodhpur", state: "Rajasthan", localities: ["Basni", "Shastri Nagar", "Ratanada", "Airport Area", "Chopasni"] },
  
  // Kerala
  { city: "Kochi", state: "Kerala", localities: ["Kakkanad", "Edapally", "Palarivattom", "Vyttila", "Maradu", "Thrikkakara", "Infopark", "Seaport Airport Road"] },
  { city: "Thiruvananthapuram", state: "Kerala", localities: ["Kowdiar", "Vazhuthacaud", "Kesavadasapuram", "Pattom", "Sasthamangalam"] },
  
  // Punjab
  { city: "Chandigarh", state: "Punjab", localities: ["Sector 17", "Sector 35", "Sector 22", "Sector 34", "Sector 8", "Sector 9", "Sector 10", "Sector 11", "Sector 12", "Sector 14"] },
  { city: "Ludhiana", state: "Punjab", localities: ["Model Town", "Civil Lines", "Sarabha Nagar", "BRS Nagar", "Dugri"] },
  
  // Madhya Pradesh
  { city: "Indore", state: "Madhya Pradesh", localities: ["Vijay Nagar", "Rajendra Nagar", "New Palasia", "Bhawarkuan", "Sarafa Bazar"] },
  { city: "Bhopal", state: "Madhya Pradesh", localities: ["Arera Colony", "Shyamla Hills", "New Market", "MP Nagar", "Kolar Road"] },
  
  // Uttar Pradesh
  { city: "Lucknow", state: "Uttar Pradesh", localities: ["Gomti Nagar", "Hazratganj", "Aliganj", "Indira Nagar", "Rajajipuram", "Aminabad", "Chowk", "Mahanagar", "Vikas Nagar", "Sitapur Road"] },
  { city: "Kanpur", state: "Uttar Pradesh", localities: ["Civil Lines", "Kakadeo", "Panki", "Barra", "Kalyanpur"] },
  { city: "Agra", state: "Uttar Pradesh", localities: ["Civil Lines", "Kamla Nagar", "Shamshabad Road", "Dayal Bagh", "Sikandra"] },
  
  // Andhra Pradesh
  { city: "Visakhapatnam", state: "Andhra Pradesh", localities: ["MVP Colony", "Dwaraka Nagar", "Madhurawada", "Rushikonda", "Beach Road"] },
  { city: "Vijayawada", state: "Andhra Pradesh", localities: ["Benz Circle", "One Town", "Patamata", "Gandhi Nagar", "Labbipet"] },
  
  // Odisha
  { city: "Bhubaneswar", state: "Odisha", localities: ["Patia", "Khandagiri", "Jayadev Vihar", "Nayapalli", "Saheed Nagar"] },
  { city: "Cuttack", state: "Odisha", localities: ["Buxi Bazar", "Chandni Chowk", "Tulsi Nagar", "Link Road", "Badambadi"] },
  
  // Jharkhand
  { city: "Ranchi", state: "Jharkhand", localities: ["Lalpur", "Doranda", "Hinoo", "Kanke", "Harmu"] },
  { city: "Jamshedpur", state: "Jharkhand", localities: ["Bistupur", "Sakchi", "Kadma", "Sonari", "Telco"] },
  
  // Assam
  { city: "Guwahati", state: "Assam", localities: ["Dispur", "Paltan Bazar", "Fancy Bazar", "Ulubari", "Beltola"] },
  
  // Bihar
  { city: "Patna", state: "Bihar", localities: ["Boring Road", "Kankarbagh", "Rajendra Nagar", "Exhibition Road", "Fraser Road"] },
  
  // Chhattisgarh
  { city: "Raipur", state: "Chhattisgarh", localities: ["Shankar Nagar", "Tatibandh", "Civil Lines", "Raipura", "Khamtarai"] },
  
  // Himachal Pradesh
  { city: "Shimla", state: "Himachal Pradesh", localities: ["Mall Road", "Chotta Shimla", "Sanjauli", "Kasumpti", "Summer Hill"] },
  
  // Uttarakhand
  { city: "Dehradun", state: "Uttarakhand", localities: ["Rajpur Road", "Clement Town", "Dalanwala", "Ballupur", "Prem Nagar"] },
  
  // Goa
  { city: "Panaji", state: "Goa", localities: ["Miramar", "Dona Paula", "Caranzalem", "Altinho", "Campal"] },
  
  // Jammu & Kashmir
  { city: "Srinagar", state: "Jammu & Kashmir", localities: ["Lal Chowk", "Rajbagh", "Jawahar Nagar", "Bemina", "Hyderpora"] },
  
  // Manipur
  { city: "Imphal", state: "Manipur", localities: ["Lamphelpat", "Thangmeiband", "Paona Bazar", "Kongba", "Sagolband"] },
  
  // Meghalaya
  { city: "Shillong", state: "Meghalaya", localities: ["Police Bazar", "Laitumkhrah", "Nongthymmai", "Mawprem", "Rynjah"] },
  
  // Mizoram
  { city: "Aizawl", state: "Mizoram", localities: ["Bara Bazar", "Zarkawt", "Dawrpui", "Mission Veng", "Chaltlang"] },
  
  // Nagaland
  { city: "Kohima", state: "Nagaland", localities: ["New Market", "PWD", "D Block", "Kitsubozou", "Jalukie"] },
  
  // Sikkim
  { city: "Gangtok", state: "Sikkim", localities: ["MG Marg", "Deorali", "Tadong", "Ranipool", "Sichey"] },
  
  // Tripura
  { city: "Agartala", state: "Tripura", localities: ["Krishnanagar", "Battala", "Abhoynagar", "Pratapgarh", "Indranagar"] },
  
  // Arunachal Pradesh
  { city: "Itanagar", state: "Arunachal Pradesh", localities: ["Ganga", "Naharlagun", "Papum Pare", "Doimukh", "Banderdewa"] },
  
  // Andaman & Nicobar
  { city: "Port Blair", state: "Andaman & Nicobar", localities: ["Aberdeen Bazar", "Phoenix Bay", "Junglighat", "Delanipur", "Haddo"] },
  
  // Lakshadweep
  { city: "Kavaratti", state: "Lakshadweep", localities: ["Kavaratti Island", "Agatti", "Minicoy", "Kadmat", "Kiltan"] },
  
  // Dadra & Nagar Haveli
  { city: "Silvassa", state: "Dadra & Nagar Haveli", localities: ["Silvassa", "Naroli", "Dadra", "Masat", "Khanvel"] },
  
  // Daman & Diu
  { city: "Daman", state: "Daman & Diu", localities: ["Daman", "Diu", "Nani Daman", "Moti Daman", "Kadaiya"] },
  
  // Puducherry
  { city: "Puducherry", state: "Puducherry", localities: ["White Town", "French Quarter", "Mission Street", "MG Road", "Beach Road"] },
];

// Real coordinates for major Indian cities
const cityCoordinates: { [key: string]: { lat: number; lng: number } } = {
  "Bangalore": { lat: 12.9716, lng: 77.5946 },
  "Mumbai": { lat: 19.0760, lng: 72.8777 },
  "Delhi": { lat: 28.7041, lng: 77.1025 },
  "Pune": { lat: 18.5204, lng: 73.8567 },
  "Chennai": { lat: 13.0827, lng: 80.2707 },
  "Hyderabad": { lat: 17.3850, lng: 78.4867 },
  "Kolkata": { lat: 22.5726, lng: 88.3639 },
  "Ahmedabad": { lat: 23.0225, lng: 72.5714 },
  "Jaipur": { lat: 26.9124, lng: 75.7873 },
  "Gurgaon": { lat: 28.4595, lng: 77.0266 },
  "Noida": { lat: 28.5355, lng: 77.3910 },
  "Indore": { lat: 22.7196, lng: 75.8577 },
  "Lucknow": { lat: 26.8467, lng: 80.9462 },
  "Kochi": { lat: 9.9312, lng: 76.2673 },
  "Chandigarh": { lat: 30.7333, lng: 76.7794 },
  "Bhopal": { lat: 23.2599, lng: 77.4126 },
  "Visakhapatnam": { lat: 17.6868, lng: 83.2185 },
  "Bhubaneswar": { lat: 20.2961, lng: 85.8245 },
  "Ranchi": { lat: 23.3441, lng: 85.3096 },
  "Guwahati": { lat: 26.1445, lng: 91.7362 },
  "Patna": { lat: 25.5941, lng: 85.1376 },
  "Raipur": { lat: 21.2514, lng: 81.6296 },
  "Shimla": { lat: 31.1048, lng: 77.1734 },
  "Dehradun": { lat: 30.3165, lng: 78.0322 },
  "Panaji": { lat: 15.4909, lng: 73.8278 },
  "Srinagar": { lat: 34.0837, lng: 74.7973 },
  "Imphal": { lat: 24.8170, lng: 93.9368 },
  "Shillong": { lat: 25.5788, lng: 91.8933 },
  "Aizawl": { lat: 23.7271, lng: 92.7176 },
  "Kohima": { lat: 25.6751, lng: 94.1086 },
  "Gangtok": { lat: 27.3314, lng: 88.6138 },
  "Agartala": { lat: 23.8315, lng: 91.2862 },
  "Itanagar": { lat: 27.0844, lng: 93.6053 },
  "Port Blair": { lat: 11.6234, lng: 92.7265 },
  "Kavaratti": { lat: 10.5626, lng: 72.6369 },
  "Silvassa": { lat: 20.2734, lng: 73.0163 },
  "Daman": { lat: 20.4283, lng: 72.8397 },
  "Puducherry": { lat: 11.9139, lng: 79.8145 },
};

// Generate a large demo dataset by varying titles, locations, prices, and ratings
export const demoProperties: DemoProperty[] = Array.from({ length: 200 }).map((_, i) => {
  const base = baseItems[i % baseItems.length];
  const cityData = indianCities[i % indianCities.length];
  const locality = cityData.localities[i % cityData.localities.length];

  const priceBase = 4500 + (i % 20) * 800; // vary price between ~₹4.5k and ~₹20k
  const rating = Math.round((4.0 + (i % 10) * 0.1) * 10) / 10; // 4.0 - 5.0
  const verified = i % 4 !== 0; // 3/4 verified
  const foodIncluded = i % 2 === 0;

  // Randomly assign amenities based on price tier
  const isPremium = priceBase > 12000;
  const isMidRange = priceBase > 8000 && priceBase <= 12000;
  
  const amenities = {
    hasAC: isPremium || (isMidRange && i % 2 === 0),
    hasWiFi: true, // Most PGs have WiFi
    hasParking: isPremium || (isMidRange && i % 3 === 0),
    hasGym: isPremium && i % 3 === 0,
    hasLaundry: true, // Most PGs have laundry
    hasSecurity: true, // Most PGs have security
    hasElevator: isPremium && i % 4 === 0,
    hasBalcony: isMidRange || isPremium,
    hasGeyser: isMidRange || isPremium,
    hasRefrigerator: isPremium || (isMidRange && i % 2 === 0),
  };

  // Get coordinates for the city
  const cityCoords = cityCoordinates[cityData.city];
  const latitude = cityCoords ? cityCoords.lat + (Math.random() - 0.5) * 0.1 : undefined;
  const longitude = cityCoords ? cityCoords.lng + (Math.random() - 0.5) * 0.1 : undefined;

  return {
    ...base,
    title: `${base.title} #${i + 1}`,
    location: `${locality}, ${cityData.city}`,
    price: `₹${priceBase.toLocaleString("en-IN")}`,
    rating,
    verified,
    foodIncluded,
    ...amenities,
    latitude,
    longitude,
    fullAddress: `${locality}, ${cityData.city}, ${cityData.state}`,
    isRealPlace: !!cityCoords,
  };
});


