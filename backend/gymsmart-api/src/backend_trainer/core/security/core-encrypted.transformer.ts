// RESPONSIBILITY: Provides TypeORM value transformers for sensitive scalar and JSON fields.
// FLOW: Entity write → AES-256-GCM encrypt → DB text; DB read → decrypt → domain value.

import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import type { ValueTransformer } from 'typeorm';

function key(): Buffer {
  const raw = process.env.FIELD_ENCRYPTION_KEY ?? '';
  if (!/^[0-9a-fA-F]{64}$/.test(raw)) throw new Error('FIELD_ENCRYPTION_KEY must be a 32-byte hex key');
  return Buffer.from(raw, 'hex');
}
function encrypt(value: string): string {
  const iv = randomBytes(12); const cipher = createCipheriv('aes-256-gcm', key(), iv);
  const data = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
  return `v1:${iv.toString('base64url')}:${cipher.getAuthTag().toString('base64url')}:${data.toString('base64url')}`;
}
function decrypt(value: string): string {
  if (!value.startsWith('v1:')) return value;
  const [, iv, tag, data] = value.split(':');
  const decipher = createDecipheriv('aes-256-gcm', key(), Buffer.from(iv, 'base64url'));
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
