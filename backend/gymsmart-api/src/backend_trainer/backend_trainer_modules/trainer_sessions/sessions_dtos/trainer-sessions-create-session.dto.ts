// RESPONSIBILITY: Validates sessions request shape at the edge and contains no business logic.
// FLOW: HTTP body/query → TrainerSessionsCreateSessionDto → service.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { SessionRecurrence, SessionStatus, SessionType } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-enums';
import { TrainerSessionsEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-enum.mapper';
import { IsDateString, IsEnum, IsIn, IsInt, IsOptional, IsString, IsUUID, Max, Min, MinLength } from 'class-validator';

/**
 * Intent: Defines the TrainerSessionsCreateSessionDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerSessionsCreateSessionDto {
    @ApiPropertyOptional({ type: String })
@Transform(({value}) => value === '' ? undefined : value) @IsOptional() @IsUUID() memberId?:string; @ApiProperty({ type: String })
@IsDateString() date!:string; @ApiProperty({ type: String })
@IsString() time!:string; @ApiProperty({ type: String })
@IsString() @MinLength(1) duration!:string; @ApiProperty({ enum: SessionType })
@Transform(({value}) => TrainerSessionsEnumMapper.toType(value)) @IsEnum(SessionType) type!: SessionType; @ApiPropertyOptional({ enum: SessionRecurrence })
@IsOptional() @Transform(({value}) => TrainerSessionsEnumMapper.toRecurrence(value)) @IsEnum(SessionRecurrence) recurrenceType?:SessionRecurrence; @ApiPropertyOptional({ type: String })
@IsOptional() @IsDateString() recurrenceEndDate?:string; @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() location?:string; @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() room?:string;
}
