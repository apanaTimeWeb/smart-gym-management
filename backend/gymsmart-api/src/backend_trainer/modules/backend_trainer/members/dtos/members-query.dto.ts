// RESPONSIBILITY: Validates members request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → MembersQueryDto → service.

import { CorePaginationQueryDto } from '@/backend_trainer/core/dtos/core-pagination-query.dto';
import { Type } from 'class-transformer'; import { IsBoolean, IsDateString, IsIn, IsInt, IsOptional, IsString, Max, Min, IsUUID, IsEnum } from 'class-validator';
import { MemberProgressStatus, MemberStatus } from '@/backend_trainer/modules/backend_trainer/members/members-enums';
export class MembersQueryDto extends CorePaginationQueryDto {
    @IsOptional() @IsString() search?:string;
    @IsIn(['asc','desc','ASC','DESC']) sortDirection='desc';
    @IsOptional() @IsIn(['ACTIVE','INACTIVE','EXPIRED','PENDING','EXPIRING_SOON','NEW']) status?:string; @IsOptional() @IsEnum(MemberProgressStatus) progressStatus?:MemberProgressStatus; @IsIn(['id','name','status','expiryDate','progressStatus']) sortBy='name';

}
