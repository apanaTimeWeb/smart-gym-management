// RESPONSIBILITY: Validates earnings list/date/sort query parameters.
// FLOW: HTTP query → EarningsQueryDto → EarningsQueryService.

import { CorePaginationQueryDto} from '@/backend_trainer/core/dtos/core-pagination-query.dto';
import { Type} from 'class-transformer'; import { IsDateString, IsIn, IsInt, IsOptional, IsString, Max, Min} from 'class-validator'; export class EarningsQueryDto extends CorePaginationQueryDto { @IsOptional() @IsDateString() startDate?:string; @IsOptional() @IsDateString() endDate?:string; @IsOptional() @IsString() search?:string; @IsIn(['date','description','amount','status']) sortBy='date'; @IsIn(['asc','desc']) sortDirection='desc';}

