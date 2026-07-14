import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('landing_inquiries')
export class LandingInquiry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  phone: string;

  @Column({ type: 'varchar', length: 100 })
  type: 'CONTACT' | 'BOOKING';

  @Column({ type: 'text', nullable: true })
  message: string;

  @Column({ type: 'date', nullable: true })
  bookingDate: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  bookingType: string;

  @Column({ type: 'varchar', length: 50, default: 'NEW' })
  status: 'NEW' | 'CONTACTED' | 'CONVERTED';

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
