"use client";

import { useState, useTransition } from "react";
import { saveBanners } from "../actions";
import { Banner } from "@/lib/types";
import { Loader2, Plus, Save, Trash2, ArrowUp, ArrowDown, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function BannersManager({ initialBanners }: { initialBanners: Banner[] }) {
  const [banners, setBanners] = useState<Banner[]>(initialBanners.sort((a, b) => a.order - b.order));
  const [isPending, startTransition] = useTransition();
  const [saveMessage, setSaveMessage] = useState("");
  const router = useRouter();

  const handleAddBanner = () => {
    const newBanner: Banner = {
      id: `b-${Date.now()}`,
      imageUrl: "",
      title: "New Banner",
      subtitle: "Add a catchy subtitle here",
      buttonText: "Shop Now",
      buttonLink: "/products",
      isActive: true,
      order: banners.length,
      templateId: "all"
    };
    setBanners([...banners, newBanner]);
  };

  const handleRemoveBanner = (id: string) => {
    setBanners(banners.filter(b => b.id !== id).map((b, idx) => ({ ...b, order: idx })));
  };

  const moveBanner = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === banners.length - 1)) return;
    
    const newBanners = [...banners];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    // Swap order
    [newBanners[index], newBanners[swapIndex]] = [newBanners[swapIndex], newBanners[index]];
    
    // Update order property
    newBanners.forEach((b, idx) => b.order = idx);
    setBanners(newBanners);
  };

  const updateBanner = (index: number, field: keyof Banner, value: any) => {
    const newBanners = [...banners];
    newBanners[index] = { ...newBanners[index], [field]: value };
    setBanners(newBanners);
  };

  const handleSave = async () => {
    setSaveMessage("");
    startTransition(async () => {
      await saveBanners(banners);
      setSaveMessage("Banners saved successfully!");
      router.refresh();
      setTimeout(() => setSaveMessage(""), 3000);
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <ImageIcon className="w-8 h-8" /> Banners Management
          </h1>
          <p className="text-muted-foreground mt-1">Manage the hero sliders displayed on the homepage.</p>
        </div>
        <button 
          onClick={handleAddBanner}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 flex items-center gap-2 transition-opacity"
        >
          <Plus className="w-4 h-4" /> Add Banner
        </button>
      </div>

      <div className="space-y-6">
        {banners.length === 0 ? (
          <div className="bg-card border border-border/50 rounded-2xl p-12 text-center">
            <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-primary mb-2">No banners yet</h3>
            <p className="text-muted-foreground mb-4">Add your first banner to display on the homepage.</p>
            <button onClick={handleAddBanner} className="text-accent font-medium hover:underline">
              Create Banner
            </button>
          </div>
        ) : (
          banners.map((banner, index) => (
            <div key={banner.id} className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden flex flex-col md:flex-row">
              {/* Preview Side */}
              <div className="w-full md:w-1/3 bg-slate-100 relative min-h-[200px] flex items-center justify-center border-b md:border-b-0 md:border-r border-border/50">
                {banner.imageUrl ? (
                  <Image 
                    src={banner.imageUrl} 
                    alt="Banner preview" 
                    fill 
                    className="object-cover" 
                    unoptimized={banner.imageUrl.startsWith('http')}
                  />
                ) : (
                  <span className="text-muted-foreground text-sm flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> No Image
                  </span>
                )}
                {/* Overlay preview text */}
                <div className="absolute inset-0 bg-black/40 p-6 flex flex-col justify-center text-white">
                  <h3 className="text-xl font-bold">{banner.title || 'Title'}</h3>
                  <p className="text-sm opacity-80 mt-1">{banner.subtitle || 'Subtitle'}</p>
                </div>
              </div>

              {/* Form Side */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-100 text-slate-500 font-bold px-3 py-1 rounded-full text-xs">
                      #{index + 1}
                    </span>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={banner.isActive} 
                        onChange={(e) => updateBanner(index, 'isActive', e.target.checked)}
                        className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                      />
                      <span className="text-sm font-medium text-slate-700">Active</span>
                    </label>
                  </div>
                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => moveBanner(index, 'up')} 
                      disabled={index === 0}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded disabled:opacity-30 transition-colors"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => moveBanner(index, 'down')} 
                      disabled={index === banners.length - 1}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded disabled:opacity-30 transition-colors"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleRemoveBanner(banner.id)} 
                      className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-xs font-medium text-slate-500 mb-1">Image URL</label>
                    <input 
                      type="text" 
                      value={banner.imageUrl} 
                      onChange={e => updateBanner(index, 'imageUrl', e.target.value)} 
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Title</label>
                    <input 
                      type="text" 
                      value={banner.title} 
                      onChange={e => updateBanner(index, 'title', e.target.value)} 
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-sm font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Subtitle</label>
                    <input 
                      type="text" 
                      value={banner.subtitle} 
                      onChange={e => updateBanner(index, 'subtitle', e.target.value)} 
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Button Text</label>
                    <input 
                      type="text" 
                      value={banner.buttonText} 
                      onChange={e => updateBanner(index, 'buttonText', e.target.value)} 
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Button Link</label>
                    <input 
                      type="text" 
                      value={banner.buttonLink} 
                      onChange={e => updateBanner(index, 'buttonLink', e.target.value)} 
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2 mt-2 pt-2 border-t border-slate-100">
                    <label className="block text-xs font-medium text-slate-500 mb-1">Target Template</label>
                    <select 
                      value={banner.templateId || "all"} 
                      onChange={e => updateBanner(index, 'templateId', e.target.value)} 
                      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-sm bg-white"
                    >
                      <option value="all">All Templates (Global)</option>
                      <option value="luxury">Luxury Minimalist</option>
                      <option value="modern">Modern Grid</option>
                      <option value="streetwear">Edgy Streetwear</option>
                      <option value="elegant">Elegant Boutique</option>
                    </select>
                    <p className="text-[10px] text-muted-foreground mt-1">If a specific template is chosen, this banner will only appear when that template is active.</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 pt-6 border-t flex items-center justify-between sticky bottom-0 bg-background/80 backdrop-blur-sm p-4 rounded-xl">
        <div>
          {saveMessage && (
            <span className="text-green-600 font-medium bg-green-50 px-4 py-2 rounded-lg text-sm">
              {saveMessage}
            </span>
          )}
        </div>
        <button 
          onClick={handleSave}
          disabled={isPending} 
          className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-bold hover:opacity-90 flex items-center gap-2 transition-opacity disabled:opacity-70 shadow-lg"
        >
          {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
          Save Changes
        </button>
      </div>
    </div>
  );
}
