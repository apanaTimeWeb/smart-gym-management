import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

export enum InfrastructureStatus {
  RUNNING = 'RUNNING',
  STOPPED = 'STOPPED',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
}

export enum InfrastructureType {
  VPS = 'VPS',
  DATABASE = 'DATABASE',
  REDIS = 'REDIS',
  CDN = 'CDN',
  LOAD_BALANCER = 'LOAD_BALANCER',
  STORAGE = 'STORAGE',
}

/**
 * InfrastructureNode entity — represents individual infrastructure components
 * (servers, databases, caches) that the platform depends on.
 */
@Entity('superadmin_infrastructure')
export class InfrastructureNode {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @Index()
  name: string;

  @Column({ type: 'enum', enum: InfrastructureType })
  @Index()
  type: InfrastructureType;

  @Column({ type: 'enum', enum: InfrastructureStatus, default: InfrastructureStatus.RUNNING })
  @Index()
  status: InfrastructureStatus;

  /** Provider identifier, e.g. "AWS", "GCP", "Hetzner" */
  @Column({ type: 'varchar', length: 100, nullable: true })
  provider: string | null;

  /** Region / datacenter location */
  @Column({ type: 'varchar', length: 100, nullable: true })
  region: string | null;

  /** IP address or hostname */
  @Column({ name: 'host_address', type: 'varchar', length: 255, nullable: true })
  hostAddress: string | null;

  /** CPU usage percentage */
  @Column({ name: 'cpu_percent', type: 'decimal', precision: 5, scale: 2, nullable: true })
  cpuPercent: number | null;

  /** Memory usage percentage */
  @Column({ name: 'memory_percent', type: 'decimal', precision: 5, scale: 2, nullable: true })
  memoryPercent: number | null;

  /** Disk usage percentage */
  @Column({ name: 'disk_percent', type: 'decimal', precision: 5, scale: 2, nullable: true })
  diskPercent: number | null;

  /** Uptime in seconds */
  @Column({ name: 'uptime_seconds', type: 'bigint', nullable: true })
  uptimeSeconds: number | null;

  @Column({ name: 'last_checked_at', type: 'timestamp', nullable: true })
  lastCheckedAt: Date | null;

  @Column({ type: 'json', nullable: true })
  metadata: Record<string, unknown> | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
