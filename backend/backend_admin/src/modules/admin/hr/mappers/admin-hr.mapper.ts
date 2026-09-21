// RESPONSIBILITY: Translates the TypeORM Admin hr entity into an ORM-independent domain model and frontend response.
// FLOW: AdminHrEntity → AdminHrMapper → domain/response object.

import { Injectable } from '@nestjs/common';
import { CoreEncryptionService } from '@/core/security/core-encryption.service';
import { AdminHrDomainModel } from '@/modules/admin/hr/domain/admin-hr.domain';
import { AdminHrEntity } from '@/modules/admin/hr/entities/admin-hr-entity';

@Injectable()
export class AdminHrMapper {
  constructor(private readonly encryption: CoreEncryptionService) {}
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

  /** @description Converts a domain model to a frontend response object. @param domain Domain model. @returns Response-safe object. */
  toResponse(domain: AdminHrDomainModel): Record<string, unknown> {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      ...domain.data,
    };
  }
}
