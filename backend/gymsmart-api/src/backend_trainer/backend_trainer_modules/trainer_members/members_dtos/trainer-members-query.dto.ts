// RESPONSIBILITY: Validates members request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → TrainerMembersQueryDto → service.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { CorePaginationQueryDto } from '@/backend_trainer/backend_core/core_dtos/core-pagination-query.dto';
import { Type } from 'class-transformer'; import { IsBoolean, IsDateString, IsIn, IsInt, IsOptional, IsString, Max, Min, IsUUID, IsEnum } from 'class-validator';
import { MemberProgressStatus, MemberStatus } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-enums';
import { TrainerMembersEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_members/trainer-members-enum.mapper';

/**
 * Intent: Defines the TrainerMembersQueryDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerMembersQueryDto extends CorePaginationQueryDto {
    @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() search?:string;
    @ApiPropertyOptional({ default: "desc" })
@IsIn(['asc','desc','ASC','DESC']) sortDirection='desc';
    @ApiPropertyOptional({ type: String })
@IsOptional() @IsIn(['ACTIVE','INACTIVE','EXPIRED','PENDING','EXPIRING_SOON','NEW']) status?:string; @ApiPropertyOptional({ enum: MemberProgressStatus })
@IsOptional() @Transform(({value}) => TrainerMembersEnumMapper.toProgress(value)) @IsEnum(MemberProgressStatus) progressStatus?:MemberProgressStatus; @ApiPropertyOptional({ default: "name" })
@IsIn(['id','name','status','expiryDate','progressStatus']) sortBy='name';

}
