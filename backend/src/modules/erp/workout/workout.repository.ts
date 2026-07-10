import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from './entities/workout.entity';

@Injectable()
export class WorkoutRepository {
  constructor(
    @InjectRepository(Workout)
    public readonly repo: Repository<Workout>,
  ) {}
}
