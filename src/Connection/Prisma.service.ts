import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "generated/prisma";

@Injectable()
export class PrismaServices extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('ProductService');

  async onModuleInit() {
    this.logger.log("Connecting to the database...");
    await this.$connect();
  }

  async onModuleDestroy() {
    console.log("Disconnecting from the database...");
    await this.$disconnect();
  }
}