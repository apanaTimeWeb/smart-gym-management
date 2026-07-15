import { UpdateSchemaMigrationDto } from '../dto/update-migrations.dto';
import { Injectable } from '@nestjs/common';
import { MigrationsRepository } from '../migrations.repository';
import { MigrationResponse } from '../migrations.interfaces';
import { MIGRATIONS_MESSAGES } from '../migrations.constants';

@Injectable()
export class UpdateMigrationsService {
  constructor(private readonly repository: MigrationsRepository) {}
  
  async execute(id: string, dto: UpdateSchemaMigrationDto): Promise<MigrationResponse> {
    const data = await this.repository.update(id, dto);
    return {
      success: true,
      message: MIGRATIONS_MESSAGES.UPDATED,
      data
    };
  }
}
