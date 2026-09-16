'use client';
// DATA FLOW: URL/page → useSuperadminMigrationsPage → TanStack Query → migration view.
// RESPONSIBILITY: Owns Superadmin migration query state, deployment mutation state, confirmation, and query reconciliation.

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { migrationsApi } from '@/app/superadmin/migrations/superadmin_migrations_api/superadmin_migrations_api';
import { useSuperadminConfirm } from '@/app/superadmin/superadmin_components/SuperadminFeedback/SuperadminConfirmProvider';

const MIGRATIONS_QUERY_KEY = ['superadmin', 'migrations', 'list'] as const;

export function useSuperadminMigrationsPage() {
  const queryClient = useQueryClient();
  const { confirm } = useSuperadminConfirm();
  const migrationsQuery = useQuery({
    queryKey: MIGRATIONS_QUERY_KEY,
    queryFn: () => migrationsApi.fetchMigrations(),
  });

  const deployMutation = useMutation({
    mutationFn: (targetVersion: string) => migrationsApi.triggerMigration(targetVersion),
    onSuccess: (response) => {
      toast.success(response.message, { id: 'superadmin-migrations-deploy-success' });
      void queryClient.invalidateQueries({ queryKey: MIGRATIONS_QUERY_KEY });
    },
    onError: (error: unknown) => {
      toast.error(error instanceof Error ? error.message : 'Migration request failed.', {
        id: 'superadmin-migrations-deploy-error',
      });
    },
  });

  const requestDeployment = async (targetVersion: string): Promise<boolean> => {
    const normalizedVersion = targetVersion.trim();
    if (!normalizedVersion) return false;

    const confirmed = await confirm({
      title: 'Deploy New Schema',
      message: `Deploy schema version ${normalizedVersion} across all active tenant databases?`,
      confirmText: 'Deploy Schema',
      cancelText: 'Cancel',
      type: 'warning',
    });

    if (!confirmed) return false;
    await deployMutation.mutateAsync(normalizedVersion);
    return true;
  };

  return {
    migrations: migrationsQuery.data?.data ?? [],
    isPending: migrationsQuery.isPending,
    isError: migrationsQuery.isError,
    isDeploying: deployMutation.isPending,
    requestDeployment,
    refetch: migrationsQuery.refetch,
  };
}
