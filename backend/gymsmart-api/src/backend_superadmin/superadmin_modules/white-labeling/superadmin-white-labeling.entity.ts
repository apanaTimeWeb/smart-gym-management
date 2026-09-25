// RESPONSIBILITY: TypeORM persistence entity for white-labeling feature data stored in `white_label_domains`.
// FLOW: white-labeling repository -> WhiteLabelDomain entity -> PostgreSQL `white_label_domains`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
import { WhiteLabelDomainStatus, WhiteLabelDomainSslStatus } from '@/backend_superadmin/superadmin_modules/white-labeling/superadmin-white-labeling.constants';

/**
 * Primary Intent: Defines SuperadminWhiteLabelingEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_white_label_domains')
@Index('IDX_white_label_domains_updated_at', ['updatedAt'])
export class SuperadminWhiteLabelingEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property gymId. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'gym_id', type: 'varchar', length: 500 })
  gymId!: string;
  /**
 * Primary Intent: Documents entity property gymName. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'gym_name', type: 'varchar', length: 500 })
  gymName!: string;
  /**
 * Primary Intent: Documents entity property domain. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Index('IDX_white_label_domains_domain')
  @Column({ name: 'domain', type: 'varchar', length: 500 })
  domain!: string;
  /**
 * Primary Intent: Documents entity property status. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'status', type: 'enum', enum: WhiteLabelDomainStatus })
  status!: WhiteLabelDomainStatus;
  /**
 * Primary Intent: Documents entity property sslStatus. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'ssl_status', type: 'enum', enum: WhiteLabelDomainSslStatus })
  sslStatus!: WhiteLabelDomainSslStatus;
  /**
 * Primary Intent: Documents entity property logoUrl. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'logo_url', type: 'varchar', length: 500, nullable: true })
  logoUrl!: string | null;
  /**
 * Primary Intent: Documents entity property primaryColor. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'primary_color', type: 'varchar', length: 500, nullable: true })
  primaryColor!: string | null;
}
