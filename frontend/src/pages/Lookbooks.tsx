import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

const Lookbooks = () => {
  const { items } = useCart();
  
  const { data: lookbooks, isLoading, error } = useQuery({
    queryKey: ['lookbooks'],
    queryFn: api.getLookbooks
  });

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Navbar cartItemCount={items.length} />
      
      <main className="pt-24 pb-20 md:pt-32">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-16 md:mb-24 mt-8">
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase mb-4 block">Editorial</span>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-6">
              The Lookbook
            </h1>
            <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto leading-relaxed">
              Explore our handcrafted creations through curated fashion stories.
            </p>
          </div>

          {isLoading && (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          )}

          {error && (
            <div className="text-center text-error py-20 font-body-lg">
              Failed to load lookbooks.
            </div>
          )}

          {!isLoading && lookbooks?.length === 0 && (
            <div className="text-center py-20 font-body-lg text-secondary">
              No editorials published yet.
            </div>
          )}

          <div className="flex flex-col gap-24">
            {lookbooks?.filter((l: any) => l.status === 'Published').map((lookbook: any) => (
              <div key={lookbook.id} className="group flex flex-col md:flex-row gap-8 items-center">
                <div className="w-full md:w-1/2 overflow-hidden h-[600px] bg-secondary-container relative">
                  <img 
                    src={lookbook.cover_image || '/placeholder.svg'} 
                    alt={lookbook.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500"></div>
                </div>
                
                <div className="w-full md:w-1/2 flex flex-col items-center text-center px-4 md:px-12">
                  <h2 className="font-display-md text-display-md mb-6">{lookbook.title}</h2>
                  <p className="font-body-lg text-body-lg text-secondary mb-10 max-w-md">
                    {lookbook.description}
                  </p>
                  <Link to={`/lookbook/${lookbook.slug}`}>
                    <button className="border border-outline text-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all duration-300">
                      View Story
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Lookbooks;
