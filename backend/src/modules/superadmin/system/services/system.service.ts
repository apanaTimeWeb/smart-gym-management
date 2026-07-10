import { Injectable, Logger } from '@nestjs/common';

// Simulated real-time system health data for the superadmin system health page
const SYSTEM_SERVICES = [
  { serviceName: 'api-server', status: 'HEALTHY', responseTimeMs: 42, cpuUsagePercent: 34.5, memoryUsagePercent: 67.2, diskUsagePercent: 45.0 },
  { serviceName: 'postgres-db', status: 'HEALTHY', responseTimeMs: 8, cpuUsagePercent: 12.1, memoryUsagePercent: 78.3, diskUsagePercent: 55.8 },
  { serviceName: 'redis-cache', status: 'HEALTHY', responseTimeMs: 1, cpuUsagePercent: 4.2, memoryUsagePercent: 23.6, diskUsagePercent: 10.1 },
  { serviceName: 'bullmq-worker', status: 'HEALTHY', responseTimeMs: 15, cpuUsagePercent: 8.7, memoryUsagePercent: 41.0, diskUsagePercent: null },
  { serviceName: 'smtp-gateway', status: 'DEGRADED', responseTimeMs: 850, cpuUsagePercent: 2.1, memoryUsagePercent: 15.3, diskUsagePercent: null },
];

@Injectable()
export class SystemService {
  private readonly logger = new Logger(SystemService.name);

  findAll() {
    this.logger.log('Fetching system health status for all services');
    const healthy = SYSTEM_SERVICES.filter((s) => s.status === 'HEALTHY').length;
    const degraded = SYSTEM_SERVICES.filter((s) => s.status === 'DEGRADED').length;
    const down = SYSTEM_SERVICES.filter((s) => s.status === 'DOWN').length;

    return {
      success: true,
      message: 'System health data fetched successfully',
      data: {
        services: SYSTEM_SERVICES.map((s) => ({
          ...s,
          checkedAt: new Date().toISOString(),
        })),
        summary: {
          totalServices: SYSTEM_SERVICES.length,
          healthy,
          degraded,
          down,
          overallStatus: down > 0 ? 'DOWN' : degraded > 0 ? 'DEGRADED' : 'HEALTHY',
        },
      },
    };
  }

  /** Returns a minimal health probe response for Kubernetes liveness probes (Rule 25) */
  getHealthProbe() {
    return {
      success: true,
      message: 'System is operational',
      data: {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        memoryUsageMB: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      },
    };
  }

  findOne(id: string) {
    const service = SYSTEM_SERVICES.find((s) => s.serviceName === id);
    return {
      success: true,
      message: service ? 'Service health fetched' : 'Service not found',
      data: service ?? null,
    };
  }
}
