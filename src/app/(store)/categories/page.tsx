import Link from "next/link";
import Image from "next/image";
import { getCategories, getProducts, getStoreSettings } from "@/lib/queries";

export const dynamic = 'force-dynamic';

export default async function CollectionsPage() {
  const categories = await getCategories();
  const products = await getProducts();
  const settings = await getStoreSettings();

  const layout = settings?.categoriesLayout || 'mosaic';
  const pageSettings = settings?.collectionPageSettings || {
    columns: 3,
    showProductCount: true,
    cardStyle: 'classic',
    bannerEnabled: true
  };

  const COLLECTIONS = categories.map(cat => {
    // Count products for this category
    const count = cat.id === 'sale' 
      ? products.filter(p => p.discount_price !== null).length 
      : products.filter(p => p.category_id === cat.id).length;
      
    return {
      ...cat,
      itemCount: count
    };
  });

  const getGridCols = () => {
    if (layout === 'list') return 'grid-cols-1';
    switch (pageSettings.columns) {
      case 2: return 'grid-cols-1 md:grid-cols-2';
      case 4: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4';
      default: return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  const getCardClasses = (index: number) => {
    let classes = "group relative overflow-hidden transition-all duration-500 ";
    
    // Layout specific classes
    if (layout === 'mosaic') {
      classes += (index === 0 || index === 3) ? 'md:col-span-2 lg:col-span-2 aspect-[21/9]' : 'aspect-square md:aspect-[4/3] lg:aspect-square';
    } else if (layout === 'list') {
      classes += "aspect-[21/9] md:aspect-[5/1]";
    } else if (layout === 'modern') {
      classes += "aspect-[3/4] md:aspect-[4/5]";
    } else {
      classes += "aspect-square";
    }

    // Card Style specific classes
    switch (pageSettings.cardStyle) {
      case 'glass':
        classes += " rounded-3xl border border-white/20 bg-white/5 backdrop-blur-md shadow-2xl";
        break;
      case 'minimal':
        classes += " rounded-none border-b border-slate-200";
        break;
      case 'gradient':
        classes += " rounded-2xl shadow-xl";
        break;
      default:
        classes += " rounded-2xl shadow-xl bg-slate-900";
    }

    return classes;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      {pageSettings.bannerEnabled && (
        <div className="bg-slate-950 py-24 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-30" />
          <h1 className="text-5xl font-extrabold tracking-widest text-white mb-6 uppercase relative z-10">Collections</h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg font-light relative z-10 px-4">
            Explore our curated ranges of premium fashion. Each collection is thoughtfully designed to elevate your personal style.
          </p>
        </div>
      )}

      {!pageSettings.bannerEnabled && (
        <div className="container mx-auto px-4 pt-12 pb-8">
           <h1 className="text-3xl font-bold text-slate-900">Collections</h1>
        </div>
      )}

      {/* Grid */}
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${pageSettings.bannerEnabled ? '-mt-10' : 'mt-4'}`}>
        <div className={`grid ${getGridCols()} gap-8`}>
          {COLLECTIONS.map((collection, index) => (
            <Link 
              href={`/products?category=${collection.id}`} 
              key={collection.id}
              className={getCardClasses(index)}
            >
              <Image 
                src={collection.image} 
                alt={collection.name} 
                fill 
                className={`object-cover group-hover:scale-110 transition-transform duration-1000 ease-out 
                  ${pageSettings.cardStyle === 'minimal' ? 'opacity-90 group-hover:opacity-100' : 'opacity-80 group-hover:opacity-100'}`}
              />
              
              {/* Overlay logic based on style */}
              {pageSettings.cardStyle === 'gradient' ? (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-transparent to-slate-950/80" />
              ) : pageSettings.cardStyle === 'minimal' ? (
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              )}
              
              <div className={`absolute bottom-0 left-0 right-0 p-8 transform transition-all duration-500 
                ${layout === 'modern' ? 'translate-y-0 text-center' : 'translate-y-4 group-hover:translate-y-0'}`}>
                
                <div className={`flex ${layout === 'modern' ? 'flex-col items-center' : 'items-end justify-between'} mb-2`}>
                  <h2 className={`font-bold text-white tracking-wide 
                    ${layout === 'modern' ? 'text-4xl' : 'text-3xl'}`}>
                    {collection.name}
                  </h2>
                  
                  {pageSettings.showProductCount && (
                    <span className={`text-accent px-3 py-1 rounded-full text-sm font-semibold border 
                      ${pageSettings.cardStyle === 'glass' ? 'bg-white/20 border-white/30 backdrop-blur-md' : 'bg-white/10 border-white/20'}`}>
                      {collection.itemCount} Items
                    </span>
                  )}
                </div>
                
                {layout !== 'minimal' && (
                  <p className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 line-clamp-2">
                    {collection.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
