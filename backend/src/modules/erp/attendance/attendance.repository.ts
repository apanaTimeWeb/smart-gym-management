import { Injectable, Inject } from '@nestjs/common';

import { Repository, DataSource , Between, IsNull, Not } from 'typeorm';
import { Attendance } from '@/modules/erp/attendance/entities/attendance.entity';
import type { MarkAttendanceDto } from '@/modules/erp/attendance/dto/mark-attendance.dto';

@Injectable()
export class AttendanceRepository {
    public readonly attendanceRepository: Repository<Attendance>;

    public readonly attendanceRepo: Repository<Attendance>;

  constructor(
    @Inject('TENANT_CONNECTION') private readonly dataSource: DataSource,
  ) {
    this.attendanceRepo = this.dataSource.getRepository(Attendance);
  }

  async createAttendance(data: MarkAttendanceDto): Promise<Attendance> {
    const attendance = this.attendanceRepo.create(data);
    return this.attendanceRepo.save(attendance);
  }

  async findAllAttendances(query: any): Promise<[Attendance[], number]> {
    const where: any = {};
    if (query.memberId) where.memberId = query.memberId;
    if (query.staffId) where.staffId = query.staffId;

    const page = query.page || 1;
    const limit = query.limit || 50;
    const skip = (page - 1) * limit;

    return this.attendanceRepo.findAndCount({
      where,
      order: { date: 'DESC' },
      relations: ['member', 'staff'],
      select: {
        member: { name: true },
        staff: { name: true },
      },
      take: limit,
      skip,
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
