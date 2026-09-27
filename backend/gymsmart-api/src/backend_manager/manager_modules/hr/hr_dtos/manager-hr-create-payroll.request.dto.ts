// RESPONSIBILITY: Owns the Manager hr request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import {IsEnum, IsISO8601, IsInt, IsNumber, IsObject, IsOptional, IsString, Matches, Min} from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

import { HrPayrollStatus } from '@/backend_manager/manager_modules/hr/manager-hr.constants';

import type { ManagerHrPayrollDeductions } from '@/backend_manager/manager_modules/hr/hr_types/manager-hr.types';

export class ManagerHrCreatePayrollRequestDto extends CoreRequestDto {
  @Matches(/^[A-Z]{3}$/)
  @ApiProperty()
  currency!: string;


  @IsString()
  @ApiProperty()
  staffId!: string;

  @IsString()
  @ApiProperty()
  month!: string;

  @IsInt()
  @Min(0)
  @ApiProperty()
  amount!: number;

  @IsInt()
  @Min(0)
  @ApiProperty()
  netPayable!: number;

  @IsInt()
  @Min(0)
  @ApiProperty()
  paidAmount!: number;

  @IsInt()
  @Min(0)
  @ApiProperty()
  pendingAmount!: number;

  @IsEnum(HrPayrollStatus)
  @ApiProperty()
  status!: HrPayrollStatus;

  @IsOptional()
  @IsISO8601()
  @ApiPropertyOptional()
  paidAt!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  notes!: string;

  @IsString()
  @ApiProperty()
  deductions!: ManagerHrPayrollDeductions;

  @IsOptional()
  @IsObject()
  @ApiPropertyOptional()
  staff?: { name: string; role: string };
}

export { ManagerHrCreatePayrollRequestDto as HrCreatePayrollRequestDto };
