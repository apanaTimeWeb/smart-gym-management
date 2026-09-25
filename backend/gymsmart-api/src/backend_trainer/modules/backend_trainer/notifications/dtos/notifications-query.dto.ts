// RESPONSIBILITY: Validates notifications request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → NotificationsQueryDto → service.

import { CorePaginationQueryDto 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from '@/backend_trainer/core/dtos/core-pagination-query.dto';
import { Type 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from 'class-transformer'; import { IsBoolean, IsDateString, IsIn, IsInt, IsOptional, IsString, Max, Min, IsUUID 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from 'class-validator';
export class NotificationsQueryDto extends CorePaginationQueryDto {
    @IsOptional() @IsString() search?:string;
    @IsIn(['asc','desc','ASC','DESC']) sortDirection: 'asc'|'desc'|'ASC'|'DESC' = 'desc';
    @IsOptional() @IsBoolean() unreadOnly?:boolean;
    @IsIn(['createdAt','title']) sortBy: 'createdAt'|'title' = 'createdAt';

  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
}

