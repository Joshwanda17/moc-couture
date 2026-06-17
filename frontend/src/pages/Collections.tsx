import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Collections = () => {
  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-32 md:pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Hero Section */}
        <section className="mb-20 text-center md:text-left">
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4">The Archive of Form</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Explore our curation of handcrafted silhouettes, where every stitch tells a story of patience, heritage, and the rhythm of the artisan's hands.
          </p>
        </section>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12">
          {/* Featured Card (Large) */}
          <div className="lg:col-span-8 group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
            <Link to="/gallery">
              <div className="relative overflow-hidden aspect-[16/9] mb-6 rounded-lg shadow-[0_20px_30px_rgba(45,45,45,0.05)]">
                <img 
                  alt="Summer Solstice" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtfyxe_W9iwjsyWCxCzefkq-Wlcag8s_RDUtzxAhxX3VxSFUG7WuKckYyi_BoSd-32KdLiS14T9dKnB1d4qEMpdIMz64R1oZNfPeCCdp8An5M1-TEDES2FHHLjahTA80CL1kVz2SA15Ctd9Ia-1qWWGXgjLQOzTl9zZRgZMnE-iTsFSVP-hR4Zfs-jotiJ7ymBTW47weHh7hgQ5okZUnKPNLfKAsOF-6O9MjxsC2h6OYGjJysmzOMko3C-EUIjVUN1sXoXiPx8TVE"
                />
                <div className="absolute inset-0 bg-black/10 transition-opacity group-hover:opacity-0"></div>
              </div>
              <div className="flex justify-between items-baseline">
                <h3 className="font-headline-lg text-headline-lg text-on-surface">Summer Solstice</h3>
                <span className="font-label-md text-label-md text-secondary uppercase tracking-widest">Collection 01</span>
              </div>
              <div className="mt-2 h-px bg-outline-variant/30 w-full"></div>
            </Link>
          </div>

          {/* Small Card 1 */}
          <div className="lg:col-span-4 group cursor-pointer mt-0 md:mt-24 hover:-translate-y-1 transition-transform duration-300">
            <Link to="/gallery">
              <div className="relative overflow-hidden aspect-[3/4] mb-6 rounded-lg shadow-[0_20px_30px_rgba(45,45,45,0.05)]">
                <img 
                  alt="Urban Weave" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDGYW2Wlgfm-VkYWxSAT1cQC2NMcyy5xPSGg0-Hthgc3TgQxcUlhGYxqGjtZnenkYVOXJuOIhZtM2YfkB_344ZMWeJSXH8fsMLNJJQBHDQ-Tqv99OJ76esM1fSHGbWG4VROP0mO1hKXBJznIW7myEwzPToYD6AIcQobLenKp0F6s2r5VtwMGEA8WnVoo5QDVgHHhAIXOkbmqkCfYDvT2W__cpjwiW5SnluuX_lBLxDyUfShkclhNWLVHmlCpwxXeE5zRdmY3sW8_Dk"
                />
              </div>
              <div className="flex justify-between items-baseline">
                <h3 className="font-headline-md text-headline-md text-on-surface">Urban Weave</h3>
                <span className="font-label-md text-label-md text-secondary uppercase tracking-widest">Collection 02</span>
              </div>
              <div className="mt-2 h-px bg-outline-variant/30 w-full"></div>
            </Link>
          </div>

          {/* Small Card 2 */}
          <div className="lg:col-span-5 group cursor-pointer hover:-translate-y-1 transition-transform duration-300">
            <Link to="/gallery">
              <div className="relative overflow-hidden aspect-[4/5] mb-6 rounded-lg shadow-[0_20px_30px_rgba(45,45,45,0.05)]">
                <img 
                  alt="Ethereal Threads" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAHFtfeU0ZeD_sh31cMCmalC6duwQo5pt83Y8kjD4i9rcOYwfPbEzVg8UP2CEK6pnFTTk9lQonGZMni7LaZVYgKKq41mpEzmcUGd5qRYYP6st0VLgVRF44YjaRZmiUhr47buS5dX4mi2JTk3DzN3z6TMhdZkStLuLvLz5CdRA75ddXs6aIdNgcg87C_fvH0KZK0xYe2pWw_BeGpAnRzIb4D7-fL-wkMG1s7zUS1lGXsSCGaI44r7mApruKLLUAB86MbsArP7tJP7U4"
                />
              </div>
              <div className="flex justify-between items-baseline">
                <h3 className="font-headline-md text-headline-md text-on-surface">Ethereal Threads</h3>
                <span className="font-label-md text-label-md text-secondary uppercase tracking-widest">Collection 03</span>
              </div>
              <div className="mt-2 h-px bg-outline-variant/30 w-full"></div>
            </Link>
          </div>

          {/* Medium Card */}
          <div className="lg:col-span-7 group cursor-pointer md:-mt-12 hover:-translate-y-1 transition-transform duration-300">
            <Link to="/gallery">
              <div className="relative overflow-hidden aspect-[4/3] mb-6 rounded-lg shadow-[0_20px_30px_rgba(45,45,45,0.05)]">
                <img 
                  alt="Nordic Knot" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAcxh_tvjYkClxGVyAy-b3jtkUFbeR-t7i9dX9xrSd_6dlUf7tDqLpr3-tx9hMhLfODPvEu6YAXJxO-nsGqZvfca5baxMItRYppojq3TBU28jtqQAJrveQUxJvX-s_jvfJqF_yM7vYq3xRFa8PBNcCkmOhas7yZ1W73m8eT3ZsxfRaJRkMdY5U-03lodwfjpkZeoHuDV9ba47nhqouWGEGFE4-XhIrfcvk5qq0VWfbMwpcaDhpDag6mDKteYvCRoqIrYFmwHn_QXA"
                />
              </div>
              <div className="flex justify-between items-baseline">
                <h3 className="font-headline-lg text-headline-lg text-on-surface">Nordic Knot</h3>
                <span className="font-label-md text-label-md text-secondary uppercase tracking-widest">Collection 04</span>
              </div>
              <div className="mt-2 h-px bg-outline-variant/30 w-full"></div>
            </Link>
          </div>
        </div>

        {/* Designer Note Section */}
        <section className="mt-32 p-12 bg-surface-container-low rounded-lg flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <span className="font-label-md text-label-md text-primary mb-4 block tracking-widest">THE ATELIER PHILOSOPHY</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6">"Patience is the invisible thread that binds every garment we create."</h2>
            <Link to="/about">
              <button className="bg-primary text-on-primary px-8 py-3 font-label-md text-label-md uppercase tracking-widest transition-transform hover:scale-105 active:scale-95">
                Read Journal
              </button>
            </Link>
          </div>
          <div className="md:w-1/2 aspect-video rounded-lg overflow-hidden shadow-[0_20px_30px_rgba(45,45,45,0.05)]">
            <img 
              alt="The Process" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcKNVSgNN8I-pFhOdJHE64MoSuPP7P1-s1ihcZiYFhfQCFYcuvDchuZBQy29jFSD52xYTcBsVQhrOj_WczOy1oeZK3RpPcoLh5NYvHB8X0qIBKKTCXrFvIetIlDRm2ssErW62-SiZXSSph-XG0lUxAYsgHox-ZBGqXhHb6HDaUvNMPYrlTeLJsbHQB_VTYe57Hg6MNGNKRgeiuQSjO8usqan4vE9_Sr_3HQivBoQtqUcd7EiOaqd9b0w6L1AnbRj7seJlp3Hn8cnM"
            />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-surface-container-low mt-20 flex flex-col items-center gap-8 px-5 py-16 text-center mb-16 md:mb-0">
        <h2 className="font-headline-md text-headline-md text-primary uppercase tracking-widest">MoC Couture</h2>
        <div className="flex gap-8 flex-wrap justify-center">
          <Link className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all" to="/contact">Contact</Link>
          <a className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all" href="#">Instagram</a>
          <a className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all" href="#">Shipping</a>
          <a className="font-body-md text-body-md text-secondary hover:text-primary underline transition-all" href="#">Care Guide</a>
        </div>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">© 2024 MoC Couture. Handcrafted with intention.</p>
      </footer>
    </div>
  );
};

export default Collections;
