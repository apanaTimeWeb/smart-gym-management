// RESPONSIBILITY: TypeScript types for the Superadmin System Health module.

export type ServiceStatus = 'OPERATIONAL' | 'DEGRADED' | 'OUTAGE' | 'MAINTENANCE';

export interface SystemHealthMetric {
  label: string;
  value: string | number;
  unit?: string;
  status: ServiceStatus;
}

export interface SystemService {
  name: string;
  status: ServiceStatus;
  latencyMs: number;
  uptime: string;
  lastChecked: string;
}

export interface SystemHealthData {
  cpuUsage: number;
  memoryUsageMb: number;
  totalMemoryMb: number;
  diskUsageGb: number;
  totalDiskGb: number;
  uptimeSeconds: number;
  nodeVersion: string;
  services: SystemService[];
}

export type SystemFetchState = 'idle' | 'loading' | 'success' | 'error';
