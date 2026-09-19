import { z } from 'zod';

export const managerStoreProductFormSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  category: z.string().min(1, 'Category is required'),
  price: z.coerce.number().min(0, 'Price must be non-negative'),
  stock: z.coerce.number().min(0, 'Stock must be non-negative'),
  description: z.string().optional(),
  unit: z.string().optional(),
});

export type ManagerStoreProductFormValues = z.infer<typeof managerStoreProductFormSchema>;
