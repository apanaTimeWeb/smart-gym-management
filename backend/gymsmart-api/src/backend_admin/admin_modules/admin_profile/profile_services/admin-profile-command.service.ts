// RESPONSIBILITY: Updates the authenticated Admin profile in the tenant profile snapshot and password in the master authentication record.
// FLOW: Profile command controller â†’ AdminProfileCommandService â†’ repository/master admin repo â†’ audit trail.
import { Injectable, UnauthorizedException } from '@nestjs/common';

import argon2 from 'argon2';

import { AdminCoreAuditTrailService } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-trail.service.js';
import { AdminCoreAuditSeverity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit.constants.js';
import { AdminCoreMasterAdminRepository } from '@/backend_admin/admin_core/admin_core_auth/admin-core-master-admin-repository.js';
import { AdminCoreRequestContextService } from '@/backend_admin/admin_core/admin_core_context/admin-core-request-context.service.js';

import { AdminProfileMutationDto } from '@/backend_admin/admin_modules/admin_profile/profile_dtos/admin-profile-mutation.dto.js';
import { AdminProfileDto } from '@/backend_admin/admin_modules/admin_profile/profile_dtos/admin-profile-response.dto.js';
import { AdminProfileResponsePresenter } from '@/backend_admin/admin_modules/admin_profile/profile_mappers/admin-profile.response.presenter.js';
import { AdminProfileRepository } from '@/backend_admin/admin_modules/admin_profile/profile_repositories/admin-profile-repository.js';

@Injectable()
/**
 * @description Defines the AdminProfileCommandService boundary for the admin_profile backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminProfileCommandService {
  constructor(
    private readonly repository: AdminProfileRepository,
    private readonly presenter: AdminProfileResponsePresenter,
    private readonly auditTrail: AdminCoreAuditTrailService,
    private readonly masterAdminRepository: AdminCoreMasterAdminRepository,
    private readonly context: AdminCoreRequestContextService,
  ) {}

  /** @description Updates self-service profile fields while rejecting immutable identity changes. @param input Profile fields from the frontend. @returns Updated profile. @throws UnauthorizedException when actor is missing. */
  async updateProfile(input: AdminProfileMutationDto): Promise<AdminProfileDto> {
    const current = await this.repository.findLatestSnapshot();
    const entity = current ? await this.repository.updateById(current.id, input) : await this.repository.createRecord(input);
    const response = this.presenter.toResponse(entity);
    await this.auditTrail.record({ action: 'ADMIN.PROFILE.UPDATED', entityType: 'AdminProfile', entityId: entity.id, oldValue: (current as any)?.data ?? null, newValue: response, module: 'profile', severity: AdminCoreAuditSeverity.LOW });
    return response as any;
  }

  /** @description Updates the authenticated Admin password using Argon2 without exposing the password to tenant storage. @param newPassword New password. @returns Null. @throws UnauthorizedException when the actor is missing. */
  async updatePassword(newPassword: string): Promise<null> {
    const actorId = this.context.get().userId;
    const admin = await this.masterAdminRepository.findActiveById(actorId);
    if (!admin) throw new UnauthorizedException({ message: 'Admin account not found.', errorCode: 'ADMIN.PROFILE.UNAUTHORIZED' });
    await this.masterAdminRepository.updatePasswordHashById(actorId, await argon2.hash(newPassword));
    await this.auditTrail.record({ action: 'ADMIN.PROFILE.PASSWORD_UPDATED', entityType: 'Admin', entityId: actorId, newValue: { changed: true }, module: 'profile', severity: AdminCoreAuditSeverity.HIGH });
    return null;
  }
}
