// RESPONSIBILITY: Validates each weekly availability item sent by the trainer UI.
// FLOW: Raw array body → validation pipe → ScheduleUpdateAvailabilityDto.

import { IsBoolean, IsString, IsEnum } from 'class-validator';
import { ScheduleDay } from '@/backend_trainer/modules/backend_trainer/schedule/schedule-enums'; export class ScheduleUpdateAvailabilityDto { @IsEnum(ScheduleDay) day!:ScheduleDay; @IsBoolean() isAvailable!:boolean; @IsString() startTime!:string; @IsString() endTime!:string; }
