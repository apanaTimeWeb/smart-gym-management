// RESPONSIBILITY: Encrypts sensitive fields before database persistence using AES-256-GCM.
// FLOW: Domain sensitive value → CoreEncryptionService → encrypted DB payload.

import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';

@Injectable()
export class CoreEncryptionService {
  private key(): Buffer {
    const raw = process.env.DATA_ENCRYPTION_KEY ?? '';
    if (!raw) throw new Error('DATA_ENCRYPTION_KEY_MISSING');
    return createHash('sha256').update(raw).digest();
  }

  encrypt(value: string): string {
    const iv = randomBytes(12);
    const cipher = createCipheriv('aes-256-gcm', this.key(), iv);
    const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();
    return `${iv.toString('base64')}.${tag.toString('base64')}.${encrypted.toString('base64')}`;
  }

  decrypt(payload: string): string {
    const [iv64, tag64, data64] = payload.split('.');
    const decipher = createDecipheriv('aes-256-gcm', this.key(), Buffer.from(iv64, 'base64'));
    decipher.setAuthTag(Buffer.from(tag64, 'base64'));
    return Buffer.concat([decipher.update(Buffer.from(data64, 'base64')), decipher.final()]).toString('utf8');
  }
}
