import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="bg-background text-on-background min-h-screen">
      <Navbar />
      
      <main className="pb-16">
        {/* Cover Section */}
        <section className="relative w-full h-screen min-h-[800px] flex items-end pb-24 px-margin-mobile md:px-margin-desktop">
          <div className="absolute inset-0 z-0">
            <img 
              src="/images/mercy-bayo.jpg"
              alt="Mercy Bayo Portrait"
              className="w-full h-full object-cover object-center md:object-top"
            />
            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-5xl text-white w-full">
            <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg uppercase tracking-wider mb-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              The Hands Behind The Art
            </h1>
            <p className="font-body-lg text-body-lg md:text-2xl text-white/90 max-w-3xl leading-relaxed italic border-l-4 border-primary pl-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              Meet Mercy Bayo, founder of MoC Couture, where every creation begins with craftsmanship, imagination, and the belief that handmade fashion tells a story no machine can replicate.
            </p>
          </div>
        </section>

        {/* Editorial Story */}
        <section className="px-margin-mobile md:px-margin-desktop py-16 md:py-24 bg-surface">
          <div className="max-w-4xl mx-auto space-y-12 font-body-lg text-body-lg md:text-xl text-on-surface-variant leading-relaxed">
            <p className="first-letter:text-7xl first-letter:font-display-lg first-letter:text-primary first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8]">
              In a world of mass production, where thousands of identical pieces roll off factory lines every day, Mercy Bayo chose a different path.
            </p>
            <p className="font-bold text-on-surface text-2xl md:text-3xl font-display-md">
              She chose to create by hand.
            </p>
            <p>
              MoC Couture was born from a love for craftsmanship, patience, and the belief that fashion should feel personal. Every piece begins not in a machine, but in the hands of a maker who understands that beauty lives in the details.
            </p>
            <p>
              Mercy does not describe her work as simply "knotted." To her, every creation is carefully handmade. Every stitch is intentional. Every fabric selection is thoughtful. Every finished piece carries hours of dedication, creativity, and care.
            </p>
            <p>
              Her work blends the timeless artistry of crochet with carefully chosen fabrics, creating pieces that feel both classic and contemporary. The result is fashion that cannot be rushed, copied, or mass-produced.
            </p>
          </div>
        </section>

        {/* Craftsmanship Image Break */}
        <section className="w-full h-[60vh] relative">
           <img 
              alt="Hands at work crochet process" 
              className="w-full h-full object-cover bg-fixed" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuXIgyFaeZ_Z3LG_QfTarSoA9hbayynmpJ--zExwnBmrFhj0XfNbambesqAZL7ObOfrfCmN1QiWvOFxO7ZUIY3jNyHo65Ha31KGmsgehk3Rhx4iI378Cm9_22HSbh8rSOIvb5s0Kr5u8lbNqujLeIDdRx1h1mpSv_LW4Egk2wP3Ffx7ODvNwqw_PNGxNZ1B27QWL0jLrLQgLEe71XV_JcNEaySKn9uKi7_AgMW_vmagLXuim8l5YRAgMAHPgoy7kYYmvFPzw_389I"
            />
        </section>

        {/* Philosophy Section */}
        <section className="px-margin-mobile md:px-margin-desktop py-16 md:py-24 bg-secondary-container">
          <div className="max-w-4xl mx-auto space-y-8 font-body-lg text-body-lg md:text-xl text-on-secondary-container leading-relaxed">
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-primary mb-16 text-center">
              Each creation tells its own story.
            </h2>
            <p>
              Some are inspired by texture. Others by color, culture, nature, or the everyday beauty found in ordinary moments. What connects them all is the belief that true craftsmanship should be visible in the final piece.
            </p>
            <p>
              For Mercy, handmade means more than a process. It is a philosophy.
            </p>
            <p className="pl-8 border-l-2 border-primary/50 py-4 italic text-2xl font-display-md">
              It means taking the time to create something meaningful. It means valuing quality over quantity. It means celebrating individuality in a world that often rewards uniformity.
            </p>
            <p>
              When someone wears a MoC Couture piece, they are not simply wearing an accessory or a garment. They are carrying a piece of a creative journey—one shaped by imagination, patience, and human hands.
            </p>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="px-margin-mobile md:px-margin-desktop py-16 md:py-24 text-center bg-background">
          <div className="max-w-4xl mx-auto">
            <p className="font-headline-md text-headline-md md:text-4xl text-on-surface mb-16 leading-tight italic">
              "MoC Couture exists to remind us that fashion can still be personal. That beauty can still be handcrafted. And that the most memorable pieces are often those made with care, one stitch at a time."
            </p>
            <div className="space-y-4">
              <p className="font-display-md text-display-md text-primary uppercase tracking-[0.2em]">
                This is not fast fashion.
              </p>
              <p className="font-display-lg text-display-lg md:text-6xl text-on-surface uppercase tracking-[0.1em] font-bold">
                This is handmade artistry.
              </p>
            </div>
            
            <div className="mt-32">
               <div className="relative group overflow-hidden">
                 <img 
                   src="https://lh3.googleusercontent.com/aida-public/AB6AXuACAxcgmChlH1OWXHBaeR09DnSaKLsw9RNgrQ8rEf6CBXlosj2vC7HIgYbbtgLKnkslrnLqw1W_91zjx27tLPlX6FGW7CZ5bBTL6YxRGG8zgJ-hEdGzHGZOhbMUcMXwYpBYIZb7YHg5a_Y-HM10NOB57zfB4BGLe15U8E6uKFvzq19aJTQaziS81WW95BYpZWPwH_CgUftwUK57tRWRp4KKQ8BRPCn8Y5j75oLrN5FXqErQkjg08JLS9nR3LO46ZIzlKMr_G2rfN2U"
                   alt="Studio Workspace"
                   className="w-full max-w-3xl mx-auto aspect-video object-cover grayscale opacity-80 group-hover:scale-105 transition-transform duration-1000"
                 />
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-black/20">
                   <p className="font-display-md text-white tracking-[0.3em] uppercase text-xl">The Studio</p>
                 </div>
               </div>
               <p className="mt-8 font-label-md text-label-md uppercase tracking-widest text-secondary">
                 Inside the MoC Couture Studio
               </p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default About;
