// RESPONSIBILITY: Owns availability and leave persistence without physical deletes.
// FLOW: Schedule services → TrainerScheduleRepository → tenant TypeORM.

import { Injectable } from '@nestjs/common';
import { ScheduleAvailabilityMapper } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-availability.mapper';
import { ScheduleLeaveMapper } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-leave.mapper';
import type { ScheduleAvailabilityDomain } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-availability.domain';
import type { ScheduleLeaveDomain } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-leave.domain';
import { IsNull } from 'typeorm';
import { CoreBaseRepository } from '@/backend_trainer/backend_core/core_database/core-base.repository';
import { CoreTenantDatasourceResolver } from '@/backend_trainer/backend_core/core_database/core-tenant-datasource.resolver';
import { CoreTransactionContext } from '@/backend_trainer/backend_core/core_database/core-transaction.context';
import { TrainerScheduleWeeklyAvailabilityEntity } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-weekly-availability.entity';
import { TrainerScheduleLeaveRequestEntity } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/trainer-schedule-leave-request.entity';
import { TrainerScheduleUpdateAvailabilityDto } from '@/backend_trainer/backend_trainer_modules/trainer_schedule/schedule_dtos/trainer-schedule-update-availability.dto';


/**
 * Intent: Defines the TrainerScheduleRepository boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerScheduleRepository extends CoreBaseRepository {
  constructor(private readonly resolver: CoreTenantDatasourceResolver) { super(); }

  /** Reads weekly availability. */
  async findAvailability(trainerId: string): Promise<ScheduleAvailabilityDomain[]> {
    return (await this.resolver.getRepository(TrainerScheduleWeeklyAvailabilityEntity)).find({
      where: { trainerId, deletedAt: IsNull() },
      order: { id: 'ASC' },
    }).then((rows) => rows.map(ScheduleAvailabilityMapper));
  }

  /** Reads active leave requests. */
  async findLeaves(trainerId: string): Promise<ScheduleLeaveDomain[]> {
    return (await this.resolver.getRepository(TrainerScheduleLeaveRequestEntity)).find({
      where: { trainerId, deletedAt: IsNull() },
      order: { startDate: 'DESC' },
    }).then((rows) => rows.map(ScheduleLeaveMapper));
  }

  /** Replaces the active weekly availability set inside one transaction context. */
  async replaceAvailability(trainerId: string, days: TrainerScheduleUpdateAvailabilityDto[], context: CoreTransactionContext): Promise<ScheduleAvailabilityDomain[]> {
    return context.run(async (manager) => {
      const repo = manager.getRepository(TrainerScheduleWeeklyAvailabilityEntity);
      await repo.update({ trainerId, deletedAt: IsNull() }, { deletedAt: new Date() });
      await repo.insert(days.map((day) => ({ trainerId, ...day })));
      const rows = await repo.find({ where: { trainerId, deletedAt: IsNull() }, order: { id: 'ASC' } }); return rows.map(ScheduleAvailabilityMapper);
    });
  }

  /** Creates a pending leave request. */
  async createLeave(input: Partial<TrainerScheduleLeaveRequestEntity>, context?: CoreTransactionContext): Promise<ScheduleLeaveDomain> {
    const repo = context?.getRepository(TrainerScheduleLeaveRequestEntity) ?? await this.resolver.getRepository(TrainerScheduleLeaveRequestEntity);
    return repo.save(repo.create(input)).then(ScheduleLeaveMapper);
  }
}
