// RESPONSIBILITY: Holds the validated field-encryption key for TypeORM transformers without raw environment access.
// FLOW: CoreConfigService → CoreEncryptionKeyRegistry.configure() → encrypted value transformer.

import { CoreConfigurationException } from '@/backend_trainer/backend_core/core_errors/core-configuration.exception';


/**
 * Intent: Defines the CoreEncryptionKeyRegistry boundary for the backend core architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
export class CoreEncryptionKeyRegistry {
  private static currentKey: Buffer | undefined;

  /** Configures the immutable process-wide AES-256 key from validated configuration. */
  static configure(hexKey: string): void {
    if (!/^[0-9a-fA-F]{64}$/.test(hexKey)) throw new CoreConfigurationException('CORE.CONFIG.FIELD_ENCRYPTION_KEY_INVALID');
    this.currentKey = Buffer.from(hexKey, 'hex');
  }

  /** Returns the configured AES-256 key and fails closed when bootstrap did not initialize it. */
  static getKey(): Buffer {
    if (!this.currentKey) throw new CoreConfigurationException('CORE.CONFIG.FIELD_ENCRYPTION_KEY_NOT_INITIALIZED');
    return this.currentKey;
  }
}
