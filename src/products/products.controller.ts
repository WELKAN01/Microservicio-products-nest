import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDTO } from 'src/Common/pagination.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //@Post()
  @MessagePattern('create_Product') // Use MessagePattern for microservice communication
  create(@Payload() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  //@Get()
  @MessagePattern('All_Product') // Use MessagePattern for microservice communication
  findAll(@Payload() PaginationDTO: PaginationDTO) {
    return  this.productsService.findAll(PaginationDTO) // Pass pagination DTO to service
  }

  //@Get(':id')
  @MessagePattern('find_one_Product') // Use MessagePattern for microservice communication
  findOne(@Payload('id',ParseIntPipe) id: number) {
    return this.productsService.findOne(+id);
  }

  //@Patch(':id')
  @MessagePattern('update_Product') // Use MessagePattern for microservice communication
  update(//@Param('id',ParseIntPipe) id: number,
         @Payload() updateProductDto: UpdateProductDto) {
    return this.productsService.update(updateProductDto.id,updateProductDto);
  }

  //@Delete(':id')
  @MessagePattern('delete_Product') // Use MessagePattern for microservice communication
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.productsService.remove(+id);
  }
}
