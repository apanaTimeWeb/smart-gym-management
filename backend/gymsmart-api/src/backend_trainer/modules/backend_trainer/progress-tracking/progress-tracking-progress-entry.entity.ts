// RESPONSIBILITY: Maps progress-tracking persistence without leaking ORM entities into domain services.
// FLOW: progress-tracking repository → TypeORM entity → progress_entries table.

import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '@/backend_trainer/core/database/core-base.entity';

@Entity('trainer_progress_entries')
export class ProgressTrackingProgressEntryEntity extends CoreBaseEntity {

  @Column({ name: 'member_id', type: 'uuid' }) memberId!: string;
  @Column({ type: 'date' }) date!: string;
  @Column({ name: 'weight_kg', type: 'numeric' }) weightKg!: number;
  @Column({ name: 'height_cm', type: 'numeric' }) heightCm!: number;
  @Column({ type: 'numeric' }) bmi!: number;
  @Column({ name: 'body_fat_percent', type: 'numeric', nullable: true }) bodyFatPercent!: number | null;
  @Column({ name: 'muscle_mass_kg', type: 'numeric', nullable: true }) muscleMassKg!: number | null;
  @Column({ name: 'chest_cm', type: 'numeric', nullable: true }) chestCm!: number | null;
  @Column({ name: 'waist_cm', type: 'numeric', nullable: true }) waistCm!: number | null;
  @Column({ name: 'hip_cm', type: 'numeric', nullable: true }) hipCm!: number | null;
  @Column({ nullable: true }) notes!: string | null;
  @Column({ name: 'recorded_by' }) recordedBy!: string;
  @Column({ name: 'blood_pressure', nullable: true }) bloodPressure!: string | null;
  @Column({ name: 'resting_heart_rate', nullable: true }) restingHeartRate!: number | null;
  @Column({ name: 'vo2_max', type: 'numeric', nullable: true }) vo2Max!: number | null;
  @Column({ name: 'progress_photos', type: 'jsonb', nullable: true }) progressPhotos!: string[] | null;
}
