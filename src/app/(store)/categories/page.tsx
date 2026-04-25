import Link from "next/link";
import Image from "next/image";
import { getCategories, getProducts } from "@/lib/queries";

export const dynamic = 'force-dynamic';

export default async function CollectionsPage() {
  const categories = await getCategories();
  const products = await getProducts();

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

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-slate-950 py-24 text-center">
        <h1 className="text-5xl font-extrabold tracking-widest text-white mb-6 uppercase">Collections</h1>
        <p className="text-slate-300 max-w-2xl mx-auto text-lg font-light">
          Explore our curated ranges of premium fashion. Each collection is thoughtfully designed to elevate your personal style.
        </p>
      </div>

      {/* Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COLLECTIONS.map((collection, index) => (
            <Link 
              href={`/products?category=${collection.id}`} 
              key={collection.id}
              className={`group relative overflow-hidden rounded-2xl shadow-xl bg-slate-900 ${index === 0 || index === 3 ? 'md:col-span-2 lg:col-span-2 aspect-[21/9]' : 'aspect-square md:aspect-[4/3] lg:aspect-square'}`}
            >
              <Image 
                src={collection.image} 
                alt={collection.name} 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-end justify-between mb-2">
                  <h2 className="text-3xl font-bold text-white tracking-wide">{collection.name}</h2>
                  <span className="text-accent bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-sm font-semibold border border-white/20">
                    {collection.itemCount} Items
                  </span>
                </div>
                <p className="text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {collection.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
