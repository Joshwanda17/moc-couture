import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

const Gallery = () => {
  const { items, addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      toast({
        variant: "destructive",
        title: "Error loading products",
        description: error.message,
      });
    } else {
      setProducts(data || []);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar cartItemCount={items.length} />
      
      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
            Our Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse our collection of handmade treasures, each piece uniquely crafted 
            with care and creativity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card 
              key={product.id}
              className="overflow-hidden hover-lift bg-card border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-display font-semibold mb-2">
                  {product.name}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">
                    UGX {(product.price * 3700).toLocaleString()}
                  </span>
                  <Button 
                    onClick={() => addToCart({ ...product, image: product.image_url })}
                    className="bg-gradient-warm hover:opacity-90"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center bg-card p-8 rounded-lg shadow-soft border border-border/50">
          <h2 className="text-3xl font-display font-bold mb-4">
            Custom Orders Welcome
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Have a special project in mind? We'd love to bring your vision to life 
            with our unique blend of crochet and fabric artistry.
          </p>
          <Button size="lg" className="bg-gradient-warm hover:opacity-90">
            Contact Us
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Gallery;
