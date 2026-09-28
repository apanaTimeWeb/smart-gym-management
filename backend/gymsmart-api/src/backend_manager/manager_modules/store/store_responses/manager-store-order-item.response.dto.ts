// RESPONSIBILITY: Defines the typed response item contract for the owning Manager feature.
// FLOW: Repository/domain projection -> item mapping -> API response collection.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ManagerStoreOrderItemResponseDto {
  @ApiProperty()
  createdAt!: string;
  @ApiProperty()
  id!: string;
  @ApiPropertyOptional({ type: [String] })
  items?: string[];
  @ApiProperty()
  method!: string;
  @ApiProperty()
  status!: string;
  @ApiProperty({ type: Number })
  total!: number;
  @ApiProperty()
  currency!: string;
}

export { ManagerStoreOrderItemResponseDto as StoreOrderItemResponseDto };
