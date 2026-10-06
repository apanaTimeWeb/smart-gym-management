import { z } from 'zod';
import { MANAGER_LIBRARY_MAX_NUTRIENT_VALUE } from '@/app/frontend_manager/manager_library/manager_library_constants/ManagerLibrarySharedConstants';


/**
 * @description Provides the ManagerLibraryDietFormSchema implementation for the library module.
 * @dependencies @/app/frontend_manager/manager_library/manager_library_constants/ManagerLibrarySharedConstants
 * @edge-case Preserves loading, empty, error, disabled, retry, and cancellation behavior defined by the owning module contract; does not introduce cross-feature business ownership.
 */
export const managerLibraryDietFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  goal: z.string().min(1, 'Goal is required'),
  calories: z.coerce.number().min(0).max(MANAGER_LIBRARY_MAX_NUTRIENT_VALUE).optional(),
  protein: z.coerce.number().min(0).max(MANAGER_LIBRARY_MAX_NUTRIENT_VALUE).optional(),
  carbs: z.coerce.number().min(0).max(MANAGER_LIBRARY_MAX_NUTRIENT_VALUE).optional(),
  fats: z.coerce.number().min(0).max(MANAGER_LIBRARY_MAX_NUTRIENT_VALUE).optional(),
  description: z.string().optional(),
  meals: z.string().optional(),
});

export type ManagerLibraryDietFormValues = z.infer<typeof managerLibraryDietFormSchema>;
