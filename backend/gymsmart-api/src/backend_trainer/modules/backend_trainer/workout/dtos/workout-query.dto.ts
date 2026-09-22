// RESPONSIBILITY: Validates workout request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → WorkoutQueryDto → service.

import { CorePaginationQueryDto } from '@/backend_trainer/core/dtos/core-pagination-query.dto';
import { Type } from 'class-transformer'; import { IsBoolean, IsDateString, IsIn, IsInt, IsOptional, IsString, Max, Min, IsUUID } from 'class-validator';
export class WorkoutQueryDto extends CorePaginationQueryDto {
    @IsOptional() @IsString() search?:string;
    @IsIn(['asc','desc','ASC','DESC']) sortDirection='desc';
    @IsOptional() @IsString() category?:string; @IsIn(['name','category','difficulty']) sortBy='name';

}
