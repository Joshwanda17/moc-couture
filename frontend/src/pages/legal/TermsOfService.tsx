import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
          
          <div className="mb-20 text-center">
            <h1 className="font-display-lg text-primary mb-8 tracking-tight">Terms of Service</h1>
            <p className="font-headline-md italic text-secondary leading-relaxed border-t border-b border-outline-variant/30 py-8">
              "Great craftsmanship begins with clear expectations."
            </p>
          </div>

          <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary prose-p:font-body-lg prose-p:text-on-surface-variant max-w-none">
            <h3 className="font-headline-lg mb-4 mt-12">Acceptance</h3>
            <p className="font-body-lg text-on-surface-variant mb-8">
              By using the MoC Couture website, you agree to these terms.
            </p>

            <h3 className="font-headline-lg mb-4 mt-12">Product Information</h3>
            <p className="font-body-lg text-on-surface-variant bg-surface-container-low p-6 border-l-4 border-primary italic mb-8">
              Every MoC Couture piece is handmade. As a result, slight variations in color, texture, and finish may occur. These variations are part of the beauty and uniqueness of handmade craftsmanship.
            </p>

            <h3 className="font-headline-lg mb-4 mt-12">Pricing</h3>
            <p className="font-body-lg text-on-surface-variant mb-8">
              Due to the fluctuating cost of premium materials, prices are subject to change without notice.
            </p>

            <h3 className="font-headline-lg mb-4 mt-12">Orders</h3>
            <p className="font-body-lg text-on-surface-variant mb-8">
              We reserve the right to decline or cancel orders when necessary, particularly during periods of exceptionally high demand that would compromise our quality standards.
            </p>

            <h3 className="font-headline-lg mb-4 mt-12">Intellectual Property</h3>
            <p className="font-body-lg text-on-surface-variant mb-8">
              All images, designs, branding, and content belong to MoC Couture. They may not be reproduced, copied, or used without our explicit written permission.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
