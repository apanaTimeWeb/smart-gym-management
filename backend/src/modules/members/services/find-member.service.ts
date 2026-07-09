import { Injectable, Logger } from '@nestjs/common';
import { MembersRepository } from '@/modules/members/members.repository';
import { FindMemberDto } from '@/modules/members/dto/find-member.dto';
import { MemberNotFoundException } from '@/modules/members/members.exceptions';
import { MEMBER_MESSAGES } from '@/modules/members/members.constants';
import type { MemberResponse } from '@/modules/members/members.interfaces';

@Injectable()
export class FindMemberService {
  private readonly logger = new Logger(FindMemberService.name);

  constructor(private readonly membersRepository: MembersRepository) {}

  async findAll(query: FindMemberDto): Promise<MemberResponse> {
    this.logger.log(`Fetching members with limit: ${query.limit}`);
    const limit = query.limit || 50;
    const [members, total] = await this.membersRepository.findMembers(limit);

    return {
      message: MEMBER_MESSAGES.FETCHED_SUCCESS,
      data: { members, total, page: 1, limit },
    };
  }

  async findOne(id: string): Promise<MemberResponse> {
    this.logger.log(`Fetching member with ID: ${id}`);
    const member = await this.membersRepository.findMemberById(id);
    
    if (!member) {
      throw new MemberNotFoundException();
    }

    return {
      message: MEMBER_MESSAGES.FETCHED_SUCCESS,
      data: member,
    };
  }
}
