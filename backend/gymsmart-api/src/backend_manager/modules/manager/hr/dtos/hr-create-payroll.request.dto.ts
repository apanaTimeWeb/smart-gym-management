// @ts-nocheck
import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
import { HrPayrollStatus } from '@/backend_manager/modules/manager/hr/hr.constants';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/hr/payrolls.
// FLOW: HTTP payload -> HrCreatePayrollRequestDto validation -> write use case -> orchestrator.

import { IsISO8601, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class HrCreatePayrollRequestDto extends CoreRequestDto {
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
  deductions!: PayrollDeductions;

  @IsOptional()
  @IsObject()
  staff?: { name: string; role: string };

}
