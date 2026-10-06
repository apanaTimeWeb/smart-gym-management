// RESPONSIBILITY: Renders ManagerStorePosModal's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { Loader2, X, Printer, Plus, Minus, Send } from 'lucide-react';
import { useTranslations, useLocale } from 'next-intl';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';
import { ManagerEnvConfig } from '@/app/frontend_manager/manager_infrastructure/ManagerEnvConfig';
import { PAYMENT_METHODS } from '@/app/frontend_manager/manager_store/manager_store_constants/ManagerStoreSharedConstants';
import { useManagerStoreLogic } from '@/app/frontend_manager/manager_store/manager_store_hooks/useManagerStoreLogic';
import { ManagerStoreFormatCurrency } from '@/app/frontend_manager/manager_store/manager_store_utils/ManagerStoreFormatters';


/** @description Renders the ManagerStorePosModal component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (5 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export default function ManagerStorePosModal() {
  const t = useTranslations('MANAGER_STORE');
  const locale = useLocale();

 const { 
 showOrderModal, closeOrderModal, 
 products, 
 orderItems, addToOrder, removeFromOrder, updateOrderQty, orderTotal, 
 orderMethod, setOrderMethod, 
 customerPhone, setCustomerPhone, sendViaWhatsapp, setSendViaWhatsapp,
 saving, placeOrder 
 } = useManagerStoreLogic();

  if (!showOrderModal) return null;

 return (
 <div className="fixed inset-0 bg-overlay-backdrop z-40 flex items-center justify-center p-4">
 <div className="bg-overlay rounded-2xl shadow-dialog w-full max-w-2xl max-h-full overflow-y-auto border-2 border-warning" role="dialog" aria-modal="true" aria-labelledby="managerstoreposmodal-dialog-title">
 <div className="sticky top-0 bg-overlay px-6 py-4 border-b border-border flex items-center justify-between">
 <h3 className="text-lg font-bold text-primary" id="managerstoreposmodal-dialog-title">{t("COPY_NEW_SALE_POS")}</h3>
 <button data-testid="manager_store-manager-store-pos-modal-order-modal" 
 type="button"
 aria-label={t("COPY_CLOSE_POINT_SALE")}
 onClick={closeOrderModal} 
 className="min-h-11 min-w-11 flex items-center justify-center p-2 rounded-lg hover:bg-primary-subtle text-secondary motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base ease-in-out motion-safe:active:scale-95 hover:brightness-110"
 >
 <X size={18} strokeWidth={2} aria-hidden="true"/>
 </button>
 </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
 
 {/* Product Grid */}
  <div>
  <div className="flex flex-col mb-3">
    <p className="text-sm font-medium text-secondary mb-2">{t("COPY_SELECT_PRODUCTS_ADD")}</p>
    <ManagerSearchableDropdown dataTestId="manager_store-managerstoreposmodal-managersearchabledropdown-1"
      value={''}
      onChange={(val) => {
        const p = products.find(prod => String(prod.id) === String(val));
        if (p) addToOrder(p);
      }}
      options={products.filter(p => p.stock > 0).map(p => ({ 
        label: `${p.name} ${p.unit ? `(${p.unit})` : ''} - ${ManagerStoreFormatCurrency(p.price, ManagerEnvConfig.currencyCode, locale)} (Stock: ${p.stock})`, 
        value: String(p.id) 
      }))}
      placeholder={t("COPY_SEARCH_SELECT_PRODUCTS")}
     data-testid="manager_store-managerstoreposmodal-searchable-dropdown-1"/>
  </div>
  </div>
 
 {/* Cart */}
 <div>
 <p className="text-sm font-medium text-secondary mb-3">{t("COPY_CART")}</p>
 <div className="space-y-2 min-h-25">
 {orderItems.length === 0 && (
 <p className="text-sm text-secondary text-center py-4">{t("COPY_NO_ITEMS_ADDED")}</p>
 )}
 {orderItems.map((i, mapIndex) => (
 <div key={i.productId} className="flex items-center justify-between p-2 bg-input rounded-lg border border-border">
 <div className="flex-1">
 <p className="text-xs font-medium text-primary">{i.name} {i.unit && <span className="text-secondary font-normal">({i.unit})</span>}</p>
 <p className="text-xs text-secondary">{ManagerStoreFormatCurrency(i.price, ManagerEnvConfig.currencyCode, locale)}{t("COPY_EACH")}</p>
 </div>
 <div className="flex flex-wrap items-center gap-2">
   <div className="flex items-center bg-overlay rounded border border-border">
     <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1 text-secondary hover:text-primary motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_store-store-managerstoreposmodal-button-decrease-quantity-for-${mapIndex}`} type="button" aria-label={t("TEXT_DECREASE_QTY", { value: i.name })}
       onClick={() => updateOrderQty(i.productId, i.qty - 1)}
       
     >
       <Minus size={18} strokeWidth={2} aria-hidden="true"/>
     </button>
     <span className="text-xs font-medium w-6 text-center">{i.qty}</span>
     <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1 text-secondary hover:text-primary disabled:opacity-50 motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_store-store-managerstoreposmodal-button-increase-quantity-for-${mapIndex}`} type="button" aria-label={t("TEXT_INCREASE_QTY", { value: i.name })}
       onClick={() => {
         const product = products.find(p => p.id === i.productId);
         if (product && i.qty < product.stock) {
           updateOrderQty(i.productId, i.qty + 1);
         }
       }}
       disabled={!products.find(p => p.id === i.productId) || i.qty >= (products.find(p => p.id === i.productId)?.stock || 0)}
       
     >
       <Plus size={18} strokeWidth={2} aria-hidden="true"/>
     </button>
   </div>
   <p className="text-xs font-bold text-primary w-16 text-right">{ManagerStoreFormatCurrency(i.price * i.qty, ManagerEnvConfig.currencyCode, locale)}</p>
   <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "p-1 text-danger hover:text-danger motion-safe:transition-all ml-1 motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_store-store-managerstoreposmodal-button-remove-from-order-${mapIndex}`} type="button" aria-label={t("TEXT_REMOVE_FROM_ORDER", { value: i.name })}
     onClick={() => removeFromOrder(i.productId)} 
     
   >
     <X size={18} strokeWidth={2} aria-hidden="true"/>
   </button>
 </div>
 </div>
 ))}
 </div>
 
 <div className="mt-4 pt-4 border-t border-border">
 <div className="flex justify-between mb-3">
 <span className="font-semibold text-primary">{t("COPY_TOTAL_1")}</span>
 <span className="font-bold text-lg text-success ">{ManagerStoreFormatCurrency(orderTotal, ManagerEnvConfig.currencyCode, locale)}</span>
 </div>
 
 <ManagerSearchableDropdown dataTestId="manager_store-managerstoreposmodal-managersearchabledropdown-2"
 value={orderMethod}
 onChange={(val) => setOrderMethod(String(val))}
 className="mb-3"
 options={PAYMENT_METHODS.map(m => ({ label: m, value: m }))}
  data-testid="manager_store-managerstoreposmodal-searchable-dropdown-2"/>

 <label className="flex items-center gap-2 mb-3 cursor-pointer text-sm text-primary font-medium">
   <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-4 h-4 rounded border-border accent-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_store-manager-store-pos-modal-input-checkbox-toggle" 
     type="checkbox" 
     checked={sendViaWhatsapp}
     onChange={e => setSendViaWhatsapp(e.target.checked)}
     
   />{t("COPY_WHATSAPP_BILL")}</label>

 {sendViaWhatsapp && (
   <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "w-full border border-border rounded-xl px-4 py-2.5 text-sm mb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warning bg-input text-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_store-manager-store-pos-modal-input-value" 
     type="tel" maxLength={10} onKeyDown={(e) => { if (!/[0-9]|Backspace|Tab|Enter|Delete|Arrow/.test(e.key)) e.preventDefault(); }}
     placeholder={t("COPY_10_DIGIT_WHATSAPP_NUMBER")}
     value={customerPhone}
     onChange={e => setCustomerPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
     
   />
 )}

 <button data-testid="manager_store-manager-store-pos-modal-place-order" 
 onClick={placeOrder} 
 disabled={saving || orderItems.length === 0 || (sendViaWhatsapp && customerPhone.length !== 10)} 
 className="min-w-32 w-full py-3 rounded-xl text-sm font-bold text-on-primary flex items-center justify-center gap-2 disabled:opacity-70 motion-safe:transition-all bg-primary hover:bg-primary-hover motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110" 
 >
 {(() => { if (saving) { return <Loader2 size={18} strokeWidth={2} className="text-on-primary motion-safe:animate-spin" />; } return (sendViaWhatsapp ? <><Send size={18} strokeWidth={2} aria-hidden="true"/>{t("COPY_SEND_WHATSAPP")}</> : <><Printer size={18} strokeWidth={2} aria-hidden="true"/>{t("COPY_PRINT_BILL")}</>); })()}
 </button>
 </div>
 </div>
 
 </div>
 </div>
 </div>
 );
}
