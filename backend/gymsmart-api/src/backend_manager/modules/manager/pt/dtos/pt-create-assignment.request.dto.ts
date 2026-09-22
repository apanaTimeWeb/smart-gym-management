import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/pt/assignments.
// FLOW: HTTP payload -> PtCreateAssignmentRequestDto validation -> write use case -> orchestrator.

import { IsISO8601, IsOptional, IsString } from 'class-validator';

export class PtCreateAssignmentRequestDto extends CoreRequestDto {
  @IsString()
  memberId!: string;

  @IsString()
  trainerId!: string;

  @IsString()
  packageId!: string;

  @IsISO8601()
  startDate!: string;

}
