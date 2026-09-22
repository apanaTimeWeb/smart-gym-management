import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/plans/change-requests.
// FLOW: HTTP payload -> PlansCreateChangeRequestRequestDto validation -> write use case -> orchestrator.

import { IsOptional, IsString } from 'class-validator';

export class PlansCreateChangeRequestRequestDto extends CoreRequestDto {
  @IsString()
  planId!: string;

  @IsString()
  note!: string;

}
