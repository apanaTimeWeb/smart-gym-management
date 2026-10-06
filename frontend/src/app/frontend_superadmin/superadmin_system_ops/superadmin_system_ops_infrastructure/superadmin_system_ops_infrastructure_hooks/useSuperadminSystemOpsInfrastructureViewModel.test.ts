import { describe, expect, it } from 'vitest';

import { useSuperadminSystemOpsInfrastructureViewModel } from '@/app/frontend_superadmin/superadmin_system_ops/superadmin_system_ops_infrastructure/superadmin_system_ops_infrastructure_hooks/useSuperadminSystemOpsInfrastructureMainViewModel';


describe('useSuperadminSystemOpsInfrastructureViewModel', () => {
  it('calculates resource averages and counts from node input', () => {
    const result = useSuperadminSystemOpsInfrastructureViewModel([
      { id: 'n1', cpuPercent: 20, memoryPercent: 40, diskPercent: 60 },
      { id: 'n2', cpuPercent: 40, memoryPercent: 60, diskPercent: 80 },
    ] as never);
    expect(result).toMatchObject({ withCpuCount: 2, withMemCount: 2, withDiskCount: 2, avgCpu: 30, avgMem: 50, avgDisk: 70 });
  });
});
