export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Artisan Tote Bag",
    price: 89.99,
    image: "/src/assets/product1.jpg",
    description: "Handcrafted crochet tote with premium fabric accents"
  },
  {
    id: "2",
    name: "Cozy Throw Blanket",
    price: 149.99,
    image: "/src/assets/product2.jpg",
    description: "Luxurious mixed-media throw blanket for your home"
  },
  {
    id: "3",
    name: "Decorative Pillow",
    price: 59.99,
    image: "/src/assets/product3.jpg",
    description: "Unique crochet and fabric decorative pillow"
  },
  {
    id: "4",
    name: "Bohemian Shawl",
    price: 129.99,
    image: "/src/assets/product4.jpg",
    description: "Elegant crochet shawl with intricate lace pattern"
  },
  {
    id: "5",
    name: "Crochet Crop Top",
    price: 79.99,
    image: "/src/assets/product5.jpg",
    description: "Handmade burnt orange crop top, perfect for layering"
  },
  {
    id: "6",
    name: "Wide-Leg Crochet Pants",
    price: 159.99,
    image: "/src/assets/product6.jpg",
    description: "Lightweight crochet trousers with relaxed fit"
  },
  {
    id: "7",
    name: "Boho Maxi Dress",
    price: 199.99,
    image: "/src/assets/product7.jpg",
    description: "Stunning crochet maxi dress with geometric patterns"
  },
  {
    id: "8",
    name: "Sunset Cardigan",
    price: 139.99,
    image: "/src/assets/product8.jpg",
    description: "Cozy crochet cardigan in warm sunset tones"
  },
  {
    id: "9",
    name: "Crochet Midi Skirt",
    price: 119.99,
    image: "/src/assets/product9.jpg",
    description: "Handcrafted midi skirt with delicate lace details"
  }
];
