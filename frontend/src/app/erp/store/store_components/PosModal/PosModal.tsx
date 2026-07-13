// RESPONSIBILITY: PosModal.tsx handles the logic and UI for its corresponding feature.
"use client";

import { X, Printer } from 'lucide-react';
import { useStoreContext } from '@/app/erp/store/store_context/StoreContext';
import { PAYMENT_METHODS, formatCurrency } from '@/app/erp/store/store_utils/StoreSharedConstants';
import { useState } from 'react';
import { SearchableDropdown } from '@/app/erp/erp_components/ErpShared/SearchableDropdown';

export default function PosModal() {
 const { 
 showOrderModal, setShowOrderModal, 
 products, 
 orderItems, addToOrder, removeFromOrder, orderTotal, 
 orderMethod, setOrderMethod, 
 customerPhone, setCustomerPhone, sendViaWhatsapp, setSendViaWhatsapp,
 saving, placeOrder 
 } = useStoreContext();

 const [productSearch, setProductSearch] = useState('');

 if (!showOrderModal) return null;

 return (
 <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
 <div className="bg-card rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
 <div className="sticky top-0 bg-card px-6 py-4 border-b border-border flex items-center justify-between">
 <h3 className="text-lg font-bold text-foreground">New Sale — POS</h3>
 <button 
 onClick={() => setShowOrderModal(false)} 
 className="p-2 rounded-lg hover:bg-primary-subtle text-secondary transition-colors"
 >
 <X size={18} />
 </button>
 </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
 
 {/* Product Grid */}
 <div>
 <div className="flex items-center justify-between mb-3">
   <p className="text-sm font-medium text-secondary">Select Products</p>
   <input 
     type="text" 
     placeholder="Search..." 
     value={productSearch}
     onChange={e => setProductSearch(e.target.value)}
     className="w-1/2 px-3 py-1.5 text-xs rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
   />
 </div>
 <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
 {products.filter(p => p.stock > 0 && p.name.toLowerCase().includes(productSearch.toLowerCase())).map(p => (
 <button 
 key={p.id} 
 onClick={() => addToOrder(p)} 
 className="w-full text-left p-3 border border-border rounded-xl hover:border-warning dark:hover:border-warning hover:bg-warning-bg dark:hover:bg-warning-bg transition-all bg-card"
 >
 <p className="text-sm font-medium text-foreground">{p.name}</p>
 <p className="text-xs text-secondary">{formatCurrency(p.price)} · Stock: {p.stock}</p>
 </button>
 ))}
 </div>
 </div>
 
 {/* Cart */}
 <div>
 <p className="text-sm font-medium text-secondary mb-3">Cart</p>
 <div className="space-y-2 min-h-25">
 {orderItems.length === 0 && (
 <p className="text-sm text-secondary text-center py-4">No items added</p>
 )}
 {orderItems.map(i => (
 <div key={i.productId} className="flex items-center justify-between p-2 bg-input rounded-lg border border-border">
 <div>
 <p className="text-xs font-medium text-foreground">{i.name}</p>
 <p className="text-xs text-secondary">x{i.qty} · {formatCurrency(i.price * i.qty)}</p>
 </div>
 <button 
 onClick={() => removeFromOrder(i.productId)} 
 className="p-1 text-destructive hover:text-destructive dark:hover:text-destructive transition-colors"
 >
 <X size={14} />
 </button>
 </div>
 ))}
 </div>
 
 <div className="mt-4 pt-4 border-t border-border">
 <div className="flex justify-between mb-3">
 <span className="font-semibold text-foreground">Total</span>
 <span className="font-bold text-lg text-success dark:text-success">{formatCurrency(orderTotal)}</span>
 </div>
 
 <SearchableDropdown
 value={orderMethod}
 onChange={(val) => setOrderMethod(String(val))}
 className="mb-3"
 options={PAYMENT_METHODS.map(m => ({ label: m, value: m }))}
 />

 <label className="flex items-center gap-2 mb-3 cursor-pointer text-sm text-foreground font-medium">
   <input 
     type="checkbox" 
     checked={sendViaWhatsapp}
     onChange={e => setSendViaWhatsapp(e.target.checked)}
     className="w-4 h-4 rounded border-border accent-primary"
   />
   Send bill via WhatsApp
 </label>

 {sendViaWhatsapp && (
   <input 
     type="tel"
     placeholder="WhatsApp Number (e.g. +919999999999)"
     value={customerPhone}
     onChange={e => setCustomerPhone(e.target.value)}
     className="w-full border border-border rounded-xl px-4 py-2.5 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-warning bg-input text-foreground"
   />
 )}

 <button 
 onClick={placeOrder} 
 disabled={saving || orderItems.length === 0 || (sendViaWhatsapp && !customerPhone)} 
 className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 transition-colors" 
 style={{ background: 'var(--store-highlight)' }}
 >
 {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : (sendViaWhatsapp ? 'Complete & Send WhatsApp' : <><Printer size={15} /> Complete & Print</>)}
 </button>
 </div>
 </div>
 
 </div>
 </div>
 </div>
 );
}
