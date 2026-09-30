// RESPONSIBILITY: Maps weekly availability persistence to the Trainer schedule response contract.
// FLOW: TrainerScheduleWeeklyAvailabilityEntity → ScheduleAvailabilityMapper → API data.

import type { ScheduleAvailabilityDomain } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-availability.domain';
import { TrainerScheduleEnumMapper } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-enum.mapper';
import type { TrainerScheduleWeeklyAvailabilityEntity } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-weekly-availability.entity';
/**
 * @description Executes ScheduleAvailabilityMapper as an isolated backend utility/adapter operation.
 * @param entity - Input for ScheduleAvailabilityMapper.
 * @returns {ScheduleAvailabilityDomain} The deterministic result required by its caller.
 * @throws Infrastructure or canonical application exceptions when the operation cannot complete.
 * @remarks Preserve pure mapping/adapter behavior and avoid introducing business persistence shortcuts.
 * AI Note: Keep the utility isolated and update its direct callers when its contract changes.
 */
export function ScheduleAvailabilityMapper(entity:TrainerScheduleWeeklyAvailabilityEntity): ScheduleAvailabilityDomain{return {id:entity.id,trainerId:entity.trainerId,day:TrainerScheduleEnumMapper.toApiDay(entity.day),isAvailable:entity.isAvailable,startTime:entity.startTime,endTime:entity.endTime};}
