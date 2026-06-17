import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      try {
        const products = await api.getProducts();
        const found = products.find((p: any) => p.id === id);
        if (found) {
          setProduct(found);
        } else {
          // fallback to some mock if not found in db for demonstration
          setProduct({
            id: id,
            name: "The Ethereal Vest",
            price: 840,
            category: "Archive Collection",
            main_image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD_ZEBopkf7VKAFHEv2AmEPwrWNJDo1g48gdffR8-HcwuUgQdU2vhGuEVoKFHRBkU3eA31bYiAlSKKrLNdo7W3xChyEkkTovs0XvCq0zBpwdDmfkYncx-UArfhiybJ1_c0wjsCPwAliMhlGSeyDTpaA7Nrz9ly11oytQiPXmQhpBCMOEWKzKh3hnFHY92d4q0_kpvUHcUXkF7uvwJ0aQY9ut5G0wC0F5fAuRfs6JVOl12445F7-hFBXxxM9pdl1CE-i0npEezFk5Vo",
            description: "Hand-crocheted over a period of 42 hours, the Ethereal Vest is a testament to the meditative rhythm of slow craft. Each stitch is intentionally placed to create a structural lace that breathes with the body.",
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    setIsAdding(true);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.main_image
    });
    
    toast({
      title: "Added to Bag",
      description: `${product.name} has been added to your bag.`,
    });

    setTimeout(() => {
      setIsAdding(false);
    }, 2000);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
  }

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-20 md:pt-32">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          {/* Breadcrumbs */}
          <nav className="mb-8 flex items-center gap-2 text-on-surface-variant/60 font-label-md text-label-md">
            <Link to="/gallery" className="hover:text-primary transition-colors">Archive</Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-on-surface">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter lg:gap-16">
            {/* Image Gallery */}
            <div className="lg:col-span-7 space-y-gutter">
              <div className="aspect-[4/5] overflow-hidden bg-secondary-container">
                <img 
                  alt={product.name} 
                  className="w-full h-full object-cover" 
                  src={product.main_image}
                />
              </div>
              <div className="grid grid-cols-2 gap-gutter">
                <div className="aspect-square overflow-hidden bg-secondary-container">
                  <img 
                    alt="Detail 1" 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp3UvHsah66ZW2GNV39t4m_w5VkTEwYAvo2AQoeeVtjBxWPXonjmRN3HdcuEToxJQtxLFi_IzMAhwZhm3iIwvNhthjF7rA7jCKcjn59mr2rcHJ0u4LIdaiqCrVsde3MyMKoDbtDymSWjiTeVAh8hTTKbbtrZi9CIGf4Jz_a6e2bjHUXtIPAehZes-Z2IBo5TQSFKHO5qiB4TF2EYV_Gm702xXOvrcbmlTuXR_At4Qg8OJYMUhovfI0xaxVBDmQbK-grmZmEmSdRcU"
                  />
                </div>
                <div className="aspect-square overflow-hidden bg-secondary-container">
                  <img 
                    alt="Detail 2" 
                    className="w-full h-full object-cover" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuARL6IzSl9vfLLZ8I4vI5EBRxW69ka42e7NBBU6k5OKTlH_oRzIQ_b1l-bC-EW0r1CKAHPHczJVO9k54cDsnuMbcWY5LpFvy11OP6qpf3mHwec1eql-hhsrzwC7RuEJ0h9E6B5ZlUpfmJvITiTUAnvtta44PdMlIO2_jlCh0kWWO9oYJT0FDDujAyCyuueMM1uPuaLTfjFKZ3SrFgks2XSCxM5dppn6N5HcEgLGm17VY36HgspJk_BEQ9lHZguWUQv6JZMRxHVhD9M"
                  />
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="lg:col-span-5 lg:sticky lg:top-32 self-start space-y-10">
              <section>
                <span className="font-label-md text-label-md text-primary tracking-widest uppercase mb-4 block">
                  {product.category || "Archive Collection"}
                </span>
                <h2 className="font-headline-lg text-headline-lg md:text-headline-lg text-on-surface mb-2">
                  {product.name}
                </h2>
                <p className="font-headline-md text-headline-md text-primary">
                  ${product.price.toFixed(2)}
                </p>
              </section>

              <div className="border-t border-outline-variant/30 pt-8">
                <h3 className="font-label-md text-label-md text-on-surface-variant uppercase mb-4">Philosophy</h3>
                <p className="font-body-lg text-body-lg text-secondary leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface-variant uppercase mb-3">Composition</h3>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md">70% Organic Cotton</span>
                    <span className="px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-md text-label-md">30% Raw Mulberry Silk</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-label-md text-label-md text-on-surface-variant uppercase mb-3">Size</h3>
                  <div className="flex gap-4">
                    <button className="w-12 h-12 flex items-center justify-center border border-outline text-on-surface hover:bg-primary hover:text-white transition-all">I</button>
                    <button className="w-12 h-12 flex items-center justify-center border border-outline text-on-surface hover:bg-primary hover:text-white transition-all">II</button>
                    <button className="w-12 h-12 flex items-center justify-center border border-outline text-on-surface hover:bg-primary hover:text-white transition-all">III</button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-4">
                <button 
                  onClick={handleAddToCart}
                  disabled={isAdding}
                  className={`w-full py-5 font-label-md text-label-md uppercase tracking-widest transition-all active:scale-[0.98] duration-200 ${
                    isAdding 
                      ? 'bg-secondary text-white cursor-not-allowed' 
                      : 'bg-primary text-white hover:opacity-90'
                  }`}
                >
                  {isAdding ? 'Added to Bag' : 'Add to Bag'}
                </button>
                <button className="w-full border border-primary text-primary py-5 font-label-md text-label-md uppercase tracking-widest hover:bg-primary/5 transition-all active:scale-[0.98] duration-200">
                  Inquire for Bespoke
                </button>
              </div>

              <div className="space-y-4 pt-6 text-on-surface-variant">
                <details className="group border-b border-outline-variant/30 pb-4">
                  <summary className="flex justify-between items-center cursor-pointer list-none font-label-md text-label-md uppercase">
                    Shipping & Returns
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                  </summary>
                  <p className="mt-4 text-body-md leading-relaxed">Each piece is made to order to minimize waste. Please allow 3-4 weeks for artisanal production and dispatch.</p>
                </details>
                <details className="group border-b border-outline-variant/30 pb-4">
                  <summary className="flex justify-between items-center cursor-pointer list-none font-label-md text-label-md uppercase">
                    Care Guide
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                  </summary>
                  <p className="mt-4 text-body-md leading-relaxed">Hand wash in cool water with pH-neutral detergent. Dry flat in shade. Do not hang.</p>
                </details>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <section className="mt-32 border-t border-outline-variant/30 pt-16">
            <div className="flex justify-between items-end mb-12">
              <h2 className="font-headline-lg text-headline-lg">Complementary Pieces</h2>
              <Link to="/gallery" className="font-label-md text-label-md text-primary underline">
                View Archive
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
              <Link to="/product/1" className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden mb-6 bg-surface-container">
                  <img 
                    alt="The Solstice Shawl" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6lDxeJclPiP9jiV9yqeoXhgDzogD_tllRnC1Ji8cyd6fAHHS5yzqgCmke0cOLaBi79PUNfrmg05lT49-G_mKGLk3EN46-uUp6krQBIzeXor-wiG2jp66b32W5LUvH4O9Xp97nIBb0EuYPX4wlECJj6HRmedcSEzW9JsO2wsgk_ZgNblYZkkS3Z-YTrrUBWXcTG5IzkFTbxyCU581IPgSOeccAHterE4ZkJj17_ITj3YwHDp8e3pfH5rPieCjRjTLFXRdio51r_6g"
                  />
                </div>
                <h3 className="font-headline-md text-headline-md mb-1">The Solstice Shawl</h3>
                <p className="font-body-md text-secondary">$320.00</p>
              </Link>
              
              <Link to="/product/2" className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden mb-6 bg-surface-container">
                  <img 
                    alt="Atelier Tote" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3a92JJCDuWw-mjFVK3l18SIwSnvlyTdzvxfwhz4-Vnv3cjX6eelGO543D6HWWed-06A6ydDC2hR4BTTHtAyWfCLwRSiY7aGyL83F1UywwdGLdAP99gwzFmJl11JCDRnl2sphga8Y0MyqZx29q7gEfC4W6eUE8P-r1Rrg3ZrgTUdPG7wl7nGaRi6ElsLPXd6DUIVWwbTjM_j5DTnYyZ1qz8L4n4I7pwfqCv96PFJ4B54fRsuCrkCb6SlGDLeRcWi-_6cqo864R4Xc"
                  />
                </div>
                <h3 className="font-headline-md text-headline-md mb-1">Atelier Tote</h3>
                <p className="font-body-md text-secondary">$190.00</p>
              </Link>
              
              <Link to="/product/3" className="group cursor-pointer">
                <div className="aspect-[3/4] overflow-hidden mb-6 bg-surface-container">
                  <img 
                    alt="Silk Gossamer Gloves" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlL-XqL3jkJeps8iLhkXS95GYan5F3yTK0wLt0Kmx7o2AEqsCUUphkOQtwleN_tn-Qo_g0iKSSJBlO6zBYVexJ-ZVFgePhLKR_zZb6sXdSRCPMV08ED7LaAU1jSYW4JnQUiCexfvMex1vdh2177ymdVLMpbtgW95psyfsk8WTdAVi-b_97WE5UVTWtMhZxi-PBzqHaWJ7c2_0qcD_gHjaXT7oNS-SH7rJeUvTsCN4SFKjvQnHHDm08gHAnjQC9qdDS0Na_nFQs1J8"
                  />
                </div>
                <h3 className="font-headline-md text-headline-md mb-1">Silk Gossamer Gloves</h3>
                <p className="font-body-md text-secondary">$145.00</p>
              </Link>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low mt-20 flex flex-col items-center gap-8 px-margin-mobile py-16 text-center mb-16 md:mb-0">
        <h2 className="font-headline-md text-headline-md text-primary uppercase tracking-widest">MoC Couture</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <Link className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all" to="/contact">Contact</Link>
          <a className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all" href="#">Instagram</a>
          <a className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all" href="#">Shipping</a>
          <a className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all" href="#">Care Guide</a>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-4">
          © 2024 MoC Couture. Handcrafted with intention.
        </p>
      </footer>
    </div>
  );
};

export default ProductDetails;
