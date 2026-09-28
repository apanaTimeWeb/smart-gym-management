// RESPONSIBILITY: Maps schedule persistence without leaking ORM entities into domain services.
// FLOW: schedule repository → TypeORM entity → weekly_availability table.

import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '@/backend_trainer/backend_core/core_database/core-base.entity';
import { ScheduleDay } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-enums';


/**
 * Intent: Defines the TrainerScheduleWeeklyAvailabilityEntity boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Entity('trainer_weekly_availability')
export class TrainerScheduleWeeklyAvailabilityEntity extends CoreBaseEntity {

  @Column({ name: 'trainer_id', type: 'uuid' }) trainerId!: string;
  @Column({type:'enum',enum:ScheduleDay,enumName:'schedule_day_enum'}) day!: ScheduleDay;
  @Column({ name: 'is_available' }) isAvailable!: boolean;
  @Column({ name: 'start_time', type: 'time' }) startTime!: string;
  @Column({ name: 'end_time', type: 'time' }) endTime!: string;
}
