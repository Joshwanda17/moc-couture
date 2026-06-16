export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  main_image: string;
  featured: boolean;
  status: "Available" | "Made to Order" | "Sold";
  collection_id?: string;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  cover_image: string;
  season: string;
}

export interface Media {
  id: string;
  url: string;
  caption: string;
  collection_id?: string;
}

export const mockCollections: Collection[] = [
  {
    id: "c1",
    title: "Summer Breeze",
    description: "Lightweight, breathable crochet pieces and airy fabrics perfect for the warm season.",
    cover_image: "https://images.unsplash.com/photo-1515347619152-192661001b96?q=80&w=1200&auto=format&fit=crop",
    season: "Summer 2026",
  },
  {
    id: "c2",
    title: "Signature Classics",
    description: "Our timeless, handcrafted staples that define the MoC Couture aesthetic year-round.",
    cover_image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
    season: "Core",
  },
  {
    id: "c3",
    title: "Artisan Accents",
    description: "Statement accessories and home décor pieces that bring warmth to any space.",
    cover_image: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?q=80&w=1200&auto=format&fit=crop",
    season: "Core",
  }
];

export const mockMedia: Media[] = [
  {
    id: "m1",
    url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
    caption: "Editorial shoot - Downtown, Summer 2026",
    collection_id: "c1",
  },
  {
    id: "m2",
    url: "https://images.unsplash.com/photo-1512413911586-a365f8095b07?q=80&w=800&auto=format&fit=crop",
    caption: "Behind the scenes: The crafting process",
  },
  {
    id: "m3",
    url: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop",
    caption: "Winter layering inspiration",
    collection_id: "c2",
  },
  {
    id: "m4",
    url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop",
    caption: "Close up of the signature stitch pattern",
  },
  {
    id: "m5",
    url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
    caption: "Bohemian vibes for the modern wardrobe",
    collection_id: "c1",
  },
  {
    id: "m6",
    url: "https://images.unsplash.com/photo-1550614000-4b95d4ed688b?q=80&w=800&auto=format&fit=crop",
    caption: "Home décor styling ideas",
    collection_id: "c3",
  }
];

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Handcrafted Crochet Tote",
    description: "A beautiful, sturdy tote bag crafted with premium cotton yarn.",
    price: 45,
    category: "Bags",
    main_image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop",
    featured: true,
    status: "Available",
    collection_id: "c2",
  },
  {
    id: "2",
    name: "Elegant Knit Scarf",
    description: "Warm and cozy infinity scarf with a delicate stitch pattern.",
    price: 35,
    category: "Accessories",
    main_image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?q=80&w=800&auto=format&fit=crop",
    featured: true,
    status: "Available",
    collection_id: "c2",
  },
  {
    id: "3",
    name: "Boho Wall Hanging",
    description: "A stunning macrame and crochet wall piece for your living space.",
    price: 60,
    category: "Home Décor",
    main_image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop",
    featured: true,
    status: "Made to Order",
    collection_id: "c3",
  },
  {
    id: "4",
    name: "Summer Breeze Top",
    description: "Lightweight and breathable crochet top perfect for the beach.",
    price: 55,
    category: "Clothing",
    main_image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=800&auto=format&fit=crop",
    featured: false,
    status: "Available",
    collection_id: "c1",
  },
  {
    id: "5",
    name: "Custom Beanie",
    description: "Personalized beanie with your choice of colors.",
    price: 25,
    category: "Custom Pieces",
    main_image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop",
    featured: false,
    status: "Made to Order",
  },
  {
    id: "6",
    name: "Classic Throw Blanket",
    description: "Large, comfortable blanket perfect for movie nights.",
    price: 120,
    category: "Home Décor",
    main_image: "https://images.unsplash.com/photo-1583335513577-224b52b7ba1f?q=80&w=800&auto=format&fit=crop",
    featured: false,
    status: "Sold",
    collection_id: "c3",
  }
];

// Helpers
export const getProducts = (): Product[] => {
  const stored = localStorage.getItem("mock_products");
  if (stored) return JSON.parse(stored);
  localStorage.setItem("mock_products", JSON.stringify(mockProducts));
  return mockProducts;
};

export const getCollections = (): Collection[] => {
  const stored = localStorage.getItem("mock_collections");
  if (stored) return JSON.parse(stored);
  localStorage.setItem("mock_collections", JSON.stringify(mockCollections));
  return mockCollections;
};

export const getMedia = (): Media[] => {
  const stored = localStorage.getItem("mock_media");
  if (stored) return JSON.parse(stored);
  localStorage.setItem("mock_media", JSON.stringify(mockMedia));
  return mockMedia;
};
