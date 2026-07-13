import { CreateSchemaMigrationDto } from '../dto/create-migrations.dto';
import { Injectable } from '@nestjs/common';
import { MigrationsRepository } from '../migrations.repository';
import { MigrationResponse } from '../migrations.interfaces';
import { MIGRATIONS_MESSAGES } from '../migrations.constants';

@Injectable()
export class CreateMigrationsService {
  constructor(private readonly repository: MigrationsRepository) {}
  
  async execute(dto: CreateSchemaMigrationDto): Promise<MigrationResponse> {
    const data = await this.repository.create(dto);
    return {
      success: true,
      message: MIGRATIONS_MESSAGES.CREATED,
      data
    };
  }
}
