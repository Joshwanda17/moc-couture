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
  getProducts: async () => {
    const res = await fetch(`${API_URL}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
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

  // Collections
  getCollections: async () => {
    const res = await fetch(`${API_URL}/collections`);
    if (!res.ok) throw new Error("Failed to fetch collections");
    return res.json();
  },
};
