// RESPONSIBILITY: Validates library request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → LibraryQueryDto → service.

import { CorePaginationQueryDto} from '@/backend_trainer/core/dtos/core-pagination-query.dto';
import { DietGoal} from '@/backend_trainer/modules/backend_trainer/library/library-enums';
import { Type} from 'class-transformer'; import { IsEnum, IsIn, IsInt, IsOptional, IsString, Max, Min} from 'class-validator';
export class LibraryQueryDto extends CorePaginationQueryDto {
    @IsOptional() @IsString() search?:string;
    @IsIn(['asc','desc','ASC','DESC']) sortDirection='desc';
    @IsOptional() @IsEnum(DietGoal) goal?:DietGoal; @IsIn(['name','goal','calories']) sortBy='name';}

