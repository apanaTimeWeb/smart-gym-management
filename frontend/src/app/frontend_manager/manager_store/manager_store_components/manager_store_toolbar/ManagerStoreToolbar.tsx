// RESPONSIBILITY: Renders ManagerStoreToolbar's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useState } from 'react';
import { useManagerDebouncedValueCommit } from '@/app/frontend_manager/manager_infrastructure/useManagerDebouncedValueCommit';
import { Plus, ShoppingCart, RefreshCw, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';
import ManagerSearchableDropdown from '@/components/ui/manager_searchable_dropdown/ManagerSearchableDropdown';

import { useManagerStoreLogic } from '@/app/frontend_manager/manager_store/manager_store_hooks/useManagerStoreLogic';


/** @description Renders the ManagerStoreToolbar component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (2 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export default function ManagerStoreToolbar() {
  const t = useTranslations('MANAGER_STORE');

  const { tab, setTab, loadAll, openAddProduct, setShowOrderModal, search, setSearch, setCurrentPage, categoryFilter, setCategoryFilter, stockFilter, setStockFilter } = useManagerStoreLogic();
  const [prevSearch, setPrevSearch] = useState(search);
  const [localSearch, setLocalSearch] = useState(search);

  if (search !== prevSearch) {
    setPrevSearch(search);
    setLocalSearch(search);
  }


  useManagerDebouncedValueCommit(localSearch, search, setSearch, 300);

  return (
    <div className="border-b border-border flex flex-wrap gap-4 justify-between items-center bg-card p-2 sm:p-0">
      <div className="flex overflow-x-auto">
 {[t('COPY_PRODUCTS'), t('COPY_ORDERS')].map((t, mapIndex) => (
 <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", (`px-4 py-3 text-sm font-semibold border-b-2 motion-safe:transition-all whitespace-nowrap ${tab === t ? 'text-primary border-primary' : 'text-secondary border-transparent hover:text-primary hover:border-border'} motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110`)].filter((value) => Boolean(value)).join(' ') } data-testid={`manager_store-store-managerstoretoolbar-button-products-${mapIndex}`} 
 key={t} 
 onClick={() => setTab(t)}
 
 >
 {t}
 </button>
 ))}
      </div>
      <div className="px-4 flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search size={18} strokeWidth={2} className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary"/>
          <input className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "pl-9 pr-3 py-2 border border-border rounded-lg text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary w-40 sm: w-full sm:w-64  bg-input text-primary"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_store-manager-store-toolbar-input-value" 
            value={localSearch} 
            onChange={e => setLocalSearch(e.target.value)} 
            placeholder={t("COPY_SEARCH")} 
             
          />
        </div>
        {tab === 'Products' && (
          <>
            <div className="w-36">
              <ManagerSearchableDropdown dataTestId="manager_store-managerstoretoolbar-managersearchabledropdown-1"
                value={categoryFilter}
                onChange={(val) => setCategoryFilter(val.toString())}
                options={[
                  { value: 'ALL', label: t("COPY_ALL_CATEGORIES") },
                  { value: 'Supplements', label: t("COPY_SUPPLEMENTS") },
                  { value: 'Merchandise', label: t("COPY_MERCHANDISE") },
                  { value: 'Beverages', label: t("COPY_BEVERAGES") },
                  { value: 'Equipment', label: t("COPY_EQUIPMENT") },
                ]}
                className="bg-input"
               data-testid="manager_store-managerstoretoolbar-searchable-dropdown-1"/>
            </div>
            <div className="w-36">
              <ManagerSearchableDropdown dataTestId="manager_store-managerstoretoolbar-managersearchabledropdown-2"
                value={stockFilter}
                onChange={(val) => setStockFilter(val.toString())}
                options={[
                  { value: 'ALL', label: t("COPY_ALL_STOCK") },
                  { value: 'IN_STOCK', label: t("COPY_STOCK_2") },
                  { value: 'OUT_OF_STOCK', label: t("COPY_OUT_STOCK") },
                ]}
                className="bg-input"
               data-testid="manager_store-managerstoretoolbar-searchable-dropdown-2"/>
            </div>
          </>
        )}
        <button data-testid="manager_store-manager-store-toolbar-load-all" 
 type="button"
 aria-label={t("COPY_REFRESH_STORE")}
 onClick={loadAll}  
 className="min-h-11 min-w-11 flex items-center justify-center gap-2 px-3 py-2 text-sm border border-border rounded-lg hover:bg-primary-subtle text-secondary motion-safe:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary motion-safe:duration-base ease-in-out motion-safe:active:scale-95 hover:brightness-110"
 >
 <RefreshCw size={18} strokeWidth={2}/>
 </button>
 {tab === 'Products' && (
 <button data-testid="manager_store-manager-store-toolbar-add-product" 
 onClick={openAddProduct} 
 className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-on-primary rounded-lg bg-primary motion-safe:transition-all hover:bg-primary-hover motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110" 
 >
 <Plus size={18} strokeWidth={2} />{t("COPY_ADD_PRODUCT")}</button>
 )}
 {tab === 'Orders' && (
 <button className={ ["focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-page", "flex items-center gap-2 px-4 py-2 text-sm font-semibold text-on-primary bg-primary rounded-lg motion-safe:transition-all hover:bg-primary-hover motion-safe:duration-base ease-in-out motion-safe:active:scale-95 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:brightness-110"].filter((value) => Boolean(value)).join(' ') } data-testid="manager_store-manager-store-toolbar-button-action" 
 onClick={() => setShowOrderModal(true)} 
  
 >
 <ShoppingCart size={18} strokeWidth={2}/>{t("COPY_NEW_SALE")}</button>
 )}
 </div>
 </div>
 );
}
