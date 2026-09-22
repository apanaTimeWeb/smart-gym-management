// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> WorkoutCreateWorkoutResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WorkoutCreateWorkoutResponseDto {
  @ApiProperty({ type: [Object] })
  workouts?: Array<{ days: number; duration: number; exercises: string; focus: string; level: string; name: string; tags?: Array<string>; }>;

}
