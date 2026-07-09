import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { PlanTier } from '@/modules/plans/utils/plans.enums';
import { Member } from '@/modules/members/entities/member.entity';

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: PlanTier, unique: true })
  tier: PlanTier;

  @Column('float')
  price1Month: number;

  @Column('float')
  price3Month: number;

  @Column('float')
  price6Month: number;

  @Column('float')
  price12Month: number;

  @Column('simple-array')
  features: string[];

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Member, member => member.plan)
  members: Member[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
