'use client';// DATA FLOW: migration route → query state + dedicated deployment mutation → user-visible migration table.
// RESPONSIBILITY: Owns migration page state/query/confirmation orchestration; mutation execution is delegated.
import { useRef } from 'react';

import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import { useConfirm } from '@/components/ui/Feedback/ConfirmProvider';

import { migrationsApi } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_api/SuperadminSystemOpsMigrationsApi';
import { SUPERADMIN_SYSTEM_OPS_MIGRATIONS_QUERY_KEYS } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_constants/SuperadminSystemOpsMigrationsQueryKeys';
import { useSuperadminSystemOpsMigrationsDeploymentMutation } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_hooks/useSuperadminSystemOpsMigrationsDeploymentMutation';



/**
 * Purpose: Owns migration page query and confirmation orchestration.
 * Inputs: target schema version from the view.
 * Output: migration records, loading/error state, deployment action, and retry.
 * Side effects: query reads plus delegation to the dedicated deployment mutation hook.
 * Invariant: view components never invoke TanStack mutation objects directly.
 */
/**
 * @description Coordinates migration list queries, filters, pagination, and migration form state for the System Ops migrations view.
 * @dependencies Uses the migrations API, query-key registry, URL state, and local form contracts.
 * @edge-case Keeps tenant/resource identity in query keys and preserves retryable loading/error states.
 */

export function useSuperadminSystemOpsMigrationsPage() {
  const t = useTranslations('superadmin_system_ops_migrations');
  const { confirm } = useConfirm();
  const idempotencyKeyRef = useRef<string | null>(null);
  const migrationsQuery = useQuery({
    queryKey: SUPERADMIN_SYSTEM_OPS_MIGRATIONS_QUERY_KEYS.list,
    queryFn: () => migrationsApi.fetchMigrations(),
  });
  const deploymentMutation = useSuperadminSystemOpsMigrationsDeploymentMutation();

  const requestDeployment = async (targetVersion: string): Promise<boolean> => {
    const normalizedVersion = targetVersion.trim();
    if (!normalizedVersion) return false;
    const confirmed = await confirm({
      title: t('ui.confirm_deploy_schema_title'),
      message: t('ui.confirm_deploy_schema_message', { version: normalizedVersion }),
      confirmText: t('ui.deploy_schema_action'),
      cancelText: t('ui.cancel_action'),
      type: 'warning',
    });
    if (!confirmed) return false;
    idempotencyKeyRef.current ??= crypto.randomUUID();
    const response = await deploymentMutation.mutateAsync({ targetVersion: normalizedVersion, idempotencyKey: idempotencyKeyRef.current });
    if (!response.success) return false;
    idempotencyKeyRef.current = null;
    return true;
  };

  return {
    migrations: migrationsQuery.data?.data ?? [],
    isPending: migrationsQuery.isPending,
    isError: migrationsQuery.isError,
    isDeploying: deploymentMutation.isPending,
    requestDeployment,
    refetch: migrationsQuery.refetch,
  };
}
