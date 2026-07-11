import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import {  } from '../audit-logs.interfaces';

@Entity('audit-logs')
export class GlobalAuditLog {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  actorName: string;

  @Column({ type: 'varchar' })
  actorRole: string;

  @Column({ type: 'varchar' })
  action: string;

  @Column({ type: 'varchar' })
  targetResource: string;

  @Column({ type: 'varchar', nullable: true })
  ipAddress: string;

  @CreateDateColumn({})
  timestamp: Date;


  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
