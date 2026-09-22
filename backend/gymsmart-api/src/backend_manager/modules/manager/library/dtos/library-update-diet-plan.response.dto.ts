// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> LibraryUpdateDietPlanResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LibraryUpdateDietPlanResponseDto {
  @ApiProperty()
  goal!: string;

  @ApiProperty()
  id!: string;

  @ApiProperty({ type: Boolean })
  isActive!: boolean;

  @ApiProperty()
  name!: string;

}
