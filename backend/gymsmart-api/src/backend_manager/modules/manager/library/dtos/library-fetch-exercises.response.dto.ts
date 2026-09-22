// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> LibraryFetchExercisesResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LibraryFetchExercisesResponseDto {
  @ApiProperty({ type: [Object] })
  exercises?: Array<{ category: string; difficulty: string; isActive: number; muscleGroup: string; name: string; }>;

}
