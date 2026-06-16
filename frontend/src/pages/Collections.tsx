import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { getCollections, Collection } from "@/data/mockProducts";
import { ArrowRight } from "lucide-react";

const Collections = () => {
  const { items } = useCart();
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    setCollections(getCollections());
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemCount={items.length} />
      
      <main className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 text-foreground">
            Our Collections
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
            Explore curated series of our handcrafted pieces, designed to tell a unique story of texture, warmth, and modern elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {collections.map((collection, index) => (
            <Link to={`/collection/${collection.id}`} key={collection.id} className="group block">
              <Card 
                className="overflow-hidden border-none bg-transparent shadow-none hover-lift animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[3/4] overflow-hidden bg-muted mb-6">
                  <img
                    src={collection.cover_image}
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="text-center">
                  <span className="text-xs font-bold tracking-widest text-primary uppercase mb-2 block">
                    {collection.season}
                  </span>
                  <h3 className="text-3xl font-display font-semibold mb-3 group-hover:text-primary transition-colors">
                    {collection.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2 px-4">
                    {collection.description}
                  </p>
                  <div className="inline-flex items-center text-sm font-semibold tracking-wide text-foreground group-hover:text-primary transition-colors">
                    Explore Collection <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Collections;
