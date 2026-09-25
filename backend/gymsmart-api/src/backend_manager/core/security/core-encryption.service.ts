import { Injectable } from '@nestjs/common';
import { AdminCoreEncryptionService as GlobalEncryptionService } from '@/backend_admin/admin_core/admin_core_security/admin-core-encryption.service';

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
