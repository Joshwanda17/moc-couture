import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { getProducts, Product } from "@/data/mockProducts";
import { ArrowLeft, Check, ShoppingBag, Send } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { items, addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const allProducts = getProducts();
    const foundProduct = allProducts.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-subtle flex flex-col">
        <Navbar cartItemCount={items.length} />
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-8">The piece you're looking for doesn't exist or has been removed.</p>
          <Link to="/gallery">
            <Button className="bg-gradient-warm hover:opacity-90">Return to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleInquire = () => {
    window.location.href = `mailto:hello@moccouture.com?subject=Inquiry regarding ${product.name}&body=Hi MoC Couture,%0D%0A%0D%0AI would like to inquire about the piece "${product.name}".`;
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar cartItemCount={items.length} />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Link to="/gallery" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Collection
        </Link>

        <div className="bg-card/80 backdrop-blur-sm border-none shadow-elegant rounded-2xl overflow-hidden animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8 lg:gap-12">
            
            {/* Image Gallery Area */}
            <div className="bg-muted p-4 md:p-8 flex items-center justify-center">
              <div className="w-full aspect-square rounded-xl overflow-hidden shadow-soft">
                <img
                  src={product.main_image}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            {/* Product Details Area */}
            <div className="p-8 md:p-12 md:pl-0 flex flex-col justify-center">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 bg-muted rounded-full text-xs font-medium tracking-wide">
                  {product.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium tracking-wide border ${
                  product.status === 'Available' ? 'border-green-500/30 text-green-700 bg-green-500/10' :
                  product.status === 'Made to Order' ? 'border-blue-500/30 text-blue-700 bg-blue-500/10' :
                  'border-slate-500/30 text-slate-700 bg-slate-500/10'
                }`}>
                  {product.status}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                {product.name}
              </h1>

              <div className="flex items-baseline gap-3 mb-8">
                <p className="text-3xl font-bold text-primary">UGX {(product.price * 3700).toLocaleString()}</p>
                <span className="text-lg font-medium text-muted-foreground">(${product.price.toFixed(2)} USD)</span>
              </div>

              <div className="prose prose-stone mb-10">
                <h3 className="text-lg font-semibold font-display mb-2">The Story</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
                <p className="text-muted-foreground leading-relaxed mt-4">
                  Each piece from MoC Couture is carefully handcrafted with premium materials, ensuring that no two items are exactly alike. Whether you're dressing up for a special occasion or adding warmth to your home, this piece was made with love and precision.
                </p>
              </div>

              <div className="space-y-4 mb-10">
                <h3 className="text-lg font-semibold font-display mb-3">Highlights</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-muted-foreground">
                    <Check className="h-4 w-4 mr-3 text-primary" /> Premium quality craftsmanship
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <Check className="h-4 w-4 mr-3 text-primary" /> Unique, one-of-a-kind design
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <Check className="h-4 w-4 mr-3 text-primary" /> Ethically handcrafted
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                {product.status === "Available" ? (
                  <Button 
                    size="lg" 
                    className="flex-1 bg-gradient-warm hover:opacity-90 shadow-soft text-lg h-14"
                    onClick={() => addToCart({ ...product, image: product.main_image })}
                  >
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                ) : (
                  <Button 
                    size="lg" 
                    variant={product.status === "Sold" ? "secondary" : "default"}
                    className={`flex-1 text-lg h-14 ${product.status === "Made to Order" ? "bg-primary hover:bg-primary/90 text-white" : ""}`}
                    onClick={handleInquire}
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {product.status === "Sold" ? "Inquire for Similar Piece" : "Request Custom Order"}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetails;
