// RESPONSIBILITY: Encrypts Manager-sensitive values at rest with AES-256-GCM.
// FLOW: Plaintext input -> validated 32-byte key -> AES-256-GCM -> versioned ciphertext.
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { HttpStatus, Injectable } from '@nestjs/common';

import { ManagerCoreConfigService } from '@/backend_manager/manager_core/manager_core_config/manager-core-config.service';
import { ManagerCoreBusinessException } from '@/backend_manager/manager_core/manager_core_exceptions/manager-core-business.exception';

@Injectable()
export class ManagerCoreEncryptionService {
  private readonly algorithm = 'aes-256-gcm';

  constructor(private readonly config: ManagerCoreConfigService) {}

  /** Encrypts a sensitive string using AES-256-GCM with a random IV and authentication tag. */
  encrypt(value: string): string {
    const key = Buffer.from(this.config.dataEncryptionKeyBase64, 'base64');
    if (key.length !== 32) throw new ManagerCoreBusinessException('core.ERRORS.ENCRYPTION_KEY_INVALID', 'CORE.SECURITY.ENCRYPTION_KEY_INVALID', HttpStatus.INTERNAL_SERVER_ERROR);
    const iv = randomBytes(12);
    const cipher = createCipheriv(this.algorithm, key, iv);
    const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);
    return `v1.${iv.toString('base64url')}.${cipher.getAuthTag().toString('base64url')}.${encrypted.toString('base64url')}`;
  }

  /** Decrypts a previously encrypted Manager value and validates its version/tag. */
  decrypt(value: string): string {
    const [version, ivText, tagText, dataText] = value.split('.');
    if (version !== 'v1' || !ivText || !tagText || !dataText) throw new ManagerCoreBusinessException('core.ERRORS.ENCRYPTED_VALUE_INVALID', 'CORE.SECURITY.ENCRYPTED_VALUE_INVALID', HttpStatus.INTERNAL_SERVER_ERROR);
    const key = Buffer.from(this.config.dataEncryptionKeyBase64, 'base64');
    const decipher = createDecipheriv(this.algorithm, key, Buffer.from(ivText, 'base64url'));
    decipher.setAuthTag(Buffer.from(tagText, 'base64url'));
    return Buffer.concat([decipher.update(Buffer.from(dataText, 'base64url')), decipher.final()]).toString('utf8');
  }
}
