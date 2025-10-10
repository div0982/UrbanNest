import { Search, Calendar, Key, Building2, Filter, MessageSquare, CreditCard, Star, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const tenantSteps = [
  {
    icon: Search,
    title: "Search & Discover",
    bullets: [
      "Enter your city or location, choose your preferences (gender, room type, budget, amenities).",
      "Browse verified PG listings with photos, descriptions, and reviews.",
    ],
  },
  {
    icon: Filter,
    title: "Filter & Compare",
    bullets: [
      "Use advanced filters to narrow down options: AC/non-AC, food, furnished, distance to landmarks.",
      "Compare multiple listings side by side to find your perfect match.",
    ],
  },
  {
    icon: Calendar,
    title: "Book & Connect",
    bullets: [
      "Schedule a visit or book online directly through the app.",
      "Chat securely with PG owners to clarify any doubts.",
    ],
  },
  {
    icon: CreditCard,
    title: "Pay & Confirm",
    bullets: [
      "Make secure payments via UPI, cards, or wallets.",
      "Receive instant confirmation and move-in instructions.",
    ],
  },
  {
    icon: Star,
    title: "Stay & Review",
    bullets: [
      "Enjoy your stay and share feedback with the community.",
      "Help others find trusted PGs through ratings and reviews.",
    ],
  },
];

const ownerSteps = [
  {
    icon: Building2,
    title: "Register & Verify",
    bullets: [
      "Sign up as a PG owner and complete KYC verification (Aadhaar, PAN).",
      "Ensure your PG listing is credible and secure.",
    ],
  },
  {
    icon: Key,
    title: "Create Your Listing",
    bullets: [
      "Add photos, room details, pricing, rules, and amenities.",
      "Set availability and manage pricing easily.",
    ],
  },
  {
    icon: Calendar,
    title: "Manage Bookings",
    bullets: [
      "Accept or reject tenant requests.",
      "Track upcoming visits and online bookings in real time.",
    ],
  },
  {
    icon: MessageSquare,
    title: "Communicate & Confirm",
    bullets: [
      "Use in‑app chat to answer tenant queries quickly.",
      "Confirm bookings and track rent payments hassle‑free.",
    ],
  },
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    bullets: [
      "Boost listings with featured placement.",
      "Monitor occupancy, revenue, and reviews from your dashboard.",
    ],
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">How It Works</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Switch between Tenants and PG Owners to see tailored steps
          </p>
        </div>

        <Tabs defaultValue="tenants" className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-2 w-full mb-8">
            <TabsTrigger value="tenants">For Tenants (PG Seekers)</TabsTrigger>
            <TabsTrigger value="owners">For PG Owners</TabsTrigger>
          </TabsList>

          <TabsContent value="tenants">
            <div className="grid md:grid-cols-2 gap-8">
              {tenantSteps.map((step, index) => (
                <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-background to-muted/40 border-2 border-border">
                  <div className="flex items-start gap-4">
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[hsl(14_100%_70%)] flex items-center justify-center shrink-0">
                      <step.icon className="text-primary-foreground" size={22} />
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                        {step.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="owners">
            <div className="grid md:grid-cols-2 gap-8">
              {ownerSteps.map((step, index) => (
                <div key={index} className="p-6 rounded-2xl bg-gradient-to-br from-background to-muted/40 border-2 border-border">
                  <div className="flex items-start gap-4">
                    <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-[hsl(14_100%_70%)] flex items-center justify-center shrink-0">
                      <step.icon className="text-primary-foreground" size={22} />
                      <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                      <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                        {step.bullets.map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default HowItWorks;
