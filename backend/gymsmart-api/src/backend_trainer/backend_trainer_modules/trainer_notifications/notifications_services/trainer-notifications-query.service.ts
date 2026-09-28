// RESPONSIBILITY: Builds Trainer notification list and preference response contracts.
// FLOW: TrainerNotificationsQueryController → TrainerNotificationsQueryService → TrainerNotificationsRepository → mapper/domain.
import { Injectable } from '@nestjs/common';
import { CoreRequestContext } from '@/backend_trainer/backend_core/core_context/core-request-context';
import { buildCorePaginationMeta } from '@/backend_trainer/backend_core/core_utils/core-pagination.utils';
import type { PaginationMeta } from '@/backend_trainer/backend_core/core_types/core-api-response.types';
import { TrainerNotificationsRepository } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_repositories/trainer-notifications-repository';
import { TrainerNotificationsQueryDto } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/notifications_dtos/trainer-notifications-query.dto';
import type { NotificationsNotificationDomain } from '@/backend_trainer/backend_trainer_modules/trainer_notifications/trainer-notifications-notification.domain';
/**
 * Intent: Defines the TrainerNotificationsQueryService boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class TrainerNotificationsQueryService {
  constructor(private readonly repo: TrainerNotificationsRepository) {}
  /** Returns paginated trainer notifications with the exact frontend response fields. */
  /**
 * Intent: Executes the findMany operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes findMany inside the owning backend service/repository boundary without exposing ORM details.
 * @param query - Input for findMany.
 * @returns {Promise<{ notifications: NotificationsNotificationDomain[]; total: number; unreadCount: number; page: number; limit: number; pagination: PaginationMeta }>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async findMany(query: TrainerNotificationsQueryDto): Promise<{ notifications: NotificationsNotificationDomain[]; total: number; unreadCount: number; page: number; limit: number; pagination: PaginationMeta }> {
    const result = await this.repo.findMany(CoreRequestContext.getUserIdOrThrow(), query);
    return { notifications: result.rows, total: result.total, unreadCount: result.unreadCount, page: query.page, limit: query.limit, pagination: buildCorePaginationMeta(result.total, query.page, query.limit) };
  }
  /** Returns trainer notification preferences without leaking the ORM entity. */
  /**
 * Intent: Executes the preferences operation inside the modules service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes preferences inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {Promise<Record<string, boolean>>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async preferences(): Promise<Record<string, boolean>> {
    const row = await this.repo.getPreferences(CoreRequestContext.getUserIdOrThrow());
    return { email: row?.email ?? true, push: row?.push ?? true, sms: row?.sms ?? false, sessionReminders: row?.sessionReminders ?? true, memberUpdates: row?.memberUpdates ?? true };
  }
}
