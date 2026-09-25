// RESPONSIBILITY: TypeORM persistence entity for tickets feature data stored in `superadmin_support_tickets`.
// FLOW: tickets repository -> SupportTicket entity -> PostgreSQL `support_tickets`.
import { Column, Entity, Index } from 'typeorm';
import { SuperadminCoreBaseEntity } from '@/backend_superadmin/superadmin_core/superadmin_core_database/superadmin-core-base.entity';
import { SupportTicketStatus, SupportTicketPriority } from '@/backend_superadmin/superadmin_modules/tickets/superadmin-tickets.constants';

/**
 * Primary Intent: Defines SuperadminTicketsEntity as an explicit backend construct in its owning role/module boundary.
 * Edge Cases: Preserve validation, authorization, tenant, transaction, persistence, and API-contract invariants when modifying this class.
 * Side-Effects: Only documented database, cache, event, queue, or external-service effects are allowed.
 * AI-Note: Keep dependencies isolated and preserve the frozen API/data contract.
 */
@Entity('superadmin_support_tickets')
@Index('IDX_support_tickets_updated_at', ['updatedAt'])
export class SuperadminTicketsEntity extends SuperadminCoreBaseEntity {
  /**
 * Primary Intent: Documents entity property tenantId. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'tenant_id', type: 'varchar', length: 500 })
  tenantId!: string;
  /**
 * Primary Intent: Documents entity property tenantName. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'tenant_name', type: 'varchar', length: 500 })
  tenantName!: string;
  /**
 * Primary Intent: Documents entity property reporterEmail. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'reporter_email', type: 'varchar', length: 500 })
  reporterEmail!: string;
  /**
 * Primary Intent: Documents entity property subject. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'subject', type: 'varchar', length: 500 })
  subject!: string;
  /**
 * Primary Intent: Documents entity property description. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'description', type: 'varchar', length: 500 })
  description!: string;
  /**
 * Primary Intent: Documents entity property status. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'status', type: 'enum', enum: SupportTicketStatus })
  status!: SupportTicketStatus;
  /**
 * Primary Intent: Documents entity property priority. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'priority', type: 'enum', enum: SupportTicketPriority })
  priority!: SupportTicketPriority;
  /**
 * Primary Intent: Documents entity property assignedTo. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'assigned_to', type: 'varchar', length: 500, nullable: true })
  assignedTo!: string | null;
  /**
 * Primary Intent: Documents entity property attachments. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'attachments', type: 'jsonb', default: () => "'{}'::jsonb" })
  attachments!: unknown;
  /**
 * Primary Intent: Documents entity property slaDeadline. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'sla_deadline', type: 'timestamptz', nullable: true })
  slaDeadline!: Date | null;
  /**
 * Primary Intent: Documents entity property firstResponseAt. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'first_response_at', type: 'timestamptz', nullable: true })
  firstResponseAt!: Date | null;
  /**
 * Primary Intent: Documents entity property resolutionTime. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'resolution_time', type: 'integer', default: 0 })
  resolutionTime!: number;
  /** Primary Intent: Optional customer satisfaction score attached to a resolved ticket. Edge Cases: Null means no survey exists; supplied values must remain within 0-5. Side-Effects: Feeds support satisfaction analytics. AI-Note: Do not replace this with a hard-coded metric. */
  @Column({ name: 'satisfaction_score', type: 'numeric', precision: 3, scale: 2, nullable: true, transformer: { to: (value: number | null): number | null => value, from: (value: string | null): number | null => value === null ? null : Number(value) } })
  satisfactionScore!: number | null;
  /**
 * Primary Intent: Documents entity property messages. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'messages', type: 'jsonb', default: () => "'{}'::jsonb" })
  messages!: unknown;
  /**
 * Primary Intent: Documents entity property lastUpdated. Edge Cases: Preserve validation, nullability, persistence, authorization, and frozen API semantics. Side-Effects: None unless the owning file documents them. Side-Effects: None. AI-Note: Treat this construct as an explicit contract; do not rename, widen, or reinterpret it without updating its owner documentation.
 */
@Column({ name: 'last_updated', type: 'timestamptz' })
  lastUpdated!: Date;
}
