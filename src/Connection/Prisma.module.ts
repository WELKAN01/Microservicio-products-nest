import { Module } from "@nestjs/common";
import { PrismaServices } from "./Prisma.service";


@Module({
    imports: [],
    providers: [PrismaServices],
    exports: [PrismaServices]
})

export class PrismaModule{

}