// RESPONSIBILITY: Central rate-limit tier definitions used by the global Redis limiter.
// FLOW: Request classification -> tier lookup -> counter -> rate-limit decision.
import type { ManagerCoreRateLimitTier } from '@/backend_manager/manager_core/manager_core_config/manager-core-rate-limit.types';

export const ManagerCoreRateLimitConfig = Object.freeze({
  publicAuth: { limit: 5, windowSeconds: 60 },
  authenticatedRead: { limit: 100, windowSeconds: 60 },
  export: { limit: 2, windowSeconds: 60 },
  mutation: { limit: 60, windowSeconds: 60 },
} satisfies Record<string, ManagerCoreRateLimitTier>);
