// RESPONSIBILITY: Maps library persistence without leaking ORM entities into domain services.
// FLOW: library repository → TypeORM entity → diet_plans table.

import { Column, Entity } from 'typeorm';
import { CoreBaseEntity } from '@/backend_trainer/core/database/core-base.entity';
import { DietGoal } from '@/backend_trainer/modules/backend_trainer/library/library-enums';

@Entity('trainer_diet_plans')
export class LibraryDietPlanEntity extends CoreBaseEntity {

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
