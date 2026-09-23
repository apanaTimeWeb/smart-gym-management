// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsEnum, IsISO8601, IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

import { HrGender, HrStaffRole, PaymentCycle, SalaryType } from '@/backend_manager/modules/backend_manager/hr/hr.constants';import { HrUpdateStaffHrStaffEmergencyContactDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-update-staff-hr-staff-emergency-contact.dto';
import { HrUpdateStaffHrStaffDocumentDto } from '@/backend_manager/modules/backend_manager/hr/dtos/hr-update-staff-hr-staff-document.dto';

export class HrUpdateStaffRequestDto extends CoreRequestDto {
  @IsOptional() @IsString() name?: string;
  @IsOptional() @IsEmail() email?: string;
  @IsOptional() @IsString() phone?: string;
  @IsOptional() @IsEnum(HrStaffRole) role?: HrStaffRole;
  @IsOptional() @IsNumber() @Type(() => Number) salary?: number;
  @IsOptional() @IsString() branch?: string;
  @IsOptional() @IsEnum(HrGender) gender?: HrGender;
  @IsOptional() @IsString() address?: string;
  @IsOptional() @IsString() aadhaar?: string;
  @IsOptional() @IsString() upiId?: string;
  @IsOptional() @IsNumber() @Type(() => Number) advanceSalary?: number;
  @IsOptional() @IsISO8601() joinDate?: string;
  @IsOptional() @IsBoolean() isActive?: boolean;
  @IsOptional() @IsEnum(SalaryType) salaryType?: SalaryType;
  @IsOptional() @IsEnum(PaymentCycle) paymentCycle?: PaymentCycle;
  @IsOptional() @IsNumber() @Type(() => Number) currentDue?: number;
  @IsOptional() @IsString() bankAccountNumber?: string;
  @IsOptional() @IsString() ifscCode?: string;
  @IsOptional() @IsString() panNumber?: string;
  @IsOptional() @IsString() department?: string;
  @IsOptional() @ValidateNested() @Type(() => HrUpdateStaffHrStaffEmergencyContactDto) emergencyContact?: HrUpdateStaffHrStaffEmergencyContactDto;
  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => HrUpdateStaffHrStaffDocumentDto) documents?: HrUpdateStaffHrStaffDocumentDto[];
}
