// RESPONSIBILITY: Provides application-layer AES-256-GCM encryption for sensitive fields.
// FLOW: Service -> SuperadminEncryptionService -> AES-256-GCM ciphertext -> PostgreSQL.
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
@Injectable()
export class SuperadminEncryptionService {
  private readonly key: Buffer;
  constructor(config: ConfigService) { this.key = Buffer.from(config.getOrThrow<string>('app.encryptionKeyBase64'), 'base64'); if (this.key.length !== 32) throw new Error('ENCRYPTION_KEY_BASE64 must decode to 32 bytes'); }
  /** Encrypts plaintext using AES-256-GCM. */
  encrypt(value: string): string { const iv = randomBytes(12); const cipher = createCipheriv('aes-256-gcm', this.key, iv); const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]); return `${iv.toString('base64')}.${cipher.getAuthTag().toString('base64')}.${encrypted.toString('base64')}`; }
  /** Decrypts an AES-256-GCM ciphertext. */
  decrypt(payload: string): string { const [ivRaw, tagRaw, cipherRaw] = payload.split('.'); const decipher = createDecipheriv('aes-256-gcm', this.key, Buffer.from(ivRaw, 'base64')); decipher.setAuthTag(Buffer.from(tagRaw, 'base64')); return Buffer.concat([decipher.update(Buffer.from(cipherRaw, 'base64')), decipher.final()]).toString('utf8'); }
}