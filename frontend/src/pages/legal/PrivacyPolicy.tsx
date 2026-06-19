import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
          
          <div className="mb-20 text-center">
            <h1 className="font-display-lg text-primary mb-8 tracking-tight">Privacy Policy</h1>
            <p className="font-headline-md italic text-secondary leading-relaxed border-t border-b border-outline-variant/30 py-8">
              "Trust is woven into every relationship, just as craftsmanship is woven into every piece."
            </p>
          </div>

          <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary prose-p:font-body-lg prose-p:text-on-surface-variant max-w-none">
            <p className="font-body-lg text-xl leading-relaxed mb-12">
              At MoC Couture, we respect your privacy and are committed to protecting your personal information.
            </p>

            <h3 className="font-headline-lg mb-4 mt-12">Information We Collect</h3>
            <ul className="list-disc pl-6 space-y-2 mb-8 font-body-lg text-on-surface-variant">
              <li>Name</li>
              <li>Email</li>
              <li>Phone Number</li>
              <li>Shipping Address</li>
              <li>Order Information</li>
            </ul>

            <h3 className="font-headline-lg mb-4 mt-12">Why We Collect It</h3>
            <ul className="list-disc pl-6 space-y-2 mb-8 font-body-lg text-on-surface-variant">
              <li>To process and deliver your custom orders</li>
              <li>To respond promptly to your inquiries</li>
              <li>To improve your customer experience</li>
              <li>To send updates if you have subscribed to our atelier newsletter</li>
            </ul>

            <h3 className="font-headline-lg mb-4 mt-12">Data Protection</h3>
            <p className="font-body-lg text-on-surface-variant bg-surface-container-low p-6 border-l-4 border-primary italic">
              We never sell your personal information to third parties. Your data is handled with the same care and respect as our garments.
            </p>

            <h3 className="font-headline-lg mb-4 mt-16">Contact</h3>
            <p className="font-body-lg text-on-surface-variant">
              Questions about your privacy?
              <br /><br />
              Contact us at:<br />
              <a href="mailto:atelier@moccouture.com" className="text-primary underline hover:text-secondary transition-colors">atelier@moccouture.com</a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
