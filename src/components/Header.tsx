import { Home, Menu, User, Building, LogOut, Shield, Settings, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const navigate = useNavigate();
  const { currentUser, userData, logout, isAdmin, isOwner, hasElevatedPrivileges, highestRole } = useAuth();

  // Debug logging
  console.log('Header - Role Debug:', { 
    isAdmin, 
    isOwner, 
    hasElevatedPrivileges, 
    highestRole,
    currentUser: !!currentUser 
  });

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
          <button 
            onClick={() => navigate("/search")} 
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Find PGs
          </button>
          <button 
            onClick={() => navigate("/map")} 
            className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1"
          >
            <MapPin className="w-4 h-4" />
            Map View
          </button>
          <button 
            onClick={() => navigate("/#how-it-works")} 
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            How it Works
          </button>
          {/* Only show "List Your PG" for owners and admins */}
          {(isOwner || isAdmin) && (
            <button 
              onClick={() => navigate("/list-pg")} 
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              List Your PG
            </button>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Role-based navigation */}
          {/* Show "For Owners" for owners and admins */}
          {(isOwner || isAdmin) && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden md:flex gap-2 rounded-xl"
              onClick={() => navigate("/owner-dashboard")}
            >
              <Building size={18} />
              For Owners
              {isOwner && <Badge variant="secondary" className="ml-1 text-xs">Owner</Badge>}
            </Button>
          )}
          
          {/* Show "Admin" only for admins */}
          {isAdmin && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="hidden md:flex gap-2 rounded-xl"
              onClick={() => navigate("/admin-dashboard")}
            >
              <Shield size={18} />
              Admin
              <Badge variant="destructive" className="ml-1 text-xs">Admin</Badge>
            </Button>
          )}
          
          {currentUser ? (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 rounded-xl"
                onClick={() => navigate("/profile")}
              >
                <User size={18} />
                <span className="hidden sm:inline">{userData?.name || "Profile"}</span>
                <Badge 
                  variant={highestRole === 'admin' ? 'destructive' : highestRole === 'owner' ? 'secondary' : 'outline'}
                  className="ml-1 text-xs"
                >
                  {highestRole}
                </Badge>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="gap-2 rounded-xl"
                onClick={logout}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 rounded-xl"
                onClick={() => navigate("/login")}
              >
                <User size={18} />
                <span className="hidden sm:inline">Sign In</span>
              </Button>
              <Button 
                size="sm" 
                className="hidden sm:flex rounded-xl"
                onClick={() => navigate("/register")}
              >
                Get Started
              </Button>
            </>
          )}
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
                  onClick={() => navigate("/search")}
                  className="text-left text-sm font-medium py-2 px-3 rounded-md hover:bg-muted"
                >
                  Find PGs
                </button>
                <button 
                  onClick={() => navigate("/map")}
                  className="text-left text-sm font-medium py-2 px-3 rounded-md hover:bg-muted flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4" />
                  Map View
                </button>
                <button 
                  onClick={() => navigate("/#how-it-works")}
                  className="text-left text-sm font-medium py-2 px-3 rounded-md hover:bg-muted"
                >
                  How it Works
                </button>
                {/* Only show "List Your PG" for owners and admins */}
                {(isOwner || isAdmin) && (
                  <button 
                    onClick={() => navigate("/list-pg")}
                    className="text-left text-sm font-medium py-2 px-3 rounded-md hover:bg-muted"
                  >
                    List Your PG
                  </button>
                )}
              </nav>
              <div className="mt-6 grid gap-3">
                {/* Role-based mobile navigation */}
                {/* Show "For Owners" for owners and admins */}
                {(isOwner || isAdmin) && (
                  <Button 
                    variant="ghost" 
                    className="justify-start gap-2 rounded-xl"
                    onClick={() => navigate("/owner-dashboard")}
                  >
                    <Building size={18} /> For Owners
                    {isOwner && <Badge variant="secondary" className="ml-auto text-xs">Owner</Badge>}
                  </Button>
                )}
                
                {/* Show "Admin Dashboard" only for admins */}
                {isAdmin && (
                  <Button 
                    variant="ghost" 
                    className="justify-start gap-2 rounded-xl"
                    onClick={() => navigate("/admin-dashboard")}
                  >
                    <Shield size={18} /> Admin Dashboard
                    <Badge variant="destructive" className="ml-auto text-xs">Admin</Badge>
                  </Button>
                )}
                {currentUser ? (
                  <>
                    <Button 
                      variant="outline" 
                      className="justify-start gap-2 rounded-xl"
                      onClick={() => navigate("/profile")}
                    >
                      <User size={18} /> {userData?.name || "Profile"}
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start gap-2 rounded-xl"
                      onClick={logout}
                    >
                      <LogOut size={18} /> Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="outline" 
                      className="justify-start gap-2 rounded-xl"
                      onClick={() => navigate("/login")}
                    >
                      <User size={18} /> Sign In
                    </Button>
                    <Button 
                      className="justify-start rounded-xl"
                      onClick={() => navigate("/register")}
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
