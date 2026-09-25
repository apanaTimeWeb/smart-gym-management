// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsISO8601, IsEnum, IsOptional, IsString} from 'class-validator';

import { PaginationQueryDto} from '@/backend_manager/core/dtos/pagination-query.dto';

import { MemberGender, MemberSortColumn, MemberStatus, SortDirection} from '@/backend_manager/modules/backend_manager/members/members.constants';

export class MembersQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() id?: string;
  @IsOptional() @IsString() memberId?: string;
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsEnum(MemberStatus) status?: MemberStatus;
  @IsOptional() @IsEnum(MemberGender) gender?: MemberGender;
  @IsOptional() @IsString() plan?: string;
  @IsOptional() @IsISO8601({ strict: false}) expiryFrom?: string;
  @IsOptional() @IsISO8601({ strict: false}) expiryTo?: string;
  @IsOptional() @IsEnum(MemberSortColumn) sort?: MemberSortColumn;
  @IsOptional() @IsEnum(SortDirection) dir?: SortDirection;}

