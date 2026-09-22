// RESPONSIBILITY: Typed configuration facade; business code does not read process.env directly.
// FLOW: ConfigModule -> CoreConfigService getters -> infrastructure consumers.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CoreConfigService {
  constructor(private readonly config: ConfigService) {}

  /** @description Returns server port. @returns HTTP port. */
  get port(): number { return this.config.getOrThrow<number>('PORT'); }
  /** @description Returns master DB URL. @returns PostgreSQL connection URL. */
  get masterDatabaseUrl(): string { return this.config.getOrThrow<string>('MASTER_DATABASE_URL'); }
  /** @description Returns trusted frontend origins. @returns Origin allowlist. */
  get trustedFrontendOrigins(): string[] { return this.config.getOrThrow<string>('TRUSTED_FRONTEND_ORIGINS').split(',').map((value) => value.trim()).filter(Boolean); }
  /** @description Returns tenant DB host. @returns Host. */
  get tenantDbHost(): string { return this.config.getOrThrow<string>('TENANT_DB_HOST'); }
  /** @description Returns tenant DB port. @returns Port. */
  get tenantDbPort(): number { return this.config.getOrThrow<number>('TENANT_DB_PORT'); }
  /** @description Returns tenant DB user. @returns Username. */
  get tenantDbUser(): string { return this.config.getOrThrow<string>('TENANT_DB_USER'); }
  /** @description Returns tenant DB password. @returns Password. */
  get tenantDbPassword(): string { return this.config.getOrThrow<string>('TENANT_DB_PASSWORD'); }
  /** @description Returns tenant DB name prefix. @returns Validated database-name prefix. */
  get tenantDbPrefix(): string { return this.config.getOrThrow<string>('TENANT_DB_PREFIX'); }
  /** @description Returns tenant cache capacity. @returns Maximum cached DataSources. */
  get tenantDbMaxCached(): number { return this.config.getOrThrow<number>('TENANT_DB_MAX_CACHED'); }
  /** @description Returns aggregate tenant connection budget. @returns Maximum combined pool size budget. */
  get tenantPoolBudget(): number { return this.config.getOrThrow<number>('TENANT_DB_POOL_BUDGET'); }
  /** @description Returns tenant connection idle timeout. @returns Milliseconds. */
  get tenantDbIdleTimeoutMs(): number { return this.config.getOrThrow<number>('TENANT_DB_IDLE_TIMEOUT_MS'); }
  /** @description Returns tenant acquire timeout. @returns Milliseconds. */
  get tenantDbAcquireTimeoutMs(): number { return this.config.getOrThrow<number>('TENANT_DB_ACQUIRE_TIMEOUT_MS'); }
  /** @description Returns Redis URL. @returns Redis URL. */
  get redisUrl(): string { return this.config.getOrThrow<string>('REDIS_URL'); }
  /** @description Returns AES-256 application encryption key. @returns Base64-encoded 32-byte key. */
  get dataEncryptionKeyBase64(): string { return this.config.getOrThrow<string>('DATA_ENCRYPTION_KEY_BASE64'); }
  /** @description Returns JWT access secret. @returns Access secret. */
  get jwtAccessSecret(): string { return this.config.getOrThrow<string>('JWT_ACCESS_SECRET'); }
}
