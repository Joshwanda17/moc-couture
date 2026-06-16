import Navbar from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

const Contact = () => {
  const { items } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message Sent. Thank you for reaching out to MoC Couture.");
  };

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Navbar cartItemCount={items.length} />
      
      <main className="pt-24 pb-20 md:pt-32">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          
          <div className="text-center mb-16 md:mb-24 mt-8">
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase mb-4 block">Inquiries</span>
            <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg mb-6">
              Contact the Atelier
            </h1>
            <p className="font-body-lg text-body-lg text-secondary max-w-2xl mx-auto leading-relaxed">
              Whether you have a question about our collections, need help with an order, or want to discuss a bespoke piece.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter lg:gap-24 mb-24">
            
            {/* Contact Details */}
            <div className="md:col-span-5 space-y-12 flex flex-col pt-8">
              <div className="flex items-start space-x-6">
                <span className="material-symbols-outlined text-primary text-3xl">mail</span>
                <div>
                  <h3 className="font-headline-md text-headline-md mb-2">Email</h3>
                  <p className="font-body-md text-body-md text-secondary mb-2">For general inquiries and customer support:</p>
                  <a href="mailto:hello@moccouture.com" className="font-body-md text-body-md text-primary hover:underline">hello@moccouture.com</a>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <span className="material-symbols-outlined text-primary text-3xl">phone</span>
                <div>
                  <h3 className="font-headline-md text-headline-md mb-2">Phone</h3>
                  <p className="font-body-md text-body-md text-secondary mb-2">Available Mon-Fri, 9am - 5pm EAT:</p>
                  <p className="font-body-md text-body-md text-on-surface">+256 123 456 789</p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
                <div>
                  <h3 className="font-headline-md text-headline-md mb-2">Studio</h3>
                  <p className="font-body-md text-body-md text-secondary mb-2">Visits by appointment only.</p>
                  <p className="font-body-md text-body-md text-on-surface">Kampala, Uganda</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-7 bg-surface-container-low p-8 md:p-12 border border-outline-variant/30">
              <h2 className="font-headline-lg text-headline-lg mb-8">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="font-label-md text-label-md block text-secondary uppercase">Name</label>
                  <input required className="w-full bg-background border border-outline-variant/50 px-4 py-3 font-body-md focus:border-primary outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md block text-secondary uppercase">Email</label>
                  <input type="email" required className="w-full bg-background border border-outline-variant/50 px-4 py-3 font-body-md focus:border-primary outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md block text-secondary uppercase">Subject</label>
                  <input required className="w-full bg-background border border-outline-variant/50 px-4 py-3 font-body-md focus:border-primary outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-label-md block text-secondary uppercase">Message</label>
                  <textarea required className="w-full min-h-[150px] bg-background border border-outline-variant/50 px-4 py-3 font-body-md focus:border-primary outline-none transition-colors" />
                </div>
                <button type="submit" className="w-full bg-primary text-on-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-all active:scale-[0.98]">
                  Send Message
                </button>
              </form>
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

export default Contact;
