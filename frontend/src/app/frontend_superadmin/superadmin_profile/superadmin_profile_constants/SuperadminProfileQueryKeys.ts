/**
 * @description Canonical TanStack Query key registry for the superadmin profile feature.
 * @invariant Query identity must preserve the owning resource and all request-shaping parameters.
 */
export const SUPERADMIN_PROFILE_QUERY_KEYS = {
  all: ['superadmin_profile', 'profile'] as const,
} as const;
