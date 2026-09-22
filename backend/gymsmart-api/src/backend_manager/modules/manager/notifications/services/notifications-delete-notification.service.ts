// RESPONSIBILITY: Write use-case for DELETE /api/v1/manager/notifications/:id.
// FLOW: Controller DTO -> NotificationsDeleteNotificationService -> NotificationsOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/core/types/json-value.types';
import { NotificationsOrchestratorService } from '@/modules/manager/notifications/services/notifications-orchestrator.service';

@Injectable()
export class NotificationsDeleteNotificationService {
  constructor(private readonly orchestrator: NotificationsOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async deleteNotification(id?: string): Promise<CoreJsonObject> { return this.orchestrator.softDeleteNotificationsById(id); }
}
