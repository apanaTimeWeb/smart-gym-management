import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import type {  BackupStatus  } from '../backups.interfaces';

@Entity('backups')
export class BackupRecord {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  tenantName: string;

  @Column({ type: 'varchar' })
  databaseName: string;

  @Column({ type: 'float' })
  sizeMB: number;

  @Column({ type: 'varchar', default: 'IN_PROGRESS' })
  status: BackupStatus;

  @CreateDateColumn({})
  timestamp: Date;


  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
