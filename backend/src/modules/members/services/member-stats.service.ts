import { Injectable, Logger } from '@nestjs/common';
import { MembersRepository } from '@/modules/members/services/members.repository';
import { MEMBER_MESSAGES } from '@/modules/members/members.constants';
import type { MemberResponse } from '@/modules/members/members.interfaces';

@Injectable()
export class MemberStatsService {
  private readonly logger = new Logger(MemberStatsService.name);

  constructor(private readonly membersRepository: MembersRepository) {}

  async getStats(): Promise<MemberResponse> {
    this.logger.log('Fetching member stats');
    const stats = await this.membersRepository.getStats();

    return {
      message: MEMBER_MESSAGES.STATS_FETCHED_SUCCESS,
      data: stats,
    };
  }
}
