import { Injectable, Logger } from '@nestjs/common';
import { MembersRepository } from '@/modules/erp/members/members.repository';
import { MEMBER_MESSAGES } from '@/modules/erp/members/members.constants';
import type { MemberResponse } from '@/modules/erp/members/members.interfaces';

@Injectable()
export class MemberStatsService {
  private readonly logger = new Logger(MemberStatsService.name);

  constructor(private readonly membersRepository: MembersRepository) {}

  async getStats(): Promise<MemberResponse> {
    this.logger.log('Fetching member stats');
    const stats = await this.membersRepository.getStats();

    return {
      success: true,
      message: MEMBER_MESSAGES.STATS_FETCHED_SUCCESS,
      data: stats,
    };
  }
}
