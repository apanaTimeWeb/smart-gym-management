import { DeleteDateColumn, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PaymentStatus } from '@/modules/finance/utils/finance.enums';
import { Member } from '@/modules/members/entities/member.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Member, member => member.payments)
  @JoinColumn({ name: 'memberId' })
  member: Member;

  @Column()
  memberId: string;

  @Column('float')
  amount: number;

  @Column()
  method: string;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PAID })
  status: PaymentStatus;

  @Column({ nullable: true })
  notes: string;

  @Column({ unique: true })
  invoiceNo: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  paidAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}