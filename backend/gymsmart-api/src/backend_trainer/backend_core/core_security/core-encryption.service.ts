// RESPONSIBILITY: Encrypts sensitive Trainer data at rest with authenticated AES-256-GCM.
// FLOW: Domain mutation → CoreEncryptionService → ciphertext persisted → decrypt on read.
import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';
import { CoreConfigService } from '@/backend_trainer/backend_core/core_config/core-config.service';
import { CoreEncryptionKeyRegistry } from '@/backend_trainer/backend_core/core_security/core-encryption-key.registry';
/**
 * Intent: Defines the CoreEncryptionService boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Injectable()
export class CoreEncryptionService {
  constructor(config: CoreConfigService) {
    CoreEncryptionKeyRegistry.configure(config.getFieldEncryptionKey());
  }
  /** Encrypts a nullable string using the configured AES-256-GCM key. */
  /**
 * Intent: Executes the encrypt operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes encrypt inside the owning backend service/repository boundary without exposing ORM details.
 * @param value - Input for encrypt.
 * @returns {string | null} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
encrypt(value: string | null): string | null {
    if (value == null) return null;
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', CoreEncryptionKeyRegistry.getKey(), iv);
    const ciphertext = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
    return `v1:${iv.toString('base64url')}:${cipher.getAuthTag().toString('base64url')}:${ciphertext.toString('base64url')}`;
  }
  /** Decrypts a nullable AES-256-GCM ciphertext. */
  /**
 * Intent: Executes the decrypt operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes decrypt inside the owning backend service/repository boundary without exposing ORM details.
 * @param value - Input for decrypt.
 * @returns {string | null} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
decrypt(value: string | null): string | null {
    if (value == null) return null;
    if (!value.startsWith('v1:')) return value;
    const [, iv, tag, ciphertext] = value.split(':');
    const decipher = createDecipheriv('aes-256-gcm', CoreEncryptionKeyRegistry.getKey(), Buffer.from(iv, 'base64url'));
    decipher.setAuthTag(Buffer.from(tag, 'base64url'));
    return Buffer.concat([decipher.update(Buffer.from(ciphertext, 'base64url')), decipher.final()]).toString('utf8');
  }
  /** Hashes a value for non-reversible equality checks. */
  /**
 * Intent: Executes the hash operation inside the backend core service boundary.
 * Edge Cases: Preserve validation, ownership checks, transactions, idempotency, canonical errors, and side-effects across every success and failure path.
 * AI Note: Keep the method focused on its use case; do not add raw ORM access, cross-module shortcuts, or silent API changes.
 */
/**
 * @description Executes hash inside the owning backend service/repository boundary without exposing ORM details.
 * @param value - Input for hash.
 * @returns {string} The typed result defined by the owning contract.
 * @throws Infrastructure or canonical application exceptions propagated by the owning boundary.
 * @remarks Preserve tenant isolation, frozen API semantics, transaction behavior, and mapper/repository boundaries.
 * AI Note: Do not move ORM access into services, introduce sibling business imports, or silently change response fields.
 */
hash(value: string): string {
    return createHash('sha256').update(value).digest('hex');
  }
}
