import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import type {  JobStatus  } from '../jobs.interfaces';

@Entity('jobs')
export class BackgroundJob {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  queueName: string;

  @Column({ type: 'varchar' })
  jobName: string;

  @Column({ type: 'varchar', default: 'ACTIVE' })
  status: JobStatus;

  @Column({ type: 'int', default: 0 })
  attempts: number;

  @Column({ type: 'text', nullable: true })
  error: string | null;

  @CreateDateColumn({})
  createdAt: Date;


  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
