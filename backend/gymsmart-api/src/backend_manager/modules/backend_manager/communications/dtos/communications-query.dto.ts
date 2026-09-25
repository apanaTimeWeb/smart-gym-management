// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsISO8601, IsEnum, IsOptional, IsString} from 'class-validator';

import { PaginationQueryDto} from '@/backend_manager/core/dtos/pagination-query.dto';

import { CommChannel, CommSegment, CommStatus} from '@/backend_manager/modules/backend_manager/communications/communications.constants';

export class CommunicationsQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsEnum(CommChannel) channel?: CommChannel;
  @IsOptional() @IsEnum(CommStatus) status?: CommStatus;
  @IsOptional() @IsEnum(CommSegment) segment?: CommSegment;
  @IsOptional() @IsISO8601({ strict: false}) date?: string;}

