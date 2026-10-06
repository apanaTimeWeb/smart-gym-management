import { migrationsApi } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_api/SuperadminSystemOpsMigrationsApi';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminSystemOpsMigrationsPage } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_hooks/useSuperadminSystemOpsMigrationsPage';

import type { ReactNode } from 'react';


vi.mock('@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_migrations/superadmin_system_ops_migrations_api/SuperadminSystemOpsMigrationsApi', () => ({ migrationsApi: vi.fn() })); vi.mock('next-intl', () => ({ useTranslations: () => (key: string) => key }));
describe('useSuperadminSystemOpsMigrationsPage', () => {
  it('executes the hook query contract and reaches a successful query state', async () => {
    vi.mocked(migrationsApi).mockResolvedValue({ success: true, message: 'ok', data: [] } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSystemOpsMigrationsPage(), { wrapper });
    await waitFor(() => expect(result.current.status).toBe('success'));
    expect(result.current.isError).toBe(false);
  });
});
