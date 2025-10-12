import { Home, Menu, User, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
          aria-label="Go to home"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[hsl(14_100%_70%)] flex items-center justify-center shadow-lg">
            <Home className="text-primary-foreground" size={24} />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-[hsl(14_100%_70%)] bg-clip-text text-transparent">
            UrbanNest
          </span>
        </button>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            Find PGs
          </a>
          <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
            How it Works
          </a>
          <button 
            onClick={() => navigate("/list-pg")} 
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            List Your PG
          </button>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden md:flex gap-2 rounded-xl"
            onClick={() => navigate("/owner-dashboard")}
          >
            <Building size={18} />
            For Owners
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden md:flex gap-2 rounded-xl"
            onClick={() => navigate("/admin-dashboard")}
          >
            <User size={18} />
            Admin
          </Button>
          <Button variant="outline" size="sm" className="gap-2 rounded-xl">
            <User size={18} />
            <span className="hidden sm:inline">Sign In</span>
          </Button>
          <Button size="sm" className="hidden sm:flex rounded-xl">
            Get Started
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 rounded-l-2xl">
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 grid gap-3">
                <button 
                  onClick={() => navigate("/")}
                  className="text-left text-sm font-medium py-2 px-3 rounded-md hover:bg-muted"
                >
                  Home
                </button>
                <button 
                  onClick={() => navigate("/#how-it-works")}
                  className="text-left text-sm font-medium py-2 px-3 rounded-md hover:bg-muted"
                >
                  How it Works
                </button>
                <button 
                  onClick={() => navigate("/list-pg")}
                  className="text-left text-sm font-medium py-2 px-3 rounded-md hover:bg-muted"
                >
                  List Your PG
                </button>
              </nav>
              <div className="mt-6 grid gap-3">
                <Button 
                  variant="ghost" 
                  className="justify-start gap-2 rounded-xl"
                  onClick={() => navigate("/owner-dashboard")}
                >
                  <Building size={18} /> For Owners
                </Button>
                <Button 
                  variant="ghost" 
                  className="justify-start gap-2 rounded-xl"
                  onClick={() => navigate("/admin-dashboard")}
                >
                  <User size={18} /> Admin Dashboard
                </Button>
                <Button variant="outline" className="justify-start gap-2 rounded-xl">
                  <User size={18} /> Sign In
                </Button>
                <Button className="justify-start rounded-xl">Get Started</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
