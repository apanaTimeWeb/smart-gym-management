import { Injectable } from '@nestjs/common';
import { BackupsRepository } from '../backups.repository';
import { BackupResponse } from '../backups.interfaces';
import { BACKUPS_MESSAGES } from '../backups.constants';

@Injectable()
export class DeleteBackupsService {
  constructor(private readonly repository: BackupsRepository) {}
  
  async execute(id: string): Promise<BackupResponse> {
    await this.repository.softDelete(id);
    return {
      success: true,
      message: BACKUPS_MESSAGES.DELETED,
      data: null
    };
  }
}
