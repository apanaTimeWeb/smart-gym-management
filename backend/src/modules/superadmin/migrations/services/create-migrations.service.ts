import { CreateSchemaMigrationDto } from '../dto/create-migrations.dto';
import { Injectable } from '@nestjs/common';
import { MigrationsRepository } from '../migrations.repository';

@Injectable()
export class CreateMigrationsService {
  constructor(private readonly repository: MigrationsRepository) {}
  
  async execute(dto: CreateSchemaMigrationDto): Promise<any> {
    return await this.repository.create(dto);
  }
}
