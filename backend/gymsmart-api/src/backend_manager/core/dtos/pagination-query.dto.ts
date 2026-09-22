import type { CoreJsonValue } from '@/backend_manager/core/types/json-value.types';
// RESPONSIBILITY: Shared validated page/limit query contract.
// FLOW: Controller query → PaginationQueryDto → feature query DTO extension → repository.
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class PaginationQueryDto {
  [key: string]: CoreJsonValue;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) page = 1;
  @IsOptional() @Type(() => Number) @IsInt() @Min(1) @Max(100) limit = 20;
}
