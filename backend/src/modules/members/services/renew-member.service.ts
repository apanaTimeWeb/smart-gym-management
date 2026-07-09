import { Injectable, Logger } from '@nestjs/common';
import { MembersRepository } from '@/modules/members/services/members.repository';
import { RenewMemberDto } from '@/modules/members/dto/renew-member.dto';
import { MemberNotFoundException } from '@/modules/members/members.exceptions';
import { MEMBER_MESSAGES } from '@/modules/members/members.constants';
import type { MemberResponse } from '@/modules/members/members.interfaces';
import { MemberStatus } from '@/modules/members/utils/members.enums';

@Injectable()
export class RenewMemberService {
  private readonly logger = new Logger(RenewMemberService.name);

  constructor(private readonly membersRepository: MembersRepository) {}

  async renew(id: string, dto: RenewMemberDto): Promise<MemberResponse> {
    this.logger.log(`Renewing member with ID: ${id}`);
    const existing = await this.membersRepository.findMemberById(id);
    
    if (!existing) {
      throw new MemberNotFoundException();
    }

    const updatedMember = await this.membersRepository.updateMember(id, { status: MemberStatus.ACTIVE });

    return {
      message: MEMBER_MESSAGES.RENEWED_SUCCESS,
      data: updatedMember,
    };
  }
}
