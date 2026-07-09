import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from '@/modules/hr/entities/staff.entity';
import { Payroll } from '@/modules/hr/entities/payroll.entity';

@Injectable()
export class HrRepository {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepo: Repository<Staff>,
    @InjectRepository(Payroll)
    private readonly payrollRepo: Repository<Payroll>,
  ) {}

  // --- STAFF ---
  async createStaff(data: Partial<Staff>): Promise<Staff> {
    const staff = this.staffRepo.create(
      data as import('typeorm').DeepPartial<Staff>,
    );
    return this.staffRepo.save(staff);
  }

  async findStaff(limit: number): Promise<[Staff[], number]> {
    return this.staffRepo.findAndCount({
      where: { isActive: true },
      take: limit,
      order: { id: 'DESC' },
    });
  }

  async findStaffById(id: string): Promise<Staff | null> {
    return this.staffRepo.findOne({ where: { id } });
  }

  async findStaffByEmail(email: string): Promise<Staff | null> {
    return this.staffRepo.findOne({ where: { email } });
  }

  async updateStaff(id: string, data: Partial<Staff>): Promise<Staff> {
    await this.staffRepo.update(id, data);
    return this.findStaffById(id) as Promise<Staff>;
  }

  async countTotalStaff(): Promise<number> {
    return this.staffRepo.count();
  }

  async countActiveStaff(): Promise<number> {
    return this.staffRepo.count({ where: { isActive: true } });
  }

  // --- PAYROLL ---
  async createPayroll(data: Partial<Payroll>): Promise<Payroll> {
    const payroll = this.payrollRepo.create(
      data as import('typeorm').DeepPartial<Payroll>,
    );
    return this.payrollRepo.save(payroll);
  }

  async findPayrolls(limit: number): Promise<[Payroll[], number]> {
    return this.payrollRepo.findAndCount({
      take: limit,
      order: { id: 'DESC' },
      relations: ['staff'],
    });
  }

  async findPayrollById(id: string): Promise<Payroll | null> {
    return this.payrollRepo.findOne({ where: { id } });
  }

  async updatePayroll(id: string, data: Partial<Payroll>): Promise<Payroll> {
    await this.payrollRepo.update(id, data);
    return this.findPayrollById(id) as Promise<Payroll>;
  }

  async findAllPayrollsForAggregation(): Promise<Payroll[]> {
    return this.payrollRepo.find();
  }
}
