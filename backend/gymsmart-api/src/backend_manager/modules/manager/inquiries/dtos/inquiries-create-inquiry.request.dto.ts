import { CoreRequestDto } from '@/core/dtos/core-request.dto';
import { InquiryStatus } from '@/modules/manager/inquiries/inquiries.constants';
// RESPONSIBILITY: Strict feature-local request DTO for POST /api/v1/manager/inquiries.
// FLOW: HTTP payload -> InquiriesCreateInquiryRequestDto validation -> write use case -> orchestrator.

import { IsArray, IsEmail, IsISO8601, IsOptional, IsString } from 'class-validator';

export class InquiriesCreateInquiryRequestDto extends CoreRequestDto {
  @IsString()
  name!: string;

  @IsString()
  phone!: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  interest!: string;

  @IsEnum(InquiryStatus)
  status!: InquiryStatus;

  @IsOptional()
  @IsString()
  source?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsISO8601()
  followUpDate?: string;

  @IsOptional()
  @IsArray()
  followUpLogs?: { date: string; note: string }[];

}
