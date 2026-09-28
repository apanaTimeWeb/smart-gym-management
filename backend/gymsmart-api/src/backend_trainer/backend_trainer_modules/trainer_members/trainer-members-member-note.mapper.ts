// RESPONSIBILITY: Maps member-note persistence into the frontend note contract.
// FLOW: TrainerMembersMemberNoteEntity → MembersMemberNoteMapper → MemberDetailResponse.

import type { TrainerMembersMemberNoteEntity } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member-note.entity';
import type { MembersMemberNoteDomain } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-member-note.domain';

/**
 * @description Executes MembersMemberNoteMapper as an isolated backend utility/adapter operation.
 * @param entity - Input for MembersMemberNoteMapper.
 * @returns {MembersMemberNoteDomain} The deterministic result required by its caller.
 * @throws Infrastructure or canonical application exceptions when the operation cannot complete.
 * @remarks Preserve pure mapping/adapter behavior and avoid introducing business persistence shortcuts.
 * AI Note: Keep the utility isolated and update its direct callers when its contract changes.
 */
export function MembersMemberNoteMapper(entity: TrainerMembersMemberNoteEntity): MembersMemberNoteDomain {
  return { id: entity.id, text: entity.text, date: entity.createdAt.toISOString() };
}
