// RESPONSIBILITY: Owns the Manager finance request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import {IsEnum, IsISO8601, IsInt, IsNumber, IsObject, IsOptional, IsString, Matches, Min} from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

import { PaymentMethod } from '@/backend_manager/manager_modules/finance/manager-finance.constants';
import { PaymentStatus } from '@/backend_manager/manager_modules/finance/manager-finance.constants';

export class ManagerFinanceCreatePaymentRequestDto extends CoreRequestDto {
  @Matches(/^[A-Z]{3}$/)
  @ApiProperty()
  currency!: string;


  @IsString()
  @ApiProperty()
  memberId!: string;

  @IsInt()
  @Min(0)
  @ApiProperty()
  amount!: number;

  @IsEnum(PaymentMethod)
  @ApiProperty()
  method!: PaymentMethod;

  @IsEnum(PaymentStatus)
  @ApiProperty()
  status!: PaymentStatus;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  notes!: string;

  @IsString()
  @ApiProperty()
  invoiceNumber!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  receiptNumber!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  taxId!: string;

  @IsISO8601()
  @ApiProperty()
  paidAt!: string;

  @IsInt()
  @Min(0)
  @ApiProperty()
  gstAmount!: number;

  @IsInt()
  @Min(0)
  @ApiProperty()
  discountAmount!: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  couponCode!: string;

  @IsInt()
  @Min(0)
  @ApiProperty()
  taxableAmount!: number;

  @IsOptional()
  @IsObject()
  @ApiPropertyOptional()
  member?: { name: string; email: string; phone: string; plan?: { name: string } };
}

export { ManagerFinanceCreatePaymentRequestDto as FinanceCreatePaymentRequestDto };
