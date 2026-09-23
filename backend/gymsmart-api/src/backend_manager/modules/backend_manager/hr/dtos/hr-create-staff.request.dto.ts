// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsEnum, IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

import { HrGender, HrStaffRole, PaymentCycle, SalaryType, StaffDocument, StaffEmergencyContact } from '@/backend_manager/modules/backend_manager/hr/hr.constants';

export class HrCreateStaffRequestDto extends CoreRequestDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;

  @IsEnum(HrStaffRole)
  role!: HrStaffRole;

  @IsNumber()
  @Type(() => Number)
  salary!: number;

  @IsString()
  branch!: string;

  @IsEnum(HrGender)
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
  @IsEnum(StaffEmergencyContact)
  emergencyContact!: StaffEmergencyContact;

  @IsOptional()
  @IsArray()
  @IsEnum(StaffDocument, { each: true })
  documents!: StaffDocument[];

}
