// RESPONSIBILITY: TypeORM persistence entity for infrastructure feature data stored in `infrastructure_nodes`.
// FLOW: infrastructure repository -> InfrastructureNode entity -> PostgreSQL `infrastructure_nodes`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/superadmin_core/database/superadmin-core-base.entity';

export enum InfrastructureNodeStatus {
  HEALTHY = 'HEALTHY',
  DEGRADED = 'DEGRADED',
  DOWN = 'DOWN',
}

@Entity('superadmin_infrastructure_nodes')
@Index('IDX_infrastructure_nodes_updated_at', ['updatedAt'])
export class SuperadminInfrastructureEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 500 })
  name!: string;
  @Column({ name: 'region', type: 'varchar', length: 500 })
  region!: string;
  @Column({ name: 'status', type: 'enum', enum: InfrastructureNodeStatus })
  status!: InfrastructureNodeStatus;
  @Column({ name: 'cpu_percent', type: 'integer', default: 0 })
  cpuPercent!: number;
  @Column({ name: 'memory_percent', type: 'integer', default: 0 })
  memoryPercent!: number;
  @Column({ name: 'disk_percent', type: 'integer', default: 0 })
  diskPercent!: number;
  @Column({ name: 'uptime', type: 'varchar', length: 500 })
  uptime!: string;
  @Column({ name: 'last_checked', type: 'timestamptz' })
  lastChecked!: Date;
}