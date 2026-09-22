// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> LibraryFetchDietPlansResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LibraryFetchDietPlansResponseDto {
  @ApiProperty({ type: [Object] })
  dietPlans?: Array<{ calories?: string; carbs?: string; fats?: string; goal?: string; isActive?: number; meals?: Array<string>; name?: string; protein?: string; }>;

}
