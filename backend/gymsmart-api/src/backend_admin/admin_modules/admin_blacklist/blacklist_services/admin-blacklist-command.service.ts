// RESPONSIBILITY: Owns write-side use cases for Admin blacklist; persistence remains behind the feature repository.
// FLOW: AdminBlacklistCommandController -> AdminBlacklistCommandService -> named repository mutation -> audit trail.
import { Injectable } from '@nestjs/common';

import { AdminCoreAuditTrailService } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit-trail.service.js';
import { AdminCoreAuditSeverity } from '@/backend_admin/admin_core/admin_core_audit/admin-core-audit.constants.js';

import { AdminBlacklistMutationDto } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_dtos/admin-blacklist-mutation.dto.js';
import { AdminBlacklistedMemberDto } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_dtos/admin-blacklist-response.dto.js';
import { AdminBlacklistResponsePresenter } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_mappers/admin-blacklist.response.presenter.js';
import { AdminBlacklistRepository } from '@/backend_admin/admin_modules/admin_blacklist/blacklist_repositories/admin-blacklist-repository.js';

@Injectable()
/**
 * @description Defines the AdminBlacklistCommandService boundary for the admin_blacklist backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminBlacklistCommandService {
  constructor(
    private readonly repository: AdminBlacklistRepository,
    private readonly presenter: AdminBlacklistResponsePresenter,
    private readonly auditTrail: AdminCoreAuditTrailService
  ) {}

  /**
   * @description Executes the addToBlacklist mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<AdminBlacklistedMemberDto> frontend-facing result.
   */
  async createRecord(input: AdminBlacklistMutationDto): Promise<AdminBlacklistedMemberDto> {
    const entity = await this.repository.createRecord(input);
    return this.createResponse(entity, 'CREATED');
  }

  /**
   * @description Executes the removeFromBlacklist mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async deleteBlacklist(id: string): Promise<null> {
    await this.repository.deleteBlacklist(id);
    await this.createAudit(id, 'DELETED', { deleted: true });
    return null;
  }

  /**
   * @description Executes the toggleBlacklist mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<AdminBlacklistedMemberDto> frontend-facing result.
   */
  async updateActiveById(id: string): Promise<AdminBlacklistedMemberDto> {
    const entity = await this.repository.updateActiveById(id);
    return this.createResponse(entity, 'STATUS_TOGGLED');
  }

  /**
   * @description Executes the propagateToAllBranches mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<AdminBlacklistedMemberDto> frontend-facing result.
   */
  async updatePropagationById(id: string): Promise<AdminBlacklistedMemberDto> {
    const entity = await this.repository.updatePropagationById(id);
    return this.createResponse(entity, 'PROPAGATED');
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async createResponse(entity: Awaited<ReturnType<AdminBlacklistRepository['findByIdOrThrow']>>, action: string): Promise<AdminBlacklistedMemberDto> {
    const response = this.presenter.toResponse(entity as any) as any;
    await this.createAudit(entity.id, action, response);
    return response;
  }

  /**
   * @description Persists an immutable audit record for the current feature mutation.
   * @param entityId Changed record UUID.
   * @param action Audit action.
   * @param newValue New-state summary.
   * @returns Audit record UUID.
   */
  private async createAudit(entityId: string, action: string, newValue: Record<string, unknown>): Promise<string> {
    return this.auditTrail.record({ action: `ADMIN_${action}`, entityType: 'AdminFeature', entityId, newValue, severity: AdminCoreAuditSeverity.LOW, module: 'blacklist' });
  }
}
