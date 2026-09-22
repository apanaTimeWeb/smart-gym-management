// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> WorkoutFetchWorkoutsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WorkoutFetchWorkoutsResponseDto {
  @ApiProperty({ type: [Object] })
  workouts?: Array<{ days?: number; duration?: number; exercises?: string; focus?: string; level?: string; name?: string; tags?: Array<string>; }>;

}
