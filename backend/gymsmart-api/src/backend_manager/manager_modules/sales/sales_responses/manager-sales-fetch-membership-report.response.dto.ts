// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';

import { SalesMembershipReportItemResponseDto } from '@/backend_manager/manager_modules/sales/sales_responses/manager-sales-membership-report-item.response.dto';

export class ManagerSalesFetchMembershipReportResponseDto {
  @ApiProperty({ type: [SalesMembershipReportItemResponseDto] })
  report?: Array<SalesMembershipReportItemResponseDto>;
}

export { ManagerSalesFetchMembershipReportResponseDto as SalesFetchMembershipReportResponseDto };
