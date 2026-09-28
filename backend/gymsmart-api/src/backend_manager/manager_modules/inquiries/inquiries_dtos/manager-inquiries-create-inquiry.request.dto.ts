// RESPONSIBILITY: Owns the Manager inquiries request/response DTO contract and OpenAPI schema.
// FLOW: HTTP payload or domain projection -> DTO validation/serialization -> typed API contract.
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsArray, IsEmail, IsISO8601, IsOptional, IsString, IsEnum } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-request.dto';

import { InquiryStatus } from '@/backend_manager/manager_modules/inquiries/manager-inquiries.constants';

export class ManagerInquiriesCreateInquiryRequestDto extends CoreRequestDto {
  @IsString()
  @ApiProperty()
  name!: string;

  @IsString()
  @ApiProperty()
  phone!: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional()
  email!: string;

  @IsString()
  @ApiProperty()
  interest!: string;

  @IsEnum(InquiryStatus)
  @ApiProperty()
  status!: InquiryStatus;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  source!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  notes!: string;

  @IsOptional()
  @IsISO8601()
  @ApiPropertyOptional()
  followUpDate!: string;

  @IsOptional()
  @IsArray()
  @ApiPropertyOptional()
  followUpLogs?: { date: string; note: string }[];

}

export { ManagerInquiriesCreateInquiryRequestDto as InquiriesCreateInquiryRequestDto };
