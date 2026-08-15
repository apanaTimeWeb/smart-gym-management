import { Injectable, Inject } from '@nestjs/common';

import { Repository, DataSource  } from 'typeorm';
import { Staff } from '@/modules/erp/hr/entities/staff.entity';
import { Payroll } from '@/modules/erp/hr/entities/payroll.entity';

@Injectable()
export class HrRepository {
    public readonly staffRepository: Repository<Staff>;
  public readonly payrollRepository: Repository<Payroll>;

    public readonly staffRepo: Repository<Staff>;
  public readonly payrollRepo: Repository<Payroll>;

  constructor(
    @Inject('TENANT_CONNECTION') private readonly dataSource: DataSource,
  ) {
    this.staffRepo = this.dataSource.getRepository(Staff);
    this.payrollRepo = this.dataSource.getRepository(Payroll);
  }

  // --- STAFF ---
  async createStaff(data: Partial<Staff>): Promise<Staff> {
    const staff = this.staffRepo.create(
      data as import('typeorm').DeepPartial<Staff>,
    );
    return this.staffRepo.save(staff);
  }

  async findStaff(limit: number, page: number = 1, search?: string): Promise<[Staff[], number]> {
    const query = this.staffRepo.createQueryBuilder('staff')
      .where('staff.isActive = :isActive', { isActive: true });
    
    if (search) {
      query.andWhere(
        '(staff.name ILIKE :search OR staff.email ILIKE :search OR staff.role ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    return query
      .take(limit)
      .skip((page - 1) * limit)
      .orderBy('staff.id', 'DESC')
      .getManyAndCount();
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

  async findPayrolls(limit: number, page: number = 1, search?: string): Promise<[Payroll[], number]> {
    const query = this.payrollRepo.createQueryBuilder('payroll')
      .leftJoinAndSelect('payroll.staff', 'staff');
      
    if (search) {
      query.andWhere(
        '(staff.name ILIKE :search OR staff.email ILIKE :search OR payroll.status ILIKE :search)',
        { search: `%${search}%` }
      );
    }

    return query
      .take(limit)
      .skip((page - 1) * limit)
      .orderBy('payroll.id', 'DESC')
      .getManyAndCount();
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
