// @ts-nocheck
import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/finance/payments.
// FLOW: HTTP payload -> FinanceCreatePaymentRequestDto validation -> write use case -> orchestrator.

import { IsEnum, IsISO8601, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaymentMethod } from '@/backend_manager/modules/manager/finance/finance.constants';
import { PaymentStatus } from '@/backend_manager/modules/manager/finance/finance.constants';

export class FinanceCreatePaymentRequestDto extends CoreRequestDto {
  @IsString()
  memberId!: string;

  @IsNumber()
  @Type(() => Number)
  amount!: number;

  @IsEnum(PaymentMethod)
  method!: PaymentMethod;

  @IsEnum(PaymentStatus)
  status!: PaymentStatus;

  @IsOptional()
  @IsString()
  notes!: string;

  @IsString()
  invoiceNumber!: string;

  @IsOptional()
  @IsString()
  receiptNumber!: string;

  @IsOptional()
  @IsString()
  taxId!: string;

  @IsISO8601()
  paidAt!: string;

  @IsNumber()
  @Type(() => Number)
  gstAmount!: number;

  @IsNumber()
  @Type(() => Number)
  discountAmount!: number;

  @IsOptional()
  @IsString()
  couponCode!: string;

  @IsNumber()
  @Type(() => Number)
  taxableAmount!: number;

  @IsOptional()
  @IsObject()
  member?: { name: string; email: string; phone: string; plan?: { name: string } };

}
