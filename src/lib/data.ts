import { Product, Category, Banner } from "./types";

const initialCategories: Category[] = [
  {
    id: "mens",
    name: "Men's Collection",
    description: "Tailored classics and modern essentials for him.",
    image: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80"
  },
  {
    id: "womens",
    name: "Women's Collection",
    description: "Elegant modest silhouettes and timeless pieces for her.",
    image: "/images/hijab_abaya.png"
  },
  {
    id: "outerwear",
    name: "Outerwear",
    description: "Premium coats and jackets for all seasons.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80"
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "The perfect finishing touches to any outfit.",
    image: "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&q=80"
  },
  {
    id: "essentials",
    name: "Everyday Essentials",
    description: "Comfortable, high-quality basics you'll wear daily.",
    image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80"
  },
  {
    id: "sale",
    name: "End of Season Sale",
    description: "Up to 50% off selected luxury items.",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80"
  }
];

const initialBanners: Banner[] = [
  {
    id: "b1",
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80",
    title: "New Season Arrivals",
    subtitle: "Discover the latest trends in premium fashion.",
    buttonText: "Shop Now",
    buttonLink: "/products",
    isActive: true,
    order: 0,
    templateId: "all"
  },
  {
    id: "b2",
    imageUrl: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&q=80",
    title: "Minimalist Essentials",
    subtitle: "Elevate your everyday wardrobe.",
    buttonText: "Explore Collection",
    buttonLink: "/categories",
    isActive: true,
    order: 1,
    templateId: "all"
  }
];

const initialProducts: Product[] = [
  // WOMENS (MODEST / HIJAB FASHION)
  {
    id: "w1",
    name: "Elegant Pleated Abaya",
    description: "A flowy, elegantly pleated abaya designed for maximum comfort and modesty.",
    category_id: "womens",
    price: 180,
    discount_price: null,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#000000", "#71717a"],
    images: ["/images/hijab_abaya.png"],
    stock_quantity: 20,
    status: 'active'
  },
  {
    id: "w2",
    name: "Modest Silk Blouse",
    description: "Premium silk blouse with long sleeves and high neckline.",
    category_id: "womens",
    price: 120,
    discount_price: 95,
    sizes: ["M", "L", "XL"],
    colors: ["#ffffff", "#fca5a5"],
    images: ["/images/womens_blouse.png"],
    stock_quantity: 15,
    status: 'active'
  },
  {
    id: "w3",
    name: "Essential Tunic",
    description: "Soft, breathable material. Drapes perfectly.",
    category_id: "womens",
    price: 65,
    discount_price: null,
    sizes: ["M", "L", "XL"],
    colors: ["#a1a1aa", "#d4d4d8"],
    images: ["/images/womens_tunic.png"],
    stock_quantity: 100,
    status: 'active'
  },
  {
    id: "w4",
    name: "Layered Maxi Dress",
    description: "Beautifully structured layered maxi dress. Fully opaque.",
    category_id: "womens",
    price: 220,
    discount_price: null,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#064e3b", "#0f172a"],
    images: ["/images/womens_maxi.png"],
    stock_quantity: 30,
    status: 'active'
  },

  // MENS
  {
    id: "m1",
    name: "Tailored Oxford Shirt",
    description: "A crisp, classic oxford shirt tailored for a modern fit.",
    category_id: "mens",
    price: 85,
    discount_price: null,
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#ffffff", "#bfdbfe"],
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"],
    stock_quantity: 50,
    status: 'active'
  },
  {
    id: "m2",
    name: "Classic Wool Blend Suit",
    description: "Elevate your formal wear with this tailored wool blend suit.",
    category_id: "mens",
    price: 450,
    discount_price: 399,
    sizes: ["40R", "42R", "44R"],
    colors: ["#1e293b", "#334155"],
    images: ["/images/mens_suit.png"],
    stock_quantity: 12,
    status: 'active'
  },
  {
    id: "m3",
    name: "Casual Chino Pants",
    description: "Comfortable and versatile. Perfect for both office and weekend.",
    category_id: "mens",
    price: 75,
    discount_price: null,
    sizes: ["30", "32", "34", "36"],
    colors: ["#78716c", "#1c1917"],
    images: ["https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80"],
    stock_quantity: 60,
    status: 'active'
  },

  // OUTERWEAR
  {
    id: "o1",
    name: "Obsidian Overcoat",
    description: "Premium heavy wool overcoat for extreme winters.",
    category_id: "outerwear",
    price: 450,
    discount_price: null,
    sizes: ["M", "L", "XL"],
    colors: ["#000000"],
    images: ["https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80"],
    stock_quantity: 15,
    status: 'active'
  },
  {
    id: "o3",
    name: "Puffer Down Jacket",
    description: "Lightweight yet incredibly warm down jacket.",
    category_id: "outerwear",
    price: 280,
    discount_price: null,
    sizes: ["M", "L", "XL", "XXL"],
    colors: ["#0f172a", "#ef4444"],
    images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80"],
    stock_quantity: 40,
    status: 'active'
  },

  // ACCESSORIES
  {
    id: "a2",
    name: "Signature Accessories",
    description: "Modern finishing touches.",
    category_id: "accessories",
    price: 150,
    discount_price: null,
    sizes: ["One Size"],
    colors: ["#000000"],
    images: ["https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=800&q=80"],
    stock_quantity: 45,
    status: 'active'
  },

  // ESSENTIALS
  {
    id: "e1",
    name: "Essential Pima Tee",
    description: "Your daily driver. Pure organic pima cotton.",
    category_id: "essentials",
    price: 45,
    discount_price: null,
    sizes: ["S", "M", "L", "XL"],
    colors: ["#ffffff", "#000000"],
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"],
  }
];

