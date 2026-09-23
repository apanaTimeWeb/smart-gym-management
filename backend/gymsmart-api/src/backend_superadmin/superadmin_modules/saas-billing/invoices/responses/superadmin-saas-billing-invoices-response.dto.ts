// RESPONSIBILITY: Defines the stable response data contract for invoices endpoints.
// FLOW: Domain model -> SuperadminInvoicesResponseDto -> canonical ApiResponse envelope.
import { ApiPropertyOptional } from '@nestjs/swagger';

export class SuperadminInvoicesResponseDto {
  @ApiPropertyOptional() id!: string;
  @ApiPropertyOptional()
  tenantId!: string;
  @ApiPropertyOptional()
  tenantName!: string;
  @ApiPropertyOptional()
  amount!: number;
  @ApiPropertyOptional()
  currency!: string;
  @ApiPropertyOptional()
  status!: string;
  @ApiPropertyOptional()
  issuedAt!: string;
  @ApiPropertyOptional()
  dueDate!: string;
  @ApiPropertyOptional()
  paidAt!: string | null;
  @ApiPropertyOptional()
  paymentMethod!: string;
  @ApiPropertyOptional()
  invoiceType!: string;
  @ApiPropertyOptional()
  planName!: string;
  @ApiPropertyOptional()
  taxId!: string;
}