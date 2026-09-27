// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { ManagerStoreOrderItemResponseDto } from '@/backend_manager/manager_modules/store/store_responses/manager-store-order-item.response.dto';

export class ManagerStoreFetchOrdersResponseDto {
  @ApiProperty({ type: [ManagerStoreOrderItemResponseDto] })
  orders?: Array<ManagerStoreOrderItemResponseDto>;

}

export { ManagerStoreFetchOrdersResponseDto as StoreFetchOrdersResponseDto };
