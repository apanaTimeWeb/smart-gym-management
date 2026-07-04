import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  markAttendance(dto: any) {
    return this.prisma.attendance.create({ data: dto });
  }
  findAll(query: any) {
    return this.prisma.attendance.findMany({ orderBy: { date: 'desc' } });
  }
  async getTodayStats() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const totalCheckIns = await this.prisma.attendance.count({
      where: { date: { gte: today, lt: tomorrow } },
    });

    const memberCheckIns = await this.prisma.attendance.count({
      where: { date: { gte: today, lt: tomorrow }, memberId: { not: null } },
    });

    const staffCheckIns = await this.prisma.attendance.count({
      where: { date: { gte: today, lt: tomorrow }, staffId: { not: null } },
    });

    return { totalCheckIns, memberCheckIns, staffCheckIns };
  }
}
