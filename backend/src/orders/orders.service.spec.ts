import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.repository';
import { ProductsRepository } from '../products/products.repository';

describe('OrdersService', () => {
  let service: OrdersService;
  let ordersRepo: Partial<Record<keyof OrdersRepository, jest.Mock>>;
  let productsRepo: Partial<Record<keyof ProductsRepository, jest.Mock>>;

  beforeEach(async () => {
    ordersRepo = {
      findAll: jest.fn(),
      create: jest.fn().mockImplementation(async (data) => ({ id: 1, ...data })),
    };
    productsRepo = {
      findById: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: OrdersRepository, useValue: ordersRepo },
        { provide: ProductsRepository, useValue: productsRepo },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should create an order and update stock', async () => {
    const product = { id: 1, name: 'Notebook', price: 100, quantidade_estoque: 50 };
    productsRepo.findById.mockResolvedValue({ ...product });

    const result = await service.create({ produtos: [{ product_id: 1, quantidade: 2 }] });

    expect(result.total_pedido).toBe(200);
    expect(result.status).toBe('Concluído');
    expect(productsRepo.save).toHaveBeenCalled();
  });

  it('should throw when stock is insufficient', async () => {
    productsRepo.findById.mockResolvedValue({ id: 1, name: 'Test', price: 10, quantidade_estoque: 1 });

    await expect(
      service.create({ produtos: [{ product_id: 1, quantidade: 5 }] }),
    ).rejects.toThrow(BadRequestException);
  });

  it('should throw when product does not exist', async () => {
    productsRepo.findById.mockResolvedValue(null);

    await expect(
      service.create({ produtos: [{ product_id: 999, quantidade: 1 }] }),
    ).rejects.toThrow(BadRequestException);
  });
});
