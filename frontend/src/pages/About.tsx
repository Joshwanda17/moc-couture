import Navbar from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import aboutImage from "@/assets/about-image.jpg";

const About = () => {
  const { items } = useCart();

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <Navbar cartItemCount={items.length} />
      
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
            About MoC Couture
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Where traditional craft meets contemporary design
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16 animate-fade-in" style={{ animationDelay: '100ms' }}>
          <div className="rounded-lg overflow-hidden shadow-elegant">
            <img
              src={aboutImage}
              alt="Crafting process"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="space-y-6">
            <h2 className="text-3xl font-display font-bold">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              MoC Couture was born from a passion for traditional crochet techniques 
              and a vision to blend them with modern fabric artistry. Each piece we 
              create tells a story of dedication, creativity, and craftsmanship.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              What started as a personal hobby has blossomed into a full-fledged 
              creative studio where we transform yarn and fabric into unique, 
              handmade treasures that bring warmth and character to homes around 
              the world.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="w-16 h-16 bg-gradient-warm rounded-full mx-auto mb-4 flex items-center justify-center text-primary-foreground text-2xl font-bold">
              100%
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">Handmade</h3>
            <p className="text-muted-foreground">
              Every stitch crafted with care and attention to detail
            </p>
          </div>
          
          <div className="text-center p-6 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="w-16 h-16 bg-gradient-warm rounded-full mx-auto mb-4 flex items-center justify-center text-primary-foreground text-2xl font-bold">
              ♥
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">Passionate</h3>
            <p className="text-muted-foreground">
              Created with love and dedication to the craft
            </p>
          </div>
          
          <div className="text-center p-6 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="w-16 h-16 bg-gradient-warm rounded-full mx-auto mb-4 flex items-center justify-center text-primary-foreground text-2xl font-bold">
              ★
            </div>
            <h3 className="text-xl font-display font-semibold mb-2">Unique</h3>
            <p className="text-muted-foreground">
              No two pieces are exactly alike - each is one of a kind
            </p>
          </div>
        </div>

        <div className="bg-card p-8 rounded-lg shadow-soft border border-border/50 text-center animate-fade-in" style={{ animationDelay: '500ms' }}>
          <h2 className="text-3xl font-display font-bold mb-4">
            Our Commitment
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            We're committed to sustainable practices, using quality materials, and 
            creating pieces that stand the test of time. When you choose MoC Couture, 
            you're not just buying a product - you're investing in artistry, supporting 
            handmade craft, and bringing a piece of our passion into your home.
          </p>
        </div>
      </main>
    </div>
  );
};

export default About;
