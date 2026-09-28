// RESPONSIBILITY: Owns the backend application business use-case/service boundary.
// FLOW: Validated input → focused business use case → repository/orchestrator boundary → typed result.
import { Injectable } from '@nestjs/common';

import { NotificationsOrchestratorService } from '@/backend_manager/manager_modules/notifications/notifications_services/manager-notifications-orchestrator.service';

@Injectable()
export class ManagerNotificationsMarkAllNotificationsReadService {
  constructor(private readonly orchestrator: NotificationsOrchestratorService) {}

  /** @description Executes the frontend-defined mutation through the feature orchestrator. @returns Contract-compatible payload. */
  async updateAllNotificationsRead(): Promise<null> {
    await this.orchestrator.updateAllNotificationsRead();
    return null;
  }
}

export { ManagerNotificationsMarkAllNotificationsReadService as NotificationsMarkAllNotificationsReadService };
