
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { User, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface NavLink {
  to: string;
  label: string;
}

const navLinks: NavLink[] = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];

const Navbar = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Simulating cart count update - would be replaced with actual state management
  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      try {
        const parsedCart = JSON.parse(cart);
        setCartCount(parsedCart.length || 0);
      } catch (e) {
        console.error("Error parsing cart", e);
      }
    }
  }, [location]);

  // Simulating auth check - would be replaced with actual auth
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  }, [location]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container px-4 sm:px-6 py-4 mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-bold text-primary transition-transform duration-300 hover:scale-105"
        >
          Cartopolis
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={cn(
                  "text-sm font-medium transition-all duration-300 relative group",
                  location.pathname === link.to 
                    ? "text-primary" 
                    : "text-foreground/80 hover:text-primary"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-primary transform origin-left transition-all duration-300",
                  location.pathname === link.to 
                    ? "w-full" 
                    : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
          </nav>
        )}

        <div className="flex items-center space-x-4">
          <Link to="/cart" className="relative btn-hover">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center animate-scale-in">
                {cartCount}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <Link to="/profile">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button 
                variant="outline" 
                size="sm" 
                className="rounded-full font-medium hover:bg-primary hover:text-white"
              >
                Log in
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobile && mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-border animate-slide-in-bottom">
          <nav className="container py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-md transition-colors",
                  location.pathname === link.to 
                    ? "bg-primary/10 text-primary" 
                    : "text-foreground hover:bg-primary/5"
                )}
              >
                {link.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <Link 
                to="/register" 
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-md"
              >
                Create Account
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
