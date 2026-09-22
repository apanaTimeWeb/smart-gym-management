// RESPONSIBILITY: Exposes validated strongly typed configuration without raw environment access in business modules.
// FLOW: ConfigModule validation → CoreConfigService → infrastructure consumers.

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CORE_DATABASE_POOL_CONFIG } from '@/backend_trainer/core/config/core-timeout.config';

interface CoreDatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  extra: { max: number; connectionTimeoutMillis: number; idleTimeoutMillis: number; statement_timeout: number };
}

@Injectable()
export class CoreConfigService {
  constructor(private readonly config: ConfigService) {}

  /** Returns the validated runtime environment. */
  getNodeEnv(): string { return this.config.getOrThrow<string>('NODE_ENV'); }
  /** Returns validated master database connection settings. */
  getMasterDatabase(): CoreDatabaseConfig {
    return { host: this.config.getOrThrow<string>('MASTER_DB_HOST'), port: this.config.getOrThrow<number>('MASTER_DB_PORT'), database: this.config.getOrThrow<string>('MASTER_DB_NAME'), username: this.config.getOrThrow<string>('MASTER_DB_USER'), password: this.config.getOrThrow<string>('MASTER_DB_PASSWORD'), extra: { max: CORE_DATABASE_POOL_CONFIG.max, connectionTimeoutMillis: CORE_DATABASE_POOL_CONFIG.acquireTimeoutMs, idleTimeoutMillis: CORE_DATABASE_POOL_CONFIG.idleTimeoutMillis, statement_timeout: 3000 } };
  }
  /** Returns validated tenant database connection settings without a database name. */
  getTenantDatabase(): Omit<CoreDatabaseConfig, 'database'> {
    return { host: this.config.getOrThrow<string>('TENANT_DB_HOST'), port: this.config.getOrThrow<number>('TENANT_DB_PORT'), username: this.config.getOrThrow<string>('TENANT_DB_USER'), password: this.config.getOrThrow<string>('TENANT_DB_PASSWORD'), extra: { max: this.getTenantPoolMax(), connectionTimeoutMillis: CORE_DATABASE_POOL_CONFIG.acquireTimeoutMs, idleTimeoutMillis: CORE_DATABASE_POOL_CONFIG.idleTimeoutMillis, statement_timeout: 3000 } };
  }
  /** Returns the per-tenant pool maximum. */
  getTenantPoolMax(): number { return this.config.getOrThrow<number>('TENANT_DB_POOL_MAX'); }
  /** Returns the global aggregate connection budget across all tenant pools. */
  getTenantTotalPoolMax(): number { return this.config.getOrThrow<number>('TENANT_DB_POOL_TOTAL_MAX'); }
  /** Returns Redis transport settings. */
  getRedis(): { host: string; port: number } { return { host: this.config.getOrThrow<string>('REDIS_HOST'), port: this.config.getOrThrow<number>('REDIS_PORT') }; }
  /** Returns JWT signing settings. */
  getJwt(): { secret: string; issuer: string; audience: string } { return { secret: this.config.getOrThrow<string>('JWT_SECRET'), issuer: this.config.getOrThrow<string>('JWT_ISSUER'), audience: this.config.getOrThrow<string>('JWT_AUDIENCE') }; }
  /** Returns configured API prefix. */
  getApiPrefix(): string { return this.config.getOrThrow<string>('API_PREFIX'); }
  /** Returns configured port. */
  getPort(): number { return this.config.getOrThrow<number>('PORT'); }
  /** Returns exact configured CORS origins. */
  getCorsOrigins(): string[] { return this.config.getOrThrow<string>('CORS_ORIGINS').split(',').map((value: string) => value.trim()).filter(Boolean); }
  /** Returns whether OpenTelemetry is enabled. */
  getOtelEnabled(): boolean { return this.config.getOrThrow<boolean>('OTEL_ENABLED'); }
  /** Returns the optional OTLP endpoint. */
  getOtelEndpoint(): string { return this.config.getOrThrow<string>('OTEL_EXPORTER_OTLP_ENDPOINT'); }
}
