// RESPONSIBILITY: Owns the attendance transaction boundary and post-commit lifecycle-event emission; no direct repository access or business logic.
// FLOW: Controller-facing service → UnitOfWork → ManagerAttendanceMutationService → repository → commit → event registry.
import { Injectable } from '@nestjs/common';

import { ManagerCoreUnitOfWorkService } from '@/backend_manager/manager_core/manager_core_database/manager-core-unit-of-work.service';
import { ManagerCoreEventRegistry } from '@/backend_manager/manager_core/manager_core_events/manager-core-event-registry.constants';
import { ManagerCoreEventService } from '@/backend_manager/manager_core/manager_core_events/manager-core-event.service';
import { ManagerCoreContextException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-context.exception';
import { ManagerAttendanceMutationService } from '@/backend_manager/manager_modules/attendance/attendance_services/manager-attendance-mutation.service';

import type { ManagerCoreJsonObject } from '@/backend_manager/manager_core/manager_core_types/manager-core-json-value.types';
import type { ManagerAttendanceDomainData } from '@/backend_manager/manager_modules/attendance/attendance_types/manager-attendance.types';

@Injectable()
export class ManagerAttendanceOrchestratorService {
  constructor(private readonly uow: ManagerCoreUnitOfWorkService, private readonly events: ManagerCoreEventService, private readonly mutation: ManagerAttendanceMutationService) {}

  /** @description Executes create inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated payload. @returns Created domain record. */
  async markAttendance(data: ManagerCoreJsonObject): Promise<ManagerAttendanceDomainData> {
    let result: ManagerAttendanceDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.markAttendance(data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_ATTENDANCE_CREATED, { feature: 'attendance', id: result.id });
    return result;
  }

  /** @description Executes update inside a UnitOfWork and emits the committed lifecycle event. @param data - Validated patch. @param id - Resource UUID. @returns Updated domain record. */
  async updateAttendanceRecord(data: ManagerCoreJsonObject, id?: string): Promise<ManagerAttendanceDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ManagerAttendanceDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.updateAttendanceRecord(id, data, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_ATTENDANCE_UPDATED, { feature: 'attendance', id });
    return result;
  }

  /** @description Executes soft delete inside a UnitOfWork and emits the committed lifecycle event. @param id - Resource UUID. @returns Soft-deleted domain record. */
  async deleteAttendanceRecord(id?: string): Promise<ManagerAttendanceDomainData> {
    if (!id) throw new ManagerCoreContextException('Resource id is required', 'CORE.RESOURCE.ID_REQUIRED');
    let result: ManagerAttendanceDomainData | undefined;
    await this.uow.run(async (context) => { result = await this.mutation.deleteAttendanceRecord(id, context); });
    if (!result) throw new ManagerCoreContextException('Mutation completed without a result.', 'CORE.TRANSACTION.NO_RESULT');
    this.events.emit(ManagerCoreEventRegistry.MANAGER_ATTENDANCE_DELETED, { feature: 'attendance', id });
    return result;
  }
}

export { ManagerAttendanceOrchestratorService as AttendanceOrchestratorService };
