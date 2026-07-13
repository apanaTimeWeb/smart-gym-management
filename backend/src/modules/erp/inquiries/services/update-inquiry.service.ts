import { Injectable, Logger } from '@nestjs/common';
import { InquiriesRepository } from '../inquiries.repository';
import { UpdateInquiryDto } from '../dto/update-inquiry.dto';
import { InquiryNotFoundException } from '../inquiries.exceptions';
import { INQUIRIES_CONSTANTS } from '../inquiries.constants';
import { InquiryResponse } from '../inquiries.interfaces';

@Injectable()
export class UpdateInquiryService {
  private readonly logger = new Logger(UpdateInquiryService.name);

  constructor(private readonly repository: InquiriesRepository) {}

  async execute(id: number, dto: UpdateInquiryDto): Promise<InquiryResponse> {
    this.logger.log(`Updating inquiry ID: ${id}`);
    const existing = await this.repository.inquiryRepository.findOne({
      where: { id },
    });
    if (!existing) throw new InquiryNotFoundException();

    await this.repository.inquiryRepository.update(id, dto);
    const data = await this.repository.inquiryRepository.findOne({
      where: { id },
    });
    return { success: true, message: INQUIRIES_CONSTANTS.MESSAGES.INQUIRY_UPDATED, data: data as any };
  }

  async remove(id: number): Promise<InquiryResponse> {
    this.logger.log(`Deleting inquiry ID: ${id}`);
    const existing = await this.repository.inquiryRepository.findOne({
      where: { id },
    });
    if (!existing) throw new InquiryNotFoundException();

    await this.repository.inquiryRepository.softDelete(id);
    return { success: true, message: INQUIRIES_CONSTANTS.MESSAGES.INQUIRY_DELETED, data: existing as any };
  }
}
