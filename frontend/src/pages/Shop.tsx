import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/lib/api";

const Shop = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("");
  const [activeCollection, setActiveCollection] = useState<string>("");
  const [activeAvailability, setActiveAvailability] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, colls] = await Promise.all([
          api.getCategories(),
          api.getCollections()
        ]);
        setCategories(cats);
        setCollections(colls);
      } catch (err) {
        console.error("Error fetching filters:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await api.getProducts({
          search,
          category: activeCategory,
          collection: activeCollection,
          availability: activeAvailability
        });
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    
    // Simple debounce for search
    const timer = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(timer);
  }, [search, activeCategory, activeCollection, activeAvailability]);

  return (
    <div className="bg-background text-on-surface min-h-screen">
      <Navbar />
      
      <main className="pt-24 pb-16 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        {/* Shop Hero */}
        <section className="mb-12">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary mb-4 tracking-tight">SHOP</h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Explore our complete collection of handcrafted crochet and fabric creations. Designed with intention, made to last.
          </p>
        </section>

        {/* Filters and Search */}
        <section className="mb-12 flex flex-col md:flex-row gap-6 bg-surface-container-low p-6 rounded-lg border border-outline-variant/30">
          <div className="flex-1">
            <label className="font-label-md text-label-md block mb-2 text-secondary uppercase tracking-widest">Search</label>
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full border-b border-outline-variant bg-transparent py-2 font-body-md focus:border-primary outline-none transition-colors"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <label className="font-label-md text-label-md block mb-2 text-secondary uppercase tracking-widest">Category</label>
            <select 
              className="w-full border-b border-outline-variant bg-transparent py-2 font-body-md focus:border-primary outline-none transition-colors"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-48">
            <label className="font-label-md text-label-md block mb-2 text-secondary uppercase tracking-widest">Collection</label>
            <select 
              className="w-full border-b border-outline-variant bg-transparent py-2 font-body-md focus:border-primary outline-none transition-colors"
              value={activeCollection}
              onChange={(e) => setActiveCollection(e.target.value)}
            >
              <option value="">All Collections</option>
              {collections.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className="w-full md:w-48">
            <label className="font-label-md text-label-md block mb-2 text-secondary uppercase tracking-widest">Availability</label>
            <select 
              className="w-full border-b border-outline-variant bg-transparent py-2 font-body-md focus:border-primary outline-none transition-colors"
              value={activeAvailability}
              onChange={(e) => setActiveAvailability(e.target.value)}
            >
              <option value="">Any Status</option>
              <option value="Available">Available</option>
              <option value="Made To Order">Made To Order</option>
              <option value="Sold Out">Sold Out</option>
            </select>
          </div>
        </section>

        {/* Product Grid */}
        <section>
          {loading ? (
            <div className="py-20 text-center text-secondary font-label-md tracking-widest uppercase">Loading products...</div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center bg-surface-container-low rounded-lg border border-outline-variant/30">
              <p className="font-body-lg text-body-lg text-on-surface-variant">No products found matching your filters.</p>
              <button 
                onClick={() => { setSearch(''); setActiveCategory(''); setActiveCollection(''); setActiveAvailability(''); }}
                className="mt-4 text-primary font-label-md uppercase tracking-widest hover:underline"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
              {products.map((product) => (
                <Link to={`/product/${product.slug}`} key={product.id} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-surface-container-high mb-4">
                    {product.main_image ? (
                      <img 
                        src={product.main_image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-on-surface-variant">No Image</div>
                    )}
                    <div className="absolute top-4 right-4 flex flex-col gap-2">
                      <span className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-sm backdrop-blur-md ${
                        product.availability === 'Made To Order' ? 'bg-primary/90 text-on-primary' : 
                        product.availability === 'Sold Out' ? 'bg-surface-variant/90 text-on-surface-variant' : 
                        'bg-surface/90 text-on-surface'
                      }`}>
                        {product.availability || 'Available'}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-body-lg text-body-lg text-on-surface group-hover:text-primary transition-colors">{product.name}</h3>
                      <span className="font-body-md text-body-md text-secondary whitespace-nowrap ml-4">
                        ${Number(product.price).toFixed(2)}
                      </span>
                    </div>
                    <p className="font-label-md text-label-md text-secondary tracking-widest uppercase">
                      {product.category_name || 'Uncategorized'}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Shop;
