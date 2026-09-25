// RESPONSIBILITY: TypeORM persistence entity for integrations feature data stored in `integration_keys`.
// FLOW: integrations repository -> IntegrationKey entity -> PostgreSQL `integration_keys`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
import { IntegrationKeyScope } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.constants';
import { IntegrationKeyStatus } from '@/backend_superadmin/superadmin_modules/integrations/superadmin-integrations.constants';

/**
 * Primary Intent: Defines SuperadminIntegrationsEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_integration_keys')
@Index('IDX_integration_keys_updated_at', ['updatedAt'])
export class SuperadminIntegrationsEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property tenantId. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'tenant_id', type: 'varchar', length: 500 })
  tenantId!: string;
  /**
 * Primary Intent: Documents entity property label. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'label', type: 'varchar', length: 500 })
  label!: string;
  /**
 * Primary Intent: Documents entity property status. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'status', type: 'enum', enum: IntegrationKeyStatus })
  status!: IntegrationKeyStatus;
  /**
 * Primary Intent: Documents entity property lastUsed. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'last_used', type: 'timestamptz', nullable: true })
  lastUsed!: Date | null;
  /**
 * Primary Intent: Documents entity property rateLimit. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'rate_limit', type: 'integer', default: 0 })
  rateLimit!: number;
  /**
 * Primary Intent: Documents entity property secretHash. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'secret_hash', type: 'varchar', length: 500 })
  secretHash!: string;
  /**
 * Primary Intent: Documents entity property scopes. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'scopes', type: 'jsonb', default: () => "'[]'::jsonb" })
  scopes!: IntegrationKeyScope[];
}
