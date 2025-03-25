
import { Product } from "../components/products/ProductCard";

const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Premium Wireless Earbuds",
    description: "Experience superior sound quality with these premium wireless earbuds. Features noise cancellation and long battery life.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    category: "electronics",
    featured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: "2",
    name: "Minimalist Wristwatch",
    description: "A sleek, minimalist wristwatch with a leather strap. Perfect for any occasion.",
    price: 89.95,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1699&q=80",
    category: "accessories",
    inStock: true,
    rating: 4.5
  },
  {
    id: "3",
    name: "Touchscreen Smartwatch",
    description: "Stay connected with this feature-packed smartwatch. Includes fitness tracking, notifications, and more.",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    category: "electronics",
    featured: true,
    inStock: true,
    rating: 4.7
  },
  {
    id: "4",
    name: "Leather Wallet",
    description: "Handcrafted genuine leather wallet with multiple card slots and RFID protection.",
    price: 49.95,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1665&q=80",
    category: "accessories",
    inStock: true,
    rating: 4.3
  },
  {
    id: "5",
    name: "Portable Bluetooth Speaker",
    description: "Powerful sound in a compact, water-resistant design. Perfect for outdoor adventures.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80",
    category: "electronics",
    inStock: true,
    rating: 4.6
  },
  {
    id: "6",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging for compatible devices. Sleek, modern design.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=768&q=80",
    category: "electronics",
    inStock: true,
    rating: 4.2
  },
  {
    id: "7",
    name: "Premium Sunglasses",
    description: "UV-protected premium sunglasses with polarized lenses. Lightweight and durable.",
    price: 129.00,
    image: "https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    category: "accessories",
    inStock: false,
    rating: 4.9
  },
  {
    id: "8",
    name: "Noise-Cancelling Headphones",
    description: "Premium over-ear headphones with active noise cancellation for immersive listening.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
    category: "electronics",
    featured: true,
    inStock: true,
    rating: 4.8
  },
  {
    id: "9",
    name: "Stainless Steel Water Bottle",
    description: "Double-walled, vacuum-insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    price: 29.95,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1637&q=80",
    category: "lifestyle",
    inStock: true,
    rating: 4.4
  },
  {
    id: "10",
    name: "Smart Home Hub",
    description: "Control your smart home devices with voice commands. Compatible with multiple platforms.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc0d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1665&q=80",
    category: "electronics",
    inStock: true,
    rating: 4.3
  },
  {
    id: "11",
    name: "Fitness Tracker",
    description: "Monitor your activity, sleep, and more with this sleek fitness tracker.",
    price: 99.95,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1888&q=80",
    category: "electronics",
    inStock: true,
    rating: 4.5
  },
  {
    id: "12",
    name: "Travel Backpack",
    description: "Durable, water-resistant backpack with multiple compartments. Perfect for travel or daily use.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1364&q=80",
    category: "accessories",
    inStock: true,
    rating: 4.6
  },
];

export default MOCK_PRODUCTS;
