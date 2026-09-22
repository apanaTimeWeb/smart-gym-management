// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> LibraryCreateExerciseResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LibraryCreateExerciseResponseDto {
  @ApiProperty({ type: [Object] })
  exercises?: Array<{ category: string; difficulty: string; isActive: number; muscleGroup: string; name: string; }>;

}
