// RESPONSIBILITY: Maps trainer-authored member notes to the tenant database.
// FLOW: Member note service → TrainerMembersMemberNoteEntity → member_notes.

import { Column, Entity } from 'typeorm'; import { CoreBaseEntity } from '@/backend_trainer/backend_core/core_database/core-base.entity';

/**
 * Intent: Defines the TrainerMembersMemberNoteEntity boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Entity('trainer_member_notes') export class TrainerMembersMemberNoteEntity extends CoreBaseEntity { @Column({ name: 'member_id', type: 'uuid' }) memberId!: string; @Column() text!: string; @Column({ name: 'author_id', type: 'uuid' }) authorId!: string; }
