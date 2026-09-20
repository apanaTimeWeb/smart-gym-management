// DATA FLOW: Store UI state → Product form hook → Zod/RHF → Store mutation → Query cache/UI.
// RESPONSIBILITY: Owns Store product form setup, synchronization with edit state, validation, submission, and dirty-state protection.
'use client';

import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { fromManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import { useManagerStoreLogic } from '@/app/manager/store/store_hooks/ManagerUseManagerStoreLogic';
import { managerStoreProductFormSchema } from '@/app/manager/store/store_schemas/ManagerStoreProductFormSchema';
import { EMPTY_PRODUCT_FORM } from '@/app/manager/store/store_types/ManagerStoreProductFormTypes';
import type { ProductFormValues } from '@/app/manager/store/store_types/ManagerStoreProductFormTypes';


/** Coordinates the Store product form lifecycle without placing submission logic in the view component. */
export function useManagerStoreProductForm() {
  const { showProductModal, setShowProductModal, editProductId, editProductData, saving, saveProduct } = useManagerStoreLogic();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(managerStoreProductFormSchema) as any,
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
