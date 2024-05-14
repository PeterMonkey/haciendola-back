import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from '../services/product.service';
import { CreateProductDTO } from '../dto/createProduct.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import {
  createProductResponse,
  getProductResponse,
  updateProductResponse,
  unauthorizedResponse,
  deleteProductResponse,
} from '../response/product.response';
import { JwtAuthGuard } from '../../auth/guards/jwt.guard';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('new')
  @UseGuards(JwtAuthGuard)
  @ApiResponse(createProductResponse.succes)
  @ApiResponse(createProductResponse.badRequest)
  @ApiResponse(unauthorizedResponse)
  create(@Body() data: CreateProductDTO) {
    return this.productService.create(data);
  }

  @Get('/get-products')
  @UseGuards(JwtAuthGuard)
  @ApiResponse(getProductResponse.succes)
  @ApiResponse(getProductResponse.badRequest)
  @ApiResponse(unauthorizedResponse)
  getProduct() {
    return this.productService.getProduct();
  }

  @Put('/update/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse(updateProductResponse.succes)
  @ApiResponse(updateProductResponse.badRequest)
  @ApiResponse(unauthorizedResponse)
  updateProducto(@Param('id') id: string, @Body() data: CreateProductDTO) {
    return this.productService.updateProduct(id, data);
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  @ApiResponse(deleteProductResponse.succes)
  @ApiResponse(deleteProductResponse.badRequest)
  @ApiResponse(unauthorizedResponse)
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }
}
