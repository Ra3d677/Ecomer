import { Product } from "@/lib/types";
import ProductDetailClient from "./ProductDetailClient";

import { getProducts } from "@/lib/queries";
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const products = await getProducts();
  const product = products.find(p => p.id === id) || products[0]; // fallback to first for demo

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <ProductDetailClient product={product} />
    </div>
  );
}
