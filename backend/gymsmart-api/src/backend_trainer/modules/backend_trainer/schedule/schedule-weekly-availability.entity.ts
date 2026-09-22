// RESPONSIBILITY: Maps schedule persistence without leaking ORM entities into domain services.
// FLOW: schedule repository → TypeORM entity → weekly_availability table.

import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '@/backend_trainer/core/database/core-base.entity';
import { ScheduleDay } from '@/backend_trainer/modules/backend_trainer/schedule/schedule-enums';

@Entity('trainer_weekly_availability')
export class ScheduleWeeklyAvailabilityEntity extends CoreBaseEntity {

  @Column({ name: 'trainer_id', type: 'uuid' }) trainerId!: string;
  @Column({type:'enum',enum:ScheduleDay,enumName:'schedule_day_enum'}) day!: ScheduleDay;
  @Column({ name: 'is_available' }) isAvailable!: boolean;
  @Column({ name: 'start_time', type: 'time' }) startTime!: string;
  @Column({ name: 'end_time', type: 'time' }) endTime!: string;
}
