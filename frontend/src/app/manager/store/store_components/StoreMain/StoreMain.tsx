// RESPONSIBILITY: Entry component for the Store module. Wraps the UI in the context provider and handles page layout.
'use client';

import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import ManagerToast from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import ManagerThermalReceipt from '@/app/manager/manager_components/ManagerShared/ManagerThermalReceipt';

import { StoreProvider, useStoreContext } from '@/app/manager/store/store_context/StoreContext';
import StoreKPIs from '@/app/manager/store/store_components/StoreKPIs/StoreKPIs';
import StoreToolbar from '@/app/manager/store/store_components/StoreToolbar/StoreToolbar';
import StoreFilters from '@/app/manager/store/store_components/StoreFilters/StoreFilters';
import ProductGrid from '@/app/manager/store/store_components/ProductGrid/ProductGrid';
import OrderTable from '@/app/manager/store/store_components/OrderTable/OrderTable';
import { StoreInitialData } from '@/app/manager/store/store_types/store_types';
import dynamic from 'next/dynamic';

const ProductModal = dynamic(() => import('@/app/manager/store/store_components/ProductModal/ProductModal'), { ssr: false });
const PosModal = dynamic(() => import('@/app/manager/store/store_components/PosModal/PosModal'), { ssr: false });


function StoreContent() {
  const { tab, toast, hideToast, printData, setPrintData } = useStoreContext();

  return (
    <div className="min-h-full pb-10 store-module bg-background text-foreground">
      <ManagerHeader title="Store" subtitle="Manage products, inventory and sales" />
      <div className="p-6 space-y-5">
        
        <StoreKPIs />

        <div className="bg-card rounded-xl shadow-sm border border-border overflow-hidden">
          <StoreToolbar />
          {tab === 'Orders' && <StoreFilters />}

          <div className="p-5">
            {tab === 'Products' ? <ProductGrid /> : <OrderTable />}
          </div>
        </div>
      </div>

      <ProductModal />
      <PosModal />

      {toast && (
        <ManagerToast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
      
      {printData && (
        <ManagerThermalReceipt data={printData} />
      )}
    </div>
  );
}

export default function StoreMain({ initialData }: { initialData?: StoreInitialData }) {
  return (
    <StoreProvider initialData={initialData}>
      <StoreContent />
    </StoreProvider>
  );
}
