// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> StoreDeleteProductResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StoreDeleteProductResponseDto {
  @ApiProperty()
  id!: string;

}
