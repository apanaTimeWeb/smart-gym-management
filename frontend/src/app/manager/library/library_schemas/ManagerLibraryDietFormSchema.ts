import { z } from 'zod';

export const managerLibraryDietFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  goal: z.string().min(1, 'Goal is required'),
  calories: z.coerce.number().min(0).optional(),
  protein: z.coerce.number().min(0).optional(),
  carbs: z.coerce.number().min(0).optional(),
  fats: z.coerce.number().min(0).optional(),
  description: z.string().optional(),
  meals: z.string().optional(),
});

export type ManagerLibraryDietFormValues = z.infer<typeof managerLibraryDietFormSchema>;
