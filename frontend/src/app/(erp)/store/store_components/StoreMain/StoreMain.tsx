"use client";

import ErpHeader from '@/app/(erp)/erp_components/ErpHeader';
import ErpToast from '@/app/(erp)/erp_components/ErpToast';
import ErpThermalReceipt from '@/app/(erp)/erp_components/ErpThermalReceipt';

import { StoreProvider, useStoreContext } from '@/app/(erp)/store/store_context/StoreContext';
import StoreKPIs from '@/app/(erp)/store/store_components/StoreKPIs/StoreKPIs';
import StoreToolbar from '@/app/(erp)/store/store_components/StoreToolbar/StoreToolbar';
import ProductGrid from '@/app/(erp)/store/store_components/ProductGrid/ProductGrid';
import OrderTable from '@/app/(erp)/store/store_components/OrderTable/OrderTable';
import ProductModal from '@/app/(erp)/store/store_components/ProductModal/ProductModal';
import PosModal from '@/app/(erp)/store/store_components/PosModal/PosModal';

import '@/app/(erp)/store/store.css';

function StoreContent() {
 const { tab, toast, hideToast, printData, setPrintData } = useStoreContext();

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

export default function StoreMain() {
 return (
 <StoreProvider>
 <StoreContent />
 </StoreProvider>
 );
}
