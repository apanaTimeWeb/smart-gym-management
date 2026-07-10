import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateSettingDto } from '../dto/create-settings.dto';
import { UpdateSettingDto } from '../dto/update-settings.dto';

// Default platform settings
const DEFAULT_PLATFORM_SETTINGS = [
  { id: 'set-001', key: 'platform.name', value: 'GymSmart SaaS', description: 'Official platform name shown in emails and UI', category: 'general', isSensitive: false, dataType: 'string' },
  { id: 'set-002', key: 'platform.supportEmail', value: 'support@gymsmart.com', description: 'Email address for tenant support inquiries', category: 'general', isSensitive: false, dataType: 'string' },
  { id: 'set-003', key: 'platform.maintenanceMode', value: 'false', description: 'When true, all tenants see a maintenance page', category: 'general', isSensitive: false, dataType: 'boolean' },
  { id: 'set-004', key: 'billing.trialDays', value: '14', description: 'Number of free trial days for new gym signups', category: 'billing', isSensitive: false, dataType: 'number' },
  { id: 'set-005', key: 'security.maxLoginAttempts', value: '5', description: 'Maximum failed login attempts before account lockout', category: 'security', isSensitive: false, dataType: 'number' },
  { id: 'set-006', key: 'notifications.sendWelcomeEmail', value: 'true', description: 'Send welcome email on new tenant registration', category: 'notifications', isSensitive: false, dataType: 'boolean' },
];

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);
  private readonly settings = [...DEFAULT_PLATFORM_SETTINGS];

  create(createDto: CreateSettingDto) {
    this.logger.log(`Creating platform setting: ${createDto.key}`);
    const newSetting = {
      id: `set-${Date.now()}`,
      ...createDto,
      category: createDto.category ?? 'general',
      isSensitive: createDto.isSensitive ?? false,
      dataType: createDto.dataType ?? 'string',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return {
      success: true,
      message: 'Platform setting created successfully',
      data: newSetting,
    };
  }

  findAll() {
    this.logger.log('Fetching all platform settings');
    // Mask sensitive values (Rule 35 - GDPR & Data Privacy)
    const safetSettings = this.settings.map((s) => ({
      ...s,
      value: s.isSensitive ? '••••••••' : s.value,
    }));
    return {
      success: true,
      message: 'Platform settings fetched successfully',
      data: safetSettings,
      meta: { total: this.settings.length },
    };
  }

  findOne(id: string) {
    const setting = this.settings.find((s) => s.id === id);
    if (!setting) {
      throw new NotFoundException(`Platform setting with ID "${id}" not found`);
    }
    return {
      success: true,
      message: 'Platform setting fetched successfully',
      data: { ...setting, value: setting.isSensitive ? '••••••••' : setting.value },
    };
  }

  update(id: string, updateDto: UpdateSettingDto) {
    const setting = this.settings.find((s) => s.id === id);
    if (!setting) {
      throw new NotFoundException(`Platform setting with ID "${id}" not found`);
    }
    this.logger.log(`Updating platform setting: ${setting.key}`);
    return {
      success: true,
      message: 'Platform setting updated successfully',
      data: { ...setting, ...updateDto, updatedAt: new Date().toISOString() },
    };
  }

  remove(id: string) {
    const setting = this.settings.find((s) => s.id === id);
    if (!setting) {
      throw new NotFoundException(`Platform setting with ID "${id}" not found`);
    }
    this.logger.log(`Removing platform setting: ${setting.key}`);
    return {
      success: true,
      message: 'Platform setting removed successfully',
      data: { id, isDeleted: true, deletedAt: new Date().toISOString() },
    };
  }
}
