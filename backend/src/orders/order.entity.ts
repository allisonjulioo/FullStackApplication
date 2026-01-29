import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { OrderItem } from './order-item.entity';

@Entity()
export class Order {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('decimal', { precision: 10, scale: 2 })
  total_pedido: number;

  @ApiProperty()
  @Column({ default: 'Pendente' })
  status: string;

  @ApiProperty({ type: () => [OrderItem] })
  @OneToMany(() => OrderItem, (item) => item.order, { cascade: true, eager: true })
  produtos: OrderItem[];

  @CreateDateColumn()
  created_at: Date;
}
