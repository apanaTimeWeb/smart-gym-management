// RESPONSIBILITY: Write use-case for PATCH /api/v1/manager/notifications/read-all.
// FLOW: Controller DTO -> NotificationsMarkAllNotificationsReadService -> NotificationsOrchestratorService -> UnitOfWork -> repository -> audit/event.
import { Injectable } from '@nestjs/common';
import type { CoreJsonObject } from '@/backend_manager/core/types/json-value.types';
import { NotificationsOrchestratorService } from '@/backend_manager/modules/manager/notifications/services/notifications-orchestrator.service';

@Injectable()
export class NotificationsMarkAllNotificationsReadService {
  constructor(private readonly orchestrator: NotificationsOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async markAllNotificationsRead(data: CoreJsonObject, id?: string): Promise<CoreJsonObject> {
    return this.orchestrator.updateNotificationsById(data, id);
  }
}
