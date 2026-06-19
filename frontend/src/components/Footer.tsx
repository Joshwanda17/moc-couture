import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant/30 pt-16 pb-8 px-5 md:px-16 mt-16">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        <div>
          <h2 className="font-display text-2xl text-primary uppercase tracking-widest mb-6">MoC Couture</h2>
          <p className="text-secondary font-body text-sm leading-relaxed max-w-xs">
            Handcrafted crochet and fabric fashion, designed to celebrate individuality and artisanal integrity.
          </p>
        </div>
        
        <div>
          <h4 className="font-display text-lg uppercase tracking-widest mb-6">Navigation</h4>
          <div className="flex flex-col space-y-3 font-body text-sm text-secondary">
            <Link to="/gallery" className="hover:text-primary transition-colors">Shop</Link>
            <Link to="/collections" className="hover:text-primary transition-colors">Collections</Link>
            <Link to="/lookbook" className="hover:text-primary transition-colors">Lookbook</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
        
        <div>
          <h4 className="font-display text-lg uppercase tracking-widest mb-6">Company</h4>
          <div className="flex flex-col space-y-3 font-body text-sm text-secondary">
            <Link to="/craftsmanship" className="hover:text-primary transition-colors">Craftsmanship</Link>
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
            <Link to="/returns" className="hover:text-primary transition-colors">Returns & Exchanges</Link>
            <Link to="/shipping" className="hover:text-primary transition-colors">Shipping Information</Link>
          </div>
        </div>
        
        <div>
          <h4 className="font-display text-lg uppercase tracking-widest mb-6">Contact</h4>
          <div className="flex flex-col space-y-3 font-body text-sm text-secondary">
            <a href="mailto:atelier@moccouture.com" className="hover:text-primary transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">mail</span> atelier@moccouture.com
            </a>
            <a href="tel:+256706052465" className="hover:text-primary transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">call</span> WhatsApp: +256 706 052465
            </a>
            <span className="block mt-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">location_on</span> Entebbe, Uganda
            </span>
            
            <div className="flex space-x-6 mt-6 pt-4 border-t border-outline-variant/30">
              <a href="https://instagram.com/moc_couture" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors flex flex-col items-center gap-1 group">
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">photo_camera</span>
                <span className="text-[10px] uppercase tracking-widest">IG</span>
              </a>
              <a href="https://tiktok.com/@moc_couture" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors flex flex-col items-center gap-1 group">
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">music_note</span>
                <span className="text-[10px] uppercase tracking-widest">TK</span>
              </a>
              <a href="https://pinterest.com/moccouture" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors flex flex-col items-center gap-1 group">
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">push_pin</span>
                <span className="text-[10px] uppercase tracking-widest">PT</span>
              </a>
              <a href="https://facebook.com/moccouture" target="_blank" rel="noreferrer" className="text-secondary hover:text-primary transition-colors flex flex-col items-center gap-1 group">
                <span className="material-symbols-outlined group-hover:scale-110 transition-transform">thumb_up</span>
                <span className="text-[10px] uppercase tracking-widest">FB</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="text-center border-t border-outline-variant/30 pt-8">
        <p className="font-body text-xs text-secondary uppercase tracking-widest">
          © {new Date().getFullYear()} MoC Couture. Handcrafted with intention.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
