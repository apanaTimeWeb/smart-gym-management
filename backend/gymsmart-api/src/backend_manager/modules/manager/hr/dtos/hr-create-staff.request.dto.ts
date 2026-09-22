// @ts-nocheck
import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/hr/staff.
// FLOW: HTTP payload -> HrCreateStaffRequestDto validation -> write use case -> orchestrator.

import { IsArray, IsBoolean, IsEmail, IsEnum, IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { SalaryType } from '@/backend_manager/modules/manager/hr/hr.constants';
import { PaymentCycle } from '@/backend_manager/modules/manager/hr/hr.constants';

export class HrCreateStaffRequestDto extends CoreRequestDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;

  @IsString()
  role!: HrStaffRole;

  @IsNumber()
  @Type(() => Number)
  salary!: number;

  @IsString()
  branch!: string;

  @IsString()
  gender!: HrGender;

  @IsOptional()
  @IsString()
  address!: string;

  @IsOptional()
  @IsString()
  aadhaar!: string;

  @IsOptional()
  @IsString()
  upiId!: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  advanceSalary!: number;

  @IsISO8601()
  joinDate!: string;

  @IsBoolean()
  isActive!: boolean;

  @IsOptional()
  @IsEnum(SalaryType)
  salaryType!: SalaryType;

  @IsOptional()
  @IsEnum(PaymentCycle)
  paymentCycle!: PaymentCycle;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  currentDue!: number;

  @IsOptional()
  @IsString()
  bankAccountNumber!: string;

  @IsOptional()
  @IsString()
  ifscCode!: string;

  @IsOptional()
  @IsString()
  panNumber!: string;

  @IsOptional()
  @IsString()
  department!: string;

  @IsOptional()
  @IsString()
  emergencyContact!: StaffEmergencyContact;

  @IsOptional()
  @IsArray()
  documents!: StaffDocument[];

}
