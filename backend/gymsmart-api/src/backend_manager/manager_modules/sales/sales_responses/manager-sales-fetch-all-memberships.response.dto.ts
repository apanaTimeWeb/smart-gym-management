// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { SalesMembershipItemResponseDto } from '@/backend_manager/manager_modules/sales/sales_responses/manager-sales-membership-item.response.dto';

export class ManagerSalesFetchAllMembershipsResponseDto {
  @ApiProperty({ type: [SalesMembershipItemResponseDto] })
  members?: Array<SalesMembershipItemResponseDto>;
}

export { ManagerSalesFetchAllMembershipsResponseDto as SalesFetchAllMembershipsResponseDto };
