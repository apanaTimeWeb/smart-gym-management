// RESPONSIBILITY: Encrypts sensitive fields before database persistence using AES-256-GCM.
// FLOW: Domain sensitive value â†’ CoreEncryptionService â†’ validated ConfigService secret â†’ encrypted DB payload.

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';

@Injectable()
export class CoreEncryptionService {
  constructor(private readonly config: ConfigService) {}

  /** @description Derives the fixed-length AES-256 key from the centrally validated application secret. @returns AES key bytes. */
  private key(): Buffer {
    const raw = this.config.getOrThrow<string>('DATA_ENCRYPTION_KEY');
    return createHash('sha256').update(raw).digest();
  }

  /** @description Encrypts one sensitive value with AES-256-GCM. @param value Plaintext value. @returns Authenticated ciphertext payload. */
  encrypt(value: string): string {
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', this.key(), iv);
    const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return `${iv.toString('base64')}.${tag.toString('base64')}.${encrypted.toString('base64')}`;
  }

  /** @description Decrypts one AES-256-GCM payload. @param payload Authenticated ciphertext payload. @returns Plaintext value. */
  decrypt(payload: string): string {
    const [iv64, tag64, data64] = payload.split('.');
    if (!iv64 || !tag64 || !data64) throw new Error('INVALID_ENCRYPTED_PAYLOAD');
    const decipher = createDecipheriv('aes-256-gcm', this.key(), Buffer.from(iv64, 'base64'));
    decipher.setAuthTag(Buffer.from(tag64, 'base64'));
    return Buffer.concat([decipher.update(Buffer.from(data64, 'base64')), decipher.final()]).toString('utf8');
  }

  /** @description Detects the service's three-part encrypted payload format. @param value Candidate value. @returns True when value is shaped as encrypted payload. */
  isEncrypted(value: string): boolean {
    const parts = value.split('.');
    return parts.length === 3 && parts.every((part) => part.length > 0);
  }
}
