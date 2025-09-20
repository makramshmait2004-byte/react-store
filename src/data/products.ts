import type { Product } from "../store/useStore";

export const productsData: Product[] = [
  { id: 1, name: "Black Nike T-Shirt", image: "Products_image/image1.png", price: 30, brand: "Nike", sizes: ["S", "M", "L"], color: "black", items_Left: 12 },
  { id: 2, name: "Adidas Classic Tee", image: "Products_image/image2.png", price: 40, brand: "Adidas", sizes: ["S", "M", "L"], color: "gray", items_Left: 8 },
  { id: 3, name: "Puma Running Shoes", image: "Products_image/image3.png", price: 120, brand: "Puma", sizes: ["S", "M", "L", "XL"], color: "white", items_Left: 5 },
  { id: 4, name: "Reebok Hoodie", image: "Products_image/image4.png", price: 80, brand: "Reebok", sizes: ["S", "M", "L"], color: "red", items_Left: 3 },
];
