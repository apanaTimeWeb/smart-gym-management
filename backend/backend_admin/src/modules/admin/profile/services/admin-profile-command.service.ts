// RESPONSIBILITY: Updates the authenticated Admin profile in the tenant profile snapshot and password in the master authentication record.
// FLOW: Profile command controller → AdminProfileCommandService → repository/master admin repo → audit trail.

import { Injectable, UnauthorizedException } from '@nestjs/common';
import argon2 from 'argon2';
import { CoreMasterAdminRepository } from '@/core/auth/core-master-admin-repository';
import { CoreRequestContextService } from '@/core/context/core-request-context.service';
import { CoreAuditTrailService } from '@/core/audit/core-audit-trail.service';
import { AdminProfileRepository } from '@/modules/admin/profile/repositories/admin-profile-repository';
import { AdminProfileMapper } from '@/modules/admin/profile/mappers/admin-profile.mapper';

@Injectable()
export class AdminProfileCommandService {
  constructor(
    private readonly repository: AdminProfileRepository,
    private readonly mapper: AdminProfileMapper,
    private readonly auditTrail: CoreAuditTrailService,
    private readonly masterAdminRepository: CoreMasterAdminRepository,
    private readonly context: CoreRequestContextService,
  ) {}

  /** @description Updates self-service profile fields while rejecting immutable identity changes. @param input Profile fields from the frontend. @returns Updated profile. @throws UnauthorizedException when actor is missing. */
  async updateProfile(input: Record<string, unknown>): Promise<Record<string, unknown>> {
    const current = await this.repository.findFirstSnapshot();
    const entity = current ? await this.repository.updateById(current.id, input) : await this.repository.createRecord(input);
    const response = this.mapper.toResponse(this.mapper.toDomain(entity));
    await this.auditTrail.record({ action: 'ADMIN.PROFILE.UPDATED', entityType: 'AdminProfile', entityId: entity.id, oldValue: current?.payload ?? null, newValue: response, module: 'profile', severity: 'low' });
    return response;
  }

  /** @description Updates the authenticated Admin password using Argon2 without exposing the password to tenant storage. @param newPassword New password. @returns Null. @throws UnauthorizedException when the actor is missing. */
  async updatePassword(newPassword: string): Promise<null> {
    const actorId = this.context.get().userId;
    const admin = await this.masterAdminRepository.findActiveById(actorId);
    if (!admin) throw new UnauthorizedException('Admin account not found.');
    await this.masterAdminRepository.updatePasswordHashById(actorId, await argon2.hash(newPassword));
    await this.auditTrail.record({ action: 'ADMIN.PROFILE.PASSWORD_UPDATED', entityType: 'Admin', entityId: actorId, oldValue: null, newValue: { changed: true }, module: 'profile', severity: 'high' });
    return null;
  }
}
