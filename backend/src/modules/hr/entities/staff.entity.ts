import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Gender } from '@/modules/hr/utils/database.enums';
import { Payroll } from '@/modules/hr/entities/payroll.entity';
import { Attendance } from '@/modules/attendance/entities/attendance.entity';

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

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

  @OneToMany(() => Payroll, payroll => payroll.staff)
  payrolls: Payroll[];

  @OneToMany(() => Attendance, attendance => attendance.staff)
  attendances: Attendance[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
