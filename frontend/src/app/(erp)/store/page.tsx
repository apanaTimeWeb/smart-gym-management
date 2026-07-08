"use client";

import ErpHeader from '@/app/(erp)/erp_components/ErpHeader';
import ErpToast, { ToastType } from '@/app/(erp)/erp_components/ErpToast';
import ErpThermalReceipt, { ErpErpErpReceiptData } from '@/app/(erp)/erp_components/ErpThermalReceipt';

import { StoreProvider, useStoreContext } from './store_context/StoreContext';
import StoreKPIs from './store_components/StoreKPIs/StoreKPIs';
import StoreToolbar from './store_components/StoreToolbar/StoreToolbar';
import ProductGrid from './store_components/ProductGrid/ProductGrid';
import OrderTable from './store_components/OrderTable/OrderTable';
import ProductModal from './store_components/ProductModal/ProductModal';
import PosModal from './store_components/PosModal/PosModal';

import './store.css';

function StoreContent() {
  const { tab, toast, hideToast, printData } = useStoreContext();

  return (
    <div className="min-h-full pb-10 store-module bg-[var(--bg-page)] text-[var(--store-text-primary)]">
      <ErpHeader title="Store" subtitle="Manage products, inventory and sales" />
      <div className="p-6 space-y-5">
        
        <StoreKPIs />

        <div className="bg-[var(--store-bg-card)] rounded-xl shadow-sm border border-[var(--store-border)] overflow-hidden">
          <StoreToolbar />

          <div className="p-5">
            {tab === 'Products' ? <ProductGrid /> : <OrderTable />}
          </div>
        </div>
      </div>

      <ProductModal />
      <PosModal />

      {toast && (
        <ErpToast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
      
      {printData && (
        <ErpThermalReceipt data={printData} />
      )}
    </div>
  );
}

export default function StorePage() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
