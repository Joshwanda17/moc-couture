import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { getCollections, getProducts, Collection, Product } from "@/data/mockProducts";
import { ArrowLeft } from "lucide-react";

const CollectionDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { items } = useCart();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const collections = getCollections();
    const allProducts = getProducts();
    
    const foundCollection = collections.find(c => c.id === id);
    if (foundCollection) {
      setCollection(foundCollection);
      setProducts(allProducts.filter(p => p.collection_id === id));
    }
  }, [id]);

  if (!collection) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar cartItemCount={items.length} />
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Collection Not Found</h2>
          <Link to="/collections" className="text-primary hover:underline">
            Return to Collections
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemCount={items.length} />
      
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <div className="absolute inset-0">
          <img 
            src={collection.cover_image} 
            alt={collection.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
          <span className="text-sm font-bold tracking-[0.2em] uppercase mb-4 opacity-90">
            {collection.season}
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-center">
            {collection.title}
          </h1>
          <p className="text-lg md:text-xl font-light max-w-2xl text-center opacity-90">
            {collection.description}
          </p>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 max-w-7xl">
        <Link to="/collections" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-12 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Collections
        </Link>

        {products.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            No products currently available in this collection.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <Card 
                key={product.id}
                className="overflow-hidden hover-lift bg-card border-none shadow-soft animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.main_image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </Link>
                </div>
                <div className="p-6 text-center">
                  <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2 block">
                    {product.category}
                  </span>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-xl font-display font-semibold mb-2 hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-lg font-medium text-foreground">
                    UGX {(product.price * 3700).toLocaleString()}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default CollectionDetails;
