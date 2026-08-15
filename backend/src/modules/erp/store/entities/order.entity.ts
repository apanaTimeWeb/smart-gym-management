import {
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { OrderItem } from '@/modules/erp/store/entities/order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  items: OrderItem[];

  @Column('float')
  total: number;

  @Column()
  method: string;

  @Column()
  status: string;

  @Column({ nullable: true })
  notes: string;

  @Column({ nullable: true })
  customerPhone: string;

  @CreateDateColumn()
  createdAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
