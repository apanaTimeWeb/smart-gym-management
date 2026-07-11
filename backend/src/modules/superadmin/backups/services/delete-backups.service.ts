import { Injectable } from '@nestjs/common';
import { BackupsRepository } from '../backups.repository';

@Injectable()
export class DeleteBackupsService {
  constructor(private readonly repository: BackupsRepository) {}
  
  async execute() {
    // Implement delete logic
  }
}
