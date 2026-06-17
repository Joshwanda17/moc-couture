import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Home = () => {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Navbar />
      
      <main className="pt-16 pb-24 md:pb-0">
        {/* Hero Section */}
        <section className="relative h-[795px] flex flex-col md:flex-row items-center overflow-hidden mb-24 md:mb-32">
          <div className="w-full md:w-1/2 h-full order-2 md:order-1">
            <div className="w-full h-full relative">
              <img 
                className="w-full h-full object-cover" 
                alt="A close-up, editorial fashion photograph of a handcrafted cream-colored crochet dress" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBsdd3Azu2qmR0HapO4E-B3v1lAyK1kNqB0RVF-0dKgMuhb92Vb1-YHV8cw0S3lSsd4M5_nfgdSKmvbkA_OdiGy8W3Nck8r8OHqlzmNBbfApB1Nnt5Hosbi5U-ydvrUrNnG87SwM5u7c1dDMf7T8AkdYkC2o_8Vmq95XxPuZ-xTuksqV-0HTA4bTSwZM8f2y3M2u84fUHlKu9s3t_d6Xp8-c8jLTsX9_yqiw-74PbC4T22JpYQpF_Gaf4g5cMumqxlp71-TL1x4DkM"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col justify-center px-10 md:px-16 py-12 order-1 md:order-2">
            <span className="font-label-md text-label-md uppercase tracking-[0.2em] text-primary mb-6">Atelier Collection 2024</span>
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-8 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000">
              Handcrafted <br/>Crochet Fashion
            </h2>
            <p className="font-body-lg text-body-lg text-secondary max-w-md mb-10">
              A dialogue between traditional craftsmanship and contemporary silhouettes. Each piece is meticulously hand-knotted by artisans in our studio.
            </p>
            <div className="flex gap-4">
              <Link to="/collections">
                <button className="bg-primary text-on-primary px-10 py-4 font-label-md text-label-md rounded-DEFAULT hover:opacity-90 transition-all uppercase tracking-widest">
                  Shop Collection
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Collections (Bento Style) */}
        <section className="max-w-container-max mx-auto px-5 md:px-16 mb-24 md:mb-40">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h3 className="font-headline-lg text-headline-lg mb-2">Featured Series</h3>
              <p className="font-body-md text-body-md text-secondary">Exploration of form and fiber.</p>
            </div>
            <Link to="/collections" className="font-label-md text-label-md text-primary underline underline-offset-8 hover:opacity-70 transition-all">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Large Feature */}
            <div className="md:col-span-8 group cursor-pointer">
              <Link to="/collections">
                <div className="relative overflow-hidden bg-secondary-container h-[500px]">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    alt="A wide editorial shot of a high-fashion model wearing an avant-garde crochet jacket" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBveC2Q4Cez2jVAdnCBtSoFMEnRLH9MD7xpXJG-pAeHRiEj7-YbLdPhrkgcc3Ak2DiFRaEbUCHrmN1enOGUqZ_FHUKWQP5B5QB15VwxX6IJ3sC7GeLHRxKswDw-f5SnwwDq-Ph-yods7iaLcTGnKvNlQOd86u9EN46_Fiwl-qev3XGUluvvWPnmRntZPfYOOheYfSe3GCLZZaBmEA4vbh-fR8k229zFHi2BKyDQyfDwDOlcnxCH38QtGztPxgLf0SsbfayN520yBRY"
                  />
                  <div className="absolute inset-0 bg-black/5"></div>
                  <div className="absolute bottom-8 left-8 text-white">
                    <span className="font-label-md text-label-md uppercase tracking-widest block mb-2">Signature</span>
                    <h4 className="font-headline-md text-headline-md">The Terracotta Series</h4>
                  </div>
                </div>
              </Link>
            </div>
            
            {/* Small Features */}
            <div className="md:col-span-4 flex flex-col gap-8">
              <div className="group cursor-pointer">
                <Link to="/collections">
                  <div className="relative overflow-hidden bg-secondary-container h-[234px]">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      alt="A delicate, ivory-toned crochet shawl" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyUXzzNOcyzxam0h_N71qrnfKb9yPuGTGq_ffmdpCDgU8gTTSpxrvIfNkUsesDLSdtFyuErije1E_i8nCehT-2-sxuWOdzXPoP-nnBP1F91xRcHrmLw6DZSLWg2bwzYWTwtX4Gd07sSNrVH05m4H76RxrXJLgBQCmVAqfn5ZGCee2-qRi54DU86_xiLQXPpysxf_bE9yaY3xZKmubAuUXa2F49GlJtEXUDztwSK6Xul2VYR4TBWs0D1rQ7yyHzyyuCEL2cbQ672yo"
                    />
                    <div className="absolute inset-0 bg-black/5"></div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-headline-md text-headline-md text-primary">Ephemeral Lace</h4>
                    <p className="font-body-md text-body-md text-secondary">Sheer textures for layered elegance.</p>
                  </div>
                </Link>
              </div>
              
              <div className="group cursor-pointer">
                <Link to="/collections">
                  <div className="relative overflow-hidden bg-secondary-container h-[234px]">
                    <img 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      alt="A lifestyle fashion shot of a woman in a sand-colored crochet maxi dress" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmj_3MwEHbgGZ2ueMih9n3I6DDMmHbPZZYdoyOev2xXTj7-JTQ55fBkhayuXJwm6z1ywDsk6aUUFfJ3iTO78bKfqEO8UmaAVPjeLim6Q8677s9IHHNySL6Vtk1nbkTZB4k2G7Lu_Bw5IHnHUdN_BbGrup54A23lWDrcERa8dIoVk90ZLUXC7EWcSGl32QFKBiycvQ_jkeToX-EWCZII1CrAl6BoHw9ibEp8BZAWyafryM_TeS7YrSOwsrFgPOdjn4IQB0Z1w06VF4"
                    />
                    <div className="absolute inset-0 bg-black/5"></div>
                  </div>
                  <div className="mt-4">
                    <h4 className="font-headline-md text-headline-md text-primary">Coastal Knits</h4>
                    <p className="font-body-md text-body-md text-secondary">Natural fibers, ocean rhythms.</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About MoC Couture (Editorial Spread) */}
        <section className="bg-surface-container-low py-24 md:py-40">
          <div className="max-w-container-max mx-auto px-5 md:px-16 grid grid-cols-1 md:grid-cols-2 items-center gap-16 md:gap-32">
            <div className="relative flex justify-center">
              <div className="w-full max-w-sm aspect-[3/4] relative z-10 soft-shadow">
                <img 
                  className="w-full h-full object-cover" 
                  alt="An artisan's hands working with a crochet hook and natural linen yarn" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB76D29kblTInBe1hVLIESwj1bOrwyeUC7xfSe8gIaUxDWuXGzmRkzAr6t4hfSQBeggRRUgHMd_4mqem7qtlJllG0jVvB0cXRH1nVX2lEcIRepuCOU31qp3JE3O6aDOcEl2L_nyy-Eq4X-NyLg-_-hSiXEuzN10fDbN5YVydpT-sFAKMTw4wL4hwv4_xIaSdaVeAv1cxjAPSSM-JcoiiTlrDijQ7KFH__7f_J1zCkpuCC9nBPHAFuySUobyA87vsjXXP6nNuNXQ3qQ"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-secondary-container -z-0 hidden md:block opacity-50"></div>
            </div>
            <div>
              <h3 className="font-label-md text-label-md text-primary uppercase tracking-[0.3em] mb-6">Our Narrative</h3>
              <h2 className="font-display-lg-mobile md:font-headline-lg text-display-lg-mobile md:text-headline-lg mb-8 italic">The Rhythm of the Hook</h2>
              <p className="font-body-lg text-body-lg text-tertiary mb-6 leading-relaxed">
                At MoC Couture, we believe that fashion should be as meaningful as it is beautiful. Our atelier was founded on the principle of intentionality—each stitch is a decision, each garment a story of time.
              </p>
              <p className="font-body-md text-body-md text-secondary mb-10 italic border-l-2 border-primary pl-6">
                "We don't just make clothing; we weave heritage into modern silhouettes, creating artifacts of personal expression that last lifetimes."
              </p>
              <Link to="/about">
                <button className="border border-primary text-primary px-8 py-3 font-label-md text-label-md rounded-DEFAULT hover:bg-primary hover:text-on-primary transition-all uppercase tracking-widest">
                  Read Our Story
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Process Highlight */}
        <section className="max-w-container-max mx-auto px-5 md:px-16 py-24 md:py-40 text-center">
          <h3 className="font-headline-lg text-headline-lg mb-16">Artisanal Integrity</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-primary mb-6">spa</span>
              <h4 className="font-label-md text-label-md uppercase tracking-widest mb-4">Pure Origin</h4>
              <p className="font-body-md text-body-md text-secondary">Sourcing only 100% organic cotton, silk, and heritage wool from ethical producers.</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-primary mb-6">pan_tool</span>
              <h4 className="font-label-md text-label-md uppercase tracking-widest mb-4">Zero Machine</h4>
              <p className="font-body-md text-body-md text-secondary">Every single piece in our collection is produced entirely by hand in our local atelier.</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="material-symbols-outlined text-4xl text-primary mb-6">all_inclusive</span>
              <h4 className="font-label-md text-label-md uppercase tracking-widest mb-4">Heirloom Quality</h4>
              <p className="font-body-md text-body-md text-secondary">Designed to transcend trends and be passed down through generations.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-surface-container-low mt-20 flex flex-col items-center gap-8 px-5 md:px-16 py-16 text-center mb-16 md:mb-0">
        <h2 className="font-headline-md text-headline-md text-primary uppercase tracking-[0.2em]">MoC Couture</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <Link className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all" to="/contact">Contact</Link>
          <a className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all" href="#">Instagram</a>
          <a className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all" href="#">Shipping</a>
          <a className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all" href="#">Care Guide</a>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-xs md:max-w-none">
          © 2024 MoC Couture. Handcrafted with intention.
        </p>
      </footer>
    </div>
  );
};

export default Home;
