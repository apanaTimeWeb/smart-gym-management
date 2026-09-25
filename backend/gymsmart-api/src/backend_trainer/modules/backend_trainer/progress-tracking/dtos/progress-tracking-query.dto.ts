// RESPONSIBILITY: Validates paginated progress entry filtering and sorting parameters.
// FLOW: HTTP query → ProgressTrackingQueryDto → ProgressTrackingQueryService.

import { CorePaginationQueryDto} from '@/backend_trainer/core/dtos/core-pagination-query.dto';
import { Type} from 'class-transformer'; import { IsDateString, IsIn, IsInt, IsOptional, Max, Min} from 'class-validator'; export class ProgressTrackingQueryDto extends CorePaginationQueryDto { @IsOptional() @IsDateString() startDate?:string; @IsOptional() @IsDateString() endDate?:string; @IsIn(['date','weightKg','heightCm','bmi','bodyFatPercent','muscleMassKg']) sortBy='date'; @IsIn(['asc','desc']) sortDirection='desc';}

