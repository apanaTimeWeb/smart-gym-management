// RESPONSIBILITY: Adds a trainer-authored note and returns the updated member-detail contract expected by the frontend.
// FLOW: Members command controller → note service → scoped member/notes repositories → audit → mapped member detail.

import { Injectable } from '@nestjs/common';
import { CoreAuditService } from '@/backend_trainer/core/audit/core-audit.service';
import { CoreSanitizationService } from '@/backend_trainer/core/security/core-sanitization.service';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { MembersRepository } from '@/backend_trainer/modules/backend_trainer/members/repositories/members-repository';
import { MembersCreateMemberNoteDto } from '@/backend_trainer/modules/backend_trainer/members/dtos/members-create-member-note.dto';
import { MembersMemberMapper } from '@/backend_trainer/modules/backend_trainer/members/members-member.mapper';
import { MembersMemberNoteMapper } from '@/backend_trainer/modules/backend_trainer/members/members-member-note.mapper';

@Injectable()
export class MembersNoteService {
  constructor(private readonly repo: MembersRepository, private readonly audit: CoreAuditService, private readonly sanitizer: CoreSanitizationService) {}

  /** Adds a member note and returns the complete member-detail response shape. */
  async create(memberId: string, dto: MembersCreateMemberNoteDto): Promise<Record<string, unknown>> {
    const trainerId = CoreRequestContext.get().userId ?? '';
    const member = await this.repo.findByIdForTrainerOrThrow(trainerId, memberId);
    const row = await this.repo.createNote(memberId, trainerId, this.sanitizer.text(dto.text) ?? '');
    await this.audit.record('MEMBER_NOTE_CREATED', 'MEMBER_NOTE', row.id, null, { memberId });
    const notes = (await this.repo.findNotes(memberId)).map(MembersMemberNoteMapper);
    return { ...MembersMemberMapper(member), trainerNotes: notes };
  }
}