declare global {
  var _mockProducts: Product[] | undefined;
  var _mockCategories: Category[] | undefined;
  var _mockBanners: Banner[] | undefined;
  var _activeTemplate: string | undefined;
  var _storeSettings: any | undefined;
}

if (!globalThis._mockProducts) {
  globalThis._mockProducts = [...initialProducts];
}
if (!globalThis._mockCategories) {
  globalThis._mockCategories = [...initialCategories];
}
if (!globalThis._mockBanners) {
  globalThis._mockBanners = [...initialBanners];
}
if (!globalThis._activeTemplate) {
  globalThis._activeTemplate = 'luxury'; // default template
}
if (!globalThis._storeSettings) {
  globalThis._storeSettings = {
    storeName: 'LUXE',
    templateColors: {
      luxury: {
        background: '#f8fafc',
        foreground: '#0f172a',
        primary: '#0f172a',
        primaryForeground: '#ffffff',
        accent: '#6366f1',
        accentForeground: '#ffffff',
        success: '#22c55e',
        successForeground: '#ffffff',
        highlight: '#f59e0b',
        highlightForeground: '#ffffff',
        muted: '#64748b',
        mutedForeground: '#f8fafc',
        card: '#ffffff',
        cardForeground: '#0f172a',
        border: '#e2e8f0'
      },
      modern: {
        background: '#ffffff',
        foreground: '#18181b',
        primary: '#3b82f6',
        primaryForeground: '#ffffff',
        accent: '#8b5cf6',
        accentForeground: '#ffffff',
        success: '#10b981',
        successForeground: '#ffffff',
        highlight: '#f59e0b',
        highlightForeground: '#ffffff',
        muted: '#71717a',
        mutedForeground: '#ffffff',
        card: '#ffffff',
        cardForeground: '#18181b',
        border: '#e4e4e7'
      },
      streetwear: {
        background: '#09090b',
        foreground: '#fafafa',
        primary: '#ef4444',
        primaryForeground: '#ffffff',
        accent: '#eab308',
        accentForeground: '#000000',
        success: '#22c55e',
        successForeground: '#ffffff',
        highlight: '#3b82f6',
        highlightForeground: '#ffffff',
        muted: '#a1a1aa',
        mutedForeground: '#09090b',
        card: '#18181b',
        cardForeground: '#fafafa',
        border: '#27272a'
      },
      elegant: {
        background: '#fafaf9',
        foreground: '#44403c',
        primary: '#78716c',
        primaryForeground: '#ffffff',
        accent: '#d97706',
        accentForeground: '#ffffff',
        success: '#65a30d',
        successForeground: '#ffffff',
        highlight: '#b45309',
        highlightForeground: '#ffffff',
        muted: '#a8a29e',
        mutedForeground: '#fafaf9',
        card: '#ffffff',
        cardForeground: '#44403c',
        border: '#e7e5e4'
      },
      amazon: {
        background: '#f3f3f3',
        foreground: '#0f1111',
        primary: '#232f3e',
        primaryForeground: '#ffffff',
        accent: '#febd69',
        accentForeground: '#0f1111',
        success: '#007185',
        successForeground: '#ffffff',
        highlight: '#e47911',
        highlightForeground: '#ffffff',
        muted: '#565959',
        mutedForeground: '#f3f3f3',
        card: '#ffffff',
        cardForeground: '#0f1111',
        border: '#dddddd'
      }
    },
    categoriesLayout: 'grid',
    productsLayout: 'static',
    bannerSettings: {
      autoPlay: true,
      interval: 5000,
      transition: 'slide',
      showArrows: true,
      showDots: true
    },
    marqueeSettings: {
      enabled: true,
      items: [
        { id: "m1", text: "SPECIAL OFFERS" },
        { id: "m2", text: "عروض خاصة" },
        { id: "m3", text: "UP TO 50% OFF" },
        { id: "m4", text: "خصومات تصل إلى ٥٠٪" },
        { id: "m5", text: "FREE SHIPPING" },
        { id: "m6", text: "شحن مجاني" }
      ],
      backgroundColor: "#e2ebe6",
      textColor: "#0f172a",
      speed: 30
    }
  };
} else {
  if (!globalThis._storeSettings.templateColors) {
    // Migration for hot reload
    globalThis._storeSettings.templateColors = {
    luxury: {
      background: '#f8fafc',
      foreground: '#0f172a',
      primary: '#0f172a',
      primaryForeground: '#ffffff',
      accent: '#6366f1',
      accentForeground: '#ffffff',
      success: '#22c55e',
      successForeground: '#ffffff',
      highlight: '#f59e0b',
      highlightForeground: '#ffffff',
      muted: '#64748b',
      mutedForeground: '#f8fafc',
      card: '#ffffff',
      cardForeground: '#0f172a',
      border: '#e2e8f0'
    },
    modern: {
      background: '#ffffff',
      foreground: '#18181b',
      primary: '#3b82f6',
      primaryForeground: '#ffffff',
      accent: '#8b5cf6',
      accentForeground: '#ffffff',
      success: '#10b981',
      successForeground: '#ffffff',
      highlight: '#f59e0b',
      highlightForeground: '#ffffff',
      muted: '#71717a',
      mutedForeground: '#ffffff',
      card: '#ffffff',
      cardForeground: '#18181b',
      border: '#e4e4e7'
    },
    streetwear: {
      background: '#09090b',
      foreground: '#fafafa',
      primary: '#ef4444',
      primaryForeground: '#ffffff',
      accent: '#eab308',
      accentForeground: '#000000',
      success: '#22c55e',
      successForeground: '#ffffff',
      highlight: '#3b82f6',
      highlightForeground: '#ffffff',
      muted: '#a1a1aa',
      mutedForeground: '#09090b',
      card: '#18181b',
      cardForeground: '#fafafa',
      border: '#27272a'
    },
    elegant: {
      background: '#fafaf9',
      foreground: '#44403c',
      primary: '#78716c',
      primaryForeground: '#ffffff',
      accent: '#d97706',
      accentForeground: '#ffffff',
      success: '#65a30d',
      successForeground: '#ffffff',
      highlight: '#b45309',
      highlightForeground: '#ffffff',
      muted: '#a8a29e',
      mutedForeground: '#fafaf9',
      card: '#ffffff',
      cardForeground: '#44403c',
      border: '#e7e5e4'
    },
    amazon: {
      background: '#f3f3f3',
      foreground: '#0f1111',
      primary: '#232f3e',
      primaryForeground: '#ffffff',
      accent: '#febd69',
      accentForeground: '#0f1111',
      success: '#007185',
      successForeground: '#ffffff',
      highlight: '#e47911',
      highlightForeground: '#ffffff',
      muted: '#565959',
      mutedForeground: '#f3f3f3',
      card: '#ffffff',
      cardForeground: '#0f1111',
      border: '#dddddd'
    }
  };
  }

  if (!globalThis._storeSettings.bannerSettings) {
    globalThis._storeSettings.bannerSettings = {
      autoPlay: true,
      interval: 5000,
      transition: 'slide',
      showArrows: true,
      showDots: true
    };
  }

  if (!globalThis._storeSettings.marqueeSettings) {
    globalThis._storeSettings.marqueeSettings = {
      enabled: true,
      items: [
        { id: "m1", text: "SPECIAL OFFERS" },
        { id: "m2", text: "عروض خاصة" },
        { id: "m3", text: "UP TO 50% OFF" },
        { id: "m4", text: "خصومات تصل إلى ٥٠٪" },
        { id: "m5", text: "FREE SHIPPING" },
        { id: "m6", text: "شحن مجاني" }
      ],
      backgroundColor: "#e2ebe6",
      textColor: "#0f172a",
      speed: 30
    };
  }
}

export const mockProducts = globalThis._mockProducts;
export const mockCategories = globalThis._mockCategories;
export let getMockBanners = () => globalThis._mockBanners || [];
export let setMockBanners = (banners: Banner[]) => {
  globalThis._mockBanners = banners;
};
export let getActiveTemplate = () => globalThis._activeTemplate || 'luxury';
export let setActiveTemplate = (templateId: string) => {
  globalThis._activeTemplate = templateId;
};
export let getStoreSettings = () => globalThis._storeSettings;
export let updateStoreSettings = (newSettings: any) => {
  globalThis._storeSettings = { ...globalThis._storeSettings, ...newSettings };
};
