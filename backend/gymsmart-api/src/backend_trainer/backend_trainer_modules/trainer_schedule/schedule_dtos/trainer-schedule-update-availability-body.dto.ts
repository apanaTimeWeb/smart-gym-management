// RESPONSIBILITY: Represents the normalized schedule availability request after raw-array compatibility normalization.
// FLOW: Compatibility pipe → TrainerScheduleUpdateAvailabilityBodyDto → ScheduleUpdateService.

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer'; import { ValidateNested, IsArray } from 'class-validator'; import { TrainerScheduleUpdateAvailabilityDto } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_dtos/trainer-schedule-update-availability.dto';
 /**
 * Intent: Defines the TrainerScheduleUpdateAvailabilityBodyDto boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class TrainerScheduleUpdateAvailabilityBodyDto { @ApiProperty({ type: [TrainerScheduleUpdateAvailabilityDto] })
@IsArray() @ValidateNested({each:true}) @Type(()=>TrainerScheduleUpdateAvailabilityDto) days!:TrainerScheduleUpdateAvailabilityDto[]; }
