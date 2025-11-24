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
  }
];
