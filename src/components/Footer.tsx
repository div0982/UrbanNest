import { Home, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Footer = () => {
  const navigate = useNavigate();
  const { currentUser, userRoles } = useAuth();

  const handleListPropertyClick = () => {
    // Check if user is signed in
    if (!currentUser) {
      // Not signed in - redirect to login
      navigate("/login");
      return;
    }

    // Check if user has owner or admin role
    if (userRoles.isOwner || userRoles.isAdmin) {
      // User is owner/admin - go to list property page
      navigate("/list-pg");
    } else {
      // User is signed in but not owner/admin - redirect to get-started
      navigate("/learn-more");
    }
  };
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-[hsl(14_100%_70%)] flex items-center justify-center shadow-lg">
                <Home className="text-primary-foreground" size={24} />
              </div>
              <span className="text-xl font-bold">UrbanNest</span>
            </div>
            <p className="text-background/70 text-sm">
              Find your perfect PG accommodation across India. Verified listings, secure bookings.
            </p>
            {/* Social Links */}
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-primary transition-colors">Find PGs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* For Owners */}
          <div>
            <h4 className="font-semibold mb-4">For PG Owners</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><button onClick={handleListPropertyClick} className="hover:text-primary transition-colors text-left">List Your Property</button></li>
              <li><a href="#" className="hover:text-primary transition-colors">Owner Dashboard</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Success Stories</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#" className="hover:text-primary transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Trust & Safety</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-background/10 text-center text-sm text-background/70">
          <p>© 2025 UrbanNest. All rights reserved. | Made with ❤️ for PG seekers across India</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
