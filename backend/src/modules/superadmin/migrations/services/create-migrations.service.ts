import { Injectable } from '@nestjs/common';
import { MigrationsRepository } from '../migrations.repository';

@Injectable()
export class CreateMigrationsService {
  constructor(private readonly repository: MigrationsRepository) {}
  
  async execute() {
    // Implement create logic
  }
}
