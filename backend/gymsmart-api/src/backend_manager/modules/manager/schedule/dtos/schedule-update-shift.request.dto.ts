import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for PATCH /api/v1/manager/schedule/shifts/:id.
// FLOW: HTTP payload -> ScheduleUpdateShiftRequestDto validation -> write use case -> orchestrator.

import { IsOptional, IsString } from 'class-validator';

export class ScheduleUpdateShiftRequestDto extends CoreRequestDto {
  @IsString()
  body!: any;

}
