// RESPONSIBILITY: Validates members request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → MembersQueryDto → service.

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
} from 'class-transformer'; import { IsBoolean, IsDateString, IsIn, IsInt, IsOptional, IsString, Max, Min, IsUUID, IsEnum 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from 'class-validator';
import { MemberProgressStatus, MemberStatus 
  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
} from '@/backend_trainer/modules/backend_trainer/members/members-enums';
export class MembersQueryDto extends CorePaginationQueryDto {
    @IsOptional() @IsString() search?:string;
    @IsIn(['asc','desc','ASC','DESC']) sortDirection='desc';
    @IsOptional() @IsIn(['ACTIVE','INACTIVE','EXPIRED','PENDING','EXPIRING_SOON','NEW']) status?:string; @IsOptional() @IsEnum(MemberProgressStatus) progressStatus?:MemberProgressStatus; @IsIn(['id','name','status','expiryDate','progressStatus']) sortBy='name';


  @IsOptional()
  timeRange?: string;

  @IsOptional()
  customStart?: string;

  @IsOptional()
  customEnd?: string;

  @IsOptional()
  preset?: string;
}

