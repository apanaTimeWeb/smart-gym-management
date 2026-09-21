// RESPONSIBILITY: Defines the canonical pagination/sorting query contract.
// FLOW: HTTP query -> DTO validation -> repository page query -> PaginationMeta.
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
export class PaginationQueryDto {
  @IsInt() @Min(1) page = 1;
  @IsInt() @Min(1) @Max(100) limit = 25;
  @IsIn(['ASC', 'DESC']) sortOrder: 'ASC' | 'DESC' = 'DESC';
  @IsOptional() sortBy = 'createdAt';
}
