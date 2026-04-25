import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, ShoppingBag } from "lucide-react";
import HeroSlider from "@/components/ui/HeroSlider";

import { getActiveTemplate, getBanners, getStoreSettings, getProducts } from "@/lib/queries";
import StoreMarquee from "@/components/ui/StoreMarquee";
import { getTranslation } from "@/lib/i18n";

export const dynamic = 'force-dynamic';

function LuxuryHomePage({ banners, settings, t, products }: { banners: any[], settings: any, t: any, products: any[] }) {
  // Select specific products to feature from our mock data
  const featuredIds = ["o1", "w2", "m2", "e1"];
  // If featured aren't available (e.g. deleted), we can fallback to first 4 products
  let featuredProducts = products.filter(p => featuredIds.includes(p.id));
  if (featuredProducts.length < 4) {
    featuredProducts = products.slice(0, 4);
  }
  
  const FEATURED_PRODUCTS = featuredProducts.map(p => ({
    ...p,
    // Add a fake 'isNew' tag for the homepage UI
    isNew: p.id === "o1" || p.id === "m2"
  }));

  return (
    <div className="flex flex-col w-full bg-background overflow-hidden">

      {/* Dynamic Hero Slider */}
      {banners.length > 0 ? (
        <HeroSlider banners={banners} settings={settings.bannerSettings} />
      ) : (
        <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-slate-900">
          <div className="relative z-10 text-center px-4">
            <h1 className="text-4xl text-white">Welcome to {settings.storeName}</h1>
          </div>
        </section>
      )}

      {/* Featured Marquee or Statement */}
      <StoreMarquee settings={settings.marqueeSettings} />

      {/* Featured Products Showcase */}
      <section className="py-32 bg-background relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-4">{t('curatedSelection')}</h2>
              <p className="text-lg text-muted-foreground">{t('curatedDesc')}</p>
            </div>
            <Link href="/products" className="text-accent hover:text-accent/80 font-bold flex items-center gap-2 group">
              {t('viewCatalog')} <ArrowRight size={18} className={`transform transition-transform ${t('home') === 'الرئيسية' ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {FEATURED_PRODUCTS.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id} className="group flex flex-col cursor-pointer">
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-slate-100 mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                  {product.discount_price && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {t('sale')}
                    </div>
                  )}
                  {product.isNew && !product.discount_price && (
                    <div className="absolute top-4 left-4 bg-slate-950 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {t('newIn')}
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-md border border-white/30 text-white text-center py-3 rounded-xl font-medium w-full">
                      {t('quickView')}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col px-1">
                  <span className="text-xs text-muted-foreground font-bold tracking-widest uppercase mb-2">{product.category_id}</span>
                  <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">{product.name}</h3>
                  <div className="flex items-center gap-3 mt-auto">
                    {product.discount_price ? (
                      <>
                        <span className="text-red-500 font-extrabold text-lg">${product.discount_price}</span>
                        <span className="text-muted-foreground line-through text-sm font-medium">${product.price}</span>
                      </>
                    ) : (
                      <span className="text-primary font-extrabold text-lg">${product.price}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Story / Dual Banner */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-auto lg:h-[600px]">
            <div className="relative rounded-3xl overflow-hidden h-[400px] lg:h-full group">
              <Image src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1000&q=80" alt="Studio" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <h3 className="text-4xl font-bold text-white mb-4">{t('winterEdit')}</h3>
                <p className="text-slate-200 mb-8 max-w-md">{t('winterDesc')}</p>
                <Link href="/categories" className="bg-white text-slate-950 w-fit px-8 py-3 rounded-full font-bold hover:bg-slate-200 transition-colors">
                  {t('exploreEdit')}
                </Link>
              </div>
            </div>
            <div className="bg-slate-950 rounded-3xl p-12 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute -right-20 -top-20 opacity-5">
                <Star size={400} />
              </div>
              <h3 className="text-4xl font-bold text-white mb-6 relative z-10">{t('uncompromising')}</h3>
              <p className="text-slate-400 text-lg mb-8 relative z-10 leading-relaxed">
                {t('uncompromisingDesc')}
              </p>
              <div className="grid grid-cols-2 gap-8 relative z-10 border-t border-white/10 pt-8 mt-4">
                <div>
                  <h4 className="text-white text-3xl font-extrabold mb-2">100%</h4>
                  <p className="text-slate-500 font-medium">{t('sustainable')}</p>
                </div>
                <div>
                  <h4 className="text-white text-3xl font-extrabold mb-2">Lifetime</h4>
                  <p className="text-slate-500 font-medium">{t('guarantee')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

function ModernHomePage({ banners, settings, t, products }: { banners: any[], settings: any, t: any, products: any[] }) {
  const featuredProducts = products.slice(0, 8);
  
  return (
    <div className="flex flex-col w-full bg-white">
      {banners.length > 0 ? (
        <HeroSlider banners={banners} settings={settings.bannerSettings} />
      ) : (
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-6">
          {t('newStandard')} <br/><span className="text-blue-600">{t('everydayWear')}</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
          {t('modernDesc')}
        </p>
        <Link href="/products" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          <ShoppingBag className="w-5 h-5" /> {t('shopCollection')}
        </Link>
      </section>
      )}

      {/* Grid Layout */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">{t('featuredProducts')}</h2>
            <Link href="/products" className="text-blue-600 font-medium hover:underline">{t('viewAll')}</Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link href={`/products/${product.id}`} key={product.id} className="group">
                <div className="aspect-[4/5] bg-slate-200 rounded-xl overflow-hidden mb-4 relative">
                  <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  {product.discount_price && (
                    <div className="absolute top-3 left-3 bg-white px-2 py-1 text-xs font-bold text-red-600 rounded">{t('sale')}</div>
                  )}
                </div>
                <h3 className="font-medium text-slate-900 truncate">{product.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {product.discount_price ? (
                    <>
                      <span className="font-bold text-red-600">${product.discount_price}</span>
                      <span className="text-slate-400 line-through text-sm">${product.price}</span>
                    </>
                  ) : (
                    <span className="font-bold text-slate-900">${product.price}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function StreetwearHomePage({ banners, settings, t, products }: { banners: any[], settings: any, t: any, products: any[] }) {
  const featuredProducts = products.slice(0, 6);
  
  return (
    <div className="flex flex-col w-full bg-zinc-950 min-h-screen text-zinc-50 font-sans">
      {banners.length > 0 ? (
        <HeroSlider banners={banners} settings={settings.bannerSettings} />
      ) : (
      <section className="relative pt-32 pb-10 px-4 border-b-8 border-lime-400">
        <div className="max-w-7xl mx-auto uppercase">
          <h1 className="text-[12vw] leading-none font-black tracking-tighter text-transparent" style={{ WebkitTextStroke: '2px #a3e635' }}>
            {t('urban')}
          </h1>
          <h1 className="text-[12vw] leading-none font-black tracking-tighter text-lime-400 -mt-4 mb-8">
            {t('syndicate')}
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-t-2 border-zinc-800 pt-8">
            <p className="text-xl max-w-md font-medium text-zinc-400">
              {t('streetwearDesc')}
            </p>
            <Link href="/products" className="bg-lime-400 text-black px-12 py-5 text-xl font-black uppercase hover:bg-white transition-colors">
              {t('enterShop')}
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* Marquee */}
      <StoreMarquee settings={settings.marqueeSettings} />

      {/* Grid Layout */}
      <section className="py-24 max-w-screen-2xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          {featuredProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="group relative bg-zinc-900 aspect-square overflow-hidden border border-zinc-800">
              <Image src={product.images[0]} alt={product.name} fill className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 grayscale group-hover:grayscale-0" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-black/80 backdrop-blur-sm p-4 border-l-4 border-lime-400">
                  <h3 className="font-bold text-xl uppercase tracking-wider truncate mb-1">{product.name}</h3>
                  <div className="flex gap-4">
                    <span className="font-mono text-lime-400 font-bold">${product.discount_price || product.price}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function ElegantHomePage({ banners, settings, t, products }: { banners: any[], settings: any, t: any, products: any[] }) {
  const featuredProducts = products.slice(0, 4);
  
  return (
    <div className="flex flex-col w-full bg-[#fdfbf7] min-h-screen text-[#2c2825]">
      {banners.length > 0 ? (
        <HeroSlider banners={banners} settings={settings.bannerSettings} />
      ) : (
      <section className="relative h-[85vh] flex items-center justify-center px-4">
        <div className="absolute inset-x-8 inset-y-8 rounded-[3rem] overflow-hidden">
          <Image src="https://images.unsplash.com/photo-1434389678232-04ce6c58a56a?w=1600&q=80" alt="Elegant Fashion" fill className="object-cover object-top opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2c2825]/60 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <span className="text-white/80 uppercase tracking-[0.4em] text-sm mb-6 block">{t('collection2026')}</span>
          <h1 className="text-6xl md:text-8xl font-light text-white mb-8" style={{ fontFamily: 'serif' }}>
            {t('timelessGrace')}
          </h1>
          <Link href="/products" className="inline-block bg-[#fdfbf7] text-[#2c2825] px-10 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-[#2c2825] hover:text-[#fdfbf7] transition-colors duration-500">
            {t('discover')}
          </Link>
        </div>
      </section>
      )}

      {/* Featured Minimal Grid */}
      <section className="py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-light mb-4" style={{ fontFamily: 'serif' }}>{t('curatedPieces')}</h2>
          <div className="w-12 h-px bg-[#2c2825]/30 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {featuredProducts.map((product) => (
            <Link href={`/products/${product.id}`} key={product.id} className="group text-center">
              <div className="aspect-[3/4] overflow-hidden rounded-t-full mb-6">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-in-out" />
              </div>
              <h3 className="font-medium text-lg mb-2">{product.name}</h3>
              <p className="text-[#2c2825]/60">${product.discount_price || product.price}</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-20">
          <Link href="/products" className="inline-block border-b border-[#2c2825] pb-1 uppercase tracking-widest text-sm hover:text-[#2c2825]/60 transition-colors">
            {t('viewAllProducts')}
          </Link>
        </div>
      </section>
    </div>
  );
}

function AmazonHomePage({ banners, settings, t, products }: { banners: any[], settings: any, t: any, products: any[] }) {
  const featuredProducts = products.slice(0, 8);
  
  return (
    <div className="flex flex-col w-full bg-[#e3e6e6] min-h-screen font-sans">
      {banners.length > 0 ? (
        <div className="relative w-full">
           {/* Amazon style hero usually fades at the bottom */}
           <div className="max-w-[1500px] mx-auto">
             <HeroSlider banners={banners} settings={settings.bannerSettings} />
           </div>
           <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#e3e6e6] via-[#e3e6e6]/80 to-transparent z-10 pointer-events-none"></div>
        </div>
      ) : (
        <div className="relative w-full h-[300px] md:h-[400px]">
           <div className="max-w-[1500px] mx-auto h-full relative">
             <Image src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80" alt="Hero" fill className="object-cover" />
           </div>
           <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#e3e6e6] via-[#e3e6e6]/80 to-transparent z-10 pointer-events-none"></div>
        </div>
      )}

      {/* Grid Layout over hero fade */}
      <section className="relative z-20 max-w-[1500px] mx-auto px-4 sm:px-6 -mt-[120px] mb-10 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1 */}
          <div className="bg-white p-5 flex flex-col h-[420px] shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('newArrivals') || 'New Arrivals'}</h2>
            <div className="grid grid-cols-2 gap-3 flex-1 mb-3">
              {featuredProducts.slice(0, 4).map(p => (
                <Link href={`/products/${p.id}`} key={p.id} className="flex flex-col">
                  <div className="relative aspect-square mb-1">
                    <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                  </div>
                  <span className="text-[11px] text-slate-900 truncate">{p.name}</span>
                </Link>
              ))}
            </div>
            <Link href="/products" className="text-sm text-blue-700 hover:text-red-700 hover:underline">{t('shopCollection') || 'Shop now'}</Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-5 flex flex-col h-[420px] shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('bestSellers') || 'Best Sellers'}</h2>
            <Link href={`/products/${featuredProducts[4]?.id}`} className="flex-1 relative mb-3">
               <Image src={featuredProducts[4]?.images[0] || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800"} alt="Single product" fill className="object-cover" />
            </Link>
            <Link href="/products" className="text-sm text-blue-700 hover:text-red-700 hover:underline">{t('shop') || 'Shop now'}</Link>
          </div>

          {/* Card 3 */}
           <div className="bg-white p-5 flex flex-col h-[420px] shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('sale') || 'Up to 50% off'}</h2>
            <Link href={`/products/${featuredProducts[5]?.id}`} className="flex-1 relative mb-3">
               <Image src={featuredProducts[5]?.images[0] || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800"} alt="Single product" fill className="object-cover" />
            </Link>
            <Link href="/products" className="text-sm text-blue-700 hover:text-red-700 hover:underline">{t('viewAll') || 'See all deals'}</Link>
          </div>

          {/* Card 4 - Sign in banner */}
          <div className="bg-white p-5 flex flex-col items-center justify-center h-[150px] shadow-sm">
             <h2 className="text-lg font-bold text-slate-900 mb-3 text-center">{t('signIn') || 'Sign in for the best experience'}</h2>
             <Link href="/login" className="bg-[#ffd814] w-full text-center py-1.5 rounded-lg text-sm font-medium border border-[#fcd200] hover:bg-[#f7ca00] text-slate-900 shadow-sm">{t('signIn') || 'Sign in securely'}</Link>
          </div>
        </div>

        {/* Horizontal Carousel Section */}
        <div className="bg-white p-5 mt-5 shadow-sm">
           <h2 className="text-xl font-bold text-slate-900 mb-4">{t('featuredProducts') || 'Discover more items'}</h2>
           <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
             {products.map((p) => (
                <Link href={`/products/${p.id}`} key={p.id} className="min-w-[160px] md:min-w-[200px] flex flex-col group">
                   <div className="relative aspect-square mb-2 bg-slate-50 p-2">
                     <Image src={p.images[0]} alt={p.name} fill className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform" />
                   </div>
                   <div className="text-[#B12704] text-sm font-bold mt-1">
                      ${p.discount_price || p.price}
                   </div>
                   <div className="text-sm text-slate-900 line-clamp-2 mt-1 hover:text-[#C7511F]">{p.name}</div>
                </Link>
             ))}
           </div>
        </div>
      </section>
    </div>
  );
}


export default async function HomePage() {
  const activeTemplate = await getActiveTemplate();
  const settings = await getStoreSettings();
  const allBanners = await getBanners();
  const products = await getProducts();
  const t = await getTranslation();
  const banners = allBanners
    .filter(b => b.isActive && (b.template_id === activeTemplate || b.template_id === 'all' || !b.template_id))
    .sort((a, b) => (a.order || 0) - (b.order || 0));
  
  if (activeTemplate === 'modern') return <ModernHomePage banners={banners} settings={settings} t={t} products={products} />;
  if (activeTemplate === 'streetwear') return <StreetwearHomePage banners={banners} settings={settings} t={t} products={products} />;
  if (activeTemplate === 'elegant') return <ElegantHomePage banners={banners} settings={settings} t={t} products={products} />;
  if (activeTemplate === 'amazon') return <AmazonHomePage banners={banners} settings={settings} t={t} products={products} />;
  
  
  return <LuxuryHomePage banners={banners} settings={settings} t={t} products={products} />;
}
