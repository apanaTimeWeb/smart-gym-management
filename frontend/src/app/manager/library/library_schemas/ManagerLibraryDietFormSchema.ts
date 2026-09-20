import { z } from 'zod';
import { MANAGER_LIBRARY_MAX_NUTRIENT_VALUE } from '@/app/manager/library/library_utils/ManagerLibrarySharedConstants';


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
