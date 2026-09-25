// RESPONSIBILITY: Presents ORM-independent AdminAttendance domain data as the frontend response contract.
// FLOW: Domain object -> AdminAttendanceResponsePresenter -> typed response DTO -> canonical response envelope.
import { AdminAttendanceDomainModel } from '@/backend_admin/admin_modules/admin_attendance/attendance_domain/admin-attendance.domain'

import { AdminAttendanceSummaryDto, AdminAttendanceTrendPointDto } from '@/backend_admin/admin_modules/admin_attendance/attendance_dtos/admin-attendance-response.dto'


/**
 * @description Owns frontend response presentation for the AdminAttendance feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminAttendanceResponsePresenter {
/** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminAttendanceDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }

/** @description Maps attendance summary read-model data to its typed frontend DTO. @param domain Read-model domain object. @returns Summary response. */
  toSummaryResponse(domain: AdminAttendanceDomainModel): AdminAttendanceSummaryDto {
    if (!domain.data || typeof domain.data !== 'object') throw new Error('ATTENDANCE.SUMMARY.INVALID');
    return Object.assign(new AdminAttendanceSummaryDto(), domain.data);
  }

/** @description Maps attendance trend points from the read model into typed DTOs. @param domain Read-model domain object. @returns Trend points. */
  toTrendResponse(domain: AdminAttendanceDomainModel): AdminAttendanceTrendPointDto[] {
    if (!Array.isArray(domain.data)) return [];
    return domain.data.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object').map((item) => Object.assign(new AdminAttendanceTrendPointDto(), item));
  }
}
