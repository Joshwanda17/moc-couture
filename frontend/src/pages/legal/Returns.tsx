import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Returns = () => {
  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop">
          
          <div className="mb-20 text-center">
            <h1 className="font-display-lg text-primary mb-8 tracking-tight">Returns & Exchanges</h1>
            <p className="font-headline-md italic text-secondary leading-relaxed border-t border-b border-outline-variant/30 py-8">
              "Every handmade creation deserves thoughtful consideration."
            </p>
          </div>

          <div className="prose prose-lg prose-headings:font-display prose-headings:text-primary prose-p:font-body-lg prose-p:text-on-surface-variant max-w-none">
            <p className="font-body-lg text-xl leading-relaxed mb-12">
              Because every piece is carefully handmade, we encourage customers to review product details before purchasing.
            </p>

            <h3 className="font-headline-lg mb-4 mt-12">Return Eligibility</h3>
            <p className="font-body-lg text-on-surface-variant mb-4">
              Returns are accepted within 7 days of delivery. To be eligible, the item must be:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-8 font-body-lg text-on-surface-variant">
              <li>Unused</li>
              <li>Undamaged</li>
              <li>In its original condition</li>
            </ul>

            <h3 className="font-headline-lg mb-4 mt-12">Non-Returnable Items</h3>
            <p className="font-body-lg text-on-surface-variant bg-surface-container-low p-6 border-l-4 border-error/50 italic mb-8">
              Custom-made and personalized orders cannot be returned unless defective.
            </p>

            <h3 className="font-headline-lg mb-4 mt-12">Exchanges</h3>
            <p className="font-body-lg text-on-surface-variant mb-8">
              If your item arrives damaged or incorrect, we will gladly arrange an exchange. Please contact us immediately with photographs of the item.
            </p>

            <h3 className="font-headline-lg mb-4 mt-12">Refund Process</h3>
            <p className="font-body-lg text-on-surface-variant mb-8">
              Refunds are processed after thorough inspection of returned items to ensure they meet our return criteria. Please allow 5-7 business days for the refund to reflect in your account.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Returns;
