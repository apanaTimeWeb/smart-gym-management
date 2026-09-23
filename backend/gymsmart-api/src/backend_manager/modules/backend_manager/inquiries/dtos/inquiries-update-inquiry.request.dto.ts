// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsArray, IsEmail, IsISO8601, IsOptional, IsString, IsEnum } from 'class-validator';

import { CoreRequestDto } from '@/backend_manager/core/dtos/core-request.dto';

import { InquiryStatus } from '@/backend_manager/modules/backend_manager/inquiries/inquiries.constants';

export class InquiriesUpdateInquiryRequestDto extends CoreRequestDto {
  @IsString()
  name!: string;

  @IsString()
  phone!: string;

  @IsOptional()
  @IsEmail()
  email!: string;

  @IsString()
  interest!: string;

  @IsEnum(InquiryStatus)
  status!: InquiryStatus;

  @IsOptional()
  @IsString()
  source!: string;

  @IsOptional()
  @IsString()
  notes!: string;

  @IsOptional()
  @IsISO8601()
  followUpDate!: string;

  @IsOptional()
  @IsArray()
  followUpLogs?: { date: string; note: string }[];

}
