'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useManagerStoreLogic } from '@/app/manager/store/store_hooks/ManagerUseManagerStoreLogic';
import { useManagerUnsavedChangesGuard } from '@/app/manager/manager_infrastructure/ManagerUnsavedChangesGuard';
import { fromManagerMinorUnits } from '@/app/manager/manager_infrastructure/ManagerMoney';
import { managerStoreProductFormSchema } from '@/app/manager/store/store_schemas/ManagerStoreProductFormSchema';
import type { ProductFormValues } from '@/app/manager/store/store_types/ManagerStoreProductFormTypes';
import { EMPTY_PRODUCT_FORM } from '@/app/manager/store/store_types/ManagerStoreProductFormTypes';

// RESPONSIBILITY: Owns Store product form setup, synchronization with edit state, validation, submission, and dirty-state protection.
// DATA FLOW: Store UI state → Product form hook → Zod/RHF → Store mutation → Query cache/UI.
/** Coordinates the Store product form lifecycle without placing submission logic in the view component. */
export function useManagerStoreProductForm() {
  const { showProductModal, setShowProductModal, editProductId, editProductData, saving, saveProduct } = useManagerStoreLogic();
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(managerStoreProductFormSchema as any),
    defaultValues: editProductData ?? EMPTY_PRODUCT_FORM,
  });

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
    await saveProduct(values);
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
