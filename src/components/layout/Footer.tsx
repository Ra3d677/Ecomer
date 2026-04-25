"use client";

import Link from "next/link";
import { Globe } from "lucide-react";

export default function Footer({ activeTemplate = 'luxury', lang = 'en' }: { activeTemplate?: string, lang?: 'en' | 'ar' }) {
  if (activeTemplate === 'amazon') {
    return (
      <footer className="w-full font-sans">
        {/* Back to top */}
        <div className="bg-[#37475a] hover:bg-[#485769] transition-colors py-4 text-center cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className="text-white text-sm font-medium">{lang === 'ar' ? 'العودة إلى الأعلى' : 'Back to top'}</span>
        </div>

        {/* Main Links */}
        <div className="bg-[#232f3e] text-white py-10">
          <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-base mb-3">{lang === 'ar' ? 'تعرف علينا' : 'Get to Know Us'}</h4>
              <ul className="space-y-2 text-sm text-[#DDDDDD]">
                <li><Link href="#" className="hover:underline">{lang === 'ar' ? 'عن الشركة' : 'About Us'}</Link></li>
                <li><Link href="#" className="hover:underline">{lang === 'ar' ? 'الوظائف' : 'Careers'}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-3">{lang === 'ar' ? 'تسوق معنا' : 'Shop with Us'}</h4>
              <ul className="space-y-2 text-sm text-[#DDDDDD]">
                <li><Link href="#" className="hover:underline">{lang === 'ar' ? 'حسابك' : 'Your Account'}</Link></li>
                <li><Link href="#" className="hover:underline">{lang === 'ar' ? 'طلباتك' : 'Your Orders'}</Link></li>
                <li><Link href="#" className="hover:underline">{lang === 'ar' ? 'عناوينك' : 'Your Addresses'}</Link></li>
                <li><Link href="#" className="hover:underline">{lang === 'ar' ? 'القوائم' : 'Your Lists'}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-3">{lang === 'ar' ? 'دعنا نساعدك' : 'Let Us Help You'}</h4>
              <ul className="space-y-2 text-sm text-[#DDDDDD]">
                <li><Link href="#" className="hover:underline">{lang === 'ar' ? 'المساعدة' : 'Help'}</Link></li>
                <li><Link href="#" className="hover:underline">{lang === 'ar' ? 'الشحن والتوصيل' : 'Shipping & Delivery'}</Link></li>
                <li><Link href="#" className="hover:underline">{lang === 'ar' ? 'المرتجعات' : 'Returns & Replacements'}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-base mb-3">{lang === 'ar' ? 'اكسب المال معنا' : 'Make Money with Us'}</h4>
              <ul className="space-y-2 text-sm text-[#DDDDDD]">
                <li><Link href="#" className="hover:underline">{lang === 'ar' ? 'البيع على المتجر' : 'Sell on Store'}</Link></li>
                <li><Link href="#" className="hover:underline">{lang === 'ar' ? 'التسويق بالعمولة' : 'Become an Affiliate'}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Setup */}
        <div className="bg-[#232f3e] border-t border-slate-700 py-8">
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 text-[#CCCCCC]">
             <div className="flex items-center gap-2">
               <span className="font-bold text-xl text-white">amazon</span>
               <span className="text-sm">.eg</span>
             </div>
             
             <div className="flex gap-2">
                <div className="border border-slate-500 rounded px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:border-white transition-colors">
                  <Globe className="w-4 h-4" /> <span className="text-sm">{lang === 'ar' ? 'العربية' : 'English'}</span>
                </div>
                <div className="border border-slate-500 rounded px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:border-white transition-colors">
                  <span className="text-sm font-bold">$</span> <span className="text-sm">USD - U.S. Dollar</span>
                </div>
                <div className="border border-slate-500 rounded px-3 py-1.5 flex items-center gap-2 cursor-pointer hover:border-white transition-colors">
                  <span className="text-sm">Egypt</span>
                </div>
             </div>
          </div>
        </div>
        
        {/* Very bottom */}
        <div className="bg-[#131921] py-8 text-center text-xs text-[#DDDDDD] flex flex-col gap-2">
           <div className="flex justify-center gap-4 flex-wrap">
             <Link href="#" className="hover:underline">{lang === 'ar' ? 'شروط الاستخدام' : 'Conditions of Use'}</Link>
             <Link href="#" className="hover:underline">{lang === 'ar' ? 'إشعار الخصوصية' : 'Privacy Notice'}</Link>
             <Link href="#" className="hover:underline">{lang === 'ar' ? 'إعلانات مبنية على الاهتمامات' : 'Interest-Based Ads'}</Link>
           </div>
           <p>&copy; {new Date().getFullYear()}, Amazon Clone, Inc. or its affiliates</p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 tracking-tight">LUXE</h3>
            <p className="text-sm text-primary-foreground/70 max-w-xs">
              Premium minimal fashion and goods. Designed for the modern aesthete.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
              <li><Link href="/categories/new" className="hover:text-white transition-colors">New Arrivals</Link></li>
              <li><Link href="/categories/sale" className="hover:text-white transition-colors">Sale</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-bold mb-4 uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-primary-foreground/50">
          <p>&copy; {new Date().getFullYear()} LUXE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
