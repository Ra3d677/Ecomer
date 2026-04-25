"use client";

import { useState, useTransition } from "react";
import { saveStoreSettings } from "../actions";
import { StoreSettings } from "@/lib/types";
import { Loader2, Plus, Save, Trash2, ArrowUp, ArrowDown, Type } from "lucide-react";
import { useRouter } from "next/navigation";
import StoreMarquee from "@/components/ui/StoreMarquee";

export default function MarqueeManager({ initialSettings }: { initialSettings: StoreSettings }) {
  const [settings, setSettings] = useState<StoreSettings>(initialSettings);
  const [isPending, startTransition] = useTransition();
  const [saveMessage, setSaveMessage] = useState("");
  const router = useRouter();

  const marquee = settings.marqueeSettings;

  const updateMarquee = (field: keyof typeof marquee, value: any) => {
    setSettings(prev => ({
      ...prev,
      marqueeSettings: {
        ...prev.marqueeSettings,
        [field]: value
      }
    }));
  };

  const handleAddItem = () => {
    const newItem = { id: `m-${Date.now()}`, text: "New Item" };
    updateMarquee('items', [...marquee.items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    updateMarquee('items', marquee.items.filter(item => item.id !== id));
  };

  const updateItemText = (id: string, text: string) => {
    updateMarquee('items', marquee.items.map(item => item.id === id ? { ...item, text } : item));
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === marquee.items.length - 1)) return;
    
    const newItems = [...marquee.items];
    const swapIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newItems[index], newItems[swapIndex]] = [newItems[swapIndex], newItems[index]];
    updateMarquee('items', newItems);
  };

  const handleSave = async () => {
    setSaveMessage("");
    startTransition(async () => {
      await saveStoreSettings(settings);
      setSaveMessage("Marquee settings saved successfully!");
      router.refresh();
      setTimeout(() => setSaveMessage(""), 3000);
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
            <Type className="w-8 h-8" /> Marquee Settings
          </h1>
          <p className="text-muted-foreground mt-1">Manage the scrolling announcement bar.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-primary">Marquee Items</h2>
              <button 
                onClick={handleAddItem}
                className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-sm font-medium hover:opacity-90 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>

            <div className="space-y-3">
              {marquee.items.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  No items added yet. Click 'Add Item' to start.
                </div>
              ) : (
                marquee.items.map((item, index) => (
                  <div key={item.id} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex flex-col gap-1">
                      <button 
                        onClick={() => moveItem(index, 'up')}
                        disabled={index === 0}
                        className="text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      >
                        <ArrowUp className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => moveItem(index, 'down')}
                        disabled={index === marquee.items.length - 1}
                        className="text-slate-400 hover:text-slate-700 disabled:opacity-30"
                      >
                        <ArrowDown className="w-4 h-4" />
                      </button>
                    </div>
                    <input 
                      type="text" 
                      value={item.text}
                      onChange={(e) => updateItemText(item.id, e.target.value)}
                      className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card rounded-2xl border border-border/50 shadow-sm p-6">
            <h2 className="text-xl font-bold text-primary mb-6">Appearance</h2>
            
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer p-3 bg-slate-50 rounded-xl border border-slate-100">
                <input 
                  type="checkbox" 
                  checked={marquee.enabled} 
                  onChange={(e) => updateMarquee('enabled', e.target.checked)}
                  className="w-5 h-5 rounded text-primary focus:ring-primary accent-primary"
                />
                <span className="font-medium text-slate-700">Enable Marquee</span>
              </label>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Background Color</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={marquee.backgroundColor} 
                    onChange={(e) => updateMarquee('backgroundColor', e.target.value)}
                    className="w-10 h-10 rounded border-0 cursor-pointer p-0"
                  />
                  <input 
                    type="text" 
                    value={marquee.backgroundColor} 
                    onChange={(e) => updateMarquee('backgroundColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none uppercase font-mono text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Text Color</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    value={marquee.textColor} 
                    onChange={(e) => updateMarquee('textColor', e.target.value)}
                    className="w-10 h-10 rounded border-0 cursor-pointer p-0"
                  />
                  <input 
                    type="text" 
                    value={marquee.textColor} 
                    onChange={(e) => updateMarquee('textColor', e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none uppercase font-mono text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Animation Speed (seconds)</label>
                <input 
                  type="number" 
                  min="5" 
                  max="100" 
                  value={marquee.speed} 
                  onChange={(e) => updateMarquee('speed', parseInt(e.target.value) || 30)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                />
                <p className="text-xs text-muted-foreground mt-1">Lower is faster, higher is slower.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 mb-4">
        <h2 className="text-xl font-bold text-primary mb-4">Live Preview</h2>
        <div className="rounded-2xl border-4 border-slate-100 overflow-hidden">
          <StoreMarquee settings={marquee} />
        </div>
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
