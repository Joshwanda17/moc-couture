import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

const LookbookDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { items } = useCart();

  const { data: lookbook, isLoading, error } = useQuery({
    queryKey: ['lookbook', slug],
    queryFn: () => api.getLookbookBySlug(slug as string),
    enabled: !!slug
  });

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Navbar cartItemCount={items.length} />
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !lookbook) {
    return (
      <div className="bg-background min-h-screen flex flex-col items-center justify-center">
        <Navbar cartItemCount={items.length} />
        <div className="font-body-lg text-body-lg text-secondary">Editorial not found.</div>
        <Link to="/lookbook" className="mt-4 text-primary font-label-md uppercase tracking-widest hover:underline">Return to Lookbooks</Link>
      </div>
    );
  }

  // Format date safely
  const formattedDate = lookbook.published_at 
    ? new Date(lookbook.published_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="bg-background text-on-surface min-h-screen overflow-x-hidden">
      <Navbar cartItemCount={items.length} />
      
      {/* Full-width Hero Cover Image */}
      <section className="w-full h-[70vh] md:h-[90vh] relative">
        <img 
          src={lookbook.cover_image || '/placeholder.svg'} 
          alt={lookbook.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 px-4">
          <span className="text-white/80 font-label-md uppercase tracking-[0.2em] mb-4">{formattedDate}</span>
          <h1 className="text-white font-display text-[40px] md:text-[80px] text-center drop-shadow-lg leading-tight">
            {lookbook.title}
          </h1>
        </div>
      </section>

      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 md:py-32">
        
        {/* Story Introduction */}
        <section className="max-w-3xl mx-auto text-center mb-32">
          <p className="font-body-lg text-body-lg text-secondary leading-loose">
            {lookbook.story}
          </p>
        </section>

        {/* Fashion Gallery */}
        <section className="space-y-32 mb-32">
          {lookbook.images && lookbook.images.map((img: any, idx: number) => (
            <div key={img.id} className="flex flex-col items-center">
              <img 
                src={img.image_url} 
                alt={img.caption || `Look ${idx + 1}`} 
                className={`w-full max-w-5xl h-auto object-cover ${idx % 2 !== 0 ? 'md:ml-auto md:mr-0 md:max-w-4xl' : 'md:mr-auto md:ml-0 md:max-w-4xl'}`}
              />
              {img.caption && (
                <div className={`mt-6 text-center md:text-left ${idx % 2 !== 0 ? 'md:w-full md:text-right' : 'md:w-full md:text-left'}`}>
                  <span className="font-label-md uppercase tracking-widest text-secondary text-sm">
                    {img.caption}
                  </span>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Shop The Look (Products) */}
        {lookbook.products && lookbook.products.length > 0 && (
          <section className="border-t border-outline-variant/30 pt-20 mt-20">
            <div className="text-center mb-16">
              <h2 className="font-headline-lg text-headline-lg text-primary uppercase tracking-widest">Shop The Look</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {lookbook.products.map((product: any) => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.slug}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden aspect-[4/5] bg-secondary-container mb-6">
                    <img 
                      src={product.main_image || '/placeholder.svg'} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out mix-blend-multiply opacity-90"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-display-md text-display-md mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                    <p className="font-body-md text-body-md text-secondary uppercase tracking-widest">
                      ${product.price?.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default LookbookDetails;
