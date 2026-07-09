import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Gender, BillingCycle, MemberStatus } from '../../../common/enums/database.enums';
import { Plan } from '../../plans/entities/plan.entity';
import { Payment } from '../../finance/entities/payment.entity';
import { Attendance } from '../../attendance/entities/attendance.entity';

@Entity('members')
export class Member {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

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

  @ManyToOne(() => Plan, plan => plan.members)
  @JoinColumn({ name: 'planId' })
  plan: Plan;

  @Column()
  planId: number;

  @Column({ type: 'enum', enum: BillingCycle })
  billingCycle: BillingCycle;

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

  @OneToMany(() => Payment, payment => payment.member)
  payments: Payment[];

  @OneToMany(() => Attendance, attendance => attendance.member)
  attendances: Attendance[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
