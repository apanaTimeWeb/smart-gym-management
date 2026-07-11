import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class MigrationsRepository {
  constructor(private readonly dataSource: DataSource) {}
  // Add repository methods here
}
