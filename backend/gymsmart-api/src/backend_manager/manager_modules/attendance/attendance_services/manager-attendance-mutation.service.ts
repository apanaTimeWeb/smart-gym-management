// RESPONSIBILITY: Owns attendance mutation business operations inside a caller-provided UnitOfWork context; it never opens or commits transactions.
// FLOW: Orchestrator transaction → ManagerAttendanceMutationService → ManagerAttendanceRepository → audit log → typed domain result.
import { Injectable } from '@nestjs/common';

import { ManagerCoreAuditLogRepository } from '@/backend_manager/manager_core/manager_core_audit/manager-core-audit-log.repository';
import type { ManagerCoreTransactionContext } from '@/backend_manager/manager_core/manager_core_database/manager-core-transaction-context';
import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import { ManagerAttendanceRepository } from '@/backend_manager/manager_modules/attendance/manager-attendance.repository';
import type { AttendanceDomainData } from '@/backend_manager/manager_modules/attendance/attendance_types/manager-attendance.types';

@Injectable()
export class ManagerAttendanceMutationService {
  constructor(private readonly repository: ManagerAttendanceRepository, private readonly audit: ManagerCoreAuditLogRepository) {}

  /** @description Creates one attendance domain record and writes its audit entry within the active transaction. @param data - Validated payload. @param context - Active transaction context. @returns Created domain record. */
  async markAttendance(data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<AttendanceDomainData> {
    const row = await this.repository.markAttendance(data, context);
    await this.audit.append(context, 'MANAGER.ATTENDANCE.CREATED', 'attendance', row.id, null, row.payload);
    return row;
  }

  /** @description Updates one attendance domain record under the repository concurrency policy and writes an audit entry. @param id - Resource UUID. @param data - Validated patch. @param context - Active transaction context. @returns Updated domain record. */
  async updateAttendanceRecord(id: string, data: ManagerCoreJsonObject, context: ManagerCoreTransactionContext): Promise<AttendanceDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.updateById(id, data, context);
    await this.audit.append(context, 'MANAGER.ATTENDANCE.UPDATED', 'attendance', id, before.payload, row.payload);
    return row;
  }

  /** @description Soft-deletes one attendance domain record and writes an audit entry within the active transaction. @param id - Resource UUID. @param context - Active transaction context. @returns Soft-deleted domain record. */
  async deleteAttendanceRecord(id: string, context: ManagerCoreTransactionContext): Promise<AttendanceDomainData> {
    const before = await this.repository.findByIdOrThrow(id);
    const row = await this.repository.softDelete(id, context);
    await this.audit.append(context, 'MANAGER.ATTENDANCE.DELETED', 'attendance', id, before.payload, row.payload);
    return row;
  }

}
