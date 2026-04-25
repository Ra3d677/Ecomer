import { getCategories } from "@/lib/queries";
import CategoriesManager from "./CategoriesManager";

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  const categories = await getCategories();
  return <CategoriesManager initialCategories={categories} />;
}
