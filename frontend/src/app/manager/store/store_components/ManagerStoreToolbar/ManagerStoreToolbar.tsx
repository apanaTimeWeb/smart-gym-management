'use client';
// RESPONSIBILITY: Renders the search input, category filter, and Add Product CTA for the Store module.
import { useState, useEffect } from 'react';
import { Plus, ShoppingCart, RefreshCw, Search } from 'lucide-react';
import { useManagerStoreLogic } from '@/app/manager/store/store_hooks/ManagerUseManagerStoreLogic';
import ManagerSearchableDropdown from '@/app/manager/manager_components/ManagerShared/ManagerSearchableDropdown';

export default function ManagerStoreToolbar() {
  const { tab, setTab, loadAll, openAddProduct, setShowOrderModal, search, setSearch, setCurrentPage, categoryFilter, setCategoryFilter, stockFilter, setStockFilter } = useManagerStoreLogic();
  const [prevSearch, setPrevSearch] = useState(search);
  const [localSearch, setLocalSearch] = useState(search);

  if (search !== prevSearch) {
    setPrevSearch(search);
    setLocalSearch(search);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        setSearch(localSearch);
        
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [localSearch, search, setSearch, setCurrentPage]);

  return (
    <div className="border-b border-border flex flex-wrap gap-4 justify-between items-center bg-card p-2 sm:p-0">
      <div className="flex overflow-x-auto">
 {['Products', 'Orders'].map(t => (
 <button 
 key={t} 
 onClick={() => setTab(t)}
 className={`px-4 py-3 text-sm font-semibold border-b-2 motion-safe:transition-colors whitespace-nowrap ${tab === t ? 'text-on-primary border-primary' : 'text-secondary border-transparent hover:text-on-primary hover:border-border'}`}
 >
 {t}
 </button>
 ))}
      </div>
      <div className="px-4 flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input 
            value={localSearch} 
            onChange={e => setLocalSearch(e.target.value)} 
            placeholder="Search..." 
            className="pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-40 sm: w-full sm:w-64  bg-input text-on-primary" 
          />
        </div>
        {tab === 'Products' && (
          <>
            <div className="w-36">
              <ManagerSearchableDropdown
                value={categoryFilter}
                onChange={(val) => setCategoryFilter(val.toString())}
                options={[
                  { value: 'ALL', label: 'All Categories' },
                  { value: 'Supplements', label: 'Supplements' },
                  { value: 'Merchandise', label: 'Merchandise' },
                  { value: 'Beverages', label: 'Beverages' },
                  { value: 'Equipment', label: 'Equipment' },
                ]}
                className="bg-input"
              />
            </div>
            <div className="w-36">
              <ManagerSearchableDropdown
                value={stockFilter}
                onChange={(val) => setStockFilter(val.toString())}
                options={[
                  { value: 'ALL', label: 'All Stock' },
                  { value: 'IN_STOCK', label: 'In Stock' },
                  { value: 'OUT_OF_STOCK', label: 'Out of Stock' },
                ]}
                className="bg-input"
              />
            </div>
          </>
        )}
        <button 
 type="button"
 aria-label="Refresh store"
 onClick={loadAll}  
 className="min-h-11 min-w-11 flex items-center justify-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
 >
 <RefreshCw size={18} />
 </button>
 {tab === 'Products' && (
 <button 
 onClick={openAddProduct} 
 className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-on-primary rounded-lg bg-primary hover:opacity-90 motion-safe:transition-opacity" 
 >
 <Plus size={18} /> Add Product
 </button>
 )}
 {tab === 'Orders' && (
 <button 
 onClick={() => setShowOrderModal(true)} 
 className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-on-primary bg-primary rounded-lg hover:opacity-90 motion-safe:transition-opacity" 
 >
 <ShoppingCart size={18} /> New Sale
 </button>
 )}
 </div>
 </div>
 );
}

