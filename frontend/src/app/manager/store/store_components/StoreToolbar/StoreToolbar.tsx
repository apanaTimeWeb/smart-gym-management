// RESPONSIBILITY: Renders the search input, category filter, and Add Product CTA for the Store module.
'use client';

import { useState, useEffect } from 'react';
import { Plus, ShoppingCart, RefreshCw, Search } from 'lucide-react';
import { useStoreContext } from '@/app/manager/store/store_context/StoreContext';

export default function StoreToolbar() {
  const { tab, setTab, loadAll, openAddProduct, setShowOrderModal, search, setSearch, setCurrentPage } = useStoreContext();
  const [localSearch, setLocalSearch] = useState(search);

  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        setSearch(localSearch);
        if (typeof setCurrentPage === 'function') setCurrentPage(1);
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
 className={`px-5 py-3.5 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
 tab === t 
 ? 'text-primary bg-primary-subtle' 
 : 'border-transparent text-secondary hover:text-foreground'
 }`}
 style={tab === t ? { borderBottomColor: 'var(--store-highlight)' } : {}}
 >
 {t}
 </button>
 ))}
      </div>
      <div className="px-4 flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" />
          <input 
            value={localSearch} 
            onChange={e => setLocalSearch(e.target.value)} 
            placeholder="Search..." 
            className="pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary w-40 sm:w-64 bg-input text-foreground" 
          />
        </div>
        <button 
 onClick={loadAll} 
 className="flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary transition-colors"
 >
 <RefreshCw size={14} />
 </button>
 {tab === 'Products' && (
 <button 
 onClick={openAddProduct} 
 className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity" 
 style={{ background: 'var(--store-highlight)' }}
 >
 <Plus size={14} /> Add Product
 </button>
 )}
 {tab === 'Orders' && (
 <button 
 onClick={() => setShowOrderModal(true)} 
 className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white rounded-lg hover:opacity-90 transition-opacity" 
 style={{ background: 'var(--store-highlight)' }}
 >
 <ShoppingCart size={14} /> New Sale
 </button>
 )}
 </div>
 </div>
 );
}
