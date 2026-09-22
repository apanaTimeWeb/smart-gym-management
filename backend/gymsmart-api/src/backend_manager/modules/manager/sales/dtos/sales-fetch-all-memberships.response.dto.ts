// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> SalesFetchAllMembershipsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SalesFetchAllMembershipsResponseDto {
  @ApiProperty({ type: [Object] })
  members?: Array<{ name?: string; pendingAmount?: number; phone?: string; plan?: string; status?: string; }>;

}
