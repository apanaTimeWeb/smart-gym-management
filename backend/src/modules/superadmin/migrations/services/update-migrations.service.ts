import { UpdateSchemaMigrationDto } from '../dto/update-migrations.dto';
import { Injectable } from '@nestjs/common';
import { MigrationsRepository } from '../migrations.repository';

@Injectable()
export class UpdateMigrationsService {
  constructor(private readonly repository: MigrationsRepository) {}
  
  async execute(id: string, dto: UpdateSchemaMigrationDto): Promise<any> {
    return await this.repository.update(id, dto);
  }
}
