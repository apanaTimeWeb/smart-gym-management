// RESPONSIBILITY: TypeORM persistence entity for tickets feature data stored in `support_tickets`.
// FLOW: tickets repository -> SupportTicket entity -> PostgreSQL `support_tickets`.
import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '@/backend_superadmin/core/database/base.entity';

export enum SupportTicketStatus {
  OPEN = 'OPEN',
  INPROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED',
  WAITING = 'WAITING',
}

export enum SupportTicketPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
  NORMAL = 'NORMAL',
  URGENT = 'URGENT',
}

@Entity('superadmin_support_tickets')
@Index('IDX_support_tickets_updated_at', ['updatedAt'])
export class SupportTicketEntity extends BaseEntity {
  @Column({ name: 'tenant_id', type: 'varchar', length: 500 })
  tenantId!: string;
  @Column({ name: 'tenant_name', type: 'varchar', length: 500 })
  tenantName!: string;
  @Column({ name: 'reporter_email', type: 'varchar', length: 500 })
  reporterEmail!: string;
  @Column({ name: 'subject', type: 'varchar', length: 500 })
  subject!: string;
  @Column({ name: 'description', type: 'varchar', length: 500 })
  description!: string;
  @Column({ name: 'status', type: 'enum', enum: SupportTicketStatus })
  status!: SupportTicketStatus;
  @Column({ name: 'priority', type: 'enum', enum: SupportTicketPriority })
  priority!: SupportTicketPriority;
  @Column({ name: 'assigned_to', type: 'varchar', length: 500, nullable: true })
  assignedTo!: string | null;
  @Column({ name: 'attachments', type: 'jsonb', default: () => "'{}'::jsonb" })
  attachments!: unknown;
  @Column({ name: 'sla_deadline', type: 'timestamptz', nullable: true })
  slaDeadline!: Date | null;
  @Column({ name: 'first_response_at', type: 'timestamptz', nullable: true })
  firstResponseAt!: Date | null;
  @Column({ name: 'resolution_time', type: 'integer', default: 0 })
  resolutionTime!: number;
  @Column({ name: 'messages', type: 'jsonb', default: () => "'{}'::jsonb" })
  messages!: unknown;
  @Column({ name: 'last_updated', type: 'timestamptz' })
  lastUpdated!: Date;
}
