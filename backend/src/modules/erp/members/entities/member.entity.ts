import {
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import {
  Gender,
  BillingCycle,
  MemberStatus,
} from '@/modules/erp/members/utils/members.enums';
import { Plan } from '@/modules/erp/plans/entities/plan.entity';
import { Payment } from '@/modules/erp/finance/entities/payment.entity';
import { Attendance } from '@/modules/erp/attendance/entities/attendance.entity';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ nullable: true })
  address: string;

  @Column()
  branch: string;

  @ManyToOne(() => Plan, (plan) => plan.members)
  @JoinColumn({ name: 'planId' })
  plan: Plan;

  @Index()
  @Column()
  planId: string;

  @Column({ type: 'enum', enum: BillingCycle })
  billingCycle: BillingCycle;

  @Index()
  @Column({ type: 'enum', enum: MemberStatus, default: MemberStatus.PENDING })
  status: MemberStatus;

  @Column()
  joinDate: Date;

  @Column()
  expiryDate: Date;

  @Column('float', { default: 0 })
  paidAmount: number;

  @Column('float', { default: 0 })
  pendingAmount: number;

  @Column({ nullable: true })
  photo: string;

  @OneToMany(() => Payment, (payment) => payment.member)
  payments: Payment[];

  @OneToMany(() => Attendance, (attendance) => attendance.member)
  attendances: Attendance[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
