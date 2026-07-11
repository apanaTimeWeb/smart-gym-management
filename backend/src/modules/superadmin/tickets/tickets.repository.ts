import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class TicketsRepository {
  constructor(private readonly dataSource: DataSource) {}
  // Add repository methods here
}
