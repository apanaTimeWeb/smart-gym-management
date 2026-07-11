import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { TicketStatus, TicketPriority } from '../tickets.interfaces';

@Entity('tickets')
export class SupportTicket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  tenantName: string;

  @Column({ type: 'varchar' })
  subject: string;

  @Column({ type: 'varchar', default: 'OPEN' })
  status: TicketStatus;

  @Column({ type: 'varchar', default: 'MEDIUM' })
  priority: TicketPriority;

  @CreateDateColumn({})
  createdAt: Date;

  @UpdateDateColumn({})
  lastUpdated: Date;


  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
