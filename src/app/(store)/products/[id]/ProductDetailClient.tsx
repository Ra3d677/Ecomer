"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/lib/types";
import { useCartStore } from "@/store/cart";
import { cn } from "@/lib/utils";
import { Check, ShoppingBag } from "lucide-react";

export default function ProductDetailClient({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(product.images[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || "");
  const [isAdding, setIsAdding] = useState(false);
  
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem({
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      product,
      quantity: 1,
      selectedSize,
      selectedColor
    });
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
      {/* Left: Images */}
      <div className="flex flex-col gap-4">
        <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-muted">
          <Image 
            src={selectedImage} 
            alt={product.name} 
            fill 
            className="object-cover object-center"
            priority
          />
        </div>
        {product.images.length > 1 && (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setSelectedImage(img)}
                className={cn(
                  "relative h-24 w-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-all",
                  selectedImage === img ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <Image src={img} alt={`Thumbnail ${idx}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right: Info */}
      <div className="flex flex-col">
        <h1 className="text-4xl font-bold tracking-tight text-primary mb-4">{product.name}</h1>
        
        <div className="flex items-center gap-4 mb-8">
          {product.discount_price ? (
            <>
              <span className="text-3xl font-semibold text-success">${product.discount_price}</span>
              <span className="text-xl text-muted-foreground line-through">${product.price}</span>
            </>
          ) : (
            <span className="text-3xl font-semibold text-primary">${product.price}</span>
          )}
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-medium uppercase tracking-wider mb-3">Color</h3>
          <div className="flex gap-3">
            {product.colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={cn(
                  "h-10 w-10 rounded-full border border-border/50 flex items-center justify-center transition-all",
                  selectedColor === color ? "ring-2 ring-primary ring-offset-2 scale-110" : "hover:scale-110"
                )}
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              >
                {selectedColor === color && (
                  <Check className={cn("h-5 w-5", color === '#ffffff' ? "text-primary" : "text-white")} />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-sm font-medium uppercase tracking-wider">Size</h3>
            <button className="text-sm text-muted-foreground underline">Size Guide</button>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  "h-12 border rounded-lg font-medium transition-all",
                  selectedSize === size 
                    ? "border-primary bg-primary text-primary-foreground" 
                    : "border-border text-foreground hover:border-primary/50"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={handleAddToCart}
          disabled={isAdding}
          className="w-full bg-accent hover:bg-accent/90 text-white h-14 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-80"
        >
          {isAdding ? (
            <span className="flex items-center gap-2"><Check className="h-5 w-5" /> Added to Cart</span>
          ) : (
            <span className="flex items-center gap-2"><ShoppingBag className="h-5 w-5" /> Add to Cart</span>
          )}
        </button>

        <div className="mt-12 pt-8 border-t border-border/50">
          <h3 className="font-medium text-lg mb-4">Description</h3>
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/50">
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Free shipping on orders over $200</li>
            <li>• 30-day return policy</li>
            <li>• Secure checkout</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
