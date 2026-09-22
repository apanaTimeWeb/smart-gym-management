import { CoreRequestDto } from '@/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/hr/payrolls/generate.
// FLOW: HTTP payload -> HrGeneratePayrollsRequestDto validation -> write use case -> orchestrator.

import { IsOptional, IsString } from 'class-validator';

export class HrGeneratePayrollsRequestDto extends CoreRequestDto {
  @IsString()
  month!: string;

}
