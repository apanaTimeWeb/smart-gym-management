'use client';
// DATA FLOW: Feature UI → module-owned product mutation hook/query state → authoritative Store API response → observable UI reconciliation.
import { useManagerStoreProductMutations } from '@/app/frontend_manager/manager_store/manager_store_hooks/useManagerStoreProductMutations';
import { useManagerStoreUiStore } from '@/app/frontend_manager/manager_store/manager_store_store/useManagerStoreUiStore';
import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import type { ProductFormValues } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreProductFormTypes';
import type { Product, StoreSummary } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreTypes';

/**
 * @description Exposes product modal state and delegates all product server mutations to the dedicated mutation hook.
 * @dependencies Uses useManagerStoreProductMutations and module-scoped Store UI state.
 * @edge-case Keeps server loading state in TanStack Query mutation state rather than Zustand.
 */
export function useManagerStoreProducts(
  setProducts: (updater: Product[] | ((previous: Product[]) => Product[])) => void,
  setSummary: (updater: StoreSummary | null | ((previous: StoreSummary | null) => StoreSummary | null)) => void,
  showToast: (message: string, type: ManagerToastType) => void,
) {
  const ui = useManagerStoreUiStore();
  const mutations = useManagerStoreProductMutations(setProducts, setSummary, showToast, ui.editProductId);
  return {
    showProductModal: ui.showProductModal,
    setShowProductModal: ui.setShowProductModal,
    editProductId: ui.editProductId,
    editProductData: ui.editProductData,
    openAddProduct: ui.openAddProduct,
    openEditProduct: ui.openEditProduct,
    saveProduct: async (data: Partial<ProductFormValues>) => { await mutations.saveProduct(data); },
    deleteProduct: async (id: string) => { await mutations.deleteProduct(id); },
    isSaving: mutations.isSaving,
  };
}
