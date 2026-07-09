import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { AttendanceType } from '../../../common/enums/database.enums';
import { Member } from '../../members/entities/member.entity';
import { Staff } from '../../hr/entities/staff.entity';

@Entity('attendances')
export class Attendance {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Member, member => member.attendances, { nullable: true })
  @JoinColumn({ name: 'memberId' })
  member: Member;

  @Column({ nullable: true })
  memberId: string;

  @ManyToOne(() => Staff, staff => staff.attendances, { nullable: true })
  @JoinColumn({ name: 'staffId' })
  staff: Staff;

  @Column({ nullable: true })
  staffId: string;

  @Column()
  date: Date;

  @Column({ nullable: true })
  checkIn: Date;

  @Column({ nullable: true })
  checkOut: Date;

  @Column({ type: 'enum', enum: AttendanceType })
  type: AttendanceType;

  @CreateDateColumn()
  createdAt: Date;
}
