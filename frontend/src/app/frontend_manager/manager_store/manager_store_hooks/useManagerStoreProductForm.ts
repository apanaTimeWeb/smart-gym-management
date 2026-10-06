'use client';
// DATA FLOW: URL/local UI state or feature input → feature hook → module-owned TanStack Query/Zustand mutation/query → observable UI result.
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useManagerUnsavedChangesGuard } from '@/app/frontend_manager/manager_infrastructure/useManagerUnsavedChangesGuard';
import { fromManagerMinorUnits } from '@/app/frontend_manager/manager_infrastructure/ManagerMoney';
import { useManagerStoreLogic } from '@/app/frontend_manager/manager_store/manager_store_hooks/useManagerStoreLogic';
import { managerStoreProductFormSchema } from '@/app/frontend_manager/manager_store/manager_store_schemas/ManagerStoreProductFormSchema';
import { EMPTY_PRODUCT_FORM } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreProductFormTypes';
import type { ProductFormValues } from '@/app/frontend_manager/manager_store/manager_store_types/ManagerStoreProductFormTypes';
import type { Resolver } from 'react-hook-form';


/** Coordinates the Store product form lifecycle without placing submission logic in the view component. */
/**
 * @description Coordinates store feature state and its documented UI/API boundary through useManagerStoreProductForm.
 * @dependencies Uses ManagerMoney, ManagerUnsavedChangesGuard, useManagerStoreLogic, ManagerStoreProductFormSchema.
 * @edge-case preserves documented empty, retry, and boundary states for this module.
 */
/** @description Module-owned custom hook for the owning Manager feature. @dependencies Uses documented module state/API infrastructure only. @edge-case Preserves loading, empty, error, retry, and permission-sensitive behavior defined by the feature contract. */
// DATA FLOW: Feature API/Query or module UI state → custom hook → owning feature component
/**
 * @description useManagerStoreProductForm owns the store feature-level flow described by the module contract.
 * @dependencies Uses feature-owned APIs, query keys, schemas, types, constants, stores, and approved global infrastructure only.
 * @edge-case Preserves loading, empty, error, retry, cancellation, permission, and direct-URL behavior documented for this flow.
 */
export function useManagerStoreProductForm() {
  const { showProductModal, setShowProductModal, editProductId, editProductData, saving, saveProduct } = useManagerStoreLogic();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(managerStoreProductFormSchema) as Resolver<ProductFormValues>,
    defaultValues: editProductData ?? EMPTY_PRODUCT_FORM,
  });

// EFFECT: Effect lifecycle and dependency list are intentionally scoped to values that control this side effect.
  useEffect(() => {
    if (!showProductModal) return;
    const values = editProductData
      ? { ...editProductData, price: fromManagerMinorUnits(editProductData.price) }
      : EMPTY_PRODUCT_FORM;
    form.reset(values);
  }, [editProductData, form, showProductModal]);

  const { confirmAndClose } = useManagerUnsavedChangesGuard(showProductModal && form.formState.isDirty);
  const handleClose = () => { void confirmAndClose(() => setShowProductModal(false)); };
  const submit = form.handleSubmit(async (values) => {
    await saveProduct(values as ProductFormValues);
    form.reset(values);
    setShowProductModal(false);
  });

  return {
    form,
    showProductModal,
    editProductId,
    saving,
    handleClose,
    submit,
  };
}
