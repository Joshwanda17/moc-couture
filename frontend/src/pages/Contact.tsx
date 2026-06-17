import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
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
      
      <main className="pt-24 pb-32">
        {/* Hero Section */}
        <section className="px-margin-mobile md:px-margin-desktop mb-16 max-w-container-max mx-auto">
          <div className="flex flex-col gap-4">
            <span className="font-label-md text-label-md text-primary uppercase tracking-[0.2em]">Contact Us</span>
            <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface leading-tight">Handcrafted pieces, <br/>Personalized care.</h2>
          </div>
        </section>

        {/* Contact Form & Details Grid */}
        <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Contact Form */}
          <div className="md:col-span-7 bg-surface-container-low p-8 md:p-12 shadow-[0_20px_40px_rgba(45,45,45,0.03)]">
            <form className="flex flex-col gap-10" onSubmit={handleSubmit}>
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
                className={`text-white font-label-md text-label-md py-4 px-12 self-start uppercase tracking-widest transition-all active:scale-95 ${
                  isSubmitting ? 'bg-tertiary-container' : 'bg-primary hover:opacity-90'
                }`} 
                type="submit"
              >
                {isSubmitting ? 'Sending...' : 'Send Inquiry'}
              </button>
            </form>
          </div>

          {/* Contact Options */}
          <div className="md:col-span-5 flex flex-col gap-12">
            {/* Connect */}
            <div className="flex flex-col gap-6">
              <h3 className="font-headline-md text-headline-md text-on-surface">Connect</h3>
              <div className="flex flex-col gap-4">
                <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors group" href="mailto:atelier@moccouture.com">
                  <span className="material-symbols-outlined text-xl">mail</span>
                  <span className="font-body-lg text-body-lg border-b border-transparent group-hover:border-primary transition-colors">atelier@moccouture.com</span>
                </a>
                <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors group" href="#">
                  <span className="material-symbols-outlined text-xl">chat</span>
                  <span className="font-body-lg text-body-lg border-b border-transparent group-hover:border-primary transition-colors">WhatsApp Us</span>
                </a>
                <a className="flex items-center gap-4 text-on-surface-variant hover:text-primary transition-colors group" href="#">
                  <span className="material-symbols-outlined text-xl">share</span>
                  <span className="font-body-lg text-body-lg border-b border-transparent group-hover:border-primary transition-colors">@moc_couture</span>
                </a>
              </div>
            </div>

            {/* Visit Us */}
            <div className="flex flex-col gap-6 border-t border-outline-variant/30 pt-12">
              <div className="flex justify-between items-start">
                <h3 className="font-headline-md text-headline-md text-on-surface">Visit Us</h3>
                <span className="font-label-md text-label-md bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full uppercase">Appointment Only</span>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-body-lg text-body-lg text-on-surface-variant">The Old Archive District, Studio 14</p>
                <p className="font-body-lg text-body-lg text-on-surface-variant">London, EC1V 9BD</p>
              </div>
              <div className="aspect-video w-full bg-surface-container-highest overflow-hidden shadow-[0_20px_40px_rgba(45,45,45,0.03)]">
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
        <section className="mt-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="h-[1px] w-full bg-outline-variant/30 mb-24"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <p className="font-headline-md text-headline-md italic text-primary leading-relaxed">
                "Every stitch tells a story of patience, every thread a commitment to the craft."
              </p>
            </div>
            <div className="order-1 md:order-2 h-80 overflow-hidden shadow-[0_20px_40px_rgba(45,45,45,0.03)]">
              <img 
                alt="Handcrafting detail" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1rP7bnf_8ECGwREmo2JEClq3FGsbg3W1e3KVbhxJeUWgilf2BIBrGBpxyIqNni60DINaaHqroZDzuhoVUdngPD9ubwJpi6rpzQa-dFMxiXZfRfixxpnZRckWUJaHObRYRVA548GWhrdwjGibmSV8eNEL_nopRlx6pRN_xKcpZWz62TN8m8X1J1Qcq-Mqs5QXRfgBlnAt6TcKKN-tPldvHl1GjOxo0cUxOrA5RBygvrMVSrz6AXuebSpSvMvLo3WdOxsf0LsMzrm4"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-low mt-20 flex flex-col items-center gap-8 px-margin-mobile py-16 text-center mb-16 md:mb-0">
        <h2 className="font-headline-md text-headline-md text-primary uppercase tracking-[0.2em]">MoC Couture</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <a className="text-secondary hover:text-primary underline transition-all font-body-md text-body-md opacity-80 hover:opacity-100" href="#">Instagram</a>
          <a className="text-secondary hover:text-primary underline transition-all font-body-md text-body-md opacity-80 hover:opacity-100" href="#">Pinterest</a>
          <a className="text-secondary hover:text-primary underline transition-all font-body-md text-body-md opacity-80 hover:opacity-100" href="#">Shipping</a>
          <a className="text-secondary hover:text-primary underline transition-all font-body-md text-body-md opacity-80 hover:opacity-100" href="#">Care Guide</a>
        </div>
        <p className="text-on-surface-variant font-body-md text-body-md">© 2024 MoC Couture. Handcrafted with intention.</p>
      </footer>
    </div>
  );
};

export default Contact;
