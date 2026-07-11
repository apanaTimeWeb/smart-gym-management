import { Injectable } from '@nestjs/common';
import { MigrationsRepository } from '../migrations.repository';

@Injectable()
export class FindMigrationsService {
  constructor(private readonly repository: MigrationsRepository) {}
  
  async execute() {
    // Implement find logic
  }
}
