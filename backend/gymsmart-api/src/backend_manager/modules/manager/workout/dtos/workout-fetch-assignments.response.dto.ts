// @ts-nocheck
// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> WorkoutFetchAssignmentsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WorkoutFetchAssignmentsResponseDto {
  @ApiProperty()
  assignedBy!: string;

  @ApiProperty({ type: [Object] })
  data: Array<{assignedBy?: string; memberName: string; planName: string; startDate: string;}>;

  @ApiProperty()
  id!: string;

  @ApiProperty()
  memberName!: string;

  @ApiProperty()
  planName!: string;

  @ApiProperty()
  startDate!: string;

}
