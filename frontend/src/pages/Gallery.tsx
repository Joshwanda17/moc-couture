import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { getProducts, Product } from "@/data/mockProducts";

const Gallery = () => {
  const { items } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const categories = ["All", "Clothing", "Bags", "Accessories", "Home Décor"];
  const filteredProducts = activeCategory === "All" ? products : products.filter(p => p.category === activeCategory);

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Navbar cartItemCount={items.length} />
      
      <main className="pt-24 pb-20 md:pt-32">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 mt-8 gap-8">
            <div>
              <span className="font-label-md text-label-md text-primary tracking-widest uppercase mb-4 block">The Shop</span>
              <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg">
                Archive
              </h1>
            </div>
            <p className="font-body-lg text-body-lg text-secondary max-w-md leading-relaxed">
              Explore our collection of handcrafted pieces, where every stitch is intentional and every silhouette tells a story.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 mb-16 border-b border-outline-variant/30 pb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-label-md text-label-md uppercase tracking-widest pb-4 border-b-2 transition-all ${
                  activeCategory === category 
                    ? "border-primary text-primary" 
                    : "border-transparent text-secondary hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-gutter gap-y-16">
            {filteredProducts.map((product) => (
              <Link to={`/product/${product.id}`} key={product.id} className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden mb-6 bg-secondary-container soft-shadow relative">
                  <img
                    src={product.main_image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {product.status !== 'Available' && (
                    <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-4 py-2 text-xs uppercase tracking-widest font-bold">
                      {product.status}
                    </div>
                  )}
                </div>
                <h3 className="font-headline-lg text-headline-lg mb-2 group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  <p className="font-body-md text-secondary">UGX {(product.price * 3700).toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-24">
              <h3 className="font-headline-lg text-headline-lg mb-4 text-secondary">No pieces found</h3>
              <p className="font-body-lg text-body-lg text-on-surface-variant">
                The atelier is currently crafting new pieces for this category.
              </p>
            </div>
          )}

          <div className="mt-32 text-center p-12 md:p-24 bg-surface-container-low rounded-lg soft-shadow border border-outline-variant/20">
            <span className="font-label-md text-label-md text-primary uppercase tracking-widest block mb-6">Bespoke</span>
            <h2 className="font-headline-lg text-headline-lg mb-6">
              Custom Commissions
            </h2>
            <p className="font-body-lg text-body-lg text-secondary mb-10 max-w-2xl mx-auto leading-relaxed">
              We collaborate closely with clients to create one-of-a-kind pieces tailored to your exact measurements and aesthetic vision.
            </p>
            <Link to="/contact">
              <button className="bg-primary text-on-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-all">
                Inquire Now
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

export default Gallery;
