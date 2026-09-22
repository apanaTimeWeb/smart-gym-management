// RESPONSIBILITY: Maps a member-to-diet-plan assignment record.
// FLOW: Library assignment service → assignment entity → diet_plan_assignments.

import { Column, Entity } from 'typeorm'; import { CoreBaseEntity } from '@/backend_trainer/core/database/core-base.entity';
@Entity('trainer_diet_plan_assignments') export class LibraryDietPlanAssignmentEntity extends CoreBaseEntity { @Column({ name: 'member_id', type: 'uuid' }) memberId!: string; @Column({ name: 'diet_plan_id', type: 'uuid' }) dietPlanId!: string; @Column({ name: 'assigned_by', type: 'uuid' }) assignedBy!: string; @Column({ name: 'assigned_at', type: 'timestamptz' }) assignedAt!: Date; }
