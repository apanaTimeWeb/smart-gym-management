// DATA FLOW: API/server state → ManagerStoreProductFormTypes → owning feature UI; UI events/mutations → ManagerStoreProductFormTypes → module API → TanStack Query cache/UI.
import type { ManagerStoreProductFormValues } from '@/app/frontend_manager/manager_store/manager_store_schemas/ManagerStoreProductFormSchema';

export type ProductFormValues = ManagerStoreProductFormValues;

/**
 * @description Provides the ManagerStoreProductFormTypes implementation for the store module.
 * @dependencies @/app/frontend_manager/manager_store/manager_store_schemas/ManagerStoreProductFormSchema
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const EMPTY_PRODUCT_FORM: ProductFormValues = {
  name: '',
  category: 'Supplements',
  price: 0,
  stock: 0,
  description: '',
  unit: '',
};
