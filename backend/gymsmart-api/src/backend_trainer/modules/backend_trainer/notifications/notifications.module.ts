// RESPONSIBILITY: Registers the isolated notifications feature slice and its controller/service/repository graph.
// FLOW: Nest bootstrap → NotificationsModule → feature-owned providers/controllers.

import { Module } from '@nestjs/common';
import { NotificationsQueryController } from '@/backend_trainer/modules/backend_trainer/notifications/controllers/notifications-query.controller'; import { NotificationsCommandController } from '@/backend_trainer/modules/backend_trainer/notifications/controllers/notifications-command.controller'; import { NotificationsQueryService } from '@/backend_trainer/modules/backend_trainer/notifications/services/notifications-query.service'; import { NotificationsCommandService } from '@/backend_trainer/modules/backend_trainer/notifications/services/notifications-command.service'; import { NotificationsRepository } from '@/backend_trainer/modules/backend_trainer/notifications/repositories/notifications-repository';
@Module({controllers:[NotificationsQueryController,NotificationsCommandController],providers:[NotificationsQueryService,NotificationsCommandService,NotificationsRepository]}) export class NotificationsModule {}
