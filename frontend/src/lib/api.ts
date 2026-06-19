const API_URL = "http://192.168.100.8:5000/api";

export const api = {
  getAuthToken: () => {
    const authStr = localStorage.getItem("moc_auth");
    if (!authStr) return null;
    try {
      const auth = JSON.parse(authStr);
      return auth.token;
    } catch {
      return null;
    }
  },

  getHeaders: (isMultipart = false) => {
    const headers: HeadersInit = {};
    const token = api.getAuthToken();
    if (token) headers["Authorization"] = `Bearer ${token}`;
    if (!isMultipart) headers["Content-Type"] = "application/json";
    return headers;
  },

  // Products
  // Products
  getProducts: async (params?: { search?: string, category?: string, collection?: string, availability?: string }) => {
    let url = `${API_URL}/products`;
    if (params) {
      const queryParams = new URLSearchParams();
      if (params.search) queryParams.append("search", params.search);
      if (params.category) queryParams.append("category", params.category);
      if (params.collection) queryParams.append("collection", params.collection);
      if (params.availability) queryParams.append("availability", params.availability);
      const queryString = queryParams.toString();
      if (queryString) url += `?${queryString}`;
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json();
  },

  getProductBySlug: async (slug: string) => {
    const res = await fetch(`${API_URL}/products/${slug}`);
    if (!res.ok) throw new Error("Failed to fetch product");
    return res.json();
  },

  createProduct: async (productData: any) => {
    const res = await fetch(`${API_URL}/products`, {
      method: "POST",
      headers: api.getHeaders(),
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error("Failed to create product");
    return res.json();
  },

  updateProduct: async (id: string, productData: any) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "PUT",
      headers: api.getHeaders(),
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error("Failed to update product");
    return res.json();
  },

  deleteProduct: async (id: string) => {
    const res = await fetch(`${API_URL}/products/${id}`, {
      method: "DELETE",
      headers: api.getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete product");
    return res.json();
  },

  // Upload Image
  uploadImage: async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    
    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      headers: api.getHeaders(true),
      body: formData,
    });
    if (!res.ok) throw new Error("Failed to upload image");
    const data = await res.json();
    return `http://192.168.100.8:5000${data.url}`;
  },

  // Categories
  getCategories: async () => {
    const res = await fetch(`${API_URL}/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
  },

  createCategory: async (name: string) => {
    const res = await fetch(`${API_URL}/categories`, {
      method: "POST",
      headers: api.getHeaders(),
      body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error("Failed to create category");
    return res.json();
  },

  deleteCategory: async (id: string) => {
    const res = await fetch(`${API_URL}/categories/${id}`, {
      method: "DELETE",
      headers: api.getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete category");
    return res.json();
  },

  // Collections
  getCollections: async () => {
    const res = await fetch(`${API_URL}/collections`);
    if (!res.ok) throw new Error("Failed to fetch collections");
    return res.json();
  },

  getCollectionBySlug: async (slug: string) => {
    const res = await fetch(`${API_URL}/collections/${slug}`);
    if (!res.ok) throw new Error("Failed to fetch collection");
    return res.json();
  },

  createCollection: async (collectionData: any) => {
    const res = await fetch(`${API_URL}/collections`, {
      method: "POST",
      headers: api.getHeaders(),
      body: JSON.stringify(collectionData),
    });
    if (!res.ok) throw new Error("Failed to create collection");
    return res.json();
  },

  updateCollection: async (id: string, collectionData: any) => {
    const res = await fetch(`${API_URL}/collections/${id}`, {
      method: "PUT",
      headers: api.getHeaders(),
      body: JSON.stringify(collectionData),
    });
    if (!res.ok) throw new Error("Failed to update collection");
    return res.json();
  },

  deleteCollection: async (id: string) => {
    const res = await fetch(`${API_URL}/collections/${id}`, {
      method: "DELETE",
      headers: api.getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete collection");
    return res.json();
  },

  // Lookbooks
  getLookbooks: async () => {
    const res = await fetch(`${API_URL}/lookbooks`);
    if (!res.ok) throw new Error("Failed to fetch lookbooks");
    return res.json();
  },

  getLookbookBySlug: async (slug: string) => {
    const res = await fetch(`${API_URL}/lookbooks/${slug}`);
    if (!res.ok) throw new Error("Failed to fetch lookbook");
    return res.json();
  },

  createLookbook: async (lookbookData: any) => {
    const res = await fetch(`${API_URL}/lookbooks`, {
      method: "POST",
      headers: api.getHeaders(),
      body: JSON.stringify(lookbookData),
    });
    if (!res.ok) throw new Error("Failed to create lookbook");
    return res.json();
  },

  updateLookbook: async (id: string, lookbookData: any) => {
    const res = await fetch(`${API_URL}/lookbooks/${id}`, {
      method: "PUT",
      headers: api.getHeaders(),
      body: JSON.stringify(lookbookData),
    });
    if (!res.ok) throw new Error("Failed to update lookbook");
    return res.json();
  },

  deleteLookbook: async (id: string) => {
    const res = await fetch(`${API_URL}/lookbooks/${id}`, {
      method: "DELETE",
      headers: api.getHeaders(),
    });
    if (!res.ok) throw new Error("Failed to delete lookbook");
    return res.json();
  },
};
