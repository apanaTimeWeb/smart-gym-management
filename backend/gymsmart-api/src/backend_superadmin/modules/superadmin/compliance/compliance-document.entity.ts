// RESPONSIBILITY: Persists one tenant compliance document record owned by the compliance feature.
// FLOW: ComplianceRepository -> ComplianceDocumentEntity -> PostgreSQL `superadmin_compliance_documents`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

export enum ComplianceDocumentStatus {
  VALID = 'VALID',
  EXPIRING = 'EXPIRING',
  EXPIRED = 'EXPIRED',
  MISSING = 'MISSING',
}

@Entity('superadmin_compliance_documents')
@Index('IDX_compliance_documents_tenant_id', ['tenantId'])
@Index('IDX_compliance_documents_expires_at', ['expiresAt'])
export class ComplianceDocumentEntity extends BaseEntity {
  @Column({ name: 'tenant_id', type: 'varchar', length: 64 }) tenantId!: string;
  @Column({ name: 'document_type', type: 'varchar', length: 128 }) documentType!: string;
  @Column({ name: 'status', type: 'enum', enum: ComplianceDocumentStatus }) status!: ComplianceDocumentStatus;
  @Column({ name: 'expires_at', type: 'timestamptz', nullable: true }) expiresAt!: Date | null;
}
