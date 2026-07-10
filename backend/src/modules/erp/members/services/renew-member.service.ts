import { Injectable, Logger } from '@nestjs/common';
import { MembersRepository } from '@/modules/erp/members/members.repository';
import { RenewMemberDto } from '@/modules/erp/members/dto/renew-member.dto';
import { MemberNotFoundException } from '@/modules/erp/members/members.exceptions';
import { MEMBER_MESSAGES } from '@/modules/erp/members/members.constants';
import type { MemberResponse } from '@/modules/erp/members/members.interfaces';
import { MemberStatus } from '@/modules/erp/members/utils/members.enums';

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

    const updatedMember = await this.membersRepository.updateMember(id, {
      status: MemberStatus.ACTIVE,
    });

    return {
      message: MEMBER_MESSAGES.RENEWED_SUCCESS,
      data: updatedMember,
    };
  }
}
