import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDTO } from '../dto/createProduct.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import {
  createProductResponse,
  getProductResponse,
} from '../response/product.response';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('new')
  @ApiResponse(createProductResponse.succes)
  @ApiResponse(createProductResponse.badRequest)
  create(@Body() data: CreateProductDTO) {
    return this.productService.create(data);
  }

  @Get('/get-products')
  @ApiResponse(getProductResponse.succes)
  @ApiResponse(getProductResponse.badRequest)
  getProduct() {
    return this.productService.getProduct();
  }
}
