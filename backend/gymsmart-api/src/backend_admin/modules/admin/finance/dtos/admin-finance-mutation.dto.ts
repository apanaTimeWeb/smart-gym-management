// RESPONSIBILITY: Validates mutation fields exposed by the Admin finance frontend contract.
// FLOW: HTTP request body → AdminFinanceMutationDto → service business validation → repository mutation.

import { Type } from 'class-transformer';
import { IsArray, IsBoolean, IsNumber, IsObject, IsOptional, IsString, IsUUID } from 'class-validator';

export class AdminFinanceMutationDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  payments?: string;

  @IsOptional()
  @IsString()
  total?: string;

  @IsOptional()
  @IsString()
  paymentId?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  memberId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  method?: string;

  @IsOptional()
  @IsString()
  paymentMode?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  gstAmount?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  taxRate?: number;

  @IsOptional()
  @IsString()
  invoiceNumber?: string;

  @IsOptional()
  @IsString()
  hsn_code?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  planId?: number;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  invoiceNo?: string;

  @IsOptional()
  @IsString()
  paidAt?: string;

  @IsOptional()
  @IsString()
  refundReason?: string;

  @IsOptional()
  @IsString()
  receiptNumber?: string;

  @IsOptional()
  @IsString()
  discountApplied?: string;

  @IsOptional()
  @IsString()
  couponCode?: string;

  @IsOptional()
  @IsString()
  expenses?: string;

  @IsOptional()
  @IsString()
  totalAmount?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  branchId?: number;

  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  recordedBy?: string;

  @IsOptional()
  @IsString()
  vendor?: string;

  @IsOptional()
  @IsString()
  billNumber?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  approvedBy?: number;

  @IsOptional()
  @IsString()
  receiptUrl?: string;
}
