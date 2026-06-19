import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";

const CollectionDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const [collection, setCollection] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollection = async () => {
      try {
        if (slug) {
          const data = await api.getCollectionBySlug(slug);
          setCollection(data);
        }
      } catch (err) {
        console.error("Error fetching collection details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCollection();
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-background text-on-surface min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 text-center text-secondary font-label-md tracking-widest uppercase">
          Loading Collection...
        </div>
      </div>
    );
  }

  if (!collection) {
    return (
      <div className="bg-background text-on-surface min-h-screen flex flex-col">
        <Navbar />
        <div className="pt-32 pb-20 text-center flex-grow flex flex-col justify-center items-center">
          <h1 className="font-display-lg text-primary mb-4">Collection Not Found</h1>
          <p className="font-body-lg text-secondary mb-8">The story you are looking for does not exist.</p>
          <Link to="/collections" className="font-label-md text-primary tracking-widest uppercase border-b border-primary pb-1">
            Return to Archive
          </Link>
        </div>
      </div>
    );
  }

  // Filter media based on type for the inspiration board and gallery
  const inspirationMedia = collection.media?.filter((m: any) => m.type === 'inspiration') || [];
  const galleryMedia = collection.media?.filter((m: any) => m.type === 'gallery') || [];
  
  // Use local images if none available from DB (development fallback)
  const fallbackInspiration = inspirationMedia.length > 0 ? inspirationMedia : [
    { url: '/images/collections/Crochet Blossom dress 🍀 💚.jpg', caption: 'Floral patterns' },
    { url: '/images/collections/Crochê é Moda Sempre.webp', caption: 'Texture detail' },
    { url: '/images/collections/Butterfly Shawl, crocheted.webp', caption: 'Color palette' }
  ];

  const fallbackGallery = galleryMedia.length > 0 ? galleryMedia : [
    { url: '/images/collections/Simple Maxi Mesh Dress Tutorial _ How To Crochet a Maxi Dress Beginner Friendly Guide.jpg' },
    { url: '/images/collections/974114594421429745.jpg' },
    { url: '/images/collections/crochet.jpg' },
    { url: '/images/collections/720787115415847594.jpg' }
  ];

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Navbar />
      
      <main className="pb-16">
        {/* Section 1: Collection Hero */}
        <section className="relative h-[85vh] min-h-[600px] w-full flex flex-col justify-end p-8 md:p-16 lg:p-24 overflow-hidden">
          <div className="absolute inset-0 z-0 bg-surface-container-high">
            {collection.hero_image || collection.cover_image ? (
              <img 
                src={collection.hero_image || collection.cover_image} 
                alt={collection.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <img 
                src="/images/collections/5 Crochet Butterfly Shrug Free Patterns.jpg" 
                alt={collection.name}
                className="w-full h-full object-cover opacity-50"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-4xl text-on-primary">
            <span className="font-label-md text-label-md tracking-widest uppercase mb-4 block">
              {collection.season || "Exclusive Collection"}
            </span>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-6 text-on-primary">
              {collection.name}
            </h1>
            <p className="font-body-lg text-body-lg max-w-2xl mb-8 opacity-90">
              {collection.short_description || `Inspired by warm days and vibrant floral beauty.`}
            </p>
            <p className="font-label-md tracking-widest uppercase">
              {collection.products?.length || 0} Handmade Pieces
            </p>
          </div>
        </section>

        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          {/* Section 2: Collection Story */}
          <section className="py-24 max-w-3xl mx-auto text-center">
            <h2 className="font-headline-md text-primary tracking-widest uppercase mb-8">The Story</h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed text-xl">
              {collection.story || `The ${collection.name} collection combines lightweight crochet patterns with soft fabrics inspired by nature's colors and textures. Each piece is designed to flow seamlessly from day to night, celebrating the rhythm of the artisan's hands.`}
            </p>
          </section>

          {/* Section 3: Inspiration Board */}
          <section className="py-20 border-t border-outline-variant/30">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
              <h2 className="font-headline-lg text-primary">Inspiration Board</h2>
              <span className="font-label-md tracking-widest uppercase text-secondary">
                Theme: {collection.theme || "Elegance"}
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {fallbackInspiration.map((item: any, idx: number) => (
                <div key={idx} className={`relative aspect-[3/4] overflow-hidden ${idx === 1 ? 'md:mt-12' : ''}`}>
                  <img src={item.url} alt={item.caption || "Inspiration"} className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-700" />
                  {item.caption && (
                    <div className="absolute bottom-4 left-4 bg-surface/90 px-4 py-2 text-primary font-label-md tracking-widest uppercase text-xs">
                      {item.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Featured Piece (Mocked unless data exists) */}
          {collection.products && collection.products.length > 0 && (
            <section className="py-24 my-12 bg-surface-container-low -mx-margin-mobile md:-mx-margin-desktop px-margin-mobile md:px-margin-desktop">
              <div className="max-w-container-max mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                  <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-xl">
                    <img 
                      src={collection.products[0].main_image || '/images/collections/Easy Crochet Poncho Patterns for Beginners Step-by-Step DIY Guide - Fascinate Names.jpg'} 
                      alt={collection.products[0].name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                    />
                  </div>
                </div>
                <div className="md:w-1/2">
                  <span className="font-label-md text-primary tracking-widest uppercase block mb-4">Featured Piece</span>
                  <h2 className="font-display-md text-primary mb-6">{collection.products[0].name}</h2>
                  <p className="font-body-lg text-on-surface-variant mb-8 leading-relaxed">
                    {collection.products[0].description || "This standout piece encapsulates the entire spirit of the collection. Hand-finished with intricate detailing, it is designed to be the centerpiece of your wardrobe."}
                  </p>
                  <Link to={`/product/${collection.products[0].id}`} className="inline-block border border-primary text-primary px-8 py-3 font-label-md tracking-widest uppercase hover:bg-primary hover:text-on-primary transition-colors">
                    View Featured Piece
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* Section 5: Collection Gallery (Editorial layout) */}
          <section className="py-24">
            <h2 className="font-headline-lg text-primary text-center mb-16">Editorial Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center">
              <div className="md:col-span-5 md:col-start-2 aspect-[4/5] overflow-hidden">
                <img src={fallbackGallery[0].url} alt="Editorial 1" className="w-full h-full object-cover" />
              </div>
              <div className="md:col-span-4 aspect-square overflow-hidden mt-8 md:mt-0">
                <img src={fallbackGallery[1].url} alt="Editorial 2" className="w-full h-full object-cover" />
              </div>
              
              <div className="md:col-span-6 aspect-video overflow-hidden mt-8 md:mt-24">
                <img src={fallbackGallery[2].url} alt="Editorial 3" className="w-full h-full object-cover" />
              </div>
              <div className="md:col-span-4 md:col-start-8 aspect-[3/4] overflow-hidden mt-8 md:-mt-20">
                <img src={fallbackGallery[3].url} alt="Editorial 4" className="w-full h-full object-cover" />
              </div>
            </div>
          </section>

          {/* Section 6: Products In Collection */}
          <section className="py-24 border-t border-outline-variant/30">
            <div className="text-center mb-16">
              <h2 className="font-headline-lg text-primary mb-4">The Pieces</h2>
              <p className="font-body-md text-secondary tracking-widest uppercase">Explore the items from {collection.name}</p>
            </div>
            
            {collection.products && collection.products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                {collection.products.map((product: any) => (
                  <Link to={`/product/${product.id}`} key={product.id} className="group cursor-pointer">
                    <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-surface-container">
                      <img 
                        src={product.main_image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <h3 className="font-headline-md text-on-surface mb-2">{product.name}</h3>
                    <p className="font-label-md text-secondary tracking-widest">
                      UGX {(product.price * 3700).toLocaleString()}
                    </p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-on-surface-variant font-body-lg bg-surface-container-low rounded-lg">
                Products for this collection will be revealed soon.
              </div>
            )}
          </section>

          {/* Section 7: Styling Suggestions */}
          <section className="py-24 bg-surface-container rounded-sm px-8 md:px-16 flex flex-col md:flex-row gap-12 items-center justify-between">
            <div className="md:w-1/3">
              <h2 className="font-display-md text-primary mb-6">Styling Notes</h2>
              <p className="font-body-md text-on-surface-variant mb-6">
                Our designer recommends pairing pieces from {collection.name} with natural textures and understated accessories to let the craftsmanship shine.
              </p>
              <ul className="space-y-4 font-label-md text-primary tracking-widest uppercase">
                <li className="flex items-center gap-4">
                  <span className="w-8 h-px bg-primary block"></span> Silk Scarves
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-8 h-px bg-primary block"></span> Minimal Gold Jewelry
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-8 h-px bg-primary block"></span> Leather Sandals
                </li>
              </ul>
            </div>
            <div className="md:w-1/2 aspect-video overflow-hidden">
              <img 
                src={fallbackGallery[0].url} 
                alt="Styling Inspiration" 
                className="w-full h-full object-cover"
              />
            </div>
          </section>

          {/* Section 8: Craftsmanship */}
          <section className="py-24 text-center">
            <h2 className="font-headline-lg text-primary mb-16">The Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border border-primary rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-serif text-primary">1</span>
                </div>
                <h3 className="font-headline-md text-primary mb-4">Hand Crocheted</h3>
                <p className="font-body-md text-on-surface-variant">Intricate patterns woven by skilled hands over countless hours.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border border-primary rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-serif text-primary">2</span>
                </div>
                <h3 className="font-headline-md text-primary mb-4">Fabric Integrated</h3>
                <p className="font-body-md text-on-surface-variant">Seamless blending of premium fabrics with crochet structural elements.</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border border-primary rounded-full flex items-center justify-center mb-6">
                  <span className="text-2xl font-serif text-primary">3</span>
                </div>
                <h3 className="font-headline-md text-primary mb-4">Finished By Hand</h3>
                <p className="font-body-md text-on-surface-variant">Every hem, button, and seam meticulously checked and secured.</p>
              </div>
            </div>
          </section>

          {/* Section 9: Related Collections */}
          <section className="py-20 border-t border-outline-variant/30 text-center">
            <h2 className="font-label-md text-secondary tracking-widest uppercase mb-12">More From The Archive</h2>
            <Link to="/collections" className="font-headline-md text-primary hover:text-secondary transition-colors underline underline-offset-8">
              Explore All Collections
            </Link>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CollectionDetails;
