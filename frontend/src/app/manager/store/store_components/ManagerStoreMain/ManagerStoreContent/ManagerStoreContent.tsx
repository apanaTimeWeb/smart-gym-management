// RESPONSIBILITY: Renders the ManagerStoreContent sub-view extracted from ManagerStoreMain; owns only this presentation responsibility.
'use client';
import dynamic from 'next/dynamic';
import ManagerToast from '@/app/manager/manager_components/ManagerFeedback/ManagerToast';
import ManagerHeader from '@/app/manager/manager_components/ManagerLayout/ManagerHeader';
import ManagerStoreFilters from '@/app/manager/store/store_components/ManagerStoreFilters/ManagerStoreFilters';
import ManagerStoreKPIs from '@/app/manager/store/store_components/ManagerStoreKPIs/ManagerStoreKPIs';
import ManagerStoreOrderTable from '@/app/manager/store/store_components/ManagerStoreOrderTable/ManagerStoreOrderTable';
import ManagerStoreProductGrid from '@/app/manager/store/store_components/ManagerStoreProductGrid/ManagerStoreProductGrid';
import ManagerStoreThermalReceipt from '@/app/manager/store/store_components/ManagerStoreThermalReceipt/ManagerStoreThermalReceipt';
import ManagerStoreToolbar from '@/app/manager/store/store_components/ManagerStoreToolbar/ManagerStoreToolbar';
import { useManagerStoreLogic  } from '@/app/manager/store/store_hooks/ManagerUseManagerStoreLogic';

const ManagerStoreProductModal = dynamic(() => import('@/app/manager/store/store_components/ManagerStoreProductModal/ManagerStoreProductModal'), { ssr: false });

const ManagerStorePosModal = dynamic(() => import('@/app/manager/store/store_components/ManagerStorePosModal/ManagerStorePosModal'), { ssr: false });

export function ManagerStoreContent() {
  const { tab, toast, hideToast, printData } = useManagerStoreLogic();

  return (
    <div className="min-h-full pb-10 store-module bg-page text-primary">
      <ManagerHeader title="Store" subtitle="Manage products, inventory and sales" />
      <div className="p-6 space-y-5">
        
        <ManagerStoreKPIs />

        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
          <ManagerStoreToolbar />
          {tab === 'Orders' && <ManagerStoreFilters />}

          <div className="p-5">
            {tab === 'Products' ? <ManagerStoreProductGrid /> : <ManagerStoreOrderTable />}
          </div>
        </div>
      </div>

      <ManagerStoreProductModal />
      <ManagerStorePosModal />

      {toast && (
        <ManagerToast message={toast.message} type={toast.type} onClose={hideToast} />
      )}
      
      {printData && (
        <ManagerStoreThermalReceipt data={printData} />
      )}
    </div>
  );
}
