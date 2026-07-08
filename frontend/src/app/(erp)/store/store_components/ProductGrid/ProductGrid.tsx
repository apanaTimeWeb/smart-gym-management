"use client";

import { Edit2, Trash2 } from 'lucide-react';
import { useStoreContext } from '@/app/(erp)/store/store_context/StoreContext';
import { formatCurrency } from '@/app/(erp)/store/store_utils/StoreSharedConstants';

import ErpPagination from '@/app/(erp)/erp_components/ErpPagination';

export default function ProductGrid() {
  const { products, loading, search, currentPage, setCurrentPage, openEditProduct, deleteProduct } = useStoreContext();

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentData = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-[var(--warning)] border-t-transparent rounded-full animate-spin" />
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
    <div className="flex flex-col h-full min-h-[400px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 flex-1 content-start">
        {currentData.map(p => (
          <div 
            key={p.id} 
            className="border border-[var(--store-border)] rounded-xl p-4 hover:shadow-md transition-shadow bg-[var(--store-bg-card)]"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold text-[var(--store-text-primary)]">{p.name}</p>
                <span className="text-xs bg-[var(--info-bg)] text-[var(--info)] dark:bg-[var(--info-bg)] dark:text-[var(--info)] px-2 py-0.5 rounded-full">
                  {p.category}
                </span>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => openEditProduct(p)} 
                  className="p-1.5 rounded-lg bg-[var(--bg-input)] text-[var(--store-text-secondary)] hover:bg-[var(--primary-subtle)] transition-colors"
                >
                  <Edit2 size={13} />
                </button>
                <button 
                  onClick={() => deleteProduct(p.id)} 
                  className="p-1.5 rounded-lg bg-[var(--danger-bg)] dark:bg-[var(--danger-bg)] text-[var(--danger)] hover:bg-[var(--danger-bg)] dark:hover:bg-[var(--danger-bg)] transition-colors"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-[var(--store-text-primary)]">
                {formatCurrency(p.price)}
              </span>
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                p.stock <= 5 
                  ? 'bg-[var(--danger-bg)] text-[var(--danger)] dark:bg-[var(--danger-bg)] dark:text-[var(--danger)]' 
                  : p.stock <= 20 
                  ? 'bg-[var(--warning-bg)] text-[var(--warning)] dark:bg-[var(--warning-bg)] dark:text-[var(--warning)]' 
                  : 'bg-[var(--success-bg)] text-[var(--success)] dark:bg-[var(--success-bg)] dark:text-[var(--success)]'
              }`}>
                {p.stock} in stock
              </span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-10 text-[var(--store-text-secondary)]">
            No products found matching "{search}".
          </div>
        )}
      </div>
      <div className="mt-6">
        <ErpPagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          totalItems={filtered.length} 
          itemsPerPage={ITEMS_PER_PAGE} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </div>
  );
}
