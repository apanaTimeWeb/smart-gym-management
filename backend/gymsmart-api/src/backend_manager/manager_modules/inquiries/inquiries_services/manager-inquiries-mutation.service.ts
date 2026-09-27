// RESPONSIBILITY: Owns inquiries mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerInquiriesMutationService → ManagerInquiriesRepository → audit log → typed domain result.
import { HttpStatus, Injectable } from '@nestjs/common';

import { ManagerCoreBusinessException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-business.exception';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerInquiriesRepository } from '@/backend_manager/manager_modules/inquiries/manager-inquiries.repository';
import { ManagerCoreMemberCreationRegistry } from '@/backend_manager/manager_core/manager-core-member-creation.registry';
import type { InquiriesDomainData } from '@/backend_manager/manager_modules/inquiries/inquiries_types/manager-inquiries.types';

@Injectable()
export class ManagerInquiriesMutationService {
  constructor(private readonly repository: ManagerInquiriesRepository, private readonly audit: ManagerCoreAuditLogRepository, private readonly memberCreation: ManagerCoreMemberCreationRegistry) {}

  /** @description Creates one inquiries domain record and writes its audit entry within the active transaction. @param data - Validated payload. @param context - Active transaction context. @returns Created domain record. */
  async createInquiry(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<InquiriesDomainData> {
    const row = await this.repository.createInquiry(data, context);
    await this.audit.append(context, 'MANAGER.INQUIRIES.CREATED', 'inquiries', row.id, null, row.payload);
    return row;
  }

  /** @description Updates one inquiries domain record under the repository concurrency policy and writes an audit entry. @param id - Resource UUID. @param data - Validated patch. @param context - Active transaction context. @returns Updated domain record. */
  async updateInquiry(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<InquiriesDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updateById(id, data, context);
    await this.audit.append(context, 'MANAGER.INQUIRIES.UPDATED', 'inquiries', id, before.payload, row.payload);
    return row;
  }

  /** @description Converts an inquiry into a member atomically in one transaction context. @param id - Inquiry UUID. @param data - Validated member creation payload. @param context - Active transaction context. @returns Updated inquiry carrying conversion metadata. */
  async convertLead(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<{ memberId: string; inquiry: InquiriesDomainData }> {
    const before = await this.repository.findByIdOrThrow(id);
    if (before.payload.status === 'CONVERTED' || before.payload.memberId) {
      throw new ManagerCoreBusinessException('inquiries.ERRORS.LEAD_ALREADY_CONVERTED', 'INQUIRIES.LEAD.ALREADY_CONVERTED', HttpStatus.CONFLICT);
    }
    const member = await this.memberCreation.create(data, context);
    const inquiry = await this.repository.updateById(id, { status: 'CONVERTED', memberId: member.id }, context);
    await this.audit.append(context, 'MANAGER.INQUIRIES.CONVERTED', 'inquiries', id, before.payload, { ...inquiry.payload, memberId: member.id });
    return { memberId: member.id, inquiry };
  }

  /** @description Soft-deletes one inquiries domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deleteInquiry(id: string, context: ManagerCoreTransactionContext): Promise<InquiriesDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.softDelete(id, context);
    await this.audit.append(context, 'MANAGER.INQUIRIES.DELETED', 'inquiries', id, before.payload, row.payload);
    return row;
  }

}
