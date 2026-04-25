import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing Supabase URL or Anon Key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// We define the mock data directly here to avoid issues importing from Next.js project
const initialCategories = [
  { id: "mens", name: "Men's Collection", description: "Tailored classics and modern essentials for him.", image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80" },
  { id: "womens", name: "Women's Collection", description: "Elegant modest silhouettes and timeless pieces for her.", image: "/images/hijab_abaya.png" },
  { id: "outerwear", name: "Outerwear", description: "Premium coats and jackets for all seasons.", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80" },
  { id: "accessories", name: "Accessories", description: "The perfect finishing touches to any outfit.", image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&q=80" },
  { id: "essentials", name: "Everyday Essentials", description: "Comfortable, high-quality basics you'll wear daily.", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80" },
  { id: "sale", name: "End of Season Sale", description: "Up to 50% off selected luxury items.", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80" }
];

const initialBanners = [
  { id: "b1", image_url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80", title: "New Season Arrivals", subtitle: "Discover the latest trends in premium fashion.", button_text: "Shop Now", button_link: "/products", is_active: true, order: 0, template_id: "all" },
  { id: "b2", image_url: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80", title: "Minimalist Essentials", subtitle: "Elevate your everyday wardrobe.", button_text: "Explore Collection", button_link: "/categories", is_active: true, order: 1, template_id: "all" }
];

const initialProducts = [
  { id: "w1", name: "Elegant Pleated Abaya", description: "A flowy, elegantly pleated abaya designed for maximum comfort and modesty.", category_id: "womens", price: 180, discount_price: null, sizes: ["S", "M", "L", "XL"], colors: ["#000000", "#71717a"], images: ["/images/hijab_abaya.png"], stock_quantity: 20, status: 'active' },
  { id: "w2", name: "Modest Silk Blouse", description: "Premium silk blouse with long sleeves and high neckline.", category_id: "womens", price: 120, discount_price: 95, sizes: ["M", "L", "XL"], colors: ["#ffffff", "#fca5a5"], images: ["/images/womens_blouse.png"], stock_quantity: 15, status: 'active' },
  { id: "w3", name: "Essential Tunic", description: "Soft, breathable material. Drapes perfectly.", category_id: "womens", price: 65, discount_price: null, sizes: ["M", "L", "XL"], colors: ["#a1a1aa", "#d4d4d8"], images: ["/images/womens_tunic.png"], stock_quantity: 100, status: 'active' },
  { id: "w4", name: "Layered Maxi Dress", description: "Beautifully structured layered maxi dress. Fully opaque.", category_id: "womens", price: 220, discount_price: null, sizes: ["S", "M", "L", "XL"], colors: ["#064e3b", "#0f172a"], images: ["/images/womens_maxi.png"], stock_quantity: 30, status: 'active' },
  { id: "m1", name: "Tailored Oxford Shirt", description: "A crisp, classic oxford shirt tailored for a modern fit.", category_id: "mens", price: 85, discount_price: null, sizes: ["M", "L", "XL", "XXL"], colors: ["#ffffff", "#bfdbfe"], images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"], stock_quantity: 50, status: 'active' },
  { id: "m2", name: "Classic Wool Blend Suit", description: "Elevate your formal wear with this tailored wool blend suit.", category_id: "mens", price: 450, discount_price: 399, sizes: ["40R", "42R", "44R"], colors: ["#1e293b", "#334155"], images: ["/images/mens_suit.png"], stock_quantity: 12, status: 'active' },
  { id: "m3", name: "Casual Chino Pants", description: "Comfortable and versatile. Perfect for both office and weekend.", category_id: "mens", price: 75, discount_price: null, sizes: ["30", "32", "34", "36"], colors: ["#78716c", "#1c1917"], images: ["https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80"], stock_quantity: 60, status: 'active' },
  { id: "o1", name: "Obsidian Overcoat", description: "Premium heavy wool overcoat for extreme winters.", category_id: "outerwear", price: 450, discount_price: null, sizes: ["M", "L", "XL"], colors: ["#000000"], images: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80"], stock_quantity: 15, status: 'active' },
  { id: "o3", name: "Puffer Down Jacket", description: "Lightweight yet incredibly warm down jacket.", category_id: "outerwear", price: 280, discount_price: null, sizes: ["M", "L", "XL", "XXL"], colors: ["#0f172a", "#ef4444"], images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80"], stock_quantity: 40, status: 'active' },
  { id: "a2", name: "Signature Accessories", description: "Modern finishing touches.", category_id: "accessories", price: 150, discount_price: null, sizes: ["One Size"], colors: ["#000000"], images: ["https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&q=80"], stock_quantity: 45, status: 'active' },
  { id: "e1", name: "Essential Pima Tee", description: "Your daily driver. Pure organic pima cotton.", category_id: "essentials", price: 45, discount_price: null, sizes: ["S", "M", "L", "XL"], colors: ["#ffffff", "#000000"], images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"], stock_quantity: 100, status: 'active' }
];

async function seed() {
  console.log("Starting DB seed...");

  // 1. Seed Categories
  const { error: catError } = await supabase.from('categories').upsert(initialCategories);
  if (catError) console.error("Error inserting categories:", catError);
  else console.log("Categories seeded successfully.");

  // 2. Seed Products
  const { error: prodError } = await supabase.from('products').upsert(initialProducts);
  if (prodError) console.error("Error inserting products:", prodError);
  else console.log("Products seeded successfully.");

  // 3. Seed Banners
  const { error: banError } = await supabase.from('banners').upsert(initialBanners);
  if (banError) console.error("Error inserting banners:", banError);
  else console.log("Banners seeded successfully.");

  console.log("Seeding complete!");
}

seed().catch(console.error);
