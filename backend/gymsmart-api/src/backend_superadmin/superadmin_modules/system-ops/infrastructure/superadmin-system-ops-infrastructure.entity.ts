// RESPONSIBILITY: TypeORM persistence entity for infrastructure feature data stored in `infrastructure_nodes`.
// FLOW: infrastructure repository -> InfrastructureNode entity -> PostgreSQL `infrastructure_nodes`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
import { InfrastructureNodeStatus } from '@/backend_superadmin/superadmin_modules/system-ops/infrastructure/superadmin-system-ops-infrastructure.constants';

/**
 * Primary Intent: Defines SuperadminSystemOpsInfrastructureEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_infrastructure_nodes')
@Index('IDX_infrastructure_nodes_updated_at', ['updatedAt'])
export class SuperadminSystemOpsInfrastructureEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property name. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'name', type: 'varchar', length: 500 })
  name!: string;
  /**
 * Primary Intent: Documents entity property region. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'region', type: 'varchar', length: 500 })
  region!: string;
  /**
 * Primary Intent: Documents entity property status. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'status', type: 'enum', enum: InfrastructureNodeStatus })
  status!: InfrastructureNodeStatus;
  /**
 * Primary Intent: Documents entity property cpuPercent. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'cpu_percent', type: 'integer', default: 0 })
  cpuPercent!: number;
  /**
 * Primary Intent: Documents entity property memoryPercent. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'memory_percent', type: 'integer', default: 0 })
  memoryPercent!: number;
  /**
 * Primary Intent: Documents entity property diskPercent. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'disk_percent', type: 'integer', default: 0 })
  diskPercent!: number;
  /**
 * Primary Intent: Documents entity property uptime. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'uptime', type: 'varchar', length: 500 })
  uptime!: string;
  /**
 * Primary Intent: Documents entity property lastChecked. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'last_checked', type: 'timestamptz' })
  lastChecked!: Date;
}
