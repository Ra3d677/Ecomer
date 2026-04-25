export interface StoreSettings {
  storeName: string;
  primaryColor?: string;
  templateColors: {
    [templateId: string]: {
      background: string;
      foreground: string;
      primary: string;
      primaryForeground: string;
      accent: string;
      accentForeground: string;
      success: string;
      successForeground: string;
      highlight: string;
      highlightForeground: string;
      muted: string;
      mutedForeground: string;
      card: string;
      cardForeground: string;
      border: string;
    }
  };
  categoriesLayout: 'grid' | 'list' | 'mosaic' | 'minimal' | 'modern';
  collectionPageSettings?: {
    columns: 2 | 3 | 4;
    showProductCount: boolean;
    cardStyle: 'glass' | 'classic' | 'minimal' | 'gradient';
    bannerEnabled: boolean;
  };
  productsLayout: 'static' | 'carousel';
  bannerSettings: BannerSettings;
  marqueeSettings: {
    enabled: boolean;
    items: { id: string; text: string; }[];
    backgroundColor: string;
    textColor: string;
    speed: number;
  };
}

export interface BannerSettings {
  autoPlay: boolean;
  interval: number; // in milliseconds
  transition: 'slide' | 'fade';
  showArrows: boolean;
  showDots: boolean;
}

export interface Banner {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  order: number;
  templateId?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  created_at?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category_id: string;
  price: number;
  discount_price: number | null;
  sizes: string[];
  colors: string[];
  images: string[];
  stock_quantity: number;
  status: 'active' | 'inactive';
  created_at?: string;
}

export interface CartItem {
  id: string; // unique id for cart item (product_id + size + color)
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}
