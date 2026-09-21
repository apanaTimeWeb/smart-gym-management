// RESPONSIBILITY: Owns read-side use cases for Admin settings; no write persistence occurs here.
// FLOW: AdminSettingsQueryController → AdminSettingsQueryService → repository → mapper → ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminSettingsRepository } from '@/modules/admin/settings/repositories/admin-settings-repository';
import { AdminSettingsMapper } from '@/modules/admin/settings/mappers/admin-settings.mapper';
import { AdminSettingsQueryDto } from '@/modules/admin/settings/dtos/admin-settings-query.dto';

@Injectable()
export class AdminSettingsQueryService {
  constructor(
    private readonly repository: AdminSettingsRepository,
    private readonly mapper: AdminSettingsMapper,
  ) {}


  /** @description Executes fetchSettings for the Admin settings feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchSettings(query: AdminSettingsQueryDto): Promise<Record<string, unknown>> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? this.mapper.toResponse(this.mapper.toDomain(snapshot)) : {};
  }

  /** @description Executes fetchNotificationSettings for the Admin settings feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchNotificationSettings(query: AdminSettingsQueryDto): Promise<Record<string, unknown>> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? (snapshot.payload.notifications as Record<string, unknown> ?? {}) : {};
  }

  /** @description Executes fetchRolePermissionReference for the Admin settings feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchRolePermissionReference(query: AdminSettingsQueryDto): Promise<Record<string, unknown>> {
    const result = await this.repository.findFirstSnapshot(); return result ? this.mapper.toResponse(this.mapper.toDomain(result)) : {};
  }

  /** @description Executes status2fa for the Admin settings feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async status2fa(query: AdminSettingsQueryDto): Promise<Record<string, unknown>> {
    const snapshot = await this.repository.findFirstSnapshot(); return snapshot ? { twoFactorEnabled: snapshot.payload.twoFactorEnabled === true } : { twoFactorEnabled: false };
  }
}
