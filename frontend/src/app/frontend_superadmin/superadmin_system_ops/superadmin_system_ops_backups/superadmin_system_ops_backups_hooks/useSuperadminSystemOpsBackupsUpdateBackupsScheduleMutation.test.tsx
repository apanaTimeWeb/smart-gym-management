import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { updateBackupSchedule } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi';
import { useSuperadminSystemOpsBackupsUpdateBackupsScheduleMutation } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_hooks/useSuperadminSystemOpsBackupsUpdateBackupsScheduleMutation';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi', () => ({ fetchBackupSchedule: vi.fn(), updateBackupSchedule: vi.fn() }));

describe('useSuperadminSystemOpsBackupsUpdateBackupsScheduleMutation', () => {
  it('passes the validated schedule and generated idempotency key to the API', async () => {
    vi.mocked(updateBackupSchedule).mockResolvedValue({ success: true, message: 'Updated', data: { retentionDays: 7 } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSystemOpsBackupsUpdateBackupsScheduleMutation(), { wrapper });
    const input = { enabled: true, retentionDays: 7, frequency: 'daily' } as never;
    await result.current.mutateAsync(input);
    expect(updateBackupSchedule).toHaveBeenCalledWith(input, expect.any(String));
  });
});
