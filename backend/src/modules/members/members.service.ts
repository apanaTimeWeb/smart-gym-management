import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: any) {
    const cycleMonths = {
      ONE_MONTH: 1,
      THREE_MONTHS: 3,
      SIX_MONTHS: 6,
      TWELVE_MONTHS: 12,
    };
    const joinDate = dto.joinDate ? new Date(dto.joinDate) : new Date();
    const expiryDate = new Date(joinDate);
    expiryDate.setMonth(
      expiryDate.getMonth() + (cycleMonths[dto.billingCycle] || 1),
    );

    const member = await this.prisma.member.create({
      data: {
        ...dto,
        joinDate,
        expiryDate,
        status: 'ACTIVE',
        paidAmount: 0,
        pendingAmount: 0,
      },
    });
    return member;
  }

  async findAll(query: any) {
    const limit = query.limit ? parseInt(query.limit) : 50;
    const members = await this.prisma.member.findMany({
      include: { plan: true },
      take: limit,
      orderBy: { id: 'desc' },
    });
    return { members, total: members.length };
  }

  async findOne(id: number) {
    return this.prisma.member.findUnique({
      where: { id },
      include: { plan: true, payments: true },
    });
  }

  async update(id: number, dto: any) {
    return this.prisma.member.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    return this.prisma.member.delete({ where: { id } });
  }

  async renewMembership(id: number, dto: any) {
    // Basic implementation
    return this.prisma.member.update({
      where: { id },
      data: { status: 'ACTIVE' },
    });
  }

  async getStats() {
    const total = await this.prisma.member.count();
    const active = await this.prisma.member.count({
      where: { status: 'ACTIVE' },
    });
    const pending = await this.prisma.member.count({
      where: { status: 'PENDING' },
    });
    const expired = await this.prisma.member.count({
      where: { status: 'EXPIRED' },
    });
    return { total, active, pending, expired };
  }
}
