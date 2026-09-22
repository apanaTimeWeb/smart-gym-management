// RESPONSIBILITY: Validates session list filters and sorting.
// FLOW: HTTP query → SessionsQueryDto → SessionsQueryService.

import { CorePaginationQueryDto } from '@/backend_trainer/core/dtos/core-pagination-query.dto';
import { SessionRecurrence, SessionStatus, SessionType } from '@/backend_trainer/modules/backend_trainer/sessions/sessions-enums';
import { Type } from 'class-transformer'; import { IsDateString, IsEnum, IsIn, IsInt, IsOptional, Max, Min } from 'class-validator'; export class SessionsQueryDto extends CorePaginationQueryDto { @IsOptional() @IsDateString() date?:string; @IsOptional() @IsDateString() startDate?:string; @IsOptional() @IsDateString() endDate?:string; @IsOptional() @IsEnum(SessionStatus) status?:SessionStatus; @IsIn(['sessionDate','time','status']) sortBy='sessionDate'; @IsIn(['asc','desc']) sortDirection='asc'; }
