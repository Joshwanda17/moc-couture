import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [lookbooks, setLookbooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const [activeTab, setActiveTab] = useState<"products" | "collections" | "categories" | "lookbooks">("products");
  
  // Products State
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState({
    name: "", slug: "", description: "", story: "", materials: "", dimensions: "", 
    price: "", category_id: "", main_image: "", status: "Published", availability: "Available", collection_id: "", gallery: ""
  });
  
  // Collections State
  const [isAddingCollectionMode, setIsAddingCollectionMode] = useState(false);
  const [editingCollectionId, setEditingCollectionId] = useState<string | null>(null);
  const [newCollection, setNewCollection] = useState({
    name: "", slug: "", short_description: "", story: "", season: "", theme: "", status: "Draft", featured: false, cover_image: "", hero_image: ""
  });

  // Category State
  const [isAddingCategoryMode, setIsAddingCategoryMode] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Lookbooks State
  const [isAddingLookbookMode, setIsAddingLookbookMode] = useState(false);
  const [editingLookbookId, setEditingLookbookId] = useState<string | null>(null);
  const [newLookbook, setNewLookbook] = useState({
    title: "", slug: "", description: "", story: "", cover_image: "", status: "Draft", gallery: "", product_ids: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = () => {
    const authDataStr = localStorage.getItem("moc_auth");
    if (!authDataStr) { navigate("/login"); return; }
    try {
      const authData = JSON.parse(authDataStr);
      if (!authData.user || authData.user.role !== "admin") { navigate("/"); return; }
      setIsAdmin(true);
      fetchData();
    } catch (e) { navigate("/login"); }
  };

  const fetchData = async () => {
    try {
      const [prods, colls, cats, looks] = await Promise.all([
        api.getProducts(), api.getCollections(), api.getCategories(), api.getLookbooks()
      ]);
      setProducts(prods);
      setCollections(colls);
      setCategories(cats);
      setLookbooks(looks);
      setLoading(false);
    } catch (err) {
      toast({ title: "Error", description: "Failed to load admin data", variant: "destructive" });
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNewProduct({ name: "", slug: "", description: "", story: "", materials: "", dimensions: "", price: "", category_id: categories[0]?.id || "", main_image: "", status: "Published", availability: "Available", collection_id: "", gallery: "" });
    setEditingProductId(null);
    setIsAddingMode(false);
    
    setNewCollection({ name: "", slug: "", short_description: "", story: "", season: "", theme: "", status: "Draft", featured: false, cover_image: "", hero_image: "" });
    setEditingCollectionId(null);
    setIsAddingCollectionMode(false);

    setNewCategoryName("");
    setIsAddingCategoryMode(false);

    setNewLookbook({ title: "", slug: "", description: "", story: "", cover_image: "", status: "Draft", gallery: "", product_ids: "" });
    setEditingLookbookId(null);
    setIsAddingLookbookMode(false);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const productData = {
        ...newProduct,
        price: parseFloat(newProduct.price),
        images: newProduct.gallery.split(',').map(s => s.trim()).filter(Boolean)
      };

      if (editingProductId) {
        await api.updateProduct(editingProductId, productData);
        toast({ title: "Success", description: "Product updated successfully" });
      } else {
        await api.createProduct(productData);
        toast({ title: "Success", description: "Product created successfully" });
      }
      await fetchData();
      resetForm();
    } catch (err) {
      toast({ title: "Error", description: "Failed to save product", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCollection = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingCollectionId) {
        await api.updateCollection(editingCollectionId, newCollection);
        toast({ title: "Success", description: "Collection updated successfully" });
      } else {
        await api.createCollection(newCollection);
        toast({ title: "Success", description: "Collection created successfully" });
      }
      await fetchData();
      resetForm();
    } catch (err) {
      toast({ title: "Error", description: "Failed to save collection", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.createCategory(newCategoryName);
      toast({ title: "Success", description: "Category created" });
      await fetchData();
      resetForm();
    } catch (err) {
      toast({ title: "Error", description: "Failed to create category", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingProductId(product.id);
    setNewProduct({
      name: product.name || "", slug: product.slug || "", description: product.description || "", story: product.story || "",
      materials: product.materials || "", dimensions: product.dimensions || "", price: product.price?.toString() || "", 
      category_id: product.category_id || "", main_image: product.main_image || "", status: product.status || "Published", 
      availability: product.availability || "Available", collection_id: product.collection_id || "",
      gallery: product.images?.map((i: any) => i.image_url).join(", ") || ""
    });
    setActiveTab("products");
    setIsAddingMode(true);
  };

  const handleEditCollection = (collection: any) => {
    setEditingCollectionId(collection.id);
    setNewCollection({ ...collection, status: collection.status || "Draft" });
    setActiveTab("collections");
    setIsAddingCollectionMode(true);
  };

  const handleEditLookbook = async (lookbook: any) => {
    try {
      const details = await api.getLookbookBySlug(lookbook.slug);
      setEditingLookbookId(details.id);
      setNewLookbook({
        title: details.title || "", slug: details.slug || "", description: details.description || "", story: details.story || "",
        cover_image: details.cover_image || "", status: details.status || "Draft",
        gallery: details.images?.map((i: any) => i.image_url).join(", ") || "",
        product_ids: details.products?.map((p: any) => p.id).join(", ") || ""
      });
      setActiveTab("lookbooks");
      setIsAddingLookbookMode(true);
    } catch (err) {
      toast({ title: "Error", description: "Failed to load lookbook details", variant: "destructive" });
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try { await api.deleteProduct(id); toast({ title: "Deleted", description: "Product removed" }); fetchData(); } catch (err) {}
  };

  const handleDeleteCollection = async (id: string) => {
    if (!confirm("Are you sure you want to delete this collection?")) return;
    try { await api.deleteCollection(id); toast({ title: "Deleted", description: "Collection removed" }); fetchData(); } catch (err) {}
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try { await api.deleteCategory(id); toast({ title: "Deleted", description: "Category removed" }); fetchData(); } catch (err) {}
  };

  const handleDeleteLookbook = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lookbook?")) return;
    try { await api.deleteLookbook(id); toast({ title: "Deleted", description: "Lookbook removed" }); fetchData(); } catch (err) {}
  };

  const handleLogout = () => {
    localStorage.removeItem("moc_auth");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  if (!isAdmin) return null;

  return (
    <div className="bg-background text-on-background min-h-screen">
      <Navbar />
      <div className="flex pt-16 min-h-screen">
        {/* Sidebar Drawer */}
        <aside className="hidden md:flex flex-col p-6 gap-4 w-80 bg-surface soft-shadow sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
          <div className="font-headline-md text-headline-md text-on-surface mb-4">MoC Couture</div>
          <nav className="flex flex-col gap-2">
            <button onClick={() => { setActiveTab("products"); resetForm(); }} className={`flex items-center gap-3 px-4 py-3 font-bold transition-colors duration-300 text-left ${activeTab === "products" ? "text-primary bg-secondary-container" : "text-on-surface-variant hover:bg-surface-variant"}`}>
              <span className="material-symbols-outlined">inventory_2</span><span className="font-body-lg text-body-lg">Products</span>
            </button>
            <button onClick={() => { setActiveTab("collections"); resetForm(); }} className={`flex items-center gap-3 px-4 py-3 font-bold transition-colors duration-300 text-left ${activeTab === "collections" ? "text-primary bg-secondary-container" : "text-on-surface-variant hover:bg-surface-variant"}`}>
              <span className="material-symbols-outlined">auto_awesome</span><span className="font-body-lg text-body-lg">Collections</span>
            </button>
            <button onClick={() => { setActiveTab("categories"); resetForm(); }} className={`flex items-center gap-3 px-4 py-3 font-bold transition-colors duration-300 text-left ${activeTab === "categories" ? "text-primary bg-secondary-container" : "text-on-surface-variant hover:bg-surface-variant"}`}>
              <span className="material-symbols-outlined">category</span><span className="font-body-lg text-body-lg">Categories</span>
            </button>
            <button onClick={() => { setActiveTab("lookbooks"); resetForm(); }} className={`flex items-center gap-3 px-4 py-3 font-bold transition-colors duration-300 text-left ${activeTab === "lookbooks" ? "text-primary bg-secondary-container" : "text-on-surface-variant hover:bg-surface-variant"}`}>
              <span className="material-symbols-outlined">menu_book</span><span className="font-body-lg text-body-lg">Lookbooks</span>
            </button>
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant transition-colors duration-300 mt-auto text-left">
              <span className="material-symbols-outlined">logout</span><span className="font-body-lg text-body-lg">Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 px-margin-mobile md:px-margin-desktop py-12 max-w-7xl mx-auto overflow-y-auto h-[calc(100vh-64px)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface capitalize">{activeTab}</h1>
              <p className="font-body-md text-body-md text-secondary mt-2">Manage your handcrafted fashion empire.</p>
            </div>
            {activeTab === "products" && !isAddingMode && (
              <button onClick={() => { resetForm(); setIsAddingMode(true); }} className="bg-primary text-on-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/10">
                <span className="material-symbols-outlined">add</span>Add Product
              </button>
            )}
            {activeTab === "collections" && !isAddingCollectionMode && (
              <button onClick={() => { resetForm(); setIsAddingCollectionMode(true); }} className="bg-primary text-on-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/10">
                <span className="material-symbols-outlined">add</span>Add Collection
              </button>
            )}
            {activeTab === "categories" && !isAddingCategoryMode && (
              <button onClick={() => { resetForm(); setIsAddingCategoryMode(true); }} className="bg-primary text-on-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/10">
                <span className="material-symbols-outlined">add</span>Add Category
              </button>
            )}
            {activeTab === "lookbooks" && !isAddingLookbookMode && (
              <button onClick={() => { resetForm(); setIsAddingLookbookMode(true); }} className="bg-primary text-on-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/10">
                <span className="material-symbols-outlined">add</span>Add Lookbook
              </button>
            )}
          </div>

          {/* Add Category Form */}
          {activeTab === "categories" && isAddingCategoryMode && (
            <div className="bg-surface-container-low p-8 mb-12 border border-outline-variant/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline-md text-headline-md">New Category</h2>
                <button onClick={resetForm} className="material-symbols-outlined text-secondary hover:text-primary">close</button>
              </div>
              <form onSubmit={handleAddCategory} className="flex gap-4">
                <input className="flex-1 border border-outline-variant/50 bg-background px-4 py-3 font-body-md" required value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} placeholder="e.g. Hats" />
                <button type="submit" disabled={isSubmitting} className="bg-primary text-on-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50">Save</button>
              </form>
            </div>
          )}

          {/* Add Product Form */}
          {activeTab === "products" && isAddingMode && (
            <div className="bg-surface-container-low p-8 mb-12 border border-outline-variant/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline-md text-headline-md">{editingProductId ? 'Edit Product' : 'New Product'}</h2>
                <button onClick={resetForm} className="material-symbols-outlined text-secondary hover:text-primary">close</button>
              </div>
              <form onSubmit={handleAddProduct} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Name</label>
                  <input className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} /></div>
                  <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Slug</label>
                  <input className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" required value={newProduct.slug} onChange={e => setNewProduct({...newProduct, slug: e.target.value})} /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Price (USD)</label>
                  <input type="number" step="0.01" className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} /></div>
                  <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Category</label>
                  <select className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" required value={newProduct.category_id} onChange={e => setNewProduct({...newProduct, category_id: e.target.value})}>
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select></div>
                  <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Collection</label>
                  <select className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" value={newProduct.collection_id} onChange={e => setNewProduct({...newProduct, collection_id: e.target.value})}>
                    <option value="">None</option>
                    {collections.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select></div>
                </div>
                <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Short Description</label>
                  <textarea className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md h-20" required value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}></textarea></div>
                <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Editorial Story</label>
                  <textarea className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md h-28" required value={newProduct.story} onChange={e => setNewProduct({...newProduct, story: e.target.value})}></textarea></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Materials</label>
                  <textarea className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md h-20" value={newProduct.materials} onChange={e => setNewProduct({...newProduct, materials: e.target.value})}></textarea></div>
                  <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Dimensions & Fit</label>
                  <textarea className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md h-20" value={newProduct.dimensions} onChange={e => setNewProduct({...newProduct, dimensions: e.target.value})}></textarea></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Status (Visibility)</label>
                  <select className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" value={newProduct.status} onChange={e => setNewProduct({...newProduct, status: e.target.value})}>
                    <option value="Draft">Draft</option><option value="Published">Published</option><option value="Archived">Archived</option>
                  </select></div>
                  <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Availability</label>
                  <select className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" value={newProduct.availability} onChange={e => setNewProduct({...newProduct, availability: e.target.value})}>
                    <option value="Available">Available</option><option value="Made To Order">Made To Order</option><option value="Sold Out">Sold Out</option>
                  </select></div>
                </div>
                <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Main Image URL</label>
                  <input className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" required value={newProduct.main_image} onChange={e => setNewProduct({...newProduct, main_image: e.target.value})} /></div>
                <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Gallery Image URLs (Comma separated)</label>
                  <input className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" value={newProduct.gallery} onChange={e => setNewProduct({...newProduct, gallery: e.target.value})} /></div>
                <button type="submit" disabled={isSubmitting} className="bg-primary text-on-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-all disabled:opacity-50">
                  {isSubmitting ? 'Saving...' : 'Save Product'}
                </button>
              </form>
            </div>
          )}

          {/* Add Collection Form (Truncated for brevity, just copying what existed) */}
          {activeTab === "collections" && isAddingCollectionMode && (
            <div className="bg-surface-container-low p-8 mb-12 border border-outline-variant/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline-md text-headline-md">{editingCollectionId ? 'Edit Collection' : 'New Collection'}</h2>
                <button onClick={resetForm} className="material-symbols-outlined text-secondary hover:text-primary">close</button>
              </div>
              <form onSubmit={handleAddCollection} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Collection Name</label>
                  <input className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" required value={newCollection.name} onChange={e => setNewCollection({...newCollection, name: e.target.value})} /></div>
                  <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">URL Slug</label>
                  <input className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" required value={newCollection.slug} onChange={e => setNewCollection({...newCollection, slug: e.target.value})} /></div>
                </div>
                <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Short Description (Archive Page)</label>
                  <input className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" required value={newCollection.short_description} onChange={e => setNewCollection({...newCollection, short_description: e.target.value})} /></div>
                <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Editorial Story</label>
                  <textarea className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md min-h-[120px]" required value={newCollection.story} onChange={e => setNewCollection({...newCollection, story: e.target.value})}></textarea></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Season</label>
                  <input className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" value={newCollection.season} onChange={e => setNewCollection({...newCollection, season: e.target.value})} /></div>
                  <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Theme</label>
                  <input className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" value={newCollection.theme} onChange={e => setNewCollection({...newCollection, theme: e.target.value})} /></div>
                  <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Status</label>
                  <select className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" value={newCollection.status} onChange={e => setNewCollection({...newCollection, status: e.target.value})}>
                    <option value="Draft">Draft</option><option value="Published">Published</option><option value="Archived">Archived</option>
                  </select></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Cover Image URL</label>
                  <input className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" value={newCollection.cover_image} onChange={e => setNewCollection({...newCollection, cover_image: e.target.value})} /></div>
                  <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Hero Image URL</label>
                  <input className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" value={newCollection.hero_image} onChange={e => setNewCollection({...newCollection, hero_image: e.target.value})} /></div>
                </div>
                <button type="submit" disabled={isSubmitting} className="bg-primary text-on-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-all w-full md:w-auto disabled:opacity-50">Save Collection</button>
              </form>
            </div>
          )}

          {/* Add Lookbook Form */}
          {activeTab === "lookbooks" && isAddingLookbookMode && (
            <div className="bg-surface-container-low p-8 mb-12 border border-outline-variant/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline-md text-headline-md">{editingLookbookId ? 'Edit Lookbook' : 'New Lookbook'}</h2>
                <button onClick={resetForm} className="material-symbols-outlined text-secondary hover:text-primary">close</button>
              </div>
              <form onSubmit={handleAddLookbook} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Title</label>
                  <input className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" required value={newLookbook.title} onChange={e => setNewLookbook({...newLookbook, title: e.target.value})} /></div>
                  <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">URL Slug</label>
                  <input className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" required value={newLookbook.slug} onChange={e => setNewLookbook({...newLookbook, slug: e.target.value})} /></div>
                </div>
                <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Introduction</label>
                  <textarea className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md h-20" required value={newLookbook.description} onChange={e => setNewLookbook({...newLookbook, description: e.target.value})}></textarea></div>
                <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Editorial Story</label>
                  <textarea className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md min-h-[120px]" required value={newLookbook.story} onChange={e => setNewLookbook({...newLookbook, story: e.target.value})}></textarea></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Status</label>
                  <select className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" value={newLookbook.status} onChange={e => setNewLookbook({...newLookbook, status: e.target.value})}>
                    <option value="Draft">Draft</option><option value="Published">Published</option><option value="Archived">Archived</option>
                  </select></div>
                  <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Cover Image URL</label>
                  <input className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" value={newLookbook.cover_image} onChange={e => setNewLookbook({...newLookbook, cover_image: e.target.value})} /></div>
                </div>
                <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Gallery Image URLs (Comma separated)</label>
                  <input className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" value={newLookbook.gallery} onChange={e => setNewLookbook({...newLookbook, gallery: e.target.value})} /></div>
                <div><label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Product IDs (Comma separated)</label>
                  <input className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" value={newLookbook.product_ids} onChange={e => setNewLookbook({...newLookbook, product_ids: e.target.value})} placeholder="ID1, ID2, ID3" /></div>
                <button type="submit" disabled={isSubmitting} className="bg-primary text-on-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-all w-full md:w-auto disabled:opacity-50">Save Lookbook</button>
              </form>
            </div>
          )}

          {/* Tables */}
          <div className="bg-surface/40 backdrop-blur-sm border border-outline-variant/20 overflow-hidden">
            <div className="overflow-x-auto">
              {activeTab === "products" && (
                <table className="w-full text-left border-collapse">
                  <thead><tr className="bg-surface-container-low/50"><th className="p-6">Product</th><th className="p-6">Category</th><th className="p-6">Status / Availability</th><th className="p-6 text-right">Actions</th></tr></thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {products.map(product => (
                      <tr key={product.id} className="hover:bg-surface-container-low/30">
                        <td className="p-6 flex items-center gap-4"><img src={product.main_image} className="w-16 h-20 object-cover" /><div><div className="font-body-lg text-on-surface font-medium">{product.name}</div><div className="font-label-md text-secondary mt-1">${product.price}</div></div></td>
                        <td className="p-6 font-body-md text-tertiary">{product.category_name}</td>
                        <td className="p-6"><span className="inline-flex items-center px-3 py-1 bg-surface-variant text-on-surface-variant rounded-full text-xs uppercase">{product.status} / {product.availability}</span></td>
                        <td className="p-6 text-right"><button onClick={() => handleEditProduct(product)} className="material-symbols-outlined mr-3">edit</button><button onClick={() => handleDeleteProduct(product.id)} className="material-symbols-outlined text-error">delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === "collections" && (
                <table className="w-full text-left border-collapse">
                  <thead><tr className="bg-surface-container-low/50"><th className="p-6">Collection</th><th className="p-6">Season</th><th className="p-6">Status</th><th className="p-6 text-right">Actions</th></tr></thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {collections.map(collection => (
                      <tr key={collection.id} className="hover:bg-surface-container-low/30">
                        <td className="p-6 flex items-center gap-4"><img src={collection.cover_image} className="w-16 h-20 object-cover" /><div><div className="font-body-lg font-medium">{collection.name}</div><div className="font-label-md text-secondary mt-1">/{collection.slug}</div></div></td>
                        <td className="p-6 font-body-md text-tertiary">{collection.season || '-'}</td>
                        <td className="p-6"><span className="inline-flex items-center px-3 py-1 bg-surface-variant rounded-full text-xs uppercase">{collection.status}</span></td>
                        <td className="p-6 text-right"><button onClick={() => handleEditCollection(collection)} className="material-symbols-outlined mr-3">edit</button><button onClick={() => handleDeleteCollection(collection.id)} className="material-symbols-outlined text-error">delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === "categories" && (
                <table className="w-full text-left border-collapse">
                  <thead><tr className="bg-surface-container-low/50"><th className="p-6">Category Name</th><th className="p-6 text-right">Actions</th></tr></thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {categories.map(cat => (
                      <tr key={cat.id} className="hover:bg-surface-container-low/30">
                        <td className="p-6 font-body-lg text-on-surface font-medium">{cat.name}</td>
                        <td className="p-6 text-right"><button onClick={() => handleDeleteCategory(cat.id)} className="material-symbols-outlined text-error">delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {activeTab === "lookbooks" && (
                <table className="w-full text-left border-collapse">
                  <thead><tr className="bg-surface-container-low/50"><th className="p-6">Editorial</th><th className="p-6">Status</th><th className="p-6 text-right">Actions</th></tr></thead>
                  <tbody className="divide-y divide-outline-variant/20">
                    {lookbooks.map(lb => (
                      <tr key={lb.id} className="hover:bg-surface-container-low/30">
                        <td className="p-6 flex items-center gap-4"><img src={lb.cover_image || '/placeholder.svg'} className="w-24 h-16 object-cover" /><div><div className="font-body-lg text-on-surface font-medium">{lb.title}</div><div className="font-label-md text-secondary mt-1">/{lb.slug}</div></div></td>
                        <td className="p-6"><span className="inline-flex items-center px-3 py-1 bg-surface-variant text-on-surface-variant rounded-full text-xs uppercase">{lb.status}</span></td>
                        <td className="p-6 text-right"><button onClick={() => handleEditLookbook(lb)} className="material-symbols-outlined mr-3">edit</button><button onClick={() => handleDeleteLookbook(lb.id)} className="material-symbols-outlined text-error">delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
