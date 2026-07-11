import { CreateBackupRecordDto } from '../dto/create-backups.dto';
import { Injectable } from '@nestjs/common';
import { BackupsRepository } from '../backups.repository';

@Injectable()
export class CreateBackupsService {
  constructor(private readonly repository: BackupsRepository) {}
  
  async execute(dto: CreateBackupRecordDto): Promise<any> {
    return await this.repository.create(dto);
  }
}
