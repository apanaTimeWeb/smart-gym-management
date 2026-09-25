// RESPONSIBILITY: Maps master-database subscription and billing state required by the Admin domain.
// FLOW: Master DB â†’ entity â†’ Admin subscription/plan services â†’ canonical API response.
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('plans_master')
@Index('IDX_plans_master_tier', ['tier'])
/**
 * @description Defines the AdminCoreMasterPlanEntity boundary for the admin_core_subscription backend feature.
 * @remarks Keep this class focused on its declared responsibility; preserve tenant, contract, security, and AI-context invariants when modifying it.
 */
export class AdminCoreMasterPlanEntity {
  @PrimaryGeneratedColumn('uuid', { primaryKeyConstraintName: 'PK_plans_master' })
  id!: string;

  @Column({ name: 'name', type: 'varchar', length: 160 })

  name!: string;

  @Column({ name: 'tier', type: 'varchar', length: 32 })

  tier!: string;

  @Column({ name: 'monthly_price_minor', type: 'bigint' })

  monthlyPriceMinor!: string;

  @Column({ name: 'annual_price_minor', type: 'bigint' })

  annualPriceMinor!: string;

  @Column({ name: 'is_active', type: 'boolean', default: true })

  isActive!: boolean;

  @Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })

  payload!: Record<string, unknown>;
}
