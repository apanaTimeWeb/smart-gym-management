import type { ManagerLibraryDietFormValues } from '@/app/frontend_manager/manager_library/manager_library_schemas/ManagerLibraryDietFormSchema';

export type DietFormValues = ManagerLibraryDietFormValues;

/**
 * @description Provides the ManagerLibraryDietFormTypes implementation for the library module.
 * @dependencies @/app/frontend_manager/manager_library/manager_library_schemas/ManagerLibraryDietFormSchema
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const EMPTY_DIET_FORM: DietFormValues = {
  name: '', goal: 'Weight Loss', calories: undefined, protein: undefined, carbs: undefined, fats: undefined, description: '', meals: ''
};
