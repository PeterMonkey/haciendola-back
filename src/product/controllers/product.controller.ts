import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDTO } from '../dto/createProduct.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('new')
  @ApiResponse({ status: 201 })
  create(@Body() data: CreateProductDTO) {
    return this.productService.create(data);
  }

  @Get('/get-products')
  getProduct() {
    return this.productService.getProduct();
  }
}
