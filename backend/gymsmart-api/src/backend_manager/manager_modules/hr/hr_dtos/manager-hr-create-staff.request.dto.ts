// RESPONSIBILITY: Owns the Manager hr request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import {IsArray, IsBoolean, IsEmail, IsEnum, IsISO8601, IsInt, IsNumber, IsOptional, IsString, Matches, Min} from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

import { HrGender, HrStaffRole, PaymentCycle, SalaryType, StaffDocument, StaffEmergencyContact } from '@/backend_manager/manager_modules/hr/manager-hr.constants';

export class ManagerHrCreateStaffRequestDto extends CoreRequestDto {
  @Matches(/^[A-Z]{3}$/)
  @ApiProperty()
  currency!: string;


  @IsString()
  @ApiProperty()
  name!: string;

  @IsEmail()
  @ApiProperty()
  email!: string;

  @IsString()
  @ApiProperty()
  phone!: string;

  @IsEnum(HrStaffRole)
  @ApiProperty()
  role!: HrStaffRole;

  @IsInt()
  @Min(0)
  @ApiProperty()
  salary!: number;

  @IsString()
  @ApiProperty()
  branch!: string;

  @IsEnum(HrGender)
  @ApiProperty()
  gender!: HrGender;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  address!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  aadhaar!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  upiId!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional()
  advanceSalary!: number;

  @IsISO8601()
  @ApiProperty()
  joinDate!: string;

  @IsBoolean()
  @ApiProperty()
  isActive!: boolean;

  @IsOptional()
  @IsEnum(SalaryType)
  @ApiPropertyOptional()
  salaryType!: SalaryType;

  @IsOptional()
  @IsEnum(PaymentCycle)
  @ApiPropertyOptional()
  paymentCycle!: PaymentCycle;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional()
  currentDue!: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  bankAccountNumber!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  ifscCode!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  panNumber!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  department!: string;

  @IsOptional()
  @IsEnum(StaffEmergencyContact)
  @ApiPropertyOptional()
  emergencyContact!: StaffEmergencyContact;

  @IsOptional()
  @IsArray()
  @IsEnum(StaffDocument, { each: true })
  @ApiPropertyOptional()
  documents!: StaffDocument[];

}

export { ManagerHrCreateStaffRequestDto as HrCreateStaffRequestDto };
