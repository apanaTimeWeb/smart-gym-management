// RESPONSIBILITY: Explicit response DTO for the frontend-frozen Manager API data contract.
// FLOW: Controller result -> StoreFetchProductsResponseDto -> CoreResponseInterceptor -> canonical ApiResponse<T>.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StoreFetchProductsResponseDto {
  @ApiProperty({ type: [Object] })
  products?: Array<{ category: string; name: string; price: number; sku: string; stock: number; unit: string; }>;

}
