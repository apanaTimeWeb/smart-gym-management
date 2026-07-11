import { Injectable } from '@nestjs/common';
import { BackupsRepository } from '../backups.repository';

@Injectable()
export class FindBackupsService {
  constructor(private readonly repository: BackupsRepository) {}
  
  async execute() {
    // Implement find logic
  }
}
