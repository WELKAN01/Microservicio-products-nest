import { HttpStatus, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from 'generated/prisma';
import { PrismaServices } from 'src/Connection/Prisma.service';
import { PaginationDTO } from 'src/Common/pagination.dto';
import { RpcException } from '@nestjs/microservices';

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
    const { page, limit } = paginationDTO;
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
      throw new RpcException({"message":"No se encontro el producto con el id: "+id, "status":HttpStatus.NOT_FOUND});
    }

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    const { id: _, ...data } = updateProductDto; // Exclude id from the update data
    console.log(data);
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

  async validateProducts(ids:number[]){
    ids=Array.from(new Set(ids));
    const product = await this.PrismaServices.product.findMany({
      where:{
        id:{
          in:ids
        }
      }
    })

    if(product.length!==ids.length){
      throw new RpcException({"message":"Algunos productos no existen","status":HttpStatus.BAD_REQUEST});
    }
    return product;
  }
}
