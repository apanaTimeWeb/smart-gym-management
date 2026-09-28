// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsISO8601, IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-pagination-query.dto';

import { CommChannel, CommSegment, CommStatus } from '@/backend_manager/manager_modules/communications/manager-communications.constants';

export class ManagerCommunicationsQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsEnum(CommChannel) channel?: CommChannel;
  @IsOptional() @IsEnum(CommStatus) status?: CommStatus;
  @IsOptional() @IsEnum(CommSegment) segment?: CommSegment;
  @IsOptional() @IsISO8601({ strict: false }) date?: string;
}

export { ManagerCommunicationsQueryDto as CommunicationsQueryDto };
