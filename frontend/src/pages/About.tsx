import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const About = () => {
  return (
    <div className="bg-background text-on-background min-h-screen">
      <Navbar />
      
      <main className="pt-16 pb-32">
        {/* Hero Section */}
        <header className="px-margin-mobile md:px-margin-desktop pt-12 md:pt-24 mb-16 md:mb-32">
          <div className="max-w-container-max mx-auto">
            <p className="font-label-md text-label-md text-primary uppercase tracking-[0.2em] mb-4">The Atelier</p>
            <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
              Our Story: A Dialogue Between Thread and Time
            </h1>
          </div>
        </header>

        {/* Story Image Full */}
        <section className="mb-20 md:mb-40">
          <div className="w-full h-[530px] md:h-[707px] relative overflow-hidden">
            <img 
              alt="Close-up of crochet process" 
              className="w-full h-full object-cover animate-in fade-in duration-1000 delay-300" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuXIgyFaeZ_Z3LG_QfTarSoA9hbayynmpJ--zExwnBmrFhj0XfNbambesqAZL7ObOfrfCmN1QiWvOFxO7ZUIY3jNyHo65Ha31KGmsgehk3Rhx4iI378Cm9_22HSbh8rSOIvb5s0Kr5u8lbNqujLeIDdRx1h1mpSv_LW4Egk2wP3Ffx7ODvNwqw_PNGxNZ1B27QWL0jLrLQgLEe71XV_JcNEaySKn9uKi7_AgMW_vmagLXuim8l5YRAgMAHPgoy7kYYmvFPzw_389I"
            />
            <div className="absolute inset-0 bg-black/5"></div>
          </div>
        </section>

        {/* The Hands Behind the Hook */}
        <section className="px-margin-mobile md:px-margin-desktop mb-24 md:mb-48">
          <div className="max-w-container-max mx-auto md:grid md:grid-cols-12 md:gap-gutter">
            <div className="md:col-span-5 mb-12 md:mb-0">
              <img 
                alt="The Founder in studio" 
                className="w-full aspect-[4/5] object-cover shadow-[0_20px_40px_rgba(45,45,45,0.04)]" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPK7K3N6Bfjpu-KP6V9MlJaCkjVJ0UoPWboTTt2PkDFhQvQQf9vyXKuJM57x3KtGTPlNvBwFLGeI8LFQBJZhuuollDf1mpkRX73Sar8DFZAJ6_sPATlFahIUF4ER2IUPPC8yJAZKWo31jjJPK07-1DDGDJil2EIUOI5qTpZWFw6pNYL1TnqsgpmoRQgUUokmaLoVgqak0wYgxmcZ00apCgGE4jwvH3MJdf3dMHsAmMF9Io_9AnJbQKI0Tonpq19SHjEfnfkhEyB2w"
              />
            </div>
            <div className="md:col-span-6 md:col-start-7 flex flex-col justify-center">
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-8">The Hands Behind the Hook</h2>
              <div className="space-y-6 font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                <p>Founded by Mercy Bayo, MoC Couture was born from a singular obsession: the architecture of the stitch. In a world of fleeting trends, we choose the permanence of the handmade.</p>
                <p>Our philosophy of "Slow Craft" is an invitation to pause. Every garment is a labor of intention, taking upwards of sixty hours to manifest from a single spool of thread into a sculptural silhouette. This isn't just clothing; it is a tactile record of time.</p>
                <p>Mercy's vision marries the rustic honesty of traditional crochet with the exacting standards of high-fashion draping, creating pieces that feel as much like art as they do armor.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="bg-secondary-container py-24 md:py-40 mb-24 md:mb-48">
          <div className="px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto text-center">
            <span className="material-symbols-outlined text-primary text-5xl mb-8">format_quote</span>
            <blockquote className="font-display-lg-mobile text-display-lg-mobile md:font-headline-lg md:text-headline-lg text-primary italic leading-tight">
              "When we crochet, we are not just making garments; we are weaving patience into the very fabric of our lives. Intentionality is our finest thread."
            </blockquote>
            <cite className="block mt-8 font-label-md text-label-md uppercase tracking-widest text-on-secondary-container">— Mercy Bayo, Founder</cite>
          </div>
        </section>

        {/* Materials Section: Bento Grid */}
        <section className="px-margin-mobile md:px-margin-desktop mb-24 md:mb-48 max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface">Our Materials</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-4">Sourced with conscience. Crafted for longevity.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
            {/* Organic Cotton Card */}
            <div className="bg-surface-container-low p-8 md:p-12 flex flex-col items-center text-center shadow-[0_20px_40px_rgba(45,45,45,0.04)] transition-transform hover:-translate-y-2 duration-500">
              <img 
                alt="Organic Cotton" 
                className="w-48 h-48 rounded-full object-cover mb-8" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFA5mYQCQYdY9tlrjL_i5QkEnURhf_Neb_Nax5bJVVGXnT_UAtixCy3-9s3lC56iwtdKxtid5HKZQdE8glF0TFxvs28ZXer-zxI7-WIEdOZRTddGpREFS4MtoxTokfoPu4jK0Y_ymIs1mL5FEPLNreBKlQm9sr6tSLzPF2PAxJ9AA8VwmjXuNcmvwreixiBk3SXvUUYHzFbNUf8RUR0VyNL9_TIb23aWgbKy_pwLnt_PlVO7KMUFSZrTVHbUvkh2l9dBGIvW2ycmo"
              />
              <h3 className="font-headline-md text-headline-md text-on-surface mb-4">GOTS Organic Cotton</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">Long-staple fibers harvested from ethical farms in Egypt. Chosen for its breathability and its ability to hold the crisp structural definition of our signature stitches.</p>
              <span className="inline-block px-4 py-2 bg-[#f0eded] rounded-full font-label-md text-label-md text-primary">Soft & Structural</span>
            </div>
            
            {/* Mulberry Silk Card */}
            <div className="bg-surface-container-low p-8 md:p-12 flex flex-col items-center text-center shadow-[0_20px_40px_rgba(45,45,45,0.04)] transition-transform hover:-translate-y-2 duration-500">
              <img 
                alt="Mulberry Silk" 
                className="w-48 h-48 rounded-full object-cover mb-8" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAK1bvNvvDi0PWxNKiySy6qsEub15YGfrklHP_Ai7FGyIuvLfA_zbwY_MlKL-YxjecYvWUA8vUEiqFUnTaLsnvxrqb3mhnMTwQyB8J3sxbRf0HdJn1iNQEQ9ubkOzJEAhjTReuNJL0mBLHl4tIRYyx2eo1PVTC6peauIHAYKFny39Ea2Wx1SX5NzLLs5WHZEPPy7t6ongse6-b1l_dneBBRP9KpEk6-5e7_janWHG8lOvPtPNwiknifnQ4c4qUzI6S6a4DuJwHNBvw"
              />
              <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Mulberry Silk</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">A material of liquid light. We use grade 6A silk for our evening collections, offering a drape that mimics the movement of water against the skin.</p>
              <span className="inline-block px-4 py-2 bg-[#f0eded] rounded-full font-label-md text-label-md text-primary">Fluid & Luminous</span>
            </div>
          </div>
        </section>

        {/* Studio Environment - Final Image */}
        <section className="px-margin-mobile md:px-margin-desktop mb-24 max-w-container-max mx-auto">
          <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden">
            <img 
              alt="The Studio atmosphere" 
              className="w-full h-full object-cover grayscale opacity-80" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuACAxcgmChlH1OWXHBaeR09DnSaKLsw9RNgrQ8rEf6CBXlosj2vC7HIgYbbtgLKnkslrnLqw1W_91zjx27tLPlX6FGW7CZ5bBTL6YxRGG8zgJ-hEdGzHGZOhbMUcMXwYpBYIZb7YHg5a_Y-HM10NOB57zfB4BGLe15U8E6uKFvzq19aJTQaziS81WW95BYpZWPwH_CgUftwUK57tRWRp4KKQ8BRPCn8Y5j75oLrN5FXqErQkjg08JLS9nR3LO46ZIzlKMr_G2rfN2U"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-background/20 backdrop-blur-[2px]">
              <div className="text-center p-8 max-w-lg">
                <p className="font-headline-md text-headline-md text-on-surface mb-4">Visit the Atelier</p>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8">By appointment only. Experience the rhythm of the hook in person at our London workspace.</p>
                <Link to="/contact">
                  <button className="px-10 py-4 bg-primary text-white font-label-md text-label-md hover:opacity-90 transition-all uppercase tracking-widest">
                    Inquire Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-low mt-20 flex flex-col items-center gap-8 px-margin-mobile py-16 text-center mb-16 md:mb-0">
        <span className="font-headline-md text-headline-md text-primary uppercase tracking-[0.3em]">MoC Couture</span>
        <div className="flex flex-wrap justify-center gap-8">
          <Link className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all" to="/contact">Contact</Link>
          <a className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all" href="#">Instagram</a>
          <a className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all" href="#">Shipping</a>
          <a className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all" href="#">Care Guide</a>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant opacity-80 mt-4">© 2024 MoC Couture. Handcrafted with intention.</p>
      </footer>
    </div>
  );
};

export default About;
