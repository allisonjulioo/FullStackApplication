import { Injectable, BadRequestException } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { ProductsRepository } from '../products/products.repository';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  findAll(): Promise<Order[]> {
    return this.ordersRepository.findAll();
  }

  async create(dto: CreateOrderDto): Promise<Order> {
    let total = 0;
    const items = [];

    for (const item of dto.produtos) {
      const product = await this.productsRepository.findById(item.product_id);
      if (!product) {
        throw new BadRequestException(`Produto #${item.product_id} não encontrado`);
      }
      if (product.quantidade_estoque < item.quantidade) {
        throw new BadRequestException(
          `Estoque insuficiente para "${product.name}". Disponível: ${product.quantidade_estoque}, Solicitado: ${item.quantidade}`,
        );
      }

      total += product.price * item.quantidade;
      items.push({
        product_id: product.id,
        product_name: product.name,
        quantidade: item.quantidade,
        preco_unitario: product.price,
      });
    }

    const order = await this.ordersRepository.create({
      total_pedido: total,
      status: 'Concluído',
      produtos: items as any,
    });

    for (const item of dto.produtos) {
      const product = await this.productsRepository.findById(item.product_id);
      product.quantidade_estoque -= item.quantidade;
      await this.productsRepository.save(product);
    }

    return order;
  }
}
