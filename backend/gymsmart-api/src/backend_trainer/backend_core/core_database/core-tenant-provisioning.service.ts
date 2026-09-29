// RESPONSIBILITY: Provisions a logical tenant database and applies all versioned tenant migrations safely.
// FLOW: Master tenant metadata → validated CREATE DATABASE → tenant DataSource → migrations.
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CoreDomainException } from '@/backend_trainer/backend_core/core_errors/core-domain.exception';
import { CoreConfigService } from '@/backend_trainer/backend_core/core_config/core-config.service';
import { CoreTenantSchemaMigration } from '@/backend_trainer/backend_core/core_database/core-tenant-schema.migration';
import { CoreTenantSchemaRepair20260922Migration } from '@/backend_trainer/backend_core/core_database/core-tenant-schema-repair-2026-09-22.migration';
import { CoreTenantSchemaRepair20260923Migration } from '@/backend_trainer/backend_core/core_database/core-tenant-schema-repair-2026-09-23.migration';
import { CoreTenantEnumNormalization20260923Migration } from '@/backend_trainer/backend_core/core_database/core-tenant-enum-normalization-2026-09-23.migration';
import { CoreTrainerSessionRecurrenceEndDate20260924Migration } from '@/backend_trainer/backend_core/core_database/core-trainer-session-recurrence-end-date-2026-09-24.migration';
/**
 * Intent: Defines the CoreTenantProvisioningService boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreTenantProvisioningService {
  constructor(@InjectDataSource() private readonly master: DataSource, private readonly config: CoreConfigService) {}
  /** Creates a tenant database from a validated name and applies every pending versioned migration. */
  /**
 * Intent: Executes the provisionTenant operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes provisionTenant inside the owning backend service/repository boundary without exposing ORM details.
 * @param databaseName - Input for provisionTenant.
 * @returns {Promise<void>} The typed result defined by the owning contract.
 * @throws CoreDomainException when the operation rejects its explicit business preconditions.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
async provisionTenant(databaseName: string): Promise<void> {
    if (!/^tenant_db_[a-z0-9_]+$/.test(databaseName)) throw new CoreDomainException('CORE.TENANT_DATABASE.NAME_INVALID');
    await this.createDatabaseIfMissing(databaseName);
    const dataSource = new DataSource({ type: 'postgres', ...this.config.getTenantDatabase(), database: databaseName, entities: [], migrations: [CoreTenantSchemaMigration, CoreTenantSchemaRepair20260922Migration, CoreTenantSchemaRepair20260923Migration, CoreTenantEnumNormalization20260923Migration, CoreTrainerSessionRecurrenceEndDate20260924Migration], synchronize: false });
    await dataSource.initialize();
    try { await dataSource.runMigrations(); } finally { await dataSource.destroy(); }
  }
  /** Creates the tenant database once; the validated naming policy prevents identifier injection. */
  /**
 * Intent: Executes the createDatabaseIfMissing operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes createDatabaseIfMissing inside the owning backend service/repository boundary without exposing ORM details.
 * @param databaseName - Input for createDatabaseIfMissing.
 * @returns {Promise<void>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
private async createDatabaseIfMissing(databaseName: string): Promise<void> {
    try {
      await this.master.query(`CREATE DATABASE "${databaseName}"`);
    } catch (error: unknown) {
      if (!String(error).includes('already exists')) throw error;
    }
  }
}
