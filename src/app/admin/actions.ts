"use server";

import { supabase } from "@/lib/supabase";
import { Product, Category, Banner } from "@/lib/types";
import { revalidatePath } from "next/cache";

export async function deleteProduct(productId: string) {
  const { error } = await supabase.from('products').delete().eq('id', productId);
  if (error) console.error("Error deleting product:", error);
  revalidatePath("/", "layout");
}

export async function addProduct(product: Omit<Product, "id">) {
  const newProduct = {
    ...product,
    id: `p-${Date.now()}`
  };
  const { error } = await supabase.from('products').insert(newProduct);
  if (error) console.error("Error adding product:", error);
  revalidatePath("/", "layout");
}

export async function updateProduct(productId: string, updates: Partial<Product>) {
  const { error } = await supabase.from('products').update(updates).eq('id', productId);
  if (error) console.error("Error updating product:", error);
  revalidatePath("/", "layout");
}

export async function deleteCategory(categoryId: string) {
  const { error } = await supabase.from('categories').delete().eq('id', categoryId);
  if (error) console.error("Error deleting category:", error);
  revalidatePath("/", "layout");
}

export async function addCategory(category: Omit<Category, "id">) {
  const newCategory = {
    ...category,
    id: category.name.toLowerCase().replace(/[^a-z0-9]/g, '-')
  };
  const { error } = await supabase.from('categories').insert(newCategory);
  if (error) console.error("Error adding category:", error);
  revalidatePath("/", "layout");
}

export async function updateCategory(categoryId: string, updates: Partial<Category>) {
  const { error } = await supabase.from('categories').update(updates).eq('id', categoryId);
  if (error) console.error("Error updating category:", error);
  revalidatePath("/", "layout");
}

export async function saveStoreSettings(settings: any) {
  // Assuming there's only one row in store_settings, we update the first one
  const { data: existing } = await supabase.from('store_settings').select('id').limit(1).single();
  
  if (existing) {
    const { error } = await supabase.from('store_settings').update({
      store_name: settings.storeName,
      template_colors: settings.templateColors,
      categories_layout: settings.categoriesLayout,
      products_layout: settings.productsLayout,
      banner_settings: settings.bannerSettings,
      marquee_settings: settings.marqueeSettings,
      collection_page_settings: settings.collectionPageSettings
    }).eq('id', existing.id);
    if (error) console.error("Error saving settings:", error);
  }
  revalidatePath("/", "layout");
}

export async function saveBanners(banners: Banner[]) {
  // Since we don't have a simple upsert array replacement, we delete all and insert
  // Warning: in production, you might want a safer update strategy
  await supabase.from('banners').delete().neq('id', 'non-existent-id'); // deletes all
  
  const bannersToInsert = banners.map(b => ({
    id: b.id,
    image_url: b.imageUrl,
    title: b.title,
    subtitle: b.subtitle,
    button_text: b.buttonText,
    button_link: b.buttonLink,
    is_active: b.isActive,
    order: b.order,
    template_id: b.templateId
  }));
  
  const { error } = await supabase.from('banners').insert(bannersToInsert);
  if (error) console.error("Error saving banners:", error);
  revalidatePath("/", "layout");
}

export async function updateActiveTemplate(templateId: string) {
  // Since active_template wasn't in our store_settings schema initially,
  // we'll just save it to an environment variable or store it in marquee_settings temporarily
  // for this migration step, until we add a proper column.
  // Actually, let's update a dummy row or just rely on a new column `active_template`.
  // To avoid breaking, we will add it to the settings JSON or similar.
  // For now, let's try to update store_settings if we alter the table later.
  
  const { data: existing } = await supabase.from('store_settings').select('id, marquee_settings').limit(1).single();
  if (existing) {
    const updatedMarquee = { ...existing.marquee_settings, _activeTemplate: templateId };
    await supabase.from('store_settings').update({ marquee_settings: updatedMarquee }).eq('id', existing.id);
  }
  revalidatePath("/", "layout");
}
