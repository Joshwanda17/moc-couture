import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { getMedia, Media } from "@/data/mockProducts";

const Lookbook = () => {
  const { items } = useCart();
  const [media, setMedia] = useState<Media[]>([]);

  useEffect(() => {
    setMedia(getMedia());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemCount={items.length} />
      
      <main className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-foreground">
            Lookbook
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Inspiration, styling, and a glimpse into the craftsmanship behind our collections.
          </p>
        </div>

        {/* Editorial Masonry-style Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {media.map((item, index) => (
            <div 
              key={item.id} 
              className="break-inside-avoid animate-fade-in group relative"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="overflow-hidden rounded-xl bg-muted">
                <img
                  src={item.url}
                  alt={item.caption}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl flex items-end p-6">
                <p className="text-white font-medium tracking-wide">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Lookbook;
