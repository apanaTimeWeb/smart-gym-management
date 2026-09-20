// DATA FLOW: Store UI -> TanStack mutation/API -> Store Query cache -> Store UI.
'use client';
/** Coordinates the Manager / feature. */
import { useMutation } from '@tanstack/react-query';
import { createManagerIdempotencyKey } from '@/app/manager/manager_infrastructure/ManagerIdempotency';
import { toManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';
import { showManagerErrorToast } from '@/app/manager/manager_infrastructure/ManagerToastService';
import { storeApi } from '@/app/manager/store/store_api/ManagerStoreApi';
import { useManagerStoreUiStore } from '@/app/manager/store/store_store/ManagerUseManagerStoreUiStore';
import type { ManagerConfirmType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerConfirmModalTypes';
import type { ManagerToastType } from '@/app/manager/manager_components/ManagerFeedback/manager_feedback_types/ManagerToastTypes';
import type { ProductFormValues } from '@/app/manager/store/store_types/ManagerStoreProductFormTypes';
import type { Product, StoreSummary } from '@/app/manager/store/store_types/ManagerStoreTypes';


type ProductUpdater = (updater: Product[] | ((previous: Product[]) => Product[])) => void;
type SummaryUpdater = (updater: StoreSummary | null | ((previous: StoreSummary | null) => StoreSummary | null)) => void;

/** Orchestrates the owning Manager feature behavior while preserving its documented state boundary. */
export function useManagerStoreProducts(
  setProducts: ProductUpdater,
  setSummary: SummaryUpdater,
  showToast: (message: string, type: ManagerToastType) => void,
  setSaving: (saving: boolean) => void,
  confirm: (args: { title: string; message: string; confirmText: string; type: ManagerConfirmType }) => Promise<boolean>,
) {
  const ui = useManagerStoreUiStore();
  const saveMutation = useMutation({
    mutationFn: async (data: Partial<ProductFormValues>) => {
      const payload: Partial<Product> = { ...data, price: data.price === undefined ? undefined : toManagerMinorUnits(data.price), stock: data.stock };
      return ui.editProductId
        ? storeApi.updateProduct(ui.editProductId, payload)
        : storeApi.createProduct(payload);
    },
    onMutate: () => setSaving(true),
    onSuccess: (res) => {
      if (ui.editProductId) {
        const updated = res.data || {};
        setProducts((prev) => prev.map((product) => String(product.id) === String(ui.editProductId) ? { ...product, ...updated } : product));
      } else if (res.data) {
        setProducts((prev) => [res.data as Product, ...prev]);
        setSummary((prev) => prev ? { ...prev, totalProducts: prev.totalProducts + 1 } : prev);
      }
      showToast(res.message, 'success');
      ui.setShowProductModal(false);
    },
    onError: (error: unknown) => showManagerErrorToast(error, 'manager-store-save-product-error'),
    onSettled: () => setSaving(false) });
  const deleteMutation = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => storeApi.deleteProduct(id, idempotencyKey),
    onMutate: () => setSaving(true),
    onSuccess: (res, id) => {
      setProducts((prev) => prev.filter((product) => String(product.id) !== String(id)));
      setSummary((prev) => prev ? { ...prev, totalProducts: Math.max(0, prev.totalProducts - 1) } : prev);
      showToast(res.message, 'success');
    },
    onError: (error: unknown) => showManagerErrorToast(error, 'manager-store-delete-product-error'),
    onSettled: () => setSaving(false) });
  return {
    showProductModal: ui.showProductModal,
    setShowProductModal: ui.setShowProductModal,
    editProductId: ui.editProductId,
    editProductData: ui.editProductData,
    openAddProduct: ui.openAddProduct,
    openEditProduct: ui.openEditProduct,
    saveProduct: async (data: Partial<ProductFormValues>) => { await saveMutation.mutateAsync(data); },
    deleteProduct: async (id: string) => { await deleteMutation.mutateAsync({ id, idempotencyKey: createManagerIdempotencyKey() }); } };
}
