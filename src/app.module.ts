import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { Prisma } from 'generated/prisma';
import { PrismaModule } from './Connection/Prisma.module';

@Module({
  imports: [ProductsModule,PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
