import type { ManagerStoreProductFormValues } from '@/app/manager/store/store_schemas/ManagerStoreProductFormSchema';

export type ProductFormValues = ManagerStoreProductFormValues;

export const EMPTY_PRODUCT_FORM: ProductFormValues = {
  name: '',
  category: 'Supplements',
  price: 0,
  stock: 0,
  description: '',
  unit: '',
};
