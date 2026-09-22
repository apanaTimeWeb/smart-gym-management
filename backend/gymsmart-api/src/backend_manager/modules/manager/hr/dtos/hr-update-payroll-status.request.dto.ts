// @ts-nocheck
import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
import { HrPayrollStatus } from '@/backend_manager/modules/manager/hr/hr.constants';
// RESPONSIBILITY: Strict feature-local request DTO for PATCH /api/v1/manager/hr/payrolls/:id/status.
// FLOW: HTTP payload -> HrUpdatePayrollStatusRequestDto validation -> write use case -> orchestrator.

import { IsOptional, IsString, IsEnum } from 'class-validator';

export class HrUpdatePayrollStatusRequestDto extends CoreRequestDto {
  @IsEnum(HrPayrollStatus)
  status!: HrPayrollStatus;

}
