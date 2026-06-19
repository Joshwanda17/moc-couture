import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate sending
    setTimeout(() => {
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
      toast({
        title: "Sent Successfully",
        description: "We've received your inquiry and will respond shortly.",
      });
    }, 1500);
  };

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-12">
        {/* Hero Section */}
        <section className="px-margin-mobile md:px-margin-desktop mb-12 max-w-container-max mx-auto">
          <div className="flex flex-col gap-4">
            <span className="font-label-md text-label-md text-primary uppercase tracking-[0.2em]">Contact Us</span>
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight">Handcrafted pieces, <br/>Personalized care.</h2>
          </div>
        </section>

        {/* Contact Form & Details Grid */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Contact Form */}
          <div className="md:col-span-7 bg-surface-container-low p-6 md:p-10 shadow-[0_20px_40px_rgba(45,45,45,0.03)] border border-outline-variant/20">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <div className="relative">
                <input 
                  required
                  className="w-full border-0 border-b border-outline-variant bg-transparent font-body-lg text-body-lg py-2 focus:ring-0 focus:border-b-primary transition-colors" 
                  id="name" 
                  name="name" 
                  placeholder="Full Name" 
                  type="text"
                />
              </div>
              <div className="relative">
                <input 
                  required
                  className="w-full border-0 border-b border-outline-variant bg-transparent font-body-lg text-body-lg py-2 focus:ring-0 focus:border-b-primary transition-colors" 
                  id="email" 
                  name="email" 
                  placeholder="Email Address" 
                  type="email"
                />
              </div>
              <div className="relative">
                <textarea 
                  required
                  className="w-full border-0 border-b border-outline-variant bg-transparent font-body-lg text-body-lg py-2 focus:ring-0 focus:border-b-primary transition-colors resize-none" 
                  id="message" 
                  name="message" 
                  placeholder="Your Message" 
                  rows={4}
                ></textarea>
              </div>
              <button 
                disabled={isSubmitting}
                className={`text-white font-label-md text-label-md py-4 px-12 mt-4 self-start uppercase tracking-widest transition-all active:scale-95 ${
                  isSubmitting ? 'bg-tertiary-container' : 'bg-primary hover:opacity-90'
                }`} 
                type="submit"
              >
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          </div>

          {/* Contact Options */}
          <div className="md:col-span-5 flex flex-col gap-8">
            {/* Connect */}
            <div className="flex flex-col gap-4">
              <h3 className="font-headline-md text-headline-md text-on-surface">Connect</h3>
              <div className="flex flex-col gap-3">
                <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors group" href="mailto:atelier@moccouture.com">
                  <span className="material-symbols-outlined text-xl">mail</span>
                  <span className="font-body-lg text-body-lg border-b border-transparent group-hover:border-primary transition-colors">atelier@moccouture.com</span>
                </a>
                <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors group" href="https://wa.me/256706052465" target="_blank" rel="noopener noreferrer">
                  <span className="material-symbols-outlined text-xl">chat</span>
                  <span className="font-body-lg text-body-lg border-b border-transparent group-hover:border-primary transition-colors">+256 706 052465</span>
                </a>
                <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors group" href="#">
                  <span className="material-symbols-outlined text-xl">share</span>
                  <span className="font-body-lg text-body-lg border-b border-transparent group-hover:border-primary transition-colors">@moc_couture</span>
                </a>
              </div>
            </div>

            {/* Visit Us */}
            <div className="flex flex-col gap-6 border-t border-outline-variant/30 pt-8">
              <div className="flex justify-between items-start">
                <h3 className="font-headline-md text-headline-md text-on-surface">Visit Us</h3>
                <span className="font-label-md text-label-md bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full uppercase">Appointment Only</span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-body-lg text-body-lg text-on-surface-variant">Entebbe, Uganda</p>
              </div>
              <div className="aspect-[2/1] w-full bg-surface-container-highest overflow-hidden shadow-[0_20px_40px_rgba(45,45,45,0.03)] border border-outline-variant/20">
                <img 
                  alt="Luxury Atelier Interior" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjLY_8_Hxzu2pNmrnJ_oMYJLsm4PKVO8A5OWsGAVKKwkSF5UzbPpAtp9gny8EML6SjvBWI_gA97iSpJV6YxYjaF-4-9Im-fMytq9PSSPxaZSMJX1TPt2x5QXwRDvOJ8JYB_AZUdDlP-WEpjPpQ3NS4SCbgsm-p4V_78cKRC9GoE95FRiEIgoKX-Ecb3gue4gymHfTlRhFrgBZIx5Qr1vRD5nbg5xIBbX4QwO8KBFKFzMv70SNRsrUurH1s_I309s8jSs08qWv96lY"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Aesthetic Spacer / Collection Teaser */}
        <section className="mt-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="h-[1px] w-full bg-outline-variant/30 mb-16"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <p className="font-headline-md text-headline-md italic text-primary leading-relaxed max-w-md">
                "Every stitch tells a story of patience, every thread a commitment to the craft."
              </p>
            </div>
            <div className="order-1 md:order-2 h-64 overflow-hidden shadow-[0_20px_40px_rgba(45,45,45,0.03)] border border-outline-variant/20">
              <img 
                alt="Handcrafting detail" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1rP7bnf_8ECGwREmo2JEClq3FGsbg3W1e3KVbhxJeUWgilf2BIBrGBpxyIqNni60DINaaHqroZDzuhoVUdngPD9ubwJpi6rpzQa-dFMxiXZfRfixxpnZRckWUJaHObRYRVA548GWhrdwjGibmSV8eNEL_nopRlx6pRN_xKcpZWz62TN8m8X1J1Qcq-Mqs5QXRfgBlnAt6TcKKN-tPldvHl1GjOxo0cUxOrA5RBygvrMVSrz6AXuebSpSvMvLo3WdOxsf0LsMzrm4"
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
