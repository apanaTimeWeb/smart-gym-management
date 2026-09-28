// RESPONSIBILITY: Validates the partial session update contract derived from the frontend create-session shape.
// FLOW: HTTP body → TrainerSessionsUpdateSessionDto → TrainerSessionsCommandService → repository mutation.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { SessionRecurrence, SessionType } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-enums';
import { TrainerSessionsEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_sessions/trainer-sessions-enum.mapper';
import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';


/**
 * Intent: Defines the TrainerSessionsUpdateSessionDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerSessionsUpdateSessionDto {
  @ApiPropertyOptional({ nullable: true })
@Transform(({value}) => value === '' ? null : value) @IsOptional() @IsUUID() memberId?: string | null;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsDateString() date?: string;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() time?: string;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() duration?: string;
  @ApiPropertyOptional({ enum: SessionType })
@IsOptional() @Transform(({value}) => TrainerSessionsEnumMapper.toType(value)) @IsEnum(SessionType) type?: SessionType;
  @ApiPropertyOptional({ enum: SessionRecurrence })
@IsOptional() @Transform(({value}) => TrainerSessionsEnumMapper.toRecurrence(value)) @IsEnum(SessionRecurrence) recurrenceType?: SessionRecurrence;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsDateString() recurrenceEndDate?: string;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() location?: string;
  @ApiPropertyOptional({ type: String })
@IsOptional() @IsString() room?: string;
}
