import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Plus, LogOut, Settings as SettingsIcon, Image as ImageIcon, Package, Layers } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { getProducts, getCollections, getMedia, Product, Collection, Media } from "@/data/mockProducts";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // New Product State
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "Bags",
    status: "Available" as Product["status"],
    featured: false,
    collection_id: "none",
  });
  const [productImage, setProductImage] = useState<string | null>(null);

  // New Collection State
  const [newCollection, setNewCollection] = useState({
    title: "",
    description: "",
    season: "",
  });
  const [collectionImage, setCollectionImage] = useState<string | null>(null);

  // Settings State
  const [settings, setSettings] = useState({
    storeName: "MoC Couture",
    contactEmail: "hello@moccouture.com",
    storeActive: true,
  });

  const navigate = useNavigate();
  const { toast } = useToast();
  const { items } = useCart();

  useEffect(() => {
    checkAdminStatus();
    setProducts(getProducts());
    setCollections(getCollections());
    setMedia(getMedia());
  }, []);

  const checkAdminStatus = () => {
    const mockUser = localStorage.getItem("mock_user");
    if (!mockUser) {
      navigate("/login");
      return;
    }
    const user = JSON.parse(mockUser);
    if (user.role !== "admin") {
      toast({ variant: "destructive", title: "Access Denied" });
      navigate("/");
      return;
    }
    setIsAdmin(true);
    setLoading(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string | null>>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setter(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setter(null);
    }
  };

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productImage) return toast({ variant: "destructive", title: "Image required" });

    const product: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      main_image: productImage,
      featured: newProduct.featured,
      status: newProduct.status,
      collection_id: newProduct.collection_id === "none" ? undefined : newProduct.collection_id,
    };

    const updated = [...products, product];
    localStorage.setItem("mock_products", JSON.stringify(updated));
    setProducts(updated);
    toast({ title: "Product added!" });
    
    setNewProduct({ name: "", description: "", price: "", category: "Bags", status: "Available", featured: false, collection_id: "none" });
    setProductImage(null);
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    localStorage.setItem("mock_products", JSON.stringify(updated));
    setProducts(updated);
    toast({ title: "Product deleted" });
  };

  const handleAddCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!collectionImage) return toast({ variant: "destructive", title: "Image required" });

    const collection: Collection = {
      id: "c_" + Math.random().toString(36).substr(2, 9),
      title: newCollection.title,
      description: newCollection.description,
      season: newCollection.season,
      cover_image: collectionImage,
    };

    const updated = [...collections, collection];
    localStorage.setItem("mock_collections", JSON.stringify(updated));
    setCollections(updated);
    toast({ title: "Collection added!" });
    
    setNewCollection({ title: "", description: "", season: "" });
    setCollectionImage(null);
  };

  const handleDeleteCollection = (id: string) => {
    const updated = collections.filter(c => c.id !== id);
    localStorage.setItem("mock_collections", JSON.stringify(updated));
    setCollections(updated);
    
    // Unlink products from this collection
    const updatedProducts = products.map(p => p.collection_id === id ? { ...p, collection_id: undefined } : p);
    localStorage.setItem("mock_products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);

    toast({ title: "Collection deleted" });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Settings Saved", description: "Your store configuration has been updated." });
  };

  const handleLogout = () => {
    localStorage.removeItem("mock_user");
    window.dispatchEvent(new Event("auth-change"));
    navigate("/");
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemCount={items.length} />
      
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2">Fashion House Admin</h1>
            <p className="text-muted-foreground">Manage your brand's digital presence.</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="border-2">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="products" className="w-full">
          <TabsList className="mb-8 w-full md:w-auto inline-flex h-auto p-1 bg-muted/50 rounded-xl overflow-x-auto">
            <TabsTrigger value="products" className="text-base py-3 px-6 rounded-lg flex items-center gap-2">
              <Package className="h-4 w-4" /> Products
            </TabsTrigger>
            <TabsTrigger value="collections" className="text-base py-3 px-6 rounded-lg flex items-center gap-2">
              <Layers className="h-4 w-4" /> Collections
            </TabsTrigger>
            <TabsTrigger value="media" className="text-base py-3 px-6 rounded-lg flex items-center gap-2">
              <ImageIcon className="h-4 w-4" /> Lookbook Media
            </TabsTrigger>
            <TabsTrigger value="settings" className="text-base py-3 px-6 rounded-lg flex items-center gap-2">
              <SettingsIcon className="h-4 w-4" /> Settings
            </TabsTrigger>
          </TabsList>

          {/* PRODUCTS TAB */}
          <TabsContent value="products" className="space-y-8 animate-fade-in">
            <Card className="p-8 border-none shadow-soft bg-card/60 backdrop-blur-sm">
              <h2 className="text-2xl font-display font-bold mb-6">Add New Product</h2>
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="price">Price (USD)</Label>
                      <Input id="price" type="number" step="0.01" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} required />
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select value={newProduct.category} onValueChange={val => setNewProduct({...newProduct, category: val})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bags">Bags</SelectItem>
                          <SelectItem value="Accessories">Accessories</SelectItem>
                          <SelectItem value="Clothing">Clothing</SelectItem>
                          <SelectItem value="Home Décor">Home Décor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Status</Label>
                      <Select value={newProduct.status} onValueChange={(val: any) => setNewProduct({...newProduct, status: val})}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Available">Available</SelectItem>
                          <SelectItem value="Made to Order">Made to Order</SelectItem>
                          <SelectItem value="Sold">Sold</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2 flex flex-col justify-end">
                      <div className="flex items-center space-x-2 pb-2">
                        <Switch id="featured" checked={newProduct.featured} onCheckedChange={checked => setNewProduct({...newProduct, featured: checked})} />
                        <Label htmlFor="featured">Featured Product</Label>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Assign to Collection (Optional)</Label>
                    <Select value={newProduct.collection_id} onValueChange={val => setNewProduct({...newProduct, collection_id: val})}>
                      <SelectTrigger><SelectValue placeholder="No Collection" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Collection</SelectItem>
                        {collections.map(c => <SelectItem key={c.id} value={c.id}>{c.title}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Story / Description</Label>
                    <Textarea id="description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="min-h-[100px]" required />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="image">Product Image</Label>
                    <Input id="image" type="file" accept="image/*" onChange={e => handleImageUpload(e, setProductImage)} required={!productImage} />
                  </div>
                  {productImage && (
                    <div className="aspect-[4/5] rounded-xl overflow-hidden bg-muted w-full max-w-md mx-auto">
                      <img src={productImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <Button type="submit" size="lg" className="w-full bg-gradient-warm hover:opacity-90">
                    <Plus className="mr-2 h-5 w-5" /> Add Product
                  </Button>
                </div>
              </form>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <Card key={product.id} className="p-4 flex gap-4 items-center">
                  <div className="h-20 w-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                    <img src={product.main_image} alt={product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold truncate">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">${product.price}</p>
                    {product.collection_id && (
                      <p className="text-xs text-primary bg-primary/10 inline-block px-2 py-0.5 rounded-full mt-1">
                        {collections.find(c => c.id === product.collection_id)?.title || "Unknown Collection"}
                      </p>
                    )}
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteProduct(product.id)} className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* COLLECTIONS TAB */}
          <TabsContent value="collections" className="space-y-8 animate-fade-in">
            <Card className="p-8 border-none shadow-soft bg-card/60 backdrop-blur-sm">
              <h2 className="text-2xl font-display font-bold mb-6">Create Collection</h2>
              <form onSubmit={handleAddCollection} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="c_title">Collection Title</Label>
                    <Input id="c_title" value={newCollection.title} onChange={e => setNewCollection({...newCollection, title: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="season">Season / Theme</Label>
                    <Input id="season" placeholder="e.g. Summer 2026 or Core Classics" value={newCollection.season} onChange={e => setNewCollection({...newCollection, season: e.target.value})} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="c_description">Collection Philosophy</Label>
                    <Textarea id="c_description" value={newCollection.description} onChange={e => setNewCollection({...newCollection, description: e.target.value})} className="min-h-[120px]" required />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="c_image">Cover Image (Editorial)</Label>
                    <Input id="c_image" type="file" accept="image/*" onChange={e => handleImageUpload(e, setCollectionImage)} required={!collectionImage} />
                  </div>
                  {collectionImage && (
                    <div className="aspect-[16/9] rounded-xl overflow-hidden bg-muted w-full">
                      <img src={collectionImage} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <Button type="submit" size="lg" className="w-full bg-foreground hover:bg-foreground/90">
                    <Plus className="mr-2 h-5 w-5" /> Create Collection
                  </Button>
                </div>
              </form>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map(collection => (
                <Card key={collection.id} className="overflow-hidden group">
                  <div className="h-48 w-full bg-muted relative">
                    <img src={collection.cover_image} alt={collection.title} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
                    <Button variant="destructive" size="icon" className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDeleteCollection(collection.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-bold text-primary uppercase">{collection.season}</span>
                    <h3 className="font-display text-xl font-bold mt-1">{collection.title}</h3>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{collection.description}</p>
                    <p className="text-xs font-semibold mt-4 text-muted-foreground">
                      {products.filter(p => p.collection_id === collection.id).length} products linked
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* MEDIA TAB */}
          <TabsContent value="media" className="space-y-8 animate-fade-in">
            <Card className="p-8 border-none shadow-soft text-center bg-card/60 backdrop-blur-sm">
              <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-display font-bold mb-2">Lookbook Management</h2>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">Upload lifestyle and editorial images to build out the brand's visual identity on the Lookbook page.</p>
              <Button disabled variant="outline">Media Upload UI Coming Soon (Mock Only)</Button>
            </Card>

            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
              {media.map(item => (
                <div key={item.id} className="relative group break-inside-avoid rounded-lg overflow-hidden border">
                  <img src={item.url} alt="Lookbook" className="w-full h-auto" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <p className="text-white text-xs text-center font-medium line-clamp-3">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* SETTINGS TAB */}
          <TabsContent value="settings" className="space-y-8 animate-fade-in">
            <Card className="p-8 border-none shadow-soft bg-card/60 backdrop-blur-sm max-w-2xl mx-auto">
              <h2 className="text-2xl font-display font-bold mb-6">Store Configuration</h2>
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Brand Name</Label>
                  <Input id="storeName" value={settings.storeName} onChange={e => setSettings({...settings, storeName: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Public Contact Email</Label>
                  <Input id="contactEmail" type="email" value={settings.contactEmail} onChange={e => setSettings({...settings, contactEmail: e.target.value})} />
                </div>
                <div className="flex items-center space-x-4 p-4 border rounded-lg bg-background/50">
                  <Switch id="storeActive" checked={settings.storeActive} onCheckedChange={c => setSettings({...settings, storeActive: c})} />
                  <div>
                    <Label htmlFor="storeActive" className="font-bold">Store is Active</Label>
                    <p className="text-sm text-muted-foreground">If disabled, the site will show a maintenance page.</p>
                  </div>
                </div>
                <Button type="submit" className="w-full">Save Settings</Button>
              </form>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
