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
  },
];

// Generate a large demo dataset by varying titles, locations, prices, and ratings
export const demoProperties: DemoProperty[] = Array.from({ length: 60 }).map((_, i) => {
  const base = baseItems[i % baseItems.length];
  const citySuffix = [
    "Bangalore",
    "Mumbai",
    "Pune",
    "Hyderabad",
    "Chennai",
    "Delhi",
    "Gurgaon",
    "Noida",
    "Kolkata",
    "Ahmedabad",
  ][i % 10];

  const locality = [
    "Koramangala",
    "Indiranagar",
    "HSR Layout",
    "Powai",
    "Andheri",
    "Baner",
    "Hinjewadi",
    "Gachibowli",
    "Velachery",
    "Connaught Place",
  ][i % 10];

  const priceBase = 6500 + (i % 12) * 750; // vary price between ~₹6.5k and ~₹15k
  const rating = Math.round((4.1 + (i % 9) * 0.1) * 10) / 10; // 4.1 - 5.0
  const verified = i % 3 !== 0; // 2/3 verified
  const foodIncluded = i % 2 === 0;

  return {
    ...base,
    title: `${base.title} #${i + 1}`,
    location: `${locality}, ${citySuffix}`,
    price: `₹${priceBase.toLocaleString("en-IN")}`,
    rating,
    verified,
    foodIncluded,
  };
});


