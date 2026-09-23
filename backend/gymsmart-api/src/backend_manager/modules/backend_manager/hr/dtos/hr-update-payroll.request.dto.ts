// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import { IsISO8601, IsNumber, IsObject, IsOptional, IsString, IsEnum } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

import { HrPayrollStatus } from '@/backend_manager/modules/backend_manager/hr/hr.constants';

import type { HrPayrollDeductions } from '@/backend_manager/modules/backend_manager/hr/hr.interfaces';

export class HrUpdatePayrollRequestDto extends CoreRequestDto {
  @IsString()
  staffId!: string;

  @IsString()
  month!: string;

  @IsNumber()
  @Type(() => Number)
  amount!: number;

  @IsNumber()
  @Type(() => Number)
  netPayable!: number;

  @IsNumber()
  @Type(() => Number)
  paidAmount!: number;

  @IsNumber()
  @Type(() => Number)
  pendingAmount!: number;

  @IsEnum(HrPayrollStatus)
  status!: HrPayrollStatus;

  @IsOptional()
  @IsISO8601()
  paidAt!: string;

  @IsOptional()
  @IsString()
  notes!: string;

  @IsString()
  deductions!: HrPayrollDeductions;

  @IsOptional()
  @IsObject()
  staff?: { name: string; role: string };
}
