// RESPONSIBILITY: Defines the typed response item contract for the owning Manager feature.
// FLOW: Repository/domain projection -> item mapping -> API response collection.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ManagerSalesMembershipItemResponseDto {
  @ApiProperty()
  name!: string;
  @ApiProperty({ type: Number })
  pendingAmount!: number;
  @ApiProperty()
  currency!: string;
  @ApiProperty()
  phone!: string;
  @ApiProperty()
  plan!: string;
  @ApiProperty()
  status!: string;
}

export { ManagerSalesMembershipItemResponseDto as SalesMembershipItemResponseDto };
