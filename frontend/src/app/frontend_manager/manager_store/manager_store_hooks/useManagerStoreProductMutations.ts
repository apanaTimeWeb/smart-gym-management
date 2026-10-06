'use client';
// DATA FLOW: Feature input → module-owned mutation hook → ManagerStoreApi → authoritative response → TanStack Query invalidation/UI reconciliation.
import { useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createManagerIdempotencyKey } from '@/app/frontend_manager/manager_infrastructure/ManagerIdempotency';
import { toManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/ManagerMoney';
import { showManagerErrorToast } from '@/app/frontend_manager/manager_infrastructure/ManagerToastService';
import { ManagerStoreApi } from '@/app/frontend_manager/manager_store/manager_store_api/ManagerStoreApi';
import { ManagerStoreQueryKeys } from '@/app/frontend_manager/manager_store/manager_store_constants/ManagerStoreQueryKeys';
import type { ManagerToastType } from '@/components/ui/manager_toast/ManagerToastTypes';
import type { ProductFormValues } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreProductFormTypes';
import type { Product, StoreSummary } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreTypes';

/**
 * @description Owns Store product create/update/delete mutations and server-state invalidation.
 * @dependencies Uses ManagerStoreApi, ManagerStoreQueryKeys, ManagerIdempotency, ManagerMoney, ManagerToastService.
 * @edge-case Reuses a caller-provided idempotency key for the current mutation intent and never stores server loading state in Zustand.
 */
export function useManagerStoreProductMutations(
  setProducts: (updater: Product[] | ((previous: Product[]) => Product[])) => void,
  setSummary: (updater: StoreSummary | null | ((previous: StoreSummary | null) => StoreSummary | null)) => void,
  showToast: (message: string, type: ManagerToastType) => void,
  editProductId: string | null,
) {
  const queryClient = useQueryClient();
  const saveKeyRef = useRef<string | null>(null);
  const deleteKeyByIdRef = useRef(new Map<string, string>());
  const save = useMutation({
    mutationFn: async (data: Partial<ProductFormValues> & { idempotencyKey: string }) => {
      const payload: Partial<Product> = {
        ...data,
        price: data.price === undefined ? undefined : toManagerMinorUnits(data.price),
        stock: data.stock,
      };
      return editProductId
        ? ManagerStoreApi.updateProduct(editProductId, payload, data.idempotencyKey)
        : ManagerStoreApi.createProduct(payload, data.idempotencyKey);
    },
    onSuccess: (response) => {
      if (editProductId) {
        const updated = response.data || {};
        setProducts((prev) => prev.map((product) => String(product.id) === String(editProductId) ? { ...product, ...updated } : product));
      } else if (response.data) {
        setProducts((prev) => [response.data as Product, ...prev]);
        setSummary((prev) => prev ? { ...prev, totalProducts: prev.totalProducts + 1 } : prev);
      }
      queryClient.invalidateQueries({ queryKey: ManagerStoreQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: ManagerStoreQueryKeys.summary() });
      saveKeyRef.current = null;
      showToast(response.message, 'success');
    },
    onError: (error: unknown) => showManagerErrorToast(error, 'manager-store-save-product-error'),
  });
  const remove = useMutation({
    mutationFn: ({ id, idempotencyKey }: { id: string; idempotencyKey: string }) => ManagerStoreApi.deleteProduct(id, idempotencyKey),
    onSuccess: (response, id) => {
      setProducts((prev) => prev.filter((product) => String(product.id) !== String(id)));
      setSummary((prev) => prev ? { ...prev, totalProducts: Math.max(0, prev.totalProducts - 1) } : prev);
      queryClient.invalidateQueries({ queryKey: ManagerStoreQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: ManagerStoreQueryKeys.summary() });
      showToast(response.message, 'success');
    },
    onError: (error: unknown) => showManagerErrorToast(error, 'manager-store-delete-product-error'),
  });
  return {
    saveProduct: (data: Partial<ProductFormValues>) => { const idempotencyKey = saveKeyRef.current ?? createManagerIdempotencyKey(); saveKeyRef.current = idempotencyKey; return save.mutateAsync({ ...data, idempotencyKey }); },
    deleteProduct: (id: string) => { const idempotencyKey = deleteKeyByIdRef.current.get(id) ?? createManagerIdempotencyKey(); deleteKeyByIdRef.current.set(id, idempotencyKey); return remove.mutateAsync({ id, idempotencyKey }); },
    isSaving: save.isPending || remove.isPending,
  };
}
