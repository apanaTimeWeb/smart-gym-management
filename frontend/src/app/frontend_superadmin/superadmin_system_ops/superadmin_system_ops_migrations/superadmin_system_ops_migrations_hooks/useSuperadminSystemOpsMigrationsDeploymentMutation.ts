'use client';
// RESPONSIBILITY: Owns the schema migration deployment mutation and cache reconciliation.
import { useTranslations } from 'next-intl';

import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { SUPERADMIN_SYSTEM_OPS_MIGRATIONS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_query_keys/SuperadminSystemOpsMigrationsQueryKeys';
import { migrationsApi } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_api/SuperadminSystemOpsMigrationsApi';

// DATA FLOW: API / URL state / module client state → useTranslations → superadmin_system_ops_migrations view components.
/**
 * Purpose: Dedicated mutation boundary for schema rollout deployment.
 * Inputs: target schema version and idempotency key for the confirmed deployment intent.
 * Output: TanStack mutation state and mutateAsync.
 * Side effects: deployment request, success/error feedback, and targeted list invalidation.
 * Invariant: migration query identity remains scoped to this module.
 */
/**
 * @description Runs the confirmed migration deployment mutation and reconciles migration server state.
 * @dependencies Uses the migrations API facade, idempotency-key lifecycle, and TanStack Query invalidation.
 * @edge-case Reuses the same key for one deployment intent and never marks a failed deployment as successful.
 */

// DATA FLOW: Feature/API/query inputs → useSuperadminSystemOpsMigrationsDeploymentMutation → owning feature view/components.
/**
 * @description Owns the feature-local superadmin system ops migrations deployment mutation responsibility and keeps implementation state outside presentation components.
 * @dependencies Uses only approved feature-owned APIs/hooks/state plus explicitly approved application infrastructure.
 * @edge-case Preserves loading, error, retry, cancellation, and repeated-action behavior without leaking business state into sibling modules.
 */
export function useSuperadminSystemOpsMigrationsDeploymentMutation() {
  const t = useTranslations('superadmin_system_ops_migrations');
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ targetVersion, idempotencyKey }: { targetVersion: string; idempotencyKey: string }) => migrationsApi.startMigration(targetVersion, idempotencyKey),
    onSuccess: (response) => {
      if (response.success) {
        toast.success(response.message, { id: 'superadmin-migrations-deploy-success' });
        void queryClient.invalidateQueries({ queryKey: SUPERADMIN_SYSTEM_OPS_MIGRATIONS_QUERY_KEYS.list });
      } else {
        toast.error(response.message, { id: 'superadmin-migrations-deploy-error' });
      }
    },
    onError: (error: unknown) => {
      toast.error(t('ui.action_failed_retry'), { id: 'superadmin-migrations-deploy-error' });
    },
  });
}
