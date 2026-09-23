import { Injectable } from '@nestjs/common';
import { CoreEncryptionService as GlobalEncryptionService } from '@/backend_admin/core/security/core-encryption.service';

@Injectable()
export class CoreEncryptionService {
  constructor(private readonly globalEncryption: GlobalEncryptionService) {}

  encrypt(value: string): string {
    return this.globalEncryption.encrypt(value);
  }

  decrypt(value: string): string {
    return this.globalEncryption.decrypt(value);
  }
}
