// RESPONSIBILITY: Defines the typed response item contract for the owning Manager feature.
// FLOW: Repository/domain projection -> item mapping -> API response collection.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ManagerSalesMembershipReportItemResponseDto {
  @ApiProperty()
  plan!: string;
  @ApiProperty({ type: Number })
  refund!: number;
  @ApiProperty({ type: Number })
  remaining!: number;
  @ApiProperty({ type: Number })
  revenue!: number;
  @ApiProperty()
  currency!: string;
}

export { ManagerSalesMembershipReportItemResponseDto as SalesMembershipReportItemResponseDto };
