import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createBackupSnapshot } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi';
import { useSuperadminSystemOpsBackupsActions } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_hooks/useSuperadminSystemOpsBackupsActions';

import type { ReactNode } from 'react';



vi.mock('@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_backups/superadmin_system_ops_backups_api/SuperadminSystemOpsBackupsApi', () => ({ createBackupSnapshot: vi.fn(), restoreBackupSnapshot: vi.fn(), fetchBackupDownloadUrl: vi.fn() }));

describe('useSuperadminSystemOpsBackupsActions', () => {
  it('triggers a backup through the feature API with the caller-owned idempotency key', async () => {
    vi.mocked(createBackupSnapshot).mockResolvedValue({ success: true, message: 'Started', data: { id: 'backup-1' } } as never);
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result } = renderHook(() => useSuperadminSystemOpsBackupsActions(), { wrapper });
    await result.current.triggerBackup('key-1');
    expect(createBackupSnapshot).toHaveBeenCalledWith('key-1');
  });
});
