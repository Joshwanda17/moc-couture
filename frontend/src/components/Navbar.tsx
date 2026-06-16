import { Link, useNavigate } from "react-router-dom";
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
    window.addEventListener("auth-change", checkAuth);
    return () => window.removeEventListener("auth-change", checkAuth);
  }, []);

  const checkAuth = () => {
    const authDataStr = localStorage.getItem("moc_auth");
    if (authDataStr) {
      try {
        const authData = JSON.parse(authDataStr);
        if (authData.token && authData.user) {
          setIsLoggedIn(true);
          setIsAdmin(authData.user.role === "admin");
          return;
        }
      } catch (e) {
        // invalid JSON
      }
    }
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("moc_auth");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
    setIsMobileMenuOpen(false);
  };

  const MenuLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
    <Link 
      to={to} 
      onClick={() => setIsMobileMenuOpen(false)}
      className="text-2xl font-display text-primary hover:text-primary/70 transition-colors block py-2"
    >
      {children}
    </Link>
  );

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md flex justify-between items-center px-5 md:px-16 h-16 border-b border-outline-variant/20">
        <div className="flex items-center gap-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <button className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity scale-95 duration-200">
                menu
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] flex flex-col pt-16 bg-surface border-r border-outline-variant/30">
              <div className="flex flex-col space-y-4">
                <MenuLink to="/">Home</MenuLink>
                <MenuLink to="/collections">Collections</MenuLink>
                <MenuLink to="/gallery">Shop</MenuLink>
                <MenuLink to="/lookbook">Lookbook</MenuLink>
                <MenuLink to="/about">About</MenuLink>
                <MenuLink to="/contact">Contact</MenuLink>
                {isAdmin && <MenuLink to="/admin">Admin</MenuLink>}
                
                <div className="pt-8 mt-8 border-t border-outline-variant/30 flex flex-col gap-4">
                  {!isLoggedIn ? (
                    <>
                      <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary hover:text-primary transition-colors font-body text-lg">
                        Sign In
                      </Link>
                      <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary hover:text-primary transition-colors font-body text-lg">
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <button onClick={handleLogout} className="text-left text-error hover:opacity-70 transition-colors font-body text-lg">
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <h1 className="font-display text-[28px] md:text-[32px] text-primary uppercase tracking-widest whitespace-nowrap">
            MoC Couture
          </h1>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative group">
            <button className="material-symbols-outlined text-primary group-hover:opacity-70 transition-opacity scale-95 duration-200">
              shopping_bag
            </button>
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-on-primary text-[10px] flex items-center justify-center font-bold">
                {cartItemCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Mobile Bottom Navigation - visible only on sm screens and below */}
      <nav className="md:hidden fixed bottom-0 w-full z-50 bg-background/95 backdrop-blur-md border-t border-outline-variant/30 flex justify-around items-center h-16 pb-safe">
        <Link to="/gallery" className="flex flex-col items-center justify-center text-secondary transition-all duration-300 hover:text-primary">
          <span className="material-symbols-outlined text-[20px]">storefront</span>
          <span className="font-body text-[10px] uppercase tracking-wider mt-1">Shop</span>
        </Link>
        <Link to="/collections" className="flex flex-col items-center justify-center text-secondary transition-all duration-300 hover:text-primary">
          <span className="material-symbols-outlined text-[20px]">auto_awesome_motion</span>
          <span className="font-body text-[10px] uppercase tracking-wider mt-1">Collections</span>
        </Link>
        <Link to="/cart" className="flex flex-col items-center justify-center text-secondary transition-all duration-300 hover:text-primary relative">
          <span className="material-symbols-outlined text-[20px]">shopping_basket</span>
          <span className="font-body text-[10px] uppercase tracking-wider mt-1">Bag</span>
          {cartItemCount > 0 && (
            <span className="absolute -top-1 right-2 h-3.5 w-3.5 rounded-full bg-primary text-on-primary text-[8px] flex items-center justify-center font-bold">
              {cartItemCount}
            </span>
          )}
        </Link>
        <Link to={isLoggedIn ? (isAdmin ? "/admin" : "/") : "/login"} className="flex flex-col items-center justify-center text-secondary transition-all duration-300 hover:text-primary">
          <span className="material-symbols-outlined text-[20px]">person</span>
          <span className="font-body text-[10px] uppercase tracking-wider mt-1">{isLoggedIn ? 'Profile' : 'Sign In'}</span>
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
