"use client";

import { useState, useTransition } from "react";
import { Category } from "@/lib/types";
import { deleteCategory, addCategory, updateCategory } from "../actions";
import { Edit, Trash2, Plus, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CategoriesManager({ initialCategories }: { initialCategories: Category[] }) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState<Category | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const [formData, setFormData] = useState<Partial<Category>>({
    name: "",
    description: "",
    image: ""
  });

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter(c => c.id !== id));
      startTransition(async () => {
        await deleteCategory(id);
        router.refresh();
      });
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setCategories(categories.map(c => c.id === isEditing.id ? { ...c, ...formData } as Category : c));
      startTransition(async () => {
        await updateCategory(isEditing.id, formData);
        router.refresh();
      });
    } else {
      startTransition(async () => {
        await addCategory(formData as Omit<Category, "id">);
        router.refresh();
        // Force full reload to update the UI with new generated ID
        window.location.reload(); 
      });
    }
    setIsEditing(null);
    setIsAdding(false);
  };

  const startEdit = (category: Category) => {
    setFormData(category);
    setIsEditing(category);
    setIsAdding(false);
  };

  const startAdd = () => {
    setFormData({
      name: "",
      description: "",
      image: ""
    });
    setIsAdding(true);
    setIsEditing(null);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Categories Management</h1>
          <p className="text-muted-foreground mt-1">Add, edit, or remove store categories.</p>
        </div>
        {!isAdding && !isEditing && (
          <button 
            onClick={startAdd}
            className="bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Add New Category
          </button>
        )}
      </div>

      {(isAdding || isEditing) && (
        <div className="bg-white rounded-2xl border border-border shadow-sm p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">{isEditing ? 'Edit Category' : 'Add New Category'}</h2>
            <button onClick={() => { setIsEditing(null); setIsAdding(false); }} className="text-slate-400 hover:text-slate-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Category Name</label>
                <input required type="text" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea required value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none h-24" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <input required type="text" value={formData.image || ''} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="https://..." />
              </div>
            </div>

            <div className="md:col-span-2 pt-4 border-t flex justify-end gap-3">
              <button type="button" onClick={() => { setIsEditing(null); setIsAdding(false); }} className="px-5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                Cancel
              </button>
              <button type="submit" disabled={isPending} className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 flex items-center gap-2 transition-colors">
                {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                {isEditing ? 'Save Changes' : 'Create Category'}
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
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Identifier (ID)</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {categories.map(category => (
                <tr key={category.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-12 rounded-lg bg-slate-100 overflow-hidden relative flex-shrink-0">
                        <Image src={category.image} alt={category.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{category.name}</div>
                        <div className="text-slate-500 text-xs truncate max-w-[250px]">{category.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-500">{category.id}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => startEdit(category)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(category.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {categories.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              No categories found. Start by adding one!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
