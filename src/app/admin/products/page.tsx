import ProductsManager from "./ProductsManager";
import { getProducts } from "@/lib/queries";

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await getProducts();
  return <ProductsManager initialProducts={products} />;
}
