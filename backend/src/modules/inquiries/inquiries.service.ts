import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inquiry } from './entities/inquiry.entity';

@Injectable()
export class InquiriesService {
  constructor(
    @InjectRepository(Inquiry)
    private readonly inquiryRepository: Repository<Inquiry>,
  ) {}

  async findAll(query: any) {
    const limit = query.limit ? parseInt(query.limit) : 200;
    const inquiries = await this.inquiryRepository.find({
      order: { id: 'DESC' },
      take: limit,
    });
    return { success: true, data: { inquiries, total: inquiries.length } };
  }

  async create(dto: any) {
    const inquiry = this.inquiryRepository.create(dto);
    const data = await this.inquiryRepository.save(inquiry);
    return { success: true, data };
  }

  async findOne(id: number) {
    const data = await this.inquiryRepository.findOne({ where: { id } });
    return { success: true, data };
  }

  async update(id: number, dto: any) {
    await this.inquiryRepository.update(id, dto);
    const data = await this.inquiryRepository.findOne({ where: { id } });
    return { success: true, data };
  }

  async remove(id: number) {
    const data = await this.inquiryRepository.findOne({ where: { id } });
    if (data) {
      await this.inquiryRepository.delete(id);
    }
    return { success: true, data };
  }

  async getStats() {
    const [total, new_count, followUp, converted, lost] = await Promise.all([
      this.inquiryRepository.count(),
      this.inquiryRepository.count({ where: { status: 'NEW' as any } }),
      this.inquiryRepository.count({ where: { status: 'FOLLOW_UP' as any } }),
      this.inquiryRepository.count({ where: { status: 'CONVERTED' as any } }),
      this.inquiryRepository.count({ where: { status: 'LOST' as any } }),
    ]);
    return { success: true, data: { total, new: new_count, followUp, converted, lost } };
  }
}
