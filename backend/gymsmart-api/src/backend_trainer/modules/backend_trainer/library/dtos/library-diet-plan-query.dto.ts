// RESPONSIBILITY: Validates the library HTTP input contract for one isolated use case.
// FLOW: HTTP body/query → LibraryDietPlanQueryDto → feature service.

import { CorePaginationQueryDto} from '@/backend_trainer/core/dtos/core-pagination-query.dto';
import { DietGoal} from '@/backend_trainer/modules/backend_trainer/library/library-enums';
import { Type} from 'class-transformer'; import { IsIn, IsEnum, IsInt, IsOptional, IsString, Max, Min} from 'class-validator';
export class LibraryDietPlanQueryDto extends CorePaginationQueryDto { @IsOptional() @IsString() search?: string; @IsOptional() @IsEnum(DietGoal) goal?: DietGoal; @IsOptional() @IsIn(['name','goal','calories']) sortBy = 'name'; @IsOptional() @IsIn(['asc','desc']) sortDirection = 'asc';}

