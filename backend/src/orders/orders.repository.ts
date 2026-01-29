import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly repo: Repository<Order>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.repo.find({ relations: ['produtos'] });
  }

  findById(id: number): Promise<Order> {
    return this.repo.findOne({ where: { id }, relations: ['produtos'] });
  }

  create(data: Partial<Order>): Promise<Order> {
    const order = this.repo.create(data);
    return this.repo.save(order);
  }
}
