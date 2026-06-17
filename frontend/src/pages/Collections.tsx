import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { api } from "@/lib/api";

const Collections = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-32 md:pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Hero Section */}
        <section className="mb-20 text-center md:text-left">
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">The Archive of Form</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Explore our curation of handcrafted silhouettes, where every stitch tells a story of patience, heritage, and the rhythm of the artisan's hands.
          </p>
        </section>

        {loading ? (
          <div className="py-20 text-center text-secondary">Loading the archive...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">
            {products.map((product, index) => {
              // Creating a varied layout structure based on index like the original design
              let colSpan = "lg:col-span-4";
              let aspect = "aspect-[3/4]";
              let mt = "";
              
              if (index % 4 === 0) {
                colSpan = "lg:col-span-8";
                aspect = "aspect-[16/9]";
              } else if (index % 4 === 1) {
                colSpan = "lg:col-span-4";
                aspect = "aspect-[3/4]";
                mt = "mt-0 md:mt-24";
              } else if (index % 4 === 2) {
                colSpan = "lg:col-span-5";
                aspect = "aspect-[4/5]";
              } else if (index % 4 === 3) {
                colSpan = "lg:col-span-7";
                aspect = "aspect-[4/3]";
                mt = "md:-mt-12";
              }

              return (
                <div key={product.id} className={`${colSpan} group cursor-pointer hover:-translate-y-1 transition-transform duration-300 ${mt}`}>
                  <Link to={`/product/${product.id}`}>
                    <div className={`relative overflow-hidden ${aspect} mb-6 rounded-lg shadow-[0_20px_30px_rgba(45,45,45,0.05)] bg-surface-container`}>
                      <img 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        src={product.main_image}
                      />
                      {index % 4 === 0 && <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0"></div>}
                    </div>
                    <div className="flex justify-between items-baseline">
                      <h3 className={`font-headline-md text-headline-md ${index % 4 === 0 || index % 4 === 3 ? 'md:text-headline-lg md:font-headline-lg' : ''} text-on-surface`}>
                        {product.name}
                      </h3>
                      <span className="font-label-md text-label-md text-secondary uppercase tracking-widest text-right pl-4">
                        UGX {(product.price * 3700).toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2 h-px bg-outline-variant/30 w-full"></div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {/* Designer Note Section */}
        <section className="mt-32 p-12 bg-surface-container-low rounded-lg flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <span className="font-label-md text-label-md text-primary mb-4 block tracking-widest">THE ATELIER PHILOSOPHY</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">"Patience is the invisible thread that binds every garment we create."</h2>
            <Link to="/about">
              <button className="bg-primary text-on-primary px-8 py-3 font-label-md text-label-md uppercase tracking-widest transition-transform hover:scale-105 active:scale-95">
                Read Journal
              </button>
            </Link>
          </div>
          <div className="md:w-1/2 aspect-video rounded-lg overflow-hidden shadow-[0_20px_30px_rgba(45,45,45,0.05)]">
            <img 
              alt="The Process" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcKNVSgNN8I-pFhOdJHE64MoSuPP7P1-s1ihcZiYFhfQCFYcuvDchuZBQy29jFSD52xYTcBsVQhrOj_WczOy1oeZK3RpPcoLh5NYvHB8X0qIBKKTCXrFvIetIlDRm2ssErW62-SiZXSSph-XG0lUxAYsgHox-ZBGqXhHb6HDaUvNMPYrlTeLJsbHQB_VTYe57Hg6MNGNKRgeiuQSjO8usqan4vE9_Sr_3HQivBoQtqUcd7EiOaqd9b0w6L1AnbRj7seJlp3Hn8cnM"
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-low mt-20 flex flex-col items-center gap-8 px-5 py-16 text-center mb-16 md:mb-0">
        <h2 className="font-headline-md text-headline-md text-primary uppercase tracking-widest">MoC Couture</h2>
        <div className="flex gap-8 flex-wrap justify-center">
          <Link className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all" to="/contact">Contact</Link>
          <a className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all" href="#">Instagram</a>
          <a className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all" href="#">Shipping</a>
          <a className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all" href="#">Care Guide</a>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">© 2024 MoC Couture. Handcrafted with intention.</p>
      </footer>
    </div>
  );
};

export default Collections;
