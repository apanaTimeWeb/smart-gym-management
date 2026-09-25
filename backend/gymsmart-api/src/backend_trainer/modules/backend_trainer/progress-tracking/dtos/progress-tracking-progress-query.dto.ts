// RESPONSIBILITY: Validates progress-tracking request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → ProgressTrackingProgressQueryDto → service.

import { CorePaginationQueryDto} from '@/backend_trainer/core/dtos/core-pagination-query.dto';
import { Type} from 'class-transformer'; import { IsDateString, IsIn, IsInt, IsOptional, Max, Min} from 'class-validator';
export class ProgressTrackingProgressQueryDto extends CorePaginationQueryDto { @IsOptional() @IsDateString() startDate?:string; @IsOptional() @IsDateString() endDate?:string; @IsIn(['date','weightKg','bmi']) sortBy='date'; @IsIn(['asc','desc']) sortDirection='desc';}

