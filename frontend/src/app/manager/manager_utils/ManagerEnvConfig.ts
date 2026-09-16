// RESPONSIBILITY: Parses the public Manager runtime environment once at the module boundary.
import { z } from 'zod';

const managerPublicEnvSchema = z.object({
  NEXT_PUBLIC_GYM_NAME: z.string().optional(),
  NEXT_PUBLIC_GYM_PHONE: z.string().optional(),
  NEXT_PUBLIC_GYM_GST: z.string().optional(),
  NEXT_PUBLIC_GYM_ADDRESS: z.string().optional(),
});

const parsedManagerPublicEnv = managerPublicEnvSchema.parse({
  NEXT_PUBLIC_GYM_NAME: process.env.NEXT_PUBLIC_GYM_NAME,
  NEXT_PUBLIC_GYM_PHONE: process.env.NEXT_PUBLIC_GYM_PHONE,
  NEXT_PUBLIC_GYM_GST: process.env.NEXT_PUBLIC_GYM_GST,
  NEXT_PUBLIC_GYM_ADDRESS: process.env.NEXT_PUBLIC_GYM_ADDRESS,
});

export const ManagerEnvConfig = {
  gymName: parsedManagerPublicEnv.NEXT_PUBLIC_GYM_NAME ?? 'GymSmart Fitness',
  gymPhone: parsedManagerPublicEnv.NEXT_PUBLIC_GYM_PHONE ?? '+91 83479 77566',
  gymGstNumber: parsedManagerPublicEnv.NEXT_PUBLIC_GYM_GST ?? '29ABCDE1234F1Z5',
  gymAddress: parsedManagerPublicEnv.NEXT_PUBLIC_GYM_ADDRESS ?? '123 Fitness Street, Banglore',
};
