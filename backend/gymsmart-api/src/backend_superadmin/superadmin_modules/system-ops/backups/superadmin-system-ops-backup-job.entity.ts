// RESPONSIBILITY: Persists durable backup/restore job lifecycle state.
// FLOW: Backup/restore command -> job repository -> Redis queue -> worker -> durable result.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
import { SuperadminBackupJobStatus, SuperadminBackupJobType } from '@/backend_superadmin/superadmin_modules/system-ops/backups/superadmin-system-ops-backups.constants';

/**
 * Primary Intent: Defines SuperadminSystemOpsBackupJobEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_backup_jobs')
@Index('IDX_superadmin_backup_jobs_status', ['status'])
@Index('IDX_superadmin_backup_jobs_tenant_id', ['tenantId'])
@Index('IDX_superadmin_backup_jobs_type', ['type'])
export class SuperadminSystemOpsBackupJobEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property type. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name:'type', type:'enum', enum: SuperadminBackupJobType }) type!: SuperadminBackupJobType;
  /**
 * Primary Intent: Documents entity property status. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name:'status', type:'enum', enum: SuperadminBackupJobStatus, default: SuperadminBackupJobStatus.QUEUED }) status!: SuperadminBackupJobStatus;
  /**
 * Primary Intent: Documents entity property tenantId. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name:'tenant_id', type:'varchar', length:64 }) tenantId!: string;
  /**
 * Primary Intent: Documents entity property requestedByUserId. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name:'requested_by_user_id', type:'varchar', length:64 }) requestedByUserId!: string;
  /**
 * Primary Intent: Documents entity property attempts. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name:'attempts', type:'integer', default:0 }) attempts!: number;
  /**
 * Primary Intent: Documents entity property errorCode. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name:'error_code', type:'varchar', length:160, nullable:true }) errorCode!: string | null;
  /**
 * Primary Intent: Documents entity property completedAt. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name:'completed_at', type:'timestamptz', nullable:true }) completedAt!: Date | null;
  /**
 * Primary Intent: Documents entity property resultBackupId. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name:'result_backup_id', type:'varchar', length:64, nullable:true }) resultBackupId!: string | null;
}
