import {
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Gender } from '@/modules/erp/hr/utils/hr.enums';
import { Payroll } from '@/modules/erp/hr/entities/payroll.entity';
import { Attendance } from '@/modules/erp/attendance/entities/attendance.entity';

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Index()
  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column()
  role: string;

  @Column('float')
  salary: number;

  @Column()
  branch: string;

  @Column({ type: 'enum', enum: Gender })
  gender: Gender;

  @Column({ nullable: true })
  address: string;

  @Column()
  joinDate: Date;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Payroll, (payroll) => payroll.staff)
  payrolls: Payroll[];

  @OneToMany(() => Attendance, (attendance) => attendance.staff)
  attendances: Attendance[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
