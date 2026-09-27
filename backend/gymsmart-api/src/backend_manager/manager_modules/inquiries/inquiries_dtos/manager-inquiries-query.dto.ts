// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsISO8601, IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-pagination-query.dto';

import { InquiryStatus } from '@/backend_manager/manager_modules/inquiries/manager-inquiries.constants';

export class ManagerInquiriesQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() id?: string;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsEnum(InquiryStatus) status?: InquiryStatus;
  @IsOptional() @IsISO8601({ strict: false }) date?: string;
}

export { ManagerInquiriesQueryDto as InquiriesQueryDto };
