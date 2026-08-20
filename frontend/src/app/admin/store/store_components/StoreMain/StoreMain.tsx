// RESPONSIBILITY: Entry component for the Store module. Wraps the UI in the context provider and handles page layout.
'use client';

import AdminHeader from '@/app/admin/admin_components/AdminLayout/AdminHeader';
import AdminToast from '@/app/admin/admin_components/AdminFeedback/AdminToast';
import AdminThermalReceipt from '@/app/admin/admin_components/AdminShared/AdminThermalReceipt';

import { StoreProvider, useStoreContext } from '@/app/admin/store/store_context/StoreContext';
import StoreKPIs from '@/app/admin/store/store_components/StoreKPIs/StoreKPIs';
import StoreToolbar from '@/app/admin/store/store_components/StoreToolbar/StoreToolbar';
import StoreFilters from '@/app/admin/store/store_components/StoreFilters/StoreFilters';
import ProductGrid from '@/app/admin/store/store_components/ProductGrid/ProductGrid';
import OrderTable from '@/app/admin/store/store_components/OrderTable/OrderTable';
import { StoreInitialData } from '@/app/admin/store/store_types/store_types';
import dynamic from 'next/dynamic';

const ProductModal = dynamic(() => import('@/app/admin/store/store_components/ProductModal/ProductModal'), { ssr: false });
const PosModal = dynamic(() => import('@/app/admin/store/store_components/PosModal/PosModal'), { ssr: false });


function StoreContent() {
  const { tab, toast, hideToast, printData, setPrintData } = useStoreContext();

  return (
    <div className="min-h-full pb-10 store-module bg-background text-foreground">
      <AdminHeader title="Store" subtitle="Manage products, inventory and sales" />
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
        <AdminToast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
      
      {printData && (
        <AdminThermalReceipt data={printData} />
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
