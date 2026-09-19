// RESPONSIBILITY: Defines validation rules for creating and editing a subscription plan.
import { z } from 'zod';
export const managerPlansFormSchema = z.object({
  name: z.string().min(2, 'Name is required'), tier: z.string(),
  price1Month: z.string().refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, 'Valid price required'),
  price3Month: z.string().refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, 'Valid price required'),
  price6Month: z.string().refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, 'Valid price required'),
  price12Month: z.string().refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, 'Valid price required'),
  priceCustom: z.string().refine((val) => !Number.isNaN(Number(val)) && Number(val) > 0, 'Valid price required'),
  features: z.string().min(2, 'Features are required'),
});
