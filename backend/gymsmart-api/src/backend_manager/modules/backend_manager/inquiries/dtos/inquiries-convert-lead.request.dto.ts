// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import { IsEmail, IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

import { InquiryBillingCycle } from '@/backend_manager/modules/backend_manager/inquiries/inquiries.constants';
import { InquiryGender } from '@/backend_manager/modules/backend_manager/inquiries/inquiries.constants';

export class InquiriesConvertLeadRequestDto extends CoreRequestDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsEmail()
  email!: string;

  @IsString()
  phone!: string;

  @IsOptional()
  @IsString()
  address!: string;

  @IsOptional()
  @IsString()
  aadhaar!: string;

  @IsString()
  gender!: InquiryGender;

  @IsString()
  billingCycle!: InquiryBillingCycle;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  customDays!: number;

  @IsString()
  planId!: string;

  @IsISO8601()
  joinDate!: string;

  @IsOptional()
  @IsISO8601()
  expiryDate!: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  totalAmount!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  paidAmount!: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pendingAmount!: number;

  @IsOptional()
  @IsString()
  medicalHistory!: string;

}
