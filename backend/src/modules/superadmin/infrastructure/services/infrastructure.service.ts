import { Injectable, Logger, NotFoundException } from '@nestjs/common';

// Simulated infrastructure nodes data
const INFRASTRUCTURE_NODES = [
  {
    id: 'infra-001',
    name: 'App Server 1 (Primary)',
    type: 'VPS',
    status: 'RUNNING',
    provider: 'Hetzner',
    region: 'EU-Central (Frankfurt)',
    hostAddress: '65.109.x.x',
    cpuPercent: 34.5,
    memoryPercent: 67.2,
    diskPercent: 45.0,
    uptimeSeconds: 2592000, // 30 days
    lastCheckedAt: new Date().toISOString(),
  },
  {
    id: 'infra-002',
    name: 'PostgreSQL Database',
    type: 'DATABASE',
    status: 'RUNNING',
    provider: 'Hetzner',
    region: 'EU-Central (Frankfurt)',
    hostAddress: '10.0.0.2',
    cpuPercent: 12.1,
    memoryPercent: 78.3,
    diskPercent: 55.8,
    uptimeSeconds: 5184000, // 60 days
    lastCheckedAt: new Date().toISOString(),
  },
  {
    id: 'infra-003',
    name: 'Redis Cache Cluster',
    type: 'REDIS',
    status: 'RUNNING',
    provider: 'Hetzner',
    region: 'EU-Central (Frankfurt)',
    hostAddress: '10.0.0.3',
    cpuPercent: 4.2,
    memoryPercent: 23.6,
    diskPercent: 10.1,
    uptimeSeconds: 7776000, // 90 days
    lastCheckedAt: new Date().toISOString(),
  },
  {
    id: 'infra-004',
    name: 'Cloudflare CDN',
    type: 'CDN',
    status: 'RUNNING',
    provider: 'Cloudflare',
    region: 'Global',
    hostAddress: null,
    cpuPercent: null,
    memoryPercent: null,
    diskPercent: null,
    uptimeSeconds: null,
    lastCheckedAt: new Date().toISOString(),
  },
  {
    id: 'infra-005',
    name: 'Object Storage (Backups)',
    type: 'STORAGE',
    status: 'RUNNING',
    provider: 'AWS',
    region: 'EU-West-1 (Ireland)',
    hostAddress: null,
    cpuPercent: null,
    memoryPercent: null,
    diskPercent: 38.7,
    uptimeSeconds: null,
    lastCheckedAt: new Date().toISOString(),
  },
];

@Injectable()
export class InfrastructureService {
  private readonly logger = new Logger(InfrastructureService.name);

  findAll() {
    this.logger.log('Fetching all infrastructure nodes');
    return {
      success: true,
      message: 'Infrastructure nodes fetched successfully',
      data: INFRASTRUCTURE_NODES,
      meta: {
        total: INFRASTRUCTURE_NODES.length,
        running: INFRASTRUCTURE_NODES.filter((n) => n.status === 'RUNNING').length,
        warning: INFRASTRUCTURE_NODES.filter((n) => n.status === 'WARNING').length,
        stopped: INFRASTRUCTURE_NODES.filter((n) => n.status === 'STOPPED').length,
      },
    };
  }

  findOne(id: string) {
    const node = INFRASTRUCTURE_NODES.find((n) => n.id === id);
    if (!node) {
      throw new NotFoundException(`Infrastructure node with ID "${id}" not found`);
    }
    return { success: true, message: 'Infrastructure node fetched successfully', data: node };
  }
}
