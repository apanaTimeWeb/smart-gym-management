import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class SettingsRepository {
  constructor(private readonly dataSource: DataSource) {}
  // Add repository methods here
}
