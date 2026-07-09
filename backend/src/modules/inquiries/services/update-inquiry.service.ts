import { Injectable, Logger } from '@nestjs/common';
import { InquiriesRepository } from '../inquiries.repository';
import { UpdateInquiryDto } from '../dto/update-inquiry.dto';
import { InquiryNotFoundException } from '../inquiries.exceptions';

@Injectable()
export class UpdateInquiryService {
  private readonly logger = new Logger(UpdateInquiryService.name);

  constructor(private readonly repository: InquiriesRepository) {}

  async execute(id: number, dto: UpdateInquiryDto) {
    this.logger.log(`Updating inquiry ID: ${id}`);
    const existing = await this.repository.inquiryRepository.findOne({ where: { id } });
    if (!existing) throw new InquiryNotFoundException();

    await this.repository.inquiryRepository.update(id, dto);
    const data = await this.repository.inquiryRepository.findOne({ where: { id } });
    return { success: true, data };
  }

  async remove(id: number) {
    this.logger.log(`Deleting inquiry ID: ${id}`);
    const existing = await this.repository.inquiryRepository.findOne({ where: { id } });
    if (!existing) throw new InquiryNotFoundException();

    await this.repository.inquiryRepository.delete(id);
    return { success: true, data: existing };
  }
}
