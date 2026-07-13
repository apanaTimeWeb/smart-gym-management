// RESPONSIBILITY: ProductGrid.tsx handles the logic and UI for its corresponding feature.
"use client";

import { Edit2, Trash2 } from 'lucide-react';
import { useStoreContext } from '@/app/erp/store/store_context/StoreContext';
import { formatCurrency } from '@/app/erp/store/store_utils/StoreSharedConstants';

import ErpPagination from '@/app/erp/erp_components/ErpShared/ErpPagination';
import { ERP_ITEMS_PER_PAGE } from '@/app/erp/erp_utils/ErpSharedConstants';

export default function ProductGrid() {
  const { products, summary, fetchState, debouncedSearch, currentPage, setCurrentPage, openEditProduct, deleteProduct, addToOrder } = useStoreContext();

  
  const totalProducts = summary?.totalProducts || products.length;
  const totalPages = Math.ceil(totalProducts / ERP_ITEMS_PER_PAGE) || 1;

  if (fetchState === 'loading') {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="animate-pulse bg-card rounded-xl border border-border p-4 h-64">
            <div className="h-32 bg-muted rounded-lg mb-4"></div>
            <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
            <div className="flex justify-between items-center mt-auto">
              <div className="h-6 bg-muted rounded w-1/3"></div>
              <div className="h-8 bg-muted rounded w-1/4"></div>
            </div>
          </div>
        ))}
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
    <div className="flex flex-col h-full min-h-96">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 flex-1 content-start">
        {products.map(p => (
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
        {products.length === 0 && (
          <div className="col-span-full text-center py-10 text-secondary">
            No products found matching "{debouncedSearch}".
          </div>
        )}
      </div>
      <div className="mt-6">
        <ErpPagination 
          currentPage={currentPage} 
          totalPages={totalPages} 
          totalItems={totalProducts} 
          itemsPerPage={ERP_ITEMS_PER_PAGE} 
          onPageChange={setCurrentPage} 
        />
      </div>
    </div>
  );
}
