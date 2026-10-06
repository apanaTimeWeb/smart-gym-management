import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, act } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminSystemOpsInfrastructureFlushTenantMutation } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructureFlushTenantMutation';

import type { ReactNode } from 'react';



describe('useSuperadminSystemOpsInfrastructureFlushTenantMutation', () => {
  it('does not flush when confirmation is rejected and flushes the selected tenants after confirmation', async () => {
    const onFlush = vi.fn().mockResolvedValue({ success: true });
    const confirmAction = vi.fn().mockResolvedValue(false);
    const onSuccess = vi.fn();
    const keyRef = { current: null as string | null };
    const client = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
    const wrapper = ({ children }: { children: ReactNode }) => <QueryClientProvider client={client}>{children}</QueryClientProvider>;
    const { result, rerender } = renderHook(() => useSuperadminSystemOpsInfrastructureFlushTenantMutation(onFlush, ['tenant-1'], keyRef, confirmAction, onSuccess), { wrapper });
    await result.current.mutateAsync();
    expect(onFlush).not.toHaveBeenCalled();
    expect(onSuccess).toHaveBeenCalledWith(false);

    confirmAction.mockResolvedValue(true);
    rerender();
    await act(async () => { await result.current.mutateAsync(); });
    expect(onFlush).toHaveBeenCalledWith(['tenant-1'], expect.any(String));
    expect(onSuccess).toHaveBeenLastCalledWith(true);
  });
});
