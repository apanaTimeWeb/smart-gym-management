import {
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('workouts')
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column('simple-array')
  muscleGroup: string[];

  @Column({ nullable: true })
  sets: number;

  @Column({ nullable: true })
  reps: string;

  @Column({ nullable: true })
  duration: string;

  @Column()
  difficulty: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  videoUrl: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
