import { Injectable, Logger } from '@nestjs/common';
import { InquiriesRepository } from '../inquiries.repository';

@Injectable()
export class InquiryStatsService {
  private readonly logger = new Logger(InquiryStatsService.name);

  constructor(private readonly repository: InquiriesRepository) {}

  async execute() {
    this.logger.log(`Fetching inquiry stats`);
    const data = await this.repository.getStats();
    return { success: true, data };
  }
}
