import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class HrService {
  constructor(private prisma: PrismaService) {}

  findAllStaff(query: any) {
    return this.prisma.staff.findMany({ where: { isActive: true } });
  }
  createStaff(dto: any) {
    return this.prisma.staff.create({ data: dto });
  }
  findOneStaff(id: number) {
    return this.prisma.staff.findUnique({ where: { id } });
  }
  updateStaff(id: number, dto: any) {
    return this.prisma.staff.update({ where: { id }, data: dto });
  }
  removeStaff(id: number) {
    return this.prisma.staff.update({
      where: { id },
      data: { isActive: false },
    });
  }

  findAllPayrolls(query: any) {
    return this.prisma.payroll.findMany({ include: { staff: true } });
  }
  createPayroll(dto: any) {
    return this.prisma.payroll.create({ data: dto });
  }
  updatePayrollStatus(id: number, status: string) {
    return this.prisma.payroll.update({
      where: { id },
      data: { status, paidAt: status === 'Paid' ? new Date() : null },
    });
  }

  async getHrSummary() {
    const totalStaff = await this.prisma.staff.count();
    const activeStaff = await this.prisma.staff.count({
      where: { isActive: true },
    });

    // Dynamic Payroll Data for the current month
    const now = new Date();
    const currentMonth = now.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    }); // e.g. "July 2026"
    // Wait, let's just query everything if month format differs, or just aggregate over all to be safe?
    // Since payroll might be recorded by month string or date, let's do all-time or just basic for now if month format is unknown.
    // The previous mocked data was: totalPayrollThisMonth: 150000, paidCount: 3, pendingCount: 2

    const payrolls = await this.prisma.payroll.findMany();

    let totalPayrollThisMonth = 0;
    let paidCount = 0;
    let pendingCount = 0;

    payrolls.forEach((p) => {
      if (p.status === 'Paid') {
        paidCount++;
        totalPayrollThisMonth += p.amount;
      } else {
        pendingCount++;
      }
    });

    return {
      totalStaff,
      activeStaff,
      totalPayrollThisMonth,
      paidCount,
      pendingCount,
    };
  }
}
