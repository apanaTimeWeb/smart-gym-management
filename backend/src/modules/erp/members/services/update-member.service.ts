import { Injectable, Logger } from '@nestjs/common';
import { MembersRepository } from '@/modules/erp/members/members.repository';
import { UpdateMemberDto } from '@/modules/erp/members/dto/update-member.dto';
import { MemberNotFoundException } from '@/modules/erp/members/members.exceptions';
import { MEMBER_MESSAGES } from '@/modules/erp/members/members.constants';
import type { MemberResponse } from '@/modules/erp/members/members.interfaces';

@Injectable()
export class UpdateMemberService {
  private readonly logger = new Logger(UpdateMemberService.name);

  constructor(private readonly membersRepository: MembersRepository) {}

  async update(id: string, dto: UpdateMemberDto): Promise<MemberResponse> {
    this.logger.log(`Updating member with ID: ${id}`);
    const existing = await this.membersRepository.findMemberById(id);

    if (!existing) {
      throw new MemberNotFoundException();
    }

    const updatedMember = await this.membersRepository.updateMember(id, dto);

    return {
      success: true,
      message: MEMBER_MESSAGES.UPDATED_SUCCESS,
      data: updatedMember,
    };
  }

  async remove(id: string): Promise<MemberResponse> {
    this.logger.log(`Deleting member with ID: ${id}`);
    const existing = await this.membersRepository.findMemberById(id);

    if (!existing) {
      throw new MemberNotFoundException();
    }

    await this.membersRepository.deleteMember(id);

    return {
      success: true,
      message: MEMBER_MESSAGES.DELETED_SUCCESS,
      data: null,
    };
  }
}
