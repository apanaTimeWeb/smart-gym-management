import {
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('diet_plans')
export class DietPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  goal: string;

  @Column({ nullable: true })
  calories: number;

  @Column('float', { nullable: true })
  protein: number;

  @Column('float', { nullable: true })
  carbs: number;

  @Column('float', { nullable: true })
  fats: number;

  @Column({ nullable: true })
  description: string;

  @Column('simple-array')
  meals: string[];

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
