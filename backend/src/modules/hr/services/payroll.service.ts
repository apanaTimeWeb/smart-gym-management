import { Injectable, Logger } from '@nestjs/common';
import { HrRepository } from '@/modules/hr/hr.repository';
import { CreatePayrollDto } from '@/modules/hr/dto/create-payroll.dto';
import { FindPayrollDto } from '@/modules/hr/dto/find-payroll.dto';
import {
  PayrollNotFoundException,
  StaffNotFoundException,
} from '@/modules/hr/hr.exceptions';
import { HR_MESSAGES } from '@/modules/hr/hr.constants';
import type { HrResponse } from '@/modules/hr/hr.interfaces';

@Injectable()
export class PayrollService {
  private readonly logger = new Logger(PayrollService.name);

  constructor(private readonly hrRepository: HrRepository) {}

  async create(dto: CreatePayrollDto): Promise<HrResponse> {
    this.logger.log(`Attempting to create payroll for staffId: ${dto.staffId}`);

    const staff = await this.hrRepository.findStaffById(dto.staffId);
    if (!staff) {
      throw new StaffNotFoundException();
    }

    const payroll = await this.hrRepository.createPayroll(dto);

    return {
      message: HR_MESSAGES.PAYROLL_CREATED_SUCCESS,
      data: payroll,
    };
  }

  async findAll(query: FindPayrollDto): Promise<HrResponse> {
    this.logger.log(`Fetching payrolls with limit: ${query.limit}`);
    const limit = query.limit || 50;
    const [payrolls, total] = await this.hrRepository.findPayrolls(limit);

    return {
      message: HR_MESSAGES.PAYROLL_FETCHED_SUCCESS,
      data: { payrolls, total, page: 1, limit },
    };
  }

  async updateStatus(id: string, status: string): Promise<HrResponse> {
    this.logger.log(`Updating payroll status for ID: ${id} to ${status}`);
    const existing = await this.hrRepository.findPayrollById(id);

    if (!existing) {
      throw new PayrollNotFoundException();
    }

    const payload = {
      status,
      paidAt: status === 'Paid' ? new Date() : null,
    };

    const updatedPayroll = await this.hrRepository.updatePayroll(
      id,
      payload as any,
    );

    return {
      message: HR_MESSAGES.PAYROLL_STATUS_UPDATED_SUCCESS,
      data: updatedPayroll,
    };
  }
}
