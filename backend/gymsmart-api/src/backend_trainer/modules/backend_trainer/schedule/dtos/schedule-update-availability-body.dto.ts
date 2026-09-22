// RESPONSIBILITY: Represents the normalized schedule availability request after raw-array compatibility normalization.
// FLOW: Compatibility pipe → ScheduleUpdateAvailabilityBodyDto → ScheduleUpdateService.

import { Type } from 'class-transformer'; import { ValidateNested, IsArray } from 'class-validator'; import { ScheduleUpdateAvailabilityDto } from '@/backend_trainer/modules/backend_trainer/schedule/dtos/schedule-update-availability.dto'; export class ScheduleUpdateAvailabilityBodyDto { @IsArray() @ValidateNested({each:true}) @Type(()=>ScheduleUpdateAvailabilityDto) days!:ScheduleUpdateAvailabilityDto[]; }
