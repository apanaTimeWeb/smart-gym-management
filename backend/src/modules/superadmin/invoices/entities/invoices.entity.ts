import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import type {  InvoiceStatus  } from '../invoices.interfaces';

@Entity('invoices')
export class SaaSInvoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  tenantName: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number;

  @Column({ type: 'varchar', default: 'USD' })
  currency: string;

  @Column({ type: 'varchar', default: 'PENDING' })
  status: InvoiceStatus;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({ type: 'varchar' })
  planName: string;


  @Column({ type: 'boolean', default: false })
  isDeleted: boolean;
}
