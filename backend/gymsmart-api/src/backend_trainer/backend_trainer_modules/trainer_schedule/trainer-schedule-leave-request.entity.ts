// RESPONSIBILITY: Maps trainer leave requests using typed status values.
// FLOW: Schedule repository → TrainerScheduleLeaveRequestEntity → leave_requests.

import { Column, Entity } from 'typeorm'; import { CoreBaseEntity } from '@/backend_trainer/backend_core/core_database/core-base.entity'; import { LeaveStatus, LeaveType } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-enums';

/**
 * Intent: Defines the TrainerScheduleLeaveRequestEntity boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Entity('trainer_leave_requests') export class TrainerScheduleLeaveRequestEntity extends CoreBaseEntity { @Column({name:'trainer_id',type:'uuid'}) trainerId!: string; @Column({name:'start_date',type:'date'}) startDate!: string; @Column({name:'end_date',type:'date'}) endDate!: string; @Column() reason!: string; @Column({name:'leave_type', type:'enum', enum:LeaveType, enumName:'leave_type_enum'}) leaveType!: LeaveType; @Column({type:'enum',enum:LeaveStatus,enumName:'leave_status_enum'}) status!: LeaveStatus; @Column({name:'manager_notes',nullable:true}) managerNotes!: string|null; @Column({name:'total_days',nullable:true}) totalDays!: number|null; @Column({name:'attachment_url',nullable:true}) attachmentUrl!: string|null; @Column({name:'approved_by',type:'uuid',nullable:true}) approvedBy!: string|null; @Column({name:'rejected_reason',nullable:true}) rejectedReason!: string|null; }
