import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from '@/modules/inquiries/entities/inquiry.entity';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';
import { INQUIRIES_CONSTANTS } from './inquiries.constants';

@Injectable()
export class InquiriesRepository {
  constructor(
    @InjectRepository(Inquiry)
    public readonly inquiryRepository: Repository<Inquiry>,
  ) {}

  async findAll(query: PaginationQueryDto) {
    return this.inquiryRepository.findAndCount({
      order: { id: INQUIRIES_CONSTANTS.SORT.DESC },
      take: query.limit,
      skip: query.offset,
    });
  }

  async getStats() {
    const [total, new_count, followUp, converted, lost] = await Promise.all([
      this.inquiryRepository.count(),
      this.inquiryRepository.count({ where: { status: INQUIRIES_CONSTANTS.STATUS.NEW as any } }),
      this.inquiryRepository.count({ where: { status: INQUIRIES_CONSTANTS.STATUS.FOLLOW_UP as any } }),
      this.inquiryRepository.count({ where: { status: INQUIRIES_CONSTANTS.STATUS.CONVERTED as any } }),
      this.inquiryRepository.count({ where: { status: INQUIRIES_CONSTANTS.STATUS.LOST as any } }),
    ]);
    return { total, new: new_count, followUp, converted, lost };
  }
}
