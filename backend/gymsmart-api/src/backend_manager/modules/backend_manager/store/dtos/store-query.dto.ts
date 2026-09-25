// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsISO8601, IsEnum, IsOptional, IsString} from 'class-validator';

import { PaginationQueryDto} from '@/backend_manager/core/dtos/pagination-query.dto';

import { ManagerStoreSortOrder, StoreCategory, StoreRecordStatus} from '@/backend_manager/modules/backend_manager/store/store.constants';

export class StoreQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsEnum(StoreCategory) category?: StoreCategory;
  @IsOptional() @IsString() stock?: string;
  @IsOptional() @IsISO8601({ strict: false}) startDate?: string;
  @IsOptional() @IsISO8601({ strict: false}) endDate?: string;
  @IsOptional() @IsEnum(StoreRecordStatus) status?: StoreRecordStatus;
  @IsOptional() @IsEnum(ManagerStoreSortOrder) sortOrder?: ManagerStoreSortOrder;}

