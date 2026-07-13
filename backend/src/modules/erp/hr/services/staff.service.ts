import { Injectable, Logger } from '@nestjs/common';
import { HrRepository } from '@/modules/erp/hr/hr.repository';
import { CreateStaffDto } from '@/modules/erp/hr/dto/create-staff.dto';
import { UpdateStaffDto } from '@/modules/erp/hr/dto/update-staff.dto';
import { FindStaffDto } from '@/modules/erp/hr/dto/find-staff.dto';
import {
  StaffNotFoundException,
  DuplicateStaffEmailException,
} from '@/modules/erp/hr/hr.exceptions';
import { HR_MESSAGES } from '@/modules/erp/hr/hr.constants';
import type { HrResponse } from '@/modules/erp/hr/hr.interfaces';

@Injectable()
export class StaffService {
  private readonly logger = new Logger(StaffService.name);

  constructor(private readonly hrRepository: HrRepository) {}

  async create(dto: CreateStaffDto): Promise<HrResponse> {
    this.logger.log(`Attempting to create staff with email: ${dto.email}`);

    const existing = await this.hrRepository.findStaffByEmail(dto.email);
    if (existing) {
      this.logger.warn(
        `Staff creation failed. Email ${dto.email} already exists.`,
      );
      throw new DuplicateStaffEmailException();
    }

    const payload = {
      ...dto,
      joinDate: dto.joinDate ? new Date(dto.joinDate) : new Date(),
      isActive: dto.isActive ?? true,
    };

    const staff = await this.hrRepository.createStaff(payload);

    return {
      success: true,
      message: HR_MESSAGES.STAFF_CREATED_SUCCESS,
      data: staff,
    };
  }

  async findAll(query: FindStaffDto): Promise<HrResponse> {
    this.logger.log(`Fetching staff with limit: ${query.limit}`);
    const limit = query.limit || 50;
    const [staff, total] = await this.hrRepository.findStaff(limit);

    return {
      success: true,
      message: HR_MESSAGES.STAFF_FETCHED_SUCCESS,
      data: { staff, total, page: 1, limit },
    };
  }

  async findOne(id: string): Promise<HrResponse> {
    this.logger.log(`Fetching staff with ID: ${id}`);
    const staff = await this.hrRepository.findStaffById(id);

    if (!staff) {
      throw new StaffNotFoundException();
    }

    return {
      success: true,
      message: HR_MESSAGES.STAFF_FETCHED_SUCCESS,
      data: staff,
    };
  }

  async update(id: string, dto: UpdateStaffDto): Promise<HrResponse> {
    this.logger.log(`Updating staff with ID: ${id}`);
    const existing = await this.hrRepository.findStaffById(id);

    if (!existing) {
      throw new StaffNotFoundException();
    }

    const payload = { ...dto } as any;
    if (dto.joinDate) {
      payload.joinDate = new Date(dto.joinDate);
    }

    const updatedStaff = await this.hrRepository.updateStaff(id, payload);

    return {
      success: true,
      message: HR_MESSAGES.STAFF_UPDATED_SUCCESS,
      data: updatedStaff,
    };
  }

  async remove(id: string): Promise<HrResponse> {
    this.logger.log(`Deactivating staff with ID: ${id}`);
    const existing = await this.hrRepository.findStaffById(id);

    if (!existing) {
      throw new StaffNotFoundException();
    }

    // Soft delete by setting isActive to false
    const deactivatedStaff = await this.hrRepository.updateStaff(id, {
      isActive: false,
    });

    return {
      success: true,
      message: HR_MESSAGES.STAFF_DELETED_SUCCESS,
      data: deactivatedStaff,
    };
  }
}
