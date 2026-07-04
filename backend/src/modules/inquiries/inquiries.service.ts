import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class InquiriesService {
  constructor(private prisma: PrismaService) {}

  findAll(query: any) {
    return this.prisma.inquiry
      .findMany({ orderBy: { id: 'desc' } })
      .then((inquiries) => ({ inquiries, total: inquiries.length }));
  }
  create(dto: any) {
    return this.prisma.inquiry.create({ data: dto });
  }
  findOne(id: number) {
    return this.prisma.inquiry.findUnique({ where: { id } });
  }
  update(id: number, dto: any) {
    return this.prisma.inquiry.update({ where: { id }, data: dto });
  }
  remove(id: number) {
    return this.prisma.inquiry.delete({ where: { id } });
  }

  async getStats() {
    const total = await this.prisma.inquiry.count();
    const new_count = await this.prisma.inquiry.count({
      where: { status: 'NEW' },
    });
    const followUp = await this.prisma.inquiry.count({
      where: { status: 'FOLLOW_UP' },
    });
    const converted = await this.prisma.inquiry.count({
      where: { status: 'CONVERTED' },
    });
    const lost = await this.prisma.inquiry.count({ where: { status: 'LOST' } });
    return { total, new: new_count, followUp, converted, lost };
  }
}
