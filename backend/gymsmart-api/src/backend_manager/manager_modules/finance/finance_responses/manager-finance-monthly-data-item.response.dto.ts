// RESPONSIBILITY: Defines the typed response item contract for the owning Manager feature.
// FLOW: Repository/domain projection -> item mapping -> API response collection.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ManagerFinanceMonthlyDataItemResponseDto {
  @ApiProperty()
  month!: string;
  @ApiProperty({ type: Number })
  revenue!: number;
  @ApiPropertyOptional()
  expenses?: number;
  @ApiProperty()
  currency!: string;
}

export { ManagerFinanceMonthlyDataItemResponseDto as FinanceMonthlyDataItemResponseDto };
