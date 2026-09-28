// RESPONSIBILITY: Maps progress-tracking persistence without leaking ORM entities into domain services.
// FLOW: progress-tracking repository → TypeORM entity → progress_entries table.

import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '@/backend_trainer/backend_core/core_database/core-base.entity';


/**
 * Intent: Defines the TrainerProgressTrackingProgressEntryEntity boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Entity('trainer_progress_entries')
export class TrainerProgressTrackingProgressEntryEntity extends CoreBaseEntity {

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
