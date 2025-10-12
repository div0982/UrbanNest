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

  return {
    ...base,
    title: `${base.title} #${i + 1}`,
    location: `${locality}, ${cityData.city}`,
    price: `₹${priceBase.toLocaleString("en-IN")}`,
    rating,
    verified,
    foodIncluded,
    ...amenities,
  };
});


