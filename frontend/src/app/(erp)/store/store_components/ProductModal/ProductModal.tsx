"use client";

import { useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { useStoreContext } from '@/app/(erp)/store/store_context/StoreContext';
import { CATEGORIES, ProductSchema, type ProductFormValues, EMPTY_PRODUCT_FORM } from '@/app/(erp)/store/store_utils/StoreSharedConstants';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function ProductModal() {
 const { 
 showProductModal, setShowProductModal, 
 editProductId, editProductData, 
 saving, saveProduct 
 } = useStoreContext();

 const { 
   register, 
   handleSubmit, 
   reset,
   formState: { errors } 
 } = useForm({
   resolver: zodResolver(ProductSchema),
   defaultValues: editProductData || EMPTY_PRODUCT_FORM
 });

 useEffect(() => {
   if (showProductModal && editProductData) {
     reset(editProductData);
   }
 }, [showProductModal, editProductData, reset]);

 if (!showProductModal) return null;

 return (
 <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
 <div className="bg-[var(--store-bg-card)] rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
 <div className="sticky top-0 bg-[var(--store-bg-card)] px-6 py-4 border-b border-[var(--store-border)] flex items-center justify-between">
 <h3 className="text-lg font-bold text-[var(--store-text-primary)]">
 {editProductId ? 'Edit Product' : 'Add Product'}
 </h3>
 <button 
 onClick={() => setShowProductModal(false)} 
 className="p-2 rounded-lg hover:bg-[var(--primary-subtle)] text-[var(--store-text-secondary)] transition-colors"
 >
 <X size={18} />
 </button>
 </div>
 <form onSubmit={handleSubmit(saveProduct as any)} className="p-6 space-y-4">
 {[
 { label: 'Product Name', key: 'name', type: 'text' }, 
 { label: 'Price (₹)', key: 'price', type: 'number' }, 
 { label: 'Stock Quantity', key: 'stock', type: 'number' }, 
 { label: 'Description', key: 'description', type: 'text' }
 ].map(f => (
 <div key={f.key}>
 <label className="block text-sm font-medium text-[var(--store-text-secondary)] mb-1">
 {f.label}
 </label>
 <input 
 type={f.type} 
 {...register(f.key as keyof ProductFormValues)}
 className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 ${
   errors[f.key as keyof ProductFormValues] ? 'border-[var(--danger)] focus:ring-[var(--danger)]' : 'border-[var(--store-border)] focus:ring-[var(--warning)]'
 } bg-[var(--store-bg-input)] text-[var(--store-text-primary)]`}
 />
 {errors[f.key as keyof ProductFormValues] && (
   <p className="text-[var(--danger)] text-xs mt-1">{errors[f.key as keyof ProductFormValues]?.message}</p>
 )}
 </div>
 ))}
 <div>
 <label className="block text-sm font-medium text-[var(--store-text-secondary)] mb-1">Category</label>
 <select 
 {...register('category')}
 className="w-full border border-[var(--store-border)] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--store-bg-input)] text-[var(--store-text-primary)]"
 >
 {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
 </select>
 </div>
 <div className="flex gap-3 pt-2">
 <button 
 type="button" 
 onClick={() => setShowProductModal(false)} 
 className="flex-1 py-2.5 border border-[var(--store-border)] rounded-xl text-sm font-medium text-[var(--store-text-primary)] hover:bg-[var(--primary-subtle)] transition-colors"
 >
 Cancel
 </button>
 <button 
 type="submit" 
 disabled={saving} 
 className="flex-1 py-2.5 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 transition-colors" 
 style={{ background: 'var(--store-highlight)' }}
 >
 {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save size={15} />{editProductId ? 'Update' : 'Add Product'}</>}
 </button>
 </div>
 </form>
 </div>
 </div>
 );
}
