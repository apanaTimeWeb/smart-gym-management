import { Injectable } from '@nestjs/common';
import { BackupsRepository } from '../backups.repository';

@Injectable()
export class DeleteBackupsService {
  constructor(private readonly repository: BackupsRepository) {}
  
  async execute(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
