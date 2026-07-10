import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';

export enum SystemHealthStatus {
  HEALTHY = 'HEALTHY',
  DEGRADED = 'DEGRADED',
  DOWN = 'DOWN',
}

/**
 * SystemHealthSnapshot entity — periodic health check snapshots for
 * the main platform services (API server, DB, Redis, Queue workers).
 */
@Entity('superadmin_system_health')
export class SystemHealthSnapshot {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /** Service identifier, e.g. "api", "database", "redis", "queue-worker" */
  @Column({ name: 'service_name', type: 'varchar', length: 100 })
  @Index()
  serviceName: string;

  @Column({ type: 'enum', enum: SystemHealthStatus, default: SystemHealthStatus.HEALTHY })
  @Index()
  status: SystemHealthStatus;

  /** Response time in milliseconds for health probe */
  @Column({ name: 'response_time_ms', type: 'int', nullable: true })
  responseTimeMs: number | null;

  /** CPU usage percentage (0-100) */
  @Column({ name: 'cpu_usage_percent', type: 'decimal', precision: 5, scale: 2, nullable: true })
  cpuUsagePercent: number | null;

  /** Memory usage percentage (0-100) */
  @Column({ name: 'memory_usage_percent', type: 'decimal', precision: 5, scale: 2, nullable: true })
  memoryUsagePercent: number | null;

  /** Disk usage percentage (0-100) */
  @Column({ name: 'disk_usage_percent', type: 'decimal', precision: 5, scale: 2, nullable: true })
  diskUsagePercent: number | null;

  /** Additional metadata as JSON */
  @Column({ type: 'json', nullable: true })
  metadata: Record<string, unknown> | null;

  @Column({ name: 'error_message', type: 'text', nullable: true })
  errorMessage: string | null;

  @Column({ name: 'checked_at', type: 'timestamp' })
  @Index()
  checkedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
