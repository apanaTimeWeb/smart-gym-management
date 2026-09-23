// RESPONSIBILITY: Owns the backend application API request/response validation contract.
// FLOW: HTTP payload → strict validation/coercion → typed feature contract.
import { ApiProperty } from '@nestjs/swagger';import { ScheduleFetchScheduleScheduleKpisDto } from '@/backend_manager/modules/backend_manager/schedule/dtos/schedule-fetch-schedule-schedule-kpis.dto';
import { ScheduleFetchScheduleScheduleShiftDto } from '@/backend_manager/modules/backend_manager/schedule/dtos/schedule-fetch-schedule-schedule-shift.dto';
import { ScheduleFetchScheduleTrainerScheduleDto } from '@/backend_manager/modules/backend_manager/schedule/dtos/schedule-fetch-schedule-trainer-schedule.dto';

export class ScheduleFetchScheduleResponseDto {
  @ApiProperty({type:ScheduleFetchScheduleScheduleKpisDto}) kpis!: ScheduleFetchScheduleScheduleKpisDto;
  @ApiProperty({type:[ScheduleFetchScheduleTrainerScheduleDto]}) trainers!: ScheduleFetchScheduleTrainerScheduleDto[];
}
