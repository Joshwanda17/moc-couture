import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Craftsmanship = () => {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-12 pb-16">
        {/* Hero Section */}
        <section className="px-margin-mobile md:px-margin-desktop mb-16 max-w-container-max mx-auto text-center">
          <span className="font-label-md text-label-md text-primary uppercase tracking-[0.2em] mb-4 block">Our Process</span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-8 tracking-tight">The Art of Handmade</h1>
          <p className="font-headline-md italic text-secondary leading-relaxed max-w-3xl mx-auto">
            "Every stitch tells a story of patience, every thread a commitment to the craft."
          </p>
        </section>

        {/* Philosophy Section */}
        <section className="px-margin-mobile md:px-margin-desktop mb-24 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 aspect-[4/5] bg-surface-container-high overflow-hidden shadow-sm">
            <img 
              src="/images/collections/crochet.jpg" 
              alt="Hands working on crochet" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="font-display-md text-primary mb-6">Not Manufactured. Made.</h2>
            <p className="font-body-lg text-on-surface-variant leading-relaxed mb-6">
              In a world dominated by fast fashion and automated assembly lines, MoC Couture takes a defiant step backwards into tradition. We believe that true luxury cannot be mass-produced. 
            </p>
            <p className="font-body-lg text-on-surface-variant leading-relaxed">
              Every garment that leaves our atelier is the result of hours, sometimes days, of meticulous hand-crocheting and careful fabric integration by our founder, Mercy Bayo. There are no shortcuts.
            </p>
          </div>
        </section>

        {/* The Process Grid */}
        <section className="bg-surface-container-low py-32 px-margin-mobile md:px-margin-desktop">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-display-md text-primary mb-4">From Thread to Form</h2>
              <p className="font-body-lg text-secondary max-w-2xl mx-auto">The journey of a MoC Couture piece.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col gap-6">
                <div className="aspect-[4/3] overflow-hidden bg-surface-container-high">
                  <img src="/images/collections/Butterfly Shawl, crocheted.webp" alt="Selecting yarns" className="w-full h-full object-cover grayscale-[20%]" />
                </div>
                <h3 className="font-headline-md text-primary">01. Sourcing Materials</h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  We begin with the finest yarns and premium fabrics, carefully selected for their texture, durability, and how they drape against the skin.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="aspect-[4/3] overflow-hidden bg-surface-container-high">
                  <img src="/images/collections/Crochê é Moda Sempre.webp" alt="Crochet process" className="w-full h-full object-cover grayscale-[20%]" />
                </div>
                <h3 className="font-headline-md text-primary">02. The Hook & The Hand</h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  Using traditional crochet techniques, patterns are slowly built loop by loop. This organic process allows for micro-adjustments that machines simply cannot replicate.
                </p>
              </div>

              <div className="flex flex-col gap-6">
                <div className="aspect-[4/3] overflow-hidden bg-surface-container-high">
                  <img src="/images/collections/720787115415847594.jpg" alt="Detail finishing" className="w-full h-full object-cover grayscale-[20%]" />
                </div>
                <h3 className="font-headline-md text-primary">03. Finishing & Integration</h3>
                <p className="font-body-md text-on-surface-variant leading-relaxed">
                  The delicate crochet work is then seamlessly integrated with structural fabrics. Every hem, seam, and edge is finished by hand to ensure longevity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Quality Standards Quote */}
        <section className="py-32 px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto text-center">
          <span className="material-symbols-outlined text-4xl text-primary/30 mb-8 block">format_quote</span>
          <h2 className="font-display-sm text-primary leading-relaxed mb-8">
            "When you wear MoC Couture, you are not just wearing a garment. You are wearing the time, energy, and artistic intention of the person who made it."
          </h2>
          <span className="font-label-md text-secondary uppercase tracking-widest">— Mercy Bayo</span>
        </section>

        {/* Detail Image */}
        <section className="px-margin-mobile md:px-margin-desktop mb-16 max-w-container-max mx-auto">
          <div className="w-full aspect-video md:aspect-[21/9] bg-surface-container-high overflow-hidden shadow-sm">
            <img 
              src="/images/collections/Crochet Blossom dress 🍀 💚.jpg" 
              alt="Close up of crochet texture" 
              className="w-full h-full object-cover"
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Craftsmanship;
