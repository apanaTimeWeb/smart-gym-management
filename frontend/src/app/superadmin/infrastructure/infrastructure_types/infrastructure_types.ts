// RESPONSIBILITY: TypeScript types for the Superadmin Infrastructure module.

export type NodeStatus = 'HEALTHY' | 'DEGRADED' | 'DOWN';
export type CacheStatus = 'CONNECTED' | 'DISCONNECTED' | 'STALE';

export interface InfrastructureNode {
  id: string;
  name: string;
  region: string;
  status: NodeStatus;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  uptime: string;
  lastChecked: string;
}

export interface RedisTelemetry {
  status: CacheStatus;
  connectedClients: number;
  usedMemoryMb: number;
  maxMemoryMb: number;
  hitRate: number;
  totalKeys: number;
  uptimeSeconds: number;
}

export type InfrastructureFetchState = 'idle' | 'loading' | 'success' | 'error';
