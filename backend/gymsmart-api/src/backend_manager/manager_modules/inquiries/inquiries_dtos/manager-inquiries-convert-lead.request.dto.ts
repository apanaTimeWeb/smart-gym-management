// RESPONSIBILITY: Owns the Manager inquiries request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { Type } from 'class-transformer';
import { IsEmail, IsEnum, IsISO8601, IsInt, IsNumber, IsOptional, IsString, Matches, Min } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

import { InquiryBillingCycle, InquiryGender } from '@/backend_manager/manager_modules/inquiries/manager-inquiries.constants';

export class ManagerInquiriesConvertLeadRequestDto extends CoreRequestDto {
  @Matches(/^[A-Z]{3}$/)
  @ApiProperty()
  currency!: string;


  @IsString()
  @ApiProperty()
  name!: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  email!: string;

  @IsString()
  @ApiProperty()
  phone!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  address!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  aadhaar!: string;

  @IsEnum(InquiryGender)
  @ApiProperty()
  gender!: InquiryGender;

  @IsEnum(InquiryBillingCycle)
  @ApiProperty()
  billingCycle!: InquiryBillingCycle;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @ApiPropertyOptional()
  customDays!: number;

  @IsString()
  @ApiProperty()
  planId!: string;

  @IsISO8601()
  @ApiProperty()
  joinDate!: string;

  @IsOptional()
  @IsISO8601()
  @ApiPropertyOptional()
  expiryDate!: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional()
  totalAmount!: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional()
  paidAmount!: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @ApiPropertyOptional()
  pendingAmount!: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  medicalHistory!: string;

}

export { ManagerInquiriesConvertLeadRequestDto as InquiriesConvertLeadRequestDto };
