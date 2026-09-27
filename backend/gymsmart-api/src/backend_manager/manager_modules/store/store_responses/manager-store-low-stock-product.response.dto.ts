// RESPONSIBILITY: Defines the typed low-stock product item returned by Store summary APIs.
// FLOW: Store query -> stock threshold evaluation -> explicit low-stock response item.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ManagerStoreLowStockProductResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() name!: string;
  @ApiProperty({ type: Number }) stock!: number;
  @ApiPropertyOptional({ type: Number }) reorderThreshold?: number;
}

export { ManagerStoreLowStockProductResponseDto as StoreLowStockProductResponseDto };
