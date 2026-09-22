// RESPONSIBILITY: Encrypts sensitive Trainer data at rest with authenticated AES-256-GCM.
// FLOW: Domain mutation → CoreEncryptionService → ciphertext persisted → decrypt on read.

import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, createHash, randomBytes } from 'node:crypto';

@Injectable()
export class CoreEncryptionService {
  private readonly key: Buffer;
  constructor() {
    const raw = process.env.FIELD_ENCRYPTION_KEY ?? '';
    if (!/^[0-9a-fA-F]{64}$/.test(raw)) throw new Error('FIELD_ENCRYPTION_KEY must be a 32-byte hex key');
    this.key = Buffer.from(raw, 'hex');
  }
  encrypt(value: string | null): string | null {
    if (value == null) return null;
    const iv = randomBytes(12); const cipher = createCipheriv('aes-256-gcm', this.key, iv);
    const ciphertext = Buffer.concat([cipher.update(value,'utf8'),cipher.final()]); const tag=cipher.getAuthTag();
    return `v1:${iv.toString('base64url')}:${tag.toString('base64url')}:${ciphertext.toString('base64url')}`;
  }
  decrypt(value: string | null): string | null {
    if (value == null) return null;
    if (!value.startsWith('v1:')) return value;
    const [,iv,tag,ciphertext]=value.split(':'); const decipher=createDecipheriv('aes-256-gcm',this.key,Buffer.from(iv,'base64url')); decipher.setAuthTag(Buffer.from(tag,'base64url'));
    return Buffer.concat([decipher.update(Buffer.from(ciphertext,'base64url')),decipher.final()]).toString('utf8');
  }
  hash(value: string): string { return createHash('sha256').update(value).digest('hex'); }
}
