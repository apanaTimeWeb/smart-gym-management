// RESPONSIBILITY: Defines the typed response item contract for the owning Manager feature.
// FLOW: Repository/domain projection -> item mapping -> API response collection.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ManagerExpensesExpenseItemResponseDto {
  @ApiProperty({ type: Number })
  amount!: number;
  @ApiProperty()
  currency!: string;
  @ApiProperty()
  category!: string;
  @ApiProperty()
  date!: string;
  @ApiProperty()
  id!: string;
  @ApiProperty()
  paymentMode!: string;
  @ApiProperty()
  status!: string;
  @ApiProperty()
  title!: string;
  @ApiProperty()
  vendorName!: string;
}

export { ManagerExpensesExpenseItemResponseDto as ExpensesExpenseItemResponseDto };
