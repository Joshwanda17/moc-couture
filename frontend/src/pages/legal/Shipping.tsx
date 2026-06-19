import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Shipping = () => {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
          
          <div className="mb-20 text-center">
            <h1 className="font-display-lg text-primary mb-8 tracking-tight">Shipping & Delivery</h1>
            <p className="font-headline-md italic text-secondary leading-relaxed border-t border-b border-outline-variant/30 py-8">
              "Good things take time, especially when they are made by hand."
            </p>
          </div>

          <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary prose-p:font-body-lg prose-p:text-on-surface-variant max-w-none">
            
            <div className="bg-surface-container-low p-8 border border-outline-variant/20 mb-12 shadow-sm">
              <h3 className="font-headline-lg mb-4 text-primary">The Handmade Notice</h3>
              <p className="font-body-lg text-on-surface-variant italic">
                Unlike mass-produced products, handmade pieces require time, care, and attention to detail. We appreciate your patience while we create something special for you.
              </p>
            </div>

            <h3 className="font-headline-lg mb-4 mt-12">Processing Time</h3>
            <p className="font-body-lg text-on-surface-variant mb-8">
              Every MoC Couture piece is handmade. Please allow <strong>3-7 business days</strong> for preparation and craftsmanship before shipment.
            </p>

            <h3 className="font-headline-lg mb-6 mt-12">Delivery Times</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="border border-outline-variant/30 p-6 text-center">
                <h4 className="font-label-md uppercase tracking-widest text-secondary mb-2">Uganda</h4>
                <p className="font-headline-md text-primary">1-3 Days</p>
                <p className="text-sm text-on-surface-variant mt-2">Business Days</p>
              </div>
              <div className="border border-outline-variant/30 p-6 text-center">
                <h4 className="font-label-md uppercase tracking-widest text-secondary mb-2">East Africa</h4>
                <p className="font-headline-md text-primary">3-7 Days</p>
                <p className="text-sm text-on-surface-variant mt-2">Business Days</p>
              </div>
              <div className="border border-outline-variant/30 p-6 text-center">
                <h4 className="font-label-md uppercase tracking-widest text-secondary mb-2">International</h4>
                <p className="font-headline-md text-primary">7-21 Days</p>
                <p className="text-sm text-on-surface-variant mt-2">Business Days</p>
              </div>
            </div>

            <h3 className="font-headline-lg mb-4 mt-12">Tracking</h3>
            <p className="font-body-lg text-on-surface-variant mb-8">
              Tracking information will be provided via email or WhatsApp once your custom order securely leaves our studio.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Shipping;
