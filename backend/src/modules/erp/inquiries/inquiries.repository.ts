import { Injectable, Inject } from '@nestjs/common';

import { Repository, DataSource  } from 'typeorm';
import { Inquiry } from '@/modules/erp/inquiries/entities/inquiry.entity';
import { PaginationQueryDto } from '@/core/dto/pagination-query.dto';
import { INQUIRIES_CONSTANTS } from './inquiries.constants';

@Injectable()
export class InquiriesRepository {


    public readonly inquiryRepository: Repository<Inquiry>;

  constructor(
    @Inject('TENANT_CONNECTION') private readonly dataSource: DataSource,
  ) {
    this.inquiryRepository = this.dataSource.getRepository(Inquiry);
  }

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
      this.inquiryRepository.count({
        where: { status: INQUIRIES_CONSTANTS.STATUS.NEW as any },
      }),
      this.inquiryRepository.count({
        where: { status: INQUIRIES_CONSTANTS.STATUS.FOLLOW_UP as any },
      }),
      this.inquiryRepository.count({
        where: { status: INQUIRIES_CONSTANTS.STATUS.CONVERTED as any },
      }),
      this.inquiryRepository.count({
        where: { status: INQUIRIES_CONSTANTS.STATUS.LOST as any },
      }),
    ]);
    return { total, new: new_count, followUp, converted, lost };
  }
}
