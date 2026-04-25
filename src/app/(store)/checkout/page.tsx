"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const { items, getCartTotal, clearCart } = useCartStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    notes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    setMounted(true);
    
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login?redirect=/checkout");
      } else {
        // Pre-fill name from metadata if it exists
        setFormData(prev => ({
          ...prev,
          name: user.user_metadata?.full_name || prev.name
        }));
        setIsCheckingAuth(false);
      }
    };
    
    checkAuth();
  }, [router]);

  if (!mounted || isCheckingAuth) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="w-10 h-10 animate-spin text-orange-500" />
    </div>
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    
    setIsSubmitting(true);
    setError("");

    try {
      const total_price = getCartTotal();

      // 1. Save to Supabase (if configured)
      // Since we don't have real credentials, we will attempt the insert, but if it fails due to missing credentials,
      // we'll still send the order to our API for WhatsApp and succeed the order locally.
      let orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;

      // Mocking DB Save since we are using dummy data mode
      await new Promise(resolve => setTimeout(resolve, 1000));


      // 2. Call API for WhatsApp Notification
      await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          customer: formData,
          items,
          total: total_price
        })
      });

      // 3. Clear cart and redirect
      clearCart();
      router.push(`/success?orderId=${orderId}`);
    } catch (err: any) {
      setError(err.message || "An error occurred during checkout.");
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <button onClick={() => router.push('/products')} className="text-accent hover:underline">
          Go back to shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-6xl">
      <h1 className="text-3xl font-bold tracking-tight text-primary mb-10">Checkout</h1>
      
      {error && (
        <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-8 border border-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Form */}
        <div>
          <form onSubmit={handleSubmit} className="bg-card p-8 rounded-2xl border border-border shadow-sm">
            <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
            
            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary mb-1.5">Full Name <span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border border-border focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-primary mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full h-12 px-4 rounded-lg border border-border focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-primary mb-1.5">Delivery Address <span className="text-red-500">*</span></label>
                <textarea 
                  id="address" 
                  name="address" 
                  required
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all resize-none"
                  placeholder="123 Main St, Apt 4B, City, Country"
                />
              </div>
              
              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-primary mb-1.5">Order Notes (Optional)</label>
                <textarea 
                  id="notes" 
                  name="notes" 
                  rows={2}
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-all resize-none"
                  placeholder="Special instructions for delivery"
                />
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <h2 className="text-xl font-bold mb-4">Payment</h2>
              <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground flex items-center gap-3 border border-border/50">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span>Cash on Delivery (COD) is selected for this order.</span>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full mt-8 bg-primary hover:bg-primary/90 text-white h-14 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-70"
            >
              {isSubmitting ? (
                <><Loader2 className="h-5 w-5 animate-spin" /> Processing Order...</>
              ) : (
                <>Confirm Order &mdash; ${(getCartTotal()).toFixed(2)}</>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-muted/30 p-8 rounded-2xl border border-border/50 sticky top-24">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="flex flex-col gap-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
              {items.map((item) => {
                const latestProduct = item.product;
                const price = latestProduct.discount_price || latestProduct.price;
                return (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                      <Image src={latestProduct.images[0]} alt={latestProduct.name} fill className="object-cover" />
                      <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-bl-md">
                        {item.quantity}
                      </div>
                    </div>
                    <div className="flex flex-col flex-grow justify-center">
                      <p className="text-sm font-medium line-clamp-1">{latestProduct.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.selectedSize} / <span className="inline-block w-2 h-2 rounded-full border border-border align-middle mx-1" style={{backgroundColor: item.selectedColor}}></span></p>
                    </div>
                    <div className="flex items-center">
                      <p className="text-sm font-semibold">${(price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="border-t border-border/50 pt-4 space-y-3">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t border-border/50 pt-4 mt-2 flex justify-between items-end">
                <span className="font-semibold">Total</span>
                <span className="text-2xl font-bold text-primary">${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
