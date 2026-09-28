// RESPONSIBILITY: Owns the Manager hr request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import {IsArray, IsBoolean, IsEmail, IsEnum, IsISO8601, IsInt, IsNumber, IsOptional, IsString, Matches, Min, ValidateNested} from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

import { HrGender, HrStaffRole, PaymentCycle, SalaryType } from '@/backend_manager/manager_modules/hr/manager-hr.constants';import { HrUpdateStaffHrStaffEmergencyContactDto } from '@/backend_manager/manager_modules/hr/hr_dtos/manager-hr-update-staff-hr-staff-emergency-contact.dto';
import { HrUpdateStaffHrStaffDocumentDto } from '@/backend_manager/manager_modules/hr/hr_dtos/manager-hr-update-staff-hr-staff-document.dto';

export class ManagerHrUpdateStaffRequestDto extends CoreRequestDto {
  @Matches(/^[A-Z]{3}$/)
  @ApiProperty()
  currency!: string;


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

export { ManagerHrUpdateStaffRequestDto as HrUpdateStaffRequestDto };
