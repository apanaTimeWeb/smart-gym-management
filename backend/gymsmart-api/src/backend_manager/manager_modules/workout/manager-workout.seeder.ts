// RESPONSIBILITY: Owns deterministic, idempotent Manager feature seed data for the tenant database.
// FLOW: Master seed runner -> feature seeder -> tenant DataSource -> stable UUID upsert.
import { DataSource } from 'typeorm';

import { ManagerWorkoutEntity } from '@/backend_manager/manager_modules/workout/manager-workout.entity';
import { WorkoutRecordStatus } from '@/backend_manager/manager_modules/workout/manager-workout.constants';

export class ManagerWorkoutSeeder {
  /** Seeds one stable Manager workout record and updates the same row on subsequent runs. */
  async seed(dataSource: DataSource): Promise<void> {
    const repository = dataSource.getRepository(ManagerWorkoutEntity);
    await (repository as any).upsert({ id: '00000000-0000-4000-8000-000000000019', payload: { seedKey: 'manager:workout:v1', name: 'Manager Workout Seed', status: 'ACTIVE' } , status: WorkoutRecordStatus.ACTIVE }, ['id']);
  }
}

export { ManagerWorkoutSeeder as WorkoutSeeder };
