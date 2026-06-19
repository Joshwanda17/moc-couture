import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";

const ProductDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await api.getProductBySlug(slug!);
        setProduct(data);
        setActiveImage(data.main_image);
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="font-label-md text-label-md text-secondary uppercase tracking-widest animate-pulse">Loading Product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center">
        <Navbar />
        <div className="font-body-lg text-body-lg text-secondary">Product not found.</div>
        <Link to="/gallery" className="mt-4 text-primary font-label-md uppercase tracking-widest hover:underline">Return to Shop</Link>
      </div>
    );
  }

  // Combine main image with gallery images if any
  const allImages = [product.main_image, ...(product.images?.map((img: any) => img.image_url) || [])].filter(Boolean);
  const uniqueImages = Array.from(new Set(allImages));

  // Format dimensions and materials to handle newlines
  const formatText = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>);
  };

  const whatsappMessage = encodeURIComponent(`Hi, I'm interested in the ${product.name} from MoC Couture.`);
  const whatsappUrl = `https://wa.me/1234567890?text=${whatsappMessage}`; // Replace with actual number

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Navbar />

      <main className="pt-24 pb-16 px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24">
          
          {/* Gallery Section */}
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <div className="relative aspect-[3/4] bg-surface-container-high overflow-hidden">
              <img 
                src={activeImage} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {uniqueImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {uniqueImages.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(img as string)}
                    className={`relative aspect-[3/4] overflow-hidden transition-all duration-300 ${activeImage === img ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'}`}
                  >
                    <img src={img as string} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info Section */}
          <div className="w-full md:w-1/2 flex flex-col pt-8 md:pt-0">
            <div className="mb-8 border-b border-outline-variant/30 pb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="font-display-md text-display-md text-primary mb-2">{product.name}</h1>
                  <p className="font-label-md text-label-md text-secondary uppercase tracking-widest">{product.category_name || 'Uncategorized'}</p>
                </div>
                <div className="text-right">
                  <span className="font-headline-md text-headline-md text-on-surface">${Number(product.price).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 mt-6">
                <span className={`px-4 py-2 font-label-md text-label-md uppercase tracking-widest ${
                  product.availability === 'Made To Order' ? 'bg-primary text-on-primary' : 
                  product.availability === 'Sold Out' ? 'bg-surface-variant text-on-surface-variant' : 
                  'bg-surface-container-high text-on-surface'
                }`}>
                  {product.availability || 'Available'}
                </span>
                {product.collection_id && (
                  <span className="font-body-md text-body-md text-tertiary flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">auto_awesome</span>
                    Part of a Collection
                  </span>
                )}
              </div>
            </div>

            {/* Editorial Story */}
            <div className="mb-10">
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed italic border-l-2 border-primary/20 pl-6 py-2">
                {product.story || product.description || "A beautifully handcrafted piece by MoC Couture."}
              </p>
            </div>

            {/* Practical Details */}
            <div className="space-y-8 mb-12">
              {product.materials && (
                <div>
                  <h3 className="font-label-md text-label-md text-primary uppercase tracking-widest mb-3">Materials</h3>
                  <div className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {formatText(product.materials)}
                  </div>
                </div>
              )}
              {product.dimensions && (
                <div>
                  <h3 className="font-label-md text-label-md text-primary uppercase tracking-widest mb-3">Dimensions & Fit</h3>
                  <div className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {formatText(product.dimensions)}
                  </div>
                </div>
              )}
            </div>

            {/* Inquiry Actions */}
            <div className="mt-auto bg-surface-container-low p-8 border border-outline-variant/30 flex flex-col gap-6">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Interested in this piece?</h3>
                <p className="font-body-md text-body-md text-secondary">
                  Due to the handcrafted nature of our work, purchases and custom sizing requests are handled personally.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={whatsappUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-1 bg-primary text-on-primary px-6 py-4 font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-3 text-center"
                >
                  <span className="material-symbols-outlined">chat</span>
                  Inquire via WhatsApp
                </a>
                <a 
                  href={`mailto:inquiries@moccouture.com?subject=Inquiry about ${product.name}`}
                  className="flex-1 bg-transparent border border-outline-variant text-on-surface px-6 py-4 font-label-md text-label-md uppercase tracking-widest hover:bg-surface-variant transition-all flex items-center justify-center gap-3 text-center"
                >
                  <span className="material-symbols-outlined">mail</span>
                  Email Us
                </a>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
