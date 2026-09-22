// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> WorkoutUpdateWorkoutResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WorkoutUpdateWorkoutResponseDto {
  @ApiProperty()
  duration: string;

  @ApiProperty({ type: Number })
  exercises: number;

  @ApiProperty()
  focus: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  level: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  tags: string[];

}
