// RESPONSIBILITY: Owns read-side use cases for Admin settings; no write persistence occurs here.
// FLOW: AdminSettingsQueryController â†’ AdminSettingsQueryService â†’ repository â†’ mapper â†’ ApiResponse.

import { Injectable } from '@nestjs/common';
import { AdminSettingsRepository } from '@/backend_admin/modules/admin/settings/repositories/admin-settings-repository';
import { AdminSettingsMapper } from '@/backend_admin/modules/admin/settings/mappers/admin-settings.mapper';
import { AdminSettingsQueryDto } from '@/backend_admin/modules/admin/settings/dtos/admin-settings-query.dto';
import { AdminSettingsResponseDto, AdminNotificationsSettingsDto } from '@/backend_admin/modules/admin/settings/dtos/admin-settings-response.dto';

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
  async fetchSettings(query: AdminSettingsQueryDto): Promise<AdminSettingsResponseDto> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return (snapshot ? this.mapper.toResponse(this.mapper.toDomain(snapshot)) : {}) as AdminSettingsResponseDto;
  }

  /** @description Executes fetchNotificationSettings for the Admin settings feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchNotificationSettings(query: AdminSettingsQueryDto): Promise<AdminNotificationsSettingsDto> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return (snapshot ? (snapshot.payload.notifications ?? {}) : {}) as AdminNotificationsSettingsDto;
  }

  /** @description Executes fetchRolePermissionReference for the Admin settings feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async fetchRolePermissionReference(query: AdminSettingsQueryDto): Promise<Record<string, unknown>> {
    const result = await this.repository.findFirstSnapshot(); 
    return result ? this.mapper.toResponse(this.mapper.toDomain(result)) : {};
  }

  /** @description Executes status2fa for the Admin settings feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async status2fa(query: AdminSettingsQueryDto): Promise<{ twoFactorEnabled: boolean }> {
    const snapshot = await this.repository.findFirstSnapshot(); 
    return snapshot ? { twoFactorEnabled: snapshot.payload.twoFactorEnabled === true } : { twoFactorEnabled: false };
  }
}
