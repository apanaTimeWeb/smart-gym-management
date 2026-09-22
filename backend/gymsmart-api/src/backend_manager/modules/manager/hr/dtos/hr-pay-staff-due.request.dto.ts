import { CoreRequestDto } from '@/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/hr/ledger/paydue.
// FLOW: HTTP payload -> HrPayStaffDueRequestDto validation -> write use case -> orchestrator.

import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class HrPayStaffDueRequestDto extends CoreRequestDto {
  @IsString()
  staffId!: string;

  @IsNumber()
  @Type(() => Number)
  amount!: number;

  @IsString()
  paymentMode!: string;

  @IsOptional()
  @IsString()
  notes?: string;

}
