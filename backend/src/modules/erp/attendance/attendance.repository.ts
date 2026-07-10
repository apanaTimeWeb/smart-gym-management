import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, IsNull, Not } from 'typeorm';
import { Attendance } from '@/modules/erp/attendance/entities/attendance.entity';
import type { MarkAttendanceDto } from '@/modules/erp/attendance/dto/mark-attendance.dto';

@Injectable()
export class AttendanceRepository {
  constructor(
    @InjectRepository(Attendance)
    private readonly attendanceRepo: Repository<Attendance>,
  ) {}

  async createAttendance(data: MarkAttendanceDto): Promise<Attendance> {
    const attendance = this.attendanceRepo.create(data);
    return this.attendanceRepo.save(attendance);
  }

  async findAllAttendances(query: any): Promise<Attendance[]> {
    const where: any = {};
    if (query.memberId) where.memberId = query.memberId;
    if (query.staffId) where.staffId = query.staffId;

    return this.attendanceRepo.find({
      where,
      order: { date: 'DESC' },
      relations: ['member', 'staff'],
      select: {
        member: { name: true },
        staff: { name: true },
      },
    });
  }

  async getStatsForDateRange(startDate: Date, endDate: Date) {
    const [total, members, staff] = await Promise.all([
      this.attendanceRepo.count({
        where: { date: Between(startDate, endDate) },
      }),
      this.attendanceRepo.count({
        where: {
          date: Between(startDate, endDate),
          memberId: Not(IsNull()),
        },
      }),
      this.attendanceRepo.count({
        where: {
          date: Between(startDate, endDate),
          staffId: Not(IsNull()),
        },
      }),
    ]);

    return {
      totalCheckIns: total,
      memberCheckIns: members,
      staffCheckIns: staff,
    };
  }
}
