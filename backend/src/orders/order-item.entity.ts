import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  product_id: number;

  @ApiProperty()
  @Column()
  product_name: string;

  @ApiProperty()
  @Column()
  quantidade: number;

  @ApiProperty()
  @Column('decimal', { precision: 10, scale: 2 })
  preco_unitario: number;

  @ManyToOne(() => Order, (order) => order.produtos)
  order: Order;
}
