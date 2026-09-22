// RESPONSIBILITY: Maps member-note persistence into the frontend note contract.
// FLOW: MembersMemberNoteEntity → MembersMemberNoteMapper → MemberDetailResponse.

import type { MembersMemberNoteEntity } from '@/backend_trainer/modules/backend_trainer/members/members-member-note.entity';
import type { MembersMemberNoteDomain } from '@/backend_trainer/modules/backend_trainer/members/members-member-note.domain';

export function MembersMemberNoteMapper(entity: MembersMemberNoteEntity): MembersMemberNoteDomain {
  return { id: entity.id, text: entity.text, date: entity.createdAt.toISOString() };
}
