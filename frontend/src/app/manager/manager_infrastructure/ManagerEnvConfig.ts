// RESPONSIBILITY: Validates public Manager runtime configuration once at the application boundary.
import { z } from 'zod';

const managerPublicEnvSchema = z.object({
  NEXT_PUBLIC_GYM_NAME: z.string().trim().min(1, 'NEXT_PUBLIC_GYM_NAME is required'),
  NEXT_PUBLIC_GYM_PHONE: z.string().trim().min(1, 'NEXT_PUBLIC_GYM_PHONE is required'),
  NEXT_PUBLIC_GYM_GST: z.string().trim().min(1, 'NEXT_PUBLIC_GYM_GST is required'),
  NEXT_PUBLIC_GYM_ADDRESS: z.string().trim().min(1, 'NEXT_PUBLIC_GYM_ADDRESS is required'),
  NEXT_PUBLIC_CURRENCY_CODE: z.string().trim().length(3, 'NEXT_PUBLIC_CURRENCY_CODE must be an ISO 4217 code'),
  NEXT_PUBLIC_MANAGER_DEMO_MODE: z.enum(['true', 'false']).optional().default('false'),
});

const parsedManagerPublicEnvResult = managerPublicEnvSchema.safeParse({
  NEXT_PUBLIC_GYM_NAME: process.env.NEXT_PUBLIC_GYM_NAME,
  NEXT_PUBLIC_GYM_PHONE: process.env.NEXT_PUBLIC_GYM_PHONE,
  NEXT_PUBLIC_GYM_GST: process.env.NEXT_PUBLIC_GYM_GST,
  NEXT_PUBLIC_GYM_ADDRESS: process.env.NEXT_PUBLIC_GYM_ADDRESS,
  NEXT_PUBLIC_CURRENCY_CODE: process.env.NEXT_PUBLIC_CURRENCY_CODE,
  NEXT_PUBLIC_MANAGER_DEMO_MODE: process.env.NEXT_PUBLIC_MANAGER_DEMO_MODE,
});

if (!parsedManagerPublicEnvResult.success && process.env.NODE_ENV === 'production') {
  throw new Error(`[ManagerEnvConfig] Missing required env vars: ${parsedManagerPublicEnvResult.error.message}`);
}

const parsedManagerPublicEnv = parsedManagerPublicEnvResult.success
  ? parsedManagerPublicEnvResult.data
  : {
      NEXT_PUBLIC_GYM_NAME: 'GymSmart',
      NEXT_PUBLIC_GYM_PHONE: '+91 98000 00000',
      NEXT_PUBLIC_GYM_GST: '22AAAAA0000A1Z5',
      NEXT_PUBLIC_GYM_ADDRESS: 'Demo Address',
      NEXT_PUBLIC_CURRENCY_CODE: 'INR',
      NEXT_PUBLIC_MANAGER_DEMO_MODE: 'true' as const,
    };

export const ManagerEnvConfig = {
  gymName: parsedManagerPublicEnv.NEXT_PUBLIC_GYM_NAME,
  gymPhone: parsedManagerPublicEnv.NEXT_PUBLIC_GYM_PHONE,
  gymGstNumber: parsedManagerPublicEnv.NEXT_PUBLIC_GYM_GST,
  gymAddress: parsedManagerPublicEnv.NEXT_PUBLIC_GYM_ADDRESS,
  currencyCode: parsedManagerPublicEnv.NEXT_PUBLIC_CURRENCY_CODE,
  demoMode: parsedManagerPublicEnv.NEXT_PUBLIC_MANAGER_DEMO_MODE === 'true',
} as const;
