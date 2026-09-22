// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> StoreUpdateProductResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StoreUpdateProductResponseDto {
  @ApiProperty()
  category: string;

  @ApiProperty()
  id: string;

  @ApiProperty({ type: Boolean })
  isActive: boolean;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: Number })
  price: number;

  @ApiProperty({ type: Number })
  stock: number;

}
