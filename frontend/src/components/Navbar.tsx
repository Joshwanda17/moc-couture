import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface NavbarProps {
  cartItemCount?: number;
}

const Navbar = ({ cartItemCount = 0 }: NavbarProps) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
    setIsMobileMenuOpen(false);
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
    const baseClasses = "font-medium text-left w-full justify-start";
    const DesktopLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
      <Link to={to} onClick={() => mobile && setIsMobileMenuOpen(false)}>
        <Button variant="ghost" className={mobile ? baseClasses : "font-medium"}>
          {children}
        </Button>
      </Link>
    );

    return (
      <>
        <DesktopLink to="/">Home</DesktopLink>
        <DesktopLink to="/collections">Collections</DesktopLink>
        <DesktopLink to="/gallery">Shop</DesktopLink>
        <DesktopLink to="/lookbook">Lookbook</DesktopLink>
        <DesktopLink to="/about">About</DesktopLink>
        <DesktopLink to="/contact">Contact</DesktopLink>
        {isAdmin && <DesktopLink to="/admin">Admin</DesktopLink>}
      </>
    );
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
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            <NavLinks />
            <div className="flex items-center ml-4 space-x-2">
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

          {/* Mobile Navigation Controls */}
          <div className="flex md:hidden items-center space-x-2">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative mr-2">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-secondary text-secondary-foreground text-xs flex items-center justify-center font-semibold">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] flex flex-col pt-12">
                <div className="flex flex-col space-y-4">
                  <NavLinks mobile />
                  
                  <div className="pt-6 mt-6 border-t flex flex-col gap-4">
                    {!isLoggedIn ? (
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" className="w-full justify-start">
                          <User className="mr-2 h-5 w-5" /> Sign In
                        </Button>
                      </Link>
                    ) : (
                      <Button variant="outline" className="w-full justify-start text-destructive" onClick={handleLogout}>
                        <LogOut className="mr-2 h-5 w-5" /> Logout
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
