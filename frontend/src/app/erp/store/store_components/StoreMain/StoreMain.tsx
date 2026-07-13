// RESPONSIBILITY: StoreMain.tsx handles the logic and UI for its corresponding feature.
"use client";

import ErpHeader from '@/app/erp/erp_components/ErpLayout/ErpHeader';
import ErpToast from '@/app/erp/erp_components/ErpFeedback/ErpToast';
import ErpThermalReceipt from '@/app/erp/erp_components/ErpShared/ErpThermalReceipt';

import { StoreProvider, useStoreContext } from '@/app/erp/store/store_context/StoreContext';
import StoreKPIs from '@/app/erp/store/store_components/StoreKPIs/StoreKPIs';
import StoreToolbar from '@/app/erp/store/store_components/StoreToolbar/StoreToolbar';
import ProductGrid from '@/app/erp/store/store_components/ProductGrid/ProductGrid';
import OrderTable from '@/app/erp/store/store_components/OrderTable/OrderTable';
import dynamic from 'next/dynamic';

const ProductModal = dynamic(() => import('@/app/erp/store/store_components/ProductModal/ProductModal'), { ssr: false });
const PosModal = dynamic(() => import('@/app/erp/store/store_components/PosModal/PosModal'), { ssr: false });

import '@/app/erp/store/store.css';

function StoreContent() {
  const { tab, toast, hideToast, printData, setPrintData } = useStoreContext();

  return (
    <div className="min-h-full pb-10 store-module bg-background text-foreground">
      <ErpHeader title="Store" subtitle="Manage products, inventory and sales" />
      <div className="p-6 space-y-5">
        
        <StoreKPIs />

        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
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

export default function StoreMain({ initialData }: { initialData?: any }) {
  return (
    <StoreProvider initialData={initialData}>
      <StoreContent />
    </StoreProvider>
  );
}
