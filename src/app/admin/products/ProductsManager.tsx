"use client";

import { useState, useTransition } from "react";
import { Product } from "@/lib/types";
import { deleteProduct, addProduct, updateProduct } from "../actions";
import { Edit, Trash2, Plus, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProductsManager({ initialProducts }: { initialProducts: Product[] }) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState<Partial<Product>>({
    name: "",
    description: "",
    price: 0,
    discount_price: null,
    category_id: "mens",
    sizes: ["M", "L"],
    colors: ["#000000"],
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"],
    stock_quantity: 10,
    status: "active"
  });

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
      startTransition(async () => {
        await deleteProduct(id);
        router.refresh();
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setProducts(products.map(p => p.id === isEditing.id ? { ...p, ...formData } as Product : p));
      startTransition(async () => {
        await updateProduct(isEditing.id, formData);
        router.refresh();
      });
    } else {
      startTransition(async () => {
        await addProduct(formData as Omit<Product, "id">);
        router.refresh();
        // Force full reload to get new initialProducts
        window.location.reload(); 
      });
    }
    setIsEditing(null);
    setIsAdding(false);
  };

  const startEdit = (product: Product) => {
    setFormData(product);
    setIsEditing(product);
    setIsAdding(false);
  };

  const startAdd = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      discount_price: null,
      category_id: "mens",
      sizes: ["M", "L"],
      colors: ["#000000"],
      images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80"],
      stock_quantity: 10,
      status: "active"
    });
    setIsAdding(true);
    setIsEditing(null);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Products Management</h1>
          <p className="text-muted-foreground mt-1">Add, edit, or remove your store products.</p>
        </div>
        {!isAdding && !isEditing && (
          <button 
            onClick={startAdd}
            className="bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add New Product
          </button>
        )}
      </div>

      {(isAdding || isEditing) && (
        <div className="bg-white rounded-2xl border border-border shadow-sm p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
            <button onClick={() => { setIsEditing(null); setIsAdding(false); }} className="text-slate-400 hover:text-slate-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input required type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea required value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none h-24" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price ($)</label>
                  <input required type="number" value={formData.price || 0} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Discount Price ($)</label>
                  <input type="number" value={formData.discount_price || ''} onChange={e => setFormData({...formData, discount_price: e.target.value ? Number(e.target.value) : null})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="Optional" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select value={formData.category_id || 'mens'} onChange={e => setFormData({...formData, category_id: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none">
                  <option value="womens">Women's</option>
                  <option value="mens">Men's</option>
                  <option value="outerwear">Outerwear</option>
                  <option value="accessories">Accessories</option>
                  <option value="essentials">Essentials</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input required type="text" value={formData.images?.[0] || ''} onChange={e => setFormData({...formData, images: [e.target.value]})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="https://..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Stock Quantity</label>
                  <input required type="number" value={formData.stock_quantity || 0} onChange={e => setFormData({...formData, stock_quantity: Number(e.target.value)})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select value={formData.status || 'active'} onChange={e => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none">
                    <option value="active">Active</option>
                    <option value="inactive">Draft / Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 pt-4 border-t flex justify-end gap-3">
              <button type="button" onClick={() => { setIsEditing(null); setIsAdding(false); }} className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={isPending} className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2 transition-colors">
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                {isEditing ? 'Save Changes' : 'Create Product'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-border text-slate-600">
              <tr>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map(product => (
                <tr key={product.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden relative flex-shrink-0">
                        <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{product.name}</div>
                        <div className="text-slate-500 text-xs truncate max-w-[150px]">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 capitalize text-slate-600">{product.category_id}</td>
                  <td className="px-6 py-4">
                    {product.discount_price ? (
                      <div>
                        <span className="font-bold text-slate-900">${product.discount_price}</span>
                        <span className="text-slate-400 line-through text-xs ml-2">${product.price}</span>
                      </div>
                    ) : (
                      <span className="font-bold text-slate-900">${product.price}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${product.stock_quantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {product.stock_quantity} in stock
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${product.status === 'active' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-700'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => startEdit(product)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {products.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              No products found. Start by adding one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
