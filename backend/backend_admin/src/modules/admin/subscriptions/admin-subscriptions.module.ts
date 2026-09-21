// RESPONSIBILITY: Registers the isolated Admin subscriptions feature slice only.
// FLOW: Nest module -> controllers -> micro-services -> repository/mapper.

import { Module } from '@nestjs/common';
import { AdminSubscriptionsQueryController } from '@/modules/admin/subscriptions/controllers/admin-subscriptions-query.controller';
import { AdminSubscriptionsQueryService } from '@/modules/admin/subscriptions/services/admin-subscriptions-query.service';
import { AdminSubscriptionsRepository } from '@/modules/admin/subscriptions/repositories/admin-subscriptions-repository';
import { AdminSubscriptionsMapper } from '@/modules/admin/subscriptions/mappers/admin-subscriptions.mapper';
import { AdminSubscriptionsCommandController } from '@/modules/admin/subscriptions/controllers/admin-subscriptions-command.controller';
import { AdminSubscriptionsCommandService } from '@/modules/admin/subscriptions/services/admin-subscriptions-command.service';

@Module({
  controllers: [AdminSubscriptionsQueryController, AdminSubscriptionsCommandController],
  providers: [AdminSubscriptionsQueryService, AdminSubscriptionsRepository, AdminSubscriptionsMapper, AdminSubscriptionsCommandService],
  exports: [],
})
export class AdminSubscriptionsModule {}
