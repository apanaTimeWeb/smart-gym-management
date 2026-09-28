// RESPONSIBILITY: Maps library persistence without leaking ORM entities into domain services.
// FLOW: library repository → TypeORM entity → diet_plans table.

import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '@/backend_trainer/backend_core/core_database/core-base.entity';
import { DietGoal } from '@/backend_trainer/backend_trainer_modules/trainer_library/trainer-library-enums';


/**
 * Intent: Defines the TrainerLibraryDietPlanEntity boundary for the modules architecture.
 * Edge Cases: Preserve tenant scope, validation, authorization, nullability, transactions, and canonical errors when changing this construct.
 * Side Effects: Preserve the owning construct’s existing persistence, cache, event, and audit behavior without introducing cross-module state changes.
 * AI Note: Keep this construct isolated from unrelated modules and preserve frozen contracts; never bypass repository/domain boundaries.
 */
@Entity('trainer_diet_plans')
export class TrainerLibraryDietPlanEntity extends CoreBaseEntity {

  @Column() name!: string;
  @Column({type:'enum',enum:DietGoal,enumName:'diet_goal_enum'}) goal!: DietGoal;
  @Column({ nullable: true }) calories!: number | null;
  @Column({ nullable: true }) protein!: number | null;
  @Column({ nullable: true }) carbs!: number | null;
  @Column({ nullable: true }) fats!: number | null;
  @Column({ nullable: true }) description!: string | null;
  @Column({ type: 'jsonb', default: () => "'[]'" }) meals!: unknown[];
  @Column({ name: 'is_active', default: true }) isActive!: boolean;
}
