-- Categories Table
CREATE TABLE categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Products Table
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category_id TEXT REFERENCES categories(id) ON DELETE SET NULL,
  price DECIMAL NOT NULL,
  discount_price DECIMAL,
  sizes TEXT[] DEFAULT '{}',
  colors TEXT[] DEFAULT '{}',
  images TEXT[] DEFAULT '{}',
  stock_quantity INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Banners Table
CREATE TABLE banners (
  id TEXT PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  button_text TEXT,
  button_link TEXT,
  is_active BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  template_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Store Settings Table
CREATE TABLE store_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_name TEXT DEFAULT 'LUXE',
  template_colors JSONB,
  categories_layout TEXT DEFAULT 'grid',
  products_layout TEXT DEFAULT 'static' CHECK (products_layout IN ('static', 'carousel')),
  banner_settings JSONB,
  marquee_settings JSONB,
  collection_page_settings JSONB,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert default settings row
INSERT INTO store_settings (
  id,
  store_name, 
  template_colors,
  categories_layout,
  products_layout,
  banner_settings,
  marquee_settings,
  collection_page_settings
) VALUES (
  gen_random_uuid(),
  'LUXE',
  '{"luxury":{"card":"#ffffff","muted":"#64748b","accent":"#6366f1","border":"#e2e8f0","primary":"#0f172a","success":"#22c55e","highlight":"#f59e0b","background":"#f8fafc","foreground":"#0f172a","cardForeground":"#0f172a","mutedForeground":"#f8fafc","accentForeground":"#ffffff","primaryForeground":"#ffffff","successForeground":"#ffffff","highlightForeground":"#ffffff"},"amazon":{"card":"#ffffff","muted":"#565959","accent":"#febd69","border":"#dddddd","primary":"#232f3e","success":"#007185","highlight":"#e47911","background":"#f3f3f3","foreground":"#0f1111","cardForeground":"#0f1111","mutedForeground":"#f3f3f3","accentForeground":"#0f1111","primaryForeground":"#ffffff","successForeground":"#ffffff","highlightForeground":"#ffffff"},"modern":{"card":"#ffffff","muted":"#71717a","accent":"#8b5cf6","border":"#e4e4e7","primary":"#3b82f6","success":"#10b981","highlight":"#f59e0b","background":"#ffffff","foreground":"#18181b","cardForeground":"#18181b","mutedForeground":"#ffffff","accentForeground":"#ffffff","primaryForeground":"#ffffff","successForeground":"#ffffff","highlightForeground":"#ffffff"},"elegant":{"card":"#ffffff","muted":"#a8a29e","accent":"#d97706","border":"#e7e5e4","primary":"#78716c","success":"#65a30d","highlight":"#b45309","background":"#fafaf9","foreground":"#44403c","cardForeground":"#44403c","mutedForeground":"#fafaf9","accentForeground":"#ffffff","primaryForeground":"#ffffff","successForeground":"#ffffff","highlightForeground":"#ffffff"},"streetwear":{"card":"#18181b","muted":"#a1a1aa","accent":"#eab308","border":"#27272a","primary":"#ef4444","success":"#22c55e","highlight":"#3b82f6","background":"#09090b","foreground":"#fafafa","cardForeground":"#fafafa","mutedForeground":"#09090b","accentForeground":"#000000","primaryForeground":"#ffffff","successForeground":"#ffffff","highlightForeground":"#ffffff"}}'::jsonb,
  'grid',
  'static',
  '{"autoPlay":true,"interval":5000,"showDots":true,"transition":"slide","showArrows":true}'::jsonb,
  '{"items":[{"id":"m1","text":"SPECIAL OFFERS"},{"id":"m2","text":"عروض خاصة"},{"id":"m3","text":"UP TO 50% OFF"},{"id":"m4","text":"خصومات تصل إلى ٥٠٪"},{"id":"m5","text":"FREE SHIPPING"},{"id":"m6","text":"شحن مجاني"}],"speed":30,"enabled":true,"textColor":"#0f172a","backgroundColor":"#e2ebe6"}'::jsonb,
  '{"columns":3,"showProductCount":true,"cardStyle":"classic","bannerEnabled":true}'::jsonb
);

-- Setup Row Level Security (RLS) policies
-- For testing purposes, we'll allow all public read/write. Later you can secure it.
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable all for users" ON categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for users" ON products FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for users" ON banners FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all for users" ON store_settings FOR ALL USING (true) WITH CHECK (true);
