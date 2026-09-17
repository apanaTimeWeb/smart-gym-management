// RESPONSIBILITY: Module-owned mock fixture data for Superadmin.
import type { InfrastructureNode, RedisTelemetry } from '@/app/superadmin/infrastructure/infrastructure_types/superadmin_infrastructure_types';
export const MOCK_INFRASTRUCTURE_NODES: InfrastructureNode[] = [
    { id: 'node-1', name: 'Web-01 (API)', region: 'us-east-1', cpuPercent: 45, memoryPercent: 60, diskPercent: 30, status: 'HEALTHY', uptime: '99.9%', lastChecked: new Date().toISOString() },
    { id: 'node-2', name: 'Web-02 (API)', region: 'us-east-1', cpuPercent: 42, memoryPercent: 55, diskPercent: 30, status: 'HEALTHY', uptime: '99.9%', lastChecked: new Date().toISOString() },
    { id: 'node-3', name: 'DB-Primary', region: 'us-east-1', cpuPercent: 65, memoryPercent: 85, diskPercent: 70, status: 'DEGRADED', uptime: '99.8%', lastChecked: new Date().toISOString() },
    { id: 'node-4', name: 'Worker-01', region: 'us-east-1', cpuPercent: 12, memoryPercent: 40, diskPercent: 20, status: 'HEALTHY', uptime: '99.9%', lastChecked: new Date().toISOString() },
    { id: 'node-5', name: 'Worker-02', region: 'eu-west-1', cpuPercent: 71, memoryPercent: 78, diskPercent: 82, status: 'DEGRADED', uptime: '99.6%', lastChecked: new Date().toISOString() },
    { id: 'node-6', name: 'Cache-01', region: 'ap-south-1', cpuPercent: 24, memoryPercent: 48, diskPercent: 22, status: 'HEALTHY', uptime: '99.95%', lastChecked: new Date().toISOString() },
    { id: 'node-7', name: 'Search-01', region: 'ap-south-1', cpuPercent: 92, memoryPercent: 94, diskPercent: 88, status: 'DOWN', uptime: '96.2%', lastChecked: new Date().toISOString() },
    { id: 'node-8', name: 'Reports-01', region: 'eu-west-1', cpuPercent: 58, memoryPercent: 61, diskPercent: 54, status: 'HEALTHY', uptime: '99.7%', lastChecked: new Date().toISOString() },
];

export const MOCK_REDIS_TELEMETRY: RedisTelemetry = {
    memoryUsagePercent: 65,
    hitRatioPercent: 94,
    totalKeysCached: 1450230,
    uptimeHours: 342,
    status: 'CONNECTED'
};
