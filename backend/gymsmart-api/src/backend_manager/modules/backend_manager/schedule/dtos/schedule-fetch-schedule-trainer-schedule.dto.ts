// RESPONSIBILITY: Defines one DTO shape owned by this Manager feature.
// FLOW: Feature API contract -> explicit DTO type -> Swagger serialization.
import { ApiProperty } from '@nestjs/swagger';

import { ScheduleFetchScheduleScheduleShiftDto } from '@/backend_manager/modules/backend_manager/schedule/dtos/schedule-fetch-schedule-schedule-shift.dto';

export class ScheduleFetchScheduleTrainerScheduleDto { @ApiProperty() trainerId!: string; @ApiProperty() trainerName!: string; @ApiProperty() trainerRole!: string; @ApiProperty({type:Boolean}) isActive!: boolean; @ApiProperty({type:[ScheduleFetchScheduleScheduleShiftDto]}) shifts!: ScheduleFetchScheduleScheduleShiftDto[]; @ApiProperty({type:Number}) totalShiftsPerWeek!: number; @ApiProperty({type:Number}) totalHoursPerWeek!: number; }
