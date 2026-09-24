// RESPONSIBILITY: Persists one tenant compliance document record owned by the compliance feature.
// FLOW: SuperadminComplianceRepository -> SuperadminComplianceDocumentEntity -> PostgreSQL `superadmin_compliance_documents`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
import { ComplianceDocumentStatus } from '@/backend_superadmin/superadmin_modules/compliance/superadmin-compliance.constants';

/**
 * Primary Intent: Defines SuperadminComplianceDocumentEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_compliance_documents')
@Index('IDX_compliance_documents_tenant_id', ['tenantId'])
@Index('IDX_compliance_documents_expires_at', ['expiresAt'])
export class SuperadminComplianceDocumentEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property tenantId. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'tenant_id', type: 'varchar', length: 64 }) tenantId!: string;
  /**
 * Primary Intent: Documents entity property documentType. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'document_type', type: 'varchar', length: 128 }) documentType!: string;
  /**
 * Primary Intent: Documents entity property status. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'status', type: 'enum', enum: ComplianceDocumentStatus }) status!: ComplianceDocumentStatus;
  /**
 * Primary Intent: Documents entity property expiresAt. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'expires_at', type: 'timestamptz', nullable: true }) expiresAt!: Date | null;
}
