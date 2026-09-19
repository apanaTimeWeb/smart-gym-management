// DATA FLOW: Superadmin UI → useSuperadminMigrationsPage → Superadmin module API/state → consuming component
'use client';
// DATA FLOW: URL/page → useSuperadminMigrationsPage → TanStack Query → migration view.
// RESPONSIBILITY: Owns Superadmin migration query state, deployment mutation state, confirmation, and query reconciliation.
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { migrationsApi } from '@/app/superadmin/migrations/migrations_api/SuperadminMigrationsApi';
import { useSuperadminConfirm } from '@/app/superadmin/superadmin_layout/SuperadminFeedback/SuperadminConfirmProvider';
const MIGRATIONS_QUERY_KEY = ['superadmin', 'migrations', 'list'] as const;
/**
 * Purpose: Owns Superadmin migration query state, deployment mutation state, confirmation, and query reconciliation.
 * Inputs: values defined by the exported hook signature.
 * Output: the hook's typed state/actions/query contract.
 * Side effects: remain scoped to the owning feature or approved application infrastructure.
 * Invariant: does not move feature business state into unrelated modules.
 */
export function useSuperadminMigrationsPage() {
    const queryClient = useQueryClient();
    const { confirm } = useSuperadminConfirm();
    const migrationsQuery = useQuery({
        queryKey: MIGRATIONS_QUERY_KEY,
        queryFn: () => migrationsApi.fetchMigrations(),
    });
    const deployMutation = useMutation({
        mutationFn: ({ targetVersion, idempotencyKey }: { targetVersion: string; idempotencyKey: string }) => migrationsApi.startMigration(targetVersion, idempotencyKey),
        onSuccess: (response) => {
            toast.success(response.message, { id: 'superadmin-migrations-deploy-success' });
            void queryClient.invalidateQueries({ queryKey: MIGRATIONS_QUERY_KEY });
        },
        onError: (error: unknown) => {
            toast.error(error instanceof Error ? error.message : '', {
                id: 'superadmin-migrations-deploy-error',
            });
        },
    });
    const requestDeployment = async (targetVersion: string): Promise<boolean> => {
        const normalizedVersion = targetVersion.trim();
        if (!normalizedVersion)
            return false;
        const confirmed = await confirm({
            title: 'Deploy New Schema',
            message: `Deploy schema version ${normalizedVersion} across all active tenant databases?`,
            confirmText: 'Deploy Schema',
            cancelText: 'Cancel',
            type: 'warning',
        });
        if (!confirmed)
            return false;
        await deployMutation.mutateAsync({ targetVersion: normalizedVersion, idempotencyKey: crypto.randomUUID() });
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
