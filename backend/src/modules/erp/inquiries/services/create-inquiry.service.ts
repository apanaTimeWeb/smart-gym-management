import { Injectable, Logger } from '@nestjs/common';
import { InquiriesRepository } from '../inquiries.repository';
import { CreateInquiryDto } from '../dto/create-inquiry.dto';
import { INQUIRIES_CONSTANTS } from '../inquiries.constants';
import { InquiryResponse } from '../inquiries.interfaces';

@Injectable()
export class CreateInquiryService {
  private readonly logger = new Logger(CreateInquiryService.name);

  constructor(private readonly repository: InquiriesRepository) {}

  async execute(dto: CreateInquiryDto): Promise<InquiryResponse> {
    this.logger.log(`Creating inquiry from: ${dto.name}`);
    const inquiry = this.repository.inquiryRepository.create(dto);
    const data = await this.repository.inquiryRepository.save(inquiry);
    return { success: true, message: INQUIRIES_CONSTANTS.MESSAGES.INQUIRY_CREATED, data };
  }
}
