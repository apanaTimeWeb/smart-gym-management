// RESPONSIBILITY: Validates environment variables at startup using Zod
import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:5000/api/v1'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_DEMO_MODE: z.string().default('false').transform((val) => val === 'true'),
  NEXT_PUBLIC_GYM_NAME: z.string().default('Smart Gym'),
  NEXT_PUBLIC_GYM_PHONE: z.string().default('123-456-7890'),
});

const _env = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  NEXT_PUBLIC_DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE,
  NEXT_PUBLIC_GYM_NAME: process.env.NEXT_PUBLIC_GYM_NAME,
  NEXT_PUBLIC_GYM_PHONE: process.env.NEXT_PUBLIC_GYM_PHONE,
});

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
