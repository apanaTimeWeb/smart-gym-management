// RESPONSIBILITY: Validates each weekly availability item sent by the trainer UI.
// FLOW: Raw array body → validation pipe → TrainerScheduleUpdateAvailabilityDto.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsString, IsEnum } from 'class-validator';
import { ScheduleDay } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-enums'; import { TrainerScheduleEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-enum.mapper';
 /**
 * Intent: Defines the TrainerScheduleUpdateAvailabilityDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerScheduleUpdateAvailabilityDto { @ApiProperty({ enum: ScheduleDay, enumName: 'ScheduleDay' })
@Transform(({value}) => TrainerScheduleEnumMapper.toDay(value)) @IsEnum(ScheduleDay) day!:ScheduleDay; @ApiProperty({ type: Boolean })
@IsBoolean() isAvailable!:boolean; @ApiProperty({ type: String })
@IsString() startTime!:string; @ApiProperty({ type: String })
@IsString() endTime!:string; }
