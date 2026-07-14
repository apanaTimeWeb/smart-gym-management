import { UpdateBackupRecordDto } from '../dto/update-backups.dto';
import { Injectable } from '@nestjs/common';
import { BackupsRepository } from '../backups.repository';
import { BackupResponse } from '../backups.interfaces';
import { BACKUPS_MESSAGES } from '../backups.constants';

@Injectable()
export class UpdateBackupsService {
  constructor(private readonly repository: BackupsRepository) {}
  
  async execute(id: string, dto: UpdateBackupRecordDto): Promise<BackupResponse> {
    const data = await this.repository.update(id, dto);
    return {
      success: true,
      message: BACKUPS_MESSAGES.UPDATED,
      data
    };
  }
}
