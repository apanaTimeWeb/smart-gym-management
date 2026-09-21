// RESPONSIBILITY: Owns write-side use cases for Admin blacklist; persistence remains behind the feature repository.
// FLOW: AdminBlacklistCommandController -> AdminBlacklistCommandService -> named repository mutation -> audit trail.

import { Injectable } from '@nestjs/common';
import { CoreAuditTrailService } from '@/backend_admin/core/audit/core-audit-trail.service';
import { AdminBlacklistRepository } from '@/backend_admin/modules/admin/blacklist/repositories/admin-blacklist-repository';
import { AdminBlacklistMapper } from '@/backend_admin/modules/admin/blacklist/mappers/admin-blacklist.mapper';
import { AdminBlacklistedMemberDto } from '@/backend_admin/modules/admin/blacklist/dtos/admin-blacklist-response.dto';
import { AdminBlacklistMutationDto } from '@/backend_admin/modules/admin/blacklist/dtos/admin-blacklist-mutation.dto';

@Injectable()
export class AdminBlacklistCommandService {
  constructor(
    private readonly repository: AdminBlacklistRepository,
    private readonly mapper: AdminBlacklistMapper,
    private readonly auditTrail: CoreAuditTrailService
  ) {}

  /**
   * @description Executes the addToBlacklist mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<AdminBlacklistedMemberDto> frontend-facing result.
   */
  async createRecord(input: AdminBlacklistMutationDto): Promise<AdminBlacklistedMemberDto> {
    const entity = await this.repository.createRecord(input as Record<string, unknown>);
    return this.response(entity, 'CREATED');
  }

  /**
   * @description Executes the removeFromBlacklist mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<null> frontend-facing result.
   */
  async markAsDeleted(id: string): Promise<null> {
    await this.repository.markAsDeleted(id);
    await this.audit(id, 'DELETED', { deleted: true });
    return null;
  }

  /**
   * @description Executes the toggleBlacklist mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<AdminBlacklistedMemberDto> frontend-facing result.
   */
  async toggleActiveById(id: string): Promise<AdminBlacklistedMemberDto> {
    const entity = await this.repository.toggleActiveById(id);
    return this.response(entity, 'STATUS_TOGGLED');
  }

  /**
   * @description Executes the propagateToAllBranches mutation through the repository boundary.
   * @param input Validated mutation input and/or identifier.
   * @returns Promise<AdminBlacklistedMemberDto> frontend-facing result.
   */
  async propagateById(id: string): Promise<AdminBlacklistedMemberDto> {
    const entity = await this.repository.propagateById(id);
    return this.response(entity, 'PROPAGATED');
  }

  /**
   * @description Maps the persisted entity, writes its mutation audit event, and returns frontend-safe data.
   * @param entity Persisted entity.
   * @param action Mutation action.
   * @returns Frontend response object.
   */
  private async response(entity: Parameters<AdminBlacklistMapper['toDomain']>[0], action: string): Promise<AdminBlacklistedMemberDto> {
    const response = this.mapper.toResponse(this.mapper.toDomain(entity)) as unknown as AdminBlacklistedMemberDto;
    await this.audit(entity.id, action, response as any);
    return response;
  }

  /**
   * @description Persists an immutable audit record for the current feature mutation.
   * @param entityId Changed record UUID.
   * @param action Audit action.
   * @param newValue New-state summary.
   * @returns Audit record UUID.
   */
  private async audit(entityId: string, action: string, newValue: Record<string, unknown>): Promise<string> {
    return this.auditTrail.record({ action: `ADMIN_${action}`, entityType: 'AdminFeature', entityId, oldValue: null, newValue, ipAddress: null, severity: 'low', module: 'Members' });
  }
}
