// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PaginationQueryDto } from '@/backend_manager/core/dtos/pagination-query.dto';

import { LibraryCategory } from '@/backend_manager/modules/backend_manager/library/library.constants';

export class LibraryQueryDto extends PaginationQueryDto {
  @IsOptional() @IsString() search?: string;
  @IsOptional() @IsEnum(LibraryCategory) category?: LibraryCategory;
  @IsOptional() @IsString() difficulty?: string;
  @IsOptional() @IsString() goal?: string;
}
