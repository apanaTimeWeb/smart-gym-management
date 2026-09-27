// RESPONSIBILITY: Defines the typed response item contract for the owning Manager feature.
// FLOW: Repository/domain projection -> item mapping -> API response collection.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ManagerHrLedgerItemResponseDto {
  @ApiProperty({ type: Number })
  balance!: number;
  @ApiProperty({ type: Number })
  credit!: number;
  @ApiProperty()
  date!: string;
  @ApiProperty({ type: Number })
  debit!: number;
  @ApiProperty()
  type!: string;
  @ApiProperty()
  currency!: string;
}

export { ManagerHrLedgerItemResponseDto as HrLedgerItemResponseDto };
