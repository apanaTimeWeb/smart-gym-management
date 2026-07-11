import { Injectable } from '@nestjs/common';
import { BackupsRepository } from '../backups.repository';

@Injectable()
export class UpdateBackupsService {
  constructor(private readonly repository: BackupsRepository) {}
  
  async execute() {
    // Implement update logic
  }
}
