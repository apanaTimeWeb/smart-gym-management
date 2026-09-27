// RESPONSIBILITY: Defines the exact frontend-consumed response contract for the owning Manager feature.
// FLOW: Repository/domain projection -> canonical response DTO -> HTTP envelope.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ManagerExpensesUpdateExpenseResponseDto {
  @ApiProperty() id!: string;
  @ApiProperty() title!: string;
  @ApiProperty() category!: string;
  @ApiProperty({ type: Number }) amount!: number;
  @ApiProperty() date!: string;
  @ApiProperty({ enum: ['PAID','PENDING'] }) status!: string;
  @ApiPropertyOptional() referenceNo?: string;
  @ApiPropertyOptional() notes?: string;
  @ApiPropertyOptional() receiptUrl?: string;
  @ApiProperty() createdAt!: string;
  @ApiPropertyOptional() updatedAt?: string;
  @ApiPropertyOptional() vendorName?: string;
  @ApiPropertyOptional() paymentMode?: string;
  @ApiPropertyOptional() approvedBy?: string;
  @ApiProperty({ type: Boolean }) isRecurring!: boolean;
  @ApiPropertyOptional({ nullable: true }) recurringFrequency?: string | null;
  @ApiPropertyOptional({ type: Number }) taxAmount?: number;
}

export { ManagerExpensesUpdateExpenseResponseDto as ExpensesUpdateExpenseResponseDto };
