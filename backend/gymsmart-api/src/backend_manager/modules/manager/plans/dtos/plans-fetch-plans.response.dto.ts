// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> PlansFetchPlansResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PlansFetchPlansResponseDto {
  @ApiProperty({ type: [Object] })
  plans?: Array<{ duration: number; isActive: number; name: string; price: number; }>;

}
