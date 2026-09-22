// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> StoreCreateOrderResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StoreCreateOrderResponseDto {
  @ApiProperty({ type: [Object] })
  orders?: Array<{ createdAt?: string; id?: string; items?: Array<string>; method?: string; status?: string; total?: number; }>;

}
