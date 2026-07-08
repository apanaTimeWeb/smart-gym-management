"use client";

import { Edit2, Trash2 } from 'lucide-react';
import { useStoreContext } from '../../store_context/StoreContext';
import { formatCurrency } from '../../store_utils/StoreSharedConstants';

export default function ProductGrid() {
  const { products, loading, openEditProduct, deleteProduct } = useStoreContext();

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10 text-[var(--store-text-secondary)]">
        No products added yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
      {products.map(p => (
        <div 
          key={p.id} 
          className="border border-[var(--store-border)] rounded-xl p-4 hover:shadow-md transition-shadow bg-[var(--store-bg-card)]"
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="font-semibold text-[var(--store-text-primary)]">{p.name}</p>
              <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 px-2 py-0.5 rounded-full">
                {p.category}
              </span>
            </div>
            <div className="flex gap-1">
              <button 
                onClick={() => openEditProduct(p)} 
                className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-[var(--store-text-secondary)] hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              >
                <Edit2 size={13} />
              </button>
              <button 
                onClick={() => deleteProduct(p.id)} 
                className="p-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-bold text-[var(--store-text-primary)]">
              {formatCurrency(p.price)}
            </span>
            <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
              p.stock <= 5 
                ? 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' 
                : p.stock <= 20 
                  ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300' 
                  : 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
            }`}>
              {p.stock} in stock
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
