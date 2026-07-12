import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { BroadcastStatus, BroadcastAudience } from '../broadcasts.interfaces';

@Entity('broadcasts')
export class Broadcast {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', default: 'DRAFT' })
  status: BroadcastStatus;

  @Column({ type: 'varchar' })
  audience: BroadcastAudience;

  @Column({ type: 'timestamp', nullable: true })
  scheduledDate: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  sentDate: Date | null;


  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
