import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { getProducts, Product } from "@/data/mockProducts";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { items, addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const products = getProducts();
    setAllProducts(products);
    const foundProduct = products.find((p) => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="bg-background text-on-surface min-h-screen">
        <Navbar cartItemCount={items.length} />
        <div className="flex-1 flex flex-col items-center justify-center p-4 text-center min-h-[70vh]">
          <h2 className="font-display-lg-mobile text-primary mb-4">Archive Item Not Found</h2>
          <p className="font-body-lg text-secondary mb-8">This piece may have been acquired or returned to the atelier.</p>
          <Link to="/gallery">
            <button className="border border-primary text-primary px-8 py-3 font-label-md text-label-md rounded-DEFAULT hover:bg-primary hover:text-on-primary transition-all uppercase tracking-widest">
              Return to Archive
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const handleInquire = () => {
    window.location.href = `mailto:hello@moccouture.com?subject=Inquiry regarding ${product.name}&body=Hi MoC Couture,%0D%0A%0D%0AI would like to inquire about the piece "${product.name}".`;
  };

  const handleAdd = () => {
    addToCart({ ...product, image: product.main_image });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Navbar cartItemCount={items.length} />
      
      <main className="pt-24 pb-20 md:pt-32">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Breadcrumbs */}
          <nav className="mb-8 flex items-center gap-2 text-on-surface-variant/60 font-label-md text-label-md uppercase">
            <Link to="/gallery" className="hover:text-primary transition-colors">Archive</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-16">
            {/* Image Gallery (Editorial Grid) */}
            <div className="lg:col-span-7 space-y-gutter">
              <div className="aspect-[4/5] overflow-hidden bg-secondary-container">
                <img 
                  src={product.main_image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-gutter">
                <div className="aspect-square overflow-hidden bg-secondary-container">
                  <img 
                    src={product.main_image}
                    alt={`${product.name} detail`}
                    className="w-full h-full object-cover grayscale opacity-80 mix-blend-multiply" 
                  />
                </div>
                <div className="aspect-square overflow-hidden bg-secondary-container">
                  <img 
                    src={product.main_image}
                    alt={`${product.name} alternate view`}
                    className="w-full h-full object-cover contrast-125"
                  />
                </div>
              </div>
              
              <div className="aspect-[16/9] overflow-hidden bg-secondary-container">
                <img 
                  src={product.main_image}
                  alt={`${product.name} lifestyle`}
                  className="w-full h-full object-cover brightness-110"
                />
              </div>
            </div>

            {/* Product Information */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 self-start space-y-10 mt-12 lg:mt-0">
              <section>
                <span className="font-label-md text-label-md text-primary tracking-widest uppercase mb-4 block">
                  {product.category}
                </span>
                <h2 className="font-headline-lg text-headline-lg md:text-headline-lg text-on-surface mb-2">
                  {product.name}
                </h2>
                <div className="flex items-baseline gap-3">
                  <p className="font-headline-md text-headline-md text-primary">UGX {(product.price * 3700).toLocaleString()}</p>
                  <span className="font-body-md text-secondary">(${product.price.toFixed(2)})</span>
                </div>
              </section>

              <div className="border-t border-outline-variant/30 pt-8">
                <h3 className="font-label-md text-label-md text-on-surface-variant uppercase mb-4">Philosophy</h3>
                <p className="font-body-lg text-body-lg text-secondary leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface-variant uppercase mb-3">Status</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md">
                      {product.status}
                    </span>
                  </div>
                </div>
                
                {product.category === 'Clothing' && (
                  <div>
                    <h3 className="font-label-md text-label-md text-on-surface-variant uppercase mb-3">Size</h3>
                    <div className="flex gap-4">
                      <button className="w-12 h-12 flex items-center justify-center border border-outline text-on-surface hover:bg-primary hover:text-white transition-all">S</button>
                      <button className="w-12 h-12 flex items-center justify-center border border-outline text-on-surface hover:bg-primary hover:text-white transition-all">M</button>
                      <button className="w-12 h-12 flex items-center justify-center border border-outline text-on-surface hover:bg-primary hover:text-white transition-all">L</button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 pt-4">
                {product.status === "Available" ? (
                  <button 
                    onClick={handleAdd}
                    className={`w-full py-5 font-label-md text-label-md uppercase tracking-widest transition-all duration-200 ${added ? 'bg-secondary text-white' : 'bg-primary text-white hover:opacity-90 active:scale-[0.98]'}`}
                  >
                    {added ? 'Added to Bag' : 'Add to Bag'}
                  </button>
                ) : (
                  <button 
                    onClick={handleInquire}
                    className="w-full border border-primary text-primary py-5 font-label-md text-label-md uppercase tracking-widest hover:bg-primary/5 transition-all active:scale-[0.98] duration-200"
                  >
                    {product.status === "Sold" ? "Inquire for Similar Piece" : "Request Custom Order"}
                  </button>
                )}
              </div>

              <div className="space-y-4 pt-6 text-on-surface-variant">
                <details className="group border-b border-outline-variant/30 pb-4">
                  <summary className="flex justify-between items-center cursor-pointer list-none font-label-md text-label-md uppercase">
                    Shipping & Returns
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                  </summary>
                  <p className="mt-4 font-body-md text-body-md leading-relaxed text-secondary">
                    Each piece is made to order to minimize waste. Please allow 3-4 weeks for artisanal production and dispatch.
                  </p>
                </details>
                
                <details className="group border-b border-outline-variant/30 pb-4">
                  <summary className="flex justify-between items-center cursor-pointer list-none font-label-md text-label-md uppercase">
                    Care Guide
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                  </summary>
                  <p className="mt-4 font-body-md text-body-md leading-relaxed text-secondary">
                    Hand wash in cool water with pH-neutral detergent. Dry flat in shade. Do not hang.
                  </p>
                </details>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className="mt-32 border-t border-outline-variant/30 pt-16">
              <div className="flex justify-between items-end mb-12">
                <h2 className="font-headline-lg text-headline-lg">Complementary Pieces</h2>
                <Link to="/gallery" className="font-label-md text-label-md text-primary underline">
                  View Archive
                </Link>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
                {relatedProducts.map(rp => (
                  <Link key={rp.id} to={`/product/${rp.id}`} className="group cursor-pointer">
                    <div className="aspect-[3/4] overflow-hidden mb-6 bg-surface-container">
                      <img 
                        src={rp.main_image} 
                        alt={rp.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                    </div>
                    <h3 className="font-headline-md text-headline-md mb-1">{rp.name}</h3>
                    <p className="font-body-md text-secondary">UGX {(rp.price * 3700).toLocaleString()}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
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
        <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-4">
          © 2024 MoC Couture. Handcrafted with intention.
        </p>
      </footer>
    </div>
  );
};

export default ProductDetails;
