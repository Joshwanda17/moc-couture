import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface NavbarProps {
  cartItemCount?: number;
}

const Navbar = ({ cartItemCount = 0 }: NavbarProps) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    // Simple mock event listener for state changes
    window.addEventListener("auth-change", checkAuth);
    return () => window.removeEventListener("auth-change", checkAuth);
  }, []);

  const checkAuth = () => {
    const mockUser = localStorage.getItem("mock_user");
    if (mockUser) {
      setIsLoggedIn(true);
      const user = JSON.parse(mockUser);
      setIsAdmin(user.role === "admin");
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("mock_user");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold font-display text-gradient">
              MoC Couture
            </h1>
          </Link>
          
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-4 overflow-x-auto pb-2 sm:pb-0">
            <Link to="/">
              <Button variant="ghost" className="font-medium">
                Home
              </Button>
            </Link>
            <Link to="/collections">
              <Button variant="ghost" className="font-medium">
                Collections
              </Button>
            </Link>
            <Link to="/gallery">
              <Button variant="ghost" className="font-medium">
                Shop
              </Button>
            </Link>
            <Link to="/lookbook">
              <Button variant="ghost" className="font-medium">
                Lookbook
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" className="font-medium">
                About
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" className="font-medium">
                Contact
              </Button>
            </Link>
            {isAdmin && (
              <Link to="/admin">
                <Button variant="ghost" className="font-medium">
                  Admin
                </Button>
              </Link>
            )}
            {!isLoggedIn ? (
              <Link to="/login">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Button variant="ghost" size="icon" onClick={handleLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            )}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-secondary-foreground text-xs flex items-center justify-center font-semibold">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
