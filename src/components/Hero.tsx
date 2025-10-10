import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroBg from "@/assets/hero-bg.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const submitSearch = () => {
    const q = query.trim();
    if (!q) return;
    navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroBg} 
          alt="Modern PG accommodation" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-background mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          Find Your Perfect PG
          <span className="block mt-2 text-3xl md:text-5xl bg-gradient-to-r from-primary via-[hsl(14_100%_70%)] to-[hsl(30_100%_65%)] bg-clip-text text-transparent">
            Across India
          </span>
        </h1>
        <p className="text-lg md:text-xl text-background/90 mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
          Comfortable, affordable, and verified PG accommodations for students and professionals
        </p>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto bg-background rounded-2xl shadow-2xl p-4 md:p-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input 
                placeholder="Enter city or location..." 
                className="pl-10 h-12 border-2 focus:border-primary"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitSearch();
                }}
              />
            </div>
            <Button variant="hero" size="lg" className="md:w-auto h-12 px-8" onClick={submitSearch}>
              <Search className="mr-2" size={20} />
              Search PGs
            </Button>
          </div>
          
          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            <span className="text-sm text-muted-foreground">Popular:</span>
            <Button variant="outline" size="sm" onClick={() => navigate(`/search?q=${encodeURIComponent("Mumbai")}`)}>Mumbai</Button>
            <Button variant="outline" size="sm" onClick={() => navigate(`/search?q=${encodeURIComponent("Bangalore")}`)}>Bangalore</Button>
            <Button variant="outline" size="sm" onClick={() => navigate(`/search?q=${encodeURIComponent("Pune")}`)}>Pune</Button>
            <Button variant="outline" size="sm" onClick={() => navigate(`/search?q=${encodeURIComponent("Delhi")}`)}>Delhi</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
