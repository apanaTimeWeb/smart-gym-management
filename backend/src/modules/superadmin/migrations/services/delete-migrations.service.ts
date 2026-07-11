import { Injectable } from '@nestjs/common';
import { MigrationsRepository } from '../migrations.repository';

@Injectable()
export class DeleteMigrationsService {
  constructor(private readonly repository: MigrationsRepository) {}
  
  async execute(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
