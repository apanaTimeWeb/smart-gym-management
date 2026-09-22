import { CoreRequestDto } from '@/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local DTO for PATCH /api/v1/manager/hr/staff/:id.
// FLOW: HTTP payload -> validation -> HrUpdateStaffService -> orchestrator -> repository.
import { IsArray, IsBoolean, IsEmail, IsEnum, IsISO8601, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { HrGender, HrStaffRole, PaymentCycle, SalaryType, StaffDocument, StaffEmergencyContact } from '@/modules/manager/hr/hr.constants';

export class HrUpdateStaffRequestDto extends CoreRequestDto {
  @IsString() name!: string;
  @IsEmail() email!: string;
  @IsString() phone!: string;
  @IsEnum(HrStaffRole) role!: HrStaffRole;
  @IsNumber() @Type(() => Number) salary!: number;
  @IsString() branch!: string;
  @IsEnum(HrGender) gender!: HrGender;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() aadhaar?: string;
  @IsOptional() @IsString() upiId?: string;
  @IsOptional() @IsNumber() @Type(() => Number) advanceSalary?: number;
  @IsISO8601() joinDate!: string;
  @IsBoolean() isActive!: boolean;
  @IsOptional() @IsEnum(SalaryType) salaryType?: SalaryType;
  @IsOptional() @IsEnum(PaymentCycle) paymentCycle?: PaymentCycle;
  @IsOptional() @IsNumber() @Type(() => Number) currentDue?: number;
  @IsOptional() @IsString() bankAccountNumber?: string;
  @IsOptional() @IsString() ifscCode?: string;
  @IsOptional() @IsString() panNumber?: string;
  @IsOptional() @IsString() department?: string;
  @IsOptional() @IsEnum(StaffEmergencyContact) emergencyContact?: StaffEmergencyContact;
  @IsOptional() @IsEnum(StaffDocument, { each: true }) @IsArray() documents?: StaffDocument[];
}
