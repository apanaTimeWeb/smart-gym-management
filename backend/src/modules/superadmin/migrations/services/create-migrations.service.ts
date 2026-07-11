import { Injectable } from '@nestjs/common';
import { MigrationsRepository } from '../migrations.repository';

@Injectable()
export class CreateMigrationsService {
  constructor(private readonly repository: MigrationsRepository) {}
  
  async execute(dto: CreateMigrationsDto): Promise<any> {
    return await this.repository.create(dto);
  }
}
