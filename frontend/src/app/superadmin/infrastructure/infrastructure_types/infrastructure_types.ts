// RESPONSIBILITY: TypeScript types for the Superadmin Infrastructure module.

export type NodeStatus = 'HEALTHY' | 'DEGRADED' | 'DOWN';
export type CacheStatus = 'CONNECTED' | 'DISCONNECTED' | 'STALE';

export interface InfrastructureNode {
  id: string;
  name: string;
  region: string;
  status: NodeStatus;
  cpuPercent: number | null;
  memoryPercent: number | null;
  diskPercent: number | null;
  uptime: string;
  lastChecked: string;
}

export interface RedisTelemetry {
  status: CacheStatus;
  memoryUsagePercent: number;
  hitRatioPercent: number;
  totalKeysCached: number;
  uptimeHours: number;
}

export type InfrastructureFetchState = 'idle' | 'loading' | 'success' | 'error';
