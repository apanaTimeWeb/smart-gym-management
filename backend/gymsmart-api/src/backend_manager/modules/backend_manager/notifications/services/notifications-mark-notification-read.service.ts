// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { NotificationsOrchestratorService } from '@/backend_manager/modules/backend_manager/notifications/services/notifications-orchestrator.service';

@Injectable()
export class NotificationsMarkNotificationReadService {
  constructor(private readonly orchestrator: NotificationsOrchestratorService) {}

  /** @description Marks one notification as read through the feature orchestrator. @param id - Notification resource identifier. @returns Contract-compatible empty payload. */
  async markNotificationRead(id: string): Promise<null> {
    await this.orchestrator.updateNotificationsById({ status: 'READ', readAt: new Date().toISOString() }, id);
    return null;
  }
}
