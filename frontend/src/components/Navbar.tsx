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

  const MenuLink = ({ to, children, mobile = false }: { to: string; children: React.ReactNode, mobile?: boolean }) => (
    <Link 
      to={to} 
      onClick={() => setIsMobileMenuOpen(false)}
      className={`${mobile ? 'text-2xl py-2 block' : 'text-sm px-3 py-2 uppercase tracking-wider'} font-display text-primary hover:text-primary/70 transition-colors`}
    >
      {children}
    </Link>
  );

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-on-primary w-full py-2 px-4 text-center text-xs font-body uppercase tracking-widest z-50 relative">
        Free Custom Orders Available | New Summer Collection Released
      </div>

      <header className="sticky top-0 w-full z-40 bg-background/95 backdrop-blur-md flex justify-between items-center px-5 md:px-8 lg:px-16 h-20 border-b border-outline-variant/20 transition-all duration-300">
        
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Link to="/" className="flex items-center">
            <h1 className="font-display text-[24px] md:text-[28px] text-primary uppercase tracking-widest whitespace-nowrap">
              MoC Couture
            </h1>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden md:flex items-center justify-center space-x-2 lg:space-x-4">
          <MenuLink to="/">Home</MenuLink>
          <MenuLink to="/collections">Collections</MenuLink>
          <MenuLink to="/gallery">Shop</MenuLink>
          <MenuLink to="/lookbook">Lookbook</MenuLink>
          <MenuLink to="/about">About</MenuLink>
          <MenuLink to="/contact">Contact</MenuLink>
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-4 lg:gap-6">
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity">
              search
            </button>
            <button className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity">
              favorite
            </button>
            <Link to={isLoggedIn ? (isAdmin ? "/admin" : "/") : "/login"}>
              <button className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity">
                person
              </button>
            </Link>
          </div>

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

          {/* Mobile Menu Trigger */}
          <div className="md:hidden flex items-center">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <button className="material-symbols-outlined text-primary hover:opacity-70 transition-opacity scale-95 duration-200">
                  menu
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] flex flex-col pt-16 bg-surface border-r border-outline-variant/30">
                <div className="flex flex-col space-y-4">
                  <MenuLink to="/" mobile>Home</MenuLink>
                  <MenuLink to="/collections" mobile>Collections</MenuLink>
                  <MenuLink to="/gallery" mobile>Shop</MenuLink>
                  <MenuLink to="/lookbook" mobile>Lookbook</MenuLink>
                  <MenuLink to="/about" mobile>About</MenuLink>
                  <MenuLink to="/contact" mobile>Contact</MenuLink>
                  {isAdmin && <MenuLink to="/admin" mobile>Admin</MenuLink>}
                  
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
