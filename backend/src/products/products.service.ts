import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { ProductsRepository } from './products.repository';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';

const SEED_PRODUCTS = [
  { name: 'Notebook Gamer', category: 'Eletrônicos', price: 5499.9, description: 'Notebook gamer com processador i7, 16GB RAM e placa de vídeo dedicada.', image: 'https://picsum.photos/seed/notebook/400/300' },
  { name: 'Cadeira Ergonômica', category: 'Móveis', price: 1299, description: 'Cadeira ergonômica com apoio lombar ajustável e braços reguláveis.', image: 'https://picsum.photos/seed/chair/400/300' },
  { name: 'Fone Bluetooth', category: 'Eletrônicos', price: 349.9, description: 'Fone de ouvido bluetooth com cancelamento de ruído ativo.', image: 'https://picsum.photos/seed/headphone/400/300' },
  { name: 'Mesa de Escritório', category: 'Móveis', price: 899, description: 'Mesa de escritório com regulagem de altura e espaço para cabos.', image: 'https://picsum.photos/seed/desk/400/300' },
  { name: 'Teclado Mecânico', category: 'Periféricos', price: 459.9, description: 'Teclado mecânico RGB com switches blue e anti-ghosting.', image: 'https://picsum.photos/seed/keyboard/400/300' },
  { name: 'Monitor 27 4K', category: 'Eletrônicos', price: 2799, description: 'Monitor 27 polegadas com resolução 4K UHD e painel IPS.', image: 'https://picsum.photos/seed/monitor/400/300' },
  { name: 'Mouse Sem Fio', category: 'Periféricos', price: 199.9, description: 'Mouse sem fio ergonômico com sensor óptico de alta precisão.', image: 'https://picsum.photos/seed/mouse/400/300' },
  { name: 'Webcam Full HD', category: 'Periféricos', price: 279, description: 'Webcam Full HD 1080p com microfone embutido e correção de luz.', image: 'https://picsum.photos/seed/webcam/400/300' },
  { name: 'Caixa de Som Portátil', category: 'Eletrônicos', price: 399.9, description: 'Caixa de som portátil à prova d\'água com 20h de bateria.', image: 'https://picsum.photos/seed/speaker/400/300' },
  { name: 'Luminária LED', category: 'Decoração', price: 149.9, description: 'Luminária LED de mesa com ajuste de intensidade e temperatura de cor.', image: 'https://picsum.photos/seed/lamp/400/300' },
  { name: 'Mochila para Notebook', category: 'Acessórios', price: 189.9, description: 'Mochila resistente à água com compartimento acolchoado para notebook.', image: 'https://picsum.photos/seed/backpack/400/300' },
  { name: 'Hub USB-C', category: 'Periféricos', price: 229, description: 'Hub USB-C 7 em 1 com HDMI, USB 3.0 e leitor de cartão.', image: 'https://picsum.photos/seed/usbhub/400/300' },
];

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async onModuleInit() {
    const count = await this.productsRepository.count();
    if (count === 0) {
      for (const product of SEED_PRODUCTS) {
        await this.productsRepository.create({ ...product, quantidade_estoque: 100 });
      }
    }
  }

  findAll(): Promise<Product[]> {
    return this.productsRepository.findAll();
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productsRepository.findById(id);
    if (!product) throw new NotFoundException(`Produto #${id} não encontrado`);
    return product;
  }

  create(dto: CreateProductDto): Promise<Product> {
    return this.productsRepository.create({
      ...dto,
      quantidade_estoque: dto.quantidade_estoque ?? 100,
    });
  }

  async update(id: number, dto: UpdateProductDto): Promise<Product> {
    await this.findOne(id);
    return this.productsRepository.update(id, dto);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    return this.productsRepository.delete(id);
  }
}
