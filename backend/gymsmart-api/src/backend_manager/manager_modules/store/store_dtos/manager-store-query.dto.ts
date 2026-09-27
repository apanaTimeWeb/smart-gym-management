// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsISO8601, IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '@/backend_manager/manager_core/manager_core_dtos/manager-core-pagination-query.dto';

import { ManagerStoreSortOrder, StoreCategory, StoreRecordStatus } from '@/backend_manager/manager_modules/store/manager-store.constants';

export class ManagerStoreQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsEnum(StoreCategory) category?: StoreCategory;
  @IsOptional() @IsString() stock?: string;
  @IsOptional() @IsISO8601({ strict: false }) startDate?: string;
  @IsOptional() @IsISO8601({ strict: false }) endDate?: string;
  @IsOptional() @IsEnum(StoreRecordStatus) status?: StoreRecordStatus;
  @IsOptional() @IsEnum(ManagerStoreSortOrder) sortOrder?: ManagerStoreSortOrder;
}

export { ManagerStoreQueryDto as StoreQueryDto };
