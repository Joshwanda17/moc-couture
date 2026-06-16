import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { getMedia, Media } from "@/data/mockProducts";
import { Link } from "react-router-dom";

const Lookbook = () => {
  const { items } = useCart();
  const [media, setMedia] = useState<Media[]>([]);

  useEffect(() => {
    setMedia(getMedia());
  }, []);

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Navbar cartItemCount={items.length} />
      
      <main className="pt-24 pb-20 md:pt-32">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16 md:mb-24 mt-8">
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase mb-4 block">Editorial</span>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-6">
              The Lookbook
            </h1>
            <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto leading-relaxed">
              Inspiration, styling, and a glimpse into the craftsmanship behind our collections.
            </p>
          </div>

          {/* Editorial Masonry-style Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {media.map((item) => (
              <div 
                key={item.id} 
                className="break-inside-avoid group relative soft-shadow bg-secondary-container"
              >
                <div className="overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 mix-blend-multiply opacity-90"
                    loading="lazy"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                  <p className="font-body-md text-body-md text-white tracking-wide">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-32 border-t border-outline-variant/30 pt-16 flex flex-col md:flex-row justify-between items-center gap-8">
            <div>
              <h2 className="font-headline-lg text-headline-lg mb-4">Discover the Archive</h2>
              <p className="font-body-md text-body-md text-secondary max-w-md">Browse all available pieces and past collections.</p>
            </div>
            <Link to="/gallery">
              <button className="bg-primary text-on-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-all">
                Shop Archive
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-low mt-20 flex flex-col items-center gap-8 px-margin-mobile py-16 text-center mb-16 md:mb-0">
        <h2 className="font-headline-md text-headline-md text-primary uppercase tracking-widest">MoC Couture</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <Link to="#" className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all">Instagram</Link>
          <Link to="#" className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all">Pinterest</Link>
          <Link to="#" className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all">Shipping</Link>
          <Link to="#" className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all">Care Guide</Link>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm mt-4">© 2024 MoC Couture. Handcrafted with intention.</p>
      </footer>
    </div>
  );
};

export default Lookbook;
