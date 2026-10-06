// RESPONSIBILITY: Renders ManagerStoreContent's feature UI and orchestrates presentation through module-owned state/hooks; it does not own API transport or business rules.
'use client';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import ManagerToast from '@/components/ui/manager_toast/ManagerToast';
import ManagerHeader from '@/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader';
import ManagerStoreFilters from '@/app/frontend_manager/manager_store/manager_store_components/manager_store_filters/ManagerStoreFilters';
import ManagerStoreKPIs from '@/app/frontend_manager/manager_store/manager_store_components/manager_store_kpis/ManagerStoreKPIs';
import ManagerStoreOrderTable from '@/app/frontend_manager/manager_store/manager_store_components/manager_store_order_table/ManagerStoreOrderTable';
import ManagerStoreProductGrid from '@/app/frontend_manager/manager_store/manager_store_components/manager_store_product_grid/ManagerStoreProductGrid';
import ManagerStoreThermalReceipt from '@/app/frontend_manager/manager_store/manager_store_components/manager_store_thermal_receipt/ManagerStoreThermalReceipt';
import ManagerStoreToolbar from '@/app/frontend_manager/manager_store/manager_store_components/manager_store_toolbar/ManagerStoreToolbar';
import { useManagerStoreLogic } from '@/app/frontend_manager/manager_store/manager_store_hooks/useManagerStoreLogic';

/**
 * @description Renders/orchestrates the ManagerStoreContent user interface for the store module without owning sibling business logic.
 * @dependencies @/components/ui/manager_toast/ManagerToast; @/app/frontend_manager/manager_navigation/manager_navigation_components/manager_navigation_header/ManagerHeader; @/app/frontend_manager/manager_store/manager_store_components/manager_store_filters/ManagerStoreFilters; @/app/frontend_manager/manager_store/manager_store_components/manager_store_kpis/ManagerStoreKPIs; @/app/frontend_manager/manager_store/manager_store_components/manager_store_order_table/ManagerStoreOrderTable
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
const ManagerStoreProductModal = dynamic(() => import('@/app/frontend_manager/manager_store/manager_store_components/manager_store_product_modal/ManagerStoreProductModal'), { ssr: false });

const ManagerStorePosModal = dynamic(() => import('@/app/frontend_manager/manager_store/manager_store_components/manager_store_pos_modal/ManagerStorePosModal'), { ssr: false });

/** @description Renders the ManagerStoreContent component for its owning Manager frontend boundary. @dependencies Local dependencies are owned by this feature module (9 documented module/import dependencies).. @edge-case Preserves modal lifecycle. */
export function ManagerStoreContent() {
  const t = useTranslations('MANAGER_STORE');

  const { tab, toast, hideToast, printData } = useManagerStoreLogic();

  return (
    <div className="min-h-full pb-10 store-module bg-page text-primary">
      <ManagerHeader data-testid="manager_store-managerstorecontent-managerheader-1" title={t("COPY_STORE")} subtitle={t("COPY_MANAGE_PRODUCTS_INVENTORY_SALES")} />
      <div className="p-6 space-y-5">
        
        <ManagerStoreKPIs />

        <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden motion-safe:transition-all motion-safe:duration-base ease-in-out motion-safe:hover:-translate-y-1">
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
        <ManagerToast data-testid="manager_store-managerstorecontent-managertoast-2" message={toast.message} type={toast.type} onClose={hideToast} />
      )}
      
      {printData && (
        <ManagerStoreThermalReceipt data={printData} />
      )}
    </div>
  );
}
