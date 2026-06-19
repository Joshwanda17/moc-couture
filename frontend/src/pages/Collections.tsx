import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";

const Collections = () => {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const data = await api.getCollections();
        setCollections(data);
      } catch (err) {
        console.error("Error fetching collections:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Page Header */}
        <section className="mb-16 text-center">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4 tracking-tight">Collections</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
            Stories woven into wearable art. Explore our thematic curations inspired by nature, emotion, and craftsmanship.
          </p>
        </section>

        {loading ? (
          <div className="py-20 text-center text-secondary font-label-md tracking-widest uppercase">Loading collections...</div>
        ) : collections.length === 0 ? (
          <div className="py-20 text-center text-secondary font-body-lg">
            No collections have been curated yet. Check back soon.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {collections.map((collection) => (
              <Link to={`/collections/${collection.slug || collection.id}`} key={collection.id} className="group block">
                {/* Collection Card */}
                <div className="bg-surface-container rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface-container-high">
                    {collection.cover_image ? (
                      <img 
                        src={collection.cover_image} 
                        alt={collection.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-on-surface-variant">
                        No Image
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                  
                  <div className="p-6">
                    <h2 className="font-headline-md text-headline-md text-primary mb-2 group-hover:text-secondary transition-colors">
                      {collection.name}
                    </h2>
                    
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-2">
                      {collection.short_description || "A curation of exclusive pieces."}
                    </p>
                    
                    <div className="flex justify-between items-center border-t border-outline-variant pt-4">
                      <span className="font-label-md text-label-md text-secondary tracking-widest uppercase">
                        {collection.product_count || 0} Pieces
                      </span>
                      <span className="font-label-md text-label-md text-primary tracking-widest uppercase flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                        Explore <span className="text-xl leading-none">→</span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Collections;
