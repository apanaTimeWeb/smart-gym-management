// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { NotificationsOrchestratorService } from '@/backend_manager/modules/backend_manager/notifications/services/notifications-orchestrator.service';

@Injectable()
export class NotificationsDeleteNotificationService {
  constructor(private readonly orchestrator: NotificationsOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @param data - Validated request payload. @param id - Optional path resource identifier. @returns Contract-compatible payload. */
  async deleteNotification(id?: string): Promise<null> { await this.orchestrator.softDeleteNotificationsById(id); return null; }
}
