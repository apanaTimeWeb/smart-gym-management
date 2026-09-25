// RESPONSIBILITY: Translates the TypeORM Admin hr entity into an ORM-independent domain model and frontend response.
// FLOW: AdminHrEntity â†’ AdminHrMapper â†’ domain/response object.
import { Injectable } from '@nestjs/common';

import { AdminCoreEncryptionService } from '@/backend_admin/admin_core/admin_core_security/admin-core-encryption.service.js';

import { AdminHrDomainModel } from '@/backend_admin/admin_modules/admin_hr/hr_domain/admin-hr.domain.js';

import { AdminHrStaffDto, AdminHrPayrollListResponseDto, AdminHrStaffListResponseDto, AdminHrSummaryDto, AdminHrLedgerEntryDto, AdminHrStaffPerformanceRecordDto } from '@/backend_admin/admin_modules/admin_hr/hr_dtos/admin-hr-response.dto.js';

import { AdminHrEntity } from '@/backend_admin/admin_modules/admin_hr/hr_entities/admin-hr-entity.js';

/**
 * @description Owns the ORM-to-domain translation boundary for AdminHr.
 * @remarks This persistence mapper is called only by the owning repository; response presentation belongs to the paired presenter.
 */
export class AdminHrMapper {
constructor(private readonly encryption: AdminCoreEncryptionService) {}

/** @description Converts the persistence entity to a domain object. @param entity Stored entity. @returns ORM-independent domain model. */
  toDomain(entity: AdminHrEntity): AdminHrDomainModel {
    return {
      id: entity.id,
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
      name: entity.name,
      status: entity.status,
      data: this.restoreSensitivePayload(entity.payload),
    };
  }

/** @description Restores encrypted HR fields for an authorized Admin response without storing plaintext at rest. @param payload Stored payload. @returns API-ready payload. */
  private restoreSensitivePayload(payload: Record<string, unknown>): Record<string, unknown> {
    const restored = { ...payload };
    for (const field of ['aadhaar', 'bankAccountNumber', 'medicalNotes']) {
      const value = restored[field];
      if (typeof value === 'string' && this.encryption.isEncrypted(value)) {
        try { restored[field] = this.encryption.decrypt(value); } catch { restored[field] = undefined; }
      }
    }
    return restored;
  }
}
