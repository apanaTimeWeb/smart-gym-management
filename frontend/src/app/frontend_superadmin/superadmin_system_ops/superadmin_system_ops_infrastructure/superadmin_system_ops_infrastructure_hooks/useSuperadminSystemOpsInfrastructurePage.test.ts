import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useSuperadminSystemOpsInfrastructurePage } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructurePage';



const setParam = vi.fn();
vi.mock('@/hooks/useUrlState', () => ({ useUrlState: () => ({ getParam: () => 'ALL', setParam }) }));
vi.mock('@/components/ui/Feedback/ConfirmProvider', () => ({ useConfirm: () => ({ confirm: vi.fn() }) }));
vi.mock('@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructureData', () => ({
  useSuperadminSystemOpsInfrastructureData: () => ({
    nodesQuery: { data: { data: [{ cpuPercent: 50, memoryPercent: 70, diskPercent: 80 }, { cpuPercent: null, memoryPercent: 30, diskPercent: 20 }] }, isPending: false, isError: false, error: null, refetch: vi.fn(), isFetching: false },
    redisQuery: { data: { data: { hitRate: 90 } }, isPending: false, refetch: vi.fn(), isFetching: false },
  }),
}));
vi.mock('@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructureActions', () => ({
  useSuperadminSystemOpsInfrastructureActions: () => ({ flushGlobalCache: vi.fn(), flushTenantCache: vi.fn(), isFlushingGlobal: false, isFlushingTenant: false }),
}));
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }));

describe('useSuperadminSystemOpsInfrastructurePage', () => {
  it('derives node health averages from the fetched nodes and preserves the URL filter boundary', () => {
    const { result } = renderHook(() => useSuperadminSystemOpsInfrastructurePage((key) => key));
    expect(result.current.statusFilter).toBe('ALL');
    expect(result.current.metrics.cpu.average).toBe(50);
    expect(result.current.metrics.memory.average).toBe(50);
    expect(result.current.metrics.disk.average).toBe(50);
  });
});
