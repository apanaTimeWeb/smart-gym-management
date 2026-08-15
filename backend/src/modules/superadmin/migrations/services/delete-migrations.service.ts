import { Injectable } from '@nestjs/common';
import { MigrationsRepository } from '../migrations.repository';
import { MigrationResponse } from '../migrations.interfaces';
import { MIGRATIONS_MESSAGES } from '../migrations.constants';

@Injectable()
export class DeleteMigrationsService {
  constructor(private readonly repository: MigrationsRepository) {}
  
  async execute(id: string): Promise<MigrationResponse> {
    await this.repository.softDelete(id);
    return {
      success: true,
      message: MIGRATIONS_MESSAGES.DELETED,
      data: null
    };
  }
}
