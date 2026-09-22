// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> WorkoutCreateExerciseResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class WorkoutCreateExerciseResponseDto {
  @ApiProperty({ type: [Object] })
  exercises?: Array<{ category: string; difficulty: string; equipment: string; muscleGroup?: Array<string>; name: string; }>;

}
