// RESPONSIBILITY: Owns read-side use cases for Admin settings; no write persistence occurs here.
// FLOW: AdminSettingsQueryController â†’ AdminSettingsQueryService â†’ repository â†’ mapper â†’ ApiResponse.
import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { AdminSettingsQueryDto } from '@/backend_admin/admin_modules/admin_settings/settings_dtos/admin-settings-query.dto.js';
import { AdminSettingsResponseDto, AdminNotificationsSettingsDto, AdminTwoFactorStatusDto } from '@/backend_admin/admin_modules/admin_settings/settings_dtos/admin-settings-response.dto.js';
import { AdminSettingsResponsePresenter } from '@/backend_admin/admin_modules/admin_settings/settings_mappers/admin-settings.response.presenter.js';
import { AdminSettingsRepository } from '@/backend_admin/admin_modules/admin_settings/settings_repositories/admin-settings-repository.js';

@Injectable()
/**
 * @description Defines the AdminSettingsQueryService boundary for the admin_settings backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminSettingsQueryService {
  constructor(
    private readonly repository: AdminSettingsRepository,
    private readonly presenter: AdminSettingsResponsePresenter,
  ) {}

  /** @description Executes fetchSettings for the Admin settings feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findSettings(query: AdminSettingsQueryDto): Promise<AdminSettingsResponseDto> {
    const snapshot = await this.repository.findLatestSnapshot(query); 
    if (!snapshot) throw new NotFoundException('ADMIN.READ.NOT_FOUND');
    return this.presenter.toResponse(snapshot) as unknown as AdminSettingsResponseDto;
  }

  /** @description Executes fetchNotificationSettings for the Admin settings feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findNotificationSettings(query: AdminSettingsQueryDto): Promise<AdminNotificationsSettingsDto> {
    const snapshot = await this.repository.findLatestSnapshot(query); 
    if (!snapshot) throw new NotFoundException('ADMIN.READ.NOT_FOUND');
    return this.presenter.toNotificationSettingsResponse(snapshot) as unknown as AdminNotificationsSettingsDto;
  }

  /** @description Executes status2fa for the Admin settings feature.
   * @param query Validated query when applicable.
   * @returns Frontend contract response.
   */
  async findTwoFactorStatus(query: AdminSettingsQueryDto): Promise<AdminTwoFactorStatusDto> {
    const snapshot = await this.repository.findLatestSnapshot(query); 
    if (!snapshot) throw new NotFoundException('SETTINGS.READ_MODEL.NOT_FOUND');
    return this.presenter.toTwoFactorStatusResponse(snapshot) as unknown as AdminTwoFactorStatusDto;
  }
}
