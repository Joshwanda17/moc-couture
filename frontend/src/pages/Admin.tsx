import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // New Product State
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "Clothing",
    status: "Available",
  });
  const [productImageFile, setProductImageFile] = useState<File | null>(null);

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = () => {
    const authDataStr = localStorage.getItem("moc_auth");
    if (!authDataStr) {
      navigate("/login");
      return;
    }
    try {
      const authData = JSON.parse(authDataStr);
      if (!authData.user || authData.user.role !== "admin") {
        navigate("/");
        return;
      }
      setIsAdmin(true);
      fetchData();
    } catch (e) {
      navigate("/login");
    }
  };

  const fetchData = async () => {
    try {
      const [prods, colls] = await Promise.all([
        api.getProducts(),
        api.getCollections()
      ]);
      setProducts(prods);
      setCollections(colls);
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to load admin data", variant: "destructive" });
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProductImageFile(file);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productImageFile) {
      toast({ title: "Image required", description: "Please upload a product image", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Upload the image
      const imageUrl = await api.uploadImage(productImageFile);

      // 2. Create the product
      const productData = {
        name: newProduct.name,
        description: newProduct.description,
        price: parseFloat(newProduct.price),
        category: newProduct.category,
        main_image: imageUrl,
        status: newProduct.status,
      };

      await api.createProduct(productData);
      
      toast({ title: "Success", description: "Product created successfully" });
      
      // Refresh list and reset
      await fetchData();
      setNewProduct({ name: "", description: "", price: "", category: "Clothing", status: "Available" });
      setProductImageFile(null);
      setIsAddingMode(false);
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to create product", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.deleteProduct(id);
      toast({ title: "Deleted", description: "Product removed" });
      fetchData();
    } catch (err) {
      console.error(err);
      toast({ title: "Error", description: "Failed to delete product", variant: "destructive" });
    }
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
        {/* Sidebar Drawer (Hidden on Mobile) */}
        <aside className="hidden md:flex flex-col p-6 gap-4 h-full w-80 bg-surface soft-shadow sticky top-16">
          <div className="font-headline-md text-headline-md text-on-surface mb-4">MoC Couture</div>
          <nav className="flex flex-col gap-2">
            <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-primary font-bold bg-secondary-container transition-colors duration-300">
              <span className="material-symbols-outlined">auto_awesome</span>
              <span className="font-body-lg text-body-lg">Products</span>
            </Link>
            <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-variant transition-colors duration-300 mt-auto text-left">
              <span className="material-symbols-outlined">logout</span>
              <span className="font-body-lg text-body-lg">Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 px-margin-mobile md:px-margin-desktop py-12 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface">Products</h1>
              <p className="font-body-md text-body-md text-secondary mt-2">Manage your handcrafted crochet collection and stock.</p>
            </div>
            {!isAddingMode && (
              <button onClick={() => setIsAddingMode(true)} className="bg-primary text-on-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2 group shadow-lg shadow-primary/10">
                <span className="material-symbols-outlined">add</span>
                Add Product
              </button>
            )}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-gutter mb-12">
            <div className="bg-surface-container-low p-6 border-b border-outline-variant/30">
              <span className="font-label-md text-label-md text-secondary uppercase tracking-widest">Total Products</span>
              <div className="font-headline-md text-headline-md mt-1">{products.length}</div>
            </div>
            <div className="bg-surface-container-low p-6 border-b border-outline-variant/30">
              <span className="font-label-md text-label-md text-secondary uppercase tracking-widest">Available</span>
              <div className="font-headline-md text-headline-md mt-1">{products.filter(p => p.status === 'Available').length}</div>
            </div>
            <div className="bg-surface-container-low p-6 border-b border-outline-variant/30">
              <span className="font-label-md text-label-md text-secondary uppercase tracking-widest">Made to Order</span>
              <div className="font-headline-md text-headline-md mt-1">{products.filter(p => p.status === 'Made to Order').length}</div>
            </div>
            <div className="bg-surface-container-low p-6 border-b border-outline-variant/30">
              <span className="font-label-md text-label-md text-secondary uppercase tracking-widest">Collections</span>
              <div className="font-headline-md text-headline-md mt-1 text-primary">{collections.length}</div>
            </div>
          </div>

          {/* Add Product Form */}
          {isAddingMode && (
            <div className="bg-surface-container-low p-8 mb-12 border border-outline-variant/20">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline-md text-headline-md">New Product</h2>
                <button onClick={() => setIsAddingMode(false)} className="material-symbols-outlined text-secondary hover:text-primary">close</button>
              </div>
              <form onSubmit={handleAddProduct} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Product Name</label>
                    <input className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                  </div>
                  <div>
                    <label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Price (USD)</label>
                    <input type="number" step="0.01" className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Description</label>
                  <textarea className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md min-h-[100px]" required value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})}></textarea>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Status</label>
                    <select className="w-full border border-outline-variant/50 bg-background px-4 py-3 font-body-md" value={newProduct.status} onChange={e => setNewProduct({...newProduct, status: e.target.value as any})}>
                      <option value="Available">Available</option>
                      <option value="Made to Order">Made to Order</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-label-md text-label-md block mb-2 text-secondary uppercase">Image</label>
                    <input type="file" accept="image/*" className="w-full font-body-md text-secondary" required onChange={handleImageUpload} />
                  </div>
                </div>
                <button type="submit" disabled={isSubmitting} className="bg-primary text-on-primary px-8 py-4 font-label-md text-label-md uppercase tracking-widest hover:opacity-90 transition-all w-full md:w-auto disabled:opacity-50">
                  {isSubmitting ? 'Uploading...' : 'Save Product'}
                </button>
              </form>
            </div>
          )}

          {/* Product Table/List */}
          <div className="bg-surface/40 backdrop-blur-sm border border-outline-variant/20 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low/50">
                    <th className="p-6 font-label-md text-label-md text-secondary uppercase tracking-widest min-w-[250px]">Product</th>
                    <th className="p-6 font-label-md text-label-md text-secondary uppercase tracking-widest">Category</th>
                    <th className="p-6 font-label-md text-label-md text-secondary uppercase tracking-widest">Status</th>
                    <th className="p-6 font-label-md text-label-md text-secondary uppercase tracking-widest">Price</th>
                    <th className="p-6 font-label-md text-label-md text-secondary uppercase tracking-widest text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {products.map(product => (
                    <tr key={product.id} className="hover:bg-surface-container-low/30 transition-colors group">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-20 bg-secondary-container flex-shrink-0 relative overflow-hidden">
                            <img alt={product.name} src={product.main_image} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <div className="font-body-lg text-body-lg text-on-surface font-medium">{product.name}</div>
                            <div className="font-label-md text-label-md text-secondary mt-1">SKU: {product.id.substring(0, 8).toUpperCase()}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 font-body-md text-body-md text-tertiary">{product.category}</td>
                      <td className="p-6">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full font-label-md text-label-md uppercase tracking-tighter ${
                          product.status === 'Available' ? 'bg-green-100 text-green-800' :
                          product.status === 'Made to Order' ? 'bg-blue-100 text-blue-800' :
                          'bg-surface-variant text-on-surface-variant'
                        }`}>
                          {product.status}
                        </span>
                      </td>
                      <td className="p-6 font-body-lg text-body-lg">
                        UGX {(product.price * 3700).toLocaleString()}
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex justify-end gap-3">
                          <button onClick={() => handleDeleteProduct(product.id)} className="material-symbols-outlined text-secondary hover:text-error transition-colors">delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {products.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-12 text-center text-secondary font-body-lg">
                        No products found. Add one to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
