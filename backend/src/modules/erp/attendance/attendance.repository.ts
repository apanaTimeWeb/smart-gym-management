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
    const page = query.page || 1;
    const limit = query.limit || 50;
    const skip = (page - 1) * limit;

    const qb = this.attendanceRepo
      .createQueryBuilder('attendance')
      .leftJoinAndSelect('attendance.member', 'member')
      .leftJoinAndSelect('attendance.staff', 'staff');

    if (query.memberId) {
      qb.andWhere('attendance.memberId = :memberId', { memberId: query.memberId });
    }
    if (query.staffId) {
      qb.andWhere('attendance.staffId = :staffId', { staffId: query.staffId });
    }
    if (query.type) {
      qb.andWhere('attendance.type = :type', { type: query.type });
    }

    if (query.search) {
      const searchTerm = `%${query.search}%`;
      qb.andWhere('(member.name ILIKE :search OR staff.name ILIKE :search)', { search: searchTerm });
    }

    qb.orderBy('attendance.date', 'DESC');
    qb.skip(skip).take(limit);

    return qb.getManyAndCount();
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
