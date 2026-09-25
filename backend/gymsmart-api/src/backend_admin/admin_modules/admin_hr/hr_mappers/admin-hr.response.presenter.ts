// RESPONSIBILITY: Presents ORM-independent AdminHr domain data as the frontend response contract.
// FLOW: Domain object -> AdminHrResponsePresenter -> typed response DTO -> canonical response envelope.
import { Injectable } from '@nestjs/common';

import { AdminHrDomainModel } from '@/backend_admin/admin_modules/admin_hr/hr_domain/admin-hr.domain.js';

import { AdminHrStaffDto, AdminHrPayrollListResponseDto, AdminHrStaffListResponseDto, AdminHrSummaryDto, AdminHrLedgerEntryDto, AdminHrStaffPerformanceRecordDto } from '@/backend_admin/admin_modules/admin_hr/hr_dtos/admin-hr-response.dto.js';


/**
 * @description Owns frontend response presentation for the AdminHr feature.
 * @remarks This class must receive domain objects only and must never import or expose ORM entities.
 */
export class AdminHrResponsePresenter {
/** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminHrDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }

/** @description Maps staff rows from the read model into the typed frontend response. @param domain Read-model domain object. @returns Staff list response. */
  toStaffListResponse(domain: AdminHrDomainModel): AdminHrStaffListResponseDto {
    const staff = Array.isArray(domain.data.staff) ? domain.data.staff.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object').map((item) => Object.assign(new AdminHrStaffDto(), item)) : [];
    return Object.assign(new AdminHrStaffListResponseDto(), { staff, total: staff.length });
  }

/** @description Maps payroll rows from the read model into the typed frontend response. @param domain Read-model domain object. @returns Payroll list response. */
  toPayrollListResponse(domain: AdminHrDomainModel): AdminHrPayrollListResponseDto {
    const payrolls = Array.isArray(domain.data.payrolls) ? domain.data.payrolls.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object').map((item) => Object.assign({}, item)) : [];
    return Object.assign(new AdminHrPayrollListResponseDto(), { payrolls, total: payrolls.length });
  }

/** @description Maps HR summary read-model data into the typed response. @param domain Read-model domain object. @returns Summary response. */
  toSummaryResponse(domain: AdminHrDomainModel): AdminHrSummaryDto {
    if (!domain.data.summary || typeof domain.data.summary !== 'object') throw new Error('HR.SUMMARY.INVALID');
    return Object.assign(new AdminHrSummaryDto(), domain.data.summary);
  }

/** @description Maps payroll ledger entries from the read model into typed DTOs. @param domain Read-model domain object. @returns Ledger entries. */
  toLedgerResponse(domain: AdminHrDomainModel): AdminHrLedgerEntryDto[] {
    if (!Array.isArray(domain.data.ledger)) return [];
    return domain.data.ledger.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object').map((item) => Object.assign(new AdminHrLedgerEntryDto(), item));
  }

/** @description Maps staff performance records from the read model into typed DTOs. @param domain Read-model domain object. @returns Performance records. */
  toPerformanceResponse(domain: AdminHrDomainModel): AdminHrStaffPerformanceRecordDto[] {
    if (!Array.isArray(domain.data.performance)) return [];
    return domain.data.performance.filter((item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object').map((item) => Object.assign(new AdminHrStaffPerformanceRecordDto(), item));
  }
}
