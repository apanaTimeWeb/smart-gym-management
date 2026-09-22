import { CoreRequestDto } from '@/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for POST /manager/grievance/:id/resolve.
// FLOW: HTTP payload -> GrievanceManagerGrievanceApiResolveGrievanceTicketRequestDto validation -> write use case -> orchestrator.

import { IsOptional, IsString } from 'class-validator';

export class GrievanceManagerGrievanceApiResolveGrievanceTicketRequestDto extends CoreRequestDto {
  @IsString()
  resolutionNote!: string;

}
