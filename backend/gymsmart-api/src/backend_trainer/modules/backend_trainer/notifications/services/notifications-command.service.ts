// RESPONSIBILITY: Applies Trainer notification read-state and preference mutations with audit records.
// FLOW: NotificationsCommandController → NotificationsCommandService → repository → mapper/domain → audit.

import { Injectable } from '@nestjs/common';
import { CoreNotFoundException } from '@/backend_trainer/core/errors/core-not-found.exception';
import { CoreRequestContext } from '@/backend_trainer/core/context/core-request-context';
import { CoreAuditService } from '@/backend_trainer/core/audit/core-audit.service';
import { NotificationsRepository } from '@/backend_trainer/modules/backend_trainer/notifications/repositories/notifications-repository';
import { NotificationsNotificationMapper } from '@/backend_trainer/modules/backend_trainer/notifications/notifications-notification.mapper';
import { NotificationsUpdatePreferencesDto } from '@/backend_trainer/modules/backend_trainer/notifications/dtos/notifications-update-preferences.dto';

@Injectable()
export class NotificationsCommandService {
  constructor(private readonly repo: NotificationsRepository, private readonly audit: CoreAuditService) {}

  /** Marks one notification read in trainer scope and returns canonical null data. */
  async markRead(id: string): Promise<null> {
    const row = await this.repo.markRead(id, CoreRequestContext.get().userId ?? '');
    if (!row) throw new CoreNotFoundException('NOTIFICATIONS.NOTIFICATION', id);
    await this.audit.record('NOTIFICATION_READ', 'NOTIFICATION', id, null, { isRead: true });
    void NotificationsNotificationMapper(row);
    return null;
  }

  /** Marks all trainer notifications read. */
  async markAllRead(): Promise<null> {
    const trainerId = CoreRequestContext.get().userId ?? '';
    const updated = await this.repo.markAllRead(trainerId);
    if (updated > 0) await this.audit.record('NOTIFICATIONS_MARKED_READ', 'NOTIFICATION', 'bulk', null, { updated });
    return null;
  }

  /** Persists validated notification preferences and returns a non-ORM application object. */
  async updatePreferences(dto: NotificationsUpdatePreferencesDto): Promise<Record<string, boolean>> {
    const trainerId = CoreRequestContext.get().userId ?? '';
    const row = await this.repo.updatePreferences(trainerId, { ...(dto.email !== undefined ? { email: dto.email } : {}), ...(dto.push !== undefined ? { push: dto.push } : {}), ...(dto.sms !== undefined ? { sms: dto.sms } : {}), ...(dto.sessionReminders !== undefined ? { sessionReminders: dto.sessionReminders } : {}), ...(dto.memberUpdates !== undefined ? { memberUpdates: dto.memberUpdates } : {}) });
    await this.audit.record('NOTIFICATION_PREFERENCES_UPDATED', 'NOTIFICATION_PREFERENCE', row.id, null, { trainerId });
    return { email: row.email, push: row.push, sms: row.sms, sessionReminders: row.sessionReminders, memberUpdates: row.memberUpdates };
  }
}
