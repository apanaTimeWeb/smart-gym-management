// RESPONSIBILITY: Maps weekly availability persistence to the Trainer schedule response contract.
// FLOW: ScheduleWeeklyAvailabilityEntity → ScheduleAvailabilityMapper → API data.

import type { ScheduleWeeklyAvailabilityEntity } from '@/backend_trainer/modules/backend_trainer/schedule/schedule-weekly-availability.entity';
export function ScheduleAvailabilityMapper(entity:ScheduleWeeklyAvailabilityEntity){return {id:entity.id,trainerId:entity.trainerId,day:entity.day,isAvailable:entity.isAvailable,startTime:entity.startTime,endTime:entity.endTime,createdAt:entity.createdAt.toISOString(),updatedAt:entity.updatedAt.toISOString()};}
