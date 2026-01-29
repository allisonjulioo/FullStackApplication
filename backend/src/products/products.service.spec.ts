import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';

describe('ProductsService', () => {
  let service: ProductsService;
  let repository: Partial<Record<keyof ProductsRepository, jest.Mock>>;

  beforeEach(async () => {
    repository = {
      findAll: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn().mockResolvedValue(1),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: ProductsRepository, useValue: repository },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should return all products', async () => {
    const products = [
      { id: 1, name: 'Notebook', category: 'Eletrônicos', price: 5000, description: 'Desc', image: '', quantidade_estoque: 10 },
    ];
    repository.findAll.mockResolvedValue(products);

    const result = await service.findAll();
    expect(result).toEqual(products);
    expect(repository.findAll).toHaveBeenCalled();
  });

  it('should throw NotFoundException when product not found', async () => {
    repository.findById.mockResolvedValue(null);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('should create a product with default stock', async () => {
    const dto = { name: 'Test', category: 'Cat', price: 10, description: 'Desc' };
    repository.create.mockImplementation(async (data) => ({ id: 1, ...data }));

    const result = await service.create(dto);
    expect(result.quantidade_estoque).toBe(100);
    expect(repository.create).toHaveBeenCalledWith({ ...dto, quantidade_estoque: 100 });
  });
});
