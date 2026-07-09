import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Staff } from '@/modules/hr/entities/staff.entity';

@Entity('payrolls')
export class Payroll {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Staff, staff => staff.payrolls)
  @JoinColumn({ name: 'staffId' })
  staff: Staff;

  @Column()
  staffId: string;

  @Column()
  month: string;

  @Column('float')
  amount: number;

  @Column()
  status: string;

  @Column({ nullable: true })
  paidAt: Date;

  @Column({ nullable: true })
  notes: string;

  @CreateDateColumn()
  createdAt: Date;
}
