import { CoreRequestDto } from '@/core/dtos/core-request.dto';
import { InquiryBillingCycle } from '@/modules/manager/inquiries/inquiries.constants';
import { InquiryGender } from '@/modules/manager/inquiries/inquiries.constants';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/inquiries/:id/convert.
// FLOW: HTTP payload -> InquiriesConvertLeadRequestDto validation -> write use case -> orchestrator.

import { IsEmail, IsISO8601, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class InquiriesConvertLeadRequestDto extends CoreRequestDto {
  @IsString()
  name!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  phone!: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  aadhaar?: string;

  @IsString()
  gender!: InquiryGender;

  @IsString()
  billingCycle!: InquiryBillingCycle;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  customDays?: number;

  @IsString()
  planId!: string;

  @IsISO8601()
  joinDate!: string;

  @IsOptional()
  @IsISO8601()
  expiryDate?: string;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  totalAmount?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  paidAmount?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  pendingAmount?: number;

  @IsOptional()
  @IsString()
  medicalHistory?: string;

}
