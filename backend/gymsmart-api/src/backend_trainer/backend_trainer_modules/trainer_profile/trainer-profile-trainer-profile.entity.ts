// RESPONSIBILITY: Maps profile persistence without leaking ORM entities into domain services.
// FLOW: profile repository → TypeORM entity → trainer_profiles table.

import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '@/backend_trainer/backend_core/core_database/core-base.entity';
import { TrainerProfileRole } from '@/backend_trainer/backend_trainer_modules/trainer_profile/trainer-profile-enums';
import { CoreEncryptedJsonbTransformer } from '@/backend_trainer/backend_core/core_security/core-encrypted.transformer';


/**
 * Intent: Defines the TrainerProfileTrainerProfileEntity boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Entity('trainer_profiles')
export class TrainerProfileTrainerProfileEntity extends CoreBaseEntity {

  @Column({ name: 'user_id', type: 'uuid' }) userId!: string;
  @Column() name!: string;
  @Column() email!: string;
  @Column() phone!: string;
  @Column({type:'enum',enum:TrainerProfileRole,enumName:'trainer_profile_role_enum'}) role!: TrainerProfileRole;
  @Column({ type: 'jsonb' }) specialization!: string[];
  @Column({ name: 'joined_at', type: 'date' }) joinedAt!: string;
  @Column({ name: 'avatar_initial' }) avatarInitial!: string;
  @Column({ type: 'jsonb', nullable: true }) certifications!: string[] | null;
  @Column({ type: 'jsonb', nullable: true }) specialties!: string[] | null;
  @Column({ name: 'emergency_contact', type: 'jsonb', nullable: true, transformer: CoreEncryptedJsonbTransformer }) emergencyContact!: Record<string, string> | null;
  @Column({ nullable: true }) bio!: string | null;
  @Column({ name: 'experience_years', nullable: true }) experienceYears!: number | null;
  @Column({ name: 'profile_photo_url', nullable: true }) profilePhotoUrl!: string | null;
  @Column({ name: 'languages_spoken', type: 'jsonb', nullable: true }) languagesSpoken!: string[] | null;
  @Column({ name: 'commission_rate', type: 'numeric', precision: 5, scale: 2, default: 0 }) commissionRate!: number;
  @Column({ name: 'commission_tier', type: 'varchar', length: 64, default: 'Standard' }) commissionTier!: string;
  @Column({ name: 'bank_account_masked', type: 'varchar', length: 32, nullable: true }) bankAccountMasked!: string | null;
  @Column({ name: 'currency_code', type: 'varchar', length: 3, default: 'INR' }) currencyCode!: string;
}
