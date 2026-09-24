// RESPONSIBILITY: TypeORM persistence entity for team feature data stored in `superadmin_team_snapshots`.
// FLOW: team repository -> TeamSnapshot entity -> PostgreSQL `superadmin_team_snapshots`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';

/**
 * Primary Intent: Defines SuperadminTeamEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_team_snapshots')
@Index('IDX_superadmin_team_snapshots_updated_at', ['updatedAt'])
export class SuperadminTeamEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property kind. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'kind', type: 'varchar', length: 500 })
  kind!: string;
  /**
 * Primary Intent: Documents entity property payload. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'payload', type: 'jsonb', default: () => "'{}'::jsonb" })
  payload!: unknown;
}
