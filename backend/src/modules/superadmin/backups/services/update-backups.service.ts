import { UpdateBackupRecordDto } from '../dto/update-backups.dto';
import { Injectable } from '@nestjs/common';
import { BackupsRepository } from '../backups.repository';

@Injectable()
export class UpdateBackupsService {
  constructor(private readonly repository: BackupsRepository) {}
  
  async execute(id: string, dto: UpdateBackupRecordDto): Promise<any> {
    return await this.repository.update(id, dto);
  }
}
