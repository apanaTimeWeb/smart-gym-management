// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> PlansCreatePlanResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class PlansCreatePlanResponseDto {
  @ApiProperty({ type: [Object] })
  plans?: Array<{ duration: number; isActive: number; name: string; price: number; }>;

}
