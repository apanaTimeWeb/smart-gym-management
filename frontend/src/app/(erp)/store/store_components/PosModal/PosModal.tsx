"use client";

import { X, Printer } from 'lucide-react';
import { useStoreContext } from '../../store_context/StoreContext';
import { PAYMENT_METHODS, formatCurrency } from '../../store_utils/StoreSharedConstants';

export default function PosModal() {
 const { 
 showOrderModal, setShowOrderModal, 
 products, 
 orderItems, addToOrder, removeFromOrder, orderTotal, 
 orderMethod, setOrderMethod, 
 saving, placeOrder 
 } = useStoreContext();

 if (!showOrderModal) return null;

 return (
 <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
 <div className="bg-[var(--store-bg-card)] rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
 <div className="sticky top-0 bg-[var(--store-bg-card)] px-6 py-4 border-b border-[var(--store-border)] flex items-center justify-between">
 <h3 className="text-lg font-bold text-[var(--store-text-primary)]">New Sale — POS</h3>
 <button 
 onClick={() => setShowOrderModal(false)} 
 className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-[var(--store-text-secondary)] transition-colors"
 >
 <X size={18} />
 </button>
 </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
 
 {/* Product Grid */}
 <div>
 <p className="text-sm font-medium text-[var(--store-text-secondary)] mb-3">Select Products</p>
 <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
 {products.filter(p => p.stock > 0).map(p => (
 <button 
 key={p.id} 
 onClick={() => addToOrder(p)} 
 className="w-full text-left p-3 border border-[var(--store-border)] rounded-xl hover:border-[var(--warning)] dark:hover:border-[var(--warning)] hover:bg-[var(--warning-bg)] dark:hover:bg-[var(--warning-bg)] transition-all bg-[var(--store-bg-card)]"
 >
 <p className="text-sm font-medium text-[var(--store-text-primary)]">{p.name}</p>
 <p className="text-xs text-[var(--store-text-secondary)]">{formatCurrency(p.price)} · Stock: {p.stock}</p>
 </button>
 ))}
 </div>
 </div>
 
 {/* Cart */}
 <div>
 <p className="text-sm font-medium text-[var(--store-text-secondary)] mb-3">Cart</p>
 <div className="space-y-2 min-h-[100px]">
 {orderItems.length === 0 && (
 <p className="text-sm text-[var(--store-text-secondary)] text-center py-4">No items added</p>
 )}
 {orderItems.map(i => (
 <div key={i.productId} className="flex items-center justify-between p-2 bg-[var(--store-bg-input)] rounded-lg border border-[var(--store-border)]">
 <div>
 <p className="text-xs font-medium text-[var(--store-text-primary)]">{i.name}</p>
 <p className="text-xs text-[var(--store-text-secondary)]">x{i.qty} · {formatCurrency(i.price * i.qty)}</p>
 </div>
 <button 
 onClick={() => removeFromOrder(i.productId)} 
 className="p-1 text-[var(--danger)] hover:text-[var(--danger)] dark:hover:text-[var(--danger)] transition-colors"
 >
 <X size={14} />
 </button>
 </div>
 ))}
 </div>
 
 <div className="mt-4 pt-4 border-t border-[var(--store-border)]">
 <div className="flex justify-between mb-3">
 <span className="font-semibold text-[var(--store-text-primary)]">Total</span>
 <span className="font-bold text-lg text-[var(--success)] dark:text-[var(--success)]">{formatCurrency(orderTotal)}</span>
 </div>
 <select 
 value={orderMethod} 
 onChange={e => setOrderMethod(e.target.value)} 
 className="w-full border border-[var(--store-border)] rounded-xl px-4 py-2.5 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-[var(--warning)] bg-[var(--store-bg-input)] text-[var(--store-text-primary)]"
 >
 {PAYMENT_METHODS.map(m => <option key={m}>{m}</option>)}
 </select>
 <button 
 onClick={placeOrder} 
 disabled={saving || orderItems.length === 0} 
 className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 transition-colors" 
 style={{ background: 'var(--store-highlight)' }}
 >
 {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Printer size={15} /> Complete & Print</>}
 </button>
 </div>
 </div>
 
 </div>
 </div>
 </div>
 );
}
