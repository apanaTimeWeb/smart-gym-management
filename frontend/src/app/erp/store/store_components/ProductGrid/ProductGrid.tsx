// RESPONSIBILITY: ProductGrid.tsx handles the logic and UI for its corresponding feature.
"use client";

import { Edit2, Trash2 } from 'lucide-react';
import { useStoreContext } from '@/app/erp/store/store_context/StoreContext';
import { formatCurrency } from '@/app/erp/store/store_utils/StoreSharedConstants';

import ErpPagination from '@/app/erp/erp_components/ErpShared/ErpPagination';

export default function ProductGrid() {
  const { products, loading, debouncedSearch, currentPage, setCurrentPage, openEditProduct, deleteProduct, addToOrder } = useStoreContext();

  const filtered = products.filter(p => {
    const s = debouncedSearch.toLowerCase();
    return p.name.toLowerCase().includes(s) || p.category.toLowerCase().includes(s);
  });

  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentData = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <div className="w-8 h-8 border-4 border-warning border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10 text-secondary">
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
            className="border border-border rounded-xl p-4 hover:shadow-md transition-shadow bg-card"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="font-semibold text-foreground">{p.name}</p>
                <span className="text-xs bg-info-bg text-info dark:bg-info-bg dark:text-info px-2 py-0.5 rounded-full">
                  {p.category}
                </span>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => openEditProduct(p)} 
                  className="p-1.5 rounded-lg bg-input text-secondary hover:bg-primary-subtle transition-colors"
                  aria-label={`Edit ${p.name}`}
                >
                  <Edit2 size={13} />
                </button>
                <button 
                  onClick={() => deleteProduct(p.id)} 
                  className="p-1.5 rounded-lg bg-danger-bg dark:bg-danger-bg text-destructive hover:bg-danger-bg dark:hover:bg-danger-bg transition-colors"
                  aria-label={`Delete ${p.name}`}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-foreground">
                {formatCurrency(p.price)}
              </span>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                p.stock <= 5 
                  ? 'bg-danger-bg text-destructive dark:bg-danger-bg dark:text-destructive' 
                  : p.stock <= 20 
                  ? 'bg-warning-bg text-warning dark:bg-warning-bg dark:text-warning' 
                  : 'bg-success-bg text-success dark:bg-success-bg dark:text-success'
              }`}>
                {p.stock} in stock
              </span>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-10 text-secondary">
            No products found matching "{debouncedSearch}".
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
