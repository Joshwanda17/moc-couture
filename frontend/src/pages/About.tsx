import Navbar from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

const About = () => {
  const { items } = useCart();

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Navbar cartItemCount={items.length} />
      
      <main className="pt-24 pb-20 md:pt-32">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          
          <div className="text-center mb-16 md:mb-24 mt-8">
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase mb-4 block">The Atelier</span>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-6">
              Our Philosophy
            </h1>
            <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto leading-relaxed">
              Where traditional craft meets contemporary design. Every piece is an exploration of form, texture, and patience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center mb-24">
            <div className="aspect-[4/5] bg-secondary-container overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcKNVSgNN8I-pFhOdJHE64MoSuPP7P1-s1ihcZiYFhfQCFYcuvDchuZBQy29jFSD52xYTcBsVQhrOj_WczOy1oeZK3RpPcoLh5NYvHB8X0qIBKKTCXrFvIetIlDRm2ssErW62-SiZXSSph-XG0lUxAYsgHox-ZBGqXhHb6HDaUvNMPYrlTeLJsbHQB_VTYe57Hg6MNGNKRgeiuQSjO8usqan4vE9_Sr_3HQivBoQtqUcd7EiOaqd9b0w6L1AnbRj7seJlp3Hn8cnM"
                alt="Crafting process"
                className="w-full h-full object-cover grayscale opacity-90"
              />
            </div>
            
            <div className="space-y-8">
              <div>
                <h2 className="font-headline-lg text-headline-lg mb-4">Our Story</h2>
                <p className="font-body-md text-body-md text-secondary leading-relaxed mb-4">
                  MoC Couture was born from a passion for traditional crochet techniques 
                  and a vision to blend them with modern fabric artistry. Each piece we 
                  create tells a story of dedication, creativity, and craftsmanship.
                </p>
                <p className="font-body-md text-body-md text-secondary leading-relaxed">
                  What started as a personal hobby has blossomed into a full-fledged 
                  creative studio where we transform yarn and fabric into unique, 
                  handmade treasures that bring warmth and character to homes around 
                  the world.
                </p>
              </div>

              <div className="pt-8 border-t border-outline-variant/30">
                <h2 className="font-headline-lg text-headline-lg mb-4">The Process</h2>
                <p className="font-body-md text-body-md text-secondary leading-relaxed">
                  We're committed to sustainable practices, using quality materials, and 
                  creating pieces that stand the test of time. When you choose MoC Couture, 
                  you're not just buying a product - you're investing in artistry, supporting 
                  handmade craft, and bringing a piece of our passion into your home.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-24 border-t border-outline-variant/30 pt-16">
            <div className="text-center p-6">
              <h3 className="font-headline-md text-headline-md mb-4 text-primary">Handmade</h3>
              <p className="font-body-md text-body-md text-secondary">
                Every stitch crafted with care and attention to detail, utilizing organic yarns and raw silks.
              </p>
            </div>
            
            <div className="text-center p-6 md:border-l md:border-r border-outline-variant/30">
              <h3 className="font-headline-md text-headline-md mb-4 text-primary">Intentional</h3>
              <p className="font-body-md text-body-md text-secondary">
                Created with love and dedication to the craft, emphasizing slow fashion principles.
              </p>
            </div>
            
            <div className="text-center p-6">
              <h3 className="font-headline-md text-headline-md mb-4 text-primary">Unique</h3>
              <p className="font-body-md text-body-md text-secondary">
                No two pieces are exactly alike. The slight variations are the signature of human hands.
              </p>
            </div>
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

export default About;
