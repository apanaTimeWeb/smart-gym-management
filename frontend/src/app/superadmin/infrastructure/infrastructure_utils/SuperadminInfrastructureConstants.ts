import type { InfrastructureNode, RedisTelemetry } from '@/app/superadmin/superadmin_types/superadmin_types';

export const MOCK_INFRASTRUCTURE_NODES: InfrastructureNode[] = [
  { id: 'node-1', name: 'Web-01 (API)', cpuPercent: 45, memoryPercent: 60, diskPercent: 30, status: 'healthy' },
  { id: 'node-2', name: 'Web-02 (API)', cpuPercent: 42, memoryPercent: 55, diskPercent: 30, status: 'healthy' },
  { id: 'node-3', name: 'DB-Primary', cpuPercent: 65, memoryPercent: 85, diskPercent: 70, status: 'warning' },
  { id: 'node-4', name: 'Worker-01', cpuPercent: 12, memoryPercent: 40, diskPercent: 20, status: 'healthy' },
];

export const MOCK_REDIS_TELEMETRY: RedisTelemetry = {
  memoryUsagePercent: 65,
  hitRatioPercent: 94,
  totalKeysCached: 1450230,
  uptimeHours: 342
};
