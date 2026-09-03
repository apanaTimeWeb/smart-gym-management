// RESPONSIBILITY: Point-of-sale modal for processing a new product sale/order in the Store module.
'use client';

import { X, Printer, Plus, Minus, Send } from 'lucide-react';
import { useStoreContext } from '@/app/manager/store/store_context/StoreContext';
import { PAYMENT_METHODS, formatCurrency } from '@/app/manager/store/store_utils/StoreSharedConstants';
import { useState } from 'react';
import { SearchableDropdown } from '@/components/ui/SearchableDropdown';

export default function ManagerStorePosModal() {
 const { 
 showOrderModal, setShowOrderModal, 
 products, 
 orderItems, addToOrder, removeFromOrder, updateOrderQty, orderTotal, 
 orderMethod, setOrderMethod, 
 customerPhone, setCustomerPhone, sendViaWhatsapp, setSendViaWhatsapp,
 saving, placeOrder 
 } = useStoreContext();

 const [productSearch, setProductSearch] = useState('');

 if (!showOrderModal) return null;

 return (
 <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
 <div className="bg-card rounded-2xl shadow-xl w-full max-w-2xl max-h-full overflow-y-auto border-2 border-warning">
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
 <div className="flex-1">
 <p className="text-xs font-medium text-foreground">{i.name}</p>
 <p className="text-xs text-secondary">{formatCurrency(i.price)} each</p>
 </div>
 <div className="flex flex-wrap items-center gap-2">
   <div className="flex items-center bg-card rounded border border-border">
     <button 
       onClick={() => updateOrderQty(i.productId, i.qty - 1)}
       className="p-1 text-secondary hover:text-foreground transition-colors"
     >
       <Minus size={12} />
     </button>
     <span className="text-xs font-medium w-6 text-center">{i.qty}</span>
     <button 
       onClick={() => {
         const product = products.find(p => p.id === i.productId);
         if (product && i.qty < product.stock) {
           updateOrderQty(i.productId, i.qty + 1);
         }
       }}
       disabled={!products.find(p => p.id === i.productId) || i.qty >= (products.find(p => p.id === i.productId)?.stock || 0)}
       className="p-1 text-secondary hover:text-foreground disabled:opacity-50 transition-colors"
     >
       <Plus size={12} />
     </button>
   </div>
   <p className="text-xs font-bold text-foreground w-16 text-right">{formatCurrency(i.price * i.qty)}</p>
   <button 
     onClick={() => removeFromOrder(i.productId)} 
     className="p-1 text-danger hover:text-danger dark:hover:text-danger transition-colors ml-1"
   >
     <X size={14} />
   </button>
 </div>
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
   WhatsApp Bill
 </label>

 {sendViaWhatsapp && (
   <input 
     type="tel" maxLength={10} onKeyDown={(e) => { if (!/[0-9]|Backspace|Tab|Enter|Delete|Arrow/.test(e.key)) e.preventDefault(); }}
     placeholder="10-digit WhatsApp Number"
     value={customerPhone}
     onChange={e => setCustomerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
     className="w-full border border-border rounded-xl px-4 py-2.5 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-warning bg-input text-foreground"
   />
 )}

 <button 
 onClick={placeOrder} 
 disabled={saving || orderItems.length === 0 || (sendViaWhatsapp && customerPhone.length !== 10)} 
 className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 disabled:opacity-70 transition-colors bg-primary hover:bg-primary-hover" 
 >
 {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full motion-safe:animate-spin" /> : (sendViaWhatsapp ? <><Send size={15} /> Send WhatsApp</> : <><Printer size={15} /> Print Bill</>)}
 </button>
 </div>
 </div>
 
 </div>
 </div>
 </div>
 );
}
