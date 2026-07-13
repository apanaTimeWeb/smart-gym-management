import { Injectable, Logger } from '@nestjs/common';
import { InquiriesRepository } from '../inquiries.repository';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';
import { InquiryNotFoundException } from '../inquiries.exceptions';
import { INQUIRIES_CONSTANTS } from '../inquiries.constants';
import { InquiriesListResponse, InquiryResponse } from '../inquiries.interfaces';

@Injectable()
export class FindInquiryService {
  private readonly logger = new Logger(FindInquiryService.name);

  constructor(private readonly repository: InquiriesRepository) {}

  async execute(query: PaginationQueryDto): Promise<InquiriesListResponse> {
    this.logger.log(`Fetching inquiries`);
    const [inquiries, total] = await this.repository.findAll(query);
    return { success: true, message: INQUIRIES_CONSTANTS.MESSAGES.INQUIRIES_FETCHED, data: { inquiries, total } };
  }

  async findOne(id: number): Promise<InquiryResponse> {
    this.logger.log(`Fetching inquiry ID: ${id}`);
    const data = await this.repository.inquiryRepository.findOne({
      where: { id },
    });
    if (!data) throw new InquiryNotFoundException();
    return { success: true, message: INQUIRIES_CONSTANTS.MESSAGES.INQUIRY_FETCHED, data };
  }
}
