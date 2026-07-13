import { Injectable, Logger } from '@nestjs/common';
import { MembersRepository } from '@/modules/erp/members/members.repository';
import { FindMemberDto } from '@/modules/erp/members/dto/find-member.dto';
import { MemberNotFoundException } from '@/modules/erp/members/members.exceptions';
import { MEMBER_MESSAGES } from '@/modules/erp/members/members.constants';
import type { MemberResponse } from '@/modules/erp/members/members.interfaces';

@Injectable()
export class FindMemberService {
  private readonly logger = new Logger(FindMemberService.name);

  constructor(private readonly membersRepository: MembersRepository) {}

  async findAll(query: FindMemberDto): Promise<MemberResponse> {
    this.logger.log(`Fetching members with query: ${JSON.stringify(query)}`);
    const limit = query.limit || 50;
    const page = query.page || 1;
    const [members, total] = await this.membersRepository.findMembers(query);

    return {
      success: true,
      message: MEMBER_MESSAGES.FETCHED_SUCCESS,
      data: { members, total, page, limit },
    };
  }

  async findOne(id: string): Promise<MemberResponse> {
    this.logger.log(`Fetching member with ID: ${id}`);
    const member = await this.membersRepository.findMemberById(id);

    if (!member) {
      throw new MemberNotFoundException();
    }

    return {
      success: true,
      message: MEMBER_MESSAGES.FETCHED_SUCCESS,
      data: member,
    };
  }
}
