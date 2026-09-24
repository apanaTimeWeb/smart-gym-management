// RESPONSIBILITY: Provides application-layer AES-256-GCM encryption for sensitive fields.
// FLOW: Service -> SuperadminCoreEncryptionService -> AES-256-GCM ciphertext -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { SuperadminCoreEncryptionConfigurationException } from '@/backend_superadmin/superadmin_core/superadmin-core.exceptions';
/**
 * Primary Intent: Defines SuperadminCoreEncryptionService as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Injectable()
export class SuperadminCoreEncryptionService {
  private readonly key: Buffer;
  constructor(config: ConfigService) { this.key = Buffer.from(config.getOrThrow<string>('app.encryptionKeyBase64'), 'base64'); if (this.key.length !== 32) throw new SuperadminCoreEncryptionConfigurationException('ENCRYPTION_KEY_BASE64 must decode to 32 bytes'); }
/**
 * Primary Intent: Executes the encrypt use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the encrypt use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  encrypt(value: string): string { const iv = randomBytes(12); const cipher = createCipheriv('aes-256-gcm', this.key, iv); const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]); return `${iv.toString('base64')}.${cipher.getAuthTag().toString('base64')}.${encrypted.toString('base64')}`; }
/**
 * Primary Intent: Executes the decrypt use case within the owning backend feature boundary.
 * Edge Cases: Invalid inputs, missing resources, authorization failures, tenant mismatches, retries, and concurrent state are handled according to the feature contract.
 * Side-Effects: Persists only through the approved repository/orchestrator path and emits declared events/jobs when the feature requires them.
 * AI-Note: Preserve the method's explicit return type, guard-clause structure, dependency isolation, and frontend-frozen contract.
 */

  /**
 * Primary Intent: Executes the decrypt use case within its owning backend boundary.
   * Edge Cases: Invalid input, missing resources, authorization failures, tenant mismatches, retries, and concurrency are handled according to the owning contract.
   * Side-Effects: Only documented persistence, cache, event, job, or external effects are permitted.
   * AI-Note: Preserve explicit return types, guard clauses, module isolation, and frozen API semantics.
   */
  decrypt(payload: string): string { const [ivRaw, tagRaw, cipherRaw] = payload.split('.'); const decipher = createDecipheriv('aes-256-gcm', this.key, Buffer.from(ivRaw, 'base64')); decipher.setAuthTag(Buffer.from(tagRaw, 'base64')); return Buffer.concat([decipher.update(Buffer.from(cipherRaw, 'base64')), decipher.final()]).toString('utf8'); }
}
