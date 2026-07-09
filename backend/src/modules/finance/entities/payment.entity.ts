import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { PaymentStatus } from '../../../common/enums/database.enums';
import { Member } from '../../members/entities/member.entity';

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
}
