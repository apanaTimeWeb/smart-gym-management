// RESPONSIBILITY: AES-256-GCM application-layer encryption for sensitive tenant data.
// FLOW: Feature repository -> CoreEncryptionService -> PostgreSQL encrypted payload.
import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

import { CoreConfigService } from '@/core/config/core-config.service';

@Injectable()
export class CoreEncryptionService {
  private readonly key: Buffer;
  constructor(config: CoreConfigService) { this.key = Buffer.from(config.dataEncryptionKeyBase64, 'base64'); }

  /** @description Encrypts a UTF-8 value using AES-256-GCM. @param value - Plaintext value. @returns IV/tag/ciphertext encoded payload. */
  encrypt(value: string): string {
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', this.key, iv);
    const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return `${iv.toString('base64')}.${tag.toString('base64')}.${encrypted.toString('base64')}`;
  }

  /** @description Decrypts an AES-256-GCM payload. @param value - Encoded encrypted payload. @returns Plaintext value. */
  decrypt(value: string): string {
    const [ivEncoded, tagEncoded, dataEncoded] = value.split('.');
    if (!ivEncoded || !tagEncoded || !dataEncoded) throw new Error('Invalid encrypted payload');
    const decipher = createDecipheriv('aes-256-gcm', this.key, Buffer.from(ivEncoded, 'base64'));
    decipher.setAuthTag(Buffer.from(tagEncoded, 'base64'));
    return Buffer.concat([decipher.update(Buffer.from(dataEncoded, 'base64')), decipher.final()]).toString('utf8');
  }
}
