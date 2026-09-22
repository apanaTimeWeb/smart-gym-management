// RESPONSIBILITY: Maps trainer-authored member notes to the tenant database.
// FLOW: Member note service → MembersMemberNoteEntity → member_notes.

import { Column, Entity } from 'typeorm'; import { CoreBaseEntity } from '@/backend_trainer/core/database/core-base.entity';
@Entity('trainer_member_notes') export class MembersMemberNoteEntity extends CoreBaseEntity { @Column({ name: 'member_id', type: 'uuid' }) memberId!: string; @Column() text!: string; @Column({ name: 'author_id', type: 'uuid' }) authorId!: string; }
