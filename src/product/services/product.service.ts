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

  async updateProduct(id: string, data: CreateProductDTO) {
    try {
      await this.productRepository.update({ id }, data);
      return {
        ok: true,
        message: `product ${id} has been updated`,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
