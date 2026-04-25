"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu, X, User as UserIcon, LogOut, LayoutDashboard, Globe } from "lucide-react";
import { useCartStore } from "@/store/cart";
import { useState, useEffect, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { StoreSettings } from "@/lib/types";
import { setLanguageCookie } from "@/app/actions";
import { translations, TranslationKey } from "@/lib/translations";

export default function Navbar({ activeTemplate = 'luxury', storeSettings, lang = 'en' }: { activeTemplate?: string, storeSettings?: StoreSettings, lang?: 'en' | 'ar' }) {
  const t = (key: TranslationKey) => translations[lang][key] || key;
  const [mounted, setMounted] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  const { user, setUser } = useAuthStore();
  const router = useRouter();
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setUser(null);
    setIsUserMenuOpen(false);
  };

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  // Common User Menu Dropdown
  const UserMenuDropdown = () => (
    <div className="relative" ref={userMenuRef}>
      <button 
        onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} 
        className="p-2 transition-all hover:scale-110 flex items-center" 
        aria-label="User account"
      >
        {user && user.photoURL ? (
           <img src={user.photoURL} alt="User" className="w-6 h-6 rounded-full border border-slate-600" />
        ) : (
           <UserIcon className="h-5 w-5" />
        )}
      </button>
      
      {isUserMenuOpen && mounted && (
        <div className={`absolute ${lang === 'ar' ? 'left-0 origin-top-left' : 'right-0 origin-top-right'} mt-3 w-56 bg-white border border-slate-200 rounded-xl shadow-2xl py-2 z-50 transform transition-all`}>
          {user ? (
            <>
              <div className="px-4 py-3 border-b border-slate-100 mb-1">
                <p className="text-sm font-medium text-slate-900 truncate">{user.displayName || 'User'}</p>
                <p className="text-xs text-slate-500 truncate">{user.email}</p>
              </div>
              <Link href="#" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors">
                <UserIcon className="w-4 h-4" /> {t('myAccount')}
              </Link>
              <Link href="/admin" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors">
                <LayoutDashboard className="w-4 h-4" /> {t('adminPanel')}
              </Link>
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors text-left mt-1 border-t border-slate-100 pt-3">
                <LogOut className="w-4 h-4" /> {t('signOut')}
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors">
                {t('signIn')}
              </Link>
              <Link href="/register" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2.5 text-sm font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors">
                {t('createAccount')}
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );

  const LanguageSwitcher = ({ dark = false }) => {
    const [isOpen, setIsOpen] = useState(false);
    const langRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (langRef.current && !langRef.current.contains(event.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
      <div className="relative" ref={langRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-1.5 p-2 transition-all hover:scale-105 font-bold text-sm tracking-widest uppercase ${dark ? 'text-white' : 'text-slate-900'}`}
          aria-label="Change Language"
        >
          <Globe className="h-5 w-5" />
          <span className="hidden md:inline">{lang === 'en' ? 'EN' : 'عربي'}</span>
        </button>
        {isOpen && mounted && (
          <div className={`absolute ${lang === 'ar' ? 'left-0 origin-top-left' : 'right-0 origin-top-right'} mt-3 w-32 bg-white border border-slate-200 rounded-xl shadow-2xl py-2 z-50 transform transition-all text-slate-900`}>
            <button
              onClick={async () => { await setLanguageCookie('en'); setIsOpen(false); router.refresh(); }}
              className={`w-full text-left px-4 py-2.5 text-sm font-medium hover:bg-slate-50 transition-colors ${lang === 'en' ? 'text-blue-600' : ''}`}
              dir="ltr"
            >
              English
            </button>
            <button
              onClick={async () => { await setLanguageCookie('ar'); setIsOpen(false); router.refresh(); }}
              className={`w-full text-right px-4 py-2.5 text-sm font-medium hover:bg-slate-50 transition-colors font-arabic ${lang === 'ar' ? 'text-blue-600' : ''}`}
              dir="rtl"
            >
              العربية
            </button>
          </div>
        )}
      </div>
    );
  };

  // SEARCH BAR COMPONENT
  const SearchBar = ({ dark = false }) => (
    isSearchOpen ? (
      <form onSubmit={handleSearch} className={`flex items-center rounded-full px-3 py-1.5 border transition-colors ${dark ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'}`}>
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent text-sm placeholder-slate-400 outline-none w-32 md:w-48 transition-all"
          autoFocus
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="button" onClick={() => setIsSearchOpen(false)} className="hover:opacity-70 p-1 ml-1">
          <X className="h-4 w-4" />
        </button>
      </form>
    ) : (
      <button onClick={() => setIsSearchOpen(true)} className="p-2 transition-all hover:scale-110" aria-label="Search">
        <Search className="h-5 w-5" />
      </button>
    )
  );

  const CartButton = () => (
    <Link href="/cart" className="relative p-2 transition-all hover:scale-110 group">
      <ShoppingCart className="h-5 w-5" />
      {mounted && cartItemCount > 0 && (
        <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-blue-600 shadow-sm text-[10px] font-bold text-white flex items-center justify-center transform group-hover:scale-110 transition-transform">
          {cartItemCount}
        </span>
      )}
    </Link>
  );

  // 1. MODERN NAVBAR
  if (activeTemplate === 'modern') {
    return (
      <nav className="sticky top-0 z-50 w-full bg-white border-b border-slate-100 shadow-sm text-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/shop" className="text-2xl font-bold tracking-tight" style={{ color: storeSettings?.primaryColor || '#2563eb' }}>
              {storeSettings?.storeName || 'LUXE'}
            </Link>
            
            <div className="hidden md:flex items-center space-x-8 font-medium">
              <Link href="/shop" className="hover:text-blue-600 transition-colors">{t('home')}</Link>
              <Link href="/products" className="hover:text-blue-600 transition-colors">{t('shopAll')}</Link>
              <Link href="/categories" className="hover:text-blue-600 transition-colors">{t('categories')}</Link>
            </div>

            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <SearchBar />
              <UserMenuDropdown />
              <CartButton />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // 2. STREETWEAR NAVBAR
  if (activeTemplate === 'streetwear') {
    return (
      <nav className="sticky top-0 z-50 w-full bg-zinc-950 border-b-4 border-lime-400 text-lime-400 font-sans uppercase">
        <div className="max-w-screen-2xl mx-auto px-4">
          <div className="flex h-24 items-center justify-between">
            <Link href="/shop" className="text-4xl font-black tracking-tighter hover:text-white transition-colors" style={{ WebkitTextStroke: `1px ${storeSettings?.primaryColor || '#a3e635'}` }}>
              {storeSettings?.storeName || 'LUXE'}
            </Link>
            
            <div className="hidden md:flex items-center space-x-12 font-black tracking-widest">
              <Link href="/shop" className="hover:text-white transition-colors">{t('home')}</Link>
              <Link href="/products" className="hover:text-white transition-colors">{t('drop')}</Link>
              <Link href="/categories" className="hover:text-white transition-colors">{t('collections')}</Link>
            </div>

            <div className="flex items-center gap-6">
              <LanguageSwitcher dark />
              <SearchBar dark />
              <UserMenuDropdown />
              <CartButton />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // 3. ELEGANT NAVBAR
  if (activeTemplate === 'elegant') {
    return (
      <nav className="sticky top-0 z-50 w-full bg-[#fdfbf7] border-b border-[#2c2825]/10 text-[#2c2825]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex h-24 items-center justify-between">
            <div className="flex-1 hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest">
              <Link href="/products" className="hover:opacity-50 transition-opacity">{t('boutique')}</Link>
              <Link href="/categories" className="hover:opacity-50 transition-opacity">{t('collections')}</Link>
            </div>

            <Link href="/shop" className="text-3xl font-light tracking-widest text-center" style={{ fontFamily: 'serif', color: storeSettings?.primaryColor || 'inherit' }}>
              {storeSettings?.storeName || 'LUXE'}
            </Link>

            <div className="flex-1 flex items-center justify-end gap-6">
              <LanguageSwitcher />
              <SearchBar />
              <UserMenuDropdown />
              <CartButton />
            </div>
          </div>
        </div>
      </nav>
    );
  }

  // 4. AMAZON NAVBAR
  if (activeTemplate === 'amazon') {
    return (
      <header className="sticky top-0 z-50 w-full bg-[#131921] text-white flex flex-col font-sans">
        {/* Main top bar */}
        <div className="flex h-[60px] items-center px-4 gap-4" style={{ backgroundColor: storeSettings?.primaryColor || '#131921' }}>
          {/* Logo */}
          <Link href="/shop" className="text-2xl font-bold tracking-tight hover:border hover:border-white p-1 rounded transition-all">
            {storeSettings?.storeName || 'amazon'}
            <span className="text-sm font-normal ml-1 text-slate-300">.eg</span>
          </Link>

          {/* Delivery Location - Hidden on small screens */}
          <div className="hidden lg:flex flex-col justify-center px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-all">
            <span className="text-[11px] text-slate-300">{lang === 'ar' ? 'التوصيل إلى' : 'Deliver to'}</span>
            <span className="text-sm font-bold flex items-center gap-1">
              <Globe className="w-3 h-3" /> {lang === 'ar' ? 'مصر' : 'Egypt'}
            </span>
          </div>

          {/* Search Bar - Big */}
          <div className="flex-1 flex items-center bg-white rounded-md overflow-hidden h-10 border-2 border-transparent focus-within:border-[#febd69] transition-all max-w-4xl mx-auto">
            <button className="bg-slate-100 text-slate-600 px-3 text-sm h-full border-r hover:bg-slate-200 transition-colors hidden sm:block">
              {lang === 'ar' ? 'الكل' : 'All'}
            </button>
            <form onSubmit={handleSearch} className="flex-1 flex h-full">
              <input 
                type="text" 
                placeholder={lang === 'ar' ? 'ابحث في المتجر...' : 'Search store...'} 
                className="flex-1 px-3 text-slate-900 outline-none text-sm h-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="bg-[#febd69] hover:bg-[#f3a847] text-slate-900 px-4 h-full flex items-center justify-center transition-colors">
                <Search className="w-5 h-5" />
              </button>
            </form>
          </div>

          {/* Language Switcher mapped to Amazon style */}
          <div className="hidden md:flex border border-transparent hover:border-white rounded px-2 py-1 items-center h-full">
            <LanguageSwitcher dark />
          </div>

          {/* Account */}
          <div className="hidden sm:flex flex-col justify-center px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-all h-full relative" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} ref={userMenuRef}>
            <span className="text-[11px] text-white/80">{user ? (lang === 'ar' ? `مرحباً ${user.displayName}` : `Hello, ${user.displayName}`) : (lang === 'ar' ? 'مرحباً, تسجيل الدخول' : 'Hello, sign in')}</span>
            <span className="text-sm font-bold flex items-center">{lang === 'ar' ? 'الحساب والقوائم' : 'Account & Lists'}</span>
            {isUserMenuOpen && mounted && (
              <div className={`absolute top-[50px] ${lang === 'ar' ? 'left-0' : 'right-0'} mt-3 w-56 bg-white border border-slate-200 rounded-lg shadow-2xl py-2 z-50 transform transition-all text-slate-900`} onClick={(e) => e.stopPropagation()}>
                  {user ? (
                    <>
                      <Link href="#" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:text-blue-600 hover:bg-slate-50 transition-colors">
                        <UserIcon className="w-4 h-4" /> {t('myAccount')}
                      </Link>
                      <Link href="/admin" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm hover:text-blue-600 hover:bg-slate-50 transition-colors">
                        <LayoutDashboard className="w-4 h-4" /> {t('adminPanel')}
                      </Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors text-left mt-1 border-t border-slate-100 pt-3">
                        <LogOut className="w-4 h-4" /> {t('signOut')}
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center p-3 border-b">
                        <Link href="/login" onClick={() => setIsUserMenuOpen(false)} className="bg-[#ffd814] hover:bg-[#f7ca00] text-slate-900 w-full py-1.5 text-center rounded text-sm font-medium transition-colors">
                          {t('signIn')}
                        </Link>
                      </div>
                      <Link href="/register" onClick={() => setIsUserMenuOpen(false)} className="block px-4 py-2 text-sm text-slate-700 hover:text-blue-600 hover:bg-slate-50 transition-colors text-center">
                        {lang === 'ar' ? 'مستخدم جديد؟ ابدأ هنا.' : 'New customer? Start here.'}
                      </Link>
                    </>
                  )}
              </div>
            )}
          </div>

          {/* Orders */}
          <Link href="#" className="hidden lg:flex flex-col justify-center px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-all h-full">
            <span className="text-[11px] text-white/80">{lang === 'ar' ? 'المرتجعات' : 'Returns'}</span>
            <span className="text-sm font-bold">{lang === 'ar' ? 'والطلبات' : '& Orders'}</span>
          </Link>

          {/* Cart */}
          <Link href="/cart" className="flex items-end px-2 py-1 border border-transparent hover:border-white rounded cursor-pointer transition-all h-full pb-2 group">
            <div className="relative flex items-end">
              <ShoppingCart className="h-8 w-8 text-white group-hover:text-[#febd69] transition-colors" />
              <span className="absolute top-0 right-1 text-[#febd69] font-bold text-sm transform group-hover:scale-110 transition-transform">{cartItemCount}</span>
            </div>
            <span className="text-sm font-bold hidden sm:block ml-1">{lang === 'ar' ? 'عربة التسوق' : 'Cart'}</span>
          </Link>
        </div>

        {/* Secondary Bar */}
        <div className="bg-[#232f3e] h-10 flex items-center px-4 gap-4 text-sm font-medium">
           <button className="flex items-center gap-1 hover:border border-transparent hover:border-white rounded py-1 px-2 transition-all">
             <Menu className="w-5 h-5" /> {lang === 'ar' ? 'الكل' : 'All'}
           </button>
           <Link href="/products" className="hover:border border-transparent hover:border-white rounded py-1 px-2 transition-all hidden sm:block">
             {lang === 'ar' ? 'عروض اليوم' : 'Today\'s Deals'}
           </Link>
           <Link href="/categories" className="hover:border border-transparent hover:border-white rounded py-1 px-2 transition-all hidden sm:block">
             {t('categories')}
           </Link>
           <Link href="#" className="hover:border border-transparent hover:border-white rounded py-1 px-2 transition-all hidden md:block">
             {lang === 'ar' ? 'خدمة العملاء' : 'Customer Service'}
           </Link>
           <Link href="#" className="hover:border border-transparent hover:border-white rounded py-1 px-2 transition-all hidden md:block">
             {lang === 'ar' ? 'الإلكترونيات' : 'Electronics'}
           </Link>
        </div>
      </header>
    );
  }

  // DEFAULT (LUXURY)
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-lg shadow-sm text-slate-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/shop" className="flex items-center gap-2 group">
              <span className="text-2xl font-extrabold tracking-widest text-white group-hover:opacity-80 transition-opacity duration-300" style={{ color: storeSettings?.primaryColor || 'white' }}>{storeSettings?.storeName || 'LUXE'}</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/shop" className="text-sm font-medium text-white hover:text-accent transition-colors">{t('home')}</Link>
            <Link href="/products" className="text-sm font-medium hover:text-white transition-colors">{t('shop')}</Link>
            <Link href="/categories" className="text-sm font-medium hover:text-white transition-colors">{t('collections')}</Link>
          </div>

          <div className="flex items-center gap-5">
            <LanguageSwitcher dark />
            <SearchBar dark />
            <UserMenuDropdown />
            <CartButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
