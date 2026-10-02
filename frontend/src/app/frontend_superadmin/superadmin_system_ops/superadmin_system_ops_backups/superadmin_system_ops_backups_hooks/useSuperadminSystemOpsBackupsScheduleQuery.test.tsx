import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { fetchBackupSchedule } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi';
import { useSuperadminSystemOpsBackupsScheduleQuery } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_hooks/useSuperadminSystemOpsBackupsScheduleQuery';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi', () => ({ fetchBackupSchedule: vi.fn() }));

describe('useSuperadminSystemOpsBackupsScheduleQuery', () => {
  it('loads the validated schedule only when enabled', async () => {
    vi.mocked(fetchBackupSchedule).mockResolvedValue({ success: true, message: 'Loaded', data: { retentionDays: 7 } } as never);
    const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSystemOpsBackupsScheduleQuery(true), { wrapper });
    await waitFor(() => expect(result.current.schedule).toEqual({ retentionDays: 7 }));
    expect(fetchBackupSchedule).toHaveBeenCalledTimes(1);
  });
});
