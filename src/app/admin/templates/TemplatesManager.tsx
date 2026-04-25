"use client";

import { useState, useTransition } from "react";
import { updateActiveTemplate } from "../actions";
import { Check, LayoutTemplate, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AVAILABLE_TEMPLATES = [
  {
    id: "luxury",
    name: "Luxury Minimalist",
    description: "The default template. Focuses on large typography, dark themes, and immersive imagery.",
    preview: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
  },
  {
    id: "modern",
    name: "Modern Grid",
    description: "A clean, bright, and airy design focusing on a structured grid layout for products.",
    preview: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=80"
  },
  {
    id: "streetwear",
    name: "Edgy Streetwear",
    description: "Dark mode, bold brutalist typography, and high contrast. Perfect for urban fashion.",
    preview: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80"
  },
  {
    id: "elegant",
    name: "Elegant Boutique",
    description: "Soft warm tones, elegant spacing, and smooth aesthetics for a premium boutique feel.",
    preview: "https://images.unsplash.com/photo-1434389678232-04ce6c58a56a?w=800&q=80"
  },
  {
    id: "amazon",
    name: "Mega Store (Amazon Style)",
    description: "Familiar, high-conversion layout optimized for multi-category stores with strong search and easy navigation.",
    preview: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80"
  }
];

export default function TemplatesManager({ initialTemplate }: { initialTemplate: string }) {
  const [activeTemplate, setActiveTemplateState] = useState(initialTemplate);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSelectTemplate = (templateId: string) => {
    if (templateId === activeTemplate) return;
    
    startTransition(async () => {
      await updateActiveTemplate(templateId);
      setActiveTemplateState(templateId);
      router.refresh();
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-3">
          <LayoutTemplate className="w-8 h-8" /> Store Templates
        </h1>
        <p className="text-muted-foreground mt-1">Select the look and feel of your storefront.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {AVAILABLE_TEMPLATES.map((template) => {
          const isActive = activeTemplate === template.id;
          return (
            <div 
              key={template.id} 
              className={`relative bg-card rounded-2xl border-2 overflow-hidden transition-all duration-300 ${isActive ? 'border-primary shadow-xl ring-4 ring-primary/10' : 'border-border/50 shadow-sm hover:border-slate-300'}`}
            >
              {isActive && (
                <div className="absolute top-4 right-4 z-10 bg-primary text-white p-1.5 rounded-full shadow-lg">
                  <Check className="w-5 h-5" />
                </div>
              )}
              
              <div className="relative aspect-video w-full bg-slate-100">
                <Image 
                  src={template.preview} 
                  alt={template.name} 
                  fill 
                  className="object-cover"
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-primary">{template.name}</h3>
                  {isActive ? (
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">ACTIVE</span>
                  ) : (
                    <button 
                      onClick={() => handleSelectTemplate(template.id)}
                      disabled={isPending}
                      className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply Template'}
                    </button>
                  )}
                </div>
                <p className="text-muted-foreground">{template.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
