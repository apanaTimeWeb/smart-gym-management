import { Injectable } from '@nestjs/common';
import { MigrationsRepository } from '../migrations.repository';

@Injectable()
export class DeleteMigrationsService {
  constructor(private readonly repository: MigrationsRepository) {}
  
  async execute() {
    // Implement delete logic
  }
}
