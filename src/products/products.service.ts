import { HttpStatus, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from 'generated/prisma';
import { PrismaServices } from 'src/Connection/Prisma.service';
import { PaginationDTO } from 'src/Common/pagination.dto';

@Injectable()
export class ProductsService{

  constructor(private readonly PrismaServices: PrismaServices) {
    // Initialize Prisma connection
  }

  async create(createProductDto: CreateProductDto){
    var productCreate = await this.PrismaServices.product.create({
      data:createProductDto
    })

    return {"message":"datos creados correctamente","data":productCreate};
  }

  async findAll(paginationDTO: PaginationDTO) {
    const { page=1, limit=10 } = paginationDTO;
    const totalpages = await this.PrismaServices.product.count();
    const lastpages = Math.ceil(totalpages / limit);
    return { data: await this.PrismaServices.product.findMany({
      skip:(page-1) * limit,
      take: limit,
      where: { available: true }, // Filter to only include available products
    }),
      meta:{
        total: totalpages,
        page: page,
        limit: limit,
        lastPage: lastpages
      }};
  }

  async findOne(id: number) {
    const product = await this.PrismaServices.product.findFirst({
      where: { id: id, available: true } // Ensure the product is available,  

    });

    if(!product){
      throw new NotFoundException({"message":"No se encontro el producto con el id: "+id, "httpCode":HttpStatus.NOT_FOUND});
    }

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const { id: _, ...data } = updateProductDto; // Exclude id from the update data
    return this.PrismaServices.product.update({
      where: { id: id, available: true }, // Ensure the product is available before updating
      data: data,
    });
  }

  async remove(id: number) {
    const product = await this.PrismaServices.product.update({
      where: { id: id },
      data: { available: false }, // Soft delete by setting available to false
    })

    return {"message":"Producto eliminado correctamente","data":product};

    // return this.PrismaServices.product.delete({
    //   where: {id}
    // })
  }
}
