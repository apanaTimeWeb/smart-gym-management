// RESPONSIBILITY: Provides TypeORM value transformers for sensitive scalar and JSON fields.
// FLOW: Entity write → AES-256-GCM ciphertext → DB; DB read → decrypt → application value.

import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import type { ValueTransformer } from 'typeorm';
import { CoreEncryptionKeyRegistry } from '@/backend_trainer/backend_core/core_security/core-encryption-key.registry';

function encrypt(value: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', CoreEncryptionKeyRegistry.getKey(), iv);
  const data = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
  return `v1:${iv.toString('base64url')}:${cipher.getAuthTag().toString('base64url')}:${data.toString('base64url')}`;
}

function decrypt(value: string): string {
  if (!value.startsWith('v1:')) return value;
  const [, iv, tag, data] = value.split(':');
  const decipher = createDecipheriv('aes-256-gcm', CoreEncryptionKeyRegistry.getKey(), Buffer.from(iv, 'base64url'));
  decipher.setAuthTag(Buffer.from(tag, 'base64url'));
  return Buffer.concat([decipher.update(Buffer.from(data, 'base64url')), decipher.final()]).toString('utf8');
}

export const CoreEncryptedTextTransformer: ValueTransformer = {
  to: (value: string | null): string | null => value == null ? null : encrypt(value),
  from: (value: string | null): string | null => value == null ? null : decrypt(value),
};

export const CoreEncryptedJsonTransformer: ValueTransformer = {
  to: (value: unknown): string | null => value == null ? null : encrypt(JSON.stringify(value)),
  from: (value: string | null): unknown => value == null ? null : JSON.parse(decrypt(value)),
};

/** Stores encrypted JSON inside JSONB without exposing plaintext object properties in the database. */
export const CoreEncryptedJsonbTransformer: ValueTransformer = {
  to: (value: unknown): Record<string, string> | null => value == null ? null : { __encrypted: encrypt(JSON.stringify(value)) },
  from: (value: unknown): unknown => {
    if (value == null) return null;
    if (typeof value === 'object' && value !== null && '__encrypted' in value && typeof value.__encrypted === 'string') {
      return JSON.parse(decrypt(value.__encrypted));
    }
    return value;
  },
};
