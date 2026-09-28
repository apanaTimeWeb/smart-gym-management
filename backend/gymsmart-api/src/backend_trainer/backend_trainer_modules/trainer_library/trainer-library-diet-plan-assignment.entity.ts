// RESPONSIBILITY: Maps a member-to-diet-plan assignment record.
// FLOW: Library assignment service → assignment entity → diet_plan_assignments.

import { Column, Entity } from 'typeorm'; import { CoreBaseEntity } from '@/backend_trainer/backend_core/core_database/core-base.entity';

/**
 * Intent: Defines the TrainerLibraryDietPlanAssignmentEntity boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Entity('trainer_diet_plan_assignments') export class TrainerLibraryDietPlanAssignmentEntity extends CoreBaseEntity { @Column({ name: 'member_id', type: 'uuid' }) memberId!: string; @Column({ name: 'diet_plan_id', type: 'uuid' }) dietPlanId!: string; @Column({ name: 'assigned_by', type: 'uuid' }) assignedBy!: string; @Column({ name: 'assigned_at', type: 'timestamptz' }) assignedAt!: Date; }
