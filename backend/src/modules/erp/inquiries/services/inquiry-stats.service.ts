import { Injectable, Logger } from '@nestjs/common';
import { InquiriesRepository } from '../inquiries.repository';
import { INQUIRIES_CONSTANTS } from '../inquiries.constants';
import { InquiryStatsResponse } from '../inquiries.interfaces';

@Injectable()
export class InquiryStatsService {
  private readonly logger = new Logger(InquiryStatsService.name);

  constructor(private readonly repository: InquiriesRepository) {}

  async execute(): Promise<InquiryStatsResponse> {
    this.logger.log(`Fetching inquiry stats`);
    const data = await this.repository.getStats();
    return { success: true, message: INQUIRIES_CONSTANTS.MESSAGES.STATS_FETCHED, data: data as any };
  }
}
