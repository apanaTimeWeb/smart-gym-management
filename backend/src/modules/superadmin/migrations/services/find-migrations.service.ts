import { Injectable } from '@nestjs/common';
import { MigrationsRepository } from '../migrations.repository';

@Injectable()
export class FindMigrationsService {
  constructor(private readonly repository: MigrationsRepository) {}
  
  async execute(): Promise<any[]> {
    return await this.repository.findAll();
  }
  async findOne(id: string): Promise<any> {
    const entity = await this.repository.findById(id);
    if (!entity) throw new Error('SchemaMigration not found');
    return entity;
  }
}
