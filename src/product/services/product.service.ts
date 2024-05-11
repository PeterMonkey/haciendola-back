import { BadRequestException, Injectable } from '@nestjs/common';
import { ProductRepository } from '../repository/product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDTO } from '../dto/createProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: ProductRepository,
  ) {}

  async create(data: CreateProductDTO) {
    try {
      const newProduct = this.productRepository.create(data);
      await this.productRepository.save(newProduct);
      return newProduct;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getProduct() {
    try {
      const products = await this.productRepository.find();
      return {
        response: products,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
