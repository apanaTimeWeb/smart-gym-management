import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { migrationsApi } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_api/SuperadminSystemOpsMigrationsApi';
import { useSuperadminSystemOpsMigrationsDeploymentMutation } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_hooks/useSuperadminSystemOpsMigrationsDeploymentMutation';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_api/SuperadminSystemOpsMigrationsApi', () => ({ migrationsApi: { startMigration: vi.fn() } }));
vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminSystemOpsMigrationsDeploymentMutation', () => {
  it('starts the requested migration with the caller-provided idempotency key', async () => {
    vi.mocked(migrationsApi.startMigration).mockResolvedValue({ success: true, message: 'Started', data: { id: 'migration-1' } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSystemOpsMigrationsDeploymentMutation(), { wrapper });
    await result.current.mutateAsync({ targetVersion: '2026.10.1', idempotencyKey: 'key-1' });
    expect(migrationsApi.startMigration).toHaveBeenCalledWith('2026.10.1', 'key-1');
  });
});
