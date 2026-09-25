// RESPONSIBILITY: Validates notifications request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → NotificationsQueryDto → service.

import { CorePaginationQueryDto} from '@/backend_trainer/core/dtos/core-pagination-query.dto';
import { Type} from 'class-transformer'; import { IsBoolean, IsDateString, IsIn, IsInt, IsOptional, IsString, Max, Min, IsUUID} from 'class-validator';
export class NotificationsQueryDto extends CorePaginationQueryDto {
    @IsOptional() @IsString() search?:string;
    @IsIn(['asc','desc','ASC','DESC']) sortDirection: 'asc'|'desc'|'ASC'|'DESC' = 'desc';
    @IsOptional() @IsBoolean() unreadOnly?:boolean;
    @IsIn(['createdAt','title']) sortBy: 'createdAt'|'title' = 'createdAt';}

