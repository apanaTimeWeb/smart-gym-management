// RESPONSIBILITY: Persists the asynchronous Gym CSV export lifecycle.
// FLOW: Export command -> durable job -> Redis queue -> paginated CSV worker -> protected result file.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
import { SuperadminGymsExportJobStatus } from '@/backend_superadmin/superadmin_modules/gyms/superadmin-gyms.constants';

/**
 * Primary Intent: Defines SuperadminGymsExportJobEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_gyms_export_jobs')
@Index('IDX_superadmin_gyms_export_jobs_status',['status'])
@Index('IDX_superadmin_gyms_export_jobs_requested_by',['requestedByUserId'])
export class SuperadminGymsExportJobEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property status. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({name:'status',type:'enum',enum:SuperadminGymsExportJobStatus,default:SuperadminGymsExportJobStatus.QUEUED}) status!:SuperadminGymsExportJobStatus;
  /**
 * Primary Intent: Documents entity property requestedByUserId. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({name:'requested_by_user_id',type:'varchar',length:64}) requestedByUserId!:string;
  /**
 * Primary Intent: Documents entity property search. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({name:'search',type:'varchar',length:500,nullable:true}) search!:string|null;
  /**
 * Primary Intent: Documents entity property statusFilter. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({name:'status_filter',type:'varchar',length:100,nullable:true}) statusFilter!:string|null;
  /**
 * Primary Intent: Documents entity property planFilter. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({name:'plan_filter',type:'varchar',length:500,nullable:true}) planFilter!:string|null;
  /**
 * Primary Intent: Documents entity property attempts. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({name:'attempts',type:'integer',default:0}) attempts!:number;
  /**
 * Primary Intent: Documents entity property errorCode. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({name:'error_code',type:'varchar',length:160,nullable:true}) errorCode!:string|null;
  /**
 * Primary Intent: Documents entity property resultPath. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({name:'result_path',type:'text',nullable:true}) resultPath!:string|null;
  /**
 * Primary Intent: Documents entity property completedAt. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({name:'completed_at',type:'timestamptz',nullable:true}) completedAt!:Date|null;
}
