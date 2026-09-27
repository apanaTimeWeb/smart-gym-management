// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { ManagerStoreProductItemResponseDto } from '@/backend_manager/manager_modules/store/store_responses/manager-store-product-item.response.dto';

export class ManagerStoreFetchProductsResponseDto {
  @ApiProperty({ type: [ManagerStoreProductItemResponseDto] })
  products?: Array<ManagerStoreProductItemResponseDto>;
}

export { ManagerStoreFetchProductsResponseDto as StoreFetchProductsResponseDto };
