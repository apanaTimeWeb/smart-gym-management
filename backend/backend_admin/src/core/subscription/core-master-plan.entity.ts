// RESPONSIBILITY: Maps master-database subscription and billing state required by the Admin domain.
// FLOW: Master DB → entity → Admin subscription/plan services → canonical API response.

import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('plans_master')
@Index('IDX_plans_master_tier', ['tier'])
export class CoreMasterPlanEntity {
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
