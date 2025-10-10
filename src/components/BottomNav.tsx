import { Home, Search, Heart, User, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  useEffect(() => {
    const favs = localStorage.getItem("favorites");
    if (favs) setFavorites(new Set(JSON.parse(favs)));
  }, []);

  const navItems = [
    {
      icon: Home,
      label: "Home",
      path: "/",
      active: location.pathname === "/"
    },
    {
      icon: Search,
      label: "Search",
      path: "/search",
      active: location.pathname === "/search"
    },
    {
      icon: Plus,
      label: "List PG",
      path: "/list-pg",
      active: location.pathname === "/list-pg",
      variant: "default" as const
    },
    {
      icon: Heart,
      label: "Favorites",
      path: "/favorites",
      active: location.pathname === "/favorites",
      badge: favorites.size > 0 ? favorites.size : undefined
    },
    {
      icon: User,
      label: "Profile",
      path: "/profile",
      active: location.pathname === "/profile"
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant={item.active ? "default" : "ghost"}
            size="sm"
            className="flex flex-col items-center gap-1 h-auto py-2 px-3 relative"
            onClick={() => navigate(item.path)}
          >
            <div className="relative">
              <item.icon size={20} />
              {item.badge && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-xs">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;
