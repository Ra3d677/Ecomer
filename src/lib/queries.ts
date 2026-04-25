import { supabase } from './supabase';
import { Product, Category, Banner, StoreSettings } from './types';

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return data as Product[];
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
  return data as Category[];
}

export async function getBanners(): Promise<Banner[]> {
  const { data, error } = await supabase.from('banners').select('*').order('order', { ascending: true });
  if (error) {
    console.error('Error fetching banners:', error);
    return [];
  }
  return data.map((b: any) => ({
    id: b.id,
    imageUrl: b.image_url,
    title: b.title,
    subtitle: b.subtitle,
    buttonText: b.button_text,
    buttonLink: b.button_link,
    isActive: b.is_active,
    order: b.order,
    templateId: b.template_id
  })) as Banner[];
}

export async function getStoreSettings(): Promise<StoreSettings | null> {
  const { data, error } = await supabase.from('store_settings').select('*').limit(1).single();
  if (error) {
    console.error('Error fetching store settings:', error);
    return null;
  }
  
  if (data) {
    return {
      storeName: data.store_name,
      templateColors: data.template_colors,
      categoriesLayout: data.categories_layout,
      productsLayout: data.products_layout,
      bannerSettings: data.banner_settings,
      marqueeSettings: data.marquee_settings,
      collectionPageSettings: data.collection_page_settings
    } as StoreSettings;
  }
  
  return null;
}

export async function getActiveTemplate(): Promise<string> {
  const { data } = await supabase.from('store_settings').select('marquee_settings').limit(1).single();
  if (data && data.marquee_settings && data.marquee_settings._activeTemplate) {
    return data.marquee_settings._activeTemplate;
  }
  return 'luxury'; // default
}
