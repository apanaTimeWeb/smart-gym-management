// RESPONSIBILITY: Approved application-wide gym configuration sourced from validated environment settings; contains no feature business logic.
import { env } from '@/config/env';

/** Central gym identity/configuration used by approved Admin application surfaces. */
export const ADMIN_GYM_CONFIGURATION = {
  name: env.NEXT_PUBLIC_GYM_NAME,
  phone: env.NEXT_PUBLIC_GYM_PHONE,
} as const;
