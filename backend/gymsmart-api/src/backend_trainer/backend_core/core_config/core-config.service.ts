// RESPONSIBILITY: Exposes validated strongly typed configuration without raw environment access in business modules.
// FLOW: ConfigModule validation → CoreConfigService → infrastructure consumers.
import { Injectable } from '@nestjs/common';
import type { CoreDatabaseConfig } from '@/backend_trainer/backend_core/core_config/core_config_types/core-database-config.types';
import { ConfigService } from '@nestjs/config';
import { CORE_DATABASE_POOL_CONFIG, CORE_TIMEOUTS } from '@/backend_trainer/backend_core/core_config/core-timeout.config';
/**
 * Intent: Defines the CoreConfigService boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreConfigService {
  constructor(private readonly config: ConfigService) {}
  /** Returns the validated runtime environment. */
  /**
 * Intent: Executes the getNodeEnv operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes getNodeEnv inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {string} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
getNodeEnv(): string { return this.config.getOrThrow<string>('NODE_ENV'); }
  /** Returns the validated 32-byte hex field-encryption key. */
  /**
 * Intent: Executes the getFieldEncryptionKey operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes getFieldEncryptionKey inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {string} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
getFieldEncryptionKey(): string { return this.config.getOrThrow<string>('FIELD_ENCRYPTION_KEY'); }
  /** Returns validated master database connection settings. */
  /**
 * Intent: Executes the getMasterDatabase operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes getMasterDatabase inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {CoreDatabaseConfig} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
getMasterDatabase(): CoreDatabaseConfig {
    return { host: this.config.getOrThrow<string>('MASTER_DB_HOST'), port: this.config.getOrThrow<number>('MASTER_DB_PORT'), database: this.config.getOrThrow<string>('MASTER_DB_NAME'), username: this.config.getOrThrow<string>('MASTER_DB_USER'), password: this.config.getOrThrow<string>('MASTER_DB_PASSWORD'), extra: { max: CORE_DATABASE_POOL_CONFIG.max, connectionTimeoutMillis: CORE_DATABASE_POOL_CONFIG.acquireTimeoutMs, idleTimeoutMillis: CORE_DATABASE_POOL_CONFIG.idleTimeoutMillis, statement_timeout: CORE_TIMEOUTS.databaseMs } };
  }
  /** Returns validated tenant database connection settings without a database name. */
  /**
 * Intent: Executes the getTenantDatabase operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes getTenantDatabase inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {Omit<CoreDatabaseConfig, 'database'>} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
getTenantDatabase(): Omit<CoreDatabaseConfig, 'database'> {
    return { host: this.config.getOrThrow<string>('TENANT_DB_HOST'), port: this.config.getOrThrow<number>('TENANT_DB_PORT'), username: this.config.getOrThrow<string>('TENANT_DB_USER'), password: this.config.getOrThrow<string>('TENANT_DB_PASSWORD'), extra: { max: this.getTenantPoolMax(), connectionTimeoutMillis: CORE_DATABASE_POOL_CONFIG.acquireTimeoutMs, idleTimeoutMillis: CORE_DATABASE_POOL_CONFIG.idleTimeoutMillis, statement_timeout: CORE_TIMEOUTS.databaseMs } };
  }
  /** Returns the per-tenant pool maximum. */
  /**
 * Intent: Executes the getTenantPoolMax operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes getTenantPoolMax inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {number} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
getTenantPoolMax(): number { return this.config.getOrThrow<number>('TENANT_DB_POOL_MAX'); }
  /** Returns the global aggregate connection budget across all tenant pools. */
  /**
 * Intent: Executes the getTenantTotalPoolMax operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes getTenantTotalPoolMax inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {number} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
getTenantTotalPoolMax(): number { return this.config.getOrThrow<number>('TENANT_DB_POOL_TOTAL_MAX'); }
  /** Returns Redis transport settings. */
  /**
 * Intent: Executes the getRedis operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes getRedis inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {{ host: string; port: number }} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
getRedis(): { host: string; port: number } { return { host: this.config.getOrThrow<string>('REDIS_HOST'), port: this.config.getOrThrow<number>('REDIS_PORT') }; }
  /** Returns JWT signing settings. */
  /**
 * Intent: Executes the getJwt operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes getJwt inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {{ secret: string; issuer: string; audience: string }} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
getJwt(): { secret: string; issuer: string; audience: string } { return { secret: this.config.getOrThrow<string>('JWT_SECRET'), issuer: this.config.getOrThrow<string>('JWT_ISSUER'), audience: this.config.getOrThrow<string>('JWT_AUDIENCE') }; }
  /** Returns configured API prefix. */
  /**
 * Intent: Executes the getApiPrefix operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes getApiPrefix inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {string} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
getApiPrefix(): string { return this.config.getOrThrow<string>('API_PREFIX'); }
  /** Returns configured port. */
  /**
 * Intent: Executes the getPort operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes getPort inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {number} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
getPort(): number { return this.config.getOrThrow<number>('PORT'); }
  /** Returns exact configured CORS origins. */
  /**
 * Intent: Executes the getCorsOrigins operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes getCorsOrigins inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {string[]} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
getCorsOrigins(): string[] { return this.config.getOrThrow<string>('CORS_ORIGINS').split(',').map((value: string) => value.trim()).filter(Boolean); }
  /** Returns the centrally configured ISO 4217 currency code used by financial response projections. */
  /**
 * Intent: Executes the getDefaultCurrencyCode operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes getDefaultCurrencyCode inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {string} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
getDefaultCurrencyCode(): string { return this.config.getOrThrow<string>('DEFAULT_CURRENCY_CODE'); }
  /** Returns whether OpenTelemetry is enabled. */
  /**
 * Intent: Executes the getOtelEnabled operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes getOtelEnabled inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {boolean} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
getOtelEnabled(): boolean { return this.config.getOrThrow<boolean>('OTEL_ENABLED'); }
  /** Returns the optional OTLP endpoint. */
  /**
 * Intent: Executes the getOtelEndpoint operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes getOtelEndpoint inside the owning backend service/repository boundary without exposing ORM details.
 * @returns {string} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
getOtelEndpoint(): string { return this.config.getOrThrow<string>('OTEL_EXPORTER_OTLP_ENDPOINT'); }
}
