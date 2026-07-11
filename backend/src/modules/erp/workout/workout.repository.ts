import { Injectable, Inject } from '@nestjs/common';
import { Repository, DataSource } from 'typeorm';
import { Workout } from './entities/workout.entity';

@Injectable()
export class WorkoutRepository {
  public readonly repo: Repository<Workout>;

  constructor(
    @Inject('TENANT_CONNECTION')
    private readonly dataSource: DataSource,
  ) {
    this.repo = this.dataSource.getRepository(Workout);
  }
}
