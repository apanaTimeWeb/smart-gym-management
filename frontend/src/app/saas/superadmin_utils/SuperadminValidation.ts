import { z } from 'zod';

export const OnboardGymSchema = z.object({
  gymName: z.string().min(2, 'Gym name must be at least 2 characters'),
  ownerName: z.string().min(2, 'Owner name is required'),
  adminEmail: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required'),
  plan: z.enum(['BASIC', 'PRO', 'ENTERPRISE']),
  temporaryPassword: z.string().min(8, 'Password must be at least 8 characters')
});

export type OnboardGymFormValues = z.infer<typeof OnboardGymSchema>;
