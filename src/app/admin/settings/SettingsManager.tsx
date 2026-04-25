"use client";

import { useState, useTransition } from "react";
import { saveStoreSettings } from "../actions";
import { Settings, Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { StoreSettings } from "@/lib/types";

export default function SettingsManager({ 
  initialSettings, 
  activeTemplate 
}: { 
  initialSettings: StoreSettings;
  activeTemplate: string;
}) {
  const [settings, setSettings] = useState<StoreSettings>(initialSettings);
  const [isPending, startTransition] = useTransition();
  const [saveMessage, setSaveMessage] = useState("");
  const router = useRouter();

  const currentTemplateColors = settings.templateColors?.[activeTemplate] || {};

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveMessage("");
    
    startTransition(async () => {
      await saveStoreSettings(settings);
      setSaveMessage("Settings saved successfully!");
      router.refresh();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSaveMessage(""), 3000);
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
          <Settings className="w-8 h-8" /> Store Settings
        </h1>
        <p className="text-muted-foreground mt-1">Configure global appearance and layout preferences.</p>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
        <form onSubmit={handleSave} className="p-8">
          
          <div className="space-y-8">
            {/* Identity Settings */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Brand Identity</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Store Name</label>
                  <input 
                    type="text" 
                    value={settings.storeName} 
                    onChange={e => setSettings({...settings, storeName: e.target.value})} 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                  <p className="text-xs text-slate-500 mt-1">This will appear in the navigation bar.</p>
                </div>
              </div>
            </div>

            {/* Colors Settings */}
            <div>
              <div className="flex items-center justify-between mb-4 border-b pb-2">
                <h2 className="text-xl font-bold text-slate-900">Theme Colors</h2>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Editing: {activeTemplate} Template
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(currentTemplateColors).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <div className="flex gap-3">
                      <input 
                        type="color" 
                        value={value} 
                        onChange={e => setSettings({
                          ...settings, 
                          templateColors: { 
                            ...settings.templateColors, 
                            [activeTemplate]: {
                              ...settings.templateColors[activeTemplate],
                              [key]: e.target.value 
                            }
                          }
                        })} 
                        className="h-10 w-16 p-1 rounded border border-slate-300 cursor-pointer" 
                      />
                      <input 
                        type="text" 
                        value={value as string} 
                        onChange={e => setSettings({
                          ...settings, 
                          templateColors: { 
                            ...settings.templateColors, 
                            [activeTemplate]: {
                              ...settings.templateColors[activeTemplate],
                              [key]: e.target.value 
                            }
                          }
                        })} 
                        className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none uppercase" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Layout Settings */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Layout & Display</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Categories Page Layout</label>
                  <select 
                    value={settings.categoriesLayout} 
                    onChange={e => setSettings({...settings, categoriesLayout: e.target.value as 'grid' | 'list'})} 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="grid">Grid (Side-by-side cards)</option>
                    <option value="list">List (Vertical wide cards)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Products Display Style</label>
                  <select 
                    value={settings.productsLayout} 
                    onChange={e => setSettings({...settings, productsLayout: e.target.value as 'static' | 'carousel'})} 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="static">Static Grid</option>
                    <option value="carousel">Horizontal Carousel (Scrollable)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Banner Slider Settings */}
            <div>
              <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Hero Slider Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center gap-2 cursor-pointer mt-4">
                    <input 
                      type="checkbox" 
                      checked={settings.bannerSettings?.autoPlay} 
                      onChange={e => setSettings({...settings, bannerSettings: {...settings.bannerSettings, autoPlay: e.target.checked}})} 
                      className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                    />
                    <span className="text-sm font-medium text-slate-700">Auto-play slider</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Slide Duration (seconds)</label>
                  <input 
                    type="number" 
                    min="1"
                    max="15"
                    value={(settings.bannerSettings?.interval || 5000) / 1000} 
                    onChange={e => setSettings({...settings, bannerSettings: {...settings.bannerSettings, interval: Number(e.target.value) * 1000}})} 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Transition Effect</label>
                  <select 
                    value={settings.bannerSettings?.transition || 'slide'} 
                    onChange={e => setSettings({...settings, bannerSettings: {...settings.bannerSettings, transition: e.target.value as 'slide' | 'fade'}})} 
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="slide">Slide</option>
                    <option value="fade">Fade</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer mt-4">
                    <input 
                      type="checkbox" 
                      checked={settings.bannerSettings?.showArrows ?? true} 
                      onChange={e => setSettings({...settings, bannerSettings: {...settings.bannerSettings, showArrows: e.target.checked}})} 
                      className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                    />
                    <span className="text-sm font-medium text-slate-700">Show Navigation Arrows</span>
                  </label>
                </div>
                <div>
                  <label className="flex items-center gap-2 cursor-pointer mt-4">
                    <input 
                      type="checkbox" 
                      checked={settings.bannerSettings?.showDots ?? true} 
                      onChange={e => setSettings({...settings, bannerSettings: {...settings.bannerSettings, showDots: e.target.checked}})} 
                      className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                    />
                    <span className="text-sm font-medium text-slate-700">Show Pagination Dots</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t flex items-center justify-between">
            <div>
              {saveMessage && (
                <span className="text-green-600 font-medium bg-green-50 px-4 py-2 rounded-lg">
                  {saveMessage}
                </span>
              )}
            </div>
            <button 
              type="submit" 
              disabled={isPending} 
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 flex items-center gap-2 transition-colors disabled:opacity-70"
            >
              {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
              Save Settings
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
