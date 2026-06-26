import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";
import { motion, AnimatePresence } from "framer-motion";

const HERO_IMAGES = [
  "/images/crochet-business/490f108b6ffcb2bfe511fdb9228c5750.jpg",
  "/images/crochet-business/6b41605cdb6e16a2aa705c6d5e1353c8.webp",
  "/images/crochet-business/071aeb9629cd90ec04a7ae3e125e65e2.jpg",
  "/images/crochet-business/07ee90c84a60e432972c47babc17ed8c.jpg"
];

const Home = () => {
  const [bestSellers, setBestSellers] = useState<any[]>([]);
  const [newArrivals, setNewArrivals] = useState<any[]>([]);
  const [currentHeroIdx, setCurrentHeroIdx] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await api.getProducts();
        // Assuming we have at least 8 products, slice them up for demo purposes
        setBestSellers(products.slice(0, 4));
        setNewArrivals(products.slice(4, 8).length > 0 ? products.slice(4, 8) : products.slice(0, 4));
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIdx((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const slideVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-background text-on-surface min-h-screen font-body overflow-x-hidden">
      <Navbar />
      
      <main className="pb-12 md:pb-0">
        {/* 3. Hero Section */}
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="popLayout">
              <motion.img 
                key={currentHeroIdx}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover object-center" 
                alt="Luxury Crochet Fashion Model" 
                src={HERO_IMAGES[currentHeroIdx]}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/40 z-10"></div>
          </div>
          
          <div className="relative z-10 text-center px-5 flex flex-col items-center mt-16">
            <h2 className="font-display text-5xl md:text-7xl text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 max-w-4xl">
              Luxury Crochet & Fabric Fashion
            </h2>
            <p className="font-body text-lg md:text-xl text-white/90 max-w-2xl mb-10">
              Handcrafted pieces designed to celebrate individuality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/collections">
                <button className="bg-white text-black px-10 py-4 font-body uppercase tracking-widest text-sm hover:bg-white/90 transition-all w-full sm:w-auto">
                  Explore Collection
                </button>
              </Link>
              <Link to="/gallery">
                <button className="border border-white text-white px-10 py-4 font-body uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all w-full sm:w-auto">
                  Shop Now
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* 4. Featured Collections */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={slideVariants}
          className="py-16 px-5 md:px-16 max-w-screen-2xl mx-auto"
        >
          <div className="text-center mb-16">
            <h3 className="font-display text-3xl md:text-4xl mb-4">Featured Collections</h3>
            <div className="w-16 h-0.5 bg-primary mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Collection Cards */}
            {[
              { title: 'Crochet Bags', img: '/images/crochet-business/071aeb9629cd90ec04a7ae3e125e65e2.jpg', desc: 'Handwoven statement pieces' },
              { title: 'Spring Collection', img: '/images/crochet-business/07ee90c84a60e432972c47babc17ed8c.jpg', desc: 'Lightweight & breezy' },
              { title: 'Signature Wear', img: '/images/crochet-business/0fa695a1d815a35004c82928ac636a2d.webp', desc: 'Our iconic designs' },
              { title: 'Accessories', img: '/images/crochet-business/48eca36e3c911c9cda0dbbc0b6e12815.jpg', desc: 'The perfect finishing touch' }
            ].map((collection, idx) => (
              <Link to="/collections" key={idx} className="group cursor-pointer block">
                <div className="relative overflow-hidden aspect-[4/5] mb-4">
                  <img src={collection.img} alt={collection.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
                </div>
                <h4 className="font-display text-xl uppercase tracking-wider">{collection.title}</h4>
                <p className="text-secondary text-sm mt-1">{collection.desc}</p>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* 5. Brand Story Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={slideVariants}
          className="bg-surface-container-low py-16 md:py-24"
        >
          <div className="max-w-screen-xl mx-auto px-5 md:px-16 grid grid-cols-1 md:grid-cols-2 items-center gap-16">
            <div className="relative">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB76D29kblTInBe1hVLIESwj1bOrwyeUC7xfSe8gIaUxDWuXGzmRkzAr6t4hfSQBeggRRUgHMd_4mqem7qtlJllG0jVvB0cXRH1nVX2lEcIRepuCOU31qp3JE3O6aDOcEl2L_nyy-Eq4X-NyLg-_-hSiXEuzN10fDbN5YVydpT-sFAKMTw4wL4hwv4_xIaSdaVeAv1cxjAPSSM-JcoiiTlrDijQ7KFH__7f_J1zCkpuCC9nBPHAFuySUobyA87vsjXXP6nNuNXQ3qQ" 
                alt="MoC Couture Founder Crafting" 
                className="w-full h-auto object-cover soft-shadow z-10 relative"
              />
              <div className="absolute -bottom-6 -right-6 w-full h-full border border-primary z-0 hidden md:block"></div>
            </div>
            <div>
              <h3 className="font-display text-3xl md:text-5xl mb-8">The MoC Couture Story</h3>
              <p className="font-body text-lg text-secondary mb-6 leading-relaxed">
                At MoC Couture, every piece is handcrafted using a blend of traditional crochet artistry and modern fabric design.
              </p>
              <p className="font-body text-lg text-secondary mb-10 leading-relaxed italic border-l-2 border-primary pl-6">
                "We weave heritage into modern silhouettes, creating artifacts of personal expression that last lifetimes."
              </p>
              <Link to="/about">
                <button className="border-b border-primary text-primary pb-1 font-body uppercase tracking-widest text-sm hover:opacity-70 transition-opacity inline-flex items-center gap-2">
                  Read Our Story <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </Link>
            </div>
          </div>
        </motion.section>

        {/* 6. Best Sellers Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={slideVariants}
          className="py-16 px-5 md:px-16 max-w-screen-2xl mx-auto"
        >
          <div className="text-center mb-16">
            <h3 className="font-display text-3xl md:text-4xl mb-4">Our Most Loved Pieces</h3>
            <div className="w-16 h-0.5 bg-primary mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-8">
            {bestSellers.map((product) => (
              <Link to={`/product/${product.id}`} key={`bs-${product.id}`} className="group">
                <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-secondary-container">
                  <img src={product.main_image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h4 className="font-display text-lg mb-1 group-hover:text-primary transition-colors">{product.name}</h4>
                <p className="text-secondary text-sm">UGX {(product.price * 3700).toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* 7. New Arrivals Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={slideVariants}
          className="pb-16 px-5 md:px-16 max-w-screen-2xl mx-auto"
        >
          <div className="flex justify-between items-end mb-12 border-b border-outline-variant/30 pb-4">
            <h3 className="font-display text-3xl md:text-4xl">New Arrivals</h3>
            <Link to="/gallery" className="text-sm font-body uppercase tracking-widest text-secondary hover:text-primary transition-colors">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-8">
            {newArrivals.map((product) => (
              <Link to={`/product/${product.id}`} key={`na-${product.id}`} className="group">
                <div className="relative overflow-hidden aspect-[3/4] mb-4 bg-secondary-container">
                  <span className="absolute top-2 left-2 bg-background px-2 py-1 text-[10px] uppercase tracking-widest z-10">New</span>
                  <img src={product.main_image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <h4 className="font-display text-lg mb-1 group-hover:text-primary transition-colors">{product.name}</h4>
                <p className="text-secondary text-sm">UGX {(product.price * 3700).toLocaleString()}</p>
              </Link>
            ))}
          </div>
        </motion.section>

        {/* 8. Lookbook Preview */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={slideVariants}
          className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden"
        >
          <div className="absolute inset-0 z-0">
            <img 
              className="w-full h-full object-cover" 
              alt="MoC Couture Lookbook" 
              src="/images/crochet-business/6b41605cdb6e16a2aa705c6d5e1353c8.webp"
            />
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          <div className="relative z-10 text-center text-white">
            <h2 className="font-display text-5xl md:text-6xl mb-8 uppercase tracking-widest">Wear The Art</h2>
            <Link to="/lookbook">
              <button className="border-2 border-white px-10 py-4 font-body uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all">
                View Lookbook
              </button>
            </Link>
          </div>
        </motion.section>

        {/* 9. Craftsmanship Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={slideVariants}
          className="py-16 md:py-24 bg-background"
        >
          <div className="max-w-screen-xl mx-auto px-5 md:px-16">
            <div className="text-center mb-16">
              <h3 className="font-display text-3xl md:text-4xl mb-4">Our Craftsmanship Process</h3>
              <p className="text-secondary font-body max-w-2xl mx-auto">The journey of a MoC Couture piece from raw material to wearable art.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-outline-variant/50 -z-10"></div>
              
              {[
                { step: '01', title: 'Select premium yarn', icon: 'line_weight' },
                { step: '02', title: 'Hand crochet', icon: 'back_hand' },
                { step: '03', title: 'Integrate fabric', icon: 'texture' },
                { step: '04', title: 'Finish by hand', icon: 'check_circle' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center bg-background py-4">
                  <div className="w-16 h-16 rounded-full bg-surface-container-low flex items-center justify-center mb-6 shadow-sm">
                    <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
                  </div>
                  <span className="text-primary font-display text-lg mb-2">{item.step}</span>
                  <h4 className="font-body text-lg uppercase tracking-wider">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 10. Why Choose MoC Couture */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={slideVariants}
          className="py-16 px-5 md:px-16 bg-surface-container-low"
        >
          <div className="max-w-screen-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: 'Handmade', desc: 'Every piece is crafted by human hands, ensuring uniqueness in every stitch.' },
                { title: 'Unique Designs', desc: 'We blend traditional techniques with contemporary fashion silhouettes.' },
                { title: 'Premium Materials', desc: 'Sourced from the finest organic yarns and quality fabrics.' },
                { title: 'Made With Care', desc: 'Produced ethically with fair labor practices and immense attention to detail.' }
              ].map((feature, idx) => (
                <div key={idx} className="bg-background p-8 border border-outline-variant/30 text-center hover:-translate-y-2 transition-transform duration-300">
                  <h4 className="font-display text-xl uppercase tracking-wider mb-4">{feature.title}</h4>
                  <p className="text-secondary font-body text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* 11. Testimonials (Future) */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={slideVariants}
          className="py-16 px-5 md:px-16 max-w-3xl mx-auto text-center"
        >
          <span className="text-primary tracking-[0.2em] uppercase text-sm mb-4 block">Client Love</span>
          <div className="flex justify-center gap-1 text-primary mb-8">
            {[1,2,3,4,5].map(i => <span key={i} className="material-symbols-outlined">star</span>)}
          </div>
          <h3 className="font-display text-2xl md:text-4xl italic leading-relaxed text-on-surface">
            "Beautiful craftsmanship. The attention to detail on my custom crochet bag is absolutely incredible. It's a true piece of art."
          </h3>
          <p className="mt-8 font-body text-secondary uppercase tracking-widest text-sm">— Sarah J.</p>
        </motion.section>

        {/* 12. Instagram Feed */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={slideVariants}
          className="py-12 px-5 md:px-16 max-w-screen-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h3 className="font-display text-2xl md:text-3xl mb-2">Follow Our Journey</h3>
            <a href="#" className="text-secondary hover:text-primary transition-colors text-sm uppercase tracking-widest">@moc_couture</a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-4">
            {[
              '/images/crochet-business/7af5666266c522214aa26cbc6445d4ac.jpg',
              '/images/crochet-business/d6d6d97a7e3c9a261a29f4ca8097e523.jpg',
              '/images/crochet-business/eafc91400245977140fa871c997a628b.jpg',
              '/images/crochet-business/fae1465d3bd3a9ada3daaad67e7c3072.jpg',
              '/images/crochet-business/fe987ba4f86546a3dfbfb3bbff2fc31e.jpg',
              '/images/crochet-business/071aeb9629cd90ec04a7ae3e125e65e2.jpg',
            ].map((img, idx) => (
              <div key={idx} className={`relative overflow-hidden aspect-square ${idx > 3 ? 'hidden lg:block' : ''}`}>
                <img src={img} alt="Instagram post" className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 cursor-pointer" />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                  <span className="material-symbols-outlined text-white">favorite</span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* 13. Newsletter */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={slideVariants}
          className="bg-primary text-on-primary py-16 px-5"
        >
          <div className="max-w-xl mx-auto text-center">
            <h3 className="font-display text-3xl md:text-4xl mb-4">Join the MoC Couture Community</h3>
            <p className="mb-8 opacity-90 font-body text-sm md:text-base">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="flex-1 px-4 py-3 bg-white/10 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-white"
                required
              />
              <button type="submit" className="bg-white text-primary px-8 py-3 font-body uppercase tracking-widest text-sm hover:bg-white/90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </motion.section>

        {/* 14. Contact CTA */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={slideVariants}
          className="py-16 px-5 text-center bg-surface-container-low"
        >
          <h3 className="font-display text-3xl mb-6">Looking For A Custom Piece?</h3>
          <p className="text-secondary font-body mb-8 max-w-md mx-auto">Let's Create Something Beautiful Together. We work with you to design a piece that is uniquely yours.</p>
          <Link to="/contact">
            <button className="border border-primary text-primary px-10 py-4 font-body uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-all">
              Contact Us
            </button>
          </Link>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
