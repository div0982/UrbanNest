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

// Keep only the 4 base properties that have map integration
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

// Export only the base items (no more generated dummy data)
export const demoProperties: DemoProperty[] = baseItems;


