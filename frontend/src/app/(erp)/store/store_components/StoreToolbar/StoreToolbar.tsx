"use client";

import { Plus, ShoppingCart, RefreshCw } from 'lucide-react';
import { useStoreContext } from '../../store_context/StoreContext';

export default function StoreToolbar() {
 const { tab, setTab, loadAll, openAddProduct, setShowOrderModal } = useStoreContext();

 return (
 <div className="border-b border-[var(--store-border)] flex justify-between items-center bg-[var(--store-bg-card)]">
 <div className="flex overflow-x-auto">
 {['Products', 'Orders'].map(t => (
 <button 
 key={t} 
 onClick={() => setTab(t)}
 className={`px-5 py-3.5 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
 tab === t 
 ? 'text-[var(--store-highlight)] bg-[var(--store-highlight-subtle)]' 
 : 'border-transparent text-[var(--store-text-secondary)] hover:text-[var(--store-text-primary)]'
 }`}
 style={tab === t ? { borderBottomColor: 'var(--store-highlight)' } : {}}
 >
 {t}
 </button>
 ))}
 </div>
 <div className="px-4 flex gap-2">
 <button 
 onClick={loadAll} 
 className="flex items-center gap-2 px-3 py-2 text-sm border border-[var(--store-border)] rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[var(--store-text-secondary)] transition-colors"
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
